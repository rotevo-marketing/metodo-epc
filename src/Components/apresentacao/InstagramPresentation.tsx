import {
  normalizeInstagramData,
  hasMeaningfulInstagramContent,
} from "@/lib/normalizeInstagramData";
import { PresentationHeader } from "./PresentationHeader";
import { RichText } from "./RichText";
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
      <p className="text-base font-semibold text-slate-950">{label}</p>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{value}</p>
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
          <div className="space-y-4">
          {hasText(d.strategicDirection.channelRole) && (
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-base font-semibold text-slate-950">Papel do canal</h3>
              <RichText
                content={d.strategicDirection.channelRole}
                className="mt-3 text-sm leading-7 text-slate-700"
              />
            </div>
          )}
          {hasText(d.strategicDirection.generalStrategy) && (
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-base font-semibold text-slate-950">Estratégia geral</h3>
              <RichText
                content={d.strategicDirection.generalStrategy}
                className="mt-3 text-sm leading-7 text-slate-700"
              />
            </div>
          )}
          {hasText(d.strategicDirection.priorityAudiences) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-base font-semibold text-slate-950">Públicos prioritários</h3>
                <RichText
                  content={d.strategicDirection.priorityAudiences}
                  className="mt-3 text-sm leading-7 text-slate-700"
                />
              </div>
            )}
            {hasText(d.strategicDirection.ecosystemFunction) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-base font-semibold text-slate-950">Função no ecossistema</h3>
                <RichText
                  content={d.strategicDirection.ecosystemFunction}
                  className="mt-3 text-sm leading-7 text-slate-700"
                />
              </div>
            )}
            {hasText(d.strategicDirection.profileDifferentiation) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-base font-semibold text-slate-950">Diferenciação do perfil</h3>
                <RichText
                  content={d.strategicDirection.profileDifferentiation}
                  className="mt-3 text-sm leading-7 text-slate-700"
                />
              </div>
            )}
            {hasText(d.strategicDirection.initialEditorialPriorities) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-base font-semibold text-slate-950">Prioridades editoriais iniciais</h3>
                <RichText
                  content={d.strategicDirection.initialEditorialPriorities}
                  className="mt-3 text-sm leading-7 text-slate-700"
                />
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {hasFrequencySection && (
        <SectionCard title="Frequência de publicação">
          <div className="space-y-4">
            {visibleFreqItems.map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                {hasText(item.format) && (
                  <h3 className="text-xl font-semibold text-slate-950">{item.format}</h3>
                )}
                {(hasText(item.quantity) || hasText(item.period)) && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {hasText(item.quantity) && (
                      <div>
                        <p className="text-sm font-medium text-slate-500">Quantidade</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                          {item.quantity}
                        </p>
                      </div>
                    )}
                    {hasText(item.period) && (
                      <div>
                        <p className="text-sm font-medium text-slate-500">Período</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                          {item.period}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {hasText(item.journeyRole) && (
                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <p className="text-sm font-medium text-slate-500">Papel na jornada</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {item.journeyRole}
                    </p>
                  </div>
                )}
                {hasText(item.notes) && (
                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <p className="text-sm font-medium text-slate-500">Observações</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {item.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {hasText(d.publishing.minimumViableFrequency) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PlainTextField
                  label="Frequência mínima viável"
                  value={d.publishing.minimumViableFrequency}
                />
              </div>
            )}
            {hasText(d.publishing.recommendedFrequency) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PlainTextField
                  label="Frequência recomendada"
                  value={d.publishing.recommendedFrequency}
                />
              </div>
            )}
            {hasText(d.publishing.maximumSustainableFrequency) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PlainTextField
                  label="Frequência máxima sustentável"
                  value={d.publishing.maximumSustainableFrequency}
                />
              </div>
            )}
            {hasText(d.publishing.productionRoutine) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PlainTextField label="Rotina de produção" value={d.publishing.productionRoutine} />
              </div>
            )}
            {hasText(d.publishing.adjustmentRule) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PlainTextField label="Regra de ajuste" value={d.publishing.adjustmentRule} />
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {hasContentAndLanguageSection && (
        <SectionCard title="Conteúdo e linguagem">
          <div className="space-y-10">
            {objectiveItems.length > 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Objetivos do canal
                  </h3>
                </div>
                <div className="space-y-4">
                  {objectiveItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
                    >
                      <PlainTextField label="Objetivo" value={item.objective} />
                      <div className="space-y-4">
                        <PlainTextField label="Indicador" value={item.indicator} />
                        <PlainTextField label="Meta" value={item.target} />
                      </div>
                      <div className="space-y-4">
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Formatos de conteúdo
                  </h3>
                </div>
                <div className="space-y-4">
                  {contentFormats.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
                    >
                      <PlainTextField label="Nome do formato" value={item.name} />
                      <PlainTextField label="Estrutura" value={item.structure} />
                      <div className="space-y-4">
                        <PlainTextField label="Duração ou extensão" value={item.duration} />
                        <PlainTextField label="Papel na jornada" value={item.journeyRole} />
                      </div>
                      <PlainTextField label="Finalidade estratégica" value={item.purpose} />
                      <div className="space-y-4">
                        <PlainTextField label="CTA recomendado" value={item.cta} />
                        <PlainTextField label="Observações" value={item.notes} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {strategicStories.length > 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Stories estratégicos
                  </h3>
                </div>
                <div className="space-y-4">
                  {strategicStories.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
                    >
                      <PlainTextField label="Nome do Story estratégico" value={item.name} />
                      <div className="space-y-4">
                        <PlainTextField label="Frequência" value={item.frequency} />
                        <PlainTextField label="Etapa da jornada" value={item.journeyStage} />
                      </div>
                      <PlainTextField label="Finalidade estratégica" value={item.purpose} />
                      <div className="space-y-4">
                        <PlainTextField label="CTA" value={item.cta} />
                        <PlainTextField label="Descrição" value={item.description} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {editorialGuidelines.length > 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Diretrizes editoriais
                  </h3>
                </div>
                <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <TextList items={editorialGuidelines} label="Diretrizes editoriais" />
                </div>
              </div>
            )}

            {languageStructureItems.length > 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Estruturas de linguagem
                  </h3>
                </div>
                <div className="space-y-4">
                  {languageStructureItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
                    >
                      <PlainTextField label="Nome da estrutura" value={item.name} />
                      <PlainTextField label="Como aparece na comunicação" value={item.howItAppears} />
                      <PlainTextField label="Relação com a jornada" value={item.journeyRelation} />
                      <div className="space-y-4">
                        <PlainTextField label="O que evitar" value={item.avoid} />
                        <PlainTextField label="Exemplo aplicado" value={item.example} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hashtagCategories.length > 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Hashtags
                  </h3>
                </div>
                <div className="space-y-4">
                  {hashtagCategories.map((cat) => {
                    const filledHashtags: TextItem[] = filterFilledStrings(cat.hashtags).map(
                      (h) => ({ value: h })
                    );
                    return (
                      <div
                        key={cat.id}
                        className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
                      >
                        <PlainTextField label="Categoria" value={cat.name} />
                        {filledHashtags.length > 0 && (
                          <div>
                            <h4 className="text-base font-semibold text-slate-950">
                              Hashtags da categoria
                            </h4>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {filledHashtags.map((hashtag, index) => (
                                <span
                                  key={`${cat.id}-${index}`}
                                  className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 ring-1 ring-slate-200"
                                >
                                  {hashtag.value}
                                </span>
                              ))}
                            </div>
                          </div>
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
          </div>
        </SectionCard>
      )}

      {hasVisualDirectionSection && (
        <SectionCard title="Direção visual">
          <div className="space-y-4">
            {hasText(visualStrategy) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-base font-semibold text-slate-950">Estratégia visual do canal</h3>
                <RichText content={visualStrategy} className="mt-3 text-sm leading-7 text-slate-700" />
              </div>
            )}
            {hasText(d.visualDirection.humanPresence) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Presença humana" value={d.visualDirection.humanPresence} /></div>}
            {hasText(d.visualDirection.specialistRole) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Papel visual do especialista" value={d.visualDirection.specialistRole} /></div>}
            {hasText(d.visualDirection.backstage) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Bastidores" value={d.visualDirection.backstage} /></div>}
            {hasText(d.visualDirection.socialProof) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Provas e depoimentos" value={d.visualDirection.socialProof} /></div>}
            {hasText(d.visualDirection.dataUsage) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Uso de dados" value={d.visualDirection.dataUsage} /></div>}
            {hasText(d.visualDirection.informationHierarchy) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Hierarquia da informação" value={d.visualDirection.informationHierarchy} /></div>}
            {hasText(d.visualDirection.visualDensity) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Densidade visual" value={d.visualDirection.visualDensity} /></div>}
            {hasText(d.visualDirection.desiredFeeling) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Sensação desejada" value={d.visualDirection.desiredFeeling} /></div>}
            {hasText(d.visualDirection.formatConsistency) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Consistência entre formatos" value={d.visualDirection.formatConsistency} /></div>}
            {hasText(d.visualDirection.journeyAdaptation) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="Adaptação visual à jornada" value={d.visualDirection.journeyAdaptation} /></div>}
            {hasText(d.visualDirection.avoid) && <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><PlainTextField label="O que evitar" value={d.visualDirection.avoid} /></div>}

          {visualReferenceItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-950">
                Referências visuais
              </h3>
              <div className="space-y-4">
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
          </div>
        </SectionCard>
      )}

      {hasConversionSection && (
        <SectionCard title="Conversão">
          <div className="space-y-10">
            {(hasDiscoveryConversion || hasConsiderationConversion || hasDecisionConversion) && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Etapas de conversão
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasDiscoveryConversion && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <p className="text-sm font-semibold text-slate-950">Descoberta</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Primeiro contato e progressão para um próximo conteúdo ou ponto de interesse.
                      </p>
                      <PlainTextField label="CTA" value={d.conversion.discovery.cta} />
                      <PlainTextField label="Destino" value={d.conversion.discovery.destination} />
                    </div>
                  )}
                  {hasConsiderationConversion && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <p className="text-sm font-semibold text-slate-950">Consideração</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Aprofundamento do problema, da solução ou do método.
                      </p>
                      <PlainTextField label="CTA" value={d.conversion.consideration.cta} />
                      <PlainTextField label="Destino" value={d.conversion.consideration.destination} />
                    </div>
                  )}
                  {hasDecisionConversion && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Caminho comercial
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasText(d.conversion.conversionPath) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField
                        label="Caminho de conversão"
                        value={d.conversion.conversionPath}
                      />
                    </div>
                  )}
                  {hasText(d.conversion.primaryOffer) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField label="Oferta principal" value={d.conversion.primaryOffer} />
                    </div>
                  )}
                  {hasText(d.conversion.commercialChannel) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField
                        label="Canal comercial"
                        value={d.conversion.commercialChannel}
                      />
                    </div>
                  )}
                  {hasText(d.conversion.crmIntegration) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField
                        label="Integração com CRM"
                        value={d.conversion.crmIntegration}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {hasMeasurementSection && (
        <SectionCard title="Indicadores e mensuração">
          <div className="space-y-10">
            {(primaryIndicators.length > 0 ||
              secondaryIndicators.length > 0 ||
              vanityMetrics.length > 0) && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Indicadores de desempenho
                  </h3>
                </div>
                <div className="space-y-4">
                  {primaryIndicators.length > 0 && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <TextList items={primaryIndicators} label="Indicadores principais" />
                    </div>
                  )}
                  {secondaryIndicators.length > 0 && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <TextList items={secondaryIndicators} label="Indicadores secundários" />
                    </div>
                  )}
                  {vanityMetrics.length > 0 && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <TextList items={vanityMetrics} label="Métricas de vaidade" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {(hasText(d.measurement.weeklyReview) || hasText(d.measurement.monthlyReview)) && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Rotina de análise
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasText(d.measurement.weeklyReview) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField label="Revisão semanal" value={d.measurement.weeklyReview} />
                    </div>
                  )}
                  {hasText(d.measurement.monthlyReview) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField label="Revisão mensal" value={d.measurement.monthlyReview} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {(hasText(d.measurement.keepCriterion) ||
              hasText(d.measurement.adjustCriterion) ||
              hasText(d.measurement.stopCriterion)) && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Critérios de decisão
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasText(d.measurement.keepCriterion) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField
                        label="Critério para manter"
                        value={d.measurement.keepCriterion}
                      />
                    </div>
                  )}
                  {hasText(d.measurement.adjustCriterion) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField
                        label="Critério para ajustar"
                        value={d.measurement.adjustCriterion}
                      />
                    </div>
                  )}
                  {hasText(d.measurement.stopCriterion) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField
                        label="Critério para interromper"
                        value={d.measurement.stopCriterion}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {(hasText(d.measurement.baseline) || measurementHypotheses.length > 0) && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Linha de base e hipóteses
                  </h3>
                </div>
                <div className="space-y-4">
                  {hasText(d.measurement.baseline) && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <PlainTextField label="Linha de base" value={d.measurement.baseline} />
                    </div>
                  )}
                  {measurementHypotheses.length > 0 && (
                    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <TextList items={measurementHypotheses} label="Hipóteses a testar" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {hasIntegrationSection && (
        <SectionCard title="Integração com outros canais">
          <div className="space-y-4">
            {hasText(d.integration.ecosystemRole) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PlainTextField
                  label="Papel do Instagram no ecossistema"
                  value={d.integration.ecosystemRole}
                />
              </div>
            )}
            {receivesAudienceFrom.length > 0 && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <TextList items={receivesAudienceFrom} label="Recebe audiência de" />
              </div>
            )}
            {directsAudienceTo.length > 0 && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <TextList items={directsAudienceTo} label="Direciona audiência para" />
              </div>
            )}
            {hasText(d.integration.contentRepurposing) && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PlainTextField
                  label="Estratégia de reaproveitamento"
                  value={d.integration.contentRepurposing}
                />
              </div>
            )}
            {connectionCtas.length > 0 && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <TextList items={connectionCtas} label="CTAs de conexão entre canais" />
              </div>
            )}
            {operationalDependencies.length > 0 && (
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <TextList items={operationalDependencies} label="Recursos e processos necessários" />
              </div>
            )}
          </div>
        </SectionCard>
      )}
      
      {hasExternalReferencesSection && (
        <SectionCard title="Referências externas">
          <div className="space-y-4">
            {externalReferenceItems.map((ref) => (
              <div
                key={ref.id}
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
              >
                {hasText(ref.title) && (
                  <h3 className="text-base font-semibold text-slate-950">{ref.title}</h3>
                )}
                {hasText(ref.url) && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block break-all text-sm text-slate-500 hover:text-slate-950"
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
