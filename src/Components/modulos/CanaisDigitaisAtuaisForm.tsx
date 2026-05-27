"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type ChannelItem = {
  nome: string;
  descricao: string;
  link: string;
};

export type ChannelReference = {
  title: string;
  link: string;
};

export type CurrentChannelsData = {
  channels: ChannelItem[];
  observation: string;
  references: ChannelReference[];
};

export const initialChannels: ChannelItem[] = [
  {
    nome: "Facebook",
    descricao:
      "Registre a função do Facebook dentro da presença digital atual do projeto.",
    link: "",
  },
  {
    nome: "Instagram",
    descricao:
      "Registre a função do Instagram, frequência, tipo de conteúdo e objetivo atual do canal.",
    link: "",
  },
  {
    nome: "YouTube",
    descricao:
      "Registre a função do YouTube, tipos de vídeos, séries, frequência e papel estratégico.",
    link: "",
  },
  {
    nome: "Blog",
    descricao:
      "Registre a função do blog, temas publicados, frequência, SEO e papel dentro da estratégia.",
    link: "",
  },
  {
    nome: "Lista de cadastro",
    descricao:
      "Registre como a lista de cadastro é usada para relacionamento, nutrição e conversão.",
    link: "",
  },
  {
    nome: "Site",
    descricao:
      "Registre a função do site, páginas principais, objetivo comercial e papel institucional.",
    link: "",
  },
];

export const initialCurrentChannelsData: CurrentChannelsData = {
  channels: initialChannels,
  observation: "",
  references: [
    {
      title: "",
      link: "",
    },
  ],
};

export function getChannelIcon(channelName: string) {
  const normalizedName = channelName.toLowerCase();

  if (normalizedName.includes("facebook")) {
    return "/icons/21-facebook.svg";
  }

  if (normalizedName.includes("instagram")) {
    return "/icons/18-instagram.svg";
  }

  if (normalizedName.includes("tik")) {
    return "/icons/19-tik-tok.svg";
  }

  if (normalizedName.includes("youtube")) {
    return "/icons/20-youtube.svg";
  }

  if (normalizedName.includes("linkedin")) {
    return "/icons/22-linkedin.svg";
  }

  if (normalizedName.includes("whats")) {
    return "/icons/23-whatsaap.svg";
  }

  if (normalizedName.includes("blog")) {
    return "/icons/24-blog.svg";
  }

  if (normalizedName.includes("pinterest")) {
    return "/icons/25-pinterest.svg";
  }

  if (normalizedName.includes("podcast")) {
    return "/icons/26-podcast.svg";
  }

  if (
    normalizedName.includes("lista") ||
    normalizedName.includes("cadastro") ||
    normalizedName.includes("lead")
  ) {
    return "/icons/39-lista-de-cadastro.svg";
  }

  if (normalizedName.includes("site")) {
    return "/icons/29-estrategia-do-site.svg";
  }

  return "/icons/10-canais-digitais-atuais.svg";
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

type CanaisDigitaisAtuaisFormProps = {
  data: CurrentChannelsData;
  setData: Dispatch<SetStateAction<CurrentChannelsData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function CanaisDigitaisAtuaisForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: CanaisDigitaisAtuaisFormProps) {
  function updateChannel(
    index: number,
    key: keyof ChannelItem,
    value: string
  ) {
    setData((current) => {
      const nextChannels = [...current.channels];

      nextChannels[index] = {
        ...nextChannels[index],
        [key]: value,
      };

      return {
        ...current,
        channels: nextChannels,
      };
    });
  }

  function addChannel() {
    setData((current) => ({
      ...current,
      channels: [
        ...current.channels,
        {
          nome: "Novo canal",
          descricao: "",
          link: "",
        },
      ],
    }));
  }

  function removeChannel(index: number) {
    setData((current) => ({
      ...current,
      channels:
        current.channels.length > 1
          ? current.channels.filter((_, channelIndex) => channelIndex !== index)
          : [
              {
                nome: "",
                descricao: "",
                link: "",
              },
            ],
    }));
  }

  function moveChannel(index: number, direction: "up" | "down") {
    setData((current) => {
      const nextChannels = [...current.channels];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= nextChannels.length) {
        return current;
      }

      const currentItem = nextChannels[index];
      nextChannels[index] = nextChannels[targetIndex];
      nextChannels[targetIndex] = currentItem;

      return {
        ...current,
        channels: nextChannels,
      };
    });
  }

  function updateReference(
    index: number,
    key: keyof ChannelReference,
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
          ? current.references.filter(
              (_, referenceIndex) => referenceIndex !== index
            )
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
        title="Canais cadastrados"
        description="Liste os canais digitais atuais do projeto. Para cada canal, informe nome, descrição e link. Depois poderemos transformar essas informações em cards visuais na apresentação pública."
      >
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={addChannel}
            className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            + Novo canal
          </button>
        </div>

        <div className="space-y-6">
          {data.channels.map((channel, index) => (
            <div
              key={`${channel.nome}-${index}`}
              className="rounded-3xl border border-slate-200 bg-white p-5"
            >
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950">
                    <img
                      src={getChannelIcon(channel.nome)}
                      alt=""
                      className="h-6 w-6 object-contain invert"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Canal {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-1 text-xl font-semibold text-slate-950">
                      {channel.nome || "Novo canal"}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeChannel(index)}
                  className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir canal
                </button>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Nome do canal
                  </label>

                  <input
                    type="text"
                    value={channel.nome}
                    onChange={(event) =>
                      updateChannel(index, "nome", event.target.value)
                    }
                    placeholder="Ex: Instagram, YouTube, Blog, Site..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Descrição opcional
                  </label>

                  <textarea
                    rows={5}
                    value={channel.descricao}
                    onChange={(event) =>
                      updateChannel(index, "descricao", event.target.value)
                    }
                    placeholder="Registre a função desse canal dentro da presença digital atual do projeto."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Link opcional
                  </label>

                  <input
                    type="url"
                    value={channel.link}
                    onChange={(event) =>
                      updateChannel(index, "link", event.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveChannel(index, "up")}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                  >
                    Subir posição
                  </button>

                  <button
                    type="button"
                    onClick={() => moveChannel(index, "down")}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                  >
                    Descer posição
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addChannel}
          className="mt-6 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + Adicionar novo canal
        </button>
      </SectionCard>

      <SectionCard
        title="Observações sobre a presença digital atual"
        description="Use este campo para resumir o estado atual dos canais, apontar prioridades, problemas, oportunidades e ajustes necessários."
      >
        <textarea
          rows={7}
          value={data.observation}
          onChange={(event) =>
            setData((current) => ({
              ...current,
              observation: event.target.value,
            }))
          }
          placeholder="Registre aqui uma síntese da presença digital atual do projeto."
          className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor os canais atuais."
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
                  placeholder="Ex: Perfil, site, canal, página ou documento de referência"
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