"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type KeywordItem = {
  keyword: string;
  volume: string;
  observation: string;
};

export type KeywordsData = {
  sortBy: "adicao" | "palavra" | "volume";
  keywords: KeywordItem[];
  strategicObservation: string;
};

const initialKeyword: KeywordItem = {
  keyword: "",
  volume: "",
  observation: "",
};

export const initialKeywordsData: KeywordsData = {
  sortBy: "adicao",
  keywords: [initialKeyword],
  strategicObservation: "",
};

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      ) : null}

      <div className="mt-6">{children}</div>
    </section>
  );
}

function parseVolume(volume: string) {
  const normalized = volume.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? 0 : parsed;
}

type PalavrasChaveFormProps = {
  data: KeywordsData;
  setData: Dispatch<SetStateAction<KeywordsData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function PalavrasChaveForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: PalavrasChaveFormProps) {
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
    <div className="mt-6 space-y-6">
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
          <table className="w-full min-w-[980px] border-separate border-spacing-y-3">
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

      <div className="sticky bottom-0 rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href={`/admin/planejamentos/${clientSlug}`}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Voltar para módulos
          </Link>

          <Link
            href={presentationHref}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}