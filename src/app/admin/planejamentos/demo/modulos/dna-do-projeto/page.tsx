"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "metodo-epc-demo-dna-projeto";

type ProjectDnaData = {
  fields: Record<string, string>;
};

const initialData: ProjectDnaData = {
  fields: {},
};

const menuGroups = [
  {
    title: "Planejamento",
    items: [{ label: "Cliente Demo", href: "/admin/planejamentos/demo" }],
  },
  {
    title: "Essência do projeto",
    items: [
      {
        label: "Especialista",
        href: "/admin/planejamentos/demo/modulos/dna-do-especialista",
      },
      {
        label: "Empresa",
        href: "/admin/planejamentos/demo/modulos/dna-da-empresa",
      },
      {
        label: "DNA do Conteúdo",
        href: "/admin/planejamentos/demo/modulos/dna-de-conteudo",
      },
      {
        label: "DNA do Projeto",
        href: "/admin/planejamentos/demo/modulos/dna-do-projeto",
        active: true,
      },
      {
        label: "Personalidade do Especialista",
        href: "/admin/planejamentos/demo/modulos/personalidade-do-especialista",
      },
      {
        label: "Tom de Voz",
        href: "/admin/planejamentos/demo/modulos/tom-de-voz",
      },
      {
        label: "Identidade Visual",
        href: "/admin/planejamentos/demo/modulos/identidade-visual",
      },
    ],
  },
  {
    title: "Fundamentos estratégicos do projeto",
    items: [
      {
        label: "Objetivos do Projeto",
        href: "/admin/planejamentos/demo/modulos/objetivos-do-projeto",
      },
      {
        label: "Referências e Concorrentes",
        href: "/admin/planejamentos/demo/modulos/referencias-e-concorrentes",
      },
      {
        label: "Análise de Concorrência",
        href: "/admin/planejamentos/demo/modulos/pesquisa-de-concorrencia",
      },
      {
        label: "Análise SWOT",
        href: "/admin/planejamentos/demo/modulos/analise-swot",
      },
      {
        label: "Palavras-chave",
        href: "/admin/planejamentos/demo/modulos/palavras-chave",
      },
      {
        label: "Personas",
        href: "/admin/planejamentos/demo/modulos/personas",
      },
      {
        label: "Jornada de Compra",
        href: "/admin/planejamentos/demo/modulos/jornada-de-compra",
      },
      {
        label: "Canais Digitais Atuais",
        href: "/admin/planejamentos/demo/modulos/canais-digitais-atuais",
      },
    ],
  },
  {
    title: "Estratégia editorial e canais de conteúdo",
    items: [
      {
        label: "Funil de Conteúdo",
        href: "/admin/planejamentos/demo/modulos/funil-de-conteudo",
      },
      {
        label: "Linhas Editoriais",
        href: "/admin/planejamentos/demo/modulos/linhas-editoriais",
      },
      {
        label: "Instagram",
        href: "/admin/planejamentos/demo/modulos/instagram",
      },
      {
        label: "TikTok",
        href: "/admin/planejamentos/demo/modulos/tiktok",
      },
      {
        label: "Youtube",
        href: "/admin/planejamentos/demo/modulos/youtube",
      },
      {
        label: "Facebook",
        href: "/admin/planejamentos/demo/modulos/facebook",
      },
      {
        label: "Linkedin",
        href: "/admin/planejamentos/demo/modulos/linkedin",
      },
      {
        label: "WhatsApp",
        href: "/admin/planejamentos/demo/modulos/whatsapp",
      },
      {
        label: "Blog",
        href: "/admin/planejamentos/demo/modulos/blog",
      },
      {
        label: "Pinterest",
        href: "/admin/planejamentos/demo/modulos/pinterest",
      },
      {
        label: "Podcast",
        href: "/admin/planejamentos/demo/modulos/podcasts",
      },
      {
        label: "Lives",
        href: "/admin/planejamentos/demo/modulos/lives",
      },
      {
        label: "Materiais Educacionais",
        href: "/admin/planejamentos/demo/modulos/materiais-educacionais",
      },
      {
        label: "Estratégia do Site",
        href: "/admin/planejamentos/demo/modulos/estrategia-do-site",
      },
      {
        label: "Mapa do Site",
        href: "/admin/planejamentos/demo/modulos/mapa-do-site",
      },
    ],
  },
  {
    title: "Campanhas, automações e conversão",
    items: [
      {
        label: "Campanha: Captação de Lead",
        href: "/admin/planejamentos/demo/modulos/campanha-captacao-de-lead",
      },
      {
        label: "Campanha: Conversão de Vendas",
        href: "/admin/planejamentos/demo/modulos/campanha-conversao-de-vendas",
      },
      {
        label: "Campanha: Distribuição de Conteúdo",
        href: "/admin/planejamentos/demo/modulos/campanha-distribuicao-de-conteudo",
      },
      {
        label: "Fluxo de Automação",
        href: "/admin/planejamentos/demo/modulos/fluxo-de-automacao",
      },
    ],
  },
  {
    title: "Execução, acompanhamento e gestão",
    items: [
      {
        label: "Linha do Tempo",
        href: "/admin/planejamentos/demo/modulos/linha-do-tempo",
      },
      {
        label: "Calendário de Conteúdo",
        href: "/admin/planejamentos/demo/modulos/calendario-de-conteudo",
      },
      {
        label: "Métricas e Indicadores",
        href: "/admin/planejamentos/demo/modulos/metricas-e-indicadores",
      },
      {
        label: "Orientações Adicionais",
        href: "/admin/planejamentos/demo/modulos/orientacoes-adicionais",
      },
    ],
  },
];

const projectDnaFields = [
  {
    key: "nomeDoProjeto",
    label: "Nome do projeto",
    placeholder:
      "Informe o nome do projeto, produto, marca, campanha, método ou iniciativa estratégica que será trabalhada.",
  },
  {
    key: "oQueEProjeto",
    label: "O que é o projeto",
    placeholder:
      "Explique o que é o projeto, qual é sua natureza, proposta principal e por que ele existe.",
  },
  {
    key: "contextoDoProjeto",
    label: "Contexto do projeto",
    placeholder:
      "Descreva o cenário atual, o momento da empresa ou especialista e o que levou à necessidade deste projeto.",
  },
  {
    key: "propositoDoProjeto",
    label: "Propósito do projeto",
    placeholder:
      "Explique qual é o propósito estratégico do projeto e qual transformação ele pretende gerar.",
  },
  {
    key: "objetivoCentral",
    label: "Objetivo central",
    placeholder:
      "Defina o principal objetivo do projeto. Exemplo: reposicionar, lançar, vender, educar, captar leads, fortalecer autoridade ou organizar crescimento.",
  },
  {
    key: "publicoDoProjeto",
    label: "Público do projeto",
    placeholder:
      "Descreva para quem este projeto foi criado, quais perfis devem ser priorizados e quais públicos ele precisa alcançar.",
  },
  {
    key: "problemaQueResolve",
    label: "Problema que resolve",
    placeholder:
      "Quais dores, dificuldades, travas, dúvidas ou desejos este projeto ajuda a resolver?",
  },
  {
    key: "transformacaoGerada",
    label: "Transformação gerada",
    placeholder:
      "Descreva o antes e depois que o projeto busca provocar na vida, percepção ou decisão do público.",
  },
  {
    key: "promessaEstrategica",
    label: "Promessa estratégica",
    placeholder:
      "Qual é a promessa central do projeto? Escreva de forma clara, forte e conectada ao valor percebido pelo público.",
  },
  {
    key: "posicionamentoDoProjeto",
    label: "Posicionamento do projeto",
    placeholder:
      "Explique como o projeto deve ser percebido no mercado e qual lugar ele precisa ocupar na mente do público.",
  },
  {
    key: "diferenciaisDoProjeto",
    label: "Diferenciais do projeto",
    placeholder:
      "Liste os diferenciais que tornam este projeto relevante, específico, confiável ou mais forte que outras alternativas.",
  },
  {
    key: "metodologiaOuCaminho",
    label: "Metodologia ou caminho",
    placeholder:
      "Explique se o projeto possui método, etapas, lógica própria, processo, estrutura ou caminho de transformação.",
  },
  {
    key: "mensagemPrincipal",
    label: "Mensagem principal",
    placeholder:
      "Qual ideia precisa ser repetida e reforçada para que o público entenda o valor do projeto?",
  },
  {
    key: "pontosDeProva",
    label: "Pontos de prova",
    placeholder:
      "Liste provas, argumentos, dados, resultados, bastidores, experiências ou evidências que sustentam o projeto.",
  },
  {
    key: "objecoesDoPublico",
    label: "Objeções do público",
    placeholder:
      "Quais dúvidas, inseguranças, medos ou resistências podem impedir o público de confiar ou avançar?",
  },
  {
    key: "criteriosDeSucesso",
    label: "Critérios de sucesso",
    placeholder:
      "Como saberemos que o projeto está funcionando? Liste resultados esperados, indicadores, avanços ou sinais de progresso.",
  },
  {
    key: "direcaoEstrategica",
    label: "Direção estratégica",
    placeholder:
      "Descreva a direção geral que o projeto deve seguir em comunicação, posicionamento, conteúdo, campanhas e execução.",
  },
];

function PageSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto bg-white px-5 py-6 ring-1 ring-slate-200 lg:block">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Rotevo
        </h1>
        <p className="mt-1 text-xs text-slate-500">Painel administrativo</p>
      </div>

      <nav className="mt-8 space-y-7">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded-xl px-3 py-2 text-sm transition",
                    item.active
                      ? "bg-slate-100 font-semibold text-slate-950"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function TextAreaCard({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <label className="text-sm font-semibold text-slate-950">{label}</label>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />
    </section>
  );
}

export default function DnaDoProjetoPage() {
  const [data, setData] = useState<ProjectDnaData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch {
        setData(initialData);
      }
    }
  }, []);

  function updateField(key: string, value: string) {
    setData((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value,
      },
    }));
  }

  function saveData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedMessage("Módulo salvo com sucesso.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2800);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 lg:pl-72">
      <PageSidebar />

      <section className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/admin/planejamentos/demo"
              className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              ← Voltar para planejamentos
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Essência do projeto
            </p>

            <h2 className="mt-3 text-5xl font-light tracking-[-0.04em] text-slate-950">
              DNA do Projeto
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Preencha as informações que definem a estrutura estratégica do
              projeto, sua promessa, sua direção, seus diferenciais e o caminho
              de transformação que ele precisa comunicar.
            </p>

            {savedMessage && (
              <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {savedMessage}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/apresentacao/demo"
              className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white hover:ring-slate-950"
            >
              Ver apresentação
            </Link>

            <button
              type="button"
              onClick={saveData}
              className="inline-flex h-12 min-w-[140px] cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Salvar módulo
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {projectDnaFields.map((field) => (
            <TextAreaCard
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              value={data.fields[field.key] || ""}
              onChange={(value) => updateField(field.key, value)}
            />
          ))}
        </div>

        <div className="sticky bottom-0 -mx-6 mt-8 border-t border-slate-200 bg-slate-100/90 px-6 py-5 backdrop-blur lg:-mx-10 lg:px-10">
          <div className="mx-auto flex max-w-6xl justify-end gap-3">
            <Link
              href="/admin/planejamentos/demo"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Voltar para planejamentos
            </Link>

            <Link
              href="/apresentacao/demo"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Ver apresentação
            </Link>

            <button
              type="button"
              onClick={saveData}
              className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Salvar módulo
            </button>
          </div>
        </div>

        {savedMessage && (
          <div className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl">
            {savedMessage}
          </div>
        )}
      </section>
    </main>
  );
}