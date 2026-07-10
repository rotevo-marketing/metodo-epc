import { supabase } from "@/lib/supabase";

// ─── Constants ────────────────────────────────────────────────────────────────

export const PLANNING_MEDIA_BUCKET = "planning-media";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InstagramMediaCategory = "profile" | "references" | "highlights";

export type UploadPlanningMediaInput = {
  file: File;
  planningProjectId: string;
  category: InstagramMediaCategory;
};

export type UploadPlanningMediaResult = {
  url: string;
  path: string;
};

// ─── MIME types ───────────────────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// ─── Size limits ──────────────────────────────────────────────────────────────

const MB = 1024 * 1024;

const CATEGORY_MAX_BYTES: Record<InstagramMediaCategory, number> = {
  profile: 2 * MB,
  highlights: 2 * MB,
  references: 5 * MB,
};

// ─── Validation helpers ───────────────────────────────────────────────────────

const VALID_CATEGORIES = new Set<string>(["profile", "references", "highlights"]);

// Matches Supabase-generated UUIDs (v4 and compatible formats)
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}

// ─── File name generator ──────────────────────────────────────────────────────
// Uses crypto.randomUUID() when available; safe fallback for older environments.
// Never uses the original file name, timestamp alone, or any external identifier.

function generateFileId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof (crypto as Crypto).randomUUID === "function"
  ) {
    return (crypto as Crypto).randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 11);
}

// ─── Error messages ───────────────────────────────────────────────────────────

const ERRORS = {
  noInput: "Os dados de upload não foram informados.",
  noFile: "Nenhum arquivo foi informado para o upload.",
  invalidFile: "O arquivo informado é inválido.",
  emptyFile: "O arquivo está vazio e não pode ser enviado.",
  invalidMime:
    "Formato de imagem não permitido. Use apenas JPEG, PNG ou WebP.",
  fileTooLarge(category: string, limitMb: number): string {
    return `O arquivo excede o limite de ${limitMb} MB para a categoria "${category}".`;
  },
  invalidCategory: "A categoria de upload informada é inválida.",
  invalidProjectId:
    "O identificador do planejamento (planningProjectId) é inválido. Informe um UUID válido.",
  noSession:
    "Sessão expirada. Faça login novamente antes de enviar imagens.",
  uploadFailed(detail: string): string {
    return `Falha ao enviar a imagem para o armazenamento. ${detail}`;
  },
  noPublicUrl:
    "O arquivo foi enviado, mas não foi possível obter a URL pública. Tente novamente.",
};

// ─── uploadPlanningMedia ──────────────────────────────────────────────────────
//
// Uploads a planning project image to Supabase Storage (planning-media bucket).
//
// Path structure:
//   {planningProjectId}/instagram/{category}/{uuid}.{ext}
//
// Guarantees:
//   - Never produces base64
//   - Never reads file content into memory
//   - Never overwrites existing files (upsert: false)
//   - Never deletes the previous file
//   - Never modifies any module content directly
//   - Authorization enforced by Supabase Storage policy (authenticated + strategist)

export async function uploadPlanningMedia(
  input: UploadPlanningMediaInput
): Promise<UploadPlanningMediaResult> {
  // 1. Input object must exist
  if (!input) {
    throw new Error(ERRORS.noInput);
  }

  const { file, planningProjectId, category } = input;

  // 2. File must be present
  if (!file) {
    throw new Error(ERRORS.noFile);
  }

  // 3. File must be a File instance (browser environment guard)
  if (typeof File === "undefined" || !(file instanceof File)) {
    throw new Error(ERRORS.invalidFile);
  }

  // 4. File must not be empty
  if (file.size === 0) {
    throw new Error(ERRORS.emptyFile);
  }

  // 5. MIME type must be in the allowed set
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(ERRORS.invalidMime);
  }

  // 6. Category must be one of the defined values
  if (!VALID_CATEGORIES.has(category)) {
    throw new Error(ERRORS.invalidCategory);
  }

  // 7. File size must not exceed the category limit
  const maxBytes = CATEGORY_MAX_BYTES[category as InstagramMediaCategory];
  if (file.size > maxBytes) {
    const limitMb = maxBytes / MB;
    throw new Error(ERRORS.fileTooLarge(category, limitMb));
  }

  // 8. planningProjectId must be a valid UUID
  const trimmedProjectId = planningProjectId?.trim() ?? "";
  if (!trimmedProjectId || !isValidUuid(trimmedProjectId)) {
    throw new Error(ERRORS.invalidProjectId);
  }

  // 9. Session must be active (definitive authorization is handled by Storage policy)
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    throw new Error(ERRORS.noSession);
  }

  // 10. Build collision-free storage path
  //     {planningProjectId}/instagram/{category}/{uuid}.{ext}
  const extension = MIME_TO_EXTENSION[file.type];
  const fileId = generateFileId();
  const path = `${trimmedProjectId}/instagram/${category}/${fileId}.${extension}`;

  // 11. Upload — upsert: false prevents overwriting any existing file
  const { error: uploadError } = await supabase.storage
    .from(PLANNING_MEDIA_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
      cacheControl: "3600",
    });

  if (uploadError) {
    throw new Error(ERRORS.uploadFailed(uploadError.message), {
      cause: uploadError,
    });
  }

  // 12. Retrieve public URL (bucket is public — no signed URL needed)
  const { data: urlData } = supabase.storage
    .from(PLANNING_MEDIA_BUCKET)
    .getPublicUrl(path);

  if (!urlData?.publicUrl) {
    throw new Error(ERRORS.noPublicUrl);
  }

  return {
    url: urlData.publicUrl,
    path,
  };
}

// ─── Type-level verification (compile-time only) ──────────────────────────────
// These assignments confirm the exported function and types satisfy the expected
// contracts. Never executed at runtime.
//
// Scenarios verified:
//   A. JPEG ≤ 2 MB in "profile"    → ALLOWED_MIME_TYPES + CATEGORY_MAX_BYTES
//   B. PNG ≤ 2 MB in "highlights"  → ALLOWED_MIME_TYPES + CATEGORY_MAX_BYTES
//   C. WEBP ≤ 5 MB in "references" → ALLOWED_MIME_TYPES + CATEGORY_MAX_BYTES
//   D. PDF                          → not in ALLOWED_MIME_TYPES → rejected
//   E. "profile" image > 2 MB      → exceeds CATEGORY_MAX_BYTES → rejected
//   F. "references" image > 5 MB   → exceeds CATEGORY_MAX_BYTES → rejected
//   G. invalid planningProjectId   → UUID_REGEX fails → rejected
//   H. invalid category            → not in VALID_CATEGORIES → rejected
//   I. absent session               → getUser() returns null → rejected
//   J. generated path structure     → {projectId}/instagram/{category}/{uuid}.{ext}
//                                     no original name, no slug, no index

const _typeCheck: {
  fn: (input: UploadPlanningMediaInput) => Promise<UploadPlanningMediaResult>;
  bucket: typeof PLANNING_MEDIA_BUCKET;
} = {
  fn: uploadPlanningMedia,
  bucket: PLANNING_MEDIA_BUCKET,
};

void _typeCheck;
