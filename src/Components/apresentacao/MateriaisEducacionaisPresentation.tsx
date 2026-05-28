import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
  ExtRef,
} from "./ChannelPresentationShared";

type EducationalMaterial = {
  title: string;
  type: string;
  content: string;
  objective: string;
  distribution: string;
  fileName: string;
  fileData: string;
  materialLink: string;
};

type EducationalMaterialsData = {
  materials: EducationalMaterial[];
  strategy: string;
  references: { title: string; link: string }[];
};

function isEducationalMaterialsData(v: unknown): v is EducationalMaterialsData {
  return typeof v === "object" && v !== null && "materials" in v;
}

export default function MateriaisEducacionaisPresentation({ data }: { data: unknown }) {
  const d = isEducationalMaterialsData(data) ? data : null;
  const filledMaterials = (d?.materials ?? []).filter((m) => m.title?.trim());

  return (
    <article className="space-y-6">
      <ModuleHeader
        slug="materiais-educacionais"
        group="Estratégia Editorial e Canais"
        title="Materiais Educacionais"
        description="Estratégia para materiais educacionais: e-books, guias, templates e outros conteúdos de valor."
      />

      {d?.strategy && (
        <SectionCard title="Estratégia geral">
          <FieldBlock label="Estratégia" value={d.strategy} />
        </SectionCard>
      )}

      {filledMaterials.length > 0 && (
        <SectionCard title="Materiais">
          <div className="space-y-4">
            {filledMaterials.map((item, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  {item.type && (
                    <span className="shrink-0 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      {item.type}
                    </span>
                  )}
                </div>
                {item.objective && (
                  <p className="mt-1.5 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Objetivo:</span> {item.objective}
                  </p>
                )}
                {item.content && (
                  <p className="mt-1 text-sm text-slate-600">{item.content}</p>
                )}
                {item.distribution && (
                  <p className="mt-1.5 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Distribuição:</span> {item.distribution}
                  </p>
                )}
                {item.materialLink && (
                  <a
                    href={item.materialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Acessar material →
                  </a>
                )}
              </div>
            ))}
          </div>
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
