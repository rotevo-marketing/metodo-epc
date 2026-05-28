import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
  ExtRef,
} from "./ChannelPresentationShared";

type SiteMapPageItem = {
  title: string;
  type: string;
  objective: string;
  description: string;
  requiredSections: string;
  mainCta: string;
  priority: string;
};

type SiteMapData = {
  pages: SiteMapPageItem[];
  strategicNotes: string;
  references: { title: string; link: string }[];
};

function isSiteMapData(v: unknown): v is SiteMapData {
  return typeof v === "object" && v !== null && "pages" in v;
}

const priorityColors: Record<string, string> = {
  Alta: "bg-red-100 text-red-700",
  Média: "bg-amber-100 text-amber-700",
  Baixa: "bg-slate-100 text-slate-600",
};

export default function MapaSitePresentation({ data }: { data: unknown }) {
  const d = isSiteMapData(data) ? data : null;
  const filledPages = (d?.pages ?? []).filter((p) => p.title?.trim());

  return (
    <article className="space-y-6">
      <ModuleHeader
        slug="mapa-site"
        group="Estratégia Editorial e Canais"
        title="Mapa do Site"
        description="Mapeamento das páginas do site: tipo, objetivo, seções e CTA de cada página."
      />

      {filledPages.length > 0 && (
        <SectionCard title="Páginas do site">
          <div className="space-y-4">
            {filledPages.map((page, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-950">{page.title}</p>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {page.type && (
                      <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                        {page.type}
                      </span>
                    )}
                    {page.priority && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          priorityColors[page.priority] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {page.priority}
                      </span>
                    )}
                  </div>
                </div>
                {page.objective && (
                  <p className="mt-1.5 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Objetivo:</span> {page.objective}
                  </p>
                )}
                {page.description && (
                  <p className="mt-1 text-sm text-slate-600">{page.description}</p>
                )}
                {page.requiredSections && (
                  <p className="mt-1.5 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Seções obrigatórias:</span> {page.requiredSections}
                  </p>
                )}
                {page.mainCta && (
                  <p className="mt-1 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">CTA principal:</span> {page.mainCta}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {d?.strategicNotes && (
        <SectionCard title="Observações estratégicas">
          <FieldBlock label="Observações" value={d.strategicNotes} />
        </SectionCard>
      )}

      {d?.references?.some((r: ExtRef) => r.title?.trim() || r.link?.trim()) && (
        <SectionCard title="Referências externas">
          <ExternalRefList refs={d.references} />
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
