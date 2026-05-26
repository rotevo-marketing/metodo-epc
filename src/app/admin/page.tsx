"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";

const planejamentos = [
  {
    cliente: "Cliente Demo",
    titulo: "Planejamento Estratégico Demo",
    slug: "demo",
    status: "Em andamento",
    atualizadoEm: "22/05/2026",
    publicado: true,
  },
];


export default function AdminPage() {
    const router = useRouter();

  useEffect(() => {
    const isAuthenticated = window.localStorage.getItem(
      "metodo-epc-strategist-auth"
    );

    if (isAuthenticated !== "true") {
      router.push("/estrategista/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
  <MetodoLogo />

  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem("metodo-epc-strategist-auth");
        window.localStorage.removeItem("metodo-epc-strategist-remember");
        router.replace("/estrategista/login");
      }}
      className="cursor-pointer rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      Sair
    </button>

    <a
      href="/admin/novo-planejamento"
      className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
      Criar novo planejamento
    </a>
  </div>
</header>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Painel administrativo
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                Planejamentos
              </h1>

              <p className="mt-4 max-w-3xl text-slate-600">
                Aqui você acessa todos os planejamentos criados, acompanha o status dos projetos e cria novos planejamentos para clientes.
              </p>
            </div>

                  </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Total de planejamentos</p>
              <strong className="mt-2 block text-3xl">
                {planejamentos.length}
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Em andamento</p>
              <strong className="mt-2 block text-3xl">
                {
                  planejamentos.filter(
                    (planejamento) => planejamento.status === "Em andamento"
                  ).length
                }
              </strong>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Publicados</p>
              <strong className="mt-2 block text-3xl">
                {
                  planejamentos.filter(
                    (planejamento) => planejamento.publicado
                  ).length
                }
              </strong>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Projetos recentes</h2>
            <p className="text-sm text-slate-500">
              Clique em um planejamento para editar os módulos.
            </p>
          </div>

          <div className="space-y-4">
            {planejamentos.map((planejamento) => (
              <article
                key={planejamento.slug}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold">
                        {planejamento.cliente}
                      </h3>

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        {planejamento.status}
                      </span>

                      {planejamento.publicado && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Publicado
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-slate-600">
                      {planejamento.titulo}
                    </p>

                    <p className="mt-3 text-sm text-slate-400">
                      Atualizado em {planejamento.atualizadoEm}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`/admin/planejamentos/${planejamento.slug}`}
                      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Editar planejamento
                    </a>

                    <a
                      href={`/apresentacao/${planejamento.slug}`}
                      className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Ver apresentação
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MetodoFooter description="Painel interno do estrategista para gestão dos planejamentos." />
    </main>
  );
}