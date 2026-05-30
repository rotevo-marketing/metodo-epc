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

type FacebookData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  contents: TextItem[];
  visualStrategy: string;
  visualReferences: VisualRef[];
  pagePhoto: string;
  pageCover: string;
  pageName: string;
  pageCategory: string;
  pageDescription: string;
  siteLink: string;
  contactLink: string;
  serviceRegion: string;
  otherLinks: string;
  references: ExtRef[];
};

function isFacebookData(v: unknown): v is FacebookData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function FacebookPresentation({ data }: { data: unknown }) {
  const d = isFacebookData(data) ? data : null;

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="facebook"
        group="Estratégia Editorial e Canais"
        title="Facebook"
        description="Estratégia para o Facebook: frequência, objetivos, linguagem, conteúdos e configuração da página."
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

      {(d?.pageName || d?.pageCategory || d?.pageDescription || d?.siteLink || d?.contactLink || d?.serviceRegion || d?.otherLinks) && (
        <SectionCard title="Configuração da página">
          <FieldBlock label="Nome da página" value={d?.pageName ?? ""} />
          <FieldBlock label="Categoria" value={d?.pageCategory ?? ""} />
          <FieldBlock label="Descrição" value={d?.pageDescription ?? ""} />
          <FieldBlock label="Link do site" value={d?.siteLink ?? ""} />
          <FieldBlock label="Link de contato" value={d?.contactLink ?? ""} />
          <FieldBlock label="Região de atendimento" value={d?.serviceRegion ?? ""} />
          <FieldBlock label="Outros links" value={d?.otherLinks ?? ""} />
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
