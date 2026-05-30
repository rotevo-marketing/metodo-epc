import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
} from "./ChannelPresentationShared";

type DriveFolder = { title: string; description: string; link: string };
type ApprovalStep = { title: string; description: string };

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
  references: { title: string; link: string }[];
};

function isCalendarData(v: unknown): v is ContentCalendarData {
  return typeof v === "object" && v !== null && "calendarTitle" in v;
}

export default function CalendarioConteudoPresentation({ data }: { data: unknown }) {
  const d = isCalendarData(data) ? data : null;
  const filledApprovalSteps = (d?.approvalSteps ?? []).filter((s) => s.title?.trim());
  const filledDriveFolders = (d?.driveFolders ?? []).filter((f) => f.title?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="calendario-de-conteudo"
        group="Execução, Acompanhamento e Gestão"
        title="Calendário de Conteúdo"
        description="Estrutura operacional do calendário editorial: plataforma, acesso, fluxo de aprovação e organização no Drive."
      />

      {(d?.calendarTitle || d?.platform || d?.calendarLink || d?.calendarFunction) && (
        <SectionCard title="Configuração do calendário">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Nome do calendário" value={d?.calendarTitle ?? ""} />
            <FieldBlock label="Plataforma" value={d?.platform ?? ""} />
            <FieldBlock label="Função do calendário" value={d?.calendarFunction ?? ""} />
            <FieldBlock label="Responsáveis" value={d?.responsiblePeople ?? ""} />
          </div>
          {d?.calendarLink && (
            <div className="mt-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Link de acesso
              </p>
              <a
                href={d.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                {d.calendarLink}
              </a>
            </div>
          )}
        </SectionCard>
      )}

      {(d?.usageGuidelines || d?.updateFrequency || d?.updateRoutine || d?.notionStructure) && (
        <SectionCard title="Uso e atualização">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Diretrizes de uso" value={d?.usageGuidelines ?? ""} />
            <FieldBlock label="Frequência de atualização" value={d?.updateFrequency ?? ""} />
            <FieldBlock label="Rotina de atualização" value={d?.updateRoutine ?? ""} />
          </div>
          {d?.notionStructure && (
            <div className="mt-4">
              <FieldBlock label="Estrutura no Notion" value={d.notionStructure} />
            </div>
          )}
        </SectionCard>
      )}

      {(d?.approvalFlowDescription || filledApprovalSteps.length > 0 || d?.approvalRules) && (
        <SectionCard title="Fluxo de aprovação">
          {d?.approvalFlowDescription && (
            <div className="mb-4">
              <FieldBlock label="Descrição do fluxo" value={d.approvalFlowDescription} />
            </div>
          )}
          {filledApprovalSteps.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Etapas de aprovação
              </p>
              <div className="space-y-2">
                {filledApprovalSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-950">{step.title}</p>
                      {step.description && (
                        <p className="mt-0.5 text-xs text-slate-500">{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {d?.approvalRules && (
            <FieldBlock label="Regras do fluxo" value={d.approvalRules} />
          )}
        </SectionCard>
      )}

      {(d?.driveMainFolderTitle || d?.driveMainFolderLink || d?.driveFolderStructure || filledDriveFolders.length > 0) && (
        <SectionCard title="Organização no Drive">
          {(d?.driveMainFolderTitle || d?.driveMainFolderLink) && (
            <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
              <p className="text-xs font-semibold text-slate-400">Pasta principal</p>
              <p className="mt-1 text-sm font-medium text-slate-950">
                {d?.driveMainFolderTitle}
              </p>
              {d?.driveMainFolderLink && (
                <a
                  href={d.driveMainFolderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs text-indigo-600 hover:underline"
                >
                  {d.driveMainFolderLink}
                </a>
              )}
            </div>
          )}
          {d?.driveFolderStructure && (
            <div className="mb-4">
              <FieldBlock label="Estrutura de pastas" value={d.driveFolderStructure} />
            </div>
          )}
          {filledDriveFolders.length > 0 && (
            <div className="space-y-2">
              {filledDriveFolders.map((folder, i) => (
                <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-950">{folder.title}</span>
                    {folder.link && (
                      <a
                        href={folder.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:underline"
                      >
                        Acessar
                      </a>
                    )}
                  </div>
                  {folder.description && (
                    <p className="mt-1 text-xs text-slate-500">{folder.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {d?.strategicObservations && (
        <SectionCard title="Observações estratégicas">
          <FieldBlock label="Observações" value={d.strategicObservations} />
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
