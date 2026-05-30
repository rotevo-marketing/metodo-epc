import {
  ExternalRefList,
  FieldBlock,
  ModuleHeader,
  EmptyState,
  SectionCard,
} from "./ChannelPresentationShared";

type EditorialLineItem = {
  title: string;
  objective: string;
  description: string;
  targetAudience: string;
  contentPillars: string;
  formats: string;
  frequency: string;
  examples: string;
  notes: string;
};

type EditorialLinesData = {
  lines: EditorialLineItem[];
  generalGuidelines: string;
  references: { title: string; link: string }[];
};

function isEditorialLinesData(v: unknown): v is EditorialLinesData {
  return typeof v === "object" && v !== null && "lines" in v;
}

const lineFields: { key: keyof EditorialLineItem; label: string }[] = [
  { key: "objective", label: "Objetivo" },
  { key: "description", label: "Descrição" },
  { key: "targetAudience", label: "Público-alvo" },
  { key: "contentPillars", label: "Pilares de conteúdo" },
  { key: "formats", label: "Formatos" },
  { key: "frequency", label: "Frequência" },
  { key: "examples", label: "Exemplos" },
  { key: "notes", label: "Observações" },
];

export default function LinhasEditoriaisPresentation({ data }: { data: unknown }) {
  const d = isEditorialLinesData(data) ? data : null;
  const lines = (d?.lines ?? []).filter(
    (l) => l.title?.trim() || l.description?.trim() || l.objective?.trim()
  );
  const generalGuidelines = d?.generalGuidelines?.trim() ?? "";
  const references = d?.references ?? [];

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="linhas-editoriais"
        group="Estratégia Editorial"
        title="Linhas Editoriais"
        description="As grandes linhas temáticas que organizam e dão identidade ao conteúdo do projeto, cada uma com objetivo, público, formatos e frequência específicos."
      />

      {lines.map((line, i) => {
        const filledFields = lineFields.filter((f) => line[f.key]?.trim());
        return (
          <section
            key={i}
            className="p-8 lg:p-12"
          >
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Linha {i + 1}
              </span>
              <h3 className="mt-1 text-2xl font-light tracking-[-0.03em] text-slate-950">
                {line.title || `Linha Editorial ${i + 1}`}
              </h3>
            </div>
            {filledFields.length > 0 ? (
              <div className="space-y-6">
                {filledFields.map((f) => (
                  <FieldBlock key={f.key} label={f.label} value={line[f.key]} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Sem detalhes preenchidos.</p>
            )}
          </section>
        );
      })}

      {(generalGuidelines || references.length > 0) && (
        <SectionCard title="Diretrizes gerais">
          {generalGuidelines && (
            <FieldBlock label="Orientações gerais" value={generalGuidelines} />
          )}
          <ExternalRefList refs={references} />
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
