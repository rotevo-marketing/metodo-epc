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

type TikTokData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  contents: TextItem[];
  mainFormats: string;
  contentSeries: string;
  visualStrategy: string;
  visualReferences: VisualRef[];
  openingHooks: string;
  retentionResources: string;
  references: ExtRef[];
};

function isTikTokData(v: unknown): v is TikTokData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function TiktokPresentation({ data }: { data: unknown }) {
  const d = isTikTokData(data) ? data : null;

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="tiktok"
        group="Estratégia Editorial e Canais"
        title="TikTok"
        description="Estratégia para o TikTok: frequência, objetivos, linguagem, formatos, hooks de abertura e recursos de retenção."
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

      {(d?.mainFormats || d?.contentSeries || d?.openingHooks || d?.retentionResources || d?.visualStrategy) && (
        <SectionCard title="Estratégia de conteúdo">
          <FieldBlock label="Formatos principais" value={d?.mainFormats ?? ""} />
          <FieldBlock label="Séries de conteúdo" value={d?.contentSeries ?? ""} />
          <FieldBlock label="Hooks de abertura" value={d?.openingHooks ?? ""} />
          <FieldBlock label="Recursos de retenção" value={d?.retentionResources ?? ""} />
          <FieldBlock label="Estratégia visual" value={d?.visualStrategy ?? ""} />
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
