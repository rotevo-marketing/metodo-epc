"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-instagram";

type FrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type TextListItem = {
  value: string;
};

type VisualReference = {
  image: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type InstagramData = {
  frequencyItems: FrequencyItem[];
  objectives: TextListItem[];
  stories: TextListItem[];
  hashtags: TextListItem[];
  reels: TextListItem[];
  languageStructures: TextListItem[];
  contents: TextListItem[];
  visualStrategy: string;
  visualReferences: VisualReference[];
  bioEnabled: boolean;
  bioPhoto: string;
  profileHandle: string;
  profileName: string;
  bioText: string;
  bioLink: string;
  highlights: string;
  references: ExternalReference[];
};

const initialFrequencyItems: FrequencyItem[] = [
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

const initialData: InstagramData = {
  frequencyItems: initialFrequencyItems,
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
                  const isActive = module.slug === "instagram";

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

function normalizeTextList(value: unknown): TextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return { value: item };
    }

    if (item && typeof item === "object") {
      const record = item as Partial<TextListItem>;
      return { value: record.value || "" };
    }

    return { value: "" };
  });
}

export default function InstagramPage() {
  const [data, setData] = useState<InstagramData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        frequencyItems:
          Array.isArray(parsed.frequencyItems) && parsed.frequencyItems.length
            ? parsed.frequencyItems.map((item: Partial<FrequencyItem>) => ({
                format: item.format || "",
                quantity: item.quantity || "",
                period: item.period || "por semana",
                observation: item.observation || "",
              }))
            : initialFrequencyItems,
        objectives: normalizeTextList(parsed.objectives),
        stories: normalizeTextList(parsed.stories),
        hashtags: normalizeTextList(parsed.hashtags),
        reels: normalizeTextList(parsed.reels),
        languageStructures: normalizeTextList(parsed.languageStructures),
        contents: normalizeTextList(parsed.contents),
        visualStrategy: parsed.visualStrategy || "",
        visualReferences:
          Array.isArray(parsed.visualReferences) &&
          parsed.visualReferences.length
            ? parsed.visualReferences.map(
                (reference: Partial<VisualReference>) => ({
                  image: reference.image || "",
                })
              )
            : [{ image: "" }, { image: "" }, { image: "" }],
        bioEnabled:
          typeof parsed.bioEnabled === "boolean" ? parsed.bioEnabled : true,
        bioPhoto: parsed.bioPhoto || "",
        profileHandle: parsed.profileHandle || "",
        profileName: parsed.profileName || "",
        bioText: parsed.bioText || "",
        bioLink: parsed.bioLink || "",
        highlights: parsed.highlights || "",
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

  function updateFrequencyItem(
    index: number,
    key: keyof FrequencyItem,
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
    listKey:
      | "objectives"
      | "stories"
      | "hashtags"
      | "reels"
      | "languageStructures"
      | "contents",
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

  function addTextListItem(
    listKey:
      | "objectives"
      | "stories"
      | "hashtags"
      | "reels"
      | "languageStructures"
      | "contents"
  ) {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(
    listKey:
      | "objectives"
      | "stories"
      | "hashtags"
      | "reels"
      | "languageStructures"
      | "contents",
    index: number
  ) {
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

  function TextListSection({
    title,
    description,
    listKey,
    placeholder,
    buttonLabel,
  }: {
    title: string;
    description: string;
    listKey:
      | "objectives"
      | "stories"
      | "hashtags"
      | "reels"
      | "languageStructures"
      | "contents";
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
          className="mt-4 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + {buttonLabel}
        </button>
      </SectionCard>
    );
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
                Estratégia Editorial e Canais de Conteúdo
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Instagram
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Descreva as características que os conteúdos do Instagram devem
                ter, incluindo frequência, objetivos, stories, hashtags, reels,
                linguagem, identidade visual e bio do perfil.
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
                          updateFrequencyItem(
                            index,
                            "format",
                            event.target.value
                          )
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
                          updateFrequencyItem(
                            index,
                            "quantity",
                            event.target.value
                          )
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
                          updateFrequencyItem(
                            index,
                            "period",
                            event.target.value
                          )
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
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
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
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
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