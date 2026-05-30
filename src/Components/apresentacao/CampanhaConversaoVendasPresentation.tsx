import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
} from "./ChannelPresentationShared";

type Destination = { title: string; link: string };
type Ref = { title: string; link: string };

type SalesConversionCampaignData = {
  campaignType: string;
  campaignPhase: string;
  salesObjective: string;
  audienceTemperature: string;
  recommendedChannels: string;
  budget: string;
  objective: string;
  offerProduct: string;
  offerPrice: string;
  offerPromise: string;
  offerBenefits: string;
  mainCall: string;
  audienceCold: string;
  audienceWarm: string;
  audienceHot: string;
  positioning: string;
  creativeDirection: string;
  strategicScenario: string;
  destinations: Destination[];
  mainObjections: string;
  strategicResponses: string;
  salesPageDestination: string;
  mainCta: string;
  proofElements: string;
  urgencyAndScarcity: string;
  remarketingStructure: string;
  metrics: string;
  references: Ref[];
};

function isSalesConversionData(v: unknown): v is SalesConversionCampaignData {
  return typeof v === "object" && v !== null && "salesObjective" in v;
}

function Badge({ label }: { label: string }) {
  if (!label) return null;
  return (
    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
      {label}
    </span>
  );
}

export default function CampanhaConversaoVendasPresentation({ data }: { data: unknown }) {
  const d = isSalesConversionData(data) ? data : null;
  const filledDestinations = (d?.destinations ?? []).filter((dest) => dest.title?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="campanha-conversao-de-vendas"
        group="Campanhas, Automações e Conversão"
        title="Campanha de Conversão em Vendas"
        description="Estratégia de mídia paga para conversão: tipo, fase, oferta, audiência, objeções, página de vendas e métricas."
      />

      {(d?.campaignType || d?.campaignPhase || d?.salesObjective || d?.audienceTemperature) && (
        <SectionCard title="Configuração estratégica">
          <div className="flex flex-wrap gap-2">
            <Badge label={d?.campaignType ?? ""} />
            <Badge label={d?.campaignPhase ?? ""} />
            <Badge label={d?.salesObjective ?? ""} />
            <Badge label={d?.audienceTemperature ?? ""} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FieldBlock label="Canais recomendados" value={d?.recommendedChannels ?? ""} />
            <FieldBlock label="Orçamento recomendado" value={d?.budget ?? ""} />
          </div>
        </SectionCard>
      )}

      {(d?.offerProduct || d?.offerPrice || d?.offerPromise || d?.offerBenefits || d?.mainCall) && (
        <SectionCard title="Oferta da campanha">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Produto, serviço ou solução" value={d?.offerProduct ?? ""} />
            <FieldBlock label="Valor ou faixa de preço" value={d?.offerPrice ?? ""} />
            <FieldBlock label="Promessa principal" value={d?.offerPromise ?? ""} />
            <FieldBlock label="Benefícios da oferta" value={d?.offerBenefits ?? ""} />
          </div>
          {d?.mainCall && (
            <div className="mt-4">
              <FieldBlock label="Chamada principal" value={d.mainCall} />
            </div>
          )}
        </SectionCard>
      )}

      {(d?.audienceCold || d?.audienceWarm || d?.audienceHot) && (
        <SectionCard title="Público por temperatura">
          <div className="grid gap-4 md:grid-cols-3">
            <FieldBlock label="Público frio" value={d?.audienceCold ?? ""} />
            <FieldBlock label="Público morno" value={d?.audienceWarm ?? ""} />
            <FieldBlock label="Público quente" value={d?.audienceHot ?? ""} />
          </div>
        </SectionCard>
      )}

      {(d?.objective || d?.positioning || d?.creativeDirection || d?.strategicScenario) && (
        <SectionCard title="Estratégia da campanha">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Objetivo" value={d?.objective ?? ""} />
            <FieldBlock label="Posicionamento" value={d?.positioning ?? ""} />
            <FieldBlock label="Direção dos criativos" value={d?.creativeDirection ?? ""} />
            <FieldBlock label="Cenário estratégico" value={d?.strategicScenario ?? ""} />
          </div>
        </SectionCard>
      )}

      {filledDestinations.length > 0 && (
        <SectionCard title="Materiais e destinos possíveis">
          <div className="space-y-2">
            {filledDestinations.map((dest, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                {dest.link ? (
                  <a
                    href={dest.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    {dest.title || dest.link}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-slate-950">{dest.title}</span>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {(d?.mainObjections || d?.strategicResponses) && (
        <SectionCard title="Objeções e argumentos de venda">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Objeções principais" value={d?.mainObjections ?? ""} />
            <FieldBlock label="Respostas estratégicas" value={d?.strategicResponses ?? ""} />
          </div>
        </SectionCard>
      )}

      {(d?.salesPageDestination || d?.mainCta || d?.proofElements || d?.urgencyAndScarcity) && (
        <SectionCard title="Página, checkout ou atendimento">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Destino principal" value={d?.salesPageDestination ?? ""} />
            <FieldBlock label="CTA principal" value={d?.mainCta ?? ""} />
            <FieldBlock label="Elementos de prova" value={d?.proofElements ?? ""} />
            <FieldBlock label="Urgência ou escassez" value={d?.urgencyAndScarcity ?? ""} />
          </div>
        </SectionCard>
      )}

      {d?.remarketingStructure && (
        <SectionCard title="Estrutura de remarketing">
          <FieldBlock label="Remarketing" value={d.remarketingStructure} />
        </SectionCard>
      )}

      {d?.metrics && (
        <SectionCard title="Métricas da campanha">
          <FieldBlock label="Indicadores" value={d.metrics} />
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
