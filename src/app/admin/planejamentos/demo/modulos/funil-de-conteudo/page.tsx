import { moduleCategories, planningModules } from "@/data/modules";

const etapasFunil = [
  {
    titulo: "Conteúdos de atração",
    subtitulo: "Usuário vira seguidor",
    descricao:
      "Defina conteúdos criados para atrair novas pessoas, gerar alcance, despertar interesse inicial e fazer o público conhecer o especialista, a empresa ou o projeto.",
    placeholder:
      "Ex: Conteúdos educativos simples, bastidores leves, tendências, temas populares, dúvidas comuns, erros frequentes, mitos, listas, curiosidades e conteúdos de descoberta.",
  },
  {
    titulo: "Conteúdos de conexão",
    subtitulo: "Seguidor vira fã",
    descricao:
      "Defina conteúdos que aproximam o público da marca, geram identificação, aumentam confiança e criam vínculo emocional com o especialista ou empresa.",
    placeholder:
      "Ex: História, bastidores, posicionamentos, crenças, valores, vulnerabilidades, rotina, causas, opiniões, experiências pessoais e visão de mundo.",
  },
  {
    titulo: "Conteúdos de vinculação",
    subtitulo: "Fã vira lead",
    descricao:
      "Defina conteúdos que fazem o público avançar na relação, demonstrar interesse, entrar em uma lista, baixar um material, responder, clicar ou pedir mais informações.",
    placeholder:
      "Ex: Conteúdos com convite para material gratuito, diagnóstico, checklist, aula, formulário, grupo, newsletter, WhatsApp, evento, comunidade ou conversa inicial.",
  },
  {
    titulo: "Conteúdos de venda",
    subtitulo: "Lead vira cliente",
    descricao:
      "Defina conteúdos que conduzem o lead para a decisão de compra, quebram objeções, apresentam provas, reforçam valor e direcionam para uma oferta.",
    placeholder:
      "Ex: Depoimentos, estudos de caso, antes e depois, provas sociais, comparação, demonstração, bastidores da entrega, oferta, bônus, garantia, urgência e chamada para ação.",
  },
];

const tiposConteudo = [
  "Reels",
  "Carrossel",
  "Stories",
  "Live",
  "Post estático",
  "Vídeo longo",
  "Blog",
  "E-mail",
  "WhatsApp",
  "Podcast",
  "Material educativo",
  "Anúncio",
];

export default function FunilDeConteudoPage() {
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
                    const isActive = module.slug === "funil-de-conteudo";

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
                Estratégia editorial e canais de conteúdo
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Funil de Conteúdo
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Organize os conteúdos por etapa do funil, conectando a produção
                editorial à jornada de compra. A ideia é definir como um usuário
                vira seguidor, como um seguidor vira fã, como um fã vira lead e
                como um lead vira cliente.
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
            {etapasFunil.map((etapa, index) => (
              <div
                key={etapa.titulo}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                      Etapa {index + 1}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      {etapa.titulo}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {etapa.subtitulo}
                    </p>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                      {etapa.descricao}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Estratégia de conteúdo para esta etapa
                  </label>

                  <textarea
                    rows={7}
                    placeholder={etapa.placeholder}
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Objetivo da etapa
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Explique qual resultado essa etapa precisa gerar no comportamento do público."
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Próximo passo desejado
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Explique para onde o público deve ser conduzido após consumir esses conteúdos."
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[1fr_240px]">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Exemplos de temas
                    </label>

                    <input
                      type="text"
                      placeholder="Ex: tema 1, tema 2, tema 3, tema 4..."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Formato recomendado
                    </label>

                    <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                      {tiposConteudo.map((tipo) => (
                        <option key={tipo}>{tipo}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Chamadas para ação
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Liste CTAs adequados para esta etapa do funil."
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Visão geral do funil
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explique como as quatro etapas se conectam e como o conteúdo
                deve conduzir o público de uma fase para a próxima.
              </p>

              <textarea
                rows={7}
                placeholder="Ex: Primeiro os conteúdos de atração ampliam o alcance. Depois os conteúdos de conexão geram identificação. Em seguida, os conteúdos de vinculação levam o público para uma lista, conversa ou material. Por fim, os conteúdos de venda apresentam prova, oferta e chamada para decisão."
                className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Distribuição entre as etapas
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Defina a proporção recomendada de conteúdos para cada etapa do
                funil.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Atração
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: 40%"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conexão
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: 30%"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Vinculação
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: 20%"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Venda
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: 10%"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Métricas do funil de conteúdo
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Liste quais indicadores ajudam a medir se cada etapa do funil
                está funcionando.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <textarea
                  rows={5}
                  placeholder="Atração: alcance, impressões, visualizações, visitas ao perfil, novos seguidores..."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Conexão: comentários, respostas, compartilhamentos, salvamentos, retenção, mensagens..."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Vinculação: cliques, cadastros, downloads, respostas, entrada no WhatsApp, leads gerados..."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Venda: reuniões, propostas, conversões, vendas, custo por compra, taxa de fechamento, receita..."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Anexos e referências externas
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Referências externas são opcionais, mas ajudam quem está
                visualizando o planejamento a entender melhor o funil de
                conteúdo.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Título da referência
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: Funil, exemplo de conteúdo, post, campanha, aula, referência ou documento"
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