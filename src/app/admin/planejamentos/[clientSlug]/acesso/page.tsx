"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";
import { supabase } from "@/lib/supabase";

type ClientRecord = {
  id: string;
  name: string;
  slug: string;
};

type PlanningProject = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "in_progress" | "published" | "archived";
  clients: ClientRecord | ClientRecord[] | null;
};

function getProjectClient(project: PlanningProject): ClientRecord | null {
  if (Array.isArray(project.clients)) return project.clients[0] ?? null;
  return project.clients ?? null;
}

function getStatusLabel(status: PlanningProject["status"]) {
  if (status === "draft") return "Rascunho";
  if (status === "in_progress") return "Em andamento";
  if (status === "published") return "Publicado";
  return "Arquivado";
}

function getStatusClass(status: PlanningProject["status"]) {
  if (status === "published") return "bg-emerald-100 text-emerald-700";
  if (status === "in_progress") return "bg-amber-100 text-amber-700";
  if (status === "archived") return "bg-slate-200 text-slate-500";
  return "bg-slate-100 text-slate-600";
}

function generatePassword(name: string): string {
  const firstName = name.trim().split(" ")[0] ?? "cliente";
  return `${firstName.toLowerCase()}@2026`;
}

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 active:bg-slate-300"
    >
      {copied ? "Copiado!" : (label ?? "Copiar")}
    </button>
  );
}

function MonoBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-slate-950 px-6 py-5 text-sm leading-7 text-emerald-300">
      <pre className="whitespace-pre-wrap font-mono">{children}</pre>
    </div>
  );
}

export default function AcessoClientePage() {
  const router = useRouter();
  const params = useParams();
  const clientSlug = typeof params.clientSlug === "string" ? params.clientSlug : "";

  const [project, setProject] = useState<PlanningProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");

  const client = project ? getProjectClient(project) : null;

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setErrorMessage("");

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        window.localStorage.removeItem("metodo-epc-strategist-auth");
        router.push("/estrategista/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (profileError || profile?.role !== "strategist") {
        await supabase.auth.signOut();
        window.localStorage.removeItem("metodo-epc-strategist-auth");
        router.push("/estrategista/login");
        return;
      }

      const { data, error } = await supabase
        .from("planning_projects")
        .select(
          `id, title, slug, status, clients!inner (id, name, slug)`
        )
        .eq("clients.slug", clientSlug)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (error) {
        setErrorMessage(error.message || "Não foi possível carregar este planejamento.");
        setIsLoading(false);
        return;
      }

      const found = (data?.[0] ?? null) as unknown as PlanningProject | null;
      if (!found) {
        setErrorMessage("Planejamento não encontrado para este cliente.");
        setIsLoading(false);
        return;
      }

      setProject(found);

      const clientRecord = Array.isArray(found.clients)
        ? found.clients[0]
        : found.clients;
      const name = clientRecord?.name ?? "";
      setPassword(generatePassword(name));
      setIsLoading(false);
    }

    if (clientSlug) load();
  }, [clientSlug, router]);

  const profileSql = uid.trim()
    ? `insert into profiles (id, full_name, email, role, client_id)\nvalues (\n  '${uid.trim()}',\n  '${client?.name ?? ""}',\n  '${email}',\n  'client',\n  '${client?.id ?? ""}'\n)\non conflict (id) do update set\n  full_name = excluded.full_name,\n  email = excluded.email,\n  role = excluded.role,\n  client_id = excluded.client_id,\n  updated_at = now();`
    : null;

  const clientMessage = `Olá, ${client?.name ?? ""}.\nSeu acesso ao planejamento estratégico está disponível:\n\nURL: https://app.metodoepc.com.br\nLogin: ${email}\nSenha provisória: ${password}`;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/planejamentos/${clientSlug}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Voltar ao planejamento
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        {isLoading && (
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500">Carregando...</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">Atenção</p>
            <h1 className="mt-4 text-2xl font-bold tracking-[-0.04em]">{errorMessage}</h1>
            <Link
              href="/admin"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Voltar ao painel
            </Link>
          </div>
        )}

        {!isLoading && project && client && (
          <div className="space-y-6">
            {/* Header card */}
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Acesso do cliente
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">
                Configurar acesso
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Use esta tela para montar manualmente o acesso do cliente no Supabase. Nenhuma ação é executada automaticamente — os dados abaixo são apenas para guiar a criação.
              </p>
            </div>

            {/* Client data */}
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Dados do cliente e planejamento
              </p>

              <div className="mt-6 divide-y divide-slate-100">
                <DataRow label="Cliente" value={client.name} copyable />
                <DataRow label="Slug do cliente" value={client.slug} copyable />
                <DataRow label="ID do cliente (client_id)" value={client.id} copyable mono />
                <DataRow label="Planejamento" value={project.title} />
                <DataRow label="Slug da apresentação" value={project.slug} copyable />
                <DataRow
                  label="Status"
                  value={getStatusLabel(project.status)}
                  badge={getStatusClass(project.status)}
                />
              </div>
            </div>

            {/* Credentials */}
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Credenciais de acesso
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Defina o e-mail e a senha provisória que serão usados para criar o usuário no Supabase Auth. A senha não é salva em nenhum lugar.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    E-mail do cliente
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@cliente.com"
                      className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    />
                    {email && <CopyButton value={email} label="Copiar e-mail" />}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Senha provisória
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-950 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    />
                    <CopyButton value={password} label="Copiar senha" />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Gerada como: primeiro nome em minúsculo + @2026
                  </p>
                </div>
              </div>
            </div>

            {/* Step by step */}
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Passo a passo
              </p>

              {/* Step 1 */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    1
                  </span>
                  <h2 className="text-xl font-bold tracking-[-0.03em]">
                    Criar usuário no Supabase Auth
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-700">No painel do Supabase, vá em:</p>
                  <p className="mt-1 font-mono text-sm text-slate-500">
                    Authentication → Users → Add user → Create new user
                  </p>

                  <div className="mt-4 divide-y divide-slate-200">
                    <div className="flex items-center justify-between py-3">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Email:</span>{" "}
                        {email || <span className="italic text-slate-400">preencha o e-mail acima</span>}
                      </p>
                      {email && <CopyButton value={email} />}
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Password:</span>{" "}
                        <span className="font-mono">{password}</span>
                      </p>
                      <CopyButton value={password} />
                    </div>

                    <div className="flex items-start gap-3 py-3">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-emerald-500">
                        <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Auto confirm user</span> — marque esta opção para o acesso funcionar imediatamente.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700 ring-1 ring-amber-100">
                    O cliente não receberá nenhum e-mail automático se você usar{" "}
                    <span className="font-semibold">Create new user</span> com{" "}
                    <span className="font-semibold">Auto confirm user</span> marcado.
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    2
                  </span>
                  <h2 className="text-xl font-bold tracking-[-0.03em]">
                    Copiar o UID gerado
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-700">
                    Após criar o usuário, copie o <span className="font-semibold">UID</span> exibido na lista de usuários do Supabase e cole abaixo.
                  </p>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-slate-700">
                      UID do usuário criado
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-950 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      />
                      {uid.trim() && <CopyButton value={uid.trim()} label="Copiar UID" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    3
                  </span>
                  <h2 className="text-xl font-bold tracking-[-0.03em]">
                    Inserir profile no banco
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-700">
                    No painel do Supabase, vá em{" "}
                    <span className="font-mono font-semibold">SQL Editor</span> e execute o SQL abaixo. O comando usa{" "}
                    <span className="font-mono">on conflict</span> para evitar duplicatas.
                  </p>

                  {!uid.trim() ? (
                    <div className="mt-4 rounded-2xl bg-white px-5 py-4 text-sm text-slate-400 ring-1 ring-slate-200">
                      Cole o UID no campo acima para gerar o SQL.
                    </div>
                  ) : (
                    <>
                      <div className="mt-4">
                        <MonoBlock>{profileSql}</MonoBlock>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <CopyButton value={profileSql ?? ""} label="Copiar SQL do profile" />
                      </div>
                    </>
                  )}

                  {!uid.trim() && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Prévia do profile que será criado
                      </p>
                      <div className="divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200">
                        <DataRowSimple label="id" value="(UID do Auth)" mono placeholder />
                        <DataRowSimple label="full_name" value={client.name} mono />
                        <DataRowSimple label="email" value={email || "(preencha o e-mail)"} mono placeholder={!email} />
                        <DataRowSimple label="role" value="client" mono />
                        <DataRowSimple label="client_id" value={client.id} mono />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Client message */}
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Mensagem para o cliente
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Copie e envie esta mensagem ao cliente após criar o acesso.
              </p>

              <div className="mt-5">
                <MonoBlock>{clientMessage}</MonoBlock>
              </div>

              <div className="mt-3 flex justify-end">
                <CopyButton value={clientMessage} label="Copiar mensagem para cliente" />
              </div>
            </div>
          </div>
        )}
      </section>

      <MetodoFooter />
    </main>
  );
}

// ─── Helper sub-components ────────────────────────────────────────────────────

function DataRow({
  label,
  value,
  copyable,
  mono,
  badge,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  mono?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          {label}
        </p>
        {badge ? (
          <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-bold ${badge}`}>
            {value}
          </span>
        ) : (
          <p className={`mt-0.5 break-all text-base font-medium text-slate-950 ${mono ? "font-mono text-sm" : ""}`}>
            {value}
          </p>
        )}
      </div>
      {copyable && <CopyButton value={value} />}
    </div>
  );
}

function DataRowSimple({
  label,
  value,
  mono,
  placeholder,
}: {
  label: string;
  value: string;
  mono?: boolean;
  placeholder?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-5 py-3">
      <p className={`shrink-0 text-xs font-semibold text-slate-400 ${mono ? "font-mono" : ""}`}>
        {label}
      </p>
      <p className={`break-all text-sm ${mono ? "font-mono" : ""} ${placeholder ? "italic text-slate-400" : "text-slate-700"}`}>
        {value}
      </p>
    </div>
  );
}
