"use client";

import { useEffect, useState, type ReactNode } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-calendario-de-conteudo";

type DriveFolder = {
  title: string;
  description: string;
  link: string;
};

type ApprovalStep = {
  title: string;
  description: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type ContentCalendarData = {
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
  references: ExternalReference[];
};

const platforms = ["Notion", "Google Sheets", "ClickUp", "Trello", "Airtable", "Outra"];

const updateFrequencies = [
  "Diária",
  "Semanal",
  "Quinzenal",
  "Mensal",
  "Conforme demanda",
];

const defaultApprovalSteps: ApprovalStep[] = [
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

const defaultDriveFolders: DriveFolder[] = [
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
    description: "Criativos de Meta Ads, YouTube Ads, campanhas e variações para tráfego pago.",
    link: "",
  },
  {
    title: "05 - Documentos do Projeto",
    description: "Contrato, notas fiscais, relatórios, documentos estratégicos e arquivos administrativos.",
    link: "",
  },
  {
    title: "06 - Reuniões",
    description: "Gravações, atas, alinhamentos, materiais de reunião e decisões importantes.",
    link: "",
  },
];

const initialData: ContentCalendarData = {
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

function PageSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-80 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block">
      <a href="/admin" className="block">
        <h1 className="text-2xl font-bold">Rotevo</h1>
        <p className="mt-2 text-sm text-slate-500">Painel administrativo</p>
      </a>

      <div className="mt-8 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Planejamento
        </p>
        <p className="mt-1 font-bold">Cliente Demo</p>
      </div>

      <nav className="mt-8 space-y-6">
        {moduleCategories.map((category) => (
          <div key={category}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {category}
            </p>

            <div className="space-y-1">
              {planningModules
                .filter((module) => module.category === category)
                .map((module) => {
                  const isActive = module.slug === "calendario-de-conteudo";

                  return (
                    <a
                      key={module.slug}
                      href={`/admin/planejamentos/demo/modulos/${module.slug}`}
                      className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-slate-100 text-slate-950"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      }`}
                    >
                      {module.title}
                    </a>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

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
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
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
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function CalendarioDeConteudoPage() {
  const [data, setData] = useState<ContentCalendarData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        calendarTitle: parsed.calendarTitle || "",
        platform: parsed.platform || "Notion",
        calendarLink: parsed.calendarLink || "",
        calendarFunction: parsed.calendarFunction || initialData.calendarFunction,
        usageGuidelines: parsed.usageGuidelines || initialData.usageGuidelines,
        responsiblePeople: parsed.responsiblePeople || "",
        updateFrequency: parsed.updateFrequency || "Semanal",
        updateRoutine: parsed.updateRoutine || initialData.updateRoutine,
        notionStructure: parsed.notionStructure || initialData.notionStructure,
        approvalFlowDescription:
          parsed.approvalFlowDescription || initialData.approvalFlowDescription,
        approvalSteps:
          Array.isArray(parsed.approvalSteps) && parsed.approvalSteps.length
            ? parsed.approvalSteps.map((step: Partial<ApprovalStep>) => ({
                title: step.title || "",
                description: step.description || "",
              }))
            : defaultApprovalSteps,
        approvalRules: parsed.approvalRules || initialData.approvalRules,
        driveMainFolderTitle: parsed.driveMainFolderTitle || "",
        driveMainFolderLink: parsed.driveMainFolderLink || "",
        driveFolderStructure:
          parsed.driveFolderStructure || initialData.driveFolderStructure,
        driveFolders:
          Array.isArray(parsed.driveFolders) && parsed.driveFolders.length
            ? parsed.driveFolders.map((folder: Partial<DriveFolder>) => ({
                title: folder.title || "",
                description: folder.description || "",
                link: folder.link || "",
              }))
            : defaultDriveFolders,
        strategicObservations:
          parsed.strategicObservations || initialData.strategicObservations,
        references:
          Array.isArray(parsed.references) && parsed.references.length
            ? parsed.references.map((reference: Partial<ExternalReference>) => ({
                title: reference.title || "",
                link: reference.link || "",
              }))
            : [{ title: "", link: "" }],
      });
    } catch {
      setData(initialData);
    }
  }, []);

  function saveData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedMessage("Módulo salvo com sucesso.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2800);
  }

  function updateField(key: keyof ContentCalendarData, value: string) {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateApprovalStep(
    index: number,
    key: keyof ApprovalStep,
    value: string
  ) {
    setData((current) => {
      const nextSteps = [...current.approvalSteps];

      nextSteps[index] = {
        ...nextSteps[index],
        [key]: value,
      };

      return {
        ...current,
        approvalSteps: nextSteps,
      };
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
          ? current.approvalSteps.filter((_, stepIndex) => stepIndex !== index)
          : [{ title: "", description: "" }],
    }));
  }

  function updateDriveFolder(
    index: number,
    key: keyof DriveFolder,
    value: string
  ) {
    setData((current) => {
      const nextFolders = [...current.driveFolders];

      nextFolders[index] = {
        ...nextFolders[index],
        [key]: value,
      };

      return {
        ...current,
        driveFolders: nextFolders,
      };
    });
  }

  function addDriveFolder() {
    setData((current) => ({
      ...current,
      driveFolders: [
        ...current.driveFolders,
        { title: "", description: "", link: "" },
      ],
    }));
  }

  function removeDriveFolder(index: number) {
    setData((current) => ({
      ...current,
      driveFolders:
        current.driveFolders.length > 1
          ? current.driveFolders.filter((_, folderIndex) => folderIndex !== index)
          : [{ title: "", description: "", link: "" }],
    }));
  }

  function updateReference(
    index: number,
    key: keyof ExternalReference,
    value: string
  ) {
    setData((current) => {
      const nextReferences = [...current.references];

      nextReferences[index] = {
        ...nextReferences[index],
        [key]: value,
      };

      return {
        ...current,
        references: nextReferences,
      };
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
          ? current.references.filter((_, referenceIndex) => referenceIndex !== index)
          : [{ title: "", link: "" }],
    }));
  }

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <PageSidebar />

      <section className="min-h-screen p-6 lg:ml-80 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <a
                href="/admin"
                className="text-sm font-semibold text-slate-500 hover:text-slate-950"
              >
                ← Voltar para planejamentos
              </a>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Execução, Acompanhamento e Gestão
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Calendário de Conteúdo
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Configure o calendário operacional de conteúdo, a estrutura de aprovação no Notion e a organização dos arquivos do cliente no Drive.
              </p>

              {savedMessage && (
                <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {savedMessage}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/apresentacao/demo"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver apresentação
              </a>

              <button
                type="button"
                onClick={saveData}
                className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Salvar módulo
              </button>
            </div>
          </div>

          <form className="space-y-6">
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

            <div className="grid gap-6 lg:grid-cols-2">
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
                onChange={(value) =>
                  updateField("approvalFlowDescription", value)
                }
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
                        onChange={(value) =>
                          updateApprovalStep(index, "title", value)
                        }
                        placeholder="Ex: Produção, revisão, aprovação..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Descrição da etapa</FieldLabel>
                      <InputField
                        value={step.description}
                        onChange={(value) =>
                          updateApprovalStep(index, "description", value)
                        }
                        placeholder="Explique o que acontece nesta etapa."
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeApprovalStep(index)}
                        className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
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
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
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
              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                <div>
                  <FieldLabel>Nome da pasta principal</FieldLabel>
                  <InputField
                    value={data.driveMainFolderTitle}
                    onChange={(value) =>
                      updateField("driveMainFolderTitle", value)
                    }
                    placeholder="Ex: Cliente Demo, Nome do Cliente..."
                  />
                </div>

                <div>
                  <FieldLabel>Link da pasta principal no Drive</FieldLabel>
                  <InputField
                    type="url"
                    value={data.driveMainFolderLink}
                    onChange={(value) =>
                      updateField("driveMainFolderLink", value)
                    }
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
                          onChange={(value) =>
                            updateDriveFolder(index, "title", value)
                          }
                          placeholder="Ex: 01 - Identidade Visual"
                        />
                      </div>

                      <div>
                        <FieldLabel>Link da pasta</FieldLabel>
                        <InputField
                          type="url"
                          value={folder.link}
                          onChange={(value) =>
                            updateDriveFolder(index, "link", value)
                          }
                          placeholder="https://drive.google.com/..."
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeDriveFolder(index)}
                          className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <FieldLabel>Descrição da pasta</FieldLabel>
                      <InputField
                        value={folder.description}
                        onChange={(value) =>
                          updateDriveFolder(index, "description", value)
                        }
                        placeholder="Explique o que será guardado nesta pasta."
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addDriveFolder}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
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
                onChange={(value) =>
                  updateField("strategicObservations", value)
                }
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
                        onChange={(value) =>
                          updateReference(index, "title", value)
                        }
                        placeholder="Ex: Calendário, pasta, documento, briefing ou referência externa"
                      />
                    </div>

                    <div>
                      <FieldLabel>Link</FieldLabel>
                      <InputField
                        type="url"
                        value={reference.link}
                        onChange={(value) =>
                          updateReference(index, "link", value)
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeReference(index)}
                        className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
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
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
              >
                + Nova referência
              </button>
            </SectionCard>

            <div className="sticky bottom-0 -mx-6 border-t border-slate-200 bg-slate-100/90 px-6 py-5 backdrop-blur lg:-mx-10 lg:px-10">
              <div className="mx-auto flex max-w-6xl flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <a
                  href="/admin"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Voltar para planejamentos
                </a>

                <a
                  href="/apresentacao/demo"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Ver apresentação
                </a>

                <button
                  type="button"
                  onClick={saveData}
                  className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Salvar módulo
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}