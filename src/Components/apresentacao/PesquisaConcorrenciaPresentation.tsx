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

const analysisFields: { key: keyof CompetitorAnalysisItem; title: string }[] = [
  { key: "positioning", title: "Posicionamento e proposta de valor" },
  { key: "targetAudience", title: "Público-alvo" },
  { key: "productAndDelivery", title: "Produto e modelo de entrega" },
  { key: "channelsAndVisibility", title: "Canais e visibilidade" },
  { key: "contentAndCommunication", title: "Conteúdo e comunicação" },
  { key: "funnelAndConversion", title: "Funil de captação e conversão" },
  { key: "strengths", title: "Pontos fortes" },
  { key: "opportunities", title: "Lacunas que o projeto ocupa" },
];

export default function PesquisaConcorrenciaPresentation({
  data,
}: {
  data: unknown;
}) {
  const d = isCompetitorResearchData(data) ? data : null;
  const competitors = (d?.competitors ?? []).filter(
    (c) => c.name?.trim() || c.image?.trim()
  );

  return (
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
              Pesquisa de Concorrência
            </h2>
          </div>
        </div>
      </section>

      {/* Competitors */}
      {competitors.map((comp, i) => {
        const filledFields = analysisFields.filter(
          (f) => comp[f.key]?.trim()
        );

        return (
          <section
            key={i}
            className="p-8 lg:p-12"
          >
            {/* Competitor header */}
            <div className="flex items-center gap-5">
              {comp.image ? (
                <img
                  src={comp.image}
                  alt={comp.name || "Concorrente"}
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400 ring-1 ring-slate-200">
                  {(comp.name || "C").charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Concorrente {i + 1}
                </span>
                {comp.name && (
                  <h3 className="mt-1 text-2xl font-light tracking-[-0.03em] text-slate-950">
                    {comp.name}
                  </h3>
                )}
                {comp.website && (
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-700"
                  >
                    {comp.website}
                  </a>
                )}
              </div>
            </div>

            {/* Analysis fields */}
            {filledFields.length > 0 && (
              <div className="mt-8 space-y-6">
                {filledFields.map((f) => (
                  <div key={f.key}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {f.title}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {comp[f.key]}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}

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
