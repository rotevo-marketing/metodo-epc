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
import { RichText } from "./RichText";

type NetworkFrequencyItem = { channel: string; frequency: string };

type LiveContentItem = {
  title: string;
  suggestedDate: string;
  channel: string;
  objective: string;
  observation: string;
};

type LivesData = {
  frequencyItems: FreqItem[];
  networkFrequencies: NetworkFrequencyItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  openingScript: string;
  centralContent: string;
  publicInteraction: string;
  closingAndCall: string;
  visualStrategy: string;
  visualReferences: VisualRef[];
  contents: LiveContentItem[];
  beforeAndAfterPromotion: string;
  repurposingStrategy: string;
  references: ExtRef[];
};

function isLivesData(v: unknown): v is LivesData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function LivesPresentation({ data }: { data: unknown }) {
  const d = isLivesData(data) ? data : null;
  const filledNetworkFreqs = (d?.networkFrequencies ?? []).filter((n) => n.channel?.trim());
  const filledContents = (d?.contents ?? []).filter((c) => c.title?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Estratégia Editorial e Distribuição de Conteúdo"
        title="Lives"
        slug="lives"
      />

      {d?.frequencyItems?.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={d.frequencyItems} />
        </SectionCard>
      )}

      {filledNetworkFreqs.length > 0 && (
        <SectionCard title="Frequência por rede">
          <div className="space-y-2">
            {filledNetworkFreqs.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                <span className="text-sm font-medium text-slate-950">{item.channel}</span>
                <span className="text-xs text-slate-400">{item.frequency}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {(d?.objectives?.some((i) => i.value?.trim()) ||
        d?.languageStructures?.some((i) => i.value?.trim())) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={d?.objectives ?? []} label="Objetivos" />
          <TextList items={d?.languageStructures ?? []} label="Estruturas de linguagem" />
        </SectionCard>
      )}

      {(d?.openingScript || d?.centralContent || d?.publicInteraction || d?.closingAndCall || d?.visualStrategy) && (
        <SectionCard title="Estrutura da live">
          <FieldBlock label="Roteiro de abertura" value={d?.openingScript ?? ""} />
          <FieldBlock label="Conteúdo central" value={d?.centralContent ?? ""} />
          <FieldBlock label="Interação com o público" value={d?.publicInteraction ?? ""} />
          <FieldBlock label="Encerramento e call-to-action" value={d?.closingAndCall ?? ""} />
          <FieldBlock label="Estratégia visual" value={d?.visualStrategy ?? ""} />
        </SectionCard>
      )}

      {filledContents.length > 0 && (
        <SectionCard title="Pauta de lives">
          <div className="space-y-3">
            {filledContents.map((item, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                  {item.suggestedDate && (
                    <p className="text-xs text-slate-400">Data: {item.suggestedDate}</p>
                  )}
                  {item.channel && (
                    <p className="text-xs text-slate-400">Canal: {item.channel}</p>
                  )}
                  {item.objective && (
                    <p className="text-xs text-slate-400">Objetivo: {item.objective}</p>
                  )}
                </div>
                <RichText content={item.observation} className="mt-1.5 text-sm text-slate-600" />
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

      {(d?.beforeAndAfterPromotion || d?.repurposingStrategy) && (
        <SectionCard title="Promoção e reaproveitamento">
          <FieldBlock label="Promoção antes e depois" value={d?.beforeAndAfterPromotion ?? ""} />
          <FieldBlock label="Estratégia de reaproveitamento" value={d?.repurposingStrategy ?? ""} />
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
