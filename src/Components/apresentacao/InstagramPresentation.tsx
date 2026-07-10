import {
  normalizeInstagramData,
  hasMeaningfulInstagramContent,
} from "@/lib/normalizeInstagramData";
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

type InstagramPresentationProps = {
  data: unknown;
};

export default function InstagramPresentation({ data }: InstagramPresentationProps) {
  // Server component — normalize once per render; no hooks needed.
  const d = normalizeInstagramData(data);

  // ─── Frequência ───────────────────────────────────────────────────────────────
  // notes (v2) ← observation (v1 legacy)
  const freqItems: FreqItem[] = d.publishing.frequencyItems.map((item) => ({
    format: item.format,
    quantity: item.quantity,
    period: item.period,
    observation: item.notes,
  }));

  // ─── Objetivos ────────────────────────────────────────────────────────────────
  // objective (v2) ← value (v1 legacy)
  const objectives: TextItem[] = d.objectives.map((item) => ({
    value: item.objective,
  }));

  // ─── Stories ──────────────────────────────────────────────────────────────────
  // name (v2); description as visual fallback when name is empty
  const stories: TextItem[] = d.contentArchitecture.stories.map((item) => ({
    value: item.name?.trim() || item.description?.trim() || "",
  }));

  // ─── Reels / formatos ─────────────────────────────────────────────────────────
  // name (v2) ← reels[].value (v1 legacy)
  const reels: TextItem[] = d.contentArchitecture.formats.map((item) => ({
    value: item.name,
  }));

  // ─── Conteúdos gerais ─────────────────────────────────────────────────────────
  // generalContentGuidelines (v2) ← contents[].value (v1 legacy)
  const contents: TextItem[] = d.contentArchitecture.generalContentGuidelines.map((s) => ({
    value: s,
  }));

  // ─── Estruturas de linguagem ──────────────────────────────────────────────────
  // howItAppears (v2) ← languageStructures[].value (v1 legacy); name as fallback
  const languageStructures: TextItem[] = d.languageStructures
    .map((item) => ({ value: item.howItAppears?.trim() || item.name?.trim() || "" }))
    .filter((item) => item.value);

  // ─── Hashtags ─────────────────────────────────────────────────────────────────
  // flatten all categories; category name not shown in this bridge layer
  const hashtags: TextItem[] = d.hashtags.flatMap((cat) =>
    cat.hashtags.filter((h) => h?.trim()).map((h) => ({ value: h }))
  );

  // ─── Estratégia visual ────────────────────────────────────────────────────────
  // generalStrategy (v2) ← visualStrategy (v1 legacy); Rich Text HTML preserved
  const visualStrategy = d.visualDirection.generalStrategy;

  // ─── Referências visuais ──────────────────────────────────────────────────────
  // url (v2) ← image (v1 legacy); data URL and HTTPS URL both accepted
  const visualReferences: VisualRef[] = d.visualDirection.references.map((ref) => ({
    image: ref.url,
  }));

  // ─── Perfil ───────────────────────────────────────────────────────────────────
  const profileHandle = d.profile.handle;
  const profileName = d.profile.displayName;
  const bioText = d.profile.bio;
  const bioLink = d.profile.mainLink;
  // highlights: join non-empty titles for the current single-string display slot
  const highlights = d.profile.highlights
    .filter((h) => h.title?.trim())
    .map((h) => h.title)
    .join(", ");

  // ─── Referências externas ─────────────────────────────────────────────────────
  // url (v2) ← link (v1 legacy)
  const externalRefs: ExtRef[] = d.externalReferences.map((ref) => ({
    title: ref.title,
    link: ref.url,
  }));

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Estratégia Editorial e Distribuição de Conteúdo"
        title="Instagram"
        slug="instagram"
      />

      {freqItems.some((i) => i.quantity?.trim()) && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={freqItems} />
        </SectionCard>
      )}

      {(objectives.some((i) => i.value?.trim()) ||
        languageStructures.some((i) => i.value?.trim()) ||
        contents.some((i) => i.value?.trim()) ||
        stories.some((i) => i.value?.trim()) ||
        reels.some((i) => i.value?.trim()) ||
        hashtags.some((i) => i.value?.trim())) && (
        <SectionCard title="Conteúdo e linguagem">
          <TextList items={objectives} label="Objetivos" />
          <TextList items={languageStructures} label="Estruturas de linguagem" />
          <TextList items={contents} label="Tipos de conteúdo" />
          <TextList items={stories} label="Stories" />
          <TextList items={reels} label="Reels" />
          <TextList items={hashtags} label="Hashtags" />
          <FieldBlock label="Estratégia visual" value={visualStrategy} />
        </SectionCard>
      )}

      {visualReferences.some((r) => r.image?.trim()) && (
        <SectionCard title="Referências visuais">
          <VisualRefGrid refs={visualReferences} />
        </SectionCard>
      )}

      {(profileHandle || profileName || bioText || bioLink || highlights) && (
        <SectionCard title="Perfil">
          <FieldBlock label="Handle" value={profileHandle} />
          <FieldBlock label="Nome do perfil" value={profileName} />
          <FieldBlock label="Bio" value={bioText} />
          <FieldBlock label="Link na bio" value={bioLink} />
          <FieldBlock label="Destaques" value={highlights} />
        </SectionCard>
      )}

      {externalRefs.some((r) => r.title?.trim() || r.link?.trim()) && (
        <SectionCard title="Referências externas">
          <ExternalRefList refs={externalRefs} />
        </SectionCard>
      )}

      {!hasMeaningfulInstagramContent(d) && <EmptyState />}
    </article>
  );
}
