"use client";

import { useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-campanha-captacao-de-lead";

type CampaignMaterial = {
  title: string;
  type: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type LeadCaptureCampaignData = {
  campaignType: string;
  campaignPhase: string;
  trafficObjective: string;
  audienceTemperature: string;
  recommendedChannels: string;
  budget: string;
  materials: CampaignMaterial[];
  objective: string;
  audience: string;
  positioning: string;
  creativeDirection: string;
  strategicScenario: string;
  offerPromise: string;
  perceivedBenefit: string;
  mainCall: string;
  offerName: string;
  pageHeadline: string;
  pageArgument: string;
  formFields: string;
  pageCta: string;
  nextStepAfterSignup: string;
  qualificationCriteria: string;
  initialNurturingSequence: string;
  metrics: string;
  references: ExternalReference[];
};

const campaignTypes = [
  "Captação direta",
  "Lista de espera",
  "Material rico",
  "Aula gratuita",
  "Webinário",
  "Diagnóstico",
  "Evento online",
  "Teste de oferta",
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

const trafficObjectives = [
  "Leads",
  "Conversões",
  "Tráfego qualificado",
  "Engajamento",
  "Visualização de vídeo",
  "Mensagens",
  "Reconhecimento",
];

const audienceTemperatures = [
  "Frio",
  "Morno",
  "Quente",
  "Remarketing",
  "Base própria",
  "Lookalike",
];

const initialData: LeadCaptureCampaignData = {
  campaignType: "Captação direta",
  campaignPhase: "Teste inicial",
  trafficObjective: "Leads",
  audienceTemperature: "Frio",
  recommendedChannels: "",
  budget: "",
  materials: [{ title: "", type: "" }],
  objective: "",
  audience: "",
  positioning: "",
  creativeDirection: "",
  strategicScenario: "",
  offerPromise: "",
  perceivedBenefit: "",
  mainCall: "",
  offerName: "",
  pageHeadline: "",
  pageArgument: "",
  formFields: "",
  pageCta: "",
  nextStepAfterSignup: "",
  qualificationCriteria: "",
  initialNurturingSequence: "",
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
                  const isActive = module.slug === "campanha-captacao-de-lead";

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

export default function CampanhaCaptacaoDeLeadPage() {
  const [data, setData] = useState<LeadCaptureCampaignData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        campaignType: parsed.campaignType || "Captação direta",
        campaignPhase: parsed.campaignPhase || "Teste inicial",
        trafficObjective: parsed.trafficObjective || "Leads",
        audienceTemperature: parsed.audienceTemperature || "Frio",
        recommendedChannels: parsed.recommendedChannels || "",
        budget: parsed.budget || "",
        materials:
          Array.isArray(parsed.materials) && parsed.materials.length
            ? parsed.materials.map((material: Partial<CampaignMaterial>) => ({
                title: material.title || "",
                type: material.type || "",
              }))
            : [{ title: "", type: "" }],
        objective: parsed.objective || "",
        audience: parsed.audience || "",
        positioning: parsed.positioning || "",
        creativeDirection: parsed.creativeDirection || "",
        strategicScenario: parsed.strategicScenario || "",
        offerPromise: parsed.offerPromise || "",
        perceivedBenefit: parsed.perceivedBenefit || "",
        mainCall: parsed.mainCall || "",
        offerName: parsed.offerName || "",
        pageHeadline: parsed.pageHeadline || "",
        pageArgument: parsed.pageArgument || "",
        formFields: parsed.formFields || "",
        pageCta: parsed.pageCta || "",
        nextStepAfterSignup: parsed.nextStepAfterSignup || "",
        qualificationCriteria: parsed.qualificationCriteria || "",
        initialNurturingSequence: parsed.initialNurturingSequence || "",
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

  function updateMaterial(
    index: number,
    key: keyof CampaignMaterial,
    value: string
  ) {
    setData((current) => {
      const nextMaterials = [...current.materials];

      nextMaterials[index] = {
        ...nextMaterials[index],
        [key]: value,
      };

      return {
        ...current,
        materials: nextMaterials,
      };
    });
  }

  function addMaterial() {
    setData((current) => ({
      ...current,
      materials: [...current.materials, { title: "", type: "" }],
    }));
  }

  function removeMaterial(index: number) {
    setData((current) => ({
      ...current,
      materials:
        current.materials.length > 1
          ? current.materials.filter(
              (_, materialIndex) => materialIndex !== index
            )
          : [{ title: "", type: "" }],
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
                Campanha de Captação de Lead
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Planeje campanhas de captação com canais, públicos, oferta,
                criativos, página de captura, qualificação, nutrição e métricas
                de acompanhamento.
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
              description="Defina o tipo de campanha, fase, objetivo de mídia e temperatura do público. Essas informações ajudam a orientar canais, criativos e verba."
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
                    Objetivo de mídia
                  </label>

                  <select
                    value={data.trafficObjective}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        trafficObjective: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {trafficObjectives.map((objective) => (
                      <option key={objective} value={objective}>
                        {objective}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Temperatura do público
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
                    placeholder="Ex: Meta Ads para captação inicial, Google para intenção ativa, YouTube para aquecimento, LinkedIn apenas se houver B2B."
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
                    placeholder="Ex: R$ 50 por dia durante 15 dias, verba mensal de R$ 2.000 ou verba inicial de teste por conjunto de anúncios."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Materiais possíveis"
              description="Liste os materiais educativos, iscas ou ativos que podem ser usados para captar leads."
            >
              <div className="space-y-4">
                {data.materials.map((material, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_220px_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Material
                      </label>

                      <input
                        type="text"
                        value={material.title}
                        onChange={(event) =>
                          updateMaterial(index, "title", event.target.value)
                        }
                        placeholder="Ex: E-book, checklist, aula gratuita, planilha, diagnóstico, guia ou webinário"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Tipo
                      </label>

                      <input
                        type="text"
                        value={material.type}
                        onChange={(event) =>
                          updateMaterial(index, "type", event.target.value)
                        }
                        placeholder="Ex: PDF, vídeo, formulário"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
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
                onClick={addMaterial}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
              >
                + Novo material
              </button>
            </SectionCard>

            <SectionCard
              title="Estratégia da campanha"
              description="Descreva objetivo, público, posicionamento, direção dos criativos e cenário estratégico."
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
                    placeholder="Ex: Captar leads qualificados, gerar lista para lançamento, aumentar base de contatos ou atrair interessados para uma oferta específica."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Público
                  </label>

                  <textarea
                    rows={6}
                    value={data.audience}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        audience: event.target.value,
                      }))
                    }
                    placeholder="Ex: Interesses, localização, idade, profissão, comportamento, públicos personalizados, lista de clientes ou visitantes do site."
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
                    placeholder="Ex: Como a oferta será apresentada, qual ângulo será usado e como ela será percebida pelo público."
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
                    placeholder="Ex: Criativos com dor, promessa, prova, demonstração, bastidor, antes e depois, depoimento ou comparação."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Cenário estratégico
                </label>

                <textarea
                  rows={7}
                  value={data.strategicScenario}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      strategicScenario: event.target.value,
                    }))
                  }
                  placeholder="Ex: O que será testado, quais públicos serão priorizados, quais hipóteses serão avaliadas e quais decisões poderão ser tomadas após a campanha."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Oferta principal da campanha"
              description="Defina a promessa, o benefício percebido, a chamada principal e o nome da oferta ou isca."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Promessa da oferta
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
                    placeholder="Ex: Aprenda como organizar sua estratégia de conteúdo em 7 dias."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Benefício percebido
                  </label>

                  <textarea
                    rows={5}
                    value={data.perceivedBenefit}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        perceivedBenefit: event.target.value,
                      }))
                    }
                    placeholder="Ex: Clareza, economia de tempo, diagnóstico, plano de ação, organização, segurança para decidir."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Chamada principal
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
                    placeholder="Ex: Baixe o guia gratuito, faça seu diagnóstico, entre na lista ou receba o material."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Nome da oferta
                  </label>

                  <textarea
                    rows={5}
                    value={data.offerName}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        offerName: event.target.value,
                      }))
                    }
                    placeholder="Ex: Checklist da Estratégia, Mapa do Conteúdo, Aula gratuita ou Diagnóstico Express."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Página de captura"
              description="Organize os elementos necessários para a landing page ou página de captura da campanha."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Headline da página
                  </label>

                  <textarea
                    rows={5}
                    value={data.pageHeadline}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        pageHeadline: event.target.value,
                      }))
                    }
                    placeholder="Escreva ou descreva a chamada principal da página de captura."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Argumento da página
                  </label>

                  <textarea
                    rows={5}
                    value={data.pageArgument}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        pageArgument: event.target.value,
                      }))
                    }
                    placeholder="Liste os principais argumentos, benefícios, dores, provas ou motivos para cadastro."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Campos do formulário
                  </label>

                  <textarea
                    rows={5}
                    value={data.formFields}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        formFields: event.target.value,
                      }))
                    }
                    placeholder="Ex: Nome, e-mail, WhatsApp, empresa, cargo, faturamento ou principal desafio."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    CTA da página
                  </label>

                  <textarea
                    rows={5}
                    value={data.pageCta}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        pageCta: event.target.value,
                      }))
                    }
                    placeholder="Ex: Quero receber o material, fazer diagnóstico, acessar aula ou entrar na lista."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Pós-cadastro e qualificação do lead"
              description="Defina o que acontece depois que a pessoa se cadastra e como identificar se o lead é qualificado."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Próxima ação após cadastro
                  </label>

                  <textarea
                    rows={5}
                    value={data.nextStepAfterSignup}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        nextStepAfterSignup: event.target.value,
                      }))
                    }
                    placeholder="Ex: Página de obrigado, envio por e-mail, redirecionamento para WhatsApp, convite para reunião ou entrada em fluxo de nutrição."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Critérios de qualificação
                  </label>

                  <textarea
                    rows={5}
                    value={data.qualificationCriteria}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        qualificationCriteria: event.target.value,
                      }))
                    }
                    placeholder="Ex: Cargo, interesse, dor declarada, orçamento, urgência, perfil de cliente ideal ou resposta no formulário."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Sequência de nutrição inicial
                </label>

                <textarea
                  rows={7}
                  value={data.initialNurturingSequence}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      initialNurturingSequence: event.target.value,
                    }))
                  }
                  placeholder="Descreva as primeiras mensagens ou e-mails após a conversão: entrega do material, conteúdo complementar, prova social, convite e chamada para ação."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Métricas da campanha"
              description="Defina os indicadores que devem ser acompanhados para avaliar o desempenho da campanha."
            >
              <textarea
                rows={7}
                value={data.metrics}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    metrics: event.target.value,
                  }))
                }
                placeholder="Ex: Custo por lead, taxa de conversão da página, CTR, CPM, CPC, taxa de abertura, taxa de resposta, leads qualificados e vendas geradas."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a campanha de captação de leads."
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
                        placeholder="Ex: Landing page, anúncio, material, formulário, campanha ou referência"
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