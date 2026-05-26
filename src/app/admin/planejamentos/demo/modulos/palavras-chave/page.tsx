"use client";

import { useEffect, useMemo, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-palavras-chave";

type KeywordItem = {
  keyword: string;
  volume: string;
  observation: string;
};

type KeywordsData = {
  sortBy: "adicao" | "palavra" | "volume";
  keywords: KeywordItem[];
  strategicObservation: string;
};

const initialKeyword: KeywordItem = {
  keyword: "",
  volume: "",
  observation: "",
};

const initialData: KeywordsData = {
  sortBy: "adicao",
  keywords: [initialKeyword],
  strategicObservation: "",
};

function PageSidebar() {
  return (
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
                  const isActive = module.slug === "palavras-chave";

                  return (
                    <a
                      key={module.slug}
                      href={`/admin/planejamentos/demo/modulos/${module.slug}`}
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
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </section>
  );
}

function parseVolume(volume: string) {
  const normalized = volume.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function PalavrasChavePage() {
  const [data, setData] = useState<KeywordsData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        sortBy: parsed.sortBy || "adicao",
        keywords:
          Array.isArray(parsed.keywords) && parsed.keywords.length
            ? parsed.keywords.map((item: Partial<KeywordItem>) => ({
                keyword: item.keyword || "",
                volume: item.volume || "",
                observation: item.observation || "",
              }))
            : initialData.keywords,
        strategicObservation: parsed.strategicObservation || "",
      });
    } catch {
      setData(initialData);
    }
  }, []);

  const sortedKeywords = useMemo(() => {
    const keywords = [...data.keywords];

    if (data.sortBy === "palavra") {
      return keywords.sort((a, b) => a.keyword.localeCompare(b.keyword));
    }

    if (data.sortBy === "volume") {
      return keywords.sort(
        (a, b) => parseVolume(b.volume) - parseVolume(a.volume)
      );
    }

    return keywords;
  }, [data.keywords, data.sortBy]);

  function saveData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedMessage("Módulo salvo com sucesso.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2800);
  }

  function updateSortBy(value: KeywordsData["sortBy"]) {
    setData((current) => ({
      ...current,
      sortBy: value,
    }));
  }

  function updateKeyword(
    originalIndex: number,
    key: keyof KeywordItem,
    value: string
  ) {
    setData((current) => {
      const nextKeywords = [...current.keywords];

      nextKeywords[originalIndex] = {
        ...nextKeywords[originalIndex],
        [key]: value,
      };

      return {
        ...current,
        keywords: nextKeywords,
      };
    });
  }

  function addKeyword() {
    setData((current) => ({
      ...current,
      keywords: [
        ...current.keywords,
        {
          ...initialKeyword,
        },
      ],
    }));
  }

  function duplicateKeyword(originalIndex: number) {
    setData((current) => ({
      ...current,
      keywords: [
        ...current.keywords,
        {
          ...current.keywords[originalIndex],
        },
      ],
    }));
  }

  function removeKeyword(originalIndex: number) {
    setData((current) => ({
      ...current,
      keywords:
        current.keywords.length > 1
          ? current.keywords.filter((_, index) => index !== originalIndex)
          : [
              {
                ...initialKeyword,
              },
            ],
    }));
  }

  function getOriginalIndex(keywordItem: KeywordItem) {
    return data.keywords.indexOf(keywordItem);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <PageSidebar />

      <section className="min-h-screen p-6 lg:ml-80 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
                Palavras-chave
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Informe as palavras-chave do projeto. Elas representam os termos
                mais buscados no Google e ajudam a orientar conteúdos, SEO,
                campanhas, páginas e oportunidades estratégicas.
              </p>

              {savedMessage && (
                <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {savedMessage}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/apresentacao/demo"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver apresentação
              </a>

              <button
                type="button"
                onClick={saveData}
                className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Salvar módulo
              </button>
            </div>
          </div>

          <form className="space-y-6">
            <SectionCard
              title="Lista de palavras-chave"
              description="Adicione palavras-chave, volume de buscas e observações importantes. Use ferramentas como planejador de palavras-chave do Google, Answer The Public, Semrush, Ubersuggest ou similares."
            >
              <div className="max-w-xs">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Ordenar por
                </label>

                <select
                  value={data.sortBy}
                  onChange={(event) =>
                    updateSortBy(event.target.value as KeywordsData["sortBy"])
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  <option value="adicao">Adição</option>
                  <option value="palavra">Palavra-chave</option>
                  <option value="volume">Volume de buscas</option>
                </select>
              </div>

              <div className="mt-6 overflow-x-auto pb-2">
                <table className="min-w-[980px] w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      <th className="w-14 px-2">#</th>
                      <th className="px-2">Palavra-chave</th>
                      <th className="w-44 px-2">Volume de buscas</th>
                      <th className="px-2">Observação</th>
                      <th className="w-44 px-2">Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedKeywords.map((keywordItem, sortedIndex) => {
                      const originalIndex = getOriginalIndex(keywordItem);

                      return (
                        <tr key={`${sortedIndex}-${originalIndex}`}>
                          <td className="px-2 text-sm font-semibold text-slate-500">
                            {String(sortedIndex + 1).padStart(2, "0")}
                          </td>

                          <td className="px-2">
                            <input
                              type="text"
                              value={keywordItem.keyword}
                              onChange={(event) =>
                                updateKeyword(
                                  originalIndex,
                                  "keyword",
                                  event.target.value
                                )
                              }
                              placeholder="Ex: planejamento estratégico"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                          </td>

                          <td className="px-2">
                            <input
                              type="text"
                              value={keywordItem.volume}
                              onChange={(event) =>
                                updateKeyword(
                                  originalIndex,
                                  "volume",
                                  event.target.value
                                )
                              }
                              placeholder="Ex: 1.000"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                          </td>

                          <td className="px-2">
                            <input
                              type="text"
                              value={keywordItem.observation}
                              onChange={(event) =>
                                updateKeyword(
                                  originalIndex,
                                  "observation",
                                  event.target.value
                                )
                              }
                              placeholder="Observação sobre intenção de busca, prioridade ou uso estratégico"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                          </td>

                          <td className="px-2">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => duplicateKeyword(originalIndex)}
                                className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-950 hover:text-white"
                              >
                                Duplicar
                              </button>

                              <button
                                type="button"
                                onClick={() => removeKeyword(originalIndex)}
                                className="cursor-pointer rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                              >
                                Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={addKeyword}
                className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
              >
                + Adicionar linha
              </button>
            </SectionCard>

            <SectionCard
              title="Observações estratégicas"
              description="Use este campo para resumir padrões, oportunidades, prioridades, intenção de busca e decisões de SEO ou conteúdo."
            >
              <textarea
                rows={7}
                value={data.strategicObservation}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    strategicObservation: event.target.value,
                  }))
                }
                placeholder="Registre aqui os principais aprendizados da pesquisa de palavras-chave."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

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

                <button
                  type="button"
                  onClick={saveData}
                  className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
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