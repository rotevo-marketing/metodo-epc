"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "metodo-epc-demo-dna-conteudo";

type ContentDnaData = {
  fields: Record<string, string>;
  secondaryIdeas: string[];
};

const initialData: ContentDnaData = {
  fields: {},
  secondaryIdeas: [""],
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
        active: true,
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
];

const contentDnaFields = [
  {
    key: "posicionamentoUnico",
    label: "Posicionamento único",
    helper: "É a forma como o seu cliente quer ser visto pelo mercado.",
    placeholder:
      "Ex: Ser reconhecida como referência em reestruturação interna para empresários em expansão, atuando diretamente na estrutura invisível que sustenta decisões, crescimento e resultados.",
  },
  {
    key: "propostaUnicaValor",
    label: "Proposta única de valor",
    helper: "É o valor mais peculiar do negócio que está emitindo o conteúdo.",
    placeholder:
      "Ex: Revelar e reorganizar a base interna que sustenta os resultados do empresário, integrando identidade de liderança, mentalidade financeira e padrões de decisão.",
  },
  {
    key: "maiorTransformacao",
    label: "Maior transformação que o conteúdo entrega",
    helper: "É a grande diferença do conteúdo, o que ele torna único e inigualável na mente dos consumidores.",
    placeholder:
      "Ex: O conteúdo conduz o empresário a reconhecer que o limite do seu crescimento não está na estratégia externa, mas na sua estrutura interna.",
  },
  {
    key: "bigIdea",
    label: "A Big Idea do conteúdo",
    helper:
      "É a ideia genial, a ideia master, que vai nortear todas as produções desse conteúdo.",
    placeholder:
      "Ex: Você não nasceu para construir um negócio e perder a si mesmo no processo.",
  },
];

function PageSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto bg-white px-5 py-6 ring-1 ring-slate-200 lg:block">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Metodo EPC
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
  helper,
  placeholder,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  helper: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <label className="text-sm font-semibold text-slate-950">{label}</label>

      <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>

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

export default function DnaDeConteudoPage() {
  const [data, setData] = useState<ContentDnaData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        setData({
          fields: parsed.fields || {},
          secondaryIdeas: parsed.secondaryIdeas?.length
            ? parsed.secondaryIdeas
            : [""],
        });
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

  function updateSecondaryIdea(index: number, value: string) {
    setData((current) => {
      const next = [...current.secondaryIdeas];
      next[index] = value;

      return {
        ...current,
        secondaryIdeas: next,
      };
    });
  }

  function addSecondaryIdea() {
    setData((current) => ({
      ...current,
      secondaryIdeas: [...current.secondaryIdeas, ""],
    }));
  }

  function removeSecondaryIdea(index: number) {
    setData((current) => ({
      ...current,
      secondaryIdeas:
        current.secondaryIdeas.length > 1
          ? current.secondaryIdeas.filter((_, itemIndex) => itemIndex !== index)
          : [""],
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
              DNA de Conteúdo
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Configure a essência estratégica do conteúdo: posicionamento,
              proposta de valor, transformação, Big Idea e ideias centrais que
              devem orientar a comunicação.
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
          {contentDnaFields.map((field) => (
            <TextAreaCard
              key={field.key}
              label={field.label}
              helper={field.helper}
              placeholder={field.placeholder}
              value={data.fields[field.key] || ""}
              onChange={(value) => updateField(field.key, value)}
            />
          ))}

          <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <label className="text-sm font-semibold text-slate-950">
              Ideias secundárias
            </label>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              São ideias derivadas da Big Idea e que podem contribuir para a
              diferenciação do conteúdo.
            </p>

            <div className="mt-5 space-y-3">
              {data.secondaryIdeas.map((idea, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={idea}
                    onChange={(event) =>
                      updateSecondaryIdea(index, event.target.value)
                    }
                    placeholder="Ideia"
                    className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />

                  <button
                    type="button"
                    onClick={() => removeSecondaryIdea(index)}
                    className="h-12 rounded-full px-4 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSecondaryIdea}
              className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white hover:ring-slate-950"
            >
              + Nova ideia
            </button>
          </section>
        </div>

        <div className="sticky bottom-0 -mx-6 mt-8 border-t border-slate-200 bg-slate-100/90 px-6 py-5 backdrop-blur lg:-mx-10 lg:px-10">
          <div className="mx-auto flex max-w-6xl justify-end gap-3">
            <Link
              href="/admin/planejamentos/demo"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Voltar para planejamentos
            </Link>

            <button
              type="button"
              onClick={saveData}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Salvar módulo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}