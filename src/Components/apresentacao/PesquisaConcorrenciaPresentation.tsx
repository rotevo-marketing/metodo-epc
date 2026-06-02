"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModuleIcon } from "./ModuleIcon";

type CompetitorAnalysisItem = {
  image: string;
  name: string;
  website: string;
  positioning: string;
  targetAudience: string;
  productAndDelivery: string;
  channelsAndVisibility: string;
  contentAndCommunication: string;
  funnelAndConversion: string;
  strengths: string;
  opportunities: string;
};

type CompetitorResearchData = { competitors: CompetitorAnalysisItem[] };

function isCompetitorResearchData(v: unknown): v is CompetitorResearchData {
  return typeof v === "object" && v !== null && "competitors" in v;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

const analysisFields: { key: keyof CompetitorAnalysisItem; label: string }[] = [
  { key: "positioning", label: "Posicionamento e proposta de valor" },
  { key: "targetAudience", label: "Público-alvo" },
  { key: "productAndDelivery", label: "Produto e modelo de entrega" },
  { key: "channelsAndVisibility", label: "Canais e visibilidade" },
  { key: "contentAndCommunication", label: "Conteúdo e comunicação" },
  { key: "funnelAndConversion", label: "Funil de captação e conversão" },
  { key: "strengths", label: "Pontos fortes" },
  { key: "opportunities", label: "Lacunas e oportunidades" },
];

function CompetitorModal({
  competitor,
  index,
  onClose,
}: {
  competitor: CompetitorAnalysisItem;
  index: number;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="competitor-modal-name"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-5">
          {competitor.image ? (
            <img
              src={competitor.image}
              alt={competitor.name || "Concorrente"}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">
              {(competitor.name || "C").charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c79e40]">
              Concorrente {index + 1}
            </span>
            <h3
              id="competitor-modal-name"
              className="mt-0.5 truncate text-lg font-semibold tracking-tight text-slate-950"
            >
              {competitor.name || "Concorrente analisado"}
            </h3>
            {competitor.website && (
              <a
                href={competitor.website}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-xs text-slate-400 transition hover:text-slate-700"
              >
                {competitor.website}
              </a>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded-full bg-slate-950 px-3.5 py-1.5 text-xs font-medium text-white sm:inline-block">
              Análise competitiva
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-950"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {analysisFields.map(({ key, label }) => {
              const content = stripHtml(competitor[key]);
              if (!content) return null;
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {label}
                  </p>
                  <p className="text-sm leading-7 text-slate-700">{content}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal footer */}
        <div className="border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PesquisaConcorrenciaPresentation({
  data,
}: {
  data: unknown;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const d = isCompetitorResearchData(data) ? data : null;
  const competitors = (d?.competitors ?? []).filter(
    (c) => c.name?.trim() || c.image?.trim()
  );

  const selectedCompetitor =
    selectedIndex !== null ? (competitors[selectedIndex] ?? null) : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedIndex(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <>
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        {/* Header */}
        <section className="p-8 lg:p-12">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
              <ModuleIcon slug="pesquisa-de-concorrencia" size="lg" inverted />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
                Fundamentos Estratégicos
              </p>
              <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
                Análise de Concorrência
              </h2>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Análise comparativa dos principais concorrentes: posicionamento,
            proposta de valor, canais, comunicação, funil de captação e lacunas
            estratégicas que o projeto pode ocupar.
          </p>
        </section>

        {/* Competitor cards */}
        {!d ? (
          <section className="p-8 lg:p-12">
            <p className="text-slate-500">
              Este módulo ainda não foi preenchido no planejamento.
            </p>
          </section>
        ) : competitors.length === 0 ? (
          <section className="p-8 lg:p-12">
            <p className="text-slate-500">
              Nenhum concorrente foi cadastrado neste módulo ainda.
            </p>
          </section>
        ) : (
          <section className="p-8 lg:p-12">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {competitors.map((comp, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Card header */}
                  <div className="border-b border-slate-100 bg-slate-50/60 p-5">
                    <div className="flex items-center gap-4">
                      {comp.image ? (
                        <img
                          src={comp.image}
                          alt={comp.name || "Concorrente"}
                          className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">
                          {(comp.name || "C").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c79e40]">
                          Concorrente {i + 1}
                        </span>
                        <h3 className="mt-0.5 truncate text-base font-semibold tracking-tight text-slate-950">
                          {comp.name || "Concorrente analisado"}
                        </h3>
                        {comp.website && (
                          <a
                            href={comp.website}
                            target="_blank"
                            rel="noreferrer"
                            className="block truncate text-xs text-slate-400 transition hover:text-slate-700"
                          >
                            {comp.website}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    {comp.positioning && (
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Posicionamento
                        </p>
                        <p className="line-clamp-3 text-sm leading-6 text-slate-700">
                          {stripHtml(comp.positioning)}
                        </p>
                      </div>
                    )}

                    {comp.strengths && (
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                          Pontos fortes
                        </p>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                          {stripHtml(comp.strengths)}
                        </p>
                      </div>
                    )}

                    {comp.opportunities && (
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#a07828]">
                          Lacunas e oportunidades
                        </p>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                          {stripHtml(comp.opportunities)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card footer */}
                  <div className="border-t border-slate-100 p-5">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(i)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                    >
                      Ver análise completa →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      {mounted && selectedCompetitor && selectedIndex !== null &&
        createPortal(
          <CompetitorModal
            competitor={selectedCompetitor}
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />,
          document.body
        )
      }
    </>
  );
}
