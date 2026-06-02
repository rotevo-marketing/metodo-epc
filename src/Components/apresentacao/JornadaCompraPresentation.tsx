"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModuleIcon } from "./ModuleIcon";
import { RichText } from "./RichText";

type JourneyStageData = {
  awarenessLevel: string;
  thoughts: string;
  pains: string;
  recommendedContent: string;
  recommendedChannels: string;
  desiredNextStep: string;
  conversionPoint: string;
};

type BuyingJourneyData = {
  overview: string;
  stages: JourneyStageData[];
  turningPoints: {
    discoveryToPain: string;
    painToSolution: string;
    solutionToComparison: string;
    comparisonToDecision: string;
  };
  objections: { beginning: string; middle: string; end: string };
  advancementTriggers: string;
  essentialContent: { awareness: string; decision: string };
  funnelCampaignsAutomation: string;
  references: { title: string; link: string }[];
};

function isBuyingJourneyData(v: unknown): v is BuyingJourneyData {
  return typeof v === "object" && v !== null && "stages" in v;
}

const stageTitles = [
  "Descoberta do problema",
  "Consciência da dor",
  "Busca por solução",
  "Comparação de alternativas",
  "Decisão de compra",
];

const stageFields: { key: keyof JourneyStageData; label: string }[] = [
  { key: "awarenessLevel", label: "Nível de consciência" },
  { key: "thoughts", label: "Pensamentos" },
  { key: "pains", label: "Dores" },
  { key: "recommendedContent", label: "Conteúdo recomendado" },
  { key: "recommendedChannels", label: "Canais recomendados" },
  { key: "desiredNextStep", label: "Próximo passo desejado" },
  { key: "conversionPoint", label: "Ponto de conversão" },
];

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
        {label}
      </p>
      <RichText content={value} className="text-sm leading-7 text-slate-700" />
    </div>
  );
}

function StageModal({
  stage,
  index,
  onClose,
}: {
  stage: JourneyStageData;
  index: number;
  onClose: () => void;
}) {
  const filledFields = stageFields.filter((f) => stage[f.key]?.trim());

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stage-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
            {index + 1}
          </span>
          <h3
            id="stage-modal-title"
            className="flex-1 text-xl font-semibold tracking-tight text-slate-950"
          >
            {stageTitles[index] ?? `Etapa ${index + 1}`}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar etapa"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-950"
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {filledFields.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {label}
                </p>
                <RichText
                  content={stage[key]}
                  className="text-sm leading-7 text-slate-700"
                />
              </div>
            ))}
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

export default function JornadaCompraPresentation({ data }: { data: unknown }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const d = isBuyingJourneyData(data) ? data : null;
  const stages = d?.stages ?? [];
  const turningPoints = d?.turningPoints;
  const objections = d?.objections;
  const advancementTriggers = d?.advancementTriggers?.trim() ?? "";
  const essentialContent = d?.essentialContent;
  const funnelCampaigns = d?.funnelCampaignsAutomation?.trim() ?? "";
  const references = (d?.references ?? []).filter(
    (r) => r.title?.trim() || r.link?.trim()
  );
  const overview = d?.overview?.trim() ?? "";

  const selectedStage =
    selectedIndex !== null ? (stages[selectedIndex] ?? null) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedIndex(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  const turningPointItems = turningPoints
    ? [
        { label: "Descoberta → Dor", value: turningPoints.discoveryToPain },
        { label: "Dor → Solução", value: turningPoints.painToSolution },
        { label: "Solução → Comparação", value: turningPoints.solutionToComparison },
        { label: "Comparação → Decisão", value: turningPoints.comparisonToDecision },
      ].filter((t) => t.value?.trim())
    : [];

  const objectionItems = objections
    ? [
        { label: "Início da jornada", value: objections.beginning },
        { label: "Meio da jornada", value: objections.middle },
        { label: "Final da jornada", value: objections.end },
      ].filter((o) => o.value?.trim())
    : [];

  const filledStages = stages
    .map((stage, i) => ({ stage, i }))
    .filter(({ stage }) => stageFields.some((f) => stage[f.key]?.trim()));

  return (
    <>
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        {/* Header */}
        <section className="p-8 lg:p-12">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
              <ModuleIcon slug="jornada-de-compra" size="lg" inverted />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
                Fundamentos Estratégicos
              </p>
              <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
                Jornada de Compra
              </h2>
            </div>
          </div>
        </section>

        {/* Overview */}
        {overview && (
          <section className="p-8 lg:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Visão geral
            </p>
            <RichText content={overview} className="text-base leading-8 text-slate-700" />
          </section>
        )}

        {/* Stage cards */}
        {filledStages.length > 0 && (
          <section className="p-6 lg:p-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
              Etapas da jornada
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filledStages.map(({ stage, i }) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight text-slate-950">
                      {stageTitles[i] ?? `Etapa ${i + 1}`}
                    </h3>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    {stage.thoughts && (
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Pensamentos
                        </p>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                          {stripHtml(stage.thoughts)}
                        </p>
                      </div>
                    )}
                    {stage.pains && (
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                          Dores
                        </p>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                          {stripHtml(stage.pains)}
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
                      Ver etapa completa →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Turning points */}
        {turningPointItems.length > 0 && (
          <section className="p-8 lg:p-12">
            <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
              Pontos de virada
            </h3>
            <div className="space-y-5">
              {turningPointItems.map((tp, i) => (
                <div key={i} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    {tp.label}
                  </p>
                  <RichText content={tp.value} className="text-sm leading-7 text-slate-700" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Objections */}
        {objectionItems.length > 0 && (
          <section className="p-8 lg:p-12">
            <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
              Objeções
            </h3>
            <div className="space-y-5">
              {objectionItems.map((o, i) => (
                <div key={i} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    {o.label}
                  </p>
                  <RichText content={o.value} className="text-sm leading-7 text-slate-700" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Extra fields */}
        {(advancementTriggers || essentialContent?.awareness || essentialContent?.decision || funnelCampaigns) && (
          <section className="p-8 lg:p-12">
            <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
              Complementos estratégicos
            </h3>
            <div className="space-y-6">
              {advancementTriggers && (
                <Field label="Gatilhos de avanço" value={advancementTriggers} />
              )}
              {essentialContent?.awareness && (
                <Field label="Conteúdo essencial — consciência" value={essentialContent.awareness} />
              )}
              {essentialContent?.decision && (
                <Field label="Conteúdo essencial — decisão" value={essentialContent.decision} />
              )}
              {funnelCampaigns && (
                <Field label="Funil, campanhas e automação" value={funnelCampaigns} />
              )}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section className="p-8 lg:p-12">
            <h3 className="mb-6 text-3xl font-light tracking-[-0.04em] text-slate-950">
              Referências
            </h3>
            <ul className="space-y-3">
              {references.map((ref, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <div>
                    {ref.title && (
                      <p className="text-sm font-medium text-slate-950">{ref.title}</p>
                    )}
                    {ref.link && (
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-500 hover:text-slate-950"
                      >
                        {ref.link}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!d && (
          <section className="p-8">
            <p className="text-slate-500">
              Este módulo ainda não foi preenchido no planejamento.
            </p>
          </section>
        )}
      </article>

      {mounted && selectedStage && selectedIndex !== null &&
        createPortal(
          <StageModal
            stage={selectedStage}
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />,
          document.body
        )
      }
    </>
  );
}
