"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";

type DeliverySchedule = Record<string, string>;

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: string;
  updated_at: string;
  data: { coverImageUrl?: string | null; deliverySchedule?: DeliverySchedule | null } | null;
};

const SCHEDULE_GROUPS: { key: string; label: string }[] = [
  { key: "essencia-do-projeto", label: "Essência do Projeto" },
  { key: "fundamentos-estrategicos", label: "Fundamentos Estratégicos do Projeto" },
  { key: "estrategia-editorial-e-canais", label: "Estratégia Editorial e Canais de Conteúdo" },
  { key: "campanhas-automacoes-e-conversao", label: "Campanhas, Automações e Conversão" },
  { key: "execucao-acompanhamento-e-gestao", label: "Execução, Acompanhamento e Gestão" },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

function formatScheduleDate(dateStr: string) {
  if (!dateStr) return "A definir";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function getStatusLabel(status: string) {
  if (status === "draft") return "Rascunho";
  if (status === "in_progress") return "Em andamento";
  if (status === "published") return "Publicado";
  return "Arquivado";
}

function getStatusClass(status: string) {
  if (status === "published") return "bg-emerald-100 text-emerald-700";
  if (status === "in_progress") return "bg-amber-100 text-amber-700";
  if (status === "archived") return "bg-slate-200 text-slate-500";
  return "bg-slate-100 text-slate-600";
}

export default function ClientAreaPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [clientName, setClientName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, client_id")
        .eq("id", userData.user.id)
        .single();

      if (!profile) {
        await supabase.auth.signOut();
        router.push("/");
        return;
      }

      if (profile.role === "strategist") {
        router.push("/admin");
        return;
      }

      if (profile.role !== "client" || !profile.client_id) {
        await supabase.auth.signOut();
        router.push("/");
        return;
      }

      const { data: clientData } = await supabase
        .from("clients")
        .select("name")
        .eq("id", profile.client_id)
        .single();

      setClientName(clientData?.name ?? "");

      const { data: projectsData, error } = await supabase
        .from("planning_projects")
        .select("id, title, slug, description, status, updated_at, data")
        .eq("client_id", profile.client_id)
        .order("updated_at", { ascending: false });

      if (error) {
        setErrorMessage("Não foi possível carregar os planejamentos.");
        setIsLoading(false);
        return;
      }

      setProjects((projectsData ?? []) as Project[]);
      setIsLoading(false);
    }

    load();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />

        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Sair
        </button>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-20 lg:px-10">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Área do cliente
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950">
            {clientName ? `Olá, ${clientName}` : "Seus planejamentos"}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Acesse abaixo o planejamento estratégico do seu projeto.
          </p>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        {!isLoading && projects.length === 0 && !errorMessage && (
          <div className="mt-6 rounded-[1.5rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">Nenhum planejamento disponível</h3>
            <p className="mt-2 text-slate-600">
              Seu planejamento ainda não está disponível. Entre em contato com o estrategista.
            </p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-6 space-y-4">
            {projects.map((project) => {
              const coverImageUrl = project.data?.coverImageUrl ?? "";
              const isDraft = project.status === "draft";
              const deliverySchedule = project.data?.deliverySchedule ?? null;
              const hasSchedule =
                deliverySchedule !== null &&
                Object.values(deliverySchedule).some(Boolean);

              if (isDraft) {
                return (
                  <article
                    key={project.id}
                    className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                        {coverImageUrl ? (
                          <img
                            src={coverImageUrl}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-400">
                            {project.title.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold tracking-[-0.03em]">
                            {project.title}
                          </h3>
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                            Em produção
                          </span>
                        </div>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                          Seu planejamento estratégico está em produção. Em breve, os módulos serão liberados para visualização.
                        </p>
                      </div>
                    </div>

                    {hasSchedule && (
                      <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                          Cronograma previsto
                        </p>
                        <div className="divide-y divide-slate-200">
                          {SCHEDULE_GROUPS.map(({ key, label }) => {
                            const dateStr = deliverySchedule?.[key] ?? "";
                            return (
                              <div
                                key={key}
                                className="flex items-center justify-between py-3"
                              >
                                <p className="text-sm text-slate-600">{label}</p>
                                <p
                                  className={`text-sm font-semibold ${
                                    dateStr ? "text-slate-950" : "text-slate-400"
                                  }`}
                                >
                                  {dateStr
                                    ? formatScheduleDate(dateStr)
                                    : "A definir"}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end">
                      <a
                        href={`/apresentacao/${project.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Ver status do planejamento
                      </a>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={project.id}
                  className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                        {coverImageUrl ? (
                          <img
                            src={coverImageUrl}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-400">
                            {project.title.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold tracking-[-0.03em]">
                            {project.title}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(project.status)}`}
                          >
                            {getStatusLabel(project.status)}
                          </span>
                        </div>

                        {project.description && (
                          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                            {project.description}
                          </p>
                        )}

                        <p className="mt-3 text-sm text-slate-400">
                          Atualizado em {formatDate(project.updated_at)}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`/apresentacao/${project.slug}`}
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Ver apresentação
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <MetodoFooter />
    </main>
  );
}
