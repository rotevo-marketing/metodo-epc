"use client";

import { useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-campanha-conversao-de-vendas";

type SalesCampaignDestination = {
  title: string;
  link: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

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
  destinations: SalesCampaignDestination[];
  mainObjections: string;
  strategicResponses: string;
  salesPageDestination: string;
  mainCta: string;
  proofElements: string;
  urgencyAndScarcity: string;
  remarketingStructure: string;
  metrics: string;
  references: ExternalReference[];
};

const campaignTypes = [
  "Venda direta",
  "Agendamento comercial",
  "WhatsApp",
  "Checkout",
  "Página de vendas",
  "Diagnóstico",
  "Consulta",
  "Proposta comercial",
  "Remarketing",
  "Lançamento",
  "Outro",
];

const campaignPhases = [
  "Teste inicial",
  "Validação",
  "Escala",
  "Remarketing",
  "Lançamento",
  "Campanha contínua",
];

const salesObjectives = [
  "Compras",
  "Conversões",
  "Leads qualificados",
  "Mensagens",
  "Agendamentos",
  "Tráfego para página de vendas",
  "Remarketing",
];

const audienceTemperatures = [
  "Morno",
  "Quente",
  "Remarketing",
  "Base própria",
  "Carrinho ou checkout",
  "Visitantes da página",
  "Engajados",
  "Frio com intenção",
];

const initialData: SalesConversionCampaignData = {
  campaignType: "Venda direta",
  campaignPhase: "Teste inicial",
  salesObjective: "Conversões",
  audienceTemperature: "Morno",
  recommendedChannels: "",
  budget: "",
  objective: "",
  offerProduct: "",
  offerPrice: "",
  offerPromise: "",
  offerBenefits: "",
  mainCall: "",
  audienceCold: "",
  audienceWarm: "",
  audienceHot: "",
  positioning: "",
  creativeDirection: "",
  strategicScenario: "",
  destinations: [{ title: "", link: "" }],
  mainObjections: "",
  strategicResponses: "",
  salesPageDestination: "",
  mainCta: "",
  proofElements: "",
  urgencyAndScarcity: "",
  remarketingStructure: "",
  metrics: "",
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
                  const isActive =
                    module.slug === "campanha-conversao-de-vendas";

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
  children: React.ReactNode;
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

export default function CampanhaConversaoDeVendasPage() {
  const [data, setData] =
    useState<SalesConversionCampaignData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        campaignType: parsed.campaignType || "Venda direta",
        campaignPhase: parsed.campaignPhase || "Teste inicial",
        salesObjective: parsed.salesObjective || "Conversões",
        audienceTemperature: parsed.audienceTemperature || "Morno",
        recommendedChannels: parsed.recommendedChannels || "",
        budget: parsed.budget || "",
        objective: parsed.objective || "",
        offerProduct: parsed.offerProduct || "",
        offerPrice: parsed.offerPrice || "",
        offerPromise: parsed.offerPromise || "",
        offerBenefits: parsed.offerBenefits || "",
        mainCall: parsed.mainCall || "",
        audienceCold: parsed.audienceCold || "",
        audienceWarm: parsed.audienceWarm || "",
        audienceHot: parsed.audienceHot || "",
        positioning: parsed.positioning || "",
        creativeDirection: parsed.creativeDirection || "",
        strategicScenario: parsed.strategicScenario || "",
        destinations:
          Array.isArray(parsed.destinations) && parsed.destinations.length
            ? parsed.destinations.map(
                (destination: Partial<SalesCampaignDestination>) => ({
                  title: destination.title || "",
                  link: destination.link || "",
                })
              )
            : [{ title: "", link: "" }],
        mainObjections: parsed.mainObjections || "",
        strategicResponses: parsed.strategicResponses || "",
        salesPageDestination: parsed.salesPageDestination || "",
        mainCta: parsed.mainCta || "",
        proofElements: parsed.proofElements || "",
        urgencyAndScarcity: parsed.urgencyAndScarcity || "",
        remarketingStructure: parsed.remarketingStructure || "",
        metrics: parsed.metrics || "",
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

  function updateDestination(
    index: number,
    key: keyof SalesCampaignDestination,
    value: string
  ) {
    setData((current) => {
      const nextDestinations = [...current.destinations];

      nextDestinations[index] = {
        ...nextDestinations[index],
        [key]: value,
      };

      return {
        ...current,
        destinations: nextDestinations,
      };
    });
  }

  function addDestination() {
    setData((current) => ({
      ...current,
      destinations: [...current.destinations, { title: "", link: "" }],
    }));
  }

  function removeDestination(index: number) {
    setData((current) => ({
      ...current,
      destinations:
        current.destinations.length > 1
          ? current.destinations.filter(
              (_, destinationIndex) => destinationIndex !== index
            )
          : [{ title: "", link: "" }],
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
          ? current.references.filter(
              (_, referenceIndex) => referenceIndex !== index
            )
          : [{ title: "", link: "" }],
    }));
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
                Campanhas, Automações e Conversão
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Campanha de Conversão de Vendas
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Planeje campanhas de mídia paga para conversão em vendas,
                agendamentos, WhatsApp, checkout, página de vendas ou proposta
                comercial.
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
              title="Configuração estratégica da campanha"
              description="Defina o tipo de campanha, fase, objetivo comercial, temperatura da audiência, canais recomendados e orçamento."
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Tipo de campanha
                  </label>

                  <select
                    value={data.campaignType}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        campaignType: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {campaignTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Fase da campanha
                  </label>

                  <select
                    value={data.campaignPhase}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        campaignPhase: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {campaignPhases.map((phase) => (
                      <option key={phase} value={phase}>
                        {phase}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Objetivo comercial
                  </label>

                  <select
                    value={data.salesObjective}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        salesObjective: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {salesObjectives.map((objective) => (
                      <option key={objective} value={objective}>
                        {objective}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Temperatura da audiência
                  </label>

                  <select
                    value={data.audienceTemperature}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        audienceTemperature: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {audienceTemperatures.map((temperature) => (
                      <option key={temperature} value={temperature}>
                        {temperature}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Canais recomendados
                  </label>

                  <textarea
                    rows={5}
                    value={data.recommendedChannels}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        recommendedChannels: event.target.value,
                      }))
                    }
                    placeholder="Ex: Meta Ads para remarketing, Google Pesquisa para intenção ativa, YouTube para prova e autoridade, LinkedIn para venda B2B."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Orçamento recomendado
                  </label>

                  <textarea
                    rows={5}
                    value={data.budget}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        budget: event.target.value,
                      }))
                    }
                    placeholder="Ex: R$ 80 por dia em remarketing, R$ 150 por dia para venda direta ou verba inicial de teste por conjunto de anúncios."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Oferta da campanha"
              description="Defina o que será vendido, a promessa principal, o benefício percebido, a chamada e a faixa de preço."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Produto, serviço ou solução
                  </label>

                  <textarea
                    rows={5}
                    value={data.offerProduct}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        offerProduct: event.target.value,
                      }))
                    }
                    placeholder="Ex: Mentoria, consultoria, curso, serviço, diagnóstico, produto ou assinatura."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Valor ou faixa de preço
                  </label>

                  <textarea
                    rows={5}
                    value={data.offerPrice}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        offerPrice: event.target.value,
                      }))
                    }
                    placeholder="Ex: R$ 497, R$ 2.000 a R$ 5.000, sob consulta, assinatura mensal ou plano recorrente."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Promessa principal
                  </label>

                  <textarea
                    rows={5}
                    value={data.offerPromise}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        offerPromise: event.target.value,
                      }))
                    }
                    placeholder="Ex: Ajudar o cliente a alcançar determinado resultado em determinado contexto."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Benefícios da oferta
                  </label>

                  <textarea
                    rows={5}
                    value={data.offerBenefits}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        offerBenefits: event.target.value,
                      }))
                    }
                    placeholder="Liste benefícios, transformações, entregáveis, motivos para comprar e ganhos esperados."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Chamada principal da campanha
                  </label>

                  <textarea
                    rows={5}
                    value={data.mainCall}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        mainCall: event.target.value,
                      }))
                    }
                    placeholder="Ex: Comprar agora, agendar diagnóstico, falar com consultor, entrar no WhatsApp, garantir vaga ou solicitar proposta."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Público e temperatura da audiência"
              description="Defina os públicos que podem receber a campanha e como a comunicação deve mudar conforme a temperatura."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Público frio
                  </label>

                  <textarea
                    rows={7}
                    value={data.audienceCold}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        audienceCold: event.target.value,
                      }))
                    }
                    placeholder="Ex: Públicos semelhantes, interesses, busca ativa, segmentações por dor, comportamento ou perfil."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Público morno
                  </label>

                  <textarea
                    rows={7}
                    value={data.audienceWarm}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        audienceWarm: event.target.value,
                      }))
                    }
                    placeholder="Ex: Engajados nas redes, visualizadores de vídeo, visitantes do site, pessoas que consumiram conteúdo ou abriram e-mails."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Público quente
                  </label>

                  <textarea
                    rows={7}
                    value={data.audienceHot}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        audienceHot: event.target.value,
                      }))
                    }
                    placeholder="Ex: Leads, lista de WhatsApp, visitantes da página de vendas, pessoas que iniciaram checkout ou solicitaram contato."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Estratégia da campanha"
              description="Defina objetivo, posicionamento, direção dos criativos e cenário estratégico da campanha de venda."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Objetivo da campanha
                  </label>

                  <textarea
                    rows={6}
                    value={data.objective}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        objective: event.target.value,
                      }))
                    }
                    placeholder="Ex: Gerar vendas diretas, agendar reuniões comerciais, recuperar leads quentes, vender uma oferta específica ou conduzir interessados para o WhatsApp."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Posicionamento
                  </label>

                  <textarea
                    rows={6}
                    value={data.positioning}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        positioning: event.target.value,
                      }))
                    }
                    placeholder="Ex: Como a oferta deve ser percebida, qual ângulo de venda será usado e por que o público deveria agir agora."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Direção dos criativos
                  </label>

                  <textarea
                    rows={6}
                    value={data.creativeDirection}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        creativeDirection: event.target.value,
                      }))
                    }
                    placeholder="Ex: Depoimentos, prova social, estudo de caso, vídeo de oferta, antes e depois, demonstração, chamada direta, urgência ou quebra de objeções."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Cenário estratégico
                  </label>

                  <textarea
                    rows={6}
                    value={data.strategicScenario}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        strategicScenario: event.target.value,
                      }))
                    }
                    placeholder="Ex: Testar remarketing para leads aquecidos, alinhar promessa com página de vendas, apresentar prova forte e deixar o próximo passo muito claro."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Materiais e destinos possíveis"
              description="Liste links, páginas ou materiais para onde os anúncios dessas campanhas podem direcionar."
            >
              <div className="space-y-4">
                {data.destinations.map((destination, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Material ou destino
                      </label>

                      <input
                        type="text"
                        value={destination.title}
                        onChange={(event) =>
                          updateDestination(index, "title", event.target.value)
                        }
                        placeholder="Ex: Página de vendas, WhatsApp, checkout, agenda, formulário, vídeo de vendas ou apresentação."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Link
                      </label>

                      <input
                        type="url"
                        value={destination.link}
                        onChange={(event) =>
                          updateDestination(index, "link", event.target.value)
                        }
                        placeholder="https://..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeDestination(index)}
                        className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addDestination}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
              >
                + Novo destino
              </button>
            </SectionCard>

            <SectionCard
              title="Objeções e argumentos de venda"
              description="Liste as principais objeções que podem impedir a compra e quais argumentos devem ser usados para superá-las."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Objeções principais
                  </label>

                  <textarea
                    rows={7}
                    value={data.mainObjections}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        mainObjections: event.target.value,
                      }))
                    }
                    placeholder="Ex: Está caro, não tenho tempo, não sei se funciona, preciso pensar, já tentei antes, não é prioridade agora."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Respostas estratégicas
                  </label>

                  <textarea
                    rows={7}
                    value={data.strategicResponses}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        strategicResponses: event.target.value,
                      }))
                    }
                    placeholder="Escreva argumentos, provas, comparações, garantias, explicações ou conteúdos que ajudem a superar as objeções."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Página, checkout ou atendimento"
              description="Defina o destino da campanha e o que precisa existir para a conversão acontecer com clareza."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Destino principal
                  </label>

                  <textarea
                    rows={6}
                    value={data.salesPageDestination}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        salesPageDestination: event.target.value,
                      }))
                    }
                    placeholder="Ex: Página de vendas, WhatsApp, checkout, agenda, formulário de aplicação ou conversa comercial."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    CTA principal
                  </label>

                  <textarea
                    rows={6}
                    value={data.mainCta}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        mainCta: event.target.value,
                      }))
                    }
                    placeholder="Ex: Comprar agora, agendar diagnóstico, falar com consultor, entrar no WhatsApp, garantir vaga ou solicitar proposta."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Elementos de prova
                  </label>

                  <textarea
                    rows={6}
                    value={data.proofElements}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        proofElements: event.target.value,
                      }))
                    }
                    placeholder="Ex: Depoimentos, cases, números, prints, antes e depois, logos de clientes, certificações ou bastidores."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Urgência ou escassez
                  </label>

                  <textarea
                    rows={6}
                    value={data.urgencyAndScarcity}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        urgencyAndScarcity: event.target.value,
                      }))
                    }
                    placeholder="Ex: Vagas limitadas, bônus por tempo, turma fechando, condição especial, prazo de inscrição ou agenda limitada."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Estrutura de remarketing"
              description="Defina como a campanha deve perseguir pessoas que já demonstraram interesse, mas ainda não converteram."
            >
              <textarea
                rows={8}
                value={data.remarketingStructure}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    remarketingStructure: event.target.value,
                  }))
                }
                placeholder="Ex: Impactar visitantes da página de vendas, pessoas que clicaram no WhatsApp, leads que abriram e-mails, visualizadores de vídeo e pessoas que adicionaram ao carrinho, usando provas, objeções, urgência e chamadas diretas."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Métricas da campanha"
              description="Defina os indicadores que devem ser acompanhados para avaliar a performance de vendas."
            >
              <textarea
                rows={8}
                value={data.metrics}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    metrics: event.target.value,
                  }))
                }
                placeholder="Ex: Custo por compra, custo por reunião, ROAS, taxa de conversão, faturamento, boletos gerados, leads qualificados, cliques no WhatsApp, CPA e receita por campanha."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a campanha de conversão em vendas."
            >
              <div className="space-y-4">
                {data.references.map((reference, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Título da referência
                      </label>

                      <input
                        type="text"
                        value={reference.title}
                        onChange={(event) =>
                          updateReference(index, "title", event.target.value)
                        }
                        placeholder="Ex: Página de vendas, anúncio, checkout, oferta, depoimento ou referência"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Link
                      </label>

                      <input
                        type="url"
                        value={reference.link}
                        onChange={(event) =>
                          updateReference(index, "link", event.target.value)
                        }
                        placeholder="https://..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeReference(index)}
                        className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
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