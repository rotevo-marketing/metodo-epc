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

// ─── Local helpers ────────────────────────────────────────────────────────────

/** True only when value is a non-empty string after trim. Does not strip HTML. */
function hasText(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/** Returns only the strings in arr that pass hasText; preserves order. */
function filterFilledStrings(arr: string[]): string[] {
  return arr.filter((s) => hasText(s));
}

// ─────────────────────────────────────────────────────────────────────────────

export default function InstagramPresentation({ data }: InstagramPresentationProps) {
  // Server component — normalize once per render; no hooks needed.
  const d = normalizeInstagramData(data);

  // ─── Frequência ─────────────────────────────────────────────────────────────
  // Adapter: publishing.frequencyItems[].notes → FreqItem.observation
  // notes (v2) ← observation (v1 legacy)
  const freqItems: FreqItem[] = d.publishing.frequencyItems.map((item) => ({
    format: item.format,
    quantity: item.quantity,
    period: item.period,
    observation: item.notes,
  }));

  // ─── Objetivos ──────────────────────────────────────────────────────────────
  // objective (v2) ← value (v1 legacy)
  const objectives: TextItem[] = d.objectives.map((item) => ({
    value: item.objective,
  }));

  // ─── Stories ────────────────────────────────────────────────────────────────
  // Fallback: name → description when name is empty
  // name (v2) ← stories[].value (v1 legacy)
  const stories: TextItem[] = d.contentArchitecture.stories.map((item) => ({
    value: item.name?.trim() || item.description?.trim() || "",
  }));

  // ─── Formatos (Reels) ───────────────────────────────────────────────────────
  // name (v2) ← reels[].value (v1 legacy)
  const reels: TextItem[] = d.contentArchitecture.formats.map((item) => ({
    value: item.name,
  }));

  // ─── Diretrizes gerais de conteúdo ──────────────────────────────────────────
  // generalContentGuidelines (v2) ← contents[].value (v1 legacy)
  const contents: TextItem[] = d.contentArchitecture.generalContentGuidelines.map(
    (s) => ({ value: s })
  );

  // ─── Estruturas de linguagem ────────────────────────────────────────────────
  // Fallback: howItAppears → name when howItAppears is empty
  // howItAppears (v2) ← languageStructures[].value (v1 legacy)
  const languageStructures: TextItem[] = d.languageStructures
    .map((item) => ({ value: item.howItAppears?.trim() || item.name?.trim() || "" }))
    .filter((item) => item.value);

  // ─── Hashtags ───────────────────────────────────────────────────────────────
  // Flatten all categories; category name not shown in current presentation
  // hashtags (v2) ← legacy hashtags grouped under single category
  const hashtags: TextItem[] = d.hashtags.flatMap((cat) =>
    filterFilledStrings(cat.hashtags).map((h) => ({ value: h }))
  );

  // ─── Estratégia visual ──────────────────────────────────────────────────────
  // Rich Text HTML preserved; rendered via FieldBlock inside "Conteúdo e linguagem"
  // generalStrategy (v2) ← visualStrategy (v1 legacy)
  const visualStrategy = d.visualDirection.generalStrategy;

  // ─── Referências visuais ────────────────────────────────────────────────────
  // Adapter: references[].url → VisualRef.image
  // url (v2) ← visualReferences[].image (v1 legacy)
  const visualReferences: VisualRef[] = d.visualDirection.references.map((ref) => ({
    image: ref.url,
  }));

  // ─── Perfil ─────────────────────────────────────────────────────────────────
  const profileHandle = d.profile.handle;
  const profileName = d.profile.displayName;
  const bioText = d.profile.bio;
  const bioLink = d.profile.mainLink;
  // highlights: non-empty titles joined as comma-separated string
  // highlights[].title (v2) ← highlights CSV string (v1 legacy)
  const highlights = d.profile.highlights
    .filter((h) => h.title?.trim())
    .map((h) => h.title)
    .join(", ");

  // ─── Referências externas ───────────────────────────────────────────────────
  // Adapter: externalReferences[].url → ExtRef.link
  // url (v2) ← references[].link (v1 legacy)
  const externalRefs: ExtRef[] = d.externalReferences.map((ref) => ({
    title: ref.title,
    link: ref.url,
  }));

  // ─── Condições de seção ─────────────────────────────────────────────────────

  const hasFrequencySection = freqItems.some((i) => hasText(i.quantity));

  const hasContentAndLanguageSection =
    objectives.some((i) => hasText(i.value)) ||
    languageStructures.some((i) => hasText(i.value)) ||
    contents.some((i) => hasText(i.value)) ||
    stories.some((i) => hasText(i.value)) ||
    reels.some((i) => hasText(i.value)) ||
    hashtags.some((i) => hasText(i.value)) ||
    hasText(visualStrategy);

  const hasVisualReferencesSection = visualReferences.some((r) => hasText(r.image));

  // profile.enabled intentionally not used — section shows based on content presence
  const hasProfileSection =
    hasText(profileHandle) ||
    hasText(profileName) ||
    hasText(bioText) ||
    hasText(bioLink) ||
    hasText(highlights);

  const hasExternalReferencesSection = externalRefs.some(
    (r) => hasText(r.title) || hasText(r.link)
  );

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Estratégia Editorial e Distribuição de Conteúdo"
        title="Instagram"
        slug="instagram"
      />

      {hasFrequencySection && (
        <SectionCard title="Frequência de publicação">
          <FrequencyTable items={freqItems} />
        </SectionCard>
      )}

      {hasContentAndLanguageSection && (
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

      {hasVisualReferencesSection && (
        <SectionCard title="Referências visuais">
          <VisualRefGrid refs={visualReferences} />
        </SectionCard>
      )}

      {hasProfileSection && (
        <SectionCard title="Perfil">
          <FieldBlock label="Handle" value={profileHandle} />
          <FieldBlock label="Nome do perfil" value={profileName} />
          <FieldBlock label="Bio" value={bioText} />
          <FieldBlock label="Link na bio" value={bioLink} />
          <FieldBlock label="Destaques" value={highlights} />
        </SectionCard>
      )}

      {hasExternalReferencesSection && (
        <SectionCard title="Referências externas">
          <ExternalRefList refs={externalRefs} />
        </SectionCard>
      )}

      {!hasMeaningfulInstagramContent(d) && <EmptyState />}
    </article>
  );
}
