import { moduleCategories, planningModules } from "@/data/modules";

export default function PersonalidadeDoEspecialistaPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed left-0 top-0 hidden h-screen w-80 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block">
        <a href="/admin" className="block">
          <h1 className="text-2xl font-bold">Rotevo</h1>
          <p className="mt-2 text-sm text-slate-500">Painel administrativo</p>
        </a>

        <div className="mt-8 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Planejamento
          </p>
          <p className="mt-1 font-bold">Cliente Demo</p>
        </div>

        <nav className="mt-8 space-y-6">
          {moduleCategories.map((category) => (
            <div key={category}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {category}
              </p>

              <div className="space-y-1">
                {planningModules
                  .filter((module) => module.category === category)
                  .map((module) => {
                    const isActive =
                      module.slug === "personalidade-do-especialista";

                    return (
                      <a
                        key={module.slug}
                        href={
                          module.slug === "dna-do-especialista"
                            ? "/admin/planejamentos/demo"
                            : `/admin/planejamentos/demo/modulos/${module.slug}`
                        }
                        className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-slate-100 text-slate-950"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                        }`}
                      >
                        {module.title}
                      </a>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <section className="min-h-screen p-6 lg:ml-80 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <a
                href="/admin"
                className="text-sm font-semibold text-slate-500 hover:text-slate-950"
              >
                ← Voltar para planejamentos
              </a>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Essência do Projeto
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Personalidade do Especialista
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Defina os traços, características e elementos de personalidade
                que devem orientar a criação da linha editorial e do tom dos
                conteúdos.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/apresentacao/demo"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver apresentação
              </a>

              <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Salvar módulo
              </button>
            </div>
          </div>

          <form className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Foto do especialista
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Adicione uma imagem do especialista para usar como referência
                visual do planejamento. Tamanho recomendado: 720x720px.
              </p>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                  Foto
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-3">
                    <label className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                      Escolher foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Remover
                    </button>
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    Formatos aceitos: JPG, PNG ou WEBP.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Características do especialista
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Registre as características principais que ajudam a construir a
                personalidade pública do especialista.
              </p>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                      Característica 01
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                      Nova característica
                    </h2>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="rounded-full border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Título da característica
                    </label>

                    <input
                      type="text"
                      placeholder="Ex: Didático, direto, provocativo, acolhedor..."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Descrição da característica
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Explique como essa característica aparece na comunicação, no conteúdo, na postura e na forma como o especialista se apresenta."
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  + Nova característica
                </button>
              </div>

              <button
                type="button"
                className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                + Novo especialista
              </button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Anexos e referências externas
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Referências externas são opcionais, mas ajudam quem está
                visualizando o planejamento a entender melhor o que você quer
                dizer em cada bloco.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Título da referência
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: Perfil, entrevista, vídeo ou material de referência"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Link
                  </label>

                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <button
                type="button"
                className="mt-4 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                + Nova referência
              </button>
            </div>

            <div className="sticky bottom-0 -mx-6 border-t border-slate-200 bg-slate-100/90 px-6 py-5 backdrop-blur lg:-mx-10 lg:px-10">
              <div className="mx-auto flex max-w-6xl flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <a
                  href="/admin"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Voltar para planejamentos
                </a>

                <a
                  href="/apresentacao/demo"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Ver apresentação
                </a>

                <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                  Salvar módulo
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}