import { moduleCategories, planningModules } from "@/data/modules";

const etapasJornada = [
  {
    titulo: "Descoberta do problema",
    subtitulo: "A pessoa começa a perceber que existe algo errado",
    descricao:
      "Nesta etapa, o público ainda não tem clareza total sobre o problema. Ele sente sintomas, incômodos ou dificuldades, mas ainda pode não saber nomear a causa.",
    pensamentoPlaceholder:
      "Ex: Estou fazendo muita coisa, mas não vejo resultado. Minha comunicação parece sem direção. Não sei se minha estratégia está funcionando.",
    doresPlaceholder:
      "Ex: Falta de clareza, queda de engajamento, pouca geração de demanda, dificuldade para se posicionar, sensação de esforço sem retorno.",
    conteudosPlaceholder:
      "Ex: Conteúdos sobre sintomas do problema, erros comuns, sinais de falta de estratégia, comparações simples, posts educativos e conteúdos de conscientização.",
    canaisPlaceholder:
      "Ex: Instagram, TikTok, YouTube Shorts, Blog, Pinterest, anúncios de alcance ou conteúdos de topo de funil.",
    acaoPlaceholder:
      "Ex: Fazer a pessoa reconhecer que existe um problema estratégico e começar a prestar atenção no tema.",
  },
  {
    titulo: "Consciência da dor",
    subtitulo: "A pessoa entende melhor o impacto do problema",
    descricao:
      "Nesta etapa, o público já percebe que o problema existe e começa a entender como ele afeta seus resultados, sua autoridade, sua comunicação ou suas vendas.",
    pensamentoPlaceholder:
      "Ex: Agora entendo que o problema não é só postar pouco. Talvez falte estratégia, posicionamento, calendário, clareza de oferta ou estrutura.",
    doresPlaceholder:
      "Ex: Medo de continuar estagnado, frustração por não crescer, insegurança sobre o que comunicar, dificuldade para atrair clientes certos.",
    conteudosPlaceholder:
      "Ex: Conteúdos que aprofundam a dor, explicam causas, mostram consequências, apresentam diagnósticos e ajudam a pessoa a se enxergar no problema.",
    canaisPlaceholder:
      "Ex: Instagram, carrosséis educativos, vídeos explicativos, blog, e-mails, lives e conteúdos de autoridade.",
    acaoPlaceholder:
      "Ex: Fazer a pessoa assumir que precisa resolver o problema e se interessar por caminhos de solução.",
  },
  {
    titulo: "Busca por solução",
    subtitulo: "A pessoa começa a procurar formas de resolver",
    descricao:
      "Nesta etapa, o público já sabe que precisa de uma solução e começa a buscar métodos, ferramentas, profissionais, serviços, conteúdos ou processos que possam ajudar.",
    pensamentoPlaceholder:
      "Ex: Preciso organizar minha estratégia. Talvez eu precise de um planejamento, consultoria, método, diagnóstico ou alguém para me guiar.",
    doresPlaceholder:
      "Ex: Dúvida sobre por onde começar, medo de escolher errado, excesso de opções, falta de critério para comparar soluções.",
    conteudosPlaceholder:
      "Ex: Conteúdos sobre métodos, passo a passo, guias, checklists, aulas, diagnósticos, materiais educativos e explicações sobre processos.",
    canaisPlaceholder:
      "Ex: Materiais ricos, landing pages, YouTube, blog, e-mail, WhatsApp, lives e campanhas de captação de leads.",
    acaoPlaceholder:
      "Ex: Fazer a pessoa entrar em uma lista, baixar um material, assistir uma aula, responder um formulário ou pedir mais informações.",
  },
  {
    titulo: "Comparação de alternativas",
    subtitulo: "A pessoa avalia opções antes de decidir",
    descricao:
      "Nesta etapa, o público compara caminhos, profissionais, métodos, preços, entregas, provas e diferenciais. Ele quer entender qual solução faz mais sentido.",
    pensamentoPlaceholder:
      "Ex: Qual solução é melhor para mim? O que esse método tem de diferente? Será que funciona para o meu caso? Vale o investimento?",
    doresPlaceholder:
      "Ex: Medo de investir errado, receio de não ter retorno, dúvida sobre a entrega, insegurança sobre resultados e comparação com concorrentes.",
    conteudosPlaceholder:
      "Ex: Comparativos, estudos de caso, provas sociais, bastidores da entrega, diferenciais, perguntas frequentes, conteúdos de objeção e autoridade.",
    canaisPlaceholder:
      "Ex: WhatsApp, e-mail, remarketing, página de vendas, apresentação comercial, reuniões, cases e conteúdos de prova.",
    acaoPlaceholder:
      "Ex: Fazer a pessoa escolher a solução, pedir proposta, agendar reunião, entrar no WhatsApp ou avançar para uma conversa comercial.",
  },
  {
    titulo: "Decisão de compra",
    subtitulo: "A pessoa está pronta para agir",
    descricao:
      "Nesta etapa, o público precisa de segurança para tomar a decisão. Ele já entende a dor, conhece a solução e precisa de clareza sobre oferta, entrega, prazo e próximo passo.",
    pensamentoPlaceholder:
      "Ex: Quero resolver isso agora. Preciso entender exatamente o que vou receber, como funciona, qual o investimento e como começo.",
    doresPlaceholder:
      "Ex: Medo de não conseguir executar, insegurança financeira, dúvida sobre prioridade, necessidade de confiança e clareza sobre o processo.",
    conteudosPlaceholder:
      "Ex: Oferta, página de vendas, proposta, depoimentos, garantias, bônus, urgência, escassez, chamada para diagnóstico, reunião ou checkout.",
    canaisPlaceholder:
      "Ex: WhatsApp, página de vendas, checkout, reunião, ligação, e-mail de venda, remarketing e campanha de conversão.",
    acaoPlaceholder:
      "Ex: Fazer a pessoa comprar, agendar, contratar, pagar, solicitar proposta ou confirmar o início do projeto.",
  },
  {
    titulo: "Pós-compra e fidelização",
    subtitulo: "A pessoa precisa confirmar que fez uma boa escolha",
    descricao:
      "Nesta etapa, o cliente já comprou ou contratou. O objetivo é gerar segurança, entregar valor, manter relacionamento, estimular continuidade e criar prova social.",
    pensamentoPlaceholder:
      "Ex: Fiz uma boa escolha? Como vou usar isso agora? Qual é o próximo passo? Como sei se estou evoluindo?",
    doresPlaceholder:
      "Ex: Ansiedade após a compra, medo de não conseguir aplicar, falta de acompanhamento, dúvidas iniciais e necessidade de validação.",
    conteudosPlaceholder:
      "Ex: Onboarding, mensagens de boas-vindas, guias de uso, acompanhamento, checklists, conteúdos de suporte, pedido de depoimento e próximos passos.",
    canaisPlaceholder:
      "Ex: WhatsApp, e-mail, área do cliente, reuniões, Notion, Google Drive, comunidade, CRM e automações pós-compra.",
    acaoPlaceholder:
      "Ex: Fazer o cliente iniciar bem, consumir a entrega, perceber valor, continuar o relacionamento, indicar ou comprar novamente.",
  },
];

const niveisConsciencia = [
  "Inconsciente",
  "Consciente do problema",
  "Consciente da solução",
  "Consciente do produto",
  "Mais consciente",
];

export default function JornadaDeCompraPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed left-0 top-0 hidden h-screen w-80 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block">
        <a href="/admin" className="block">
          <h1 className="text-2xl font-bold">Metodo EPC</h1>
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
                    const isActive = module.slug === "jornada-de-compra";

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
                Fundamentos Estratégicos do Projeto
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Jornada de Compra
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Mapeie o caminho que o público percorre desde o primeiro contato
                com o problema até a decisão de compra. Use esta jornada para
                orientar conteúdos, campanhas, automações, abordagem comercial e
                pontos de conversão.
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
                Visão geral da jornada
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explique como o público geralmente evolui até se tornar cliente.
                Este campo ajuda a resumir a lógica da jornada antes de detalhar
                cada etapa.
              </p>

              <textarea
                rows={6}
                placeholder="Ex: O público começa sentindo dificuldade para gerar demanda, depois entende que falta estratégia, busca soluções, compara métodos e finalmente decide contratar quando percebe clareza, prova e segurança."
                className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            {etapasJornada.map((etapa, index) => (
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

                  <div className="w-full lg:w-64">
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Nível de consciência
                    </label>

                    <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                      {niveisConsciencia.map((nivel) => (
                        <option key={nivel}>{nivel}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      O que a pessoa pensa ou sente nesta etapa?
                    </label>

                    <textarea
                      rows={5}
                      placeholder={etapa.pensamentoPlaceholder}
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Dores, dúvidas e desejos
                    </label>

                    <textarea
                      rows={5}
                      placeholder={etapa.doresPlaceholder}
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Conteúdos recomendados
                    </label>

                    <textarea
                      rows={5}
                      placeholder={etapa.conteudosPlaceholder}
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Canais recomendados
                    </label>

                    <textarea
                      rows={5}
                      placeholder={etapa.canaisPlaceholder}
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Próximo passo desejado
                    </label>

                    <textarea
                      rows={4}
                      placeholder={etapa.acaoPlaceholder}
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Ponto de conversão desta etapa
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Ex: Seguir perfil, salvar conteúdo, comentar, responder story, baixar material, clicar no link, entrar no WhatsApp, agendar reunião ou comprar."
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Pontos de virada da jornada
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Liste os momentos em que o público muda de percepção e avança
                para a próxima etapa.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <textarea
                  rows={5}
                  placeholder="Da descoberta para a consciência da dor: o que faz a pessoa perceber que o problema é real?"
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Da consciência da dor para a busca por solução: o que faz a pessoa querer resolver?"
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Da busca por solução para a comparação: o que faz a pessoa considerar o projeto como opção?"
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Da comparação para a decisão: o que faz a pessoa confiar e comprar?"
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Objeções por etapa
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Mapeie quais dúvidas ou resistências podem aparecer em cada
                fase da jornada.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <textarea
                  rows={5}
                  placeholder="Início da jornada: objeções, dúvidas e resistências iniciais."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Meio da jornada: dúvidas sobre método, solução, tempo, investimento ou prioridade."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={5}
                  placeholder="Final da jornada: objeções antes da compra, inseguranças, comparação e necessidade de prova."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Gatilhos de avanço
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Defina quais mensagens, conteúdos, provas ou ações ajudam o
                público a avançar de uma etapa para outra.
              </p>

              <textarea
                rows={6}
                placeholder="Ex: Mostrar sintomas do problema, apresentar consequências, oferecer um diagnóstico, entregar prova social, mostrar bastidores da solução, quebrar objeções, criar urgência e direcionar para conversa comercial."
                className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Conteúdos essenciais para conduzir a compra
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Liste conteúdos que não podem faltar para conduzir o público
                pela jornada.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdos de conscientização
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Ex: Erros comuns, sinais do problema, conteúdos educativos, diagnósticos, comparações e conteúdos de clareza."
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdos de decisão
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Ex: Provas sociais, estudos de caso, oferta, perguntas frequentes, bastidores da entrega, depoimentos e chamada para ação."
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Relação com funil de conteúdo, campanhas e automações
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explique como esta jornada deve orientar o funil de conteúdo,
                as campanhas de tráfego e os fluxos de automação.
              </p>

              <textarea
                rows={7}
                placeholder="Ex: A etapa de descoberta orienta conteúdos de atração. A etapa de busca por solução orienta materiais educativos e captação de leads. A comparação orienta remarketing e provas sociais. A decisão orienta campanhas de conversão e mensagens comerciais. O pós-compra orienta automações de onboarding e fidelização."
                className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Anexos e referências externas
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Referências externas são opcionais, mas ajudam quem está
                visualizando o planejamento a entender melhor a jornada de
                compra.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Título da referência
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: Jornada, pesquisa, referência, mapa, aula, documento ou exemplo"
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