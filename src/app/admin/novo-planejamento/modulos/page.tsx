import { moduleCategories, planningModules } from "@/data/modules";

export default function SelecionarModulosPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Novo planejamento
          </p>

          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Configuração da apresentação
              </h1>

              <p className="mt-4 max-w-3xl text-slate-600">
                Selecione quais módulos farão parte da apresentação final do cliente.
                Os módulos escolhidos aparecerão no planejamento publicado.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-sm text-slate-500">Módulos disponíveis</p>
              <strong className="mt-1 block text-3xl">
                {planningModules.length}
              </strong>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-10">
          {moduleCategories.map((category) => (
            <section key={category}>
              <div className="mb-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Categoria
                </p>

                <h2 className="mt-1 text-2xl font-bold">{category}</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {planningModules
                  .filter((module) => module.category === category)
                  .map((module, index) => (
                    <label
                      key={module.slug}
                      className="block cursor-pointer rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mt-1 h-5 w-5 rounded border-slate-300"
                        />

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-sm font-semibold text-slate-400">
                              Módulo {index + 1}
                            </p>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                              Apresentação
                            </span>
                          </div>

                          <h3 className="mt-2 text-xl font-bold">
                            {module.title}
                          </h3>

                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
              </div>
            </section>
          ))}

          <div className="sticky bottom-0 -mx-6 border-t border-slate-200 bg-slate-100/90 px-6 py-5 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <a
                href="/admin/novo-planejamento"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Voltar
              </a>

              <a
                href="/admin"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </a>

              <a
                href="/admin/planejamentos/demo"
                className="rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
              >
                Criar planejamento
              </a>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}