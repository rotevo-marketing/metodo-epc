function GuideIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9" fill="none">
      <path
        d="M18 18h28v28H18V18Z"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <path
        d="M24 28h16M24 36h10"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5" fill="none">
      <path
        d="M18 48l3-9a17 17 0 1 1 6 5l-9 4Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M27 24c1 7 6 12 13 13"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5" fill="none">
      <rect
        x="12"
        y="18"
        width="40"
        height="28"
        rx="5"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        d="M14 22l18 14 18-14"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ResumoEstrategico() {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
          <GuideIcon />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Apresentação
          </p>

          <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
            Comece por aqui
          </h2>
        </div>
      </div>

      <div className="mt-8 space-y-6 text-base leading-8 text-slate-600">
        <p>
          Este é o ambiente estratégico do seu projeto. Ele foi criado para
          organizar, com profundidade, tudo o que sustenta o seu marketing:
          identidade, posicionamento, público, conteúdo, canais, campanhas,
          automações, métricas e próximos passos.
        </p>

        <p>
          O Método EPC nasce de uma necessidade comum no mercado: tirar o
          marketing da superficialidade. Em vez de trabalhar apenas com posts,
          ideias soltas ou ações desconectadas, este planejamento mostra a lógica
          por trás das decisões e cria uma base mais clara para comunicar,
          vender, crescer e evoluir com consistência.
        </p>

        <p>
          Você pode usar este planejamento de três formas: para executar por
          conta própria, para orientar o seu time de marketing ou para direcionar
          a execução feita pelo nosso time. Em todos os casos, ele funciona como
          uma referência estratégica para que cada ação tenha intenção, critério
          e conexão com o crescimento do projeto.
        </p>
      </div>

      <div className="my-10 h-px bg-slate-200" />

      <div className="space-y-10">
        <section>
          <h3 className="text-3xl font-light tracking-[-0.04em] text-slate-950">
            Como navegar
          </h3>

          <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">
            <p>
              A coluna lateral funciona como o mapa da apresentação. Cada item
              representa uma parte importante do planejamento. Ao clicar em uma
              seção, o conteúdo correspondente aparece nesta área à direita,
              mantendo a leitura simples, organizada e sem excesso de informação.
            </p>

            <p>
              Você não precisa consumir tudo de uma vez. O ideal é navegar por
              partes, entender a função de cada bloco e voltar sempre que
              precisar revisar uma decisão, orientar uma ação ou alinhar a
              comunicação com mais clareza.
            </p>
          </div>
        </section>

        <div className="h-px bg-slate-200" />

        <section>
          <h3 className="text-3xl font-light tracking-[-0.04em] text-slate-950">
            O que você vai encontrar
          </h3>

          <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">
            <p>
              Primeiro, você encontra a base estratégica do projeto: quem é o
              especialista, qual é a essência da empresa, como o conteúdo deve se
              comportar, qual é o DNA do projeto, quais traços de personalidade
              precisam aparecer, como deve ser o tom de voz e qual direção visual
              sustenta a percepção da marca.
            </p>

            <p>
              Depois, o planejamento aprofunda os fundamentos que orientam as
              decisões: objetivos, concorrência, análise SWOT, palavras-chave,
              personas, jornada de compra e canais digitais. Essa parte ajuda a
              entender o cenário antes de definir os movimentos.
            </p>

            <p>
              Em seguida, entram as decisões editoriais e os canais de conteúdo:
              funil, linhas editoriais, Instagram, TikTok, YouTube, Facebook,
              LinkedIn, WhatsApp, blog, Pinterest, podcast, lives, materiais
              educacionais, estratégia do site e mapa do site.
            </p>

            <p>
              Por fim, você encontra a estrutura de execução: campanhas de
              captação, campanhas de venda, distribuição de conteúdo, fluxos de
              automação, linha do tempo, calendário, métricas, indicadores e
              orientações adicionais.
            </p>
          </div>
        </section>

        <div className="h-px bg-slate-200" />

        <section>
          <h3 className="text-3xl font-light tracking-[-0.04em] text-slate-950">
            Como usar este planejamento
          </h3>

          <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">
            <p>
              Antes de sair aplicando, use este material para compreender a
              lógica da estratégia. O valor do planejamento não está apenas nas
              tarefas que ele sugere, mas na clareza que ele cria sobre o que
              precisa ser comunicado, por que isso importa e como cada ação se
              conecta ao crescimento.
            </p>

            <p>
              Sempre que surgir uma dúvida sobre conteúdo, campanha,
              posicionamento, linguagem, canal ou prioridade, volte a este
              ambiente. Ele foi feito para evitar decisões improvisadas e para
              ajudar você, seu time ou nossa equipe a manter consistência na
              execução.
            </p>

            <p>
              Pense neste planejamento como uma referência viva. Ele deve ser
              consultado, revisado e usado como apoio para transformar marketing
              em direção estratégica, presença mais forte e crescimento com mais
              intenção.
            </p>
          </div>
        </section>

        <div className="h-px bg-slate-200" />

        <section className="rounded-[1.5rem] bg-slate-50 p-7 ring-1 ring-slate-200">
          <h3 className="text-3xl font-light tracking-[-0.04em] text-slate-950">
            Precisa de ajuda?
          </h3>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Se precisar de qualquer apoio para entender, interpretar ou executar
            este planejamento, entre em contato comigo pelos canais abaixo.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="mailto:otavio@metodoepc.com.br"
              className="inline-flex items-center gap-2 font-medium transition hover:text-slate-950"
            >
              <EmailIcon />
              otavio@metodoepc.com.br
            </a>

            <a
              href="https://wa.me/5522981412223"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium transition hover:text-slate-950"
            >
              <WhatsAppIcon />
              22 98141-2223
            </a>
          </div>

          <div className="mt-8 text-base leading-8 text-slate-600">
            <p>Um grande abraço,</p>

            <p className="mt-2 font-semibold text-slate-950">Otávio Silva</p>

            <p>Consultor estrategista de marketing</p>
          </div>
        </section>
      </div>
    </section>
  );
}