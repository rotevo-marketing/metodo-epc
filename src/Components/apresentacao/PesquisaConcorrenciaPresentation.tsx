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

                {/* Card footer — botão será conectado ao modal na próxima etapa */}
                <div className="border-t border-slate-100 p-5">
                  <button
                    type="button"
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
  );
}
