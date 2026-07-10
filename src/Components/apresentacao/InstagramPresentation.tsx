import {
  normalizeInstagramData,
  hasMeaningfulInstagramContent,
} from "@/lib/normalizeInstagramData";
import { PresentationHeader } from "./PresentationHeader";
import {
  TextList,
  VisualRefGrid,
  ExternalRefList,
  FieldBlock,
  SectionCard,
  EmptyState,
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

const VALIDATION_STATUS_LABELS: Record<"hypothesis" | "validated", string> = {
  hypothesis: "Hipótese",
  validated: "Validado",
};

function PlainTextField({ label, value }: { label: string; value: string }) {
  if (!hasText(value)) return null;
  return (
    <div>
      <p className="mb-1 mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}

export default function InstagramPresentation({ data }: InstagramPresentationProps) {
  // Server component — normalize once per render; no hooks needed.
  const d = normalizeInstagramData(data);

  // ─── Frequência ─────────────────────────────────────────────────────────────
  const visibleFreqItems = d.publishing.frequencyItems.filter(
    (item) =>
      hasText(item.format) ||
      hasText(item.quantity) ||
      hasText(item.period) ||
      hasText(item.journeyRole) ||
      hasText(item.notes)
  );

  // ─── Objetivos ──────────────────────────────────────────────────────────────
  // validationStatus alone does not make an item visible
  const objectiveItems = d.objectives.filter(
    (item) =>
      hasText(item.objective) ||
      hasText(item.indicator) ||
      hasText(item.target) ||
      hasText(item.deadline)
  );

  // ─── Formatos de conteúdo ───────────────────────────────────────────────────
  // name (v2) ← reels[].value (v1 legacy) via normalization
  const contentFormats = d.contentArchitecture.formats.filter(
    (item) =>
      hasText(item.name) ||
      hasText(item.structure) ||
      hasText(item.duration) ||
      hasText(item.journeyRole) ||
      hasText(item.purpose) ||
      hasText(item.cta) ||
      hasText(item.notes)
  );

  // ─── Stories estratégicos ───────────────────────────────────────────────────
  // name (v2) ← stories[].value (v1 legacy) via normalization
  const strategicStories = d.contentArchitecture.stories.filter(
    (item) =>
      hasText(item.name) ||
      hasText(item.frequency) ||
      hasText(item.journeyStage) ||
      hasText(item.purpose) ||
      hasText(item.cta) ||
      hasText(item.description)
  );

  // ─── Diretrizes editoriais ──────────────────────────────────────────────────
  // generalContentGuidelines (v2) ← contents[].value (v1 legacy) via normalization
  const editorialGuidelines: TextItem[] = filterFilledStrings(
    d.contentArchitecture.generalContentGuidelines
  ).map((s) => ({ value: s }));

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

  const hasFrequencySection =
    visibleFreqItems.length > 0 ||
    hasText(d.publishing.minimumViableFrequency) ||
    hasText(d.publishing.recommendedFrequency) ||
    hasText(d.publishing.maximumSustainableFrequency) ||
    hasText(d.publishing.productionRoutine) ||
    hasText(d.publishing.adjustmentRule);

  const hasContentAndLanguageSection =
    objectiveItems.length > 0 ||
    contentFormats.length > 0 ||
    strategicStories.length > 0 ||
    editorialGuidelines.length > 0 ||
    languageStructures.some((i) => hasText(i.value)) ||
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
          {visibleFreqItems.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 pr-6 text-left text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                      Formato
                    </th>
                    <th className="pb-3 pr-6 text-left text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                      Quantidade
                    </th>
                    <th className="pb-3 pr-6 text-left text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                      Período
                    </th>
                    <th className="pb-3 pr-6 text-left text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                      Papel na jornada
                    </th>
                    <th className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                      Observações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleFreqItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 pr-6 align-top text-slate-700">{item.format}</td>
                      <td className="py-3 pr-6 align-top text-slate-700">{item.quantity}</td>
                      <td className="py-3 pr-6 align-top text-slate-700">{item.period}</td>
                      <td className="py-3 pr-6 align-top text-slate-700">{item.journeyRole}</td>
                      <td className="py-3 align-top text-slate-700">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(hasText(d.publishing.minimumViableFrequency) ||
            hasText(d.publishing.recommendedFrequency) ||
            hasText(d.publishing.maximumSustainableFrequency)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Frequência sustentável
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                <PlainTextField
                  label="Frequência mínima viável"
                  value={d.publishing.minimumViableFrequency}
                />
                <PlainTextField
                  label="Frequência recomendada"
                  value={d.publishing.recommendedFrequency}
                />
                <PlainTextField
                  label="Frequência máxima sustentável"
                  value={d.publishing.maximumSustainableFrequency}
                />
              </div>
            </div>
          )}

          {(hasText(d.publishing.productionRoutine) || hasText(d.publishing.adjustmentRule)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Rotina operacional
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <PlainTextField label="Rotina de produção" value={d.publishing.productionRoutine} />
                <PlainTextField label="Regra de ajuste" value={d.publishing.adjustmentRule} />
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {hasContentAndLanguageSection && (
        <SectionCard title="Conteúdo e linguagem">
          {objectiveItems.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Objetivos do canal
              </p>
              <div className="divide-y divide-slate-100">
                {objectiveItems.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0">
                    <PlainTextField label="Objetivo" value={item.objective} />
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      <PlainTextField label="Indicador" value={item.indicator} />
                      <PlainTextField label="Meta" value={item.target} />
                    </div>
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      <PlainTextField label="Prazo" value={item.deadline} />
                      <PlainTextField
                        label="Status de validação"
                        value={VALIDATION_STATUS_LABELS[item.validationStatus]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contentFormats.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Formatos de conteúdo
              </p>
              <div className="divide-y divide-slate-100">
                {contentFormats.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0">
                    <PlainTextField label="Nome do formato" value={item.name} />
                    <PlainTextField label="Estrutura" value={item.structure} />
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      <PlainTextField label="Duração ou extensão" value={item.duration} />
                      <PlainTextField label="Papel na jornada" value={item.journeyRole} />
                    </div>
                    <PlainTextField label="Finalidade estratégica" value={item.purpose} />
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      <PlainTextField label="CTA recomendado" value={item.cta} />
                      <PlainTextField label="Observações" value={item.notes} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {strategicStories.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Stories estratégicos
              </p>
              <div className="divide-y divide-slate-100">
                {strategicStories.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0">
                    <PlainTextField label="Nome do Story estratégico" value={item.name} />
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      <PlainTextField label="Frequência" value={item.frequency} />
                      <PlainTextField label="Etapa da jornada" value={item.journeyStage} />
                    </div>
                    <PlainTextField label="Finalidade estratégica" value={item.purpose} />
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      <PlainTextField label="CTA" value={item.cta} />
                      <PlainTextField label="Descrição" value={item.description} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <TextList items={editorialGuidelines} label="Diretrizes editoriais" />
          <TextList items={languageStructures} label="Estruturas de linguagem" />
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
