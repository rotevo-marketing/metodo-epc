"use client";

import { ChangeEvent, useState, ReactNode } from "react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";
import type { InstagramData } from "@/types/instagram";
import {
  createEmptyInstagramFrequencyItem,
  createEmptyInstagramObjective,
  createEmptyInstagramStoryFormat,
  createEmptyInstagramContentFormat,
  createEmptyInstagramLanguageStructure,
  createEmptyInstagramHashtagCategory,
  createEmptyInstagramImageReference,
  createEmptyInstagramExternalReference,
  createEmptyInstagramProfileLink,
  createEmptyInstagramHighlight,
} from "@/lib/normalizeInstagramData";
import { uploadPlanningMedia } from "@/lib/uploadPlanningMedia";

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Direção estratégica", id: "instagram-strategic-direction" },
  { label: "Perfil", id: "instagram-profile" },
  { label: "Frequência e objetivos", id: "instagram-frequency-objectives" },
  { label: "Conteúdo", id: "instagram-content" },
  { label: "Linguagem", id: "instagram-language" },
  { label: "Direção visual", id: "instagram-visual" },
  { label: "Referências", id: "instagram-references" },
];

// ─── FormSection ──────────────────────────────────────────────────────────────

function FormSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-slate-100 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
      <div className="space-y-10">{children}</div>
    </section>
  );
}

// ─── SubSection ───────────────────────────────────────────────────────────────

function SubSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

// ─── InstagramProfilePreview ──────────────────────────────────────────────────

type InstagramProfilePreviewProps = {
  profile: InstagramData["profile"];
};

function InstagramProfilePreview({ profile }: InstagramProfilePreviewProps) {
  const initials = profile.displayName
    ? profile.displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "";

  const sortedLinks = [...profile.linkItems]
    .sort((a, b) => a.order - b.order)
    .filter((l) => l.title.trim() || l.url.trim());

  const sortedHighlights = [...profile.highlights]
    .sort((a, b) => a.order - b.order)
    .filter((h) => h.title.trim() || h.purpose.trim() || h.imageUrl.trim());

  return (
    <div className="lg:sticky lg:top-8">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Pré-visualização do perfil
      </p>
      <p className="mb-3 text-xs text-slate-400">
        A visualização é atualizada conforme os campos são preenchidos.
      </p>

      <div
        aria-label="Pré-visualização do perfil do Instagram"
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Profile header */}
        <div className="p-5">
          <div className="flex items-center gap-4">
            {/* Photo */}
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.displayName || "Foto do perfil"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-slate-400">
                  {initials || "?"}
                </span>
              )}
            </div>

            {/* Name + handle */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">
                {profile.displayName || (
                  <span className="font-normal text-slate-300">Nome do perfil</span>
                )}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {profile.handle || (
                  <span className="text-slate-300">@nomedoperfil</span>
                )}
              </p>
            </div>
          </div>

          {/* Bio-dependent content */}
          {profile.enabled ? (
            <div className="mt-4 space-y-3">
              {/* Bio HTML */}
              {profile.bio ? (
                <div
                  className="text-xs leading-5 text-slate-700 [&_em]:italic [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-1 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4"
                  dangerouslySetInnerHTML={{ __html: profile.bio }}
                />
              ) : (
                <p className="text-xs italic text-slate-300">
                  A descrição estratégica do perfil aparecerá aqui.
                </p>
              )}

              {/* Main link */}
              {profile.mainLink && (
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Link: </span>
                  <span className="break-all">{profile.mainLink}</span>
                </p>
              )}

              {/* Additional links */}
              {sortedLinks.length > 0 && (
                <div className="space-y-1.5">
                  {sortedLinks.map((link) => (
                    <div
                      key={link.id}
                      aria-label={
                        link.url
                          ? `${link.title || link.url}: ${link.url}`
                          : link.title
                      }
                      className="truncate rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700"
                    >
                      {link.title || link.url}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-4 text-xs italic text-slate-400">
              A bio está desativada neste planejamento.
            </p>
          )}
        </div>

        {/* Highlights */}
        {profile.enabled && sortedHighlights.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-4">
            <div className="flex gap-4 overflow-x-auto pb-1">
              {sortedHighlights.map((h) => (
                <div
                  key={h.id}
                  aria-label={
                    h.purpose
                      ? `${h.title || "Destaque"} — ${h.purpose}`
                      : h.title || "Destaque"
                  }
                  className="flex flex-shrink-0 flex-col items-center gap-1.5"
                >
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-2 ring-slate-200">
                    {h.imageUrl ? (
                      <img
                        src={h.imageUrl}
                        alt={h.title || "Destaque"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        {h.title ? h.title[0].toUpperCase() : "•"}
                      </span>
                    )}
                  </div>
                  <span className="w-14 truncate text-center text-xs text-slate-600">
                    {h.title || "Destaque"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

type InstagramFormProps = {
  data: InstagramData;
  setData: Dispatch<SetStateAction<InstagramData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
  planningProjectId: string;
};

export default function InstagramForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
  planningProjectId,
}: InstagramFormProps) {
  // ─── Upload states ──────────────────────────────────────────────────────────

  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState(false);
  const [profilePhotoError, setProfilePhotoError] = useState("");
  const [uploadingRefIndex, setUploadingRefIndex] = useState<number | null>(null);
  const [refUploadErrors, setRefUploadErrors] = useState<Record<number, string>>({});
  const [uploadingHighlightId, setUploadingHighlightId] = useState<string | null>(null);
  const [highlightUploadErrors, setHighlightUploadErrors] = useState<Record<string, string>>({});

  // ─── Frequency handlers ─────────────────────────────────────────────────────

  function updateFrequencyItem(
    id: string,
    key: "format" | "quantity" | "period" | "journeyRole" | "notes",
    value: string
  ) {
    setData((current) => ({
      ...current,
      publishing: {
        ...current.publishing,
        frequencyItems: current.publishing.frequencyItems.map((item) =>
          item.id === id ? { ...item, [key]: value } : item
        ),
      },
    }));
  }

  function addFrequencyItem() {
    setData((current) => ({
      ...current,
      publishing: {
        ...current.publishing,
        frequencyItems: [
          ...current.publishing.frequencyItems,
          { ...createEmptyInstagramFrequencyItem(), period: "por semana" },
        ],
      },
    }));
  }

  function removeFrequencyItem(id: string) {
    setData((current) => ({
      ...current,
      publishing: {
        ...current.publishing,
        frequencyItems: current.publishing.frequencyItems.filter(
          (item) => item.id !== id
        ),
      },
    }));
  }

  function updatePublishing(
    key:
      | "minimumViableFrequency"
      | "recommendedFrequency"
      | "maximumSustainableFrequency"
      | "productionRoutine"
      | "adjustmentRule",
    value: string
  ) {
    setData((current) => ({
      ...current,
      publishing: { ...current.publishing, [key]: value },
    }));
  }

  // ─── Objectives handlers ─────────────────────────────────────────────────────

  function updateObjective(
    id: string,
    key: "objective" | "indicator" | "target" | "deadline" | "validationStatus",
    value: string
  ) {
    setData((current) => ({
      ...current,
      objectives: current.objectives.map((o) =>
        o.id === id ? { ...o, [key]: value } : o
      ),
    }));
  }

  function addObjective() {
    setData((current) => ({
      ...current,
      objectives: [...current.objectives, createEmptyInstagramObjective()],
    }));
  }

  function removeObjective(id: string) {
    setData((current) => ({
      ...current,
      objectives: current.objectives.filter((o) => o.id !== id),
    }));
  }

  // ─── Stories handlers ────────────────────────────────────────────────────────

  function updateStory(
    id: string,
    key: "name" | "frequency" | "journeyStage" | "purpose" | "cta" | "description",
    value: string
  ) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        stories: current.contentArchitecture.stories.map((s) =>
          s.id === id ? { ...s, [key]: value } : s
        ),
      },
    }));
  }

  function addStory() {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        stories: [
          ...current.contentArchitecture.stories,
          createEmptyInstagramStoryFormat(),
        ],
      },
    }));
  }

  function removeStory(id: string) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        stories: current.contentArchitecture.stories.filter((s) => s.id !== id),
      },
    }));
  }

  function moveStory(id: string, direction: "up" | "down") {
    setData((current) => {
      const arr = [...current.contentArchitecture.stories];
      const index = arr.findIndex((s) => s.id === id);
      if (index === -1) return current;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= arr.length) return current;
      [arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]];
      return {
        ...current,
        contentArchitecture: { ...current.contentArchitecture, stories: arr },
      };
    });
  }

  // ─── Hashtags handlers ────────────────────────────────────────────────────────
  // All categories are flattened into a single list for display.
  // Setters traverse the nested structure using a cursor to find the correct
  // (catIndex, tagIndex) from the flat index.

  function updateHashtag(flatIndex: number, value: string) {
    setData((current) => {
      let cursor = 0;
      const nextHashtags = current.hashtags.map((cat) => ({
        ...cat,
        hashtags: cat.hashtags.map((h) => {
          const result = cursor === flatIndex ? value : h;
          cursor++;
          return result;
        }),
      }));
      return { ...current, hashtags: nextHashtags };
    });
  }

  function addHashtag() {
    setData((current) => {
      if (current.hashtags.length === 0) {
        return {
          ...current,
          hashtags: [{ ...createEmptyInstagramHashtagCategory(), hashtags: [""] }],
        };
      }
      const nextHashtags = [...current.hashtags];
      nextHashtags[0] = {
        ...nextHashtags[0],
        hashtags: [...nextHashtags[0].hashtags, ""],
      };
      return { ...current, hashtags: nextHashtags };
    });
  }

  function removeHashtag(flatIndex: number) {
    setData((current) => {
      let cursor = 0;
      const nextHashtags = current.hashtags
        .map((cat) => ({
          ...cat,
          hashtags: cat.hashtags.filter(() => {
            const keep = cursor !== flatIndex;
            cursor++;
            return keep;
          }),
        }))
        .filter((cat) => cat.hashtags.length > 0);

      if (nextHashtags.length === 0) {
        const base =
          current.hashtags.length > 0
            ? current.hashtags[0]
            : createEmptyInstagramHashtagCategory();
        return { ...current, hashtags: [{ ...base, hashtags: [""] }] };
      }
      return { ...current, hashtags: nextHashtags };
    });
  }

  const flatHashtags = data.hashtags.flatMap((cat) => cat.hashtags);

  // ─── Formats (content formats) handlers ──────────────────────────────────────

  function updateFormat(
    id: string,
    key: "name" | "structure" | "duration" | "journeyRole" | "purpose" | "cta" | "notes",
    value: string
  ) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        formats: current.contentArchitecture.formats.map((f) =>
          f.id === id ? { ...f, [key]: value } : f
        ),
      },
    }));
  }

  function addFormat() {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        formats: [
          ...current.contentArchitecture.formats,
          createEmptyInstagramContentFormat(),
        ],
      },
    }));
  }

  function removeFormat(id: string) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        formats: current.contentArchitecture.formats.filter((f) => f.id !== id),
      },
    }));
  }

  function moveFormat(id: string, direction: "up" | "down") {
    setData((current) => {
      const arr = [...current.contentArchitecture.formats];
      const index = arr.findIndex((f) => f.id === id);
      if (index === -1) return current;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= arr.length) return current;
      [arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]];
      return {
        ...current,
        contentArchitecture: { ...current.contentArchitecture, formats: arr },
      };
    });
  }

  // ─── Language structures handlers ─────────────────────────────────────────────

  function updateLanguageStructure(index: number, value: string) {
    setData((current) => {
      const nextItems = [...current.languageStructures];
      nextItems[index] = { ...nextItems[index], howItAppears: value };
      return { ...current, languageStructures: nextItems };
    });
  }

  function addLanguageStructure() {
    setData((current) => ({
      ...current,
      languageStructures: [
        ...current.languageStructures,
        createEmptyInstagramLanguageStructure(),
      ],
    }));
  }

  function removeLanguageStructure(index: number) {
    setData((current) => ({
      ...current,
      languageStructures:
        current.languageStructures.length > 1
          ? current.languageStructures.filter((_, i) => i !== index)
          : [createEmptyInstagramLanguageStructure()],
    }));
  }

  // ─── Contents handlers ────────────────────────────────────────────────────────

  function updateContent(index: number, value: string) {
    setData((current) => {
      const nextItems = [
        ...current.contentArchitecture.generalContentGuidelines,
      ];
      nextItems[index] = value;
      return {
        ...current,
        contentArchitecture: {
          ...current.contentArchitecture,
          generalContentGuidelines: nextItems,
        },
      };
    });
  }

  function addContent() {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        generalContentGuidelines: [
          ...current.contentArchitecture.generalContentGuidelines,
          "",
        ],
      },
    }));
  }

  function removeContent(index: number) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        generalContentGuidelines: current.contentArchitecture.generalContentGuidelines.filter(
          (_, i) => i !== index
        ),
      },
    }));
  }

  function moveContent(index: number, direction: "up" | "down") {
    setData((current) => {
      const arr = [...current.contentArchitecture.generalContentGuidelines];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= arr.length) return current;
      [arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]];
      return {
        ...current,
        contentArchitecture: {
          ...current.contentArchitecture,
          generalContentGuidelines: arr,
        },
      };
    });
  }

  // ─── Visual reference handlers ────────────────────────────────────────────────

  async function uploadVisualReference(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingRefIndex(index);
    setRefUploadErrors((current) => {
      const next = { ...current };
      delete next[index];
      return next;
    });

    try {
      const { url } = await uploadPlanningMedia({
        file,
        planningProjectId,
        category: "references",
      });

      setData((current) => {
        const nextRefs = [...current.visualDirection.references];
        nextRefs[index] = { ...nextRefs[index], url };
        return {
          ...current,
          visualDirection: { ...current.visualDirection, references: nextRefs },
        };
      });
    } catch (err) {
      setRefUploadErrors((current) => ({
        ...current,
        [index]: err instanceof Error ? err.message : "Erro ao enviar imagem.",
      }));
    } finally {
      setUploadingRefIndex(null);
      event.target.value = "";
    }
  }

  function removeVisualReference(index: number) {
    setData((current) => ({
      ...current,
      visualDirection: {
        ...current.visualDirection,
        references: current.visualDirection.references.filter(
          (_, i) => i !== index
        ),
      },
    }));
  }

  function addVisualReferenceSlot() {
    setData((current) => ({
      ...current,
      visualDirection: {
        ...current.visualDirection,
        references: [
          ...current.visualDirection.references,
          createEmptyInstagramImageReference(),
        ],
      },
    }));
  }

  // ─── Bio photo handlers ───────────────────────────────────────────────────────

  async function uploadBioPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingProfilePhoto(true);
    setProfilePhotoError("");

    try {
      const { url } = await uploadPlanningMedia({
        file,
        planningProjectId,
        category: "profile",
      });

      setData((current) => ({
        ...current,
        profile: { ...current.profile, photoUrl: url },
      }));
    } catch (err) {
      setProfilePhotoError(
        err instanceof Error ? err.message : "Erro ao enviar foto."
      );
    } finally {
      setUploadingProfilePhoto(false);
      event.target.value = "";
    }
  }

  function removeBioPhoto() {
    setData((current) => ({
      ...current,
      profile: { ...current.profile, photoUrl: "" },
    }));
  }

  // ─── External references handlers ─────────────────────────────────────────────

  function updateReference(index: number, key: "title" | "url", value: string) {
    setData((current) => {
      const nextRefs = [...current.externalReferences];
      nextRefs[index] = { ...nextRefs[index], [key]: value };
      return { ...current, externalReferences: nextRefs };
    });
  }

  function addReference() {
    setData((current) => ({
      ...current,
      externalReferences: [
        ...current.externalReferences,
        createEmptyInstagramExternalReference(),
      ],
    }));
  }

  function removeReference(index: number) {
    setData((current) => ({
      ...current,
      externalReferences:
        current.externalReferences.length > 1
          ? current.externalReferences.filter((_, i) => i !== index)
          : [createEmptyInstagramExternalReference()],
    }));
  }

  // ─── Strategic direction handler ─────────────────────────────────────────────

  function updateStrategicDirection(
    key: keyof InstagramData["strategicDirection"],
    value: string
  ) {
    setData((current) => ({
      ...current,
      strategicDirection: {
        ...current.strategicDirection,
        [key]: value,
      },
    }));
  }

  // ─── Link items handlers ──────────────────────────────────────────────────────

  function updateLinkItem(id: string, key: "title" | "url", value: string) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        linkItems: current.profile.linkItems.map((l) =>
          l.id === id ? { ...l, [key]: value } : l
        ),
      },
    }));
  }

  function addLinkItem() {
    setData((current) => {
      const newLink = {
        ...createEmptyInstagramProfileLink(),
        order: current.profile.linkItems.length,
      };
      return {
        ...current,
        profile: {
          ...current.profile,
          linkItems: [...current.profile.linkItems, newLink],
        },
      };
    });
  }

  function removeLinkItem(id: string) {
    setData((current) => {
      const reordered = current.profile.linkItems
        .filter((l) => l.id !== id)
        .map((l, i) => ({ ...l, order: i }));
      return {
        ...current,
        profile: { ...current.profile, linkItems: reordered },
      };
    });
  }

  function moveLinkItem(id: string, direction: "up" | "down") {
    setData((current) => {
      const sorted = [...current.profile.linkItems].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((l) => l.id === id);
      if (index === -1) return current;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return current;
      [sorted[index], sorted[targetIndex]] = [sorted[targetIndex], sorted[index]];
      const reordered = sorted.map((l, i) => ({ ...l, order: i }));
      return { ...current, profile: { ...current.profile, linkItems: reordered } };
    });
  }

  // ─── Highlights handlers ──────────────────────────────────────────────────────

  function updateHighlight(id: string, key: "title" | "purpose", value: string) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        highlights: current.profile.highlights.map((h) =>
          h.id === id ? { ...h, [key]: value } : h
        ),
      },
    }));
  }

  function addHighlight() {
    setData((current) => {
      const newHighlight = {
        ...createEmptyInstagramHighlight(),
        order: current.profile.highlights.length,
      };
      return {
        ...current,
        profile: {
          ...current.profile,
          highlights: [...current.profile.highlights, newHighlight],
        },
      };
    });
  }

  function removeHighlight(id: string) {
    setData((current) => {
      const reordered = current.profile.highlights
        .filter((h) => h.id !== id)
        .map((h, i) => ({ ...h, order: i }));
      return {
        ...current,
        profile: { ...current.profile, highlights: reordered },
      };
    });
    setHighlightUploadErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    if (uploadingHighlightId === id) {
      setUploadingHighlightId(null);
    }
  }

  function moveHighlight(id: string, direction: "up" | "down") {
    setData((current) => {
      const sorted = [...current.profile.highlights].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((h) => h.id === id);
      if (index === -1) return current;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return current;
      [sorted[index], sorted[targetIndex]] = [sorted[targetIndex], sorted[index]];
      const reordered = sorted.map((h, i) => ({ ...h, order: i }));
      return { ...current, profile: { ...current.profile, highlights: reordered } };
    });
  }

  async function uploadHighlightImage(
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingHighlightId(id);
    setHighlightUploadErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });

    try {
      const { url } = await uploadPlanningMedia({
        file,
        planningProjectId,
        category: "highlights",
      });

      setData((current) => ({
        ...current,
        profile: {
          ...current.profile,
          highlights: current.profile.highlights.map((h) =>
            h.id === id ? { ...h, imageUrl: url } : h
          ),
        },
      }));
    } catch (err) {
      setHighlightUploadErrors((current) => ({
        ...current,
        [id]: err instanceof Error ? err.message : "Erro ao enviar imagem.",
      }));
    } finally {
      setUploadingHighlightId(null);
      event.target.value = "";
    }
  }

  function removeHighlightImage(id: string) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        highlights: current.profile.highlights.map((h) =>
          h.id === id ? { ...h, imageUrl: "" } : h
        ),
      },
    }));
  }

  // ─── InlineList ───────────────────────────────────────────────────────────────

  function InlineList({
    items,
    onChangeItem,
    onAddItem,
    onRemoveItem,
    placeholder,
    buttonLabel,
  }: {
    items: string[];
    onChangeItem: (index: number, value: string) => void;
    onAddItem: () => void;
    onRemoveItem: (index: number) => void;
    placeholder: string;
    buttonLabel: string;
  }) {
    return (
      <div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={item}
                onChange={(event) => onChangeItem(index, event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onAddItem}
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + {buttonLabel}
        </button>
      </div>
    );
  }

  // Derived flat lists
  const languageItems = data.languageStructures.map((l) => l.howItAppears);

  // ─── JSX ─────────────────────────────────────────────────────────────────────

  return (
    <div className="mt-6">
      {/* ── Navegação interna ── */}
      <nav className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ── 0. Direção estratégica ── */}
      <FormSection
        id="instagram-strategic-direction"
        title="Direção estratégica"
        description="Defina o papel do Instagram, sua função no ecossistema e as prioridades que orientarão o canal."
      >
        <div className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Papel estratégico do Instagram
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Explique por que o Instagram existe dentro desta estratégia e qual função principal deverá cumprir.
            </p>
            <textarea
              value={data.strategicDirection.channelRole}
              onChange={(event) =>
                updateStrategicDirection("channelRole", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Estratégia geral do canal
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Descreva como o canal será utilizado para gerar descoberta, autoridade, relacionamento e conversão.
            </p>
            <RichTextEditor
              value={data.strategicDirection.generalStrategy}
              onChange={(value) =>
                updateStrategicDirection("generalStrategy", value)
              }
              placeholder="Descreva como o canal será utilizado para gerar descoberta, autoridade, relacionamento e conversão."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Públicos e personas prioritárias
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Identifique quais públicos e personas devem receber maior atenção no Instagram.
            </p>
            <textarea
              value={data.strategicDirection.priorityAudiences}
              onChange={(event) =>
                updateStrategicDirection("priorityAudiences", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Função no ecossistema digital
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Explique de quais canais o Instagram recebe audiência e para quais destinos deverá direcioná-la.
            </p>
            <textarea
              value={data.strategicDirection.ecosystemFunction}
              onChange={(event) =>
                updateStrategicDirection("ecosystemFunction", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Diferenciação do perfil
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Registre o que deverá fazer este perfil parecer diferente de concorrentes, agências ou perfis genéricos do nicho.
            </p>
            <textarea
              value={data.strategicDirection.profileDifferentiation}
              onChange={(event) =>
                updateStrategicDirection("profileDifferentiation", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Prioridades editoriais iniciais
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Defina os temas, conceitos e mensagens que devem receber prioridade no primeiro ciclo editorial.
            </p>
            <textarea
              value={data.strategicDirection.initialEditorialPriorities}
              onChange={(event) =>
                updateStrategicDirection("initialEditorialPriorities", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>
        </div>
      </FormSection>

      {/* ── 1. Perfil do Instagram ── */}
      <FormSection
        id="instagram-profile"
        title="Perfil do Instagram"
        description="Configure como o perfil será apresentado visualmente ao público."
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="space-y-10">
        {/* SubSection 1: Identificação */}
        <SubSection
          title="Identificação do perfil"
          description="Dados básicos de identificação do perfil no Instagram."
        >
          <div className="mb-4 flex justify-end">
            <label className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={data.profile.enabled}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    profile: { ...current.profile, enabled: event.target.checked },
                  }))
                }
                className="h-4 w-4 rounded border-slate-300"
              />
              Ativar bio
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
            <div>
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
                {data.profile.photoUrl ? (
                  <img
                    src={data.profile.photoUrl}
                    alt="Foto do perfil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Foto"
                )}
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <label className="cursor-pointer rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800">
                  {uploadingProfilePhoto ? "Enviando..." : "Escolher foto"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={uploadBioPhoto}
                    disabled={uploadingProfilePhoto}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={removeBioPhoto}
                  className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Remover
                </button>

                {profilePhotoError && (
                  <p className="text-xs text-red-500">{profilePhotoError}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Arroba do perfil
                </label>
                <input
                  type="text"
                  value={data.profile.handle}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      profile: { ...current.profile, handle: event.target.value },
                    }))
                  }
                  placeholder="Ex: @nomedoperfil"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Nome do perfil
                </label>
                <input
                  type="text"
                  value={data.profile.displayName}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      profile: { ...current.profile, displayName: event.target.value },
                    }))
                  }
                  placeholder="Ex: Nome do especialista ou da marca"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>
          </div>
        </SubSection>

        {/* SubSection 2: Biografia */}
        <SubSection
          title="Biografia"
          description="Texto da bio e link principal exibido no perfil."
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Conteúdo da bio
              </label>
              <RichTextEditor
                value={data.profile.bio}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    profile: { ...current.profile, bio: value },
                  }))
                }
                placeholder="Escreva uma sugestão de bio para o Instagram."
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Link principal
              </label>
              <input
                type="url"
                value={data.profile.mainLink}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    profile: { ...current.profile, mainLink: event.target.value },
                  }))
                }
                placeholder="https://..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>
        </SubSection>

        {/* SubSection 3: Links do perfil */}
        <SubSection
          title="Links do perfil"
          description="Lista de links adicionais que poderão ser exibidos em uma página de menu."
        >
          {data.profile.linkItems.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhum link adicional cadastrado.</p>
              <button
                type="button"
                onClick={addLinkItem}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar link
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.profile.linkItems
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((link, index, sorted) => (
                  <div
                    key={link.id}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Título do link
                      </label>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(event) =>
                          updateLinkItem(link.id, "title", event.target.value)
                        }
                        placeholder="Ex: Site, Portfólio, WhatsApp..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        URL
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(event) =>
                          updateLinkItem(link.id, "url", event.target.value)
                        }
                        placeholder="https://..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => moveLinkItem(link.id, "up")}
                        disabled={index === 0}
                        className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveLinkItem(link.id, "down")}
                        disabled={index === sorted.length - 1}
                        className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeLinkItem(link.id)}
                        className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              <button
                type="button"
                onClick={addLinkItem}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar link
              </button>
            </div>
          )}
        </SubSection>

        {/* SubSection 4: Destaques */}
        <SubSection
          title="Destaques"
          description="Destaques fixos exibidos no perfil do Instagram."
        >
          {data.profile.highlights.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhum destaque cadastrado.</p>
              <button
                type="button"
                onClick={addHighlight}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar destaque
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.profile.highlights
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((highlight, index, sorted) => (
                  <div
                    key={highlight.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                          {highlight.imageUrl ? (
                            <img
                              src={highlight.imageUrl}
                              alt={highlight.title || "Destaque"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-slate-400">Sem imagem</span>
                          )}
                        </div>
                      </div>

                      <div className="grid flex-1 gap-3 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-600">
                            Nome do destaque
                          </label>
                          <input
                            type="text"
                            value={highlight.title}
                            onChange={(event) =>
                              updateHighlight(highlight.id, "title", event.target.value)
                            }
                            placeholder="Ex: Sobre, Serviços, Depoimentos..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-600">
                            Função
                          </label>
                          <input
                            type="text"
                            value={highlight.purpose}
                            onChange={(event) =>
                              updateHighlight(highlight.id, "purpose", event.target.value)
                            }
                            placeholder="Ex: Apresentar o especialista, mostrar serviços..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                          />
                        </div>
                      </div>

                      <div className="flex flex-shrink-0 flex-col items-end justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => moveHighlight(highlight.id, "up")}
                          disabled={index === 0}
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveHighlight(highlight.id, "down")}
                          disabled={index === sorted.length - 1}
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeHighlight(highlight.id)}
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label
                        className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition ${
                          uploadingHighlightId === highlight.id
                            ? "bg-slate-200 text-slate-500"
                            : "bg-slate-950 text-white hover:bg-slate-800"
                        }`}
                      >
                        {uploadingHighlightId === highlight.id
                          ? "Enviando..."
                          : "Enviar imagem"}
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={(event) => uploadHighlightImage(highlight.id, event)}
                          disabled={uploadingHighlightId === highlight.id}
                          className="hidden"
                        />
                      </label>

                      {highlight.imageUrl && (
                        <button
                          type="button"
                          onClick={() => removeHighlightImage(highlight.id)}
                          className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                          Remover imagem
                        </button>
                      )}

                      {highlightUploadErrors[highlight.id] && (
                        <p className="text-xs text-red-500">
                          {highlightUploadErrors[highlight.id]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              <button
                type="button"
                onClick={addHighlight}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar destaque
              </button>
            </div>
          )}
        </SubSection>
          </div>
          <div>
            <InstagramProfilePreview profile={data.profile} />
          </div>
        </div>
      </FormSection>

      {/* ── 2. Frequência e objetivos ── */}
      <FormSection
        id="instagram-frequency-objectives"
        title="Frequência e objetivos"
        description="Defina a cadência de publicação e os resultados esperados para o canal."
      >
        {/* SubSection 1: Cadência por formato */}
        <SubSection
          title="Cadência por formato"
          description="Defina a frequência de publicação por formato de conteúdo e o papel de cada um na jornada."
        >
          {data.publishing.frequencyItems.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">
                Nenhuma frequência por formato cadastrada.
              </p>
              <button
                type="button"
                onClick={addFrequencyItem}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar formato
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.publishing.frequencyItems.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      Formato {String(index + 1).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFrequencyItem(item.id)}
                      className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1fr_140px_180px]">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Formato
                      </label>
                      <input
                        type="text"
                        value={item.format}
                        onChange={(event) =>
                          updateFrequencyItem(item.id, "format", event.target.value)
                        }
                        placeholder="Reels, Carrossel, Stories, Live..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Quantidade
                      </label>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(event) =>
                          updateFrequencyItem(item.id, "quantity", event.target.value)
                        }
                        placeholder="3, diário..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Período
                      </label>
                      <select
                        value={item.period}
                        onChange={(event) =>
                          updateFrequencyItem(item.id, "period", event.target.value)
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      >
                        {!["por dia", "por semana", "por mês"].includes(item.period) &&
                          item.period && (
                            <option value={item.period}>{item.period}</option>
                          )}
                        <option value="por dia">por dia</option>
                        <option value="por semana">por semana</option>
                        <option value="por mês">por mês</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Papel na jornada
                      </label>
                      <input
                        type="text"
                        value={item.journeyRole}
                        onChange={(event) =>
                          updateFrequencyItem(item.id, "journeyRole", event.target.value)
                        }
                        placeholder="Descoberta, aprofundamento, relacionamento ou conversão"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Observações
                      </label>
                      <textarea
                        value={item.notes}
                        onChange={(event) =>
                          updateFrequencyItem(item.id, "notes", event.target.value)
                        }
                        rows={2}
                        placeholder="Ex: Priorizar conteúdos de autoridade."
                        className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addFrequencyItem}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar formato
              </button>
            </div>
          )}
        </SubSection>

        {/* SubSection 2: Frequência sustentável */}
        <SubSection
          title="Frequência sustentável"
          description="Estabeleça os limites de produção para orientar decisões operacionais ao longo do tempo."
        >
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Frequência mínima viável
              </label>
              <p className="mb-2 text-xs leading-5 text-slate-500">
                Registre a cadência mínima necessária para manter consistência sem comprometer a estratégia.
              </p>
              <textarea
                value={data.publishing.minimumViableFrequency}
                onChange={(event) =>
                  updatePublishing("minimumViableFrequency", event.target.value)
                }
                rows={3}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Frequência recomendada
              </label>
              <p className="mb-2 text-xs leading-5 text-slate-500">
                Defina a cadência considerada ideal para alcançar os objetivos do canal.
              </p>
              <textarea
                value={data.publishing.recommendedFrequency}
                onChange={(event) =>
                  updatePublishing("recommendedFrequency", event.target.value)
                }
                rows={3}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Frequência máxima sustentável
              </label>
              <p className="mb-2 text-xs leading-5 text-slate-500">
                Estabeleça o limite de produção que pode ser mantido sem comprometer qualidade ou operação.
              </p>
              <textarea
                value={data.publishing.maximumSustainableFrequency}
                onChange={(event) =>
                  updatePublishing("maximumSustainableFrequency", event.target.value)
                }
                rows={3}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>
        </SubSection>

        {/* SubSection 3: Rotina operacional */}
        <SubSection
          title="Rotina operacional"
          description="Documente como a produção e os ajustes serão gerenciados na prática."
        >
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Rotina de produção
              </label>
              <p className="mb-2 text-xs leading-5 text-slate-500">
                Descreva como gravação, produção, edição, aprovação e publicação serão organizadas.
              </p>
              <textarea
                value={data.publishing.productionRoutine}
                onChange={(event) =>
                  updatePublishing("productionRoutine", event.target.value)
                }
                rows={5}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Regra de ajuste operacional
              </label>
              <p className="mb-2 text-xs leading-5 text-slate-500">
                Defina quando reduzir, ampliar ou reorganizar a frequência do canal.
              </p>
              <textarea
                value={data.publishing.adjustmentRule}
                onChange={(event) =>
                  updatePublishing("adjustmentRule", event.target.value)
                }
                rows={5}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>
        </SubSection>

        {/* SubSection 4: Objetivos do canal */}
        <SubSection
          title="Objetivos do canal"
          description="Registre os objetivos estratégicos do Instagram com indicadores, metas e prazos."
        >
          {data.objectives.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhum objetivo cadastrado.</p>
              <button
                type="button"
                onClick={addObjective}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar objetivo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.objectives.map((obj, index) => (
                <div
                  key={obj.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      Objetivo {String(index + 1).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeObjective(obj.id)}
                      className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Objetivo
                      </label>
                      <textarea
                        value={obj.objective}
                        onChange={(event) =>
                          updateObjective(obj.id, "objective", event.target.value)
                        }
                        rows={3}
                        placeholder="Ex: Gerar contatos qualificados para o atendimento."
                        className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Indicador
                        </label>
                        <input
                          type="text"
                          value={obj.indicator}
                          onChange={(event) =>
                            updateObjective(obj.id, "indicator", event.target.value)
                          }
                          placeholder="Ex: cliques na bio, mensagens iniciadas..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Meta
                        </label>
                        <input
                          type="text"
                          value={obj.target}
                          onChange={(event) =>
                            updateObjective(obj.id, "target", event.target.value)
                          }
                          placeholder="Ex: 55 contatos mensais, linha de base..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Prazo
                        </label>
                        <input
                          type="text"
                          value={obj.deadline}
                          onChange={(event) =>
                            updateObjective(obj.id, "deadline", event.target.value)
                          }
                          placeholder="Ex: primeiros 30 dias, segundo mês..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Status da definição
                      </label>
                      <select
                        value={obj.validationStatus}
                        onChange={(event) =>
                          updateObjective(obj.id, "validationStatus", event.target.value)
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 md:w-64"
                      >
                        <option value="hypothesis">Hipótese a validar</option>
                        <option value="validated">Objetivo validado</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addObjective}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar objetivo
              </button>
            </div>
          )}
        </SubSection>
      </FormSection>

      {/* ── 3. Arquitetura de conteúdo ── */}
      <FormSection
        id="instagram-content"
        title="Arquitetura de conteúdo"
        description="Organize os formatos, temas e possibilidades editoriais do Instagram."
      >
        {/* SubSection 1: Formatos de conteúdo */}
        <SubSection
          title="Formatos de conteúdo"
          description="Registre os formatos utilizados no canal, com estrutura, duração, papel na jornada, finalidade, CTA e observações."
        >
          {data.contentArchitecture.formats.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhum formato de conteúdo cadastrado.</p>
              <button
                type="button"
                onClick={addFormat}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar formato
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.contentArchitecture.formats.map((format, index) => (
                <div
                  key={format.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      Formato {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveFormat(format.id, "up")}
                        disabled={index === 0}
                        aria-label="Mover formato para cima"
                        className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveFormat(format.id, "down")}
                        disabled={index === data.contentArchitecture.formats.length - 1}
                        aria-label="Mover formato para baixo"
                        className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFormat(format.id)}
                        className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Nome do formato
                      </label>
                      <input
                        type="text"
                        value={format.name}
                        onChange={(event) =>
                          updateFormat(format.id, "name", event.target.value)
                        }
                        placeholder="Ex.: Reenquadramento de crença, Carrossel educativo ou Live curta"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Duração ou extensão
                      </label>
                      <input
                        type="text"
                        value={format.duration}
                        onChange={(event) =>
                          updateFormat(format.id, "duration", event.target.value)
                        }
                        placeholder="30 a 45 segundos"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-1 block text-sm font-semibold text-slate-600">
                      Estrutura
                    </label>
                    <p className="mb-2 text-xs leading-5 text-slate-500">
                      Descreva a sequência ou construção recomendada para esse formato.
                    </p>
                    <textarea
                      value={format.structure}
                      onChange={(event) =>
                        updateFormat(format.id, "structure", event.target.value)
                      }
                      rows={3}
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Papel na jornada
                      </label>
                      <input
                        type="text"
                        value={format.journeyRole}
                        onChange={(event) =>
                          updateFormat(format.id, "journeyRole", event.target.value)
                        }
                        placeholder="Descoberta, consciência, consideração, decisão ou relacionamento"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-600">
                        CTA recomendado
                      </label>
                      <p className="mb-2 text-xs leading-5 text-slate-500">
                        Registre o próximo passo mais adequado para esse formato.
                      </p>
                      <input
                        type="text"
                        value={format.cta}
                        onChange={(event) =>
                          updateFormat(format.id, "cta", event.target.value)
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-1 block text-sm font-semibold text-slate-600">
                      Finalidade estratégica
                    </label>
                    <p className="mb-2 text-xs leading-5 text-slate-500">
                      Explique o que esse formato deve gerar na estratégia do canal.
                    </p>
                    <textarea
                      value={format.purpose}
                      onChange={(event) =>
                        updateFormat(format.id, "purpose", event.target.value)
                      }
                      rows={2}
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="mb-1 block text-sm font-semibold text-slate-600">
                      Observações
                    </label>
                    <textarea
                      value={format.notes}
                      onChange={(event) =>
                        updateFormat(format.id, "notes", event.target.value)
                      }
                      rows={2}
                      placeholder="Use para regras, restrições ou aplicações específicas."
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addFormat}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar formato
              </button>
            </div>
          )}
        </SubSection>

        {/* SubSection 2: Stories estratégicos */}
        <SubSection
          title="Stories estratégicos"
          description="Registre os tipos de Stories utilizados estrategicamente, com frequência, etapa da jornada, finalidade, CTA e descrição."
        >
          {data.contentArchitecture.stories.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhum Story estratégico cadastrado.</p>
              <button
                type="button"
                onClick={addStory}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar Story estratégico
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.contentArchitecture.stories.map((story, index) => (
                <div
                  key={story.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      Story {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveStory(story.id, "up")}
                        disabled={index === 0}
                        aria-label="Mover Story para cima"
                        className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStory(story.id, "down")}
                        disabled={index === data.contentArchitecture.stories.length - 1}
                        aria-label="Mover Story para baixo"
                        className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStory(story.id)}
                        className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1fr_160px_180px]">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Nome do Story estratégico
                      </label>
                      <input
                        type="text"
                        value={story.name}
                        onChange={(event) =>
                          updateStory(story.id, "name", event.target.value)
                        }
                        placeholder="Ex.: Bastidor de raciocínio, Enquete de identificação ou Caixa de perguntas"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Frequência
                      </label>
                      <input
                        type="text"
                        value={story.frequency}
                        onChange={(event) =>
                          updateStory(story.id, "frequency", event.target.value)
                        }
                        placeholder="Diário, semanal..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Etapa da jornada
                      </label>
                      <input
                        type="text"
                        value={story.journeyStage}
                        onChange={(event) =>
                          updateStory(story.id, "journeyStage", event.target.value)
                        }
                        placeholder="Descoberta, consciência, consideração ou decisão"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-600">
                        Finalidade estratégica
                      </label>
                      <p className="mb-2 text-xs leading-5 text-slate-500">
                        Explique o papel desse Story na estratégia.
                      </p>
                      <textarea
                        value={story.purpose}
                        onChange={(event) =>
                          updateStory(story.id, "purpose", event.target.value)
                        }
                        rows={3}
                        className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        CTA
                      </label>
                      <input
                        type="text"
                        value={story.cta}
                        onChange={(event) =>
                          updateStory(story.id, "cta", event.target.value)
                        }
                        placeholder="Responder à enquete, enviar uma dúvida..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-1 block text-sm font-semibold text-slate-600">
                      Descrição
                    </label>
                    <p className="mb-2 text-xs leading-5 text-slate-500">
                      Descreva como esse Story deve ser aplicado ou desenvolvido.
                    </p>
                    <textarea
                      value={story.description}
                      onChange={(event) =>
                        updateStory(story.id, "description", event.target.value)
                      }
                      rows={3}
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addStory}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar Story estratégico
              </button>
            </div>
          )}
        </SubSection>

        {/* SubSection 3: Diretrizes editoriais */}
        <SubSection
          title="Diretrizes editoriais"
          description="Registre princípios, temas prioritários, restrições e orientações que devem ser considerados na produção de conteúdo."
        >
          {data.contentArchitecture.generalContentGuidelines.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhuma diretriz editorial cadastrada.</p>
              <button
                type="button"
                onClick={addContent}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar diretriz
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-3">
                {data.contentArchitecture.generalContentGuidelines.map(
                  (guideline, index) => (
                    <div key={index} className="flex gap-3">
                      <textarea
                        value={guideline}
                        onChange={(event) => updateContent(index, event.target.value)}
                        rows={2}
                        placeholder="Ex.: Cada conteúdo deve partir de um sintoma reconhecível e indicar um próximo movimento."
                        className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                      <div className="flex flex-shrink-0 flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => moveContent(index, "up")}
                          disabled={index === 0}
                          aria-label="Mover diretriz para cima"
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveContent(index, "down")}
                          disabled={
                            index ===
                            data.contentArchitecture.generalContentGuidelines.length - 1
                          }
                          aria-label="Mover diretriz para baixo"
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeContent(index)}
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={addContent}
                className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar diretriz
              </button>
            </div>
          )}
        </SubSection>

        {/* SubSection 4: Hashtags */}
        <SubSection
          title="Hashtags"
          description="Registre hashtags importantes para descoberta, nicho, localização, autoridade e temas recorrentes."
        >
          <InlineList
            items={flatHashtags}
            onChangeItem={updateHashtag}
            onAddItem={addHashtag}
            onRemoveItem={removeHashtag}
            placeholder="Ex: #marketingdigital, #estrategiadeconteudo..."
            buttonLabel="Nova hashtag"
          />
        </SubSection>
      </FormSection>

      {/* ── 4. Estrutura de linguagem ── */}
      <FormSection
        id="instagram-language"
        title="Estrutura de linguagem"
        description="Registre como a comunicação deve aparecer nos conteúdos do canal."
      >
        <InlineList
          items={languageItems}
          onChangeItem={updateLanguageStructure}
          onAddItem={addLanguageStructure}
          onRemoveItem={removeLanguageStructure}
          placeholder="Ex: Gancho forte, explicação simples, exemplo prático, chamada final..."
          buttonLabel="Nova estrutura de linguagem"
        />
      </FormSection>

      {/* ── 5. Direção visual ── */}
      <FormSection
        id="instagram-visual"
        title="Direção visual"
        description="Defina a aparência, as referências e a sensação transmitida pelo perfil."
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Estratégia visual
          </label>

          <RichTextEditor
            value={data.visualDirection.generalStrategy}
            onChange={(value) =>
              setData((current) => ({
                ...current,
                visualDirection: {
                  ...current.visualDirection,
                  generalStrategy: value,
                },
              }))
            }
            placeholder="Explique a direção visual do Instagram: estilo dos posts, cores, fundos, fotos, vídeos, ritmo, estética e referências."
          />
        </div>

        {data.visualDirection.references.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {data.visualDirection.references.map((reference, index) => (
              <div
                key={reference.id}
                className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
              >
                <label className="flex aspect-[4/3] cursor-pointer items-center justify-center text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100">
                  {uploadingRefIndex === index ? (
                    <span>Enviando...</span>
                  ) : reference.url ? (
                    <img
                      src={reference.url}
                      alt={`Referência ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>
                      +<br />
                      Adicionar referência
                    </span>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => uploadVisualReference(index, event)}
                    disabled={uploadingRefIndex !== null}
                    className="hidden"
                  />
                </label>

                <div className="p-3">
                  {refUploadErrors[index] && (
                    <p className="mb-2 text-xs text-red-500">
                      {refUploadErrors[index]}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => removeVisualReference(index)}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={addVisualReferenceSlot}
            className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
          >
            + Adicionar referência
          </button>

          <p className="text-xs text-slate-500">
            Tamanho recomendado para imagem de feed: 1080x1350px.
          </p>
        </div>
      </FormSection>

      {/* ── 6. Referências externas ── */}
      <FormSection
        id="instagram-references"
        title="Referências externas"
        description="Centralize links e materiais que apoiam a estratégia do Instagram."
      >
        <div className="space-y-4">
          {data.externalReferences.map((reference, index) => (
            <div
              key={reference.id}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Título da referência
                </label>

                <input
                  type="text"
                  value={reference.title}
                  onChange={(event) =>
                    updateReference(index, "title", event.target.value)
                  }
                  placeholder="Ex: Perfil, post, reels, campanha ou referência visual"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Link
                </label>

                <input
                  type="url"
                  value={reference.url}
                  onChange={(event) =>
                    updateReference(index, "url", event.target.value)
                  }
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addReference}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Nova referência
        </button>
      </FormSection>

      {/* ── Sticky save bar ── */}
      <div className="sticky bottom-0 rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href={`/admin/planejamentos/${clientSlug}`}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Voltar para módulos
          </Link>

          <Link
            href={presentationHref}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
