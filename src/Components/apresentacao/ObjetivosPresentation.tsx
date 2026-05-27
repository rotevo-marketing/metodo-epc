import { ModuleIcon } from "./ModuleIcon";

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

function ItemCard({ item, index }: { item: SimpleItem; index?: number }) {
  if (!hasContent(item)) return null;
  return (
    <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
      {index !== undefined && (
        <span className="mb-2 inline-block rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600">
          {index + 1}
        </span>
      )}
      {item.title && (
        <p className="text-sm font-semibold text-slate-950">{item.title}</p>
      )}
      {item.description && (
        <p className="mt-1.5 text-sm leading-7 text-slate-600">{item.description}</p>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>
      {children}
    </div>
  );
}

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

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="objetivos" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Fundamentos Estratégicos
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Objetivos do Projeto
            </h2>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          As metas centrais do projeto, prioridades estratégicas, indicadores de
          sucesso, resultados esperados e fases de execução.
        </p>
      </section>

      {/* Main objective */}
      {hasMainObjective && (
        <section className="rounded-[2rem] bg-slate-950 p-8 shadow-sm lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
            Objetivo principal
          </p>
          {mainObjective!.title && (
            <h3 className="mt-5 text-3xl font-light tracking-[-0.04em] text-white lg:text-4xl">
              {mainObjective!.title}
            </h3>
          )}
          {mainObjective!.description && (
            <p className="mt-4 text-base leading-8 text-white/75">
              {mainObjective!.description}
            </p>
          )}
        </section>
      )}

      {/* Multi-item sections */}
      {(secondaryObjectives.length > 0 ||
        priorities.length > 0 ||
        successIndicators.length > 0 ||
        expectedResults.length > 0) && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <div className="space-y-10">
            {secondaryObjectives.length > 0 && (
              <Section title="Objetivos secundários">
                <div className="space-y-3">
                  {secondaryObjectives.map((item, i) => (
                    <ItemCard key={i} item={item} index={i} />
                  ))}
                </div>
              </Section>
            )}
            {priorities.length > 0 && (
              <Section title="Prioridades">
                <div className="space-y-3">
                  {priorities.map((item, i) => (
                    <ItemCard key={i} item={item} index={i} />
                  ))}
                </div>
              </Section>
            )}
            {successIndicators.length > 0 && (
              <Section title="Indicadores de sucesso">
                <div className="space-y-3">
                  {successIndicators.map((item, i) => (
                    <ItemCard key={i} item={item} />
                  ))}
                </div>
              </Section>
            )}
            {expectedResults.length > 0 && (
              <Section title="Resultados esperados">
                <div className="space-y-3">
                  {expectedResults.map((item, i) => (
                    <ItemCard key={i} item={item} />
                  ))}
                </div>
              </Section>
            )}
          </div>
        </section>
      )}

      {/* Phases */}
      {phases.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Fases do projeto
          </h3>
          <div className="space-y-4">
            {phases.map((phase, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                    Fase {i + 1}
                  </span>
                  {phase.period && (
                    <span className="text-xs font-medium text-slate-400">
                      {phase.period}
                    </span>
                  )}
                </div>
                {phase.title && (
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    {phase.title}
                  </p>
                )}
                {phase.description && (
                  <p className="mt-1.5 text-sm leading-7 text-slate-600">
                    {phase.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strategic observation */}
      {strategicObservation && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Observação estratégica
          </p>
          <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
            {strategicObservation}
          </p>
        </section>
      )}

      {!d && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
