import {
  FrequencyTable,
  TextList,
  VisualRefGrid,
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
  FreqItem,
  TextItem,
  VisualRef,
  ExtRef,
} from "./ChannelPresentationShared";

type BlogContentItem = { title: string; suggestedDate: string; observation: string };

type BlogData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  visualStrategy: string;
  visualReferences: VisualRef[];
  priorityKeywords: string;
  blogCategories: string;
  seoGuidelines: string;
  contents: BlogContentItem[];
  references: ExtRef[];
};

function isBlogData(v: unknown): v is BlogData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function BlogPresentation({ data }: { data: unknown }) {
  const d = isBlogData(data) ? data : null;
  const filledContents = (d?.contents ?? []).filter((c) => c.title?.trim());

  return (
    <article className="space-y-6">
      <ModuleHeader
        slug="blog"
        group="Estratégia Editorial e Canais"
        title="Blog"
        description="Estratégia para o blog: frequência, objetivos, SEO, palavras-chave e pauta de artigos."
      />

      {d?.frequencyItems?.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={d.frequencyItems} />
        </SectionCard>
      )}

      {(d?.objectives?.some((i) => i.value?.trim()) ||
        d?.languageStructures?.some((i) => i.value?.trim()) ||
        d?.visualStrategy) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={d?.objectives ?? []} label="Objetivos" />
          <TextList items={d?.languageStructures ?? []} label="Estruturas de linguagem" />
          <FieldBlock label="Estratégia visual" value={d?.visualStrategy ?? ""} />
        </SectionCard>
      )}

      {(d?.priorityKeywords || d?.blogCategories || d?.seoGuidelines) && (
        <SectionCard title="SEO e palavras-chave">
          <FieldBlock label="Palavras-chave prioritárias" value={d?.priorityKeywords ?? ""} />
          <FieldBlock label="Categorias do blog" value={d?.blogCategories ?? ""} />
          <FieldBlock label="Diretrizes de SEO" value={d?.seoGuidelines ?? ""} />
        </SectionCard>
      )}

      {filledContents.length > 0 && (
        <SectionCard title="Pauta de artigos">
          <div className="space-y-3">
            {filledContents.map((item, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                {item.suggestedDate && (
                  <p className="mt-1 text-xs text-slate-400">Data sugerida: {item.suggestedDate}</p>
                )}
                {item.observation && (
                  <p className="mt-1.5 text-sm text-slate-600">{item.observation}</p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {d?.visualReferences?.some((r) => r.image?.trim()) && (
        <SectionCard title="Referências visuais">
          <VisualRefGrid refs={d.visualReferences} />
        </SectionCard>
      )}

      {d?.references?.some((r) => r.title?.trim() || r.link?.trim()) && (
        <SectionCard title="Referências externas">
          <ExternalRefList refs={d.references} />
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
