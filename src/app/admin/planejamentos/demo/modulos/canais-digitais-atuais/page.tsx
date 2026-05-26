"use client";

import { useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-canais-digitais-atuais";

type ChannelItem = {
  nome: string;
  descricao: string;
  link: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type CurrentChannelsData = {
  channels: ChannelItem[];
  observation: string;
  references: ExternalReference[];
};

const canaisIniciais: ChannelItem[] = [
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

const initialData: CurrentChannelsData = {
  channels: canaisIniciais,
  observation: "",
  references: [
    {
      title: "",
      link: "",
    },
  ],
};

function getChannelIcon(channelName: string) {
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

function PageSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-80 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block">
      <a href="/admin" className="block">
        <h1 className="text-2xl font-bold">Metodo EPC</h1>
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
                  const isActive = module.slug === "canais-digitais-atuais";

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

export default function CanaisDigitaisAtuaisPage() {
  const [data, setData] = useState<CurrentChannelsData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        channels:
          Array.isArray(parsed.channels) && parsed.channels.length
            ? parsed.channels.map((channel: Partial<ChannelItem>) => ({
                nome: channel.nome || "",
                descricao: channel.descricao || "",
                link: channel.link || "",
              }))
            : canaisIniciais,
        observation: parsed.observation || "",
        references:
          Array.isArray(parsed.references) && parsed.references.length
            ? parsed.references.map((reference: Partial<ExternalReference>) => ({
                title: reference.title || "",
                link: reference.link || "",
              }))
            : [
                {
                  title: "",
                  link: "",
                },
              ],
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
                Fundamentos Estratégicos do Projeto
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Canais Digitais Atuais
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Registre os canais digitais existentes no projeto, descreva a
                função de cada canal e informe os links principais para mapear a
                presença digital atual.
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
                            updateChannel(
                              index,
                              "descricao",
                              event.target.value
                            )
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