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
  const profilePhotoUrl = d.profile.photoUrl;
  const profileHandle = d.profile.handle;
  const profileName = d.profile.displayName;
  const bioText = d.profile.bio;
  const bioLink = d.profile.mainLink;
  // spread before sort to avoid mutating d.profile.linkItems
  const profileLinkItems = [...d.profile.linkItems]
    .sort((a, b) => a.order - b.order)
    .filter((item) => hasText(item.title) || hasText(item.url));
  // highlights[].title (v2) ← highlights CSV string (v1 legacy); now structured
  // spread before sort to avoid mutating d.profile.highlights
  const profileHighlights = [...d.profile.highlights]
    .sort((a, b) => a.order - b.order)
    .filter((item) => hasText(item.title) || hasText(item.purpose) || hasText(item.imageUrl));

  // ─── Referências externas ───────────────────────────────────────────────────
  // Adapter: externalReferences[].url → ExtRef.link
  // url (v2) ← references[].link (v1 legacy)
  const externalRefs: ExtRef[] = d.externalReferences.map((ref) => ({
    title: ref.title,
    link: ref.url,
  }));

  // ─── Condições de seção ─────────────────────────────────────────────────────

  const hasStrategicDirectionSection =
    hasText(d.strategicDirection.channelRole) ||
    hasText(d.strategicDirection.generalStrategy) ||
    hasText(d.strategicDirection.priorityAudiences) ||
    hasText(d.strategicDirection.ecosystemFunction) ||
    hasText(d.strategicDirection.profileDifferentiation) ||
    hasText(d.strategicDirection.initialEditorialPriorities);

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
    hasText(profilePhotoUrl) ||
    hasText(profileHandle) ||
    hasText(profileName) ||
    hasText(bioText) ||
    hasText(bioLink) ||
    profileLinkItems.length > 0 ||
    profileHighlights.length > 0;

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

      {hasStrategicDirectionSection && (
        <SectionCard title="Direção estratégica">
          <FieldBlock label="Papel do canal" value={d.strategicDirection.channelRole} />
          <FieldBlock label="Estratégia geral" value={d.strategicDirection.generalStrategy} />
          <div className="grid sm:grid-cols-2 gap-x-8">
            <FieldBlock label="Públicos prioritários" value={d.strategicDirection.priorityAudiences} />
            <FieldBlock label="Função no ecossistema" value={d.strategicDirection.ecosystemFunction} />
            <FieldBlock label="Diferenciação do perfil" value={d.strategicDirection.profileDifferentiation} />
            <FieldBlock label="Prioridades editoriais iniciais" value={d.strategicDirection.initialEditorialPriorities} />
          </div>
        </SectionCard>
      )}

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
          {(hasText(profilePhotoUrl) || hasText(profileName) || hasText(profileHandle)) && (
            <div className="flex items-center gap-5">
              {hasText(profilePhotoUrl) && (
                // img used intentionally: photoUrl may be a base64 data URL (legacy) or HTTPS URL
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profilePhotoUrl}
                  alt={hasText(profileName) ? profileName : "Foto do perfil do Instagram"}
                  className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                />
              )}
              {(hasText(profileName) || hasText(profileHandle)) && (
                <div>
                  {hasText(profileName) && (
                    <p className="text-lg font-semibold text-slate-950">{profileName}</p>
                  )}
                  {hasText(profileHandle) && (
                    <p className="mt-0.5 text-sm text-slate-500">{profileHandle}</p>
                  )}
                </div>
              )}
            </div>
          )}

          <FieldBlock label="Bio" value={bioText} />

          {hasText(bioLink) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Link principal
              </p>
              <a
                href={bioLink}
                target="_blank"
                rel="noreferrer"
                className="break-all text-xs text-slate-500 hover:text-slate-950"
              >
                {bioLink}
              </a>
            </div>
          )}

          {profileLinkItems.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Links adicionais
              </p>
              <ul className="space-y-3">
                {profileLinkItems.map((item) => (
                  <li key={item.id}>
                    {hasText(item.title) && (
                      <p className="text-sm font-medium text-slate-950">{item.title}</p>
                    )}
                    {hasText(item.url) && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-xs text-slate-500 hover:text-slate-950"
                      >
                        {item.url}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profileHighlights.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Destaques
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profileHighlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"
                  >
                    {hasText(highlight.imageUrl) && (
                      // img used intentionally: imageUrl may be a base64 data URL (legacy) or HTTPS URL
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={highlight.imageUrl}
                        alt={hasText(highlight.title) ? highlight.title : "Imagem do destaque do Instagram"}
                        className="mb-3 h-16 w-16 rounded-full object-cover ring-1 ring-slate-200"
                      />
                    )}
                    {hasText(highlight.title) && (
                      <p className="text-sm font-medium text-slate-950">{highlight.title}</p>
                    )}
                    {hasText(highlight.purpose) && (
                      <p className="mt-1 text-xs leading-5 text-slate-500">{highlight.purpose}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
