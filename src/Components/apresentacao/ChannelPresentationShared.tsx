// Shared helpers used by all channel/editorial presentation components

export type FreqItem = { format: string; quantity: string; period: string; observation: string };
export type TextItem = { value: string };
export type VisualRef = { image: string };
export type ExtRef = { title: string; link: string };

export function FrequencyTable({ items }: { items: FreqItem[] }) {
  const filled = items.filter((i) => i.quantity?.trim());
  if (!filled.length) return null;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="pb-3 text-left font-semibold text-slate-500">Formato</th>
            <th className="pb-3 text-left font-semibold text-slate-500">Frequência</th>
            <th className="pb-3 text-left font-semibold text-slate-500">Observação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filled.map((item, i) => (
            <tr key={i}>
              <td className="py-3 pr-6 font-medium text-slate-950">{item.format}</td>
              <td className="py-3 pr-6 text-slate-600">
                {item.quantity} {item.period}
              </td>
              <td className="py-3 text-slate-500">{item.observation || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TextList({ items, label }: { items: TextItem[]; label: string }) {
  const filled = items.filter((i) => i.value?.trim());
  if (!filled.length) return null;
  return (
    <div>
      <h4 className="mb-3 text-base font-semibold tracking-tight text-slate-950 md:text-lg">
        {label}
      </h4>
      <ul className="space-y-2">
        {filled.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VisualRefGrid({ refs }: { refs: VisualRef[] }) {
  const filled = refs.filter((r) => r.image?.trim());
  if (!filled.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filled.map((ref, i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200">
          <img
            src={ref.image}
            alt={`Referência ${i + 1}`}
            className="aspect-square w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function ExternalRefList({ refs, label = "Referências" }: { refs: ExtRef[]; label?: string }) {
  const filled = refs.filter((r) => r.title?.trim() || r.link?.trim());
  if (!filled.length) return null;
  return (
    <div>
      <h4 className="mb-3 text-base font-semibold tracking-tight text-slate-950 md:text-lg">
        {label}
      </h4>
      <ul className="space-y-3">
        {filled.map((ref, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <div>
              {ref.title && <p className="text-sm font-medium text-slate-950">{ref.title}</p>}
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
    </div>
  );
}

export function FieldBlock({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <p className="mb-3 text-base font-semibold uppercase tracking-[0.22em] text-slate-400">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{value}</p>
    </div>
  );
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
      <h3 className="mb-7 text-3xl font-light tracking-[-0.04em] text-slate-950">{title}</h3>
      <div className="space-y-7">{children}</div>
    </section>
  );
}

export function EmptyState() {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <p className="text-slate-500">Este módulo ainda não foi preenchido no planejamento.</p>
    </section>
  );
}

export function ModuleHeader({
  slug,
  group,
  title,
  description,
}: {
  slug: string;
  group: string;
  title: string;
  description: string;
}) {
  // Inline ModuleIcon to avoid circular deps — just renders the img
  function iconPath(s: string) {
    if (s === "funil-de-conteudo") return "/icons/16-funil-de-conteudo.svg";
    if (s === "linhas-editoriais") return "/icons/17-linhas-editoriais.svg";
    if (s.includes("instagram")) return "/icons/18-instagram.svg";
    if (s.includes("tiktok")) return "/icons/19-tik-tok.svg";
    if (s.includes("youtube")) return "/icons/20-youtube.svg";
    if (s.includes("facebook")) return "/icons/21-facebook.svg";
    if (s.includes("linkedin")) return "/icons/22-linkedin.svg";
    if (s.includes("whatsapp")) return "/icons/23-whatsaap.svg";
    if (s.includes("blog")) return "/icons/24-blog.svg";
    if (s.includes("pinterest")) return "/icons/25-pinterest.svg";
    if (s.includes("podcast")) return "/icons/26-podcast.svg";
    if (s.includes("lives")) return "/icons/27-lives.svg";
    if (s.includes("materiais")) return "/icons/28-materiais-educacionais.svg";
    if (s.includes("estrategia-do-site")) return "/icons/29-estrategia-do-site.svg";
    if (s.includes("mapa-do-site")) return "/icons/30-mapa-do-site.svg";
    return "/icons/38-orientacoes.svg";
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
          <img
            src={iconPath(slug)}
            alt=""
            className="h-10 w-10 object-contain brightness-0 invert"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">{group}</p>
          <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">{title}</h2>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{description}</p>
    </section>
  );
}
