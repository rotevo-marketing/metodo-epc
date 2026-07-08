"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PresentationHeader } from "./PresentationHeader";
import { RichText } from "./RichText";
import type {
  BuyingJourneyData,
  JourneyStageData,
} from "@/Components/modulos/JornadaCompraForm";
import { hasMeaningfulJourneyContent } from "@/Components/modulos/JornadaCompraForm";
import type { PersonaData } from "@/Components/modulos/PersonasForm";

// ── Props ──────────────────────────────────────────────────────────────────────

type JornadaCompraPresentationProps = {
  legacyData: unknown;
  personaJourneysData: unknown;
  personasData: unknown;
};

// ── Derived types ──────────────────────────────────────────────────────────────

type PersonaJourneyPresentationEntry = {
  persona: PersonaData;
  journey: BuyingJourneyData;
};

type JourneyFullContentProps = {
  journey: BuyingJourneyData;
  embedded?: boolean;
};

// ── Type guards ────────────────────────────────────────────────────────────────

function isBuyingJourneyData(value: unknown): value is BuyingJourneyData {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  if (!Array.isArray(v.stages)) return false;
  if (!v.stages.every((s) => s && typeof s === "object" && !Array.isArray(s)))
    return false;
  if (
    v.turningPoints !== undefined &&
    (typeof v.turningPoints !== "object" || Array.isArray(v.turningPoints))
  )
    return false;
  if (
    v.objections !== undefined &&
    (typeof v.objections !== "object" || Array.isArray(v.objections))
  )
    return false;
  if (
    v.essentialContent !== undefined &&
    (typeof v.essentialContent !== "object" ||
      Array.isArray(v.essentialContent))
  )
    return false;
  if (v.references !== undefined && !Array.isArray(v.references)) return false;
  return true;
}

function isPersonasData(
  value: unknown
): value is { personas: PersonaData[] } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return (
    Array.isArray(v.personas) &&
    v.personas.every((p) => p && typeof p === "object" && !Array.isArray(p))
  );
}

function isPersonaJourneysData(
  value: unknown
): value is {
  version?: number;
  journeys: Record<string, unknown>;
  legacyMigration?: unknown;
} {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  if (
    !v.journeys ||
    typeof v.journeys !== "object" ||
    Array.isArray(v.journeys)
  )
    return false;
  if (v.version !== undefined && typeof v.version !== "number") return false;
  if (
    v.legacyMigration !== undefined &&
    (typeof v.legacyMigration !== "object" ||
      Array.isArray(v.legacyMigration))
  )
    return false;
  return true;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const stageTitles = [
  "Descoberta do problema",
  "Consciência da dor",
  "Busca por solução",
  "Comparação de alternativas",
  "Decisão de compra",
  "Pós-compra e fidelização",
];

const stageFields: { key: keyof JourneyStageData; label: string }[] = [
  { key: "awarenessLevel", label: "Nível de consciência" },
  { key: "thoughts", label: "Pensamentos" },
  { key: "pains", label: "Dores" },
  { key: "recommendedContent", label: "Conteúdo recomendado" },
  { key: "recommendedChannels", label: "Canais recomendados" },
  { key: "desiredNextStep", label: "Próximo passo desejado" },
  { key: "conversionPoint", label: "Ponto de conversão" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <p className="mb-3 mt-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
        {label}
      </p>
      <RichText content={value} className="text-sm leading-7 text-slate-700" />
    </div>
  );
}

// ── PersonaAvatar ──────────────────────────────────────────────────────────────

function PersonaAvatar({
  photo,
  name,
  size = "md",
}: {
  photo: string;
  name: string;
  size?: "md" | "lg";
}) {
  const sizeClasses =
    size === "lg"
      ? "h-14 w-14 sm:h-16 sm:w-16 text-xl"
      : "h-12 w-12 text-base";

  if (photo.trim()) {
    return (
      <img
        src={photo}
        alt={name || "Persona"}
        className={`${sizeClasses} shrink-0 rounded-full object-cover`}
      />
    );
  }

  const initial = name.trim() ? name.trim()[0].toUpperCase() : "P";

  return (
    <span
      className={`${sizeClasses} flex shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-500`}
    >
      {initial}
    </span>
  );
}

// ── StageModal ─────────────────────────────────────────────────────────────────

function StageModal({
  stage,
  index,
  onClose,
}: {
  stage: JourneyStageData;
  index: number;
  onClose: () => void;
}) {
  const filledFields = stageFields.filter((f) => stage[f.key]?.trim());

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stage-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
            {index + 1}
          </span>
          <h3
            id="stage-modal-title"
            className="flex-1 text-xl font-semibold tracking-tight text-slate-950"
          >
            {stageTitles[index] ?? `Etapa ${index + 1}`}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar etapa"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-950"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {filledFields.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {label}
                </p>
                <RichText
                  content={stage[key]}
                  className="text-sm leading-7 text-slate-700"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── JourneyFullContent ─────────────────────────────────────────────────────────

function JourneyFullContent({
  journey,
  embedded = false,
}: JourneyFullContentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const stages = journey.stages ?? [];
  const turningPoints = journey.turningPoints;
  const objections = journey.objections;
  const advancementTriggers = journey.advancementTriggers?.trim() ?? "";
  const essentialContent = journey.essentialContent;
  const funnelCampaigns = journey.funnelCampaignsAutomation?.trim() ?? "";
  const references = (journey.references ?? []).filter(
    (r) => r.title?.trim() || r.link?.trim()
  );
  const overview = journey.overview?.trim() ?? "";

  const selectedStage =
    selectedIndex !== null ? (stages[selectedIndex] ?? null) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Capture-phase listener with stopImmediatePropagation so that when StageModal
  // is open, its Escape fires first and the PersonaJourneyModal listener below
  // never receives the event.
  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.stopImmediatePropagation();
      setSelectedIndex(null);
    }
    document.addEventListener("keydown", handleKey, { capture: true });
    return () =>
      document.removeEventListener("keydown", handleKey, { capture: true });
  }, [selectedIndex]);

  const turningPointItems = turningPoints
    ? [
        { label: "Descoberta → Dor", value: turningPoints.discoveryToPain },
        { label: "Dor → Solução", value: turningPoints.painToSolution },
        {
          label: "Solução → Comparação",
          value: turningPoints.solutionToComparison,
        },
        {
          label: "Comparação → Decisão",
          value: turningPoints.comparisonToDecision,
        },
      ].filter((t) => t.value?.trim())
    : [];

  const objectionItems = objections
    ? [
        { label: "Início da jornada", value: objections.beginning },
        { label: "Meio da jornada", value: objections.middle },
        { label: "Final da jornada", value: objections.end },
      ].filter((o) => o.value?.trim())
    : [];

  const filledStages = stages
    .map((stage, i) => ({ stage, i }))
    .filter(({ stage }) => stageFields.some((f) => stage[f.key]?.trim()));

  const sections = (
    <>
      {/* Overview */}
      {overview && (
        <section className="p-8 lg:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Visão geral
          </p>
          <RichText
            content={overview}
            className="text-base leading-8 text-slate-700"
          />
        </section>
      )}

      {/* Stage cards */}
      {filledStages.length > 0 && (
        <section className="p-6 lg:p-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
            Etapas da jornada
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filledStages.map(({ stage, i }) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-slate-950">
                    {stageTitles[i] ?? `Etapa ${i + 1}`}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  {stage.thoughts && (
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Pensamentos
                      </p>
                      <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                        {stripHtml(stage.thoughts)}
                      </p>
                    </div>
                  )}
                  {stage.pains && (
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                        Dores
                      </p>
                      <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                        {stripHtml(stage.pains)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 p-5">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                  >
                    Ver etapa completa →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Turning points */}
      {turningPointItems.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Pontos de virada
          </h3>
          <div className="space-y-5">
            {turningPointItems.map((tp, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
              >
                <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {tp.label}
                </p>
                <RichText
                  content={tp.value}
                  className="text-sm leading-7 text-slate-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Objections */}
      {objectionItems.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Objeções
          </h3>
          <div className="space-y-5">
            {objectionItems.map((o, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
              >
                <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {o.label}
                </p>
                <RichText
                  content={o.value}
                  className="text-sm leading-7 text-slate-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Extra fields */}
      {(advancementTriggers ||
        essentialContent?.awareness ||
        essentialContent?.decision ||
        funnelCampaigns) && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Complementos estratégicos
          </h3>
          <div className="space-y-6">
            {advancementTriggers && (
              <Field label="Gatilhos de avanço" value={advancementTriggers} />
            )}
            {essentialContent?.awareness && (
              <Field
                label="Conteúdo essencial — consciência"
                value={essentialContent.awareness}
              />
            )}
            {essentialContent?.decision && (
              <Field
                label="Conteúdo essencial — decisão"
                value={essentialContent.decision}
              />
            )}
            {funnelCampaigns && (
              <Field
                label="Funil, campanhas e automação"
                value={funnelCampaigns}
              />
            )}
          </div>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-6 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Referências
          </h3>
          <ul className="space-y-3">
            {references.map((ref, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <div>
                  {ref.title && (
                    <p className="text-sm font-medium text-slate-950">
                      {ref.title}
                    </p>
                  )}
                  {ref.link && (
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-950"
                    >
                      {ref.link}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );

  const stageModal =
    mounted && selectedStage && selectedIndex !== null
      ? createPortal(
          <StageModal
            stage={selectedStage}
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />,
          document.body
        )
      : null;

  if (embedded) {
    return (
      <>
        <div className="divide-y divide-slate-100">{sections}</div>
        {stageModal}
      </>
    );
  }

  return (
    <>
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        {sections}
      </article>
      {stageModal}
    </>
  );
}

// ── PersonaJourneyModal ────────────────────────────────────────────────────────

function PersonaJourneyModal({
  entry,
  onClose,
}: {
  entry: PersonaJourneyPresentationEntry;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { persona, journey } = entry;
  const displayName = persona.name?.trim() || "Persona sem nome";

  // Move focus to close button when modal opens
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Lock body scroll while modal is open; restore on unmount
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape closes modal (bubble phase — StageModal's capture listener takes
  // priority via stopImmediatePropagation when a stage is open)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="persona-journey-modal-name"
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex shrink-0 items-center gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-5">
          <PersonaAvatar photo={persona.photo} name={displayName} size="lg" />

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
              Jornada de Compra
            </p>
            <h2
              id="persona-journey-modal-name"
              className="truncate font-semibold tracking-tight text-slate-950 text-xl"
            >
              {displayName}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar jornada"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
          >
            ✕
          </button>
        </div>

        {/* Scrollable journey content */}
        <div className="overflow-y-auto">
          <JourneyFullContent journey={journey} embedded />
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function JornadaCompraPresentation({
  legacyData,
  personaJourneysData,
  personasData,
}: JornadaCompraPresentationProps) {
  // ── Normalize raw inputs ───────────────────────────────────────────────────

  const legacyJourney: BuyingJourneyData | null = isBuyingJourneyData(
    legacyData
  )
    ? legacyData
    : null;

  const personas: PersonaData[] = isPersonasData(personasData)
    ? personasData.personas
    : [];

  const rawPersonaJourneys: Record<string, unknown> = isPersonaJourneysData(
    personaJourneysData
  )
    ? personaJourneysData.journeys
    : {};

  // ── Valid persona journey entries ──────────────────────────────────────────

  const personaJourneyEntries: PersonaJourneyPresentationEntry[] = personas
    .filter((p) => !!p.id?.trim())
    .flatMap((p) => {
      const raw = rawPersonaJourneys[p.id!];
      if (!isBuyingJourneyData(raw)) return [];
      if (!hasMeaningfulJourneyContent(raw)) return [];
      return [{ persona: p, journey: raw }];
    });

  // ── Presentation mode ──────────────────────────────────────────────────────

  const presentationMode: "persona" | "legacy" | "empty" =
    personaJourneyEntries.length > 0
      ? "persona"
      : legacyJourney !== null && hasMeaningfulJourneyContent(legacyJourney)
      ? "legacy"
      : "empty";

  // ── Persona mode state ─────────────────────────────────────────────────────

  // Stores the id of the persona whose journey modal is open, or null.
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(
    null
  );

  // Guards createPortal calls to client-only renders.
  const [globalMounted, setGlobalMounted] = useState(false);

  // Refs to "Ver jornada completa" buttons so focus can be restored on close.
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    setGlobalMounted(true);
  }, []);

  const selectedEntry =
    personaJourneyEntries.find((e) => e.persona.id === selectedPersonaId) ??
    null;

  function handleOpenJourney(personaId: string) {
    setSelectedPersonaId(personaId);
  }

  const handleCloseJourney = useCallback(() => {
    const prevId = selectedPersonaId;
    setSelectedPersonaId(null);
    // Restore focus to the button that opened the modal
    if (prevId) {
      setTimeout(() => {
        triggerRefs.current.get(prevId)?.focus();
      }, 0);
    }
  }, [selectedPersonaId]);

  // ── Render: legacy ─────────────────────────────────────────────────────────

  if (presentationMode === "legacy") {
    return (
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <PresentationHeader
          area="Fundamentos Estratégicos"
          title="Jornada de Compra"
          slug="jornada-de-compra"
        />
        <JourneyFullContent journey={legacyJourney!} />
      </article>
    );
  }

  // ── Render: empty ──────────────────────────────────────────────────────────

  if (presentationMode === "empty") {
    return (
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <PresentationHeader
          area="Fundamentos Estratégicos"
          title="Jornada de Compra"
          slug="jornada-de-compra"
        />
        <section className="p-8">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      </article>
    );
  }

  // ── Render: persona ────────────────────────────────────────────────────────

  return (
    <>
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <PresentationHeader
          area="Fundamentos Estratégicos"
          title="Jornada de Compra"
          slug="jornada-de-compra"
        />

        {/* One row per persona with valid journey */}
        <section className="divide-y divide-slate-100">
          {personaJourneyEntries.map((entry) => {
            const { persona, journey } = entry;
            const personaId = persona.id!;
            const displayName = persona.name?.trim() || "Persona sem nome";
            const isOpen = selectedPersonaId === personaId;

            // Synopsis: strip HTML from overview, truncate at ~160 chars
            const rawSynopsis = stripHtml(journey.overview ?? "");
            const synopsis =
              rawSynopsis.length > 160
                ? rawSynopsis.slice(0, 160) + "…"
                : rawSynopsis;

            return (
              <div
                key={personaId}
                className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-8 lg:p-8"
              >
                {/* Avatar */}
                <div className="shrink-0">
                  <PersonaAvatar
                    photo={persona.photo}
                    name={displayName}
                    size="lg"
                  />
                </div>

                {/* Identity and synopsis */}
                <div className="flex-1 min-w-0">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Jornada de Compra
                  </p>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-950">
                    {displayName}
                  </h3>
                  <p className="text-sm leading-6 text-slate-500">
                    {synopsis ||
                      "A jornada completa desta persona está disponível para consulta."}
                  </p>
                </div>

                {/* Open button */}
                <div className="shrink-0 sm:self-center">
                  <button
                    ref={(el) => {
                      if (el) triggerRefs.current.set(personaId, el);
                      else triggerRefs.current.delete(personaId);
                    }}
                    type="button"
                    onClick={() => handleOpenJourney(personaId)}
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    className="w-full cursor-pointer rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 sm:w-auto"
                  >
                    Ver jornada completa
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </article>

      {/* Persona journey modal — rendered via portal after client mount */}
      {globalMounted && selectedEntry && (
        <PersonaJourneyModal
          entry={selectedEntry}
          onClose={handleCloseJourney}
        />
      )}
    </>
  );
}
