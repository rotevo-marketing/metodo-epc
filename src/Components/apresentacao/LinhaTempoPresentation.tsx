import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
} from "./ChannelPresentationShared";
import { RichText } from "./RichText";

type TimelineSprint = {
  title: string;
  startDate: string;
  endDate: string;
  period: string;
  deliverables: string;
};

type TimelineEvent = {
  title: string;
  description: string;
  date: string;
  phase: string;
  priority: string;
  status: string;
  responsible: string;
  dependency: string;
  sprints: TimelineSprint[];
};

type TimelineData = {
  events: TimelineEvent[];
  macroVision: string;
  firstMilestone: string;
  secondMilestone: string;
  thirdMilestone: string;
  risks: string;
  references: { title: string; link: string }[];
};

function isTimelineData(v: unknown): v is TimelineData {
  return typeof v === "object" && v !== null && "events" in v;
}

const priorityColors: Record<string, string> = {
  Alta: "bg-red-100 text-red-700",
  Média: "bg-amber-100 text-amber-700",
  Baixa: "bg-slate-100 text-slate-600",
};

const statusColors: Record<string, string> = {
  "Não iniciado": "bg-slate-100 text-slate-600",
  "Em andamento": "bg-blue-100 text-blue-700",
  Concluído: "bg-emerald-100 text-emerald-700",
  Atrasado: "bg-red-100 text-red-700",
  Bloqueado: "bg-orange-100 text-orange-700",
};

export default function LinhaTempoPresentation({ data }: { data: unknown }) {
  const d = isTimelineData(data) ? data : null;
  const filledEvents = (d?.events ?? []).filter((e) => e.title?.trim() || e.date?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="linha-do-tempo"
        group="Execução, Acompanhamento e Gestão"
        title="Linha do Tempo"
        description="Planejamento temporal da execução: eventos, fases, sprints, marcos e riscos."
      />

      {(d?.macroVision || d?.firstMilestone || d?.secondMilestone || d?.thirdMilestone) && (
        <SectionCard title="Visão macro e marcos">
          {d?.macroVision && (
            <div className="mb-4">
              <FieldBlock label="Visão macro" value={d.macroVision} />
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-3">
            {d?.firstMilestone && (
              <div className="rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">1º Marco</p>
                <RichText content={d.firstMilestone} className="mt-1 text-sm text-slate-700" />
              </div>
            )}
            {d?.secondMilestone && (
              <div className="rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">2º Marco</p>
                <RichText content={d.secondMilestone} className="mt-1 text-sm text-slate-700" />
              </div>
            )}
            {d?.thirdMilestone && (
              <div className="rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">3º Marco</p>
                <RichText content={d.thirdMilestone} className="mt-1 text-sm text-slate-700" />
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {filledEvents.length > 0 && (
        <SectionCard title="Eventos e fases">
          <div className="space-y-4">
            {filledEvents.map((event, ei) => {
              const filledSprints = (event.sprints ?? []).filter((s) => s.title?.trim() || s.period?.trim());
              return (
                <div key={ei} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    {event.phase && (
                      <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {event.phase}
                      </span>
                    )}
                    {event.priority && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          priorityColors[event.priority] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {event.priority}
                      </span>
                    )}
                    {event.status && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[event.status] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {event.status}
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-slate-950">{event.title}</h3>
                    {event.date && (
                      <span className="ml-auto text-xs text-slate-400">{event.date}</span>
                    )}
                  </div>

                  <RichText content={event.description} className="mt-2 text-sm leading-7 text-slate-600" />

                  {(event.responsible || event.dependency) && (
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {event.responsible && (
                        <div>
                          <p className="text-xs font-semibold text-slate-400">Responsável</p>
                          <p className="mt-0.5 text-xs text-slate-600">{event.responsible}</p>
                        </div>
                      )}
                      {event.dependency && (
                        <div>
                          <p className="text-xs font-semibold text-slate-400">Dependência</p>
                          <p className="mt-0.5 text-xs text-slate-600">{event.dependency}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {filledSprints.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Sprints
                      </p>
                      <div className="space-y-2">
                        {filledSprints.map((sprint, si) => (
                          <div key={si} className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-medium text-slate-950">{sprint.title}</span>
                              {sprint.period && (
                                <span className="text-xs text-slate-400">{sprint.period}</span>
                              )}
                              {(sprint.startDate || sprint.endDate) && (
                                <span className="ml-auto text-xs text-slate-400">
                                  {sprint.startDate}{sprint.startDate && sprint.endDate ? " → " : ""}{sprint.endDate}
                                </span>
                              )}
                            </div>
                            {sprint.deliverables && (
                              <p className="mt-1 text-xs text-slate-500">
                                <span className="font-medium text-slate-700">Entregas:</span> {sprint.deliverables}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {d?.risks && (
        <SectionCard title="Riscos e contingências">
          <FieldBlock label="Riscos identificados" value={d.risks} />
        </SectionCard>
      )}

      {d?.references?.some((r) => r.title?.trim() || r.link?.trim()) && (
        <SectionCard title="Referências externas">
          <ExternalRefList refs={d.references} />
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
