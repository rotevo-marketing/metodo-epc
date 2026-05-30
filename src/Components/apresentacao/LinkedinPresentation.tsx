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

type LinkedInData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  contents: TextItem[];
  visualStrategy: string;
  visualReferences: VisualRef[];
  profilePhoto: string;
  profileCover: string;
  profileName: string;
  headline: string;
  authorityThemes: string;
  aboutProfile: string;
  references: ExtRef[];
};

function isLinkedInData(v: unknown): v is LinkedInData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function LinkedinPresentation({ data }: { data: unknown }) {
  const d = isLinkedInData(data) ? data : null;

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="linkedin"
        group="Estratégia Editorial e Canais"
        title="LinkedIn"
        description="Estratégia para o LinkedIn: frequência, objetivos, linguagem, conteúdos de autoridade e configuração do perfil profissional."
      />

      {d?.frequencyItems?.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={d.frequencyItems} />
        </SectionCard>
      )}

      {(d?.objectives?.some((i) => i.value?.trim()) ||
        d?.languageStructures?.some((i) => i.value?.trim()) ||
        d?.contents?.some((i) => i.value?.trim()) ||
        d?.visualStrategy) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={d?.objectives ?? []} label="Objetivos" />
          <TextList items={d?.languageStructures ?? []} label="Estruturas de linguagem" />
          <TextList items={d?.contents ?? []} label="Tipos de conteúdo" />
          <FieldBlock label="Estratégia visual" value={d?.visualStrategy ?? ""} />
        </SectionCard>
      )}

      {d?.visualReferences?.some((r) => r.image?.trim()) && (
        <SectionCard title="Referências visuais">
          <VisualRefGrid refs={d.visualReferences} />
        </SectionCard>
      )}

      {(d?.profileName || d?.headline || d?.authorityThemes || d?.aboutProfile) && (
        <SectionCard title="Configuração do perfil">
          <FieldBlock label="Nome" value={d?.profileName ?? ""} />
          <FieldBlock label="Headline" value={d?.headline ?? ""} />
          <FieldBlock label="Temas de autoridade" value={d?.authorityThemes ?? ""} />
          <FieldBlock label="Sobre" value={d?.aboutProfile ?? ""} />
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
