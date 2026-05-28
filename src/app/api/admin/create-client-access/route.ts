import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export async function POST(request: NextRequest) {
  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: { email?: string; password?: string; fullName?: string; clientId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const { email, password, fullName, clientId } = body;

  // ── 2. Validate required fields ────────────────────────────────────────────
  if (!email || !password || !fullName || !clientId) {
    return NextResponse.json(
      { success: false, error: "Campos obrigatórios: email, password, fullName, clientId." },
      { status: 400 }
    );
  }

  // ── 3. Authenticate caller via JWT from Authorization header ───────────────
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ success: false, error: "Não autenticado." }, { status: 401 });
  }

  // Use anon client (server-side, no persistence) to verify the token
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabaseAnon = createClient(SUPABASE_URL, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await supabaseAnon.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ success: false, error: "Sessão inválida ou expirada." }, { status: 401 });
  }

  // ── 4. Check strategist role ───────────────────────────────────────────────
  const { data: profile, error: profileError } = await supabaseAnon
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ success: false, error: "Perfil não encontrado." }, { status: 403 });
  }

  if (profile.role !== "strategist") {
    return NextResponse.json(
      { success: false, error: "Acesso negado. Apenas estrategistas podem criar acesso de clientes." },
      { status: 403 }
    );
  }

  // ── 5. Build admin client (service role — server only) ─────────────────────
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return NextResponse.json(
      { success: false, error: "SUPABASE_SERVICE_ROLE_KEY não configurada no servidor." },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(SUPABASE_URL, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ── 6. Create auth user ────────────────────────────────────────────────────
  const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role: "client" },
  });

  if (createError) {
    const alreadyExists =
      createError.message.toLowerCase().includes("already") ||
      createError.message.toLowerCase().includes("registered") ||
      createError.message.toLowerCase().includes("duplicate");

    if (alreadyExists) {
      return NextResponse.json(
        { success: false, error: `Este e-mail já está cadastrado no Supabase Auth: ${email}` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Erro ao criar usuário: ${createError.message}` },
      { status: 500 }
    );
  }

  const userId = newUser.user?.id;
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Usuário criado mas UID não retornado. Verifique o Supabase Auth." },
      { status: 500 }
    );
  }

  // ── 7. Upsert profile ──────────────────────────────────────────────────────
  const { error: upsertError } = await supabaseAdmin.from("profiles").upsert(
    {
      id: userId,
      full_name: fullName,
      email: email,
      role: "client",
      client_id: clientId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (upsertError) {
    return NextResponse.json(
      {
        success: false,
        error: `Usuário criado (UID: ${userId}), mas houve erro ao criar o profile: ${upsertError.message}`,
      },
      { status: 500 }
    );
  }

  // ── 8. Return success ──────────────────────────────────────────────────────
  return NextResponse.json({
    success: true,
    userId,
    email,
    fullName,
    clientId,
  });
}
