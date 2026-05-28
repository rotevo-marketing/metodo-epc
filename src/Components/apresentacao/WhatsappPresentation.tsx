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

type WhatsAppData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  contents: TextItem[];
  firstContactFlow: string;
  nurtureFlow: string;
  salesFlow: string;
  postSaleFlow: string;
  visualStrategy: string;
  visualReferences: VisualRef[];
  mainNumber: string;
  directLink: string;
  initialMessage: string;
  serviceNotes: string;
  references: ExtRef[];
};

function isWhatsAppData(v: unknown): v is WhatsAppData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function WhatsappPresentation({ data }: { data: unknown }) {
  const d = isWhatsAppData(data) ? data : null;

  return (
    <article className="space-y-6">
      <ModuleHeader
        slug="whatsapp"
        group="Estratégia Editorial e Canais"
        title="WhatsApp"
        description="Estratégia para o WhatsApp: frequência, objetivos, fluxos de relacionamento e configuração do canal de atendimento."
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

      {(d?.firstContactFlow || d?.nurtureFlow || d?.salesFlow || d?.postSaleFlow) && (
        <SectionCard title="Fluxos de relacionamento">
          <FieldBlock label="Fluxo de primeiro contato" value={d?.firstContactFlow ?? ""} />
          <FieldBlock label="Fluxo de nutrição" value={d?.nurtureFlow ?? ""} />
          <FieldBlock label="Fluxo de vendas" value={d?.salesFlow ?? ""} />
          <FieldBlock label="Fluxo pós-venda" value={d?.postSaleFlow ?? ""} />
        </SectionCard>
      )}

      {d?.visualReferences?.some((r) => r.image?.trim()) && (
        <SectionCard title="Referências visuais">
          <VisualRefGrid refs={d.visualReferences} />
        </SectionCard>
      )}

      {(d?.mainNumber || d?.directLink || d?.initialMessage || d?.serviceNotes) && (
        <SectionCard title="Configuração do canal">
          <FieldBlock label="Número principal" value={d?.mainNumber ?? ""} />
          <FieldBlock label="Link direto" value={d?.directLink ?? ""} />
          <FieldBlock label="Mensagem inicial" value={d?.initialMessage ?? ""} />
          <FieldBlock label="Observações de atendimento" value={d?.serviceNotes ?? ""} />
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
