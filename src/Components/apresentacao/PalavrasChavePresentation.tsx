"use client";

import { useEffect, useState } from "react";
import { ModuleIcon } from "./ModuleIcon";
import { RichText } from "./RichText";

type KeywordItem = { keyword: string; volume: string; observation: string };
type KeywordsData = {
  sortBy: string;
  keywords: KeywordItem[];
  strategicObservation: string;
};

function isKeywordsData(v: unknown): v is KeywordsData {
  return typeof v === "object" && v !== null && "keywords" in v;
}

function KeywordModal({
  item,
  onClose,
}: {
  item: KeywordItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 py-20 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyword-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between gap-5 px-7 pt-7 pb-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
              Detalhes da palavra-chave
            </p>
            <h3
              id="keyword-modal-title"
              className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950"
            >
              {item.keyword || "Palavra-chave"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes da palavra-chave"
            className="mt-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:bg-slate-950 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Modal body */}
        <div className="px-7 pb-7">
          <div className="grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                Palavra-chave
              </p>
              <p className="mt-2 text-base font-medium text-slate-950">
                {item.keyword || "Não informado"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                Volume de buscas
              </p>
              <p className="mt-2 text-base font-medium text-slate-950">
                {item.volume || "Não informado"}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
              Observação estratégica
            </p>
            <p className="mt-3 text-base leading-8 text-slate-600">
              {item.observation ||
                "Nenhuma observação estratégica foi cadastrada para esta palavra-chave."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PalavrasChavePresentation({
  data,
}: {
  data: unknown;
}) {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(
    null
  );

  const d = isKeywordsData(data) ? data : null;
  const keywords = (d?.keywords ?? []).filter((k) => k.keyword?.trim());
  const strategicObservation = d?.strategicObservation?.trim() ?? "";

  useEffect(() => {
    if (!selectedKeyword) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedKeyword(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedKeyword]);

  return (
    <>
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        {/* Header */}
        <section className="p-8 lg:p-12">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
              <ModuleIcon slug="palavras-chave" size="lg" inverted />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
                Fundamentos Estratégicos
              </p>
              <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
                Palavras-chave
              </h2>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Termos prioritários para orientar SEO, conteúdos, campanhas e
            oportunidades de posicionamento. Clique em uma palavra-chave para
            ver volume de buscas e observações estratégicas.
          </p>
        </section>

        {/* Keyword chips */}
        {!d ? (
          <section className="p-8 lg:p-12">
            <p className="text-slate-500">
              Este módulo ainda não foi preenchido no planejamento.
            </p>
          </section>
        ) : keywords.length === 0 ? (
          <section className="p-8 lg:p-12">
            <p className="text-slate-500">
              Nenhuma palavra-chave foi cadastrada neste módulo ainda.
            </p>
          </section>
        ) : (
          <section className="p-8 lg:p-12">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
              Mapa de termos estratégicos
            </p>
            <div className="flex flex-wrap gap-3">
              {keywords.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedKeyword(item)}
                  className="flex cursor-pointer flex-col items-start rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-2.5 text-left transition hover:border-[#c79e40] hover:bg-[#c79e40] hover:text-black"
                >
                  <span className="text-sm font-semibold text-[#7a5c0a] transition group-hover:text-black [.group:hover_&]:text-black">
                    {item.keyword}
                  </span>
                  {item.volume && (
                    <span className="mt-0.5 text-xs text-[#c79e40]/70">
                      {item.volume} buscas
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Strategic observation */}
        {strategicObservation && (
          <section className="p-8 lg:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Observação estratégica
            </p>
            <RichText
              content={strategicObservation}
              className="text-base leading-8 text-slate-700"
            />
          </section>
        )}
      </article>

      {selectedKeyword && (
        <KeywordModal
          item={selectedKeyword}
          onClose={() => setSelectedKeyword(null)}
        />
      )}
    </>
  );
}
