"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type JourneyStageData = {
  awarenessLevel: string;
  thoughts: string;
  pains: string;
  recommendedContent: string;
  recommendedChannels: string;
  desiredNextStep: string;
  conversionPoint: string;
};

export type JourneyReference = {
  title: string;
  link: string;
};

export type BuyingJourneyData = {
  overview: string;
  stages: JourneyStageData[];
  turningPoints: {
    discoveryToPain: string;
    painToSolution: string;
    solutionToComparison: string;
    comparisonToDecision: string;
  };
  objections: {
    beginning: string;
    middle: string;
    end: string;
  };
  advancementTriggers: string;
  essentialContent: {
    awareness: string;
    decision: string;
  };
  funnelCampaignsAutomation: string;
  references: JourneyReference[];
};

export const awarenessLevels = [
  "Inconsciente",
  "Consciente do problema",
  "Consciente da solução",
  "Consciente do produto",
  "Mais consciente",
];

export const journeyStages = [
  {
    title: "Descoberta do problema",
    subtitle: "A pessoa começa a perceber que existe algo errado",
    description:
      "Nesta etapa, o público ainda não tem clareza total sobre o problema. Ele sente sintomas, incômodos ou dificuldades, mas ainda pode não saber nomear a causa.",
    thoughtsPlaceholder:
      "Ex: Estou fazendo muita coisa, mas não vejo resultado. Minha comunicação parece sem direção. Não sei se minha estratégia está funcionando.",
    painsPlaceholder:
      "Ex: Falta de clareza, queda de engajamento, pouca geração de demanda, dificuldade para se posicionar, sensação de esforço sem retorno.",
    contentPlaceholder:
      "Ex: Conteúdos sobre sintomas do problema, erros comuns, sinais de falta de estratégia, comparações simples, posts educativos e conteúdos de conscientização.",
    channelsPlaceholder:
      "Ex: Instagram, TikTok, YouTube Shorts, Blog, Pinterest, anúncios de alcance ou conteúdos de topo de funil.",
    actionPlaceholder:
      "Ex: Fazer a pessoa reconhecer que existe um problema estratégico e começar a prestar atenção no tema.",
  },
  {
    title: "Consciência da dor",
    subtitle: "A pessoa entende melhor o impacto do problema",
    description:
      "Nesta etapa, o público já percebe que o problema existe e começa a entender como ele afeta seus resultados, sua autoridade, sua comunicação ou suas vendas.",
    thoughtsPlaceholder:
      "Ex: Agora entendo que o problema não é só postar pouco. Talvez falte estratégia, posicionamento, calendário, clareza de oferta ou estrutura.",
    painsPlaceholder:
      "Ex: Medo de continuar estagnado, frustração por não crescer, insegurança sobre o que comunicar, dificuldade para atrair clientes certos.",
    contentPlaceholder:
      "Ex: Conteúdos que aprofundam a dor, explicam causas, mostram consequências, apresentam diagnósticos e ajudam a pessoa a se enxergar no problema.",
    channelsPlaceholder:
      "Ex: Instagram, carrosséis educativos, vídeos explicativos, blog, e-mails, lives e conteúdos de autoridade.",
    actionPlaceholder:
      "Ex: Fazer a pessoa assumir que precisa resolver o problema e se interessar por caminhos de solução.",
  },
  {
    title: "Busca por solução",
    subtitle: "A pessoa começa a procurar formas de resolver",
    description:
      "Nesta etapa, o público já sabe que precisa de uma solução e começa a buscar métodos, ferramentas, profissionais, serviços, conteúdos ou processos que possam ajudar.",
    thoughtsPlaceholder:
      "Ex: Preciso organizar minha estratégia. Talvez eu precise de um planejamento, consultoria, método, diagnóstico ou alguém para me guiar.",
    painsPlaceholder:
      "Ex: Dúvida sobre por onde começar, medo de escolher errado, excesso de opções, falta de critério para comparar soluções.",
    contentPlaceholder:
      "Ex: Conteúdos sobre métodos, passo a passo, guias, checklists, aulas, diagnósticos, materiais educativos e explicações sobre processos.",
    channelsPlaceholder:
      "Ex: Materiais ricos, landing pages, YouTube, blog, e-mail, WhatsApp, lives e campanhas de captação de leads.",
    actionPlaceholder:
      "Ex: Fazer a pessoa entrar em uma lista, baixar um material, assistir uma aula, responder um formulário ou pedir mais informações.",
  },
  {
    title: "Comparação de alternativas",
    subtitle: "A pessoa avalia opções antes de decidir",
    description:
      "Nesta etapa, o público compara caminhos, profissionais, métodos, preços, entregas, provas e diferenciais. Ele quer entender qual solução faz mais sentido.",
    thoughtsPlaceholder:
      "Ex: Qual solução é melhor para mim? O que esse método tem de diferente? Será que funciona para o meu caso? Vale o investimento?",
    painsPlaceholder:
      "Ex: Medo de investir errado, receio de não ter retorno, dúvida sobre a entrega, insegurança sobre resultados e comparação com concorrentes.",
    contentPlaceholder:
      "Ex: Comparativos, estudos de caso, provas sociais, bastidores da entrega, diferenciais, perguntas frequentes, conteúdos de objeção e autoridade.",
    channelsPlaceholder:
      "Ex: WhatsApp, e-mail, remarketing, página de vendas, apresentação comercial, reuniões, cases e conteúdos de prova.",
    actionPlaceholder:
      "Ex: Fazer a pessoa escolher a solução, pedir proposta, agendar reunião, entrar no WhatsApp ou avançar para uma conversa comercial.",
  },
  {
    title: "Decisão de compra",
    subtitle: "A pessoa está pronta para agir",
    description:
      "Nesta etapa, o público precisa de segurança para tomar a decisão. Ele já entende a dor, conhece a solução e precisa de clareza sobre oferta, entrega, prazo e próximo passo.",
    thoughtsPlaceholder:
      "Ex: Quero resolver isso agora. Preciso entender exatamente o que vou receber, como funciona, qual o investimento e como começo.",
    painsPlaceholder:
      "Ex: Medo de não conseguir executar, insegurança financeira, dúvida sobre prioridade, necessidade de confiança e clareza sobre o processo.",
    contentPlaceholder:
      "Ex: Oferta, página de vendas, proposta, depoimentos, garantias, bônus, urgência, escassez, chamada para diagnóstico, reunião ou checkout.",
    channelsPlaceholder:
      "Ex: WhatsApp, página de vendas, checkout, reunião, ligação, e-mail de venda, remarketing e campanha de conversão.",
    actionPlaceholder:
      "Ex: Fazer a pessoa comprar, agendar, contratar, pagar, solicitar proposta ou confirmar o início do projeto.",
  },
  {
    title: "Pós-compra e fidelização",
    subtitle: "A pessoa precisa confirmar que fez uma boa escolha",
    description:
      "Nesta etapa, o cliente já comprou ou contratou. O objetivo é gerar segurança, entregar valor, manter relacionamento, estimular continuidade e criar prova social.",
    thoughtsPlaceholder:
      "Ex: Fiz uma boa escolha? Como vou usar isso agora? Qual é o próximo passo? Como sei se estou evoluindo?",
    painsPlaceholder:
      "Ex: Ansiedade após a compra, medo de não conseguir aplicar, falta de acompanhamento, dúvidas iniciais e necessidade de validação.",
    contentPlaceholder:
      "Ex: Onboarding, mensagens de boas-vindas, guias de uso, acompanhamento, checklists, conteúdos de suporte, pedido de depoimento e próximos passos.",
    channelsPlaceholder:
      "Ex: WhatsApp, e-mail, área do cliente, reuniões, Notion, Google Drive, comunidade, CRM e automações pós-compra.",
    actionPlaceholder:
      "Ex: Fazer o cliente iniciar bem, consumir a entrega, perceber valor, continuar o relacionamento, indicar ou comprar novamente.",
  },
];

function createEmptyStage(): JourneyStageData {
  return {
    awarenessLevel: awarenessLevels[0],
    thoughts: "",
    pains: "",
    recommendedContent: "",
    recommendedChannels: "",
    desiredNextStep: "",
    conversionPoint: "",
  };
}

export const initialBuyingJourneyData: BuyingJourneyData = {
  overview: "",
  stages: journeyStages.map(() => createEmptyStage()),
  turningPoints: {
    discoveryToPain: "",
    painToSolution: "",
    solutionToComparison: "",
    comparisonToDecision: "",
  },
  objections: {
    beginning: "",
    middle: "",
    end: "",
  },
  advancementTriggers: "",
  essentialContent: {
    awareness: "",
    decision: "",
  },
  funnelCampaignsAutomation: "",
  references: [
    {
      title: "",
      link: "",
    },
  ],
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
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      ) : null}

      <div className="mt-6">{children}</div>
    </section>
  );
}

function TextAreaInput({
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

type JornadaCompraFormProps = {
  data: BuyingJourneyData;
  setData: Dispatch<SetStateAction<BuyingJourneyData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function JornadaCompraForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: JornadaCompraFormProps) {
  function updateOverview(value: string) {
    setData((current) => ({
      ...current,
      overview: value,
    }));
  }

  function updateStage(
    stageIndex: number,
    key: keyof JourneyStageData,
    value: string
  ) {
    setData((current) => {
      const nextStages = [...current.stages];

      nextStages[stageIndex] = {
        ...(nextStages[stageIndex] || createEmptyStage()),
        [key]: value,
      };

      return {
        ...current,
        stages: nextStages,
      };
    });
  }

  function updateTurningPoint(
    key: keyof BuyingJourneyData["turningPoints"],
    value: string
  ) {
    setData((current) => ({
      ...current,
      turningPoints: {
        ...current.turningPoints,
        [key]: value,
      },
    }));
  }

  function updateObjection(
    key: keyof BuyingJourneyData["objections"],
    value: string
  ) {
    setData((current) => ({
      ...current,
      objections: {
        ...current.objections,
        [key]: value,
      },
    }));
  }

  function updateEssentialContent(
    key: keyof BuyingJourneyData["essentialContent"],
    value: string
  ) {
    setData((current) => ({
      ...current,
      essentialContent: {
        ...current.essentialContent,
        [key]: value,
      },
    }));
  }

  function updateReference(
    index: number,
    key: keyof JourneyReference,
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
      references: [
        ...current.references,
        {
          title: "",
          link: "",
        },
      ],
    }));
  }

  function removeReference(index: number) {
    setData((current) => ({
      ...current,
      references:
        current.references.length > 1
          ? current.references.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                title: "",
                link: "",
              },
            ],
    }));
  }

  return (
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Visão geral da jornada"
        description="Explique como o público geralmente evolui até se tornar cliente. Este campo ajuda a resumir a lógica da jornada antes de detalhar cada etapa."
      >
        <RichTextEditor
          value={data.overview}
          onChange={updateOverview}
          placeholder="Ex: O público começa sentindo dificuldade para gerar demanda, depois entende que falta estratégia, busca soluções, compara métodos e finalmente decide contratar quando percebe clareza, prova e segurança."
        />
      </SectionCard>

      {journeyStages.map((stage, index) => {
        const stageData = data.stages[index] || createEmptyStage();

        return (
          <SectionCard key={stage.title} title={`Etapa ${index + 1}`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Etapa {index + 1}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  {stage.title}
                </h2>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {stage.subtitle}
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                  {stage.description}
                </p>
              </div>

              <div className="w-full lg:w-64">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Nível de consciência
                </label>

                <select
                  value={stageData.awarenessLevel}
                  onChange={(event) =>
                    updateStage(index, "awarenessLevel", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  {awarenessLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextAreaInput
                label="O que a pessoa pensa ou sente nesta etapa?"
                value={stageData.thoughts}
                placeholder={stage.thoughtsPlaceholder}
                onChange={(value) => updateStage(index, "thoughts", value)}
              />

              <TextAreaInput
                label="Dores, dúvidas e desejos"
                value={stageData.pains}
                placeholder={stage.painsPlaceholder}
                onChange={(value) => updateStage(index, "pains", value)}
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextAreaInput
                label="Conteúdos recomendados"
                value={stageData.recommendedContent}
                placeholder={stage.contentPlaceholder}
                onChange={(value) =>
                  updateStage(index, "recommendedContent", value)
                }
              />

              <TextAreaInput
                label="Canais recomendados"
                value={stageData.recommendedChannels}
                placeholder={stage.channelsPlaceholder}
                onChange={(value) =>
                  updateStage(index, "recommendedChannels", value)
                }
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextAreaInput
                label="Próximo passo desejado"
                value={stageData.desiredNextStep}
                placeholder={stage.actionPlaceholder}
                rows={4}
                onChange={(value) =>
                  updateStage(index, "desiredNextStep", value)
                }
              />

              <TextAreaInput
                label="Ponto de conversão desta etapa"
                value={stageData.conversionPoint}
                placeholder="Ex: Seguir perfil, salvar conteúdo, comentar, responder story, baixar material, clicar no link, entrar no WhatsApp, agendar reunião ou comprar."
                rows={4}
                onChange={(value) =>
                  updateStage(index, "conversionPoint", value)
                }
              />
            </div>
          </SectionCard>
        );
      })}

      <SectionCard
        title="Pontos de virada da jornada"
        description="Liste os momentos em que o público muda de percepção e avança para a próxima etapa."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaInput
            label="Da descoberta para a consciência da dor"
            value={data.turningPoints.discoveryToPain}
            placeholder="O que faz a pessoa perceber que o problema é real?"
            onChange={(value) => updateTurningPoint("discoveryToPain", value)}
          />

          <TextAreaInput
            label="Da consciência da dor para a busca por solução"
            value={data.turningPoints.painToSolution}
            placeholder="O que faz a pessoa querer resolver?"
            onChange={(value) => updateTurningPoint("painToSolution", value)}
          />

          <TextAreaInput
            label="Da busca por solução para a comparação"
            value={data.turningPoints.solutionToComparison}
            placeholder="O que faz a pessoa considerar o projeto como opção?"
            onChange={(value) =>
              updateTurningPoint("solutionToComparison", value)
            }
          />

          <TextAreaInput
            label="Da comparação para a decisão"
            value={data.turningPoints.comparisonToDecision}
            placeholder="O que faz a pessoa confiar e comprar?"
            onChange={(value) =>
              updateTurningPoint("comparisonToDecision", value)
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Objeções por etapa"
        description="Mapeie quais dúvidas ou resistências podem aparecer em cada fase da jornada."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <TextAreaInput
            label="Início da jornada"
            value={data.objections.beginning}
            placeholder="Objeções, dúvidas e resistências iniciais."
            onChange={(value) => updateObjection("beginning", value)}
          />

          <TextAreaInput
            label="Meio da jornada"
            value={data.objections.middle}
            placeholder="Dúvidas sobre método, solução, tempo, investimento ou prioridade."
            onChange={(value) => updateObjection("middle", value)}
          />

          <TextAreaInput
            label="Final da jornada"
            value={data.objections.end}
            placeholder="Objeções antes da compra, inseguranças, comparação e necessidade de prova."
            onChange={(value) => updateObjection("end", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Gatilhos de avanço"
        description="Defina quais mensagens, conteúdos, provas ou ações ajudam o público a avançar de uma etapa para outra."
      >
        <RichTextEditor
          value={data.advancementTriggers}
          onChange={(value) =>
            setData((current) => ({ ...current, advancementTriggers: value }))
          }
          placeholder="Ex: Mostrar sintomas do problema, apresentar consequências, oferecer um diagnóstico, entregar prova social, mostrar bastidores da solução, quebrar objeções, criar urgência e direcionar para conversa comercial."
        />
      </SectionCard>

      <SectionCard
        title="Conteúdos essenciais para conduzir a compra"
        description="Liste conteúdos que não podem faltar para conduzir o público pela jornada."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaInput
            label="Conteúdos de conscientização"
            value={data.essentialContent.awareness}
            placeholder="Ex: Erros comuns, sinais do problema, conteúdos educativos, diagnósticos, comparações e conteúdos de clareza."
            onChange={(value) => updateEssentialContent("awareness", value)}
          />

          <TextAreaInput
            label="Conteúdos de decisão"
            value={data.essentialContent.decision}
            placeholder="Ex: Provas sociais, estudos de caso, oferta, perguntas frequentes, bastidores da entrega, depoimentos e chamada para ação."
            onChange={(value) => updateEssentialContent("decision", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Relação com funil de conteúdo, campanhas e automações"
        description="Explique como esta jornada deve orientar o funil de conteúdo, as campanhas de tráfego e os fluxos de automação."
      >
        <RichTextEditor
          value={data.funnelCampaignsAutomation}
          onChange={(value) =>
            setData((current) => ({ ...current, funnelCampaignsAutomation: value }))
          }
          placeholder="Ex: A etapa de descoberta orienta conteúdos de atração. A etapa de busca por solução orienta materiais educativos e captação de leads. A comparação orienta remarketing e provas sociais. A decisão orienta campanhas de conversão e mensagens comerciais. O pós-compra orienta automações de onboarding e fidelização."
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a jornada de compra."
      >
        <div className="space-y-4">
          {data.references.map((reference, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Referência {String(index + 1).padStart(2, "0")}
                </p>

                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
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
                    placeholder="Ex: Jornada, pesquisa, referência, mapa, aula, documento ou exemplo"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addReference}
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
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