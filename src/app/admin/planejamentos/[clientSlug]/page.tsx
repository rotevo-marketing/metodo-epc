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
  moduleContent?: Record<string, unknown>;
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
    return "bg-[#c79e40]/10 text-[#7a5c0a]";
  }

  if (status === "archived") {
    return "bg-slate-200 text-slate-500";
  }

  return "bg-slate-100 text-slate-600";
}

function getDefaultSelectedModules() {
  return planningModules
    .filter((module) => module.presentation)
    .map((module) => module.slug);
}

export default function PlanejamentoClientePage() {
  const router = useRouter();
  const params = useParams();

  const clientSlug =
    typeof params.clientSlug === "string" ? params.clientSlug : "";

  const [project, setProject] = useState<PlanningProject | null>(null);
  const [selectedModuleSlugs, setSelectedModuleSlugs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const client = project ? getProjectClient(project) : null;

  const selectedModules = useMemo(() => {
    return planningModules.filter(
      (module) =>
        module.presentation && selectedModuleSlugs.includes(module.slug)
    );
  }, [selectedModuleSlugs]);

  const coverImageUrl = project?.data?.coverImageUrl || "";

  useEffect(() => {
    async function loadProject() {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

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
          clients!inner (
            id,
            name,
            slug
          )
        `
        )
        .eq("clients.slug", clientSlug)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (error) {
        setErrorMessage(
          error.message || "Não foi possível carregar este planejamento."
        );
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

      const storedSelectedModules = foundProject.data?.selectedModules;

      if (storedSelectedModules?.length) {
        setSelectedModuleSlugs(storedSelectedModules);
      } else {
        setSelectedModuleSlugs(getDefaultSelectedModules());
      }

      setIsLoading(false);
    }

    if (clientSlug) {
      loadProject();
    }
  }, [clientSlug, router]);

  function toggleModule(moduleSlug: string) {
    setSuccessMessage("");

    setSelectedModuleSlugs((currentModules) => {
      if (currentModules.includes(moduleSlug)) {
        return currentModules.filter((slug) => slug !== moduleSlug);
      }

      return [...currentModules, moduleSlug];
    });
  }

  function selectAllModules() {
    setSuccessMessage("");
    setSelectedModuleSlugs(getDefaultSelectedModules());
  }

  function clearModules() {
    setSuccessMessage("");
    setSelectedModuleSlugs([]);
  }

  async function saveModuleSelection() {
    if (!project) {
      return;
    }

    if (selectedModuleSlugs.length === 0) {
      setErrorMessage("Selecione pelo menos um módulo para este planejamento.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const selectedModuleRecords = planningModules
      .filter((module) => selectedModuleSlugs.includes(module.slug))
      .map((module) => ({
        title: module.title,
        slug: module.slug,
        category: module.category,
        description: module.description,
      }));

    const nextData: ProjectData = {
      ...(project.data ?? {}),
      selectedModules: selectedModuleSlugs,
      modules: selectedModuleRecords,
    };

    const { error } = await supabase
      .from("planning_projects")
      .update({
        data: nextData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) {
      setErrorMessage(
        error.message || "Não foi possível salvar a seleção de módulos."
      );
      setIsSaving(false);
      return;
    }

    setProject({
      ...project,
      data: nextData,
      updated_at: new Date().toISOString(),
    });

    setSuccessMessage("Seleção de módulos salva com sucesso.");
    setIsSaving(false);
  }

  async function handlePublish(newStatus: "draft" | "published") {
    if (!project) return;

    setIsPublishing(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase
      .from("planning_projects")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", project.id);

    if (error) {
      setErrorMessage(error.message || "Não foi possível atualizar o status.");
      setIsPublishing(false);
      return;
    }

    setProject({ ...project, status: newStatus, updated_at: new Date().toISOString() });
    setSuccessMessage(
      newStatus === "published"
        ? "Apresentação publicada com sucesso."
        : "Planejamento voltou para rascunho."
    );
    setIsPublishing(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo variant="dark" />

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40"
          >
            Voltar ao painel
          </Link>

          {project ? (
            <Link
              href={`/admin/planejamentos/${clientSlug}/acesso`}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40"
            >
              Configurar acesso
            </Link>
          ) : null}

          {project ? (
            <Link
              href={`/apresentacao/${project.slug}`}
              className="rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f4f1ea] hover:text-black hover:ring-1 hover:ring-[#c79e40]/30"
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

        {errorMessage && !project ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">
              Atenção
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em]">
              {errorMessage}
            </h1>

            <Link
              href="/admin"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#f4f1ea] hover:text-black hover:ring-1 hover:ring-[#c79e40]/30"
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
                    Configuração do planejamento
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

                  <div className="mt-4">
                    {project.status === "draft" && (
                      <button
                        type="button"
                        onClick={() => handlePublish("published")}
                        disabled={isPublishing}
                        className="w-full cursor-pointer rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isPublishing ? "Publicando..." : "Publicar apresentação"}
                      </button>
                    )}

                    {project.status === "published" && (
                      <button
                        type="button"
                        onClick={() => handlePublish("draft")}
                        disabled={isPublishing}
                        className="w-full cursor-pointer rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isPublishing ? "Atualizando..." : "Voltar para rascunho"}
                      </button>
                    )}
                  </div>

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

            <div className="sticky top-0 z-10 mt-8 rounded-3xl bg-white/95 p-5 shadow-sm ring-1 ring-slate-200 backdrop-blur">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                    Seleção de módulos
                  </p>

                  <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em]">
                    Escolha o que entra neste planejamento
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Apenas os módulos selecionados devem ser preenchidos e aparecer no planejamento final.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={selectAllModules}
                    className="cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40"
                  >
                    Selecionar todos
                  </button>

                  <button
                    type="button"
                    onClick={clearModules}
                    className="cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40"
                  >
                    Limpar
                  </button>

                  <button
                    type="button"
                    onClick={saveModuleSelection}
                    disabled={isSaving}
                    className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f4f1ea] hover:text-black hover:ring-1 hover:ring-[#c79e40]/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "Salvando..." : "Salvar seleção"}
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <div className="mt-4 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="mt-4 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
                  {successMessage}
                </div>
              ) : null}
            </div>

            <div className="mt-8 space-y-10">
              {moduleCategories.map((category) => {
                const categoryModules = planningModules.filter(
                  (module) => module.category === category && module.presentation
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
                      {categoryModules.map((module) => {
                        const isSelected = selectedModuleSlugs.includes(
                          module.slug
                        );

                        return (
                          <div
                            key={module.slug}
                            className={`rounded-3xl bg-white p-6 shadow-sm ring-1 transition ${
                              isSelected
                                ? "ring-slate-950"
                                : "opacity-60 ring-slate-200"
                            }`}
                          >
                            <label className="flex cursor-pointer items-start gap-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleModule(module.slug)}
                                className="mt-1 h-5 w-5 rounded border-slate-300"
                              />

                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                  <p className="text-sm font-semibold text-slate-400">
                                    Módulo
                                  </p>

                                  {isSelected ? (
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                                      Selecionado
                                    </span>
                                  ) : (
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                      Fora do planejamento
                                    </span>
                                  )}
                                </div>

                                <h4 className="mt-2 text-xl font-bold">
                                  {module.title}
                                </h4>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                  {module.description}
                                </p>
                              </div>
                            </label>

                            <div className="mt-5 flex justify-end">
                              {isSelected ? (
                                <Link
                                  href={`/admin/planejamentos/${clientSlug}/modulos/${module.slug}`}
                                  className="inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#f4f1ea] hover:text-black hover:ring-1 hover:ring-[#c79e40]/30"
                                >
                                  Preencher módulo
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex cursor-not-allowed rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-400"
                                >
                                  Selecione para preencher
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
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