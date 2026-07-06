import { PresentationHeader } from "./PresentationHeader";
import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  EmptyState,
} from "./ChannelPresentationShared";

type Indicator = {
  name: string;
  type: string;
  channel: string;
  goal: string;
  frequency: string;
  tool: string;
  responsible: string;
  interpretation: string;
  decisionCriteria: string;
};

type JourneyMetric = { stage: string; metrics: string; purpose: string };
type ChannelMetric = { channel: string; metrics: string; tool: string };
type ToolItem = { name: string; purpose: string };

type MetricsData = {
  indicators: Indicator[];
  mainIndicators: string;
  journeyMetrics: JourneyMetric[];
  channelMetrics: ChannelMetric[];
  tools: ToolItem[];
  analysisRoutine: string;
  decisionCriteria: string;
  reportingFormat: string;
  strategicObservations: string;
  references: { title: string; link: string }[];
};

function isMetricsData(v: unknown): v is MetricsData {
  return typeof v === "object" && v !== null && "indicators" in v;
}

const typeColors: Record<string, string> = {
  Primário: "bg-indigo-100 text-indigo-700",
  Secundário: "bg-slate-100 text-slate-600",
  "De vaidade": "bg-slate-100 text-slate-600",
};

export default function MetricasIndicadoresPresentation({ data }: { data: unknown }) {
  const d = isMetricsData(data) ? data : null;
  const filledIndicators = (d?.indicators ?? []).filter((i) => i.name?.trim());
  const filledJourneyMetrics = (d?.journeyMetrics ?? []).filter((m) => m.stage?.trim());
  const filledChannelMetrics = (d?.channelMetrics ?? []).filter((m) => m.channel?.trim());
  const filledTools = (d?.tools ?? []).filter((t) => t.name?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Execução, Acompanhamento e Gestão"
        title="Métricas e Indicadores"
        slug="metricas-e-indicadores"
      />

      {d?.mainIndicators && (
        <SectionCard title="Indicadores principais">
          <FieldBlock label="Indicadores-chave" value={d.mainIndicators} />
        </SectionCard>
      )}

      {filledIndicators.length > 0 && (
        <SectionCard title="Indicadores detalhados">
          <div className="space-y-4">
            {filledIndicators.map((ind, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  {ind.type && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        typeColors[ind.type] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {ind.type}
                    </span>
                  )}
                  {ind.channel && (
                    <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      {ind.channel}
                    </span>
                  )}
                  <h3 className="text-sm font-semibold text-slate-950">{ind.name}</h3>
                  {ind.frequency && (
                    <span className="ml-auto text-xs text-slate-400">{ind.frequency}</span>
                  )}
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {ind.goal && (
                    <div>
                      <p className="text-xs font-semibold text-slate-400">Meta</p>
                      <p className="mt-0.5 text-xs text-slate-600">{ind.goal}</p>
                    </div>
                  )}
                  {ind.tool && (
                    <div>
                      <p className="text-xs font-semibold text-slate-400">Ferramenta</p>
                      <p className="mt-0.5 text-xs text-slate-600">{ind.tool}</p>
                    </div>
                  )}
                  {ind.responsible && (
                    <div>
                      <p className="text-xs font-semibold text-slate-400">Responsável</p>
                      <p className="mt-0.5 text-xs text-slate-600">{ind.responsible}</p>
                    </div>
                  )}
                </div>

                {(ind.interpretation || ind.decisionCriteria) && (
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {ind.interpretation && (
                      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                        <p className="text-xs font-semibold text-slate-400">Interpretação</p>
                        <p className="mt-1 text-xs text-slate-600">{ind.interpretation}</p>
                      </div>
                    )}
                    {ind.decisionCriteria && (
                      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                        <p className="text-xs font-semibold text-slate-400">Critério de decisão</p>
                        <p className="mt-1 text-xs text-slate-600">{ind.decisionCriteria}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {filledJourneyMetrics.length > 0 && (
        <SectionCard title="Métricas por jornada">
          <div className="space-y-2">
            {filledJourneyMetrics.map((m, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <p className="text-xs font-semibold text-indigo-600">{m.stage}</p>
                {m.metrics && (
                  <p className="mt-1 text-sm text-slate-700">{m.metrics}</p>
                )}
                {m.purpose && (
                  <p className="mt-1 text-xs text-slate-500">{m.purpose}</p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {filledChannelMetrics.length > 0 && (
        <SectionCard title="Métricas por canal">
          <div className="space-y-2">
            {filledChannelMetrics.map((m, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-950">{m.channel}</span>
                  {m.tool && (
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {m.tool}
                    </span>
                  )}
                </div>
                {m.metrics && (
                  <p className="mt-1 text-xs text-slate-600">{m.metrics}</p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {filledTools.length > 0 && (
        <SectionCard title="Ferramentas de análise">
          <div className="space-y-2">
            {filledTools.map((t, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-950">{t.name}</p>
                {t.purpose && (
                  <p className="mt-0.5 text-xs text-slate-500">{t.purpose}</p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {(d?.analysisRoutine || d?.decisionCriteria || d?.reportingFormat) && (
        <SectionCard title="Rotina e formato de análise">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Rotina de análise" value={d?.analysisRoutine ?? ""} />
            <FieldBlock label="Critério de decisão" value={d?.decisionCriteria ?? ""} />
          </div>
          {d?.reportingFormat && (
            <div className="mt-4">
              <FieldBlock label="Formato de relatório" value={d.reportingFormat} />
            </div>
          )}
        </SectionCard>
      )}

      {d?.strategicObservations && (
        <SectionCard title="Observações estratégicas">
          <FieldBlock label="Observações" value={d.strategicObservations} />
        </SectionCard>
      )}

      {d?.references?.some((r) => r.title?.trim() || r.link?.trim()) && (
        <SectionCard title="Referências externas">
          <ExternalRefList refs={d.references} />
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
