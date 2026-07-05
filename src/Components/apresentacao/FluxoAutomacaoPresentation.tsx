import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
} from "./ChannelPresentationShared";
import { RichText } from "./RichText";

type AutomationTag = { name: string; description: string };
type ChannelPriority = { flow: string; dominantChannel: string; supportChannel: string };
type FlowCadence = { flow: string; cadence: string };
type AutomationStep = { moment: string; channel: string; type: string; title: string; purpose: string; condition: string; cta: string };
type AutomationFlow = {
  code: string;
  name: string;
  objective: string;
  dominantChannel: string;
  supportChannel: string;
  cadence: string;
  entryTrigger: string;
  advanceTrigger: string;
  exitCondition: string;
  strategicNotes: string;
  steps: AutomationStep[];
};
type PlatformItem = { category: string; tool: string; purpose: string };
type Ref = { title: string; link: string };

type AutomationSystemData = {
  strategicVision: string;
  centralPrinciple: string;
  systemFunction: string;
  successCondition: string;
  failureRisk: string;
  architecture: string;
  architectureCharacteristics: string;
  entryTriggers: string;
  advanceTriggers: string;
  reentryTriggers: string;
  exitTriggers: string;
  tags: AutomationTag[];
  channelPriorities: ChannelPriority[];
  cadences: FlowCadence[];
  flows: AutomationFlow[];
  transmissionIntegration: string;
  mainKpi: string;
  secondaryKpis: string;
  platforms: PlatformItem[];
  references: Ref[];
};

function isAutomationData(v: unknown): v is AutomationSystemData {
  return typeof v === "object" && v !== null && "flows" in v;
}

const stepTypeColors: Record<string, string> = {
  Mensagem: "bg-indigo-100 text-indigo-700",
  Espera: "bg-slate-100 text-slate-600",
  Condição: "bg-purple-100 text-purple-700",
  Ação: "bg-emerald-100 text-emerald-700",
  Tag: "bg-slate-100 text-slate-600",
  Notificação: "bg-orange-100 text-orange-700",
  Saída: "bg-red-100 text-red-700",
};

export default function FluxoAutomacaoPresentation({ data }: { data: unknown }) {
  const d = isAutomationData(data) ? data : null;
  const filledTags = (d?.tags ?? []).filter((t) => t.name?.trim());
  const filledChannelPriorities = (d?.channelPriorities ?? []).filter((c) => c.flow?.trim());
  const filledCadences = (d?.cadences ?? []).filter((c) => c.flow?.trim());
  const filledFlows = (d?.flows ?? []).filter((f) => f.name?.trim() || f.code?.trim());
  const filledPlatforms = (d?.platforms ?? []).filter((p) => p.tool?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="fluxo-de-automacao"
        group="Campanhas, Automações e Conversão"
        title="Fluxo de Automação"
        description="Sistema de automação de relacionamento: visão estratégica, arquitetura dos fluxos, gatilhos, tags, cadências e plataformas."
      />

      {(d?.strategicVision || d?.centralPrinciple || d?.systemFunction || d?.successCondition || d?.failureRisk) && (
        <SectionCard title="Visão estratégica do sistema">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Visão estratégica" value={d?.strategicVision ?? ""} />
            <FieldBlock label="Princípio central" value={d?.centralPrinciple ?? ""} />
            <FieldBlock label="Função do sistema" value={d?.systemFunction ?? ""} />
            <FieldBlock label="Se bem executado" value={d?.successCondition ?? ""} />
          </div>
          {d?.failureRisk && (
            <div className="mt-4">
              <FieldBlock label="Risco se mal executado" value={d.failureRisk} />
            </div>
          )}
        </SectionCard>
      )}

      {(d?.architecture || d?.architectureCharacteristics) && (
        <SectionCard title="Arquitetura do sistema">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Estrutura operacional" value={d?.architecture ?? ""} />
            <FieldBlock label="Características da arquitetura" value={d?.architectureCharacteristics ?? ""} />
          </div>
        </SectionCard>
      )}

      {(d?.entryTriggers || d?.advanceTriggers || d?.reentryTriggers || d?.exitTriggers) && (
        <SectionCard title="Gatilhos e movimentação">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Gatilhos de entrada" value={d?.entryTriggers ?? ""} />
            <FieldBlock label="Gatilhos de avanço" value={d?.advanceTriggers ?? ""} />
            <FieldBlock label="Gatilhos de reentrada" value={d?.reentryTriggers ?? ""} />
            <FieldBlock label="Gatilhos de saída" value={d?.exitTriggers ?? ""} />
          </div>
        </SectionCard>
      )}

      {filledTags.length > 0 && (
        <SectionCard title="Tags e segmentação">
          <div className="space-y-2">
            {filledTags.map((tag, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <span className="shrink-0 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {tag.name}
                </span>
                {tag.description && (
                  <span className="text-sm text-slate-600">{tag.description}</span>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {(filledChannelPriorities.length > 0 || filledCadences.length > 0) && (
        <SectionCard title="Canais e cadências">
          {filledChannelPriorities.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Prioridade de canal por estágio
              </p>
              <div className="space-y-2">
                {filledChannelPriorities.map((item, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                    <span className="text-sm font-medium text-slate-950">{item.flow}</span>
                    <span className="text-xs text-slate-400">→</span>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                      {item.dominantChannel}
                    </span>
                    {item.supportChannel && (
                      <>
                        <span className="text-xs text-slate-400">+</span>
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                          {item.supportChannel}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {filledCadences.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cadência dos fluxos
              </p>
              <div className="space-y-2">
                {filledCadences.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                    <span className="text-sm font-medium text-slate-950">{item.flow}</span>
                    <span className="text-xs text-slate-400">{item.cadence}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {filledFlows.length > 0 && (
        <SectionCard title="Estrutura dos fluxos">
          <div className="space-y-6">
            {filledFlows.map((flow, fi) => {
              const filledSteps = (flow.steps ?? []).filter((s) => s.title?.trim() || s.moment?.trim());
              return (
                <div key={fi} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    {flow.code && (
                      <span className="rounded-full bg-slate-950 px-2.5 py-0.5 text-xs font-bold text-white">
                        {flow.code}
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-slate-950">
                      {flow.name || `Fluxo ${fi + 1}`}
                    </h3>
                    {flow.dominantChannel && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                        {flow.dominantChannel}
                      </span>
                    )}
                    {flow.supportChannel && (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {flow.supportChannel}
                      </span>
                    )}
                    {flow.cadence && (
                      <span className="text-xs text-slate-400">{flow.cadence}</span>
                    )}
                  </div>

                  <RichText content={flow.objective} className="mt-3 text-sm leading-7 text-slate-600" />

                  {(flow.entryTrigger || flow.advanceTrigger || flow.exitCondition) && (
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      {flow.entryTrigger && (
                        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                          <p className="text-xs font-semibold text-slate-400">Entrada</p>
                          <p className="mt-1 text-xs text-slate-600">{flow.entryTrigger}</p>
                        </div>
                      )}
                      {flow.advanceTrigger && (
                        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                          <p className="text-xs font-semibold text-slate-400">Avanço</p>
                          <p className="mt-1 text-xs text-slate-600">{flow.advanceTrigger}</p>
                        </div>
                      )}
                      {flow.exitCondition && (
                        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                          <p className="text-xs font-semibold text-slate-400">Saída</p>
                          <p className="mt-1 text-xs text-slate-600">{flow.exitCondition}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {flow.strategicNotes && (
                    <p className="mt-3 text-xs italic text-slate-500">{flow.strategicNotes}</p>
                  )}

                  {filledSteps.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Etapas do fluxo
                      </p>
                      <div className="space-y-2">
                        {filledSteps.map((step, si) => (
                          <div key={si} className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                            <div className="flex flex-wrap items-center gap-2">
                              {step.moment && (
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono font-semibold text-slate-700">
                                  {step.moment}
                                </span>
                              )}
                              {step.channel && (
                                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                                  {step.channel}
                                </span>
                              )}
                              {step.type && (
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    stepTypeColors[step.type] ?? "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {step.type}
                                </span>
                              )}
                              {step.title && (
                                <span className="text-sm font-medium text-slate-950">{step.title}</span>
                              )}
                            </div>
                            {(step.purpose || step.condition || step.cta) && (
                              <div className="mt-2 grid gap-2 md:grid-cols-3">
                                {step.purpose && (
                                  <p className="text-xs text-slate-500">
                                    <span className="font-medium text-slate-700">Função:</span> {step.purpose}
                                  </p>
                                )}
                                {step.condition && (
                                  <p className="text-xs text-slate-500">
                                    <span className="font-medium text-slate-700">Condição:</span> {step.condition}
                                  </p>
                                )}
                                {step.cta && (
                                  <p className="text-xs text-slate-500">
                                    <span className="font-medium text-slate-700">CTA:</span> {step.cta}
                                  </p>
                                )}
                              </div>
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

      {d?.transmissionIntegration && (
        <SectionCard title="Integração com canal de transmissão">
          <FieldBlock label="Integração" value={d.transmissionIntegration} />
        </SectionCard>
      )}

      {(d?.mainKpi || d?.secondaryKpis) && (
        <SectionCard title="KPIs do sistema">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="KPI principal" value={d?.mainKpi ?? ""} />
            <FieldBlock label="KPIs secundários" value={d?.secondaryKpis ?? ""} />
          </div>
        </SectionCard>
      )}

      {filledPlatforms.length > 0 && (
        <SectionCard title="Plataformas recomendadas">
          <div className="space-y-2">
            {filledPlatforms.map((p, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  {p.category && (
                    <span className="text-xs text-slate-400">{p.category}</span>
                  )}
                  <span className="text-sm font-semibold text-slate-950">{p.tool}</span>
                </div>
                {p.purpose && (
                  <p className="mt-1 text-xs text-slate-600">{p.purpose}</p>
                )}
              </div>
            ))}
          </div>
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
