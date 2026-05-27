"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type InstagramFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

export type InstagramTextListItem = {
  value: string;
};

export type InstagramVisualReference = {
  image: string;
};

export type InstagramExternalReference = {
  title: string;
  link: string;
};

export type InstagramData = {
  frequencyItems: InstagramFrequencyItem[];
  objectives: InstagramTextListItem[];
  stories: InstagramTextListItem[];
  hashtags: InstagramTextListItem[];
  reels: InstagramTextListItem[];
  languageStructures: InstagramTextListItem[];
  contents: InstagramTextListItem[];
  visualStrategy: string;
  visualReferences: InstagramVisualReference[];
  bioEnabled: boolean;
  bioPhoto: string;
  profileHandle: string;
  profileName: string;
  bioText: string;
  bioLink: string;
  highlights: string;
  references: InstagramExternalReference[];
};

export const initialInstagramFrequencyItems: InstagramFrequencyItem[] = [
  {
    format: "Reels",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Stories",
    quantity: "",
    period: "por dia",
    observation: "",
  },
  {
    format: "Carrossel",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Card único",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Canal de transmissão",
    quantity: "",
    period: "por semana",
    observation: "",
  },
];

export const initialInstagramData: InstagramData = {
  frequencyItems: initialInstagramFrequencyItems,
  objectives: [{ value: "" }],
  stories: [{ value: "" }],
  hashtags: [{ value: "" }],
  reels: [{ value: "" }],
  languageStructures: [{ value: "" }],
  contents: [{ value: "" }],
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  bioEnabled: true,
  bioPhoto: "",
  profileHandle: "",
  profileName: "",
  bioText: "",
  bioLink: "",
  highlights: "",
  references: [{ title: "", link: "" }],
};

export function normalizeInstagramTextList(
  value: unknown
): InstagramTextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return { value: item };
    }

    if (item && typeof item === "object") {
      const record = item as Partial<InstagramTextListItem>;

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

type InstagramListKey =
  | "objectives"
  | "stories"
  | "hashtags"
  | "reels"
  | "languageStructures"
  | "contents";

type InstagramFormProps = {
  data: InstagramData;
  setData: Dispatch<SetStateAction<InstagramData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function InstagramForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: InstagramFormProps) {
  function updateFrequencyItem(
    index: number,
    key: keyof InstagramFrequencyItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.frequencyItems];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        frequencyItems: nextItems,
      };
    });
  }

  function addFrequencyItem() {
    setData((current) => ({
      ...current,
      frequencyItems: [
        ...current.frequencyItems,
        {
          format: "",
          quantity: "",
          period: "por semana",
          observation: "",
        },
      ],
    }));
  }

  function removeFrequencyItem(index: number) {
    setData((current) => ({
      ...current,
      frequencyItems:
        current.frequencyItems.length > 1
          ? current.frequencyItems.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                format: "",
                quantity: "",
                period: "por semana",
                observation: "",
              },
            ],
    }));
  }

  function updateTextListItem(
    listKey: InstagramListKey,
    index: number,
    value: string
  ) {
    setData((current) => {
      const nextList = [...current[listKey]];

      nextList[index] = {
        value,
      };

      return {
        ...current,
        [listKey]: nextList,
      };
    });
  }

  function addTextListItem(listKey: InstagramListKey) {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(listKey: InstagramListKey, index: number) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, itemIndex) => itemIndex !== index)
          : [{ value: "" }],
    }));
  }

  function updateVisualReferenceImage(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setData((current) => {
        const nextReferences = [...current.visualReferences];

        nextReferences[index] = {
          image: String(reader.result || ""),
        };

        return {
          ...current,
          visualReferences: nextReferences,
        };
      });
    };

    reader.readAsDataURL(file);
  }

  function removeVisualReferenceImage(index: number) {
    setData((current) => {
      const nextReferences = [...current.visualReferences];

      nextReferences[index] = {
        image: "",
      };

      return {
        ...current,
        visualReferences: nextReferences,
      };
    });
  }

  function updateBioPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setData((current) => ({
        ...current,
        bioPhoto: String(reader.result || ""),
      }));
    };

    reader.readAsDataURL(file);
  }

  function removeBioPhoto() {
    setData((current) => ({
      ...current,
      bioPhoto: "",
    }));
  }

  function updateReference(
    index: number,
    key: keyof InstagramExternalReference,
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

  function TextListSection({
    title,
    description,
    listKey,
    placeholder,
    buttonLabel,
  }: {
    title: string;
    description: string;
    listKey: InstagramListKey;
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
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + {buttonLabel}
        </button>
      </SectionCard>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Bio do Instagram"
        description="Defina os principais elementos da bio do Instagram: arroba, nome do perfil, conteúdo da bio, link, destaques e foto do perfil."
      >
        <div className="mb-6 flex justify-end">
          <label className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={data.bioEnabled}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  bioEnabled: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300"
            />
            Ativar bio
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
          <div>
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
              {data.bioPhoto ? (
                <img
                  src={data.bioPhoto}
                  alt="Foto do perfil"
                  className="h-full w-full object-cover"
                />
              ) : (
                "Foto"
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <label className="cursor-pointer rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800">
                Escolher foto
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={updateBioPhoto}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={removeBioPhoto}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Remover
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Arroba do perfil
                </label>

                <input
                  type="text"
                  value={data.profileHandle}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      profileHandle: event.target.value,
                    }))
                  }
                  placeholder="Ex: @nomedoperfil"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Nome do perfil
                </label>

                <input
                  type="text"
                  value={data.profileName}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      profileName: event.target.value,
                    }))
                  }
                  placeholder="Ex: Nome do especialista ou da marca"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Conteúdo da bio
              </label>

              <textarea
                rows={5}
                value={data.bioText}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    bioText: event.target.value,
                  }))
                }
                placeholder="Escreva uma sugestão de bio para o Instagram."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Link da bio
              </label>

              <input
                type="url"
                value={data.bioLink}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    bioLink: event.target.value,
                  }))
                }
                placeholder="https://..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Destaques sugeridos
              </label>

              <input
                type="text"
                value={data.highlights}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    highlights: event.target.value,
                  }))
                }
                placeholder="Ex: Sobre, Serviços, Depoimentos, Conteúdos, Contato..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Frequência"
        description="Defina a frequência por formato de conteúdo. Use quantidade e período para deixar a orientação mais clara."
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
                  placeholder="Ex: Reels"
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
                  placeholder="Ex: 3"
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
                    updateFrequencyItem(
                      index,
                      "observation",
                      event.target.value
                    )
                  }
                  placeholder="Ex: Priorizar conteúdos de autoridade."
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + Novo formato
        </button>
      </SectionCard>

      <TextListSection
        title="Objetivos"
        description="Defina os objetivos específicos do conteúdo para o Instagram."
        listKey="objectives"
        placeholder="Ex: Aumentar autoridade, gerar leads, fortalecer comunidade..."
        buttonLabel="Novo objetivo"
      />

      <TextListSection
        title="Stories"
        description="Liste ideias, quadros, formatos e orientações para stories."
        listKey="stories"
        placeholder="Ex: Bastidores, rotina, perguntas, enquetes, provas sociais..."
        buttonLabel="Novo story"
      />

      <TextListSection
        title="Hashtags"
        description="Registre hashtags importantes para descoberta, nicho, localização, autoridade e temas recorrentes."
        listKey="hashtags"
        placeholder="Ex: #marketingdigital, #estrategiadeconteudo..."
        buttonLabel="Nova hashtag"
      />

      <TextListSection
        title="Reels"
        description="Liste ideias, formatos, séries e abordagens para vídeos curtos."
        listKey="reels"
        placeholder="Ex: Dicas rápidas, mitos e verdades, bastidores, tutoriais..."
        buttonLabel="Novo Reels"
      />

      <TextListSection
        title="Estruturas de linguagem"
        description="Descreva estruturas de linguagem adequadas para que o conteúdo do Instagram cumpra seu papel na estratégia."
        listKey="languageStructures"
        placeholder="Ex: Gancho forte, explicação simples, exemplo prático, chamada final..."
        buttonLabel="Nova estrutura de linguagem"
      />

      <TextListSection
        title="Conteúdos"
        description="Liste formatos, temas e ideias de conteúdos que podem ser usados no Instagram."
        listKey="contents"
        placeholder="Ex: Carrosséis educativos, reels de autoridade, posts de prova social..."
        buttonLabel="Novo conteúdo"
      />

      <SectionCard
        title="Identidade visual"
        description="Defina o estilo visual do perfil no Instagram, tanto nas imagens quanto nos vídeos e stories. Você pode carregar imagens de referência para exemplificar."
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Estratégia visual
          </label>

          <textarea
            rows={6}
            value={data.visualStrategy}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                visualStrategy: event.target.value,
              }))
            }
            placeholder="Explique a direção visual do Instagram: estilo dos posts, cores, fundos, fotos, vídeos, ritmo, estética e referências."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.visualReferences.map((reference, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
            >
              <label className="flex aspect-[4/3] cursor-pointer items-center justify-center text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100">
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
                  onChange={(event) => updateVisualReferenceImage(index, event)}
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
          Tamanho recomendado para imagem de feed: 1080x1350px.
        </p>
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do Instagram."
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
                  placeholder="Ex: Perfil, post, reels, campanha ou referência visual"
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
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