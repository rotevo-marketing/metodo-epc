import { ModuleIcon } from "./ModuleIcon";
import { RichText } from "./RichText";

// ─── Types ────────────────────────────────────────────────────────────────────

type SimpleItem = { title: string; description: string };
type PhaseItem = { title: string; period: string; description: string };

type ProjectObjectivesData = {
  mainObjective: SimpleItem;
  secondaryObjectives: SimpleItem[];
  priorities: SimpleItem[];
  successIndicators: SimpleItem[];
  expectedResults: SimpleItem[];
  phases: PhaseItem[];
  strategicObservation: string;
};

function isProjectObjectivesData(v: unknown): v is ProjectObjectivesData {
  return typeof v === "object" && v !== null && "mainObjective" in v;
}

function hasContent(item: SimpleItem) {
  return item.title?.trim() || item.description?.trim();
}

// ─── Presentation sub-components ──────────────────────────────────────────────
// Local for now. Can be moved to a shared file when other modules adopt this pattern.

/** Eyebrow label that opens a content section. */
function PresentationSectionTitle({ title }: { title: string }) {
  return (
    <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-slate-800">
      {title}
    </p>
  );
}

/** Numbered list item: [01] + title on one line, description indented below. */
function NumberedPresentationItem({
  item,
  index,
}: {
  item: SimpleItem;
  index: number;
}) {
  if (!hasContent(item)) return null;
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[0.15rem] shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-slate-500">
        {num}
      </span>
      <div className="min-w-0 flex-1">
        {item.title && (
          <p className="text-[0.9375rem] font-semibold leading-snug text-slate-950">
            {item.title}
          </p>
        )}
        {item.description?.trim() && (
          <RichText
            content={item.description}
            className="mt-2 text-sm leading-[1.8] text-slate-600"
          />
        )}
      </div>
    </div>
  );
}

/** Plain text item: title on top, description below — no badge, no card. */
function PresentationTextItem({ item }: { item: SimpleItem }) {
  if (!hasContent(item)) return null;
  return (
    <div>
      {item.title && (
        <p className="text-[0.9375rem] font-semibold leading-snug text-slate-950">
          {item.title}
        </p>
      )}
      {item.description?.trim() && (
        <RichText
          content={item.description}
          className="mt-1.5 text-sm leading-[1.8] text-slate-600"
        />
      )}
    </div>
  );
}

/** Project phase: [Fase N] + period on one line, title + description below. */
function ProjectPhaseItem({
  phase,
  index,
}: {
  phase: PhaseItem;
  index: number;
}) {
  if (!phase.title?.trim() && !phase.description?.trim()) return null;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700">
          Fase {index + 1}
        </span>
        {phase.period && (
          <span className="text-xs text-slate-400">{phase.period}</span>
        )}
      </div>
      {phase.title && (
        <p className="mt-2.5 text-[0.9375rem] font-semibold leading-snug text-slate-950">
          {phase.title}
        </p>
      )}
      <RichText
        content={phase.description}
        className="mt-2 text-sm leading-[1.8] text-slate-600"
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ObjetivosPresentation({ data }: { data: unknown }) {
  const d = isProjectObjectivesData(data) ? data : null;

  const secondaryObjectives = (d?.secondaryObjectives ?? []).filter(hasContent);
  const priorities = (d?.priorities ?? []).filter(hasContent);
  const successIndicators = (d?.successIndicators ?? []).filter(hasContent);
  const expectedResults = (d?.expectedResults ?? []).filter(hasContent);
  const phases = (d?.phases ?? []).filter(
    (p) => p.title?.trim() || p.description?.trim()
  );
  const mainObjective = d?.mainObjective;
  const hasMainObjective = mainObjective && hasContent(mainObjective);
  const strategicObservation = d?.strategicObservation?.trim() ?? "";

  const hasListSections =
    secondaryObjectives.length > 0 ||
    priorities.length > 0 ||
    successIndicators.length > 0 ||
    expectedResults.length > 0;

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">

      {/* ── Cabeçalho ───────────────────────────────────────── */}
      <section className="px-8 py-10 lg:px-12 lg:py-12">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
          Fundamentos Estratégicos
        </p>
        <div className="flex items-center gap-4">
          <div className="rotevo-card-icon shrink-0">
            <ModuleIcon slug="objetivos" size="card" />
          </div>
          <h2 className="text-[1.75rem] font-medium leading-tight tracking-[-0.03em] text-slate-950 sm:text-[2rem]">
            Objetivos do Projeto
          </h2>
        </div>
      </section>

      {/* ── Objetivo principal ──────────────────────────────── */}
      {hasMainObjective && (
        <section className="px-8 py-10 lg:px-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">
            Objetivo principal
          </p>
          {mainObjective!.title && (
            <h3 className="text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950 lg:text-[1.625rem]">
              {mainObjective!.title}
            </h3>
          )}
          <RichText
            content={mainObjective!.description}
            className="mt-4 max-w-[65ch] text-base leading-[1.75] text-slate-700"
          />
        </section>
      )}

      {/* ── Objetivos secundários · Prioridades · Indicadores · Resultados ── */}
      {hasListSections && (
        <section className="px-8 py-10 lg:px-12">
          <div className="space-y-12">

            {secondaryObjectives.length > 0 && (
              <div>
                <PresentationSectionTitle title="Objetivos secundários" />
                <div className="space-y-7">
                  {secondaryObjectives.map((item, i) => (
                    <NumberedPresentationItem key={i} item={item} index={i} />
                  ))}
                </div>
              </div>
            )}

            {priorities.length > 0 && (
              <div>
                <PresentationSectionTitle title="Prioridades" />
                <div className="space-y-7">
                  {priorities.map((item, i) => (
                    <NumberedPresentationItem key={i} item={item} index={i} />
                  ))}
                </div>
              </div>
            )}

            {successIndicators.length > 0 && (
              <div>
                <PresentationSectionTitle title="Indicadores de sucesso" />
                <div className="divide-y divide-slate-100">
                  {successIndicators.map((item, i) => (
                    <div key={i} className={i === 0 ? "pb-5" : "py-5"}>
                      <PresentationTextItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expectedResults.length > 0 && (
              <div>
                <PresentationSectionTitle title="Resultados esperados" />
                <div className="divide-y divide-slate-100">
                  {expectedResults.map((item, i) => (
                    <div key={i} className={i === 0 ? "pb-5" : "py-5"}>
                      <PresentationTextItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── Fases do projeto ────────────────────────────────── */}
      {phases.length > 0 && (
        <section className="px-8 py-10 lg:px-12">
          <PresentationSectionTitle title="Fases do projeto" />
          <div className="space-y-8">
            {phases.map((phase, i) => (
              <ProjectPhaseItem key={i} phase={phase} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── Observações estratégicas ─────────────────────────── */}
      {strategicObservation && (
        <section className="px-8 py-10 lg:px-12">
          <PresentationSectionTitle title="Observações estratégicas" />
          <RichText
            content={strategicObservation}
            className="max-w-[65ch] text-base leading-[1.75] text-slate-700"
          />
        </section>
      )}

      {!d && (
        <section className="p-8">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
