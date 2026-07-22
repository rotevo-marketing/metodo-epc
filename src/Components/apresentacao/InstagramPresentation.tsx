import {
  normalizeInstagramData,
  hasMeaningfulInstagramContent,
} from "@/lib/normalizeInstagramData";
import { PresentationHeader } from "./PresentationHeader";
import {
  TextList,
  FieldBlock,
  SectionCard,
  EmptyState,
  TextItem,
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
  // howItAppears (v2) ← languageStructures[].value (v1 legacy)
  const languageStructureItems = d.languageStructures.filter(
    (item) =>
      hasText(item.name) ||
      hasText(item.howItAppears) ||
      hasText(item.journeyRelation) ||
      hasText(item.avoid) ||
      hasText(item.example)
  );

  // ─── Hashtags ───────────────────────────────────────────────────────────────
  // hashtags (v2) ← legacy hashtags grouped under single category via normalization
  const hashtagCategories = d.hashtags.filter(
    (cat) =>
      hasText(cat.name) ||
      hasText(cat.notes) ||
      filterFilledStrings(cat.hashtags).length > 0
  );

  // ─── Direção visual ─────────────────────────────────────────────────────────
  // generalStrategy (v2) ← visualStrategy (v1 legacy)
  const visualStrategy = d.visualDirection.generalStrategy;

  // spread before sort to avoid mutating d.visualDirection.references
  // url (v2) ← visualReferences[].image (v1 legacy)
  const visualReferenceItems = [...d.visualDirection.references]
    .sort((a, b) => a.order - b.order)
    .filter(
      (ref) => hasText(ref.url) || hasText(ref.title) || hasText(ref.description)
    );

  // ─── Indicadores e mensuração ───────────────────────────────────────────────
  const primaryIndicators: TextItem[] = filterFilledStrings(
    d.measurement.primaryIndicators
  ).map((s) => ({ value: s }));
  const secondaryIndicators: TextItem[] = filterFilledStrings(
    d.measurement.secondaryIndicators
  ).map((s) => ({ value: s }));
  const vanityMetrics: TextItem[] = filterFilledStrings(d.measurement.vanityMetrics).map(
    (s) => ({ value: s })
  );
  const measurementHypotheses: TextItem[] = filterFilledStrings(d.measurement.hypotheses).map(
    (s) => ({ value: s })
  );

  // ─── Integração com outros canais ───────────────────────────────────────────
  const receivesAudienceFrom: TextItem[] = filterFilledStrings(
    d.integration.receivesAudienceFrom
  ).map((s) => ({ value: s }));
  const directsAudienceTo: TextItem[] = filterFilledStrings(
    d.integration.directsAudienceTo
  ).map((s) => ({ value: s }));
  const connectionCtas: TextItem[] = filterFilledStrings(d.integration.connectionCtas).map(
    (s) => ({ value: s })
  );
  const operationalDependencies: TextItem[] = filterFilledStrings(
    d.integration.operationalDependencies
  ).map((s) => ({ value: s }));

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
  // url (v2) ← references[].link (v1 legacy)
  const externalReferenceItems = d.externalReferences.filter(
    (ref) => hasText(ref.title) || hasText(ref.url) || hasText(ref.notes)
  );

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
    languageStructureItems.length > 0 ||
    hashtagCategories.length > 0;

  const hasVisualDirectionSection =
    hasText(visualStrategy) ||
    hasText(d.visualDirection.humanPresence) ||
    hasText(d.visualDirection.specialistRole) ||
    hasText(d.visualDirection.backstage) ||
    hasText(d.visualDirection.socialProof) ||
    hasText(d.visualDirection.dataUsage) ||
    hasText(d.visualDirection.informationHierarchy) ||
    hasText(d.visualDirection.visualDensity) ||
    hasText(d.visualDirection.desiredFeeling) ||
    hasText(d.visualDirection.formatConsistency) ||
    hasText(d.visualDirection.journeyAdaptation) ||
    hasText(d.visualDirection.avoid) ||
    visualReferenceItems.length > 0;

  const hasDiscoveryConversion =
    hasText(d.conversion.discovery.cta) ||
    hasText(d.conversion.discovery.destination);

  const hasConsiderationConversion =
    hasText(d.conversion.consideration.cta) ||
    hasText(d.conversion.consideration.destination);

  const hasDecisionConversion =
    hasText(d.conversion.decision.cta) ||
    hasText(d.conversion.decision.destination);

  const hasConversionSection =
    hasDiscoveryConversion ||
    hasConsiderationConversion ||
    hasDecisionConversion ||
    hasText(d.conversion.conversionPath) ||
    hasText(d.conversion.primaryOffer) ||
    hasText(d.conversion.commercialChannel) ||
    hasText(d.conversion.crmIntegration);

  const hasMeasurementSection =
    primaryIndicators.length > 0 ||
    secondaryIndicators.length > 0 ||
    vanityMetrics.length > 0 ||
    measurementHypotheses.length > 0 ||
    hasText(d.measurement.weeklyReview) ||
    hasText(d.measurement.monthlyReview) ||
    hasText(d.measurement.keepCriterion) ||
    hasText(d.measurement.adjustCriterion) ||
    hasText(d.measurement.stopCriterion) ||
    hasText(d.measurement.baseline);

  const hasIntegrationSection =
    receivesAudienceFrom.length > 0 ||
    directsAudienceTo.length > 0 ||
    connectionCtas.length > 0 ||
    operationalDependencies.length > 0 ||
    hasText(d.integration.ecosystemRole) ||
    hasText(d.integration.contentRepurposing);

  const hasExternalReferencesSection = externalReferenceItems.length > 0;

  // profile.enabled intentionally not used — section shows based on content presence
  const hasProfileSection =
    hasText(profilePhotoUrl) ||
    hasText(profileHandle) ||
    hasText(profileName) ||
    hasText(bioText) ||
    hasText(bioLink) ||
    profileLinkItems.length > 0 ||
    profileHighlights.length > 0;

  const hasVisibleInstagramContent =
    hasMeaningfulInstagramContent(d) ||
    hasFrequencySection ||
    hasContentAndLanguageSection ||
    hasVisualDirectionSection ||
    hasConversionSection ||
    hasMeasurementSection ||
    hasIntegrationSection ||
    hasProfileSection ||
    hasExternalReferencesSection;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Estratégia Editorial e Distribuição de Conteúdo"
        title="Instagram"
        slug="instagram"
      />

      {hasProfileSection && (
        <SectionCard title="Apresentação visual do Instagram">
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

      {hasStrategicDirectionSection && (
  <SectionCard title="Direção estratégica">
    <div className="space-y-10">
      {(hasText(d.strategicDirection.channelRole) ||
        hasText(d.strategicDirection.generalStrategy)) && (
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {hasText(d.strategicDirection.channelRole) && (
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <FieldBlock
                label="Papel do canal"
                value={d.strategicDirection.channelRole}
              />
            </div>
          )}

          {hasText(d.strategicDirection.generalStrategy) && (
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <FieldBlock
                label="Estratégia geral"
                value={d.strategicDirection.generalStrategy}
              />
            </div>
          )}
        </div>
      )}

      {(hasText(d.strategicDirection.priorityAudiences) ||
        hasText(d.strategicDirection.ecosystemFunction) ||
        hasText(d.strategicDirection.profileDifferentiation) ||
        hasText(d.strategicDirection.initialEditorialPriorities)) && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
  <h3 className="shrink-0 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
    Fundamentos estratégicos
  </h3>
  <div className="h-px flex-1 bg-slate-200" />
</div>

          <div className="grid items-start gap-6 lg:grid-cols-2">
            {hasText(d.strategicDirection.priorityAudiences) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <FieldBlock
                  label="Públicos prioritários"
                  value={d.strategicDirection.priorityAudiences}
                />
              </div>
            )}

            {hasText(d.strategicDirection.ecosystemFunction) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <FieldBlock
                  label="Função no ecossistema"
                  value={d.strategicDirection.ecosystemFunction}
                />
              </div>
            )}

            {hasText(d.strategicDirection.profileDifferentiation) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <FieldBlock
                  label="Diferenciação do perfil"
                  value={d.strategicDirection.profileDifferentiation}
                />
              </div>
            )}

            {hasText(d.strategicDirection.initialEditorialPriorities) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <FieldBlock
                  label="Prioridades editoriais iniciais"
                  value={d.strategicDirection.initialEditorialPriorities}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </SectionCard>
)}

      {hasFrequencySection && (
        <SectionCard title="Frequência de publicação">
          {visibleFreqItems.length > 0 && (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <h3 className="shrink-0 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
        Formatos e ritmo de publicação
      </h3>
      <div className="h-px flex-1 bg-slate-200" />
    </div>

    <div className="grid items-start gap-6 lg:grid-cols-2">
      {visibleFreqItems.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
        >
          {hasText(item.format) && (
            <p className="text-lg font-semibold text-slate-950">
              {item.format}
            </p>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <PlainTextField label="Quantidade" value={item.quantity} />
            <PlainTextField label="Período" value={item.period} />
          </div>

          <div className="mt-5 space-y-5">
            <PlainTextField label="Papel na jornada" value={item.journeyRole} />
            <PlainTextField label="Observações" value={item.notes} />
          </div>
        </div>
      ))}
    </div>
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

          {languageStructureItems.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Estruturas de linguagem
              </p>
              <div className="divide-y divide-slate-100">
                {languageStructureItems.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0">
                    <PlainTextField label="Nome da estrutura" value={item.name} />
                    <PlainTextField label="Como aparece na comunicação" value={item.howItAppears} />
                    <PlainTextField label="Relação com a jornada" value={item.journeyRelation} />
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      <PlainTextField label="O que evitar" value={item.avoid} />
                      <PlainTextField label="Exemplo aplicado" value={item.example} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hashtagCategories.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Hashtags
              </p>
              <div className="divide-y divide-slate-100">
                {hashtagCategories.map((cat) => {
                  const filledHashtags: TextItem[] = filterFilledStrings(cat.hashtags).map(
                    (h) => ({ value: h })
                  );
                  return (
                    <div key={cat.id} className="py-6 first:pt-0">
                      <PlainTextField label="Categoria" value={cat.name} />
                      {filledHashtags.length > 0 && (
                        <TextList items={filledHashtags} label="Hashtags da categoria" />
                      )}
                      <PlainTextField label="Observações" value={cat.notes} />
                      <PlainTextField
                        label="Status de validação"
                        value={VALIDATION_STATUS_LABELS[cat.validationStatus]}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {hasVisualDirectionSection && (
        <SectionCard title="Direção visual">
          <FieldBlock label="Estratégia visual do canal" value={visualStrategy} />

          {(hasText(d.visualDirection.humanPresence) ||
            hasText(d.visualDirection.specialistRole) ||
            hasText(d.visualDirection.backstage) ||
            hasText(d.visualDirection.socialProof) ||
            hasText(d.visualDirection.dataUsage)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Presença e construção de autoridade
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <PlainTextField label="Presença humana" value={d.visualDirection.humanPresence} />
                <PlainTextField label="Papel visual do especialista" value={d.visualDirection.specialistRole} />
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <PlainTextField label="Bastidores" value={d.visualDirection.backstage} />
                <PlainTextField label="Provas e depoimentos" value={d.visualDirection.socialProof} />
              </div>
              <PlainTextField label="Uso de dados" value={d.visualDirection.dataUsage} />
            </div>
          )}

          {(hasText(d.visualDirection.informationHierarchy) ||
            hasText(d.visualDirection.visualDensity) ||
            hasText(d.visualDirection.desiredFeeling)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Organização visual dos conteúdos
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <PlainTextField label="Hierarquia da informação" value={d.visualDirection.informationHierarchy} />
                <PlainTextField label="Densidade visual" value={d.visualDirection.visualDensity} />
              </div>
              <PlainTextField label="Sensação desejada" value={d.visualDirection.desiredFeeling} />
            </div>
          )}

          {(hasText(d.visualDirection.formatConsistency) ||
            hasText(d.visualDirection.journeyAdaptation) ||
            hasText(d.visualDirection.avoid)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Consistência e adaptação
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <PlainTextField label="Consistência entre formatos" value={d.visualDirection.formatConsistency} />
                <PlainTextField label="Adaptação visual à jornada" value={d.visualDirection.journeyAdaptation} />
              </div>
              <PlainTextField label="O que evitar" value={d.visualDirection.avoid} />
            </div>
          )}

          {visualReferenceItems.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Referências visuais
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visualReferenceItems.map((ref) => (
                  <div
                    key={ref.id}
                    className="overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200"
                  >
                    {hasText(ref.url) && (
                      // img used intentionally: url may be a base64 data URL (legacy) or HTTPS URL
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ref.url}
                        alt={hasText(ref.title) ? ref.title : "Referência visual do Instagram"}
                        className="aspect-square w-full object-cover"
                      />
                    )}
                    {(hasText(ref.title) || hasText(ref.description)) && (
                      <div className="p-4">
                        {hasText(ref.title) && (
                          <p className="text-sm font-medium text-slate-950">{ref.title}</p>
                        )}
                        {hasText(ref.description) && (
                          <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-slate-600">
                            {ref.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {hasConversionSection && (
        <SectionCard title="Conversão">
          {(hasDiscoveryConversion || hasConsiderationConversion || hasDecisionConversion) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Conversão por etapa da jornada
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hasDiscoveryConversion && (
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-slate-950">Descoberta</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Primeiro contato e progressão para um próximo conteúdo ou ponto de interesse.
                    </p>
                    <PlainTextField label="CTA" value={d.conversion.discovery.cta} />
                    <PlainTextField label="Destino" value={d.conversion.discovery.destination} />
                  </div>
                )}
                {hasConsiderationConversion && (
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-slate-950">Consideração</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Aprofundamento do problema, da solução ou do método.
                    </p>
                    <PlainTextField label="CTA" value={d.conversion.consideration.cta} />
                    <PlainTextField label="Destino" value={d.conversion.consideration.destination} />
                  </div>
                )}
                {hasDecisionConversion && (
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-sm font-semibold text-slate-950">Decisão</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Encaminhamento para a ação comercial ou conversa qualificada.
                    </p>
                    <PlainTextField label="CTA" value={d.conversion.decision.cta} />
                    <PlainTextField label="Destino" value={d.conversion.decision.destination} />
                  </div>
                )}
              </div>
            </div>
          )}

          {(hasText(d.conversion.conversionPath) ||
            hasText(d.conversion.primaryOffer) ||
            hasText(d.conversion.commercialChannel) ||
            hasText(d.conversion.crmIntegration)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Caminho e operação comercial
              </p>
              <PlainTextField label="Caminho de conversão" value={d.conversion.conversionPath} />
              <div className="grid gap-x-8 sm:grid-cols-2">
                <PlainTextField label="Oferta principal" value={d.conversion.primaryOffer} />
                <PlainTextField label="Canal comercial" value={d.conversion.commercialChannel} />
              </div>
              <PlainTextField label="Integração com CRM" value={d.conversion.crmIntegration} />
            </div>
          )}
        </SectionCard>
      )}

      {hasMeasurementSection && (
        <SectionCard title="Indicadores e mensuração">
          {(primaryIndicators.length > 0 ||
            secondaryIndicators.length > 0 ||
            vanityMetrics.length > 0) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Indicadores de desempenho
              </p>
              <TextList items={primaryIndicators} label="Indicadores principais" />
              <TextList items={secondaryIndicators} label="Indicadores secundários" />
              <TextList items={vanityMetrics} label="Métricas de vaidade" />
            </div>
          )}

          {(hasText(d.measurement.weeklyReview) || hasText(d.measurement.monthlyReview)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Rotina de análise
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <PlainTextField label="Revisão semanal" value={d.measurement.weeklyReview} />
                <PlainTextField label="Revisão mensal" value={d.measurement.monthlyReview} />
              </div>
            </div>
          )}

          {(hasText(d.measurement.keepCriterion) ||
            hasText(d.measurement.adjustCriterion) ||
            hasText(d.measurement.stopCriterion)) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Critérios de decisão
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                <PlainTextField label="Critério para manter" value={d.measurement.keepCriterion} />
                <PlainTextField label="Critério para ajustar" value={d.measurement.adjustCriterion} />
                <PlainTextField label="Critério para interromper" value={d.measurement.stopCriterion} />
              </div>
            </div>
          )}

          {(hasText(d.measurement.baseline) || measurementHypotheses.length > 0) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Linha de base e hipóteses
              </p>
              <PlainTextField label="Linha de base" value={d.measurement.baseline} />
              <TextList items={measurementHypotheses} label="Hipóteses a testar" />
            </div>
          )}
        </SectionCard>
      )}

      {hasIntegrationSection && (
        <SectionCard title="Integração com outros canais">
          {hasText(d.integration.ecosystemRole) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Papel no ecossistema
              </p>
              <PlainTextField
                label="Papel do Instagram no ecossistema"
                value={d.integration.ecosystemRole}
              />
            </div>
          )}

          {(receivesAudienceFrom.length > 0 || directsAudienceTo.length > 0) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Fluxo de audiência
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                <TextList items={receivesAudienceFrom} label="Recebe audiência de" />
                <TextList items={directsAudienceTo} label="Direciona audiência para" />
              </div>
            </div>
          )}

          {(hasText(d.integration.contentRepurposing) || connectionCtas.length > 0) && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Reaproveitamento e conexão
              </p>
              <PlainTextField
                label="Estratégia de reaproveitamento"
                value={d.integration.contentRepurposing}
              />
              <TextList items={connectionCtas} label="CTAs de conexão entre canais" />
            </div>
          )}

          {operationalDependencies.length > 0 && (
            <div>
              <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
                Dependências operacionais
              </p>
              <TextList items={operationalDependencies} label="Recursos e processos necessários" />
            </div>
          )}
        </SectionCard>
      )}
      
      {hasExternalReferencesSection && (
        <SectionCard title="Referências externas">
          <div className="divide-y divide-slate-100">
            {externalReferenceItems.map((ref) => (
              <div key={ref.id} className="py-5">
                {hasText(ref.title) && (
                  <p className="text-sm font-medium text-slate-950">{ref.title}</p>
                )}
                {hasText(ref.url) && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all text-xs text-slate-500 hover:text-slate-950"
                  >
                    {ref.url}
                  </a>
                )}
                <PlainTextField label="Observações" value={ref.notes} />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {!hasVisibleInstagramContent && <EmptyState />}
    </article>
  );
}
