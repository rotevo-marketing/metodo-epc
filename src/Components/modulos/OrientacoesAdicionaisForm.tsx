"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import RichTextEditor from "@/Components/RichTextEditor";

export type PendingItem = {
  title: string;
  description: string;
  responsible: string;
  status: string;
};

export type NextStepItem = {
  title: string;
  description: string;
  priority: string;
};

export type TeamRecommendation = {
  area: string;
  recommendation: string;
};

export type AdditionalGuidelinesData = {
  executionGuidelines: string;
  attentionPoints: string;
  pendingItems: PendingItem[];
  nextSteps: NextStepItem[];
  teamRecommendations: TeamRecommendation[];
  finalObservations: string;
  references: { title: string; link: string }[];
};

type StringFieldKey = "executionGuidelines" | "attentionPoints" | "finalObservations";

export const pendingStatuses = [
  "Pendente",
  "Em andamento",
  "Aguardando cliente",
  "Aguardando equipe",
  "Concluído",
];

export const nextStepPriorities = ["Alta", "Média", "Baixa"];

export const emptyPendingItem: PendingItem = {
  title: "",
  description: "",
  responsible: "",
  status: "Pendente",
};

export const emptyNextStep: NextStepItem = {
  title: "",
  description: "",
  priority: "Alta",
};

export const emptyTeamRecommendation: TeamRecommendation = {
  area: "",
  recommendation: "",
};

export const initialAdditionalGuidelinesData: AdditionalGuidelinesData = {
  executionGuidelines:
    "Use este campo para registrar orientações gerais que devem ser consideradas durante a execução do planejamento, como cuidados de linguagem, prioridades, alinhamentos, limites de escopo, ritmo de aprovação e pontos importantes para a equipe.",
  attentionPoints:
    "Liste aqui riscos, pontos sensíveis, materiais faltantes, acessos pendentes, aprovações necessárias, dependências externas ou qualquer situação que possa impactar a execução do planejamento.",
  pendingItems: [{ ...emptyPendingItem }],
  nextSteps: [{ ...emptyNextStep }],
  teamRecommendations: [
    {
      area: "Social media",
      recommendation:
        "Manter consistência com o tom de voz, linhas editoriais, frequência definida e direcionamento estratégico aprovado.",
    },
    {
      area: "Design",
      recommendation:
        "Seguir identidade visual, referências aprovadas, padrões de criativos e orientações específicas de cada canal.",
    },
    {
      area: "Tráfego pago",
      recommendation:
        "Validar oferta, público, criativos, orçamento, página de destino e métricas antes de ativar campanhas.",
    },
    {
      area: "Atendimento e comercial",
      recommendation:
        "Manter alinhamento com a promessa da campanha, responder com agilidade e registrar dúvidas ou objeções recorrentes.",
    },
  ],
  finalObservations:
    "O planejamento deve ser usado como guia estratégico. Ajustes podem ser feitos ao longo da execução com base em dados, aprovações, mudanças de prioridade e aprendizados gerados pelas campanhas e conteúdos.",
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
  rows: _rows,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
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

interface OrientacoesAdicionaisFormProps {
  data: AdditionalGuidelinesData;
  setData: React.Dispatch<React.SetStateAction<AdditionalGuidelinesData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
}

export default function OrientacoesAdicionaisForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: OrientacoesAdicionaisFormProps) {
  function updateField(key: StringFieldKey, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function updatePendingItem(index: number, key: keyof PendingItem, value: string) {
    setData((current) => {
      const next = [...current.pendingItems];
      next[index] = { ...next[index], [key]: value };
      return { ...current, pendingItems: next };
    });
  }

  function addPendingItem() {
    setData((current) => ({
      ...current,
      pendingItems: [...current.pendingItems, { ...emptyPendingItem }],
    }));
  }

  function removePendingItem(index: number) {
    setData((current) => ({
      ...current,
      pendingItems:
        current.pendingItems.length > 1
          ? current.pendingItems.filter((_, i) => i !== index)
          : [{ ...emptyPendingItem }],
    }));
  }

  function updateNextStep(index: number, key: keyof NextStepItem, value: string) {
    setData((current) => {
      const next = [...current.nextSteps];
      next[index] = { ...next[index], [key]: value };
      return { ...current, nextSteps: next };
    });
  }

  function addNextStep() {
    setData((current) => ({
      ...current,
      nextSteps: [...current.nextSteps, { ...emptyNextStep }],
    }));
  }

  function removeNextStep(index: number) {
    setData((current) => ({
      ...current,
      nextSteps:
        current.nextSteps.length > 1
          ? current.nextSteps.filter((_, i) => i !== index)
          : [{ ...emptyNextStep }],
    }));
  }

  function updateTeamRecommendation(
    index: number,
    key: keyof TeamRecommendation,
    value: string
  ) {
    setData((current) => {
      const next = [...current.teamRecommendations];
      next[index] = { ...next[index], [key]: value };
      return { ...current, teamRecommendations: next };
    });
  }

  function addTeamRecommendation() {
    setData((current) => ({
      ...current,
      teamRecommendations: [
        ...current.teamRecommendations,
        { ...emptyTeamRecommendation },
      ],
    }));
  }

  function removeTeamRecommendation(index: number) {
    setData((current) => ({
      ...current,
      teamRecommendations:
        current.teamRecommendations.length > 1
          ? current.teamRecommendations.filter((_, i) => i !== index)
          : [{ ...emptyTeamRecommendation }],
    }));
  }

  function updateReference(index: number, key: "title" | "link", value: string) {
    setData((current) => {
      const next = [...current.references];
      next[index] = { ...next[index], [key]: value };
      return { ...current, references: next };
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
        title="Orientações gerais da execução"
        description="Use este campo para registrar cuidados, alinhamentos e recomendações finais que devem ser considerados na execução do planejamento."
      >
        <TextAreaField
          value={data.executionGuidelines}
          onChange={(value) => updateField("executionGuidelines", value)}
          placeholder="Ex: Cuidados com linguagem, prioridades da execução, limites de escopo, alinhamentos com cliente, padrão de aprovação e recomendações importantes."
          rows={8}
        />
      </SectionCard>

      <SectionCard
        title="Pontos de atenção"
        description="Liste riscos, cuidados, materiais faltantes, acessos pendentes, aprovações necessárias ou dependências que podem impactar a execução."
      >
        <TextAreaField
          value={data.attentionPoints}
          onChange={(value) => updateField("attentionPoints", value)}
          placeholder="Ex: Envio de fotos, aprovação da identidade visual, liberação de acessos, orçamento pendente, dependência de terceiros, validação de calendário..."
          rows={8}
        />
      </SectionCard>

      <SectionCard
        title="Pendências"
        description="Liste o que ainda precisa ser enviado, aprovado, configurado ou decidido para que a execução avance."
      >
        <div className="space-y-4">
          {data.pendingItems.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="grid gap-4 md:grid-cols-[1fr_220px_220px_auto]">
                <div>
                  <FieldLabel>Pendência</FieldLabel>
                  <InputField
                    value={item.title}
                    onChange={(value) => updatePendingItem(index, "title", value)}
                    placeholder="Ex: Enviar fotos, liberar acesso, aprovar identidade visual..."
                  />
                </div>
                <div>
                  <FieldLabel>Responsável</FieldLabel>
                  <InputField
                    value={item.responsible}
                    onChange={(value) => updatePendingItem(index, "responsible", value)}
                    placeholder="Ex: Cliente, equipe, designer..."
                  />
                </div>
                <div>
                  <FieldLabel>Status</FieldLabel>
                  <SelectField
                    value={item.status}
                    onChange={(value) => updatePendingItem(index, "status", value)}
                    options={pendingStatuses}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removePendingItem(index)}
                    disabled={isDisabled}
                    className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <FieldLabel>Descrição da pendência</FieldLabel>
                <TextAreaField
                  value={item.description}
                  onChange={(value) => updatePendingItem(index, "description", value)}
                  placeholder="Explique o que está pendente, por que isso importa e qual impacto pode ter na execução."
                  rows={5}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPendingItem}
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:border-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Nova pendência
        </button>
      </SectionCard>

      <SectionCard
        title="Próximos passos"
        description="Registre as próximas ações que devem acontecer depois da entrega ou aprovação do planejamento."
      >
        <div className="space-y-4">
          {data.nextSteps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
                <div>
                  <FieldLabel>Próximo passo</FieldLabel>
                  <InputField
                    value={step.title}
                    onChange={(value) => updateNextStep(index, "title", value)}
                    placeholder="Ex: Criar calendário no Notion, configurar campanha, revisar métricas..."
                  />
                </div>
                <div>
                  <FieldLabel>Prioridade</FieldLabel>
                  <SelectField
                    value={step.priority}
                    onChange={(value) => updateNextStep(index, "priority", value)}
                    options={nextStepPriorities}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeNextStep(index)}
                    disabled={isDisabled}
                    className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <FieldLabel>Descrição do próximo passo</FieldLabel>
                <TextAreaField
                  value={step.description}
                  onChange={(value) => updateNextStep(index, "description", value)}
                  placeholder="Explique o que precisa ser feito, por quem e qual resultado esperado."
                  rows={5}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addNextStep}
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:border-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Novo próximo passo
        </button>
      </SectionCard>

      <SectionCard
        title="Recomendações para a equipe"
        description="Registre orientações específicas para social media, design, tráfego, atendimento, comercial, redator ou outras áreas envolvidas."
      >
        <div className="space-y-4">
          {data.teamRecommendations.map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"
            >
              <div>
                <FieldLabel>Área ou responsável</FieldLabel>
                <InputField
                  value={item.area}
                  onChange={(value) => updateTeamRecommendation(index, "area", value)}
                  placeholder="Ex: Social media, design, tráfego pago..."
                />
              </div>
              <div>
                <FieldLabel>Recomendação</FieldLabel>
                <InputField
                  value={item.recommendation}
                  onChange={(value) =>
                    updateTeamRecommendation(index, "recommendation", value)
                  }
                  placeholder="Explique a recomendação para essa área."
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeTeamRecommendation(index)}
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
          onClick={addTeamRecommendation}
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:border-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Nova recomendação
        </button>
      </SectionCard>

      <SectionCard
        title="Observações finais"
        description="Registre orientações de fechamento, contexto adicional ou lembretes importantes para a continuidade do projeto."
      >
        <TextAreaField
          value={data.finalObservations}
          onChange={(value) => updateField("finalObservations", value)}
          placeholder="Ex: O planejamento deve ser usado como guia estratégico. Ajustes podem ser feitos com base em dados, aprovações e mudanças de prioridade."
          rows={7}
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Adicione links complementares, documentos, prints, referências, pastas, exemplos ou materiais de apoio."
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
                  placeholder="Ex: Documento, pasta, print, referência visual ou material de apoio"
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:border-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
