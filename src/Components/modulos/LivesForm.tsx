"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import RichTextEditor from "@/Components/RichTextEditor";

type FrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

export type NetworkFrequencyItem = {
  channel: string;
  frequency: string;
};

type TextListItem = {
  value: string;
};

type VisualReference = {
  image: string;
};

export type LiveContentItem = {
  title: string;
  suggestedDate: string;
  channel: string;
  objective: string;
  observation: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

export type LivesData = {
  frequencyItems: FrequencyItem[];
  networkFrequencies: NetworkFrequencyItem[];
  objectives: TextListItem[];
  languageStructures: TextListItem[];
  openingScript: string;
  centralContent: string;
  publicInteraction: string;
  closingAndCall: string;
  visualStrategy: string;
  visualReferences: VisualReference[];
  contents: LiveContentItem[];
  beforeAndAfterPromotion: string;
  repurposingStrategy: string;
  references: ExternalReference[];
};

export const initialLivesFrequencyItems: FrequencyItem[] = [
  { format: "Live principal", quantity: "", period: "por semana", observation: "" },
  { format: "Live de lançamento", quantity: "", period: "por mês", observation: "" },
  { format: "Live de relacionamento", quantity: "", period: "por mês", observation: "" },
  { format: "Aula ao vivo", quantity: "", period: "por mês", observation: "" },
];

export const initialLivesData: LivesData = {
  frequencyItems: initialLivesFrequencyItems,
  networkFrequencies: [{ channel: "", frequency: "" }],
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  openingScript: "",
  centralContent: "",
  publicInteraction: "",
  closingAndCall: "",
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  contents: [{ title: "", suggestedDate: "", channel: "", objective: "", observation: "" }],
  beforeAndAfterPromotion: "",
  repurposingStrategy: "",
  references: [{ title: "", link: "" }],
};

export function normalizeLivesTextList(value: unknown): TextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") return { value: item };
    if (item && typeof item === "object") {
      const record = item as Partial<TextListItem>;
      return { value: record.value || "" };
    }
    return { value: "" };
  });
}

type LivesFormProps = {
  data: LivesData;
  setData: React.Dispatch<React.SetStateAction<LivesData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function LivesForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: LivesFormProps) {
  const [expandedContent, setExpandedContent] = useState<number | null>(0);

  function updateFrequencyItem(index: number, key: keyof FrequencyItem, value: string) {
    setData((current) => {
      const next = [...current.frequencyItems];
      next[index] = { ...next[index], [key]: value };
      return { ...current, frequencyItems: next };
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

  function updateNetworkFrequency(index: number, key: keyof NetworkFrequencyItem, value: string) {
    setData((current) => {
      const next = [...current.networkFrequencies];
      next[index] = { ...next[index], [key]: value };
      return { ...current, networkFrequencies: next };
    });
  }

  function addNetworkFrequency() {
    setData((current) => ({
      ...current,
      networkFrequencies: [...current.networkFrequencies, { channel: "", frequency: "" }],
    }));
  }

  function removeNetworkFrequency(index: number) {
    setData((current) => ({
      ...current,
      networkFrequencies:
        current.networkFrequencies.length > 1
          ? current.networkFrequencies.filter((_, i) => i !== index)
          : [{ channel: "", frequency: "" }],
    }));
  }

  function updateTextListItem(
    listKey: "objectives" | "languageStructures",
    index: number,
    value: string
  ) {
    setData((current) => {
      const next = [...current[listKey]];
      next[index] = { value };
      return { ...current, [listKey]: next };
    });
  }

  function addTextListItem(listKey: "objectives" | "languageStructures") {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(listKey: "objectives" | "languageStructures", index: number) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, i) => i !== index)
          : [{ value: "" }],
    }));
  }

  function updateVisualReferenceImage(index: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setData((current) => {
        const next = [...current.visualReferences];
        next[index] = { image: String(reader.result || "") };
        return { ...current, visualReferences: next };
      });
    };
    reader.readAsDataURL(file);
  }

  function removeVisualReferenceImage(index: number) {
    setData((current) => {
      const next = [...current.visualReferences];
      next[index] = { image: "" };
      return { ...current, visualReferences: next };
    });
  }

  function updateContent(index: number, key: keyof LiveContentItem, value: string) {
    setData((current) => {
      const next = [...current.contents];
      next[index] = { ...next[index], [key]: value };
      return { ...current, contents: next };
    });
  }

  function addContent() {
    setData((current) => ({
      ...current,
      contents: [
        ...current.contents,
        { title: "", suggestedDate: "", channel: "", objective: "", observation: "" },
      ],
    }));
    setExpandedContent(data.contents.length);
  }

  function removeContent(index: number) {
    setData((current) => ({
      ...current,
      contents:
        current.contents.length > 1
          ? current.contents.filter((_, i) => i !== index)
          : [{ title: "", suggestedDate: "", channel: "", objective: "", observation: "" }],
    }));
    setExpandedContent(null);
  }

  function updateReference(index: number, key: "title" | "link", value: string) {
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

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";
  const textareaClass =
    "w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";
  const labelClass = "mb-2 block text-sm font-semibold text-slate-600";

  return (
    <div className="mt-6 space-y-6">
      {/* Frequência */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Frequência</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Defina a frequência por tipo de live. Use quantidade e período para deixar a orientação mais clara.
        </p>

        <div className="mt-6 space-y-4">
          {data.frequencyItems.map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_160px_180px_1fr_auto]"
            >
              <div>
                <label className={labelClass}>Formato</label>
                <input
                  type="text"
                  value={item.format}
                  onChange={(e) => updateFrequencyItem(index, "format", e.target.value)}
                  placeholder="Ex: Live principal"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Quantidade</label>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => updateFrequencyItem(index, "quantity", e.target.value)}
                  placeholder="Ex: 1"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Período</label>
                <select
                  value={item.period}
                  onChange={(e) => updateFrequencyItem(index, "period", e.target.value)}
                  className={inputClass}
                >
                  <option value="por dia">por dia</option>
                  <option value="por semana">por semana</option>
                  <option value="por quinzena">por quinzena</option>
                  <option value="por mês">por mês</option>
                  <option value="por lançamento">por lançamento</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Observação</label>
                <input
                  type="text"
                  value={item.observation}
                  onChange={(e) => updateFrequencyItem(index, "observation", e.target.value)}
                  placeholder="Ex: Usar para aquecimento, relacionamento ou venda."
                  className={inputClass}
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
      </section>

      {/* Frequência por rede */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Frequência por rede</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Defina em quais canais as lives serão realizadas e qual será a frequência específica em cada rede.
        </p>

        <div className="mt-6 space-y-4">
          {data.networkFrequencies.map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className={labelClass}>Canal</label>
                <input
                  type="text"
                  value={item.channel}
                  onChange={(e) => updateNetworkFrequency(index, "channel", e.target.value)}
                  placeholder="Ex: Instagram, YouTube, TikTok, LinkedIn..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Frequência</label>
                <input
                  type="text"
                  value={item.frequency}
                  onChange={(e) => updateNetworkFrequency(index, "frequency", e.target.value)}
                  placeholder="Ex: Semanal, quinzenal, mensal, toda terça..."
                  className={inputClass}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeNetworkFrequency(index)}
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
          onClick={addNetworkFrequency}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Nova frequência por rede
        </button>
      </section>

      {/* Objetivos */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Objetivos</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Defina os objetivos específicos das lives: autoridade, relacionamento, vendas, lançamento, comunidade, educação, engajamento ou nutrição da audiência.
        </p>

        <div className="mt-6 space-y-3">
          {data.objectives.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateTextListItem("objectives", index, e.target.value)}
                placeholder="Ex: Gerar autoridade, vender uma oferta, tirar dúvidas, aquecer audiência, lançar produto..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeTextListItem("objectives", index)}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addTextListItem("objectives")}
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Novo objetivo
        </button>
      </section>

      {/* Estruturas de linguagem */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Estruturas de linguagem</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Descreva a estrutura de linguagem adequada para conduzir as lives de forma clara, estratégica e envolvente.
        </p>

        <div className="mt-6 space-y-3">
          {data.languageStructures.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateTextListItem("languageStructures", index, e.target.value)}
                placeholder="Ex: Abertura com promessa, apresentação do tema, interação com público, conteúdo central, oferta ou chamada final."
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeTextListItem("languageStructures", index)}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addTextListItem("languageStructures")}
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Nova estrutura de linguagem
        </button>
      </section>

      {/* Roteiro e condução da live */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Roteiro e condução da live</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Organize como a live deve ser conduzida, quais blocos ela deve ter e como o público será direcionado para a próxima ação.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Abertura</label>
            <RichTextEditor
              value={data.openingScript}
              onChange={(value) => setData((c) => ({ ...c, openingScript: value }))}
              placeholder="Explique como iniciar a live, apresentar o tema, gerar interesse e orientar quem está chegando."
            />
          </div>

          <div>
            <label className={labelClass}>Conteúdo central</label>
            <RichTextEditor
              value={data.centralContent}
              onChange={(value) => setData((c) => ({ ...c, centralContent: value }))}
              placeholder="Descreva como o conteúdo principal será estruturado, dividido e entregue durante a live."
            />
          </div>

          <div>
            <label className={labelClass}>Interação com o público</label>
            <RichTextEditor
              value={data.publicInteraction}
              onChange={(value) => setData((c) => ({ ...c, publicInteraction: value }))}
              placeholder="Defina perguntas, enquetes, momentos de interação, leitura de comentários e participação da audiência."
            />
          </div>

          <div>
            <label className={labelClass}>Encerramento e chamada final</label>
            <RichTextEditor
              value={data.closingAndCall}
              onChange={(value) => setData((c) => ({ ...c, closingAndCall: value }))}
              placeholder="Explique como finalizar, recapitular, apresentar oferta, direcionar para link, WhatsApp, página ou próximo conteúdo."
            />
          </div>
        </div>
      </section>

      {/* Identidade visual */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Identidade visual</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Defina o estilo visual das lives. Você pode carregar imagens de referência para exemplificar capas, chamadas, cenários, thumbnails e elementos visuais.
        </p>

        <div className="mt-6">
          <label className={labelClass}>Estratégia visual</label>
          <RichTextEditor
            value={data.visualStrategy}
            onChange={(value) => setData((c) => ({ ...c, visualStrategy: value }))}
            placeholder="Explique a direção visual das lives: capa, thumbnail, cenário, enquadramento, luz, identidade, chamadas e elementos gráficos."
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
                  onChange={(e) => updateVisualReferenceImage(index, e)}
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

        <p className="mt-4 text-xs text-slate-500">Tamanho recomendado para imagem: 1920x1080px.</p>
      </section>

      {/* Conteúdos */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Conteúdos</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Defina os assuntos e datas em que as lives serão realizadas. Este campo pode funcionar como calendário de lives.
        </p>

        <div className="mt-6 space-y-4">
          {data.contents.map((content, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <button
                type="button"
                onClick={() => setExpandedContent(expandedContent === index ? null : index)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-semibold text-slate-700">
                  {content.title || `Live ${index + 1}`}
                </span>
                <span className="text-xs text-slate-400">
                  {expandedContent === index ? "Recolher" : "Expandir"}
                </span>
              </button>

              {expandedContent === index && (
                <div className="mt-4">
                  <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                    <div>
                      <label className={labelClass}>Tema da live</label>
                      <input
                        type="text"
                        value={content.title}
                        onChange={(e) => updateContent(index, "title", e.target.value)}
                        placeholder="Ex: Como organizar uma estratégia de conteúdo"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Data sugerida</label>
                      <input
                        type="text"
                        value={content.suggestedDate}
                        onChange={(e) => updateContent(index, "suggestedDate", e.target.value)}
                        placeholder="Ex: 15/06/2026"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Canal</label>
                      <input
                        type="text"
                        value={content.channel}
                        onChange={(e) => updateContent(index, "channel", e.target.value)}
                        placeholder="Ex: Instagram, YouTube, TikTok, LinkedIn..."
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Objetivo da live</label>
                      <input
                        type="text"
                        value={content.objective}
                        onChange={(e) => updateContent(index, "objective", e.target.value)}
                        placeholder="Ex: Aquecer audiência, vender, educar, tirar dúvidas..."
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={labelClass}>Observação</label>
                    <RichTextEditor
                      value={content.observation}
                      onChange={(value) => updateContent(index, "observation", value)}
                      placeholder="Registre pauta, roteiro resumido, chamada final, oferta relacionada, links e observações de produção."
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeContent(index)}
                    className="mt-4 cursor-pointer rounded-full border border-red-100 bg-white px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Excluir conteúdo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addContent}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Novo conteúdo
        </button>
      </section>

      {/* Distribuição e reaproveitamento */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Distribuição e reaproveitamento</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Registre como as lives serão divulgadas antes, durante e depois, além de como o conteúdo será reaproveitado em outros canais.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Divulgação antes da live</label>
            <RichTextEditor
              value={data.beforeAndAfterPromotion}
              onChange={(value) => setData((c) => ({ ...c, beforeAndAfterPromotion: value }))}
              placeholder="Ex: Stories, post no feed, lista de transmissão, e-mail, anúncio, contagem regressiva ou convite no WhatsApp."
            />
          </div>

          <div>
            <label className={labelClass}>Reaproveitamento depois da live</label>
            <RichTextEditor
              value={data.repurposingStrategy}
              onChange={(value) => setData((c) => ({ ...c, repurposingStrategy: value }))}
              placeholder="Ex: Cortes para Reels, TikTok, Shorts, carrossel, blog, e-mail, WhatsApp ou materiais educacionais."
            />
          </div>
        </div>
      </section>

      {/* Referências externas */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Anexos e referências externas</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia de lives.
        </p>

        <div className="mt-6 space-y-4">
          {data.references.map((reference, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className={labelClass}>Título da referência</label>
                <input
                  type="text"
                  value={reference.title}
                  onChange={(e) => updateReference(index, "title", e.target.value)}
                  placeholder="Ex: Live, roteiro, referência visual, transmissão ou material de apoio"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Link</label>
                <input
                  type="url"
                  value={reference.link}
                  onChange={(e) => updateReference(index, "link", e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
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
      </section>

      {/* Ações */}
      <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
