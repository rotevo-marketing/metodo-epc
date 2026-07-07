import { PresentationHeader } from "./PresentationHeader";
import { RichText } from "./RichText";
import { ChannelIconList, ChannelKey, channelLabels, isUrl } from "./ChannelIconList";

type AnalysisItem = { title: string; description: string };

type ReferenceCompetitorItem = {
  image: string;
  title: string;
  channels: Record<ChannelKey, string>;
  analyses: AnalysisItem[];
};

type ReferencesCompetitorsData = { items: ReferenceCompetitorItem[] };

function isReferencesData(v: unknown): v is ReferencesCompetitorsData {
  return typeof v === "object" && v !== null && "items" in v;
}

export default function ReferenciasConcorrentesPresentation({
  data,
}: {
  data: unknown;
}) {
  const d = isReferencesData(data) ? data : null;
  const items = (d?.items ?? []).filter(
    (item) => item.title?.trim() || item.image?.trim()
  );

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Fundamentos Estratégicos"
        title="Referências e Concorrentes"
        slug="referencias-e-concorrentes"
      />

      {!d ? (
        <section className="p-8">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      ) : items.length === 0 ? (
        <section className="p-8">
          <p className="text-slate-500">
            Nenhuma referência ou concorrente foi cadastrado neste módulo ainda.
          </p>
        </section>
      ) : (
        <section className="space-y-5 p-6 lg:p-8">
          {items.map((item, i) => {
            const filledChannels = channelLabels.filter(
              (c) => item.channels?.[c.key]?.trim() && isUrl(item.channels[c.key])
            );
            const analyses = (item.analyses ?? []).filter(
              (a) => a.title?.trim() || a.description?.trim()
            );

            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl ring-1 ring-slate-200"
              >
                {/* Identificação do concorrente */}
                <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/60 p-5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || "Referência"}
                      className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400 ring-1 ring-slate-200">
                      {(item.title || "R").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Item {i + 1}
                    </span>
                    {item.title && (
                      <h3 className="mt-0.5 text-xl font-light tracking-[-0.03em] text-slate-950">
                        {item.title}
                      </h3>
                    )}
                  </div>
                </div>

                {/* Conteúdo interno editorial */}
                <div className="p-5">
                  {/* Presença nos canais */}
                  {filledChannels.length > 0 && (
                    <div className={analyses.length > 0 ? "mb-7" : ""}>
                      <p className="mb-3 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
                        Presença nos canais
                      </p>
                      <ChannelIconList channels={item.channels ?? {}} />
                    </div>
                  )}

                  {/* Análise */}
                  {analyses.length > 0 && (
                    <div>
                      <p className="mb-4 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
                        Análise
                      </p>
                      <div className="divide-y divide-slate-100">
                        {analyses.map((a, j) => (
                          <div key={j} className={j === 0 ? "pb-5" : "py-5"}>
                            {a.title && (
                              <p className="mb-2 text-[0.9375rem] font-semibold leading-snug text-slate-950">
                                {a.title}
                              </p>
                            )}
                            <RichText
                              content={a.description}
                              className="text-sm leading-[1.8] text-slate-600"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </article>
  );
}
