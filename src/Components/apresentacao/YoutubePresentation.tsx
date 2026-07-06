import { PresentationHeader } from "./PresentationHeader";
import {
  FrequencyTable,
  TextList,
  VisualRefGrid,
  ExternalRefList,
  FieldBlock,
  SectionCard,
  EmptyState,
  FreqItem,
  TextItem,
  VisualRef,
  ExtRef,
} from "./ChannelPresentationShared";

type YoutubeData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  editingStyle: string;
  visualReferences: VisualRef[];
  seoStrategies: TextItem[];
  contents: TextItem[];
  channelPhoto: string;
  channelCover: string;
  channelName: string;
  channelCategory: string;
  channelDescription: string;
  suggestedPlaylists: string;
  references: ExtRef[];
};

function isYoutubeData(v: unknown): v is YoutubeData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function YoutubePresentation({ data }: { data: unknown }) {
  const d = isYoutubeData(data) ? data : null;

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Estratégia Editorial e Distribuição de Conteúdo"
        title="YouTube"
        slug="youtube"
      />

      {d?.frequencyItems?.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={d.frequencyItems} />
        </SectionCard>
      )}

      {(d?.objectives?.some((i) => i.value?.trim()) ||
        d?.languageStructures?.some((i) => i.value?.trim()) ||
        d?.contents?.some((i) => i.value?.trim()) ||
        d?.seoStrategies?.some((i) => i.value?.trim()) ||
        d?.editingStyle) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={d?.objectives ?? []} label="Objetivos" />
          <TextList items={d?.languageStructures ?? []} label="Estruturas de linguagem" />
          <TextList items={d?.contents ?? []} label="Tipos de conteúdo" />
          <TextList items={d?.seoStrategies ?? []} label="Estratégias de SEO" />
          <FieldBlock label="Estilo de edição" value={d?.editingStyle ?? ""} />
        </SectionCard>
      )}

      {d?.visualReferences?.some((r) => r.image?.trim()) && (
        <SectionCard title="Referências visuais">
          <VisualRefGrid refs={d.visualReferences} />
        </SectionCard>
      )}

      {(d?.channelName || d?.channelCategory || d?.channelDescription || d?.suggestedPlaylists) && (
        <SectionCard title="Configuração do canal">
          <FieldBlock label="Nome do canal" value={d?.channelName ?? ""} />
          <FieldBlock label="Categoria" value={d?.channelCategory ?? ""} />
          <FieldBlock label="Descrição" value={d?.channelDescription ?? ""} />
          <FieldBlock label="Playlists sugeridas" value={d?.suggestedPlaylists ?? ""} />
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
