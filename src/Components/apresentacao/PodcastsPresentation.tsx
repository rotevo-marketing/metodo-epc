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
import { RichText } from "./RichText";

type PodcastsContentItem = {
  title: string;
  suggestedDate: string;
  guestOrResponsible: string;
  format: string;
  observation: string;
};

type PodcastsData = {
  frequencyItems: FreqItem[];
  objectives: TextItem[];
  languageStructures: TextItem[];
  mainFormat: string;
  durationAndRhythm: string;
  seriesOrSegments: string;
  guestsAndParticipants: string;
  visualStrategy: string;
  visualReferences: VisualRef[];
  contents: PodcastsContentItem[];
  publishingPlatforms: string;
  repurposingStrategy: string;
  references: ExtRef[];
};

function isPodcastsData(v: unknown): v is PodcastsData {
  return typeof v === "object" && v !== null && "frequencyItems" in v;
}

export default function PodcastsPresentation({ data }: { data: unknown }) {
  const d = isPodcastsData(data) ? data : null;
  const filledContents = (d?.contents ?? []).filter((c) => c.title?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="podcasts"
        group="Estratégia Editorial e Canais"
        title="Podcasts"
        description="Estratégia para podcasts: frequência, formato, pauta de episódios e plataformas de publicação."
      />

      {d?.frequencyItems?.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={d.frequencyItems} />
        </SectionCard>
      )}

      {(d?.objectives?.some((i) => i.value?.trim()) ||
        d?.languageStructures?.some((i) => i.value?.trim())) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={d?.objectives ?? []} label="Objetivos" />
          <TextList items={d?.languageStructures ?? []} label="Estruturas de linguagem" />
        </SectionCard>
      )}

      {(d?.mainFormat || d?.durationAndRhythm || d?.seriesOrSegments || d?.guestsAndParticipants || d?.visualStrategy) && (
        <SectionCard title="Formato e produção">
          <FieldBlock label="Formato principal" value={d?.mainFormat ?? ""} />
          <FieldBlock label="Duração e ritmo" value={d?.durationAndRhythm ?? ""} />
          <FieldBlock label="Séries ou segmentos" value={d?.seriesOrSegments ?? ""} />
          <FieldBlock label="Convidados e participantes" value={d?.guestsAndParticipants ?? ""} />
          <FieldBlock label="Estratégia visual" value={d?.visualStrategy ?? ""} />
        </SectionCard>
      )}

      {filledContents.length > 0 && (
        <SectionCard title="Pauta de episódios">
          <div className="space-y-3">
            {filledContents.map((item, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                  {item.suggestedDate && (
                    <p className="text-xs text-slate-400">Data: {item.suggestedDate}</p>
                  )}
                  {item.format && (
                    <p className="text-xs text-slate-400">Formato: {item.format}</p>
                  )}
                  {item.guestOrResponsible && (
                    <p className="text-xs text-slate-400">Convidado/Responsável: {item.guestOrResponsible}</p>
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

      {(d?.publishingPlatforms || d?.repurposingStrategy) && (
        <SectionCard title="Distribuição e reaproveitamento">
          <FieldBlock label="Plataformas de publicação" value={d?.publishingPlatforms ?? ""} />
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
