"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import JornadaCompraForm, {
  BuyingJourneyData,
  createEmptyBuyingJourneyData,
  hasMeaningfulJourneyContent,
  PersonaJourneysData,
} from "./JornadaCompraForm";
import type { PersonaData } from "./PersonasForm";

type JornadaPorPersonaFormProps = {
  personas: PersonaData[];
  journeysData: PersonaJourneysData;
  isSaving: boolean;
  saveError: string;
  createDraft: (personaId: string) => BuyingJourneyData | null;
  saveJourney: (
    personaId: string,
    data: BuyingJourneyData,
    mode: "create" | "update"
  ) => Promise<boolean>;
  orphanedJourneys: Record<string, BuyingJourneyData>;
  reassignOrphanedJourney: (
    orphanedPersonaId: string,
    targetPersonaId: string
  ) => Promise<boolean>;
  deleteOrphanedJourney: (orphanedPersonaId: string) => Promise<boolean>;
};

type JourneyStatus = "none" | "in-progress" | "filled";
type OrphanAction = "view" | "reassign" | "delete";

function hasText(value: string | undefined | null): boolean {
  if (!value) return false;
  return value.replace(/<[^>]*>/g, "").trim().length > 0;
}

function snippetFromOverview(overview: string, maxLen = 120): string {
  const text = overview.replace(/<[^>]*>/g, "").trim();
  if (!text) return "";
  return text.length <= maxLen ? text : text.slice(0, maxLen) + "…";
}

// "Preenchida" when: overview filled + all 6 stages have thoughts or pains + at least one turning point
function isJourneyFilled(journey: BuyingJourneyData): boolean {
  if (!hasText(journey.overview)) return false;
  if (
    !Array.isArray(journey.stages) ||
    journey.stages.length < 6 ||
    journey.stages.some((s) => !hasText(s.thoughts) && !hasText(s.pains))
  ) {
    return false;
  }
  const tp = journey.turningPoints;
  if (
    !hasText(tp.discoveryToPain) &&
    !hasText(tp.painToSolution) &&
    !hasText(tp.solutionToComparison) &&
    !hasText(tp.comparisonToDecision)
  ) {
    return false;
  }
  return true;
}

function JourneyStatusBadge({ status }: { status: JourneyStatus }) {
  if (status === "none") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" aria-hidden="true" />
        Sem jornada
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
        Em andamento
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      Preenchida
    </span>
  );
}

const noopSetter: Dispatch<SetStateAction<BuyingJourneyData>> = () => {};

export default function JornadaPorPersonaForm({
  personas,
  journeysData,
  isSaving,
  saveError,
  createDraft,
  saveJourney,
  orphanedJourneys,
  reassignOrphanedJourney,
  deleteOrphanedJourney,
}: JornadaPorPersonaFormProps) {
  // ── Normal editor states ──────────────────────────────────────────────────
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);
  const [activeJourneyDraft, setActiveJourneyDraft] =
    useState<BuyingJourneyData | null>(null);
  const [activeJourneyMode, setActiveJourneyMode] = useState<
    "create" | "update" | null
  >(null);
  const [isJourneyDraftDirty, setIsJourneyDraftDirty] = useState(false);
  const [hasSaveAttempted, setHasSaveAttempted] = useState(false);

  // ── Orphan action states ──────────────────────────────────────────────────
  const [activeOrphanedJourneyId, setActiveOrphanedJourneyId] = useState<
    string | null
  >(null);
  const [activeOrphanedAction, setActiveOrphanedAction] =
    useState<OrphanAction | null>(null);
  const [selectedReassignmentPersonaId, setSelectedReassignmentPersonaId] =
    useState("");
  const [hasOrphanActionAttempted, setHasOrphanActionAttempted] =
    useState(false);

  // ── Derived ───────────────────────────────────────────────────────────────
  const activePersona = personas.find((p) => p.id === activePersonaId) ?? null;
  const personasWithId = personas.filter((p) => p.id?.trim());
  const personasWithoutId = personas.filter((p) => !p.id?.trim());
  const orphanedEntries = Object.entries(orphanedJourneys);

  // Personas that can receive an orphaned journey: stable id + no existing journey
  const eligibleForReassignment = personas.filter(
    (p) => p.id?.trim() && !journeysData.journeys[p.id]
  );

  // ── Helpers ───────────────────────────────────────────────────────────────
  function getJourneyStatus(personaId: string): JourneyStatus {
    const journey = journeysData.journeys[personaId];
    if (!journey) return "none";
    if (!hasMeaningfulJourneyContent(journey)) return "in-progress";
    return isJourneyFilled(journey) ? "filled" : "in-progress";
  }

  function closeEditor() {
    setActivePersonaId(null);
    setActiveJourneyDraft(null);
    setActiveJourneyMode(null);
    setIsJourneyDraftDirty(false);
    setHasSaveAttempted(false);
  }

  function closeOrphanAction() {
    setActiveOrphanedJourneyId(null);
    setActiveOrphanedAction(null);
    setSelectedReassignmentPersonaId("");
    setHasOrphanActionAttempted(false);
  }

  function confirmDiscard(): boolean {
    return (
      !isJourneyDraftDirty ||
      window.confirm("Deseja descartar as alterações não salvas?")
    );
  }

  // ── Normal editor handlers ────────────────────────────────────────────────
  function handleOpenCreate(persona: PersonaData) {
    if (activePersonaId === persona.id) return;
    if (!confirmDiscard()) return;
    closeOrphanAction();
    const draft = createDraft(persona.id!);
    if (!draft) return;
    setActivePersonaId(persona.id!);
    setActiveJourneyDraft(draft);
    setActiveJourneyMode("create");
    setIsJourneyDraftDirty(false);
    setHasSaveAttempted(false);
  }

  function handleOpenUpdate(persona: PersonaData) {
    if (activePersonaId === persona.id) return;
    if (!confirmDiscard()) return;
    closeOrphanAction();
    const existing = journeysData.journeys[persona.id!];
    if (!existing) return;
    setActivePersonaId(persona.id!);
    setActiveJourneyDraft(structuredClone(existing));
    setActiveJourneyMode("update");
    setIsJourneyDraftDirty(false);
    setHasSaveAttempted(false);
  }

  function handleCancelEdit() {
    if (!confirmDiscard()) return;
    closeEditor();
  }

  function handleDraftChange(action: SetStateAction<BuyingJourneyData>) {
    setActiveJourneyDraft((prev) => {
      const prevValue = prev ?? createEmptyBuyingJourneyData();
      if (typeof action === "function") {
        return action(prevValue);
      }
      return action;
    });
    setIsJourneyDraftDirty(true);
  }

  async function handleSave() {
    if (!activePersonaId || !activeJourneyDraft || !activeJourneyMode) return;
    setHasSaveAttempted(true);
    const success = await saveJourney(
      activePersonaId,
      activeJourneyDraft,
      activeJourneyMode
    );
    if (success) {
      closeEditor();
    }
  }

  // ── Orphan action handlers ────────────────────────────────────────────────
  function handleOrphanAction(orphanId: string, action: OrphanAction) {
    // Toggle off when clicking the already-active action
    if (
      activeOrphanedJourneyId === orphanId &&
      activeOrphanedAction === action
    ) {
      closeOrphanAction();
      return;
    }
    if (!confirmDiscard()) return;
    closeEditor();
    setActiveOrphanedJourneyId(orphanId);
    setActiveOrphanedAction(action);
    setSelectedReassignmentPersonaId("");
    setHasOrphanActionAttempted(false);
  }

  async function handleReassign() {
    if (!activeOrphanedJourneyId || !selectedReassignmentPersonaId) return;
    setHasOrphanActionAttempted(true);
    const success = await reassignOrphanedJourney(
      activeOrphanedJourneyId,
      selectedReassignmentPersonaId
    );
    if (success) {
      closeOrphanAction();
    }
  }

  async function handleDeleteConfirm() {
    if (!activeOrphanedJourneyId) return;
    setHasOrphanActionAttempted(true);
    const success = await deleteOrphanedJourney(activeOrphanedJourneyId);
    if (success) {
      closeOrphanAction();
    }
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  if (personas.length === 0) {
    return (
      <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="px-6 py-8 sm:px-8">
          <p className="text-sm text-slate-600">
            Cadastre ao menos uma persona no módulo de Personas para criar
            Jornadas de Compra específicas por persona.
          </p>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="mt-8 space-y-6">
      {/* ── Persona list ─────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-5 sm:px-8 sm:py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Jornada de Compra
          </p>
          <h2 className="mt-0.5 font-display text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            Por Persona
          </h2>
        </div>

        <ul className="divide-y divide-slate-100" role="list">
          {personasWithId.map((persona) => {
            const status = getJourneyStatus(persona.id!);
            const isActive = activePersonaId === persona.id;

            return (
              <li
                key={persona.id}
                className={`flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8${
                  isActive ? " bg-slate-50/60" : ""
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  {persona.photo ? (
                    <img
                      src={persona.photo}
                      alt={persona.name || "Persona"}
                      className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400 ring-1 ring-slate-200">
                      {(persona.name || "P").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="truncate text-sm font-medium text-slate-900">
                    {persona.name || "Persona sem nome"}
                  </span>
                </div>

                <div className="shrink-0">
                  <JourneyStatusBadge status={status} />
                </div>

                <div className="shrink-0">
                  {status === "none" ? (
                    <button
                      type="button"
                      onClick={() => handleOpenCreate(persona)}
                      disabled={isSaving}
                      aria-label={`Criar jornada para ${persona.name || "Persona"}`}
                      className="cursor-pointer rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Criar jornada
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenUpdate(persona)}
                      disabled={isSaving}
                      aria-label={`${
                        status === "filled"
                          ? "Editar jornada"
                          : "Continuar preenchimento"
                      } de ${persona.name || "Persona"}`}
                      className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "filled"
                        ? "Editar jornada"
                        : "Continuar preenchimento"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}

          {/* Personas without stable id — inconsistency warning */}
          {personasWithoutId.map((persona, index) => (
            <li
              key={`no-id-${index}`}
              className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400 ring-1 ring-slate-200">
                  {(persona.name || "P").charAt(0).toUpperCase()}
                </div>
                <span className="truncate text-sm font-medium text-slate-900">
                  {persona.name || "Persona sem nome"}
                </span>
              </div>
              <p className="text-xs text-red-500" role="status">
                Inconsistência: persona sem identificador estável. Acesse o
                módulo de Personas para corrigir.
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Normal editor ────────────────────────────────────────────────── */}
      {activeJourneyDraft && activePersonaId && activeJourneyMode && (
        <>
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
            <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-5 sm:px-8 sm:py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Editando jornada
              </p>
              <h3 className="mt-0.5 font-display text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {activePersona?.name || "Persona"}
              </h3>
            </div>
          </div>

          <JornadaCompraForm
            data={activeJourneyDraft}
            setData={handleDraftChange}
            hideFooter
          />

          {hasSaveAttempted && saveError ? (
            <div
              id="persona-journey-save-error"
              role="alert"
              className="overflow-hidden rounded-2xl bg-red-50 px-6 py-4 text-sm font-medium text-red-700 ring-1 ring-red-200"
            >
              {saveError}
            </div>
          ) : null}

          <div className="sticky bottom-0 rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar edição
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                aria-busy={isSaving}
                aria-describedby={
                  hasSaveAttempted && saveError
                    ? "persona-journey-save-error"
                    : undefined
                }
                className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving
                  ? "Salvando..."
                  : activeJourneyMode === "create"
                  ? "Criar jornada"
                  : "Salvar alterações"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Orphaned journeys section ─────────────────────────────────────── */}
      {orphanedEntries.length > 0 && (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-amber-200">
          {/* Section header */}
          <div className="border-b border-amber-100 bg-amber-50/60 px-6 py-5 sm:px-8 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Requer atenção
            </p>
            <h2 className="mt-0.5 font-display text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Jornadas sem persona vinculada
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Estas jornadas pertenciam a personas que não estão mais
              cadastradas. Os dados foram preservados e podem ser visualizados,
              reassociados ou excluídos.
            </p>
          </div>

          {/* Orphaned journey rows */}
          <ul className="divide-y divide-slate-100" role="list">
            {orphanedEntries.map(([orphanId, journeyData]) => {
              const isThisActive = activeOrphanedJourneyId === orphanId;
              const overview = snippetFromOverview(journeyData.overview ?? "");

              return (
                <li key={orphanId}>
                  {/* Row */}
                  <div
                    className={`flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-start sm:gap-6 sm:px-8${
                      isThisActive ? " bg-slate-50/60" : ""
                    }`}
                  >
                    {/* Identity */}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">
                          Jornada sem persona
                        </span>
                        <span
                          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.65rem] text-slate-400"
                          title={`Identificador: ${orphanId}`}
                          aria-label={`Identificador parcial: ${orphanId.slice(0, 8)}`}
                        >
                          {orphanId.slice(0, 8)}…
                        </span>
                      </div>
                      {overview && (
                        <p className="text-xs leading-relaxed text-slate-500">
                          {overview}
                        </p>
                      )}
                      <div className="mt-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-amber-400"
                            aria-hidden="true"
                          />
                          Sem vínculo
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
                      <button
                        type="button"
                        onClick={() => handleOrphanAction(orphanId, "view")}
                        disabled={isSaving}
                        aria-pressed={
                          isThisActive && activeOrphanedAction === "view"
                        }
                        aria-label={`Visualizar jornada sem persona (${orphanId.slice(0, 8)}…)`}
                        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isThisActive && activeOrphanedAction === "view"
                          ? "Fechar visualização"
                          : "Visualizar"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleOrphanAction(orphanId, "reassign")
                        }
                        disabled={isSaving}
                        aria-pressed={
                          isThisActive && activeOrphanedAction === "reassign"
                        }
                        aria-label={`Reassociar jornada sem persona (${orphanId.slice(0, 8)}…)`}
                        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isThisActive && activeOrphanedAction === "reassign"
                          ? "Fechar reassociação"
                          : "Reassociar"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOrphanAction(orphanId, "delete")}
                        disabled={isSaving}
                        aria-pressed={
                          isThisActive && activeOrphanedAction === "delete"
                        }
                        aria-label={`Excluir jornada sem persona (${orphanId.slice(0, 8)}…)`}
                        className="cursor-pointer rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isThisActive && activeOrphanedAction === "delete"
                          ? "Cancelar exclusão"
                          : "Excluir"}
                      </button>
                    </div>
                  </div>

                  {/* ── Action panel (only for active orphan) ──────────────── */}
                  {isThisActive && activeOrphanedAction === "view" && (
                    <div className="border-t border-slate-100 px-0 pb-6">
                      <JornadaCompraForm
                        data={journeyData}
                        setData={noopSetter}
                        hideFooter
                        readOnly
                      />
                      <div className="mt-4 px-6 sm:px-8">
                        <button
                          type="button"
                          onClick={closeOrphanAction}
                          className="cursor-pointer rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                        >
                          Fechar visualização
                        </button>
                      </div>
                    </div>
                  )}

                  {isThisActive && activeOrphanedAction === "reassign" && (
                    <div className="border-t border-slate-100 px-6 py-6 sm:px-8">
                      {eligibleForReassignment.length === 0 ? (
                        <p className="text-sm text-slate-500">
                          Nenhuma persona sem jornada está disponível para
                          reassociação.
                        </p>
                      ) : (
                        <>
                          <fieldset>
                            <legend className="mb-3 text-sm font-semibold text-slate-800">
                              Selecione a persona de destino
                            </legend>
                            <div className="flex flex-col gap-3">
                              {eligibleForReassignment.map((persona) => {
                                const inputId = `reassign-${orphanId}-${persona.id}`;
                                return (
                                  <label
                                    key={persona.id}
                                    htmlFor={inputId}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50 has-[:checked]:border-slate-950 has-[:checked]:bg-slate-50"
                                  >
                                    <input
                                      type="radio"
                                      id={inputId}
                                      name={`reassign-target-${orphanId}`}
                                      value={persona.id}
                                      checked={
                                        selectedReassignmentPersonaId ===
                                        persona.id
                                      }
                                      onChange={(e) =>
                                        setSelectedReassignmentPersonaId(
                                          e.target.value
                                        )
                                      }
                                      className="h-4 w-4 shrink-0 accent-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                                    />
                                    {persona.photo ? (
                                      <img
                                        src={persona.photo}
                                        alt={persona.name || "Persona"}
                                        className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                                      />
                                    ) : (
                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400 ring-1 ring-slate-200">
                                        {(persona.name || "P")
                                          .charAt(0)
                                          .toUpperCase()}
                                      </div>
                                    )}
                                    <span className="text-sm font-medium text-slate-900">
                                      {persona.name || "Persona sem nome"}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </fieldset>

                          {selectedReassignmentPersonaId && (
                            <p className="mt-4 text-xs text-slate-500">
                              Esta jornada será vinculada à persona selecionada.
                              O conteúdo será preservado.
                            </p>
                          )}

                          {hasOrphanActionAttempted && saveError ? (
                            <div
                              id="orphan-reassign-error"
                              role="alert"
                              className="mt-4 rounded-xl bg-red-50 px-5 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200"
                            >
                              {saveError}
                            </div>
                          ) : null}

                          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                              type="button"
                              onClick={closeOrphanAction}
                              disabled={isSaving}
                              className="cursor-pointer rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={handleReassign}
                              disabled={
                                !selectedReassignmentPersonaId || isSaving
                              }
                              aria-busy={isSaving}
                              aria-describedby={
                                hasOrphanActionAttempted && saveError
                                  ? "orphan-reassign-error"
                                  : undefined
                              }
                              className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isSaving
                                ? "Reassociando..."
                                : "Reassociar jornada"}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {isThisActive && activeOrphanedAction === "delete" && (
                    <div className="border-t border-red-100 bg-red-50/40 px-6 py-6 sm:px-8">
                      <p className="text-sm font-semibold text-slate-900">
                        Excluir definitivamente esta jornada?
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        Esta ação remove a jornada sem vínculo da plataforma e
                        não poderá ser desfeita. As demais jornadas e personas
                        não serão alteradas.
                      </p>

                      {hasOrphanActionAttempted && saveError ? (
                        <div
                          id="orphan-delete-error"
                          role="alert"
                          className="mt-4 rounded-xl bg-red-50 px-5 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200"
                        >
                          {saveError}
                        </div>
                      ) : null}

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={closeOrphanAction}
                          disabled={isSaving}
                          className="cursor-pointer rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={handleDeleteConfirm}
                          disabled={isSaving}
                          aria-busy={isSaving}
                          aria-describedby={
                            hasOrphanActionAttempted && saveError
                              ? "orphan-delete-error"
                              : undefined
                          }
                          className="cursor-pointer rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSaving ? "Excluindo..." : "Confirmar exclusão"}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
