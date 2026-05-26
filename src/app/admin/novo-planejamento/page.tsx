export default function NovoPlanejamentoPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Novo planejamento
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Criar novo projeto
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Preencha as informações iniciais do cliente. Depois, o sistema
            criará a estrutura de módulos para você completar o planejamento
            estratégico.
          </p>

          <form className="mt-8 space-y-8">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Título do planejamento
              </label>
              <input
                type="text"
                placeholder="Ex: Planejamento estratégico 2026"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Descrição opcional
              </label>
              <textarea
                rows={4}
                placeholder="Resumo interno sobre este projeto..."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Nome do cliente
                </label>
                <input
                  type="text"
                  placeholder="Ex: Cliente Demo"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Idioma
                </label>
                <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                  <option>Português</option>
                  <option>Inglês</option>
                  <option>Espanhol</option>
                </select>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">Capa do planejamento</h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Escolha uma imagem de capa ou use a capa padrão com fundo preto,
                seguindo a identidade visual do Metodo EPC.
              </p>

              <div className="mt-6 space-y-4">
                <label className="block cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="coverType"
                      className="mt-1"
                      defaultChecked
                    />

                    <div className="flex-1">
                      <span className="font-semibold">Imagem de capa</span>

                      <p className="mt-2 text-sm text-slate-500">
                        Escolha uma imagem no formato 1920x1080px.
                      </p>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                          Capa
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap gap-3">
                            <label className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                              Escolher capa
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
                  </div>
                </label>

                <label className="block cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50">
                  <div className="flex items-start gap-3">
                    <input type="radio" name="coverType" className="mt-1" />

                    <div className="flex-1">
                      <span className="font-semibold">Cor da capa</span>

                      <p className="mt-2 text-sm text-slate-500">
                        Usa fundo preto padrão da identidade Metodo EPC.
                      </p>

                      <div className="mt-5 flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-black ring-4 ring-slate-100" />

                        <div>
                          <p className="font-semibold">Preto Metodo EPC</p>

                          <p className="text-sm text-slate-500">
                            Esta será a única opção de cor sólida da capa.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <a
                href="/admin"
                className="rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </a>

              <a
                href="/admin/novo-planejamento/modulos"
                className="rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
              >
                Próximo
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}