"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { planningModules } from "@/data/modules";
import { MetodoLogo } from "@/Components/MetodoBrand";

type ClientRecord = {
  id: string;
  name: string;
  slug: string;
};

type ProjectData = {
  selectedModules?: string[];
  coverImageUrl?: string | null;
  moduleContent?: Record<string, unknown>;
};

type PlanningProject = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: string;
  data: ProjectData | null;
  clients: ClientRecord | ClientRecord[] | null;
};

function getProjectClient(project: PlanningProject): ClientRecord | null {
  if (Array.isArray(project.clients)) return project.clients[0] ?? null;
  return project.clients ?? null;
}

export default function ApresentacaoDinamicaPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const [project, setProject] = useState<PlanningProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function loadProject() {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("planning_projects")
        .select(
          `
          id,
          title,
          slug,
          description,
          status,
          data,
          clients (
            id,
            name,
            slug
          )
        `
        )
        .eq("slug", slug)
        .single();

      if (error || !data) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setProject(data as unknown as PlanningProject);
      setIsLoading(false);
    }

    loadProject();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500">Carregando apresentação...</p>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm ring-1 ring-slate-200 text-center max-w-md">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">
            Não encontrado
          </p>
          <h1 className="mt-4 text-2xl font-bold tracking-[-0.03em]">
            Apresentação não encontrada.
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            O projeto com slug <span className="font-mono font-semibold">"{slug}"</span> não existe ou não está disponível.
          </p>
        </div>
      </main>
    );
  }

  const client = getProjectClient(project);
  const selectedModules: string[] = project.data?.selectedModules ?? [];
  const coverImageUrl: string | null = project.data?.coverImageUrl ?? null;
  const moduleContent: Record<string, unknown> = project.data?.moduleContent ?? {};

  const selectedModulesWithTitle = selectedModules.map((moduleSlug) => {
    const found = planningModules.find((m) => m.slug === moduleSlug);
    return {
      slug: moduleSlug,
      title: found?.title ?? moduleSlug,
      category: found?.category ?? "—",
      hasContent: moduleSlug in moduleContent,
    };
  });

  const modulesWithContent = selectedModulesWithTitle.filter((m) => m.hasContent);
  const modulesWithoutContent = selectedModulesWithTitle.filter((m) => !m.hasContent);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />
        <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
          Apresentação dinâmica
        </span>
      </header>

      <section className="mx-auto max-w-5xl space-y-6 px-6 pb-20 lg:px-10">

        {/* Capa */}
        {coverImageUrl && (
          <div className="overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-slate-200 h-56 relative">
            <img
              src={coverImageUrl}
              alt="Capa do planejamento"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/50" />
            <div className="absolute bottom-6 left-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Planejamento Estratégico
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-[-0.04em] text-white">
                {client?.name ?? project.title}
              </h1>
            </div>
          </div>
        )}

        {/* Cabeçalho do projeto */}
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Projeto carregado com sucesso
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
            {project.title}
          </h1>

          {project.description && (
            <p className="mt-3 text-base leading-7 text-slate-500">
              {project.description}
            </p>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Slug
              </dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-slate-950">
                {project.slug}
              </dd>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Cliente
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {client?.name ?? "—"}
              </dd>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Status
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950 capitalize">
                {project.status}
              </dd>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                ID do projeto
              </dt>
              <dd className="mt-1 font-mono text-xs font-semibold text-slate-500 truncate">
                {project.id}
              </dd>
            </div>
          </dl>
        </div>

        {/* Diagnóstico de módulos */}
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-[-0.03em]">
              Módulos selecionados
            </h2>
            <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
              {selectedModules.length} módulos
            </span>
          </div>

          {selectedModules.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Nenhum módulo selecionado neste planejamento.
            </p>
          ) : (
            <div className="mt-6 space-y-3">
              {selectedModulesWithTitle.map((mod) => (
                <div
                  key={mod.slug}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-3.5 ring-1 ring-slate-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {mod.title}
                    </p>
                    <p className="text-xs text-slate-400">{mod.category}</p>
                  </div>

                  {mod.hasContent ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                      Com conteúdo
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-700">
                      Sem conteúdo
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resumo do diagnóstico */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[2rem] bg-emerald-50 p-6 ring-1 ring-emerald-200">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600">
              Módulos com conteúdo salvo
            </p>
            <p className="mt-2 text-4xl font-bold tracking-[-0.04em] text-emerald-800">
              {modulesWithContent.length}
            </p>
            {modulesWithContent.length > 0 && (
              <ul className="mt-3 space-y-1">
                {modulesWithContent.map((m) => (
                  <li key={m.slug} className="text-xs font-medium text-emerald-700">
                    {m.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-[2rem] bg-amber-50 p-6 ring-1 ring-amber-200">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">
              Módulos sem conteúdo ainda
            </p>
            <p className="mt-2 text-4xl font-bold tracking-[-0.04em] text-amber-800">
              {modulesWithoutContent.length}
            </p>
            {modulesWithoutContent.length > 0 && (
              <ul className="mt-3 space-y-1">
                {modulesWithoutContent.map((m) => (
                  <li key={m.slug} className="text-xs font-medium text-amber-700">
                    {m.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Fase 1 — Rota dinâmica com dados reais do Supabase. Layout completo da apresentação em construção.
        </p>
      </section>
    </main>
  );
}
