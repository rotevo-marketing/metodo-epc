import {
  ExternalRefList,
  FieldBlock,
  ModuleHeader,
  EmptyState,
  SectionCard,
} from "./ChannelPresentationShared";

type ContentFunnelStageData = {
  strategy: string;
  objective: string;
  nextStep: string;
  themes: string;
  recommendedFormat: string;
  ctas: string;
};

type ContentFunnelData = {
  stages: ContentFunnelStageData[];
  overview: string;
  distribution: { attraction: string; connection: string; bonding: string; sales: string };
  metrics: { attraction: string; connection: string; bonding: string; sales: string };
  references: { title: string; link: string }[];
};

function isFunnelData(v: unknown): v is ContentFunnelData {
  return typeof v === "object" && v !== null && "stages" in v;
}

const stageTitles = [
  { title: "Conteúdos de atração", sub: "Usuário vira seguidor" },
  { title: "Conteúdos de conexão", sub: "Seguidor vira fã" },
  { title: "Conteúdos de vinculação", sub: "Fã vira lead" },
  { title: "Conteúdos de venda", sub: "Lead vira cliente" },
];

const stageFields: { key: keyof ContentFunnelStageData; label: string }[] = [
  { key: "strategy", label: "Estratégia" },
  { key: "objective", label: "Objetivo" },
  { key: "nextStep", label: "Próximo passo" },
  { key: "themes", label: "Temas" },
  { key: "recommendedFormat", label: "Formatos recomendados" },
  { key: "ctas", label: "CTAs" },
];

const funnelColors = [
  "bg-blue-50 ring-blue-200 text-blue-700",
  "bg-violet-50 ring-violet-200 text-violet-700",
  "bg-amber-50 ring-amber-200 text-amber-700",
  "bg-emerald-50 ring-emerald-200 text-emerald-700",
];

export default function FunilConteudoPresentation({ data }: { data: unknown }) {
  const d = isFunnelData(data) ? data : null;
  const stages = d?.stages ?? [];
  const overview = d?.overview?.trim() ?? "";
  const dist = d?.distribution;
  const metrics = d?.metrics;
  const references = d?.references ?? [];

  const distItems = dist
    ? [
        { label: "Atração", value: dist.attraction },
        { label: "Conexão", value: dist.connection },
        { label: "Vinculação", value: dist.bonding },
        { label: "Venda", value: dist.sales },
      ].filter((i) => i.value?.trim())
    : [];

  const metricsItems = metrics
    ? [
        { label: "Atração", value: metrics.attraction },
        { label: "Conexão", value: metrics.connection },
        { label: "Vinculação", value: metrics.bonding },
        { label: "Venda", value: metrics.sales },
      ].filter((i) => i.value?.trim())
    : [];

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="funil-de-conteudo"
        group="Estratégia Editorial"
        title="Funil de Conteúdo"
        description="A estrutura estratégica que organiza o conteúdo por etapa do relacionamento: atração, conexão, vinculação e venda."
      />

      {overview && (
        <section className="p-8 lg:p-12">
          <FieldBlock label="Visão geral" value={overview} />
        </section>
      )}

      {stages.map((stage, i) => {
        const meta = stageTitles[i];
        const filledFields = stageFields.filter((f) => stage[f.key]?.trim());
        if (!filledFields.length) return null;
        return (
          <section
            key={i}
            className="p-8 lg:p-12"
          >
            <div className={`mb-6 inline-flex rounded-2xl px-4 py-2 ring-1 ${funnelColors[i] ?? "bg-slate-50 ring-slate-200 text-slate-700"}`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em]">{meta?.title ?? `Etapa ${i + 1}`}</p>
                {meta?.sub && <p className="text-xs opacity-70">{meta.sub}</p>}
              </div>
            </div>
            <div className="space-y-6">
              {filledFields.map((f) => (
                <FieldBlock key={f.key} label={f.label} value={stage[f.key]} />
              ))}
            </div>
          </section>
        );
      })}

      {(distItems.length > 0 || metricsItems.length > 0) && (
        <SectionCard title="Distribuição e métricas">
          {distItems.length > 0 && (
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Distribuição por etapa
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {distItems.map((item, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="mb-1 text-xs font-bold text-slate-500">{item.label}</p>
                    <p className="text-sm text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {metricsItems.length > 0 && (
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Métricas por etapa
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {metricsItems.map((item, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="mb-1 text-xs font-bold text-slate-500">{item.label}</p>
                    <p className="text-sm text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ExternalRefList refs={references} />
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
