import { ModuleIcon } from "./ModuleIcon";

type ChannelKey =
  | "site" | "instagram" | "tiktok" | "youtube" | "facebook"
  | "linkedin" | "whatsapp" | "blog" | "pinterest" | "podcast";

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

const channelLabels: { key: ChannelKey; label: string; icon: string }[] = [
  { key: "site", label: "Site", icon: "/icons/29-estrategia-do-site.svg" },
  { key: "instagram", label: "Instagram", icon: "/icons/18-instagram.svg" },
  { key: "tiktok", label: "TikTok", icon: "/icons/19-tik-tok.svg" },
  { key: "youtube", label: "YouTube", icon: "/icons/20-youtube.svg" },
  { key: "facebook", label: "Facebook", icon: "/icons/21-facebook.svg" },
  { key: "linkedin", label: "LinkedIn", icon: "/icons/22-linkedin.svg" },
  { key: "whatsapp", label: "WhatsApp", icon: "/icons/23-whatsaap.svg" },
  { key: "blog", label: "Blog", icon: "/icons/24-blog.svg" },
  { key: "pinterest", label: "Pinterest", icon: "/icons/25-pinterest.svg" },
  { key: "podcast", label: "Podcast", icon: "/icons/26-podcast.svg" },
];

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
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="referencias-e-concorrentes" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Fundamentos Estratégicos
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Referências e Concorrentes
            </h2>
          </div>
        </div>
      </section>

      {/* Items */}
      {items.map((item, i) => {
        const filledChannels = channelLabels.filter(
          (c) => item.channels?.[c.key]?.trim()
        );
        const analyses = (item.analyses ?? []).filter(
          (a) => a.title?.trim() || a.description?.trim()
        );

        return (
          <section
            key={i}
            className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12"
          >
            {/* Item header */}
            <div className="flex items-center gap-5">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title || "Referência"}
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400 ring-1 ring-slate-200">
                  {(item.title || "R").charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Item {i + 1}
                </span>
                {item.title && (
                  <h3 className="mt-1 text-2xl font-light tracking-[-0.03em] text-slate-950">
                    {item.title}
                  </h3>
                )}
              </div>
            </div>

            {/* Channels */}
            {filledChannels.length > 0 && (
              <div className="mt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Presença nos canais
                </p>
                <div className="space-y-3">
                  {filledChannels.map((ch) => (
                    <div key={ch.key} className="flex items-start gap-3">
                      <img
                        src={ch.icon}
                        alt={ch.label}
                        className="mt-0.5 h-4 w-4 shrink-0 object-contain opacity-50"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-500">
                          {ch.label}
                        </span>
                        <p className="text-sm leading-6 text-slate-700">
                          {item.channels[ch.key]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analyses */}
            {analyses.length > 0 && (
              <div className="mt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Análises
                </p>
                <div className="space-y-3">
                  {analyses.map((a, j) => (
                    <div
                      key={j}
                      className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
                    >
                      {a.title && (
                        <p className="text-sm font-semibold text-slate-950">
                          {a.title}
                        </p>
                      )}
                      {a.description && (
                        <p className="mt-1.5 text-sm leading-7 text-slate-600">
                          {a.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}

      {!d && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
