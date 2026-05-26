"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";
import { supabase } from "@/lib/supabase";

type PlanningProject = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: "draft" | "in_progress" | "published" | "archived";
  created_at: string;
  updated_at: string;
  clients:
    | {
        id: string;
        name: string;
        slug: string;
      }[]
    | null;
};

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

export default function AdminPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<PlanningProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const totalProjects = projects.length;

  const inProgressProjects = useMemo(() => {
    return projects.filter((project) => project.status === "in_progress").length;
  }, [projects]);

  const publishedProjects = useMemo(() => {
    return projects.filter((project) => project.status === "published").length;
  }, [projects]);

  useEffect(() => {
    async function loadAdminData() {
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
          clients (
            id,
            name,
            slug
          )
        `
        )
        .order("updated_at", { ascending: false });

      if (error) {
        setErrorMessage("Não foi possível carregar os planejamentos.");
        setIsLoading(false);
        return;
      }

      setProjects((data ?? []) as unknown as PlanningProject[]);
      setIsLoading(false);
    }

    loadAdminData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.localStorage.removeItem("metodo-epc-strategist-auth");
    window.localStorage.removeItem("metodo-epc-strategist-remember");
    router.push("/estrategista/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Sair
          </button>

          <Link
            href="/admin/novo-planejamento"
            className="rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Criar novo planejamento
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-10">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Painel administrativo
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950">
            Planejamentos
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Aqui você acessa todos os planejamentos criados, acompanha o status
            dos projetos e cria novos planejamentos para clientes.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">Total de planejamentos</p>
              <strong className="mt-3 block text-4xl text-slate-950">
                {isLoading ? "..." : totalProjects}
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">Em andamento</p>
              <strong className="mt-3 block text-4xl text-slate-950">
                {isLoading ? "..." : inProgressProjects}
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">Publicados</p>
              <strong className="mt-3 block text-4xl text-slate-950">
                {isLoading ? "..." : publishedProjects}
              </strong>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.03em]">
              Projetos recentes
            </h2>
          </div>

          <p className="text-sm text-slate-500">
            Clique em um planejamento para editar os módulos.
          </p>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 rounded-[1.5rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500">Carregando planejamentos...</p>
          </div>
        ) : null}

        {!isLoading && projects.length === 0 ? (
          <div className="mt-6 rounded-[1.5rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">Nenhum planejamento encontrado</h3>
            <p className="mt-2 text-slate-600">
              Crie o primeiro planejamento para começar a usar a plataforma com
              clientes reais.
            </p>

            <Link
              href="/admin/novo-planejamento"
              className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Criar novo planejamento
            </Link>
          </div>
        ) : null}

        {!isLoading && projects.length > 0 ? (
          <div className="mt-6 space-y-4">
            {projects.map((project) => {
              const client = project.clients?.[0] ?? null;
              const clientName = client?.name ?? "Cliente sem nome";
              const clientSlug = client?.slug ?? "demo";

              return (
                <article
                  key={project.id}
                  className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold tracking-[-0.03em]">
                          {clientName}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {getStatusLabel(project.status)}
                        </span>
                      </div>

                      <p className="mt-3 text-base text-slate-600">
                        {project.title}
                      </p>

                      {project.description ? (
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                          {project.description}
                        </p>
                      ) : null}

                      <p className="mt-4 text-sm text-slate-400">
                        Atualizado em {formatDate(project.updated_at)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/admin/planejamentos/${clientSlug}`}
                        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Editar planejamento
                      </Link>

                      <Link
                        href={`/apresentacao/${project.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
                      >
                        Ver apresentação
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </section>

      <MetodoFooter />
    </main>
  );
}