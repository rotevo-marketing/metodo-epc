import { ModuleIcon } from "./ModuleIcon";

type ChannelItem = { nome: string; descricao: string; link: string };
type ChannelReference = { title: string; link: string };
type CurrentChannelsData = {
  channels: ChannelItem[];
  observation: string;
  references: ChannelReference[];
};

function isCurrentChannelsData(v: unknown): v is CurrentChannelsData {
  return typeof v === "object" && v !== null && "channels" in v;
}

function getChannelIcon(channelName: string) {
  const n = channelName.toLowerCase();
  if (n.includes("facebook")) return "/icons/21-facebook.svg";
  if (n.includes("instagram")) return "/icons/18-instagram.svg";
  if (n.includes("tik")) return "/icons/19-tik-tok.svg";
  if (n.includes("youtube")) return "/icons/20-youtube.svg";
  if (n.includes("linkedin")) return "/icons/22-linkedin.svg";
  if (n.includes("whats")) return "/icons/23-whatsaap.svg";
  if (n.includes("blog")) return "/icons/24-blog.svg";
  if (n.includes("pinterest")) return "/icons/25-pinterest.svg";
  if (n.includes("podcast")) return "/icons/26-podcast.svg";
  if (n.includes("lista") || n.includes("cadastro") || n.includes("lead"))
    return "/icons/39-lista-de-cadastro.svg";
  return "/icons/29-estrategia-do-site.svg";
}

export default function CanaisDigitaisPresentation({ data }: { data: unknown }) {
  const d = isCurrentChannelsData(data) ? data : null;
  const channels = (d?.channels ?? []).filter(
    (c) => c.nome?.trim() || c.descricao?.trim()
  );
  const observation = d?.observation?.trim() ?? "";
  const references = (d?.references ?? []).filter(
    (r) => r.title?.trim() || r.link?.trim()
  );

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="canais-digitais-atuais" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Fundamentos Estratégicos
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Canais Digitais Atuais
            </h2>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          Mapeamento dos canais digitais em uso, sua função atual no projeto e
          o papel estratégico de cada plataforma.
        </p>
      </section>

      {/* Channels */}
      {channels.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Canais mapeados
          </h3>
          <div className="space-y-4">
            {channels.map((channel, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                  <img
                    src={getChannelIcon(channel.nome)}
                    alt=""
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    {channel.nome && (
                      <p className="text-sm font-semibold text-slate-950">
                        {channel.nome}
                      </p>
                    )}
                    {channel.link && (
                      <a
                        href={channel.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-400 hover:text-slate-700"
                      >
                        {channel.link}
                      </a>
                    )}
                  </div>
                  {channel.descricao && (
                    <p className="mt-1.5 text-sm leading-7 text-slate-600">
                      {channel.descricao}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Observation */}
      {observation && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Observação estratégica
          </p>
          <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
            {observation}
          </p>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-6 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Referências
          </h3>
          <ul className="space-y-3">
            {references.map((ref, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <div>
                  {ref.title && (
                    <p className="text-sm font-medium text-slate-950">
                      {ref.title}
                    </p>
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
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
