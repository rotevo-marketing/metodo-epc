import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
} from "./ChannelPresentationShared";

type PendingItem = {
  title: string;
  description: string;
  responsible: string;
  status: string;
};

type NextStepItem = {
  title: string;
  description: string;
  priority: string;
};

type TeamRecommendation = {
  area: string;
  recommendation: string;
};

type AdditionalGuidelinesData = {
  executionGuidelines: string;
  attentionPoints: string;
  pendingItems: PendingItem[];
  nextSteps: NextStepItem[];
  teamRecommendations: TeamRecommendation[];
  finalObservations: string;
  references: { title: string; link: string }[];
};

function isGuidelinesData(v: unknown): v is AdditionalGuidelinesData {
  return typeof v === "object" && v !== null && "executionGuidelines" in v;
}

const priorityColors: Record<string, string> = {
  Alta: "bg-red-100 text-red-700",
  Média: "bg-amber-100 text-amber-700",
  Baixa: "bg-slate-100 text-slate-600",
};

const statusColors: Record<string, string> = {
  Pendente: "bg-amber-100 text-amber-700",
  "Em andamento": "bg-blue-100 text-blue-700",
  Concluído: "bg-emerald-100 text-emerald-700",
  Bloqueado: "bg-red-100 text-red-700",
};

export default function OrientacoesAdicionaisPresentation({ data }: { data: unknown }) {
  const d = isGuidelinesData(data) ? data : null;
  const filledPendingItems = (d?.pendingItems ?? []).filter((p) => p.title?.trim());
  const filledNextSteps = (d?.nextSteps ?? []).filter((n) => n.title?.trim());
  const filledTeamRecommendations = (d?.teamRecommendations ?? []).filter((r) => r.area?.trim() || r.recommendation?.trim());

  return (
    <article className="space-y-6">
      <ModuleHeader
        slug="orientacoes-adicionais"
        group="Execução, Acompanhamento e Gestão"
        title="Orientações Adicionais"
        description="Diretrizes finais de execução, pontos de atenção, itens pendentes, próximos passos e recomendações para o time."
      />

      {(d?.executionGuidelines || d?.attentionPoints) && (
        <SectionCard title="Diretrizes de execução">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Diretrizes de execução" value={d?.executionGuidelines ?? ""} />
            <FieldBlock label="Pontos de atenção" value={d?.attentionPoints ?? ""} />
          </div>
        </SectionCard>
      )}

      {filledPendingItems.length > 0 && (
        <SectionCard title="Itens pendentes">
          <div className="space-y-3">
            {filledPendingItems.map((item, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  {item.status && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[item.status] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  {item.responsible && (
                    <span className="ml-auto text-xs text-slate-400">{item.responsible}</span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {filledNextSteps.length > 0 && (
        <SectionCard title="Próximos passos">
          <div className="space-y-3">
            {filledNextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-950">{step.title}</p>
                    {step.priority && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          priorityColors[step.priority] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {step.priority}
                      </span>
                    )}
                  </div>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-slate-600">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {filledTeamRecommendations.length > 0 && (
        <SectionCard title="Recomendações para o time">
          <div className="space-y-2">
            {filledTeamRecommendations.map((rec, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                {rec.area && (
                  <p className="text-xs font-semibold text-indigo-600">{rec.area}</p>
                )}
                {rec.recommendation && (
                  <p className="mt-1 text-sm text-slate-700">{rec.recommendation}</p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {d?.finalObservations && (
        <SectionCard title="Observações finais">
          <FieldBlock label="Observações" value={d.finalObservations} />
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
