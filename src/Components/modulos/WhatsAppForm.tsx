"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type WhatsAppFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

export type WhatsAppTextListItem = {
  value: string;
};

export type WhatsAppVisualReference = {
  image: string;
};

export type WhatsAppExternalReference = {
  title: string;
  link: string;
};

export type WhatsAppData = {
  frequencyItems: WhatsAppFrequencyItem[];
  objectives: WhatsAppTextListItem[];
  languageStructures: WhatsAppTextListItem[];
  contents: WhatsAppTextListItem[];
  firstContactFlow: string;
  nurtureFlow: string;
  salesFlow: string;
  postSaleFlow: string;
  visualStrategy: string;
  visualReferences: WhatsAppVisualReference[];
  mainNumber: string;
  directLink: string;
  initialMessage: string;
  serviceNotes: string;
  references: WhatsAppExternalReference[];
};

export const initialWhatsAppFrequencyItems: WhatsAppFrequencyItem[] = [
  {
    format: "Mensagem de relacionamento",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Conteúdo estratégico",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Lista de transmissão",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Acompanhamento comercial",
    quantity: "",
    period: "por semana",
    observation: "",
  },
];

export const initialWhatsAppData: WhatsAppData = {
  frequencyItems: initialWhatsAppFrequencyItems,
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  contents: [{ value: "" }],
  firstContactFlow: "",
  nurtureFlow: "",
  salesFlow: "",
  postSaleFlow: "",
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  mainNumber: "",
  directLink: "",
  initialMessage: "",
  serviceNotes: "",
  references: [{ title: "", link: "" }],
};

export function normalizeWhatsAppTextList(value: unknown): WhatsAppTextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return { value: item };
    }

    if (item && typeof item === "object") {
      const record = item as Partial<WhatsAppTextListItem>;
      return { value: record.value || "" };
    }

    return { value: "" };
  });
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
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
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

type WhatsAppFormProps = {
  data: WhatsAppData;
  setData: Dispatch<SetStateAction<WhatsAppData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function WhatsAppForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: WhatsAppFormProps) {
  function updateFrequencyItem(
    index: number,
    key: keyof WhatsAppFrequencyItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.frequencyItems];
      nextItems[index] = { ...nextItems[index], [key]: value };
      return { ...current, frequencyItems: nextItems };
    });
  }

  function addFrequencyItem() {
    setData((current) => ({
      ...current,
      frequencyItems: [
        ...current.frequencyItems,
        { format: "", quantity: "", period: "por semana", observation: "" },
      ],
    }));
  }

  function removeFrequencyItem(index: number) {
    setData((current) => ({
      ...current,
      frequencyItems:
        current.frequencyItems.length > 1
          ? current.frequencyItems.filter((_, i) => i !== index)
          : [{ format: "", quantity: "", period: "por semana", observation: "" }],
    }));
  }

  function updateTextListItem(
    listKey: "objectives" | "languageStructures" | "contents",
    index: number,
    value: string
  ) {
    setData((current) => {
      const nextList = [...current[listKey]];
      nextList[index] = { value };
      return { ...current, [listKey]: nextList };
    });
  }

  function addTextListItem(
    listKey: "objectives" | "languageStructures" | "contents"
  ) {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(
    listKey: "objectives" | "languageStructures" | "contents",
    index: number
  ) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, i) => i !== index)
          : [{ value: "" }],
    }));
  }

  function updateVisualReferenceImage(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setData((current) => {
        const nextReferences = [...current.visualReferences];
        nextReferences[index] = { image: String(reader.result || "") };
        return { ...current, visualReferences: nextReferences };
      });
    };
    reader.readAsDataURL(file);
  }

  function removeVisualReferenceImage(index: number) {
    setData((current) => {
      const nextReferences = [...current.visualReferences];
      nextReferences[index] = { image: "" };
      return { ...current, visualReferences: nextReferences };
    });
  }

  function updateReference(
    index: number,
    key: keyof WhatsAppExternalReference,
    value: string
  ) {
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

  function TextListSection({
    title,
    description,
    listKey,
    placeholder,
    buttonLabel,
  }: {
    title: string;
    description: string;
    listKey: "objectives" | "languageStructures" | "contents";
    placeholder: string;
    buttonLabel: string;
  }) {
    return (
      <SectionCard title={title} description={description}>
        <div className="space-y-3">
          {data[listKey].map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={item.value}
                onChange={(event) =>
                  updateTextListItem(listKey, index, event.target.value)
                }
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <button
                type="button"
                onClick={() => removeTextListItem(listKey, index)}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addTextListItem(listKey)}
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + {buttonLabel}
        </button>
      </SectionCard>
    );
  }

  return (
    <div>
      <SectionCard
        title="Configurações e links do WhatsApp"
        description="Registre informações importantes para configurar o canal, facilitar o contato e organizar a experiência de atendimento."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Número principal
            </label>

            <input
              type="text"
              value={data.mainNumber}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  mainNumber: event.target.value,
                }))
              }
              placeholder="Ex: +55 11 99999-9999"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Link direto
            </label>

            <input
              type="url"
              value={data.directLink}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  directLink: event.target.value,
                }))
              }
              placeholder="https://wa.me/..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Mensagem inicial sugerida
            </label>

            <RichTextEditor
              value={data.initialMessage}
              onChange={(value) =>
                setData((current) => ({ ...current, initialMessage: value }))
              }
              placeholder="Escreva uma mensagem inicial para quem clicar no link do WhatsApp."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Observações de atendimento
            </label>

            <RichTextEditor
              value={data.serviceNotes}
              onChange={(value) =>
                setData((current) => ({ ...current, serviceNotes: value }))
              }
              placeholder="Registre horários, responsáveis, tempo ideal de resposta, etiquetas, etapas e cuidados no atendimento."
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Frequência"
        description="Defina a frequência por tipo de envio, mensagem, conteúdo, lista de transmissão, lembrete, contato comercial ou acompanhamento."
      >
        <div className="space-y-4">
          {data.frequencyItems.map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_160px_180px_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Formato
                </label>

                <input
                  type="text"
                  value={item.format}
                  onChange={(event) =>
                    updateFrequencyItem(index, "format", event.target.value)
                  }
                  placeholder="Ex: Mensagem de relacionamento"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Quantidade
                </label>

                <input
                  type="text"
                  value={item.quantity}
                  onChange={(event) =>
                    updateFrequencyItem(index, "quantity", event.target.value)
                  }
                  placeholder="Ex: 2"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Período
                </label>

                <select
                  value={item.period}
                  onChange={(event) =>
                    updateFrequencyItem(index, "period", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  <option value="por dia">por dia</option>
                  <option value="por semana">por semana</option>
                  <option value="por mês">por mês</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Observação
                </label>

                <input
                  type="text"
                  value={item.observation}
                  onChange={(event) =>
                    updateFrequencyItem(index, "observation", event.target.value)
                  }
                  placeholder="Ex: Usar para nutrição, relacionamento ou conversão."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeFrequencyItem(index)}
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
          onClick={addFrequencyItem}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Novo formato
        </button>
      </SectionCard>

      <TextListSection
        title="Objetivos"
        description="Defina os objetivos específicos do WhatsApp: atendimento, relacionamento, nutrição, vendas, suporte, recuperação de oportunidades ou distribuição de conteúdo."
        listKey="objectives"
        placeholder="Ex: Nutrir leads, responder dúvidas, conduzir para venda, enviar conteúdos estratégicos..."
        buttonLabel="Novo objetivo"
      />

      <TextListSection
        title="Estruturas de linguagem"
        description="Descreva estruturas de linguagem adequadas para conversas, mensagens, listas de transmissão, grupos e atendimentos no WhatsApp."
        listKey="languageStructures"
        placeholder="Ex: Saudação inicial, acolhimento, pergunta de diagnóstico, resposta objetiva, próxima ação e chamada para conversa."
        buttonLabel="Nova estrutura de linguagem"
      />

      <TextListSection
        title="Conteúdos"
        description="Defina tipos de mensagens, conteúdos e materiais que podem ser enviados pelo WhatsApp."
        listKey="contents"
        placeholder="Ex: Mensagem de boas-vindas, conteúdo educativo, convite, lembrete, oferta, acompanhamento, pós-venda..."
        buttonLabel="Novo conteúdo"
      />

      <SectionCard
        title="Fluxos de conversa"
        description="Organize os principais fluxos de conversa que devem acontecer no WhatsApp."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Primeiro atendimento
            </label>

            <RichTextEditor
              value={data.firstContactFlow}
              onChange={(value) =>
                setData((current) => ({ ...current, firstContactFlow: value }))
              }
              placeholder="Descreva como deve ser a primeira resposta, quais perguntas fazer e qual próxima ação conduzir."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Nutrição e relacionamento
            </label>

            <RichTextEditor
              value={data.nurtureFlow}
              onChange={(value) =>
                setData((current) => ({ ...current, nurtureFlow: value }))
              }
              placeholder="Descreva como manter contato, enviar conteúdos, gerar valor e preparar a pessoa para uma decisão."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Conversão de vendas
            </label>

            <RichTextEditor
              value={data.salesFlow}
              onChange={(value) =>
                setData((current) => ({ ...current, salesFlow: value }))
              }
              placeholder="Descreva como apresentar oferta, responder objeções, conduzir para pagamento, reunião ou fechamento."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Pós-venda e acompanhamento
            </label>

            <RichTextEditor
              value={data.postSaleFlow}
              onChange={(value) =>
                setData((current) => ({ ...current, postSaleFlow: value }))
              }
              placeholder="Descreva como acompanhar o cliente após a compra, pedir feedback, enviar orientações e manter relacionamento."
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Identidade visual"
        description="Defina como os materiais enviados pelo WhatsApp devem parecer, incluindo cards, PDFs, imagens, convites, listas de transmissão e mensagens visuais."
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Estratégia visual
          </label>

          <RichTextEditor
            value={data.visualStrategy}
            onChange={(value) =>
              setData((current) => ({ ...current, visualStrategy: value }))
            }
            placeholder="Explique a direção visual dos materiais enviados no WhatsApp: estilo dos cards, PDFs, imagens, convites, capas e materiais de apoio."
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.visualReferences.map((reference, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
            >
              <label className="flex aspect-video cursor-pointer items-center justify-center text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100">
                {reference.image ? (
                  <img
                    src={reference.image}
                    alt={`Referência ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    +<br />
                    Adicionar referência
                  </span>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) =>
                    updateVisualReferenceImage(index, event)
                  }
                  className="hidden"
                />
              </label>

              <div className="p-3">
                <button
                  type="button"
                  onClick={() => removeVisualReferenceImage(index)}
                  className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Tamanho recomendado para imagem: 1920x1080px.
        </p>
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do WhatsApp."
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
                  placeholder="Ex: Script, mensagem, fluxo, lista, campanha ou material de apoio"
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

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
            className="cursor-pointer inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
