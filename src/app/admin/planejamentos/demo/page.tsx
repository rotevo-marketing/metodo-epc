import Link from "next/link";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";

const clientName = "Cliente Demo";

const groups = [
  {
    title: "Essência do projeto",
    description:
      "Informações que definem a base estratégica, identidade, voz e percepção do projeto.",
    modules: [
      {
        title: "Especialista",
        description:
          "Quem é, o que faz, trajetória, autoridade, tom de voz, narrativa e personalidade.",
        href: "/admin/planejamentos/demo/modulos/dna-do-especialista",
        icon: "/icons/01-especialista.svg",
      },
      {
        title: "Empresa",
        description:
          "Estrutura, posicionamento, diferenciais, história e percepção desejada para a empresa.",
        href: "/admin/planejamentos/demo/modulos/dna-da-empresa",
        icon: "/icons/02-empresa.svg",
      },
      {
        title: "DNA do Conteúdo",
        description:
          "Direção, pilares e características do conteúdo que sustentam a comunicação.",
        href: "/admin/planejamentos/demo/modulos/dna-de-conteudo",
        icon: "/icons/03-dna-conteudo.svg",
      },
      {
        title: "DNA do Projeto",
        description:
          "Fundamentos do projeto, proposta, diferenciais e lógica estratégica.",
        href: "/admin/planejamentos/demo/modulos/dna-do-projeto",
        icon: "/icons/04-dna-projeto.svg",
      },
      {
        title: "Personalidade do Especialista",
        description:
          "Características pessoais que devem aparecer na comunicação e no posicionamento.",
        href: "/admin/planejamentos/demo/modulos/personalidade-do-especialista",
        icon: "/icons/05-personalidade.svg",
      },
      {
        title: "Tom de Voz",
        description:
          "Definição da forma como o projeto deve falar, se expressar e se posicionar.",
        href: "/admin/planejamentos/demo/modulos/tom-de-voz",
        icon: "/icons/06-tom-de-voz.svg",
      },
      {
        title: "Identidade Visual",
        description:
          "Diretrizes visuais, referências, estilo, cores, fontes e percepção estética.",
        href: "/admin/planejamentos/demo/modulos/identidade-visual",
        icon: "/icons/07-identidade-visual.svg",
      },
    ],
  },
  {
    title: "Fundamentos estratégicos do projeto",
    description:
      "Análises e definições que orientam mercado, público, concorrência e decisões estratégicas.",
    modules: [
      {
        title: "Objetivos do Projeto",
        description:
          "Metas, prioridades e objetivos que direcionam a construção estratégica.",
        href: "/admin/planejamentos/demo/modulos/objetivos-do-projeto",
        icon: "/icons/08-objetivos.svg",
      },
      {
        title: "Referências e Concorrentes",
        description:
          "Referências externas, concorrentes percebidos e inspirações do projeto.",
        href: "/admin/planejamentos/demo/modulos/referencias-e-concorrentes",
        icon: "/icons/09-referencias-e-concorrentes.svg",
      },
      {
        title: "Pesquisa de Concorrência",
        description:
          "Análise aprofundada dos concorrentes, presença digital, comunicação e oportunidades.",
        href: "/admin/planejamentos/demo/modulos/pesquisa-de-concorrencia",
        icon: "/icons/10-pesquisa-de-concorrencia.svg",
      },
      {
        title: "Análise SWOT",
        description:
          "Forças, fraquezas, oportunidades e ameaças que impactam o projeto.",
        href: "/admin/planejamentos/demo/modulos/analise-swot",
        icon: "/icons/11-analise-swot.svg",
      },
      {
        title: "Palavras-chave",
        description:
          "Termos estratégicos, buscas e palavras importantes para o conteúdo e posicionamento.",
        href: "/admin/planejamentos/demo/modulos/palavras-chave",
        icon: "/icons/12-palavras-chave.svg",
      },
      {
        title: "Personas",
        description:
          "Perfis de público, comportamento, dores, desejos e jornada de decisão.",
        href: "/admin/planejamentos/demo/modulos/personas",
        icon: "/icons/13-personas.svg",
      },
      {
        title: "Jornada de Compra",
        description:
          "Etapas que o público percorre até reconhecer valor, confiar e comprar.",
        href: "/admin/planejamentos/demo/modulos/jornada-de-compra",
        icon: "/icons/14-jornada-de-compra.svg",
      },
      {
        title: "Canais Digitais Atuais",
        description:
          "Canais existentes, links, descrição, presença digital e ativos já utilizados.",
        href: "/admin/planejamentos/demo/modulos/canais-digitais-atuais",
        icon: "/icons/15-canais-digitais.svg",
      },
    ],
  },
  {
    title: "Estratégia editorial e canais de conteúdo",
    description:
      "Definição do conteúdo, linhas editoriais, canais prioritários e presença digital.",
    modules: [
      {
        title: "Funil de Conteúdo",
        description:
          "Conteúdos de atração, conexão, vinculação e venda dentro da estratégia.",
        href: "/admin/planejamentos/demo/modulos/funil-de-conteudo",
        icon: "/icons/16-funil-de-conteudo.svg",
      },
      {
        title: "Linhas Editoriais",
        description:
          "Assuntos, temas e direções que organizam a produção de conteúdo.",
        href: "/admin/planejamentos/demo/modulos/linhas-editoriais",
        icon: "/icons/17-linhas-editoriais.svg",
      },
      {
        title: "Instagram",
        description:
          "Frequência, objetivos, linguagem, conteúdos, bio e identidade visual.",
        href: "/admin/planejamentos/demo/modulos/instagram",
        icon: "/icons/18-instagram.svg",
      },
      {
        title: "TikTok",
        description:
          "Direção de conteúdo, linguagem, frequência e estratégia para vídeos curtos.",
        href: "/admin/planejamentos/demo/modulos/tiktok",
        icon: "/icons/19-tik-tok.svg",
      },
      {
        title: "Youtube",
        description:
          "Estratégia de vídeos, frequência, linguagem, SEO e conteúdos do canal.",
        href: "/admin/planejamentos/demo/modulos/youtube",
        icon: "/icons/20-youtube.svg",
      },
      {
        title: "Facebook",
        description:
          "Estratégia, frequência, objetivos e conteúdos para presença no Facebook.",
        href: "/admin/planejamentos/demo/modulos/facebook",
        icon: "/icons/21-facebook.svg",
      },
      {
        title: "Linkedin",
        description:
          "Posicionamento profissional, conteúdo, frequência e linguagem para Linkedin.",
        href: "/admin/planejamentos/demo/modulos/linkedin",
        icon: "/icons/22-linkedin.svg",
      },
      {
        title: "WhatsApp",
        description:
          "Direção de comunicação, relacionamento, conteúdos e uso estratégico do canal.",
        href: "/admin/planejamentos/demo/modulos/whatsapp",
        icon: "/icons/23-whatsaap.svg",
      },
      {
        title: "Blog",
        description:
          "Estratégia editorial, linguagem, pautas, frequência e estrutura do blog.",
        href: "/admin/planejamentos/demo/modulos/blog",
        icon: "/icons/24-blog.svg",
      },
      {
        title: "Pinterest",
        description:
          "Direção visual, frequência, objetivos e conteúdos para Pinterest.",
        href: "/admin/planejamentos/demo/modulos/pinterest",
        icon: "/icons/25-pinterest.svg",
      },
      {
        title: "Podcast",
        description:
          "Formato, linguagem, frequência, temas e estrutura do podcast.",
        href: "/admin/planejamentos/demo/modulos/podcasts",
        icon: "/icons/26-podcast.svg",
      },
      {
        title: "Lives",
        description:
          "Estratégia de lives, frequência por rede, temas e objetivos.",
        href: "/admin/planejamentos/demo/modulos/lives",
        icon: "/icons/27-lives.svg",
      },
      {
        title: "Materiais Educacionais",
        description:
          "E-books, PDFs, planilhas, webinários e materiais de captação.",
        href: "/admin/planejamentos/demo/modulos/materiais-educacionais",
        icon: "/icons/28-materiais-educacionais.svg",
      },
      {
        title: "Estratégia do Site",
        description:
          "Direção estratégica, referências, identidade visual e integrações do site.",
        href: "/admin/planejamentos/demo/modulos/estrategia-do-site",
        icon: "/icons/29-estrategia-do-site.svg",
      },
      {
        title: "Mapa do Site",
        description:
          "Páginas, estrutura e organização do site do projeto.",
        href: "/admin/planejamentos/demo/modulos/mapa-do-site",
        icon: "/icons/30-mapa-do-site.svg",
      },
    ],
  },
  {
    title: "Campanhas, automações e conversão",
    description:
      "Estrutura de campanhas, fluxos, captação, distribuição, vendas e automações.",
    modules: [
      {
        title: "Campanha: Captação de Lead",
        description:
          "Estratégia para captar leads, materiais, público, criativos, posicionamento e orçamento.",
        href: "/admin/planejamentos/demo/modulos/campanha-captacao-de-lead",
        icon: "/icons/31-campanha-leads.svg",
      },
      {
        title: "Campanha: Conversão de Vendas",
        description:
          "Estratégia para converter leads em clientes com anúncios, criativos e materiais.",
        href: "/admin/planejamentos/demo/modulos/campanha-conversao-de-vendas",
        icon: "/icons/32-campanha-vendas.svg",
      },
      {
        title: "Campanha: Distribuição de Conteúdo",
        description:
          "Estratégia de mídia paga para ampliar alcance e distribuição de conteúdos.",
        href: "/admin/planejamentos/demo/modulos/campanha-distribuicao-de-conteudo",
        icon: "/icons/33-campanha-conteudo.svg",
      },
      {
        title: "Fluxo de Automação",
        description:
          "Fluxos, gatilhos, condições e lógica de relacionamento automatizado.",
        href: "/admin/planejamentos/demo/modulos/fluxo-de-automacao",
        icon: "/icons/34-fluxo-de-automacao.svg",
      },
    ],
  },
  {
    title: "Execução, acompanhamento e gestão",
    description:
      "Organização da execução, prazos, calendário, métricas e orientações finais.",
    modules: [
      {
        title: "Linha do Tempo",
        description:
          "Etapas, datas, entregas e sequência de implementação estratégica.",
        href: "/admin/planejamentos/demo/modulos/linha-do-tempo",
        icon: "/icons/35-linha-do-tempo.svg",
      },
      {
        title: "Calendário de Conteúdo",
        description:
          "Link externo para calendário editorial, organização de pautas e planejamento de publicações.",
        href: "/admin/planejamentos/demo/modulos/calendario-de-conteudo",
        icon: "/icons/36-calendario-de-conteudo.svg",
      },
      {
        title: "Métricas e Indicadores",
        description:
          "Indicadores, metas, acompanhamentos e critérios de análise do projeto.",
        href: "/admin/planejamentos/demo/modulos/metricas-e-indicadores",
        icon: "/icons/37-metricas-e-indicadores.svg",
      },
      {
        title: "Orientações Adicionais",
        description:
          "Dicas, capturas, criativos, observações e orientações complementares.",
        href: "/admin/planejamentos/demo/modulos/orientacoes-adicionais",
        icon: "/icons/38-orientacoes.svg",
      },
    ],
  },
];

const coverImageUrl =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2200&auto=format&fit=crop";

function PlanningFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
            Metodo EPC
          </p>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Painel interno do estrategista para gestão dos planejamentos.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-500 lg:items-end">
          <a
            href="mailto:otavio@metodoepc.com.br"
            className="font-medium transition hover:text-slate-950"
          >
            otavio@metodoepc.com.br
          </a>

          <a
            href="https://wa.me/5522981412223"
            target="_blank"
            rel="noreferrer"
            className="font-medium transition hover:text-slate-950"
          >
            WhatsApp: 22 98141-2223
          </a>

          <p className="text-xs text-slate-400">
            © 2026 Metodo EPC. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function PlanejamentoDemoPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="relative min-h-[520px] overflow-hidden bg-slate-950 text-white">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-35"
    style={{
      backgroundImage: `url(${coverImageUrl})`,
    }}
  />
  <div className="absolute inset-0 bg-slate-950/70" />

  <div className="relative z-10 flex min-h-[520px] flex-col justify-between px-6 py-8 lg:px-16">
    <div className="flex flex-wrap items-center justify-between gap-4">
  <MetodoLogo
    href="/admin"
    size="sm"
    className="brightness-0 invert"
  />

  <div className="flex flex-wrap items-center justify-end gap-3">
    <Link
      href="/admin"
      className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
    >
      Voltar para planejamentos
    </Link>

    <Link
      href="/apresentacao/demo"
      className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
    >
      Ver apresentação
    </Link>

    <button
      type="button"
      className="cursor-pointer rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
    >
      Salvar planejamento
    </button>
  </div>
</div>

    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
      <p className="text-sm font-medium uppercase tracking-[0.55em] text-white/70">
        Planejamento Estratégico
      </p>

      <h1 className="mt-6 text-5xl font-light tracking-[-0.06em] text-white lg:text-7xl">
        {clientName}
      </h1>
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
  <div className="mb-10 border-b border-slate-200 pb-10">
    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
      Módulos do planejamento
    </p>

    <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
      Selecione o módulo que deseja preencher ou editar
    </h2>

    <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
      Cada área abre uma página própria com os campos específicos daquele bloco do planejamento.
    </p>
  </div>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {group.title}
                </p>

                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.modules.map((module) => (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="group rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-950 ring-1 ring-slate-200 transition group-hover:bg-slate-950">
                        <img
                          src={module.icon}
                          alt=""
                          className="h-6 w-6 object-contain transition group-hover:brightness-0 group-hover:invert"
                        />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                          {module.title}
                        </h2>

                        <p className="mt-2 text-sm leading-7 text-slate-500">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <MetodoFooter description="Painel interno do estrategista para edição do planejamento." />
    </main>
  );
}