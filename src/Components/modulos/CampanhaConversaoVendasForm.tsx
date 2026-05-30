"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type SalesCampaignDestination = {
  title: string;
  link: string;
};

export type SalesConversionCampaignData = {
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
  references: { title: string; link: string }[];
};

export const salesConversionCampaignTypes = [
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

export const salesConversionCampaignPhases = [
  "Teste inicial",
  "Validação",
  "Escala",
  "Remarketing",
  "Lançamento",
  "Campanha contínua",
];

export const salesObjectives = [
  "Compras",
  "Conversões",
  "Leads qualificados",
  "Mensagens",
  "Agendamentos",
  "Tráfego para página de vendas",
  "Remarketing",
];

export const salesAudienceTemperatures = [
  "Morno",
  "Quente",
  "Remarketing",
  "Base própria",
  "Carrinho ou checkout",
  "Visitantes da página",
  "Engajados",
  "Frio com intenção",
];

export const initialSalesConversionCampaignData: SalesConversionCampaignData = {
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

        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  rows: _rows,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </label>
      <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

type CampanhaConversaoVendasFormProps = {
  data: SalesConversionCampaignData;
  setData: Dispatch<SetStateAction<SalesConversionCampaignData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function CampanhaConversaoVendasForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: CampanhaConversaoVendasFormProps) {
  function updateField(key: keyof SalesConversionCampaignData, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function updateDestination(
    index: number,
    key: keyof SalesCampaignDestination,
    value: string
  ) {
    setData((current) => {
      const next = [...current.destinations];
      next[index] = { ...next[index], [key]: value };
      return { ...current, destinations: next };
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
          ? current.destinations.filter((_, i) => i !== index)
          : [{ title: "", link: "" }],
    }));
  }

  function updateReference(
    index: number,
    key: "title" | "link",
    value: string
  ) {
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
    <div className="mt-6 space-y-6">
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
              onChange={(event) => updateField("campaignType", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {salesConversionCampaignTypes.map((type) => (
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
              onChange={(event) => updateField("campaignPhase", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {salesConversionCampaignPhases.map((phase) => (
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
              onChange={(event) => updateField("salesObjective", event.target.value)}
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
                updateField("audienceTemperature", event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {salesAudienceTemperatures.map((temperature) => (
                <option key={temperature} value={temperature}>
                  {temperature}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Canais recomendados"
            value={data.recommendedChannels}
            placeholder="Ex: Meta Ads para remarketing, Google Pesquisa para intenção ativa, YouTube para prova e autoridade, LinkedIn para venda B2B."
            onChange={(value) => updateField("recommendedChannels", value)}
          />

          <TextAreaField
            label="Orçamento recomendado"
            value={data.budget}
            placeholder="Ex: R$ 80 por dia em remarketing, R$ 150 por dia para venda direta ou verba inicial de teste por conjunto de anúncios."
            onChange={(value) => updateField("budget", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Oferta da campanha"
        description="Defina o que será vendido, a promessa principal, o benefício percebido, a chamada e a faixa de preço."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Produto, serviço ou solução"
            value={data.offerProduct}
            placeholder="Ex: Mentoria, consultoria, curso, serviço, diagnóstico, produto ou assinatura."
            onChange={(value) => updateField("offerProduct", value)}
          />

          <TextAreaField
            label="Valor ou faixa de preço"
            value={data.offerPrice}
            placeholder="Ex: R$ 497, R$ 2.000 a R$ 5.000, sob consulta, assinatura mensal ou plano recorrente."
            onChange={(value) => updateField("offerPrice", value)}
          />

          <TextAreaField
            label="Promessa principal"
            value={data.offerPromise}
            placeholder="Ex: Ajudar o cliente a alcançar determinado resultado em determinado contexto."
            onChange={(value) => updateField("offerPromise", value)}
          />

          <TextAreaField
            label="Benefícios da oferta"
            value={data.offerBenefits}
            placeholder="Liste benefícios, transformações, entregáveis, motivos para comprar e ganhos esperados."
            onChange={(value) => updateField("offerBenefits", value)}
          />

          <div className="md:col-span-2">
            <TextAreaField
              label="Chamada principal da campanha"
              value={data.mainCall}
              placeholder="Ex: Comprar agora, agendar diagnóstico, falar com consultor, entrar no WhatsApp, garantir vaga ou solicitar proposta."
              onChange={(value) => updateField("mainCall", value)}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Público e temperatura da audiência"
        description="Defina os públicos que podem receber a campanha e como a comunicação deve mudar conforme a temperatura."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <TextAreaField
            label="Público frio"
            value={data.audienceCold}
            rows={7}
            placeholder="Ex: Públicos semelhantes, interesses, busca ativa, segmentações por dor, comportamento ou perfil."
            onChange={(value) => updateField("audienceCold", value)}
          />

          <TextAreaField
            label="Público morno"
            value={data.audienceWarm}
            rows={7}
            placeholder="Ex: Engajados nas redes, visualizadores de vídeo, visitantes do site, pessoas que consumiram conteúdo ou abriram e-mails."
            onChange={(value) => updateField("audienceWarm", value)}
          />

          <TextAreaField
            label="Público quente"
            value={data.audienceHot}
            rows={7}
            placeholder="Ex: Leads, lista de WhatsApp, visitantes da página de vendas, pessoas que iniciaram checkout ou solicitaram contato."
            onChange={(value) => updateField("audienceHot", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Estratégia da campanha"
        description="Defina objetivo, posicionamento, direção dos criativos e cenário estratégico da campanha de venda."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Objetivo da campanha"
            value={data.objective}
            rows={6}
            placeholder="Ex: Gerar vendas diretas, agendar reuniões comerciais, recuperar leads quentes, vender uma oferta específica ou conduzir interessados para o WhatsApp."
            onChange={(value) => updateField("objective", value)}
          />

          <TextAreaField
            label="Posicionamento"
            value={data.positioning}
            rows={6}
            placeholder="Ex: Como a oferta deve ser percebida, qual ângulo de venda será usado e por que o público deveria agir agora."
            onChange={(value) => updateField("positioning", value)}
          />

          <TextAreaField
            label="Direção dos criativos"
            value={data.creativeDirection}
            rows={6}
            placeholder="Ex: Depoimentos, prova social, estudo de caso, vídeo de oferta, antes e depois, demonstração, chamada direta, urgência ou quebra de objeções."
            onChange={(value) => updateField("creativeDirection", value)}
          />

          <TextAreaField
            label="Cenário estratégico"
            value={data.strategicScenario}
            rows={6}
            placeholder="Ex: Testar remarketing para leads aquecidos, alinhar promessa com página de vendas, apresentar prova forte e deixar o próximo passo muito claro."
            onChange={(value) => updateField("strategicScenario", value)}
          />
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
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo destino
        </button>
      </SectionCard>

      <SectionCard
        title="Objeções e argumentos de venda"
        description="Liste as principais objeções que podem impedir a compra e quais argumentos devem ser usados para superá-las."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Objeções principais"
            value={data.mainObjections}
            rows={7}
            placeholder="Ex: Está caro, não tenho tempo, não sei se funciona, preciso pensar, já tentei antes, não é prioridade agora."
            onChange={(value) => updateField("mainObjections", value)}
          />

          <TextAreaField
            label="Respostas estratégicas"
            value={data.strategicResponses}
            rows={7}
            placeholder="Escreva argumentos, provas, comparações, garantias, explicações ou conteúdos que ajudem a superar as objeções."
            onChange={(value) => updateField("strategicResponses", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Página, checkout ou atendimento"
        description="Defina o destino da campanha e o que precisa existir para a conversão acontecer com clareza."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Destino principal"
            value={data.salesPageDestination}
            rows={6}
            placeholder="Ex: Página de vendas, WhatsApp, checkout, agenda, formulário de aplicação ou conversa comercial."
            onChange={(value) => updateField("salesPageDestination", value)}
          />

          <TextAreaField
            label="CTA principal"
            value={data.mainCta}
            rows={6}
            placeholder="Ex: Comprar agora, agendar diagnóstico, falar com consultor, entrar no WhatsApp, garantir vaga ou solicitar proposta."
            onChange={(value) => updateField("mainCta", value)}
          />

          <TextAreaField
            label="Elementos de prova"
            value={data.proofElements}
            rows={6}
            placeholder="Ex: Depoimentos, cases, números, prints, antes e depois, logos de clientes, certificações ou bastidores."
            onChange={(value) => updateField("proofElements", value)}
          />

          <TextAreaField
            label="Urgência ou escassez"
            value={data.urgencyAndScarcity}
            rows={6}
            placeholder="Ex: Vagas limitadas, bônus por tempo, turma fechando, condição especial, prazo de inscrição ou agenda limitada."
            onChange={(value) => updateField("urgencyAndScarcity", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Estrutura de remarketing"
        description="Defina como a campanha deve perseguir pessoas que já demonstraram interesse, mas ainda não converteram."
      >
        <TextAreaField
          label=""
          value={data.remarketingStructure}
          rows={8}
          placeholder="Ex: Impactar visitantes da página de vendas, pessoas que clicaram no WhatsApp, leads que abriram e-mails, visualizadores de vídeo e pessoas que adicionaram ao carrinho, usando provas, objeções, urgência e chamadas diretas."
          onChange={(value) => updateField("remarketingStructure", value)}
        />
      </SectionCard>

      <SectionCard
        title="Métricas da campanha"
        description="Defina os indicadores que devem ser acompanhados para avaliar a performance de vendas."
      >
        <TextAreaField
          label=""
          value={data.metrics}
          rows={8}
          placeholder="Ex: Custo por compra, custo por reunião, ROAS, taxa de conversão, faturamento, boletos gerados, leads qualificados, cliques no WhatsApp, CPA e receita por campanha."
          onChange={(value) => updateField("metrics", value)}
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
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova referência
        </button>
      </SectionCard>

      <div className="sticky bottom-0 rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href={`/admin/planejamentos/${clientSlug}`}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Voltar para módulos
          </Link>

          <Link
            href={presentationHref}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
