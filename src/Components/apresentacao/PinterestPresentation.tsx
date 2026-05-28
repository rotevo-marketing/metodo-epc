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

type PinterestData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  contents: TextItem[];
  mainBoards: string;
  priorityVisualThemes: string;
  visualStrategy: string;
  visualReferences: VisualRef[];
  pinKeywords: string;
  destinationLinks: string;
  descriptionGuidelines: string;
  references: ExtRef[];
};

function isPinterestData(v: unknown): v is PinterestData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function PinterestPresentation({ data }: { data: unknown }) {
  const d = isPinterestData(data) ? data : null;

  return (
    <article className="space-y-6">
      <ModuleHeader
        slug="pinterest"
        group="Estratégia Editorial e Canais"
        title="Pinterest"
        description="Estratégia para o Pinterest: frequência, pastas, temas visuais, palavras-chave e links de destino."
      />

      {d?.frequencyItems?.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={d.frequencyItems} />
        </SectionCard>
      )}

      {(d?.objectives?.some((i) => i.value?.trim()) ||
        d?.languageStructures?.some((i) => i.value?.trim()) ||
        d?.contents?.some((i) => i.value?.trim())) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={d?.objectives ?? []} label="Objetivos" />
          <TextList items={d?.languageStructures ?? []} label="Estruturas de linguagem" />
          <TextList items={d?.contents ?? []} label="Tipos de conteúdo" />
        </SectionCard>
      )}

      {(d?.mainBoards || d?.priorityVisualThemes || d?.visualStrategy || d?.pinKeywords || d?.destinationLinks || d?.descriptionGuidelines) && (
        <SectionCard title="Estratégia do canal">
          <FieldBlock label="Pastas principais" value={d?.mainBoards ?? ""} />
          <FieldBlock label="Temas visuais prioritários" value={d?.priorityVisualThemes ?? ""} />
          <FieldBlock label="Estratégia visual" value={d?.visualStrategy ?? ""} />
          <FieldBlock label="Palavras-chave dos pins" value={d?.pinKeywords ?? ""} />
          <FieldBlock label="Links de destino" value={d?.destinationLinks ?? ""} />
          <FieldBlock label="Diretrizes de descrição" value={d?.descriptionGuidelines ?? ""} />
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
