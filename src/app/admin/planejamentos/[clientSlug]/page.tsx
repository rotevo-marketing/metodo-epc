"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { moduleCategories, planningModules } from "@/data/modules";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";
import { supabase } from "@/lib/supabase";

type ClientRecord = {
  id: string;
  name: string;
  slug: string;
  data?: {
    coverImageUrl?: string | null;
  } | null;
};

type ProjectData = {
  coverImageUrl?: string | null;
  selectedModules?: string[];
  modules?: {
    title: string;
    slug: string;
    category: string;
    description: string;
  }[];
};

type PlanningProject = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: "draft" | "in_progress" | "published" | "archived";
  created_at: string;
  updated_at: string;
  data: ProjectData | null;
  clients: ClientRecord | ClientRecord[] | null;
};

function getProjectClient(project: PlanningProject) {
  if (Array.isArray(project.clients)) {
    return project.clients[0] ?? null;
  }

  return project.clients ?? null;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

function getStatusLabel(status: PlanningProject["status"]) {
  if (status === "draft") return "Rascunho";
  if (status === "in_progress") return "Em andamento";
  if (status === "published") return "Publicado";
  return "Arquivado";
}

function getStatusClass(status: PlanningProject["status"]) {
  if (status === "published") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "in_progress") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "archived") {
    return "bg-slate-200 text-slate-500";
  }

  return "bg-slate-100 text-slate-600";
}

export default function PlanejamentoClientePage() {
  const router = useRouter();
  const params = useParams();

  const clientSlug =
    typeof params.clientSlug === "string" ? params.clientSlug : "";

  const [project, setProject] = useState<PlanningProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const client = project ? getProjectClient(project) : null;

  const selectedModuleSlugs = useMemo(() => {
    if (!project?.data?.selectedModules?.length) {
      return planningModules
        .filter((module) => module.presentation)
        .map((module) => module.slug);
    }

    return project.data.selectedModules;
  }, [project]);

  const selectedModules = useMemo(() => {
    return planningModules.filter(
      (module) =>
        module.presentation && selectedModuleSlugs.includes(module.slug)
    );
  }, [selectedModuleSlugs]);

  const coverImageUrl =
    project?.data?.coverImageUrl || client?.data?.coverImageUrl || "";

  useEffect(() => {
    async function loadProject() {
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
          `
          id,
          title,
          slug,
          description,
          status,
          created_at,
          updated_at,
          data,
          clients (
            id,
            name,
            slug,
            data
          )
        `
        )
        .eq("clients.slug", clientSlug)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (error) {
        setErrorMessage("Não foi possível carregar este planejamento.");
        setIsLoading(false);
        return;
      }

      const foundProject = (data?.[0] ?? null) as unknown as PlanningProject | null;

      if (!foundProject) {
        setErrorMessage("Planejamento não encontrado para este cliente.");
        setIsLoading(false);
        return;
      }

      setProject(foundProject);
      setIsLoading(false);
    }

    if (clientSlug) {
      loadProject();
    }
  }, [clientSlug, router]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Voltar ao painel
          </Link>

          {project ? (
            <Link
              href={`/apresentacao/${project.slug}`}
              className="rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Ver apresentação
            </Link>
          ) : null}
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-10">
        {isLoading ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
            <p className="text-slate-500">Carregando planejamento...</p>
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">
              Atenção
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em]">
              {errorMessage}
            </h1>

            <Link
              href="/admin"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Voltar ao painel
            </Link>
          </div>
        ) : null}

        {!isLoading && project ? (
          <>
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                    Planejamento estratégico
                  </p>

                  <div className="mt-5 flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-300">
                      {coverImageUrl ? (
                        <img
                          src={coverImageUrl}
                          alt={client?.name ?? "Cliente"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-slate-500">
                          {(client?.name ?? "C").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div>
                      <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950">
                        {client?.name ?? "Cliente"}
                      </h1>

                      <p className="mt-2 text-base text-slate-600">
                        {project.title}
                      </p>
                    </div>
                  </div>

                  {project.description ? (
                    <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
                      {project.description}
                    </p>
                  ) : null}
                </div>

                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 lg:min-w-72">
                  <p className="text-sm font-semibold text-slate-500">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                      project.status
                    )}`}
                  >
                    {getStatusLabel(project.status)}
                  </span>

                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Atualizado em
                    </p>
                    <strong className="mt-1 block text-lg">
                      {formatDate(project.updated_at)}
                    </strong>
                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-500">
                      Módulos selecionados
                    </p>
                    <strong className="mt-1 block text-lg">
                      {selectedModules.length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Módulos
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
                  Áreas deste planejamento
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                Clique em um módulo para editar o conteúdo estratégico.
              </p>
            </div>

            <div className="mt-6 space-y-10">
              {moduleCategories.map((category) => {
                const categoryModules = selectedModules.filter(
                  (module) => module.category === category
                );

                if (categoryModules.length === 0) {
                  return null;
                }

                return (
                  <section key={category}>
                    <h3 className="text-xl font-bold tracking-[-0.03em]">
                      {category}
                    </h3>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {categoryModules.map((module) => (
                        <Link
                          key={module.slug}
                          href={`/admin/planejamentos/demo/modulos/${module.slug}`}
                          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <p className="text-sm font-semibold text-slate-400">
                            Módulo
                          </p>

                          <h4 className="mt-2 text-xl font-bold">
                            {module.title}
                          </h4>

                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {module.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </>
        ) : null}
      </section>

      <MetodoFooter />
    </main>
  );
}