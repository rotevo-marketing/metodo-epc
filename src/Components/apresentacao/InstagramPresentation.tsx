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

type InstagramData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  stories: TextItem[];
  hashtags: TextItem[];
  reels: TextItem[];
  languageStructures: TextItem[];
  contents: TextItem[];
  visualStrategy: string;
  visualReferences: VisualRef[];
  bioEnabled: boolean;
  bioPhoto: string;
  profileHandle: string;
  profileName: string;
  bioText: string;
  bioLink: string;
  highlights: string;
  references: ExtRef[];
};

function isInstagramData(v: unknown): v is InstagramData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function InstagramPresentation({ data }: { data: unknown }) {
  const d = isInstagramData(data) ? data : null;

  return (
    <article className="space-y-6">
      <ModuleHeader
        slug="instagram"
        group="Estratégia Editorial e Canais"
        title="Instagram"
        description="Estratégia completa para o Instagram: frequência de publicação, objetivos, linguagem, conteúdos, referências visuais e configuração do perfil."
      />

      {d?.frequencyItems?.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={d.frequencyItems} />
        </SectionCard>
      )}

      {(d?.objectives?.some((i) => i.value?.trim()) ||
        d?.languageStructures?.some((i) => i.value?.trim()) ||
        d?.contents?.some((i) => i.value?.trim()) ||
        d?.stories?.some((i) => i.value?.trim()) ||
        d?.reels?.some((i) => i.value?.trim()) ||
        d?.hashtags?.some((i) => i.value?.trim())) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={d?.objectives ?? []} label="Objetivos" />
          <TextList items={d?.languageStructures ?? []} label="Estruturas de linguagem" />
          <TextList items={d?.contents ?? []} label="Tipos de conteúdo" />
          <TextList items={d?.stories ?? []} label="Stories" />
          <TextList items={d?.reels ?? []} label="Reels" />
          <TextList items={d?.hashtags ?? []} label="Hashtags" />
          <FieldBlock label="Estratégia visual" value={d?.visualStrategy ?? ""} />
        </SectionCard>
      )}

      {d?.visualReferences?.some((r) => r.image?.trim()) && (
        <SectionCard title="Referências visuais">
          <VisualRefGrid refs={d.visualReferences} />
        </SectionCard>
      )}

      {(d?.profileHandle || d?.profileName || d?.bioText || d?.bioLink || d?.highlights) && (
        <SectionCard title="Perfil">
          <FieldBlock label="Handle" value={d?.profileHandle ?? ""} />
          <FieldBlock label="Nome do perfil" value={d?.profileName ?? ""} />
          <FieldBlock label="Bio" value={d?.bioText ?? ""} />
          <FieldBlock label="Link na bio" value={d?.bioLink ?? ""} />
          <FieldBlock label="Destaques" value={d?.highlights ?? ""} />
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
