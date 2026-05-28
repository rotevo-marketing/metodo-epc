"use client";

import { type ReactNode } from "react";
import Link from "next/link";

export type DriveFolder = {
  title: string;
  description: string;
  link: string;
};

export type ApprovalStep = {
  title: string;
  description: string;
};

export type ContentCalendarData = {
  calendarTitle: string;
  platform: string;
  calendarLink: string;
  calendarFunction: string;
  usageGuidelines: string;
  responsiblePeople: string;
  updateFrequency: string;
  updateRoutine: string;
  notionStructure: string;
  approvalFlowDescription: string;
  approvalSteps: ApprovalStep[];
  approvalRules: string;
  driveMainFolderTitle: string;
  driveMainFolderLink: string;
  driveFolderStructure: string;
  driveFolders: DriveFolder[];
  strategicObservations: string;
  references: { title: string; link: string }[];
};

type StringFieldKey =
  | "calendarTitle"
  | "platform"
  | "calendarLink"
  | "calendarFunction"
  | "usageGuidelines"
  | "responsiblePeople"
  | "updateFrequency"
  | "updateRoutine"
  | "notionStructure"
  | "approvalFlowDescription"
  | "approvalRules"
  | "driveMainFolderTitle"
  | "driveMainFolderLink"
  | "driveFolderStructure"
  | "strategicObservations";

export const platforms = [
  "Notion",
  "Google Sheets",
  "ClickUp",
  "Trello",
  "Airtable",
  "Outra",
];

export const updateFrequencies = [
  "Diária",
  "Semanal",
  "Quinzenal",
  "Mensal",
  "Conforme demanda",
];

export const defaultApprovalSteps: ApprovalStep[] = [
  {
    title: "Produção",
    description:
      "Conteúdo entra em produção com base no planejamento, linha editorial, formato, canal e data prevista.",
  },
  {
    title: "Revisão",
    description:
      "Conteúdo é revisado para conferir clareza, tom de voz, estratégia, legenda, criativo e adequação ao canal.",
  },
  {
    title: "Ajustes",
    description:
      "Ajustes solicitados são aplicados antes da aprovação final, mantendo o histórico organizado no calendário.",
  },
  {
    title: "Aprovação",
    description:
      "Cliente ou responsável valida o conteúdo dentro do prazo combinado para seguir para agendamento.",
  },
  {
    title: "Agendamento",
    description:
      "Conteúdo aprovado é agendado no canal correspondente, com data, horário, legenda e criativo corretos.",
  },
  {
    title: "Publicado",
    description:
      "Conteúdo publicado é marcado no calendário, com link da publicação e observações de acompanhamento.",
  },
];

export const defaultDriveFolders: DriveFolder[] = [
  {
    title: "01 - Identidade Visual",
    description: "Logo, paleta de cores, fontes e arquivos visuais da marca.",
    link: "",
  },
  {
    title: "02 - Conteúdo Gravado",
    description: "Vídeos, reels, conteúdos para YouTube, stories e materiais gravados.",
    link: "",
  },
  {
    title: "03 - Materiais Ricos",
    description: "E-books, apresentações, PDFs, planilhas e materiais de apoio.",
    link: "",
  },
  {
    title: "04 - Criativos para Anúncios",
    description:
      "Criativos de Meta Ads, YouTube Ads, campanhas e variações para tráfego pago.",
    link: "",
  },
  {
    title: "05 - Documentos do Projeto",
    description:
      "Contrato, notas fiscais, relatórios, documentos estratégicos e arquivos administrativos.",
    link: "",
  },
  {
    title: "06 - Reuniões",
    description:
      "Gravações, atas, alinhamentos, materiais de reunião e decisões importantes.",
    link: "",
  },
];

export const initialContentCalendarData: ContentCalendarData = {
  calendarTitle: "",
  platform: "Notion",
  calendarLink: "",
  calendarFunction:
    "O calendário será usado para organizar a produção editorial, acompanhar o andamento dos conteúdos, registrar responsáveis, centralizar prazos e facilitar a aprovação antes da publicação.",
  usageGuidelines:
    "Atualizar o calendário conforme o ritmo de produção, manter status sempre visível, registrar responsáveis, anexar links dos criativos, sinalizar conteúdos pendentes de aprovação e marcar conteúdos publicados com seus respectivos links.",
  responsiblePeople: "",
  updateFrequency: "Semanal",
  updateRoutine:
    "Revisar status das publicações, atualizar responsáveis, conferir conteúdos em aprovação, registrar ajustes solicitados e fechar o calendário do próximo período com antecedência.",
  notionStructure:
    "Colunas recomendadas: data, canal, formato, linha editorial, tema, legenda, status, responsável, link do criativo, link do conteúdo publicado, campanha relacionada, prioridade e observações.",
  approvalFlowDescription:
    "Os conteúdos devem passar por produção, revisão, ajustes, aprovação, agendamento e publicação. Cada etapa deve ficar registrada para evitar retrabalho e perda de prazo.",
  approvalSteps: defaultApprovalSteps,
  approvalRules:
    "Definir prazo mínimo para aprovação, responsáveis por validar cada tipo de conteúdo, forma de solicitar ajustes, limite de alterações e regra para conteúdos urgentes.",
  driveMainFolderTitle: "",
  driveMainFolderLink: "",
  driveFolderStructure:
    "A pasta do cliente no Drive deve centralizar todos os arquivos operacionais do projeto, organizados por identidade visual, conteúdos gravados, materiais ricos, criativos para anúncios, documentos do projeto e reuniões.",
  driveFolders: defaultDriveFolders,
  strategicObservations:
    "O planejamento estratégico fica no site. O Notion deve ser usado como ferramenta operacional para calendário, produção, status e aprovação. O Drive deve guardar arquivos, criativos, gravações, documentos e materiais de referência.",
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

interface CalendarioConteudoFormProps {
  data: ContentCalendarData;
  setData: React.Dispatch<React.SetStateAction<ContentCalendarData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
}

export default function CalendarioConteudoForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: CalendarioConteudoFormProps) {
  function updateField(key: StringFieldKey, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function updateApprovalStep(index: number, key: keyof ApprovalStep, value: string) {
    setData((current) => {
      const nextSteps = [...current.approvalSteps];
      nextSteps[index] = { ...nextSteps[index], [key]: value };
      return { ...current, approvalSteps: nextSteps };
    });
  }

  function addApprovalStep() {
    setData((current) => ({
      ...current,
      approvalSteps: [...current.approvalSteps, { title: "", description: "" }],
    }));
  }

  function removeApprovalStep(index: number) {
    setData((current) => ({
      ...current,
      approvalSteps:
        current.approvalSteps.length > 1
          ? current.approvalSteps.filter((_, i) => i !== index)
          : [{ title: "", description: "" }],
    }));
  }

  function updateDriveFolder(index: number, key: keyof DriveFolder, value: string) {
    setData((current) => {
      const nextFolders = [...current.driveFolders];
      nextFolders[index] = { ...nextFolders[index], [key]: value };
      return { ...current, driveFolders: nextFolders };
    });
  }

  function addDriveFolder() {
    setData((current) => ({
      ...current,
      driveFolders: [...current.driveFolders, { title: "", description: "", link: "" }],
    }));
  }

  function removeDriveFolder(index: number) {
    setData((current) => ({
      ...current,
      driveFolders:
        current.driveFolders.length > 1
          ? current.driveFolders.filter((_, i) => i !== index)
          : [{ title: "", description: "", link: "" }],
    }));
  }

  function updateReference(index: number, key: "title" | "link", value: string) {
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
        title="Calendário principal"
        description="Informe onde o calendário editorial será organizado. A recomendação principal é usar o Notion como calendário de produção, acompanhamento e aprovação."
      >
        <div className="grid gap-4 md:grid-cols-[1fr_240px]">
          <div>
            <FieldLabel>Título do calendário</FieldLabel>
            <InputField
              value={data.calendarTitle}
              onChange={(value) => updateField("calendarTitle", value)}
              placeholder="Ex: Calendário Editorial Mensal, Calendário de Conteúdo 2026..."
            />
          </div>
          <div>
            <FieldLabel>Plataforma utilizada</FieldLabel>
            <SelectField
              value={data.platform}
              onChange={(value) => updateField("platform", value)}
              options={platforms}
            />
          </div>
        </div>

        <div className="mt-4">
          <FieldLabel>Link do calendário no Notion</FieldLabel>
          <InputField
            type="url"
            value={data.calendarLink}
            onChange={(value) => updateField("calendarLink", value)}
            placeholder="https://notion.so/..."
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={data.calendarLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Abrir calendário no Notion
          </a>
          <a
            href={data.driveMainFolderLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Abrir pasta do cliente
          </a>
        </div>
      </SectionCard>

      <SectionCard
        title="Função do calendário"
        description="Explique o papel do Notion dentro da operação. O planejamento estratégico fica no site, enquanto o Notion organiza produção, status e aprovação."
      >
        <TextAreaField
          value={data.calendarFunction}
          onChange={(value) => updateField("calendarFunction", value)}
          placeholder="Explique a função do calendário dentro da produção de conteúdo."
          rows={7}
        />
      </SectionCard>

      <SectionCard
        title="Como usar este calendário"
        description="Defina as regras de uso para manter o calendário organizado para equipe, cliente e responsáveis pela aprovação."
      >
        <TextAreaField
          value={data.usageGuidelines}
          onChange={(value) => updateField("usageGuidelines", value)}
          placeholder="Ex: Atualizar semanalmente, revisar status das publicações, manter links dos criativos..."
          rows={7}
        />
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Responsáveis pela atualização"
          description="Liste quem será responsável por manter o calendário atualizado."
        >
          <TextAreaField
            value={data.responsiblePeople}
            onChange={(value) => updateField("responsiblePeople", value)}
            placeholder="Ex: Estrategista, social media, designer, redator, gestor de tráfego, cliente ou equipe interna."
            rows={7}
          />
        </SectionCard>

        <SectionCard
          title="Frequência de atualização"
          description="Defina com que frequência o calendário deve ser revisado."
        >
          <SelectField
            value={data.updateFrequency}
            onChange={(value) => updateField("updateFrequency", value)}
            options={updateFrequencies}
          />
          <div className="mt-4">
            <TextAreaField
              value={data.updateRoutine}
              onChange={(value) => updateField("updateRoutine", value)}
              placeholder="Ex: Revisar toda segunda-feira, atualizar status diariamente e fechar calendário do mês seguinte na última semana do mês."
              rows={6}
            />
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Estrutura recomendada no Notion"
        description="Registre quais colunas e visualizações o calendário deve ter dentro do Notion."
      >
        <TextAreaField
          value={data.notionStructure}
          onChange={(value) => updateField("notionStructure", value)}
          placeholder="Ex: Data, canal, formato, linha editorial, tema, legenda, status, responsável..."
          rows={8}
        />
      </SectionCard>

      <SectionCard
        title="Fluxo de aprovação dos conteúdos"
        description="Defina como os conteúdos devem passar por produção, revisão, ajustes, aprovação, agendamento e publicação."
      >
        <TextAreaField
          value={data.approvalFlowDescription}
          onChange={(value) => updateField("approvalFlowDescription", value)}
          placeholder="Explique a lógica geral de aprovação dos conteúdos."
          rows={5}
        />

        <div className="mt-6 space-y-4">
          {data.approvalSteps.map((step, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"
            >
              <div>
                <FieldLabel>Etapa</FieldLabel>
                <InputField
                  value={step.title}
                  onChange={(value) => updateApprovalStep(index, "title", value)}
                  placeholder="Ex: Produção, revisão, aprovação..."
                />
              </div>
              <div>
                <FieldLabel>Descrição da etapa</FieldLabel>
                <InputField
                  value={step.description}
                  onChange={(value) => updateApprovalStep(index, "description", value)}
                  placeholder="Explique o que acontece nesta etapa."
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeApprovalStep(index)}
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
          onClick={addApprovalStep}
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Nova etapa
        </button>

        <div className="mt-6">
          <FieldLabel>Regras de aprovação</FieldLabel>
          <TextAreaField
            value={data.approvalRules}
            onChange={(value) => updateField("approvalRules", value)}
            placeholder="Ex: O cliente aprova até sexta-feira, conteúdos urgentes devem ser sinalizados, alterações ficam registradas no Notion..."
            rows={6}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Pasta do cliente no Drive"
        description="Centralize o link da pasta principal do cliente e explique como os arquivos devem ser organizados."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>Nome da pasta principal</FieldLabel>
            <InputField
              value={data.driveMainFolderTitle}
              onChange={(value) => updateField("driveMainFolderTitle", value)}
              placeholder="Ex: Cliente Demo, Nome do Cliente..."
            />
          </div>
          <div>
            <FieldLabel>Link da pasta principal no Drive</FieldLabel>
            <InputField
              type="url"
              value={data.driveMainFolderLink}
              onChange={(value) => updateField("driveMainFolderLink", value)}
              placeholder="https://drive.google.com/..."
            />
          </div>
        </div>

        <div className="mt-4">
          <FieldLabel>Estrutura da pasta do cliente</FieldLabel>
          <TextAreaField
            value={data.driveFolderStructure}
            onChange={(value) => updateField("driveFolderStructure", value)}
            placeholder="Explique como a pasta do cliente deve ser organizada."
            rows={6}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Subpastas operacionais do Drive"
        description="Cadastre os principais links usados pela equipe para acessar identidade visual, conteúdos gravados, materiais ricos, criativos, documentos e reuniões."
      >
        <div className="space-y-4">
          {data.driveFolders.map((folder, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                <div>
                  <FieldLabel>Nome da pasta</FieldLabel>
                  <InputField
                    value={folder.title}
                    onChange={(value) => updateDriveFolder(index, "title", value)}
                    placeholder="Ex: 01 - Identidade Visual"
                  />
                </div>
                <div>
                  <FieldLabel>Link da pasta</FieldLabel>
                  <InputField
                    type="url"
                    value={folder.link}
                    onChange={(value) => updateDriveFolder(index, "link", value)}
                    placeholder="https://drive.google.com/..."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeDriveFolder(index)}
                    disabled={isDisabled}
                    className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <FieldLabel>Descrição da pasta</FieldLabel>
                <InputField
                  value={folder.description}
                  onChange={(value) => updateDriveFolder(index, "description", value)}
                  placeholder="Explique o que será guardado nesta pasta."
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addDriveFolder}
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Nova pasta
        </button>
      </SectionCard>

      <SectionCard
        title="Observações estratégicas"
        description="Registre orientações importantes para o uso do calendário, organização do Drive e rotina de aprovação."
      >
        <TextAreaField
          value={data.strategicObservations}
          onChange={(value) => updateField("strategicObservations", value)}
          placeholder="Ex: O planejamento fica no site. O Notion organiza produção e aprovação. O Drive guarda arquivos do projeto."
          rows={7}
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a acessar documentos complementares."
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
                  placeholder="Ex: Calendário, pasta, documento, briefing ou referência externa"
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
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
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
