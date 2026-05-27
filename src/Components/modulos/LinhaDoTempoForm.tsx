"use client";

import { type ReactNode } from "react";
import Link from "next/link";

export type TimelineSprint = {
  title: string;
  startDate: string;
  endDate: string;
  period: string;
  deliverables: string;
};

export type TimelineEvent = {
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

export type ExternalReference = {
  title: string;
  link: string;
};

export type TimelineData = {
  events: TimelineEvent[];
  macroVision: string;
  firstMilestone: string;
  secondMilestone: string;
  thirdMilestone: string;
  risks: string;
  references: ExternalReference[];
};

export const phases = [
  "Diagnóstico",
  "Planejamento",
  "Produção",
  "Implementação",
  "Validação",
  "Acompanhamento",
  "Otimização",
];

export const priorities = ["Alta", "Média", "Baixa"];

export const statuses = [
  "Não iniciado",
  "Em andamento",
  "Em validação",
  "Concluído",
  "Atrasado",
];

export const emptySprint: TimelineSprint = {
  title: "",
  startDate: "",
  endDate: "",
  period: "",
  deliverables: "",
};

export const emptyEvent: TimelineEvent = {
  title: "",
  description: "",
  date: "",
  phase: "Diagnóstico",
  priority: "Alta",
  status: "Não iniciado",
  responsible: "",
  dependency: "",
  sprints: [{ ...emptySprint }],
};

export const initialTimelineData: TimelineData = {
  events: [
    {
      title: "",
      description: "",
      date: "",
      phase: "Implementação",
      priority: "Alta",
      status: "Não iniciado",
      responsible: "",
      dependency: "",
      sprints: [
        { title: "Sprint 1", startDate: "", endDate: "", period: "", deliverables: "" },
        { title: "Sprint 2", startDate: "", endDate: "", period: "", deliverables: "" },
      ],
    },
  ],
  macroVision: "",
  firstMilestone: "",
  secondMilestone: "",
  thirdMilestone: "",
  risks: "",
  references: [{ title: "", link: "" }],
};

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
      <div>
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-600">
      {children}
    </label>
  );
}

function InputField({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    />
  );
}

function TextAreaField({
  value,
  onChange,
  placeholder,
  rows = 6,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    />
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

interface LinhaDoTempoFormProps {
  data: TimelineData;
  setData: React.Dispatch<React.SetStateAction<TimelineData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
}

export default function LinhaDoTempoForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: LinhaDoTempoFormProps) {
  function updateEvent(eventIndex: number, key: keyof TimelineEvent, value: string) {
    setData((current) => {
      const nextEvents = [...current.events];
      nextEvents[eventIndex] = { ...nextEvents[eventIndex], [key]: value };
      return { ...current, events: nextEvents };
    });
  }

  function addEvent() {
    setData((current) => ({
      ...current,
      events: [...current.events, { ...emptyEvent, sprints: [{ ...emptySprint }] }],
    }));
  }

  function removeEvent(eventIndex: number) {
    setData((current) => ({
      ...current,
      events:
        current.events.length > 1
          ? current.events.filter((_, i) => i !== eventIndex)
          : [{ ...emptyEvent, sprints: [{ ...emptySprint }] }],
    }));
  }

  function updateSprint(
    eventIndex: number,
    sprintIndex: number,
    key: keyof TimelineSprint,
    value: string
  ) {
    setData((current) => {
      const nextEvents = [...current.events];
      const nextSprints = [...nextEvents[eventIndex].sprints];
      nextSprints[sprintIndex] = { ...nextSprints[sprintIndex], [key]: value };
      nextEvents[eventIndex] = { ...nextEvents[eventIndex], sprints: nextSprints };
      return { ...current, events: nextEvents };
    });
  }

  function addSprint(eventIndex: number) {
    setData((current) => {
      const nextEvents = [...current.events];
      nextEvents[eventIndex] = {
        ...nextEvents[eventIndex],
        sprints: [
          ...nextEvents[eventIndex].sprints,
          {
            ...emptySprint,
            title: `Sprint ${nextEvents[eventIndex].sprints.length + 1}`,
          },
        ],
      };
      return { ...current, events: nextEvents };
    });
  }

  function removeSprint(eventIndex: number, sprintIndex: number) {
    setData((current) => {
      const nextEvents = [...current.events];
      const currentSprints = nextEvents[eventIndex].sprints;
      nextEvents[eventIndex] = {
        ...nextEvents[eventIndex],
        sprints:
          currentSprints.length > 1
            ? currentSprints.filter((_, i) => i !== sprintIndex)
            : [{ ...emptySprint }],
      };
      return { ...current, events: nextEvents };
    });
  }

  function updateReference(index: number, key: keyof ExternalReference, value: string) {
    setData((current) => {
      const nextReferences = [...current.references];
      nextReferences[index] = { ...nextReferences[index], [key]: value };
      return { ...current, references: nextReferences };
    });
  }

  function addReference() {
    setData((current) => ({
      ...current,
      references: [...current.references, { title: "", link: "" }],
    }));
  }

  function removeReference(index: number) {
    setData((current) => ({
      ...current,
      references:
        current.references.length > 1
          ? current.references.filter((_, i) => i !== index)
          : [{ title: "", link: "" }],
    }));
  }

  return (
    <div>
      <SectionCard
        title="Implementações da linha do tempo"
        description="Cada implementação representa uma entrega importante do projeto. Dentro dela, cadastre os sprints com data de início, data final e entregas."
      >
        <div className="space-y-6">
          {data.events.map((event, eventIndex) => (
            <div
              key={eventIndex}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Implementação {String(eventIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">
                    Configuração da implementação
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => removeEvent(eventIndex)}
                  disabled={isDisabled}
                  className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Excluir implementação
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
                <div>
                  <FieldLabel>Título da implementação</FieldLabel>
                  <InputField
                    value={event.title}
                    onChange={(value) => updateEvent(eventIndex, "title", value)}
                    placeholder="Ex: Estruturar canais digitais, desenvolver landing page, configurar automação..."
                  />
                </div>
                <div>
                  <FieldLabel>Data marco</FieldLabel>
                  <InputField
                    type="date"
                    value={event.date}
                    onChange={(value) => updateEvent(eventIndex, "date", value)}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="mt-4">
                <FieldLabel>Descrição da implementação</FieldLabel>
                <TextAreaField
                  value={event.description}
                  onChange={(value) => updateEvent(eventIndex, "description", value)}
                  placeholder="Explique o que será implementado, por que essa etapa é importante e qual resultado ela deve gerar."
                  rows={5}
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-4">
                <div>
                  <FieldLabel>Fase do projeto</FieldLabel>
                  <SelectField
                    value={event.phase}
                    onChange={(value) => updateEvent(eventIndex, "phase", value)}
                    options={phases}
                  />
                </div>
                <div>
                  <FieldLabel>Prioridade</FieldLabel>
                  <SelectField
                    value={event.priority}
                    onChange={(value) => updateEvent(eventIndex, "priority", value)}
                    options={priorities}
                  />
                </div>
                <div>
                  <FieldLabel>Status</FieldLabel>
                  <SelectField
                    value={event.status}
                    onChange={(value) => updateEvent(eventIndex, "status", value)}
                    options={statuses}
                  />
                </div>
                <div>
                  <FieldLabel>Responsável</FieldLabel>
                  <InputField
                    value={event.responsible}
                    onChange={(value) => updateEvent(eventIndex, "responsible", value)}
                    placeholder="Ex: Estrategista, designer, gestor de tráfego..."
                  />
                </div>
              </div>

              <div className="mt-4">
                <FieldLabel>Dependência</FieldLabel>
                <InputField
                  value={event.dependency}
                  onChange={(value) => updateEvent(eventIndex, "dependency", value)}
                  placeholder="Ex: Depende da aprovação da identidade visual, envio de fotos, validação do cliente..."
                />
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-slate-950">
                      Sprints da implementação
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Cadastre cada sprint com data de início, data final, período e entregas.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addSprint(eventIndex)}
                    disabled={isDisabled}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    + Novo sprint
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {event.sprints.map((sprint, sprintIndex) => (
                    <div
                      key={sprintIndex}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="grid gap-4 md:grid-cols-[1fr_180px_180px_1fr_auto]">
                        <div>
                          <FieldLabel>Título do sprint</FieldLabel>
                          <InputField
                            value={sprint.title}
                            onChange={(value) =>
                              updateSprint(eventIndex, sprintIndex, "title", value)
                            }
                            placeholder="Ex: Sprint 1"
                          />
                        </div>
                        <div>
                          <FieldLabel>Data de início</FieldLabel>
                          <InputField
                            type="date"
                            value={sprint.startDate}
                            onChange={(value) =>
                              updateSprint(eventIndex, sprintIndex, "startDate", value)
                            }
                            placeholder=""
                          />
                        </div>
                        <div>
                          <FieldLabel>Data final</FieldLabel>
                          <InputField
                            type="date"
                            value={sprint.endDate}
                            onChange={(value) =>
                              updateSprint(eventIndex, sprintIndex, "endDate", value)
                            }
                            placeholder=""
                          />
                        </div>
                        <div>
                          <FieldLabel>Período</FieldLabel>
                          <InputField
                            value={sprint.period}
                            onChange={(value) =>
                              updateSprint(eventIndex, sprintIndex, "period", value)
                            }
                            placeholder="Ex: Semana 1, Semana 2, 01 a 07 de junho..."
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeSprint(eventIndex, sprintIndex)}
                            disabled={isDisabled}
                            className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <FieldLabel>Entregas do sprint</FieldLabel>
                        <TextAreaField
                          value={sprint.deliverables}
                          onChange={(value) =>
                            updateSprint(eventIndex, sprintIndex, "deliverables", value)
                          }
                          placeholder="Liste as entregas deste sprint. Ex: implementar bio, configurar link, organizar destaques, revisar textos, validar página..."
                          rows={6}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addEvent}
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Nova implementação
        </button>
      </SectionCard>

      <SectionCard
        title="Visão macro da implementação"
        description="Use este campo para explicar a lógica geral de execução, prioridades, ordem das entregas e cuidados importantes."
      >
        <TextAreaField
          value={data.macroVision}
          onChange={(value) => setData((current) => ({ ...current, macroVision: value }))}
          placeholder="Ex: Primeiro concluir diagnóstico e essência do projeto, depois aprovar identidade visual, em seguida produzir conteúdo base, configurar campanhas e acompanhar métricas semanalmente."
          rows={7}
        />
      </SectionCard>

      <SectionCard
        title="Marcos principais"
        description="Registre os momentos mais importantes do projeto."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <FieldLabel>Primeiro marco</FieldLabel>
            <InputField
              value={data.firstMilestone}
              onChange={(value) =>
                setData((current) => ({ ...current, firstMilestone: value }))
              }
              placeholder="Ex: Planejamento aprovado"
            />
          </div>
          <div>
            <FieldLabel>Segundo marco</FieldLabel>
            <InputField
              value={data.secondMilestone}
              onChange={(value) =>
                setData((current) => ({ ...current, secondMilestone: value }))
              }
              placeholder="Ex: Primeiros conteúdos publicados"
            />
          </div>
          <div>
            <FieldLabel>Terceiro marco</FieldLabel>
            <InputField
              value={data.thirdMilestone}
              onChange={(value) =>
                setData((current) => ({ ...current, thirdMilestone: value }))
              }
              placeholder="Ex: Campanha no ar"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Riscos e pontos de atenção"
        description="Liste situações que podem atrasar ou impactar a execução do planejamento."
      >
        <TextAreaField
          value={data.risks}
          onChange={(value) => setData((current) => ({ ...current, risks: value }))}
          placeholder="Ex: Atraso no envio de materiais, falta de aprovação, dependência de terceiros, ausência de fotos, mudanças de escopo, demora na configuração de ferramentas ou falta de verba."
          rows={7}
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a linha do tempo."
      >
        <div className="space-y-4">
          {data.references.map((reference, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <FieldLabel>Título da referência</FieldLabel>
                <InputField
                  value={reference.title}
                  onChange={(value) => updateReference(index, "title", value)}
                  placeholder="Ex: Cronograma, planilha, briefing, calendário ou documento do projeto"
                />
              </div>
              <div>
                <FieldLabel>Link</FieldLabel>
                <InputField
                  type="url"
                  value={reference.link}
                  onChange={(value) => updateReference(index, "link", value)}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  disabled={isDisabled}
                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addReference}
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Nova referência
        </button>
      </SectionCard>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/admin/planejamentos/${clientSlug}`}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Voltar para módulos
        </Link>

        <div className="flex gap-3">
          <Link
            href={presentationHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
