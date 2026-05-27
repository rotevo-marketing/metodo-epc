"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { planningModules } from "@/data/modules";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";
import EspecialistaForm, {
  initialSpecialistData,
  SpecialistData,
} from "@/Components/modulos/EspecialistaForm";
import { supabase } from "@/lib/supabase";
import EmpresaForm, {
  CompanyData,
  initialCompanyData,
} from "@/Components/modulos/EmpresaForm";
import DnaConteudoForm, {
  ContentDnaData,
  initialContentDnaData,
} from "@/Components/modulos/DnaConteudoForm";

type ClientRecord = {
  id: string;
  name: string;
  slug: string;
};

type GenericModuleData = {
  mainText?: string;
  notes?: string;
  references?: string;
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

function isSpecialistData(value: unknown): value is SpecialistData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "fields" in value || "photo" in value || "characteristics" in value;
}

function isGenericModuleData(value: unknown): value is GenericModuleData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "mainText" in value || "notes" in value || "references" in value;
}

export default function ModuloPlanejamentoPage() {
  const router = useRouter();
  const params = useParams();

  const clientSlug =
    typeof params.clientSlug === "string" ? params.clientSlug : "";

  const moduleSlug =
    typeof params.moduleSlug === "string" ? params.moduleSlug : "";

  const [project, setProject] = useState<PlanningProject | null>(null);
  const [specialistData, setSpecialistData] = useState<SpecialistData>(
    initialSpecialistData
  );
  const [companyData, setCompanyData] = useState<CompanyData>(
  initialCompanyData
);
const [contentDnaData, setContentDnaData] = useState<ContentDnaData>(
  initialContentDnaData
);
  const [genericData, setGenericData] = useState<GenericModuleData>({
    mainText: "",
    notes: "",
    references: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const module = useMemo(() => {
    return planningModules.find((item) => item.slug === moduleSlug) ?? null;
  }, [moduleSlug]);

  const client = project ? getProjectClient(project) : null;

  const selectedModules = useMemo(() => {
    return project?.data?.selectedModules ?? [];
  }, [project]);

  const isModuleSelected = selectedModules.includes(moduleSlug);
  const isSpecialistModule = moduleSlug === "dna-do-especialista";
  const isCompanyModule = moduleSlug === "dna-da-empresa";
  const isContentDnaModule = moduleSlug === "dna-de-conteudo";

  const relatedModules = useMemo(() => {
    return planningModules.filter(
      (item) =>
        item.presentation &&
        item.category === module?.category &&
        selectedModules.includes(item.slug)
    );
  }, [module?.category, selectedModules]);

  useEffect(() => {
    async function loadModuleData() {
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

      const savedContent =
        foundProject.data?.moduleContent?.[moduleSlug] ?? null;

      setProject(foundProject);

      if (isSpecialistModule && isSpecialistData(savedContent)) {
        setSpecialistData({
          fields: savedContent.fields || {},
          photo: savedContent.photo || "",
          characteristics: savedContent.characteristics?.length
            ? savedContent.characteristics
            : initialSpecialistData.characteristics,
        });
      }

      if (isCompanyModule && isCompanyData(savedContent)) {
  setCompanyData({
    fields: savedContent.fields || {},
  });
}

if (isContentDnaModule && isContentDnaData(savedContent)) {
  setContentDnaData({
    fields: savedContent.fields || {},
    secondaryIdeas: savedContent.secondaryIdeas?.length
      ? savedContent.secondaryIdeas
      : initialContentDnaData.secondaryIdeas,
  });
}

      if (!isSpecialistModule && isGenericModuleData(savedContent)) {
        setGenericData({
          mainText: savedContent.mainText || "",
          notes: savedContent.notes || "",
          references: savedContent.references || "",
        });
      }

      function isCompanyData(value: unknown): value is CompanyData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "fields" in value;
}

function isContentDnaData(value: unknown): value is ContentDnaData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "fields" in value || "secondaryIdeas" in value;
}
      setIsLoading(false);
    }

    if (clientSlug && moduleSlug) {
      loadModuleData();
    }
  }, [clientSlug, moduleSlug, router, isSpecialistModule]);

  async function saveModule(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!project) {
      return;
    }

    if (!isModuleSelected) {
      setErrorMessage(
        "Este módulo não está selecionado para este planejamento. Volte para a configuração e selecione o módulo antes de preencher."
      );
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const currentData = project.data ?? {};

    const contentToSave = isSpecialistModule
  ? specialistData
  : isCompanyModule
    ? companyData
    : isContentDnaModule
      ? contentDnaData
      : {
          mainText: genericData.mainText?.trim() || "",
          notes: genericData.notes?.trim() || "",
          references: genericData.references?.trim() || "",
        };

    const nextData: ProjectData = {
      ...currentData,
      moduleContent: {
        ...(currentData.moduleContent ?? {}),
        [moduleSlug]: contentToSave,
      },
    };

    const { error } = await supabase
      .from("planning_projects")
      .update({
        data: nextData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) {
      setErrorMessage(error.message || "Não foi possível salvar este módulo.");
      setIsSaving(false);
      return;
    }

    setProject({
      ...project,
      data: nextData,
      updated_at: new Date().toISOString(),
    });

    setSuccessMessage("Módulo salvo com sucesso.");
    setIsSaving(false);

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 2800);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/planejamentos/${clientSlug}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Voltar aos módulos
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
            <p className="text-slate-500">Carregando módulo...</p>
          </div>
        ) : null}

        {!isLoading && errorMessage && !project ? (
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
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="self-start rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Planejamento
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]">
                {client?.name ?? "Cliente"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {project.title}
              </p>

              <span
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                  project.status
                )}`}
              >
                {getStatusLabel(project.status)}
              </span>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Categoria
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {module?.category ?? "Módulo"}
                </p>
              </div>

              {relatedModules.length > 0 ? (
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Módulos da categoria
                  </p>

                  <div className="mt-4 space-y-2">
                    {relatedModules.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/admin/planejamentos/${clientSlug}/modulos/${item.slug}`}
                        className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          item.slug === moduleSlug
                            ? "bg-slate-950 text-white"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>

            <div>
              <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Módulo estratégico
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">
                  {module?.title ?? "Módulo não encontrado"}
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  {module?.description ??
                    "Este módulo não foi encontrado na base de módulos do planejamento."}
                </p>

                {!isModuleSelected ? (
                  <div className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
                    Este módulo não está selecionado para este planejamento.
                    Para preencher, volte aos módulos e selecione este item.
                  </div>
                ) : null}

                {errorMessage && project ? (
                  <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                    {errorMessage}
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="mt-6 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
                    {successMessage}
                  </div>
                ) : null}
              </div>

              {isSpecialistModule ? (
  <EspecialistaForm
    data={specialistData}
    setData={setSpecialistData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : isCompanyModule ? (
  <EmpresaForm
    data={companyData}
    setData={setCompanyData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : isContentDnaModule ? (
  <DnaConteudoForm
    data={contentDnaData}
    setData={setContentDnaData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : (
                <form
                  onSubmit={saveModule}
                  className="mt-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10"
                >
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Conteúdo principal do módulo
                    </label>

                    <textarea
                      rows={10}
                      value={genericData.mainText || ""}
                      onChange={(event) =>
                        setGenericData((current) => ({
                          ...current,
                          mainText: event.target.value,
                        }))
                      }
                      placeholder="Preencha aqui as informações estratégicas deste módulo."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Observações internas
                    </label>

                    <textarea
                      rows={5}
                      value={genericData.notes || ""}
                      onChange={(event) =>
                        setGenericData((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                      placeholder="Anote observações, decisões, pendências ou contexto para este cliente."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Referências e links
                    </label>

                    <textarea
                      rows={4}
                      value={genericData.references || ""}
                      onChange={(event) =>
                        setGenericData((current) => ({
                          ...current,
                          references: event.target.value,
                        }))
                      }
                      placeholder="Cole referências, links, exemplos ou materiais usados neste módulo."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
                    />
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      href={`/admin/planejamentos/${clientSlug}`}
                      className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
                    >
                      Voltar para módulos
                    </Link>

                    <button
                      type="submit"
                      disabled={isSaving || !isModuleSelected}
                      className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? "Salvando..." : "Salvar módulo"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : null}
      </section>

      <MetodoFooter />
    </main>
  );
}