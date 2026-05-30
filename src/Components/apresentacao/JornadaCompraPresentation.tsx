import { ModuleIcon } from "./ModuleIcon";

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

function Field({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
        {value}
      </p>
    </div>
  );
}

export default function JornadaCompraPresentation({ data }: { data: unknown }) {
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

  return (
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
          <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
            {overview}
          </p>
        </section>
      )}

      {/* Stages */}
      {stages.map((stage, i) => {
        const filledFields = stageFields.filter(
          (f) => stage[f.key]?.trim()
        );
        if (filledFields.length === 0) return null;

        return (
          <section
            key={i}
            className="p-8 lg:p-12"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-2xl font-light tracking-[-0.03em] text-slate-950">
                {stageTitles[i] ?? `Etapa ${i + 1}`}
              </h3>
            </div>
            <div className="space-y-5">
              {filledFields.map((f) => (
                <Field key={f.key} label={f.label} value={stage[f.key]} />
              ))}
            </div>
          </section>
        );
      })}

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
                <p className="text-sm leading-7 text-slate-700">{tp.value}</p>
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
                <p className="text-sm leading-7 text-slate-700">{o.value}</p>
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
  );
}
