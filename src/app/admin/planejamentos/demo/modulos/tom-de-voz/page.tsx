"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-tom-de-voz";

type CharacteristicItem = {
  title: string;
  description: string;
};

type ReferenceItem = {
  image: string;
  title: string;
  link: string;
};

type ToneVoiceData = {
  characteristics: CharacteristicItem[];
  toneChoices: Record<string, string>;
  vocabulary: Record<string, string>;
  emotions: string[];
  observations: string;
  references: ReferenceItem[];
};

const initialData: ToneVoiceData = {
  characteristics: [
    {
      title: "",
      description: "",
    },
  ],
  toneChoices: {},
  vocabulary: {},
  emotions: [],
  observations: "",
  references: [
    {
      image: "",
      title: "",
      link: "",
    },
  ],
};

const tonePairs = [
  {
    key: "acolhedorCritico",
    number: 1,
    left: "Acolhedor",
    right: "Crítico",
  },
  {
    key: "engracadoSerio",
    number: 2,
    left: "Engraçado",
    right: "Sério",
  },
  {
    key: "sarcasticoSolene",
    number: 3,
    left: "Sarcástico",
    right: "Solene",
  },
  {
    key: "formalCasual",
    number: 4,
    left: "Formal",
    right: "Casual",
  },
  {
    key: "respeitosoIrreverente",
    number: 5,
    left: "Respeitoso",
    right: "Irreverente",
  },
  {
    key: "filosoficoLogico",
    number: 6,
    left: "Filosófico",
    right: "Lógico",
  },
  {
    key: "tecnicoLeigo",
    number: 7,
    left: "Técnico",
    right: "Leigo",
  },
  {
    key: "inspiradorRepreensor",
    number: 8,
    left: "Inspirador",
    right: "Repreensor",
  },
  {
    key: "educativoNarrativo",
    number: 9,
    left: "Educativo",
    right: "Narrativo",
  },
  {
    key: "emocionalRacional",
    number: 10,
    left: "Emocional",
    right: "Racional",
  },
  {
    key: "suaveEnfatico",
    number: 11,
    left: "Suave",
    right: "Enfático",
  },
  {
    key: "amorosoContestador",
    number: 12,
    left: "Amoroso",
    right: "Contestador",
  },
  {
    key: "agressivoAmigavel",
    number: 13,
    left: "Agressivo",
    right: "Amigável",
  },
  {
    key: "rapidoLento",
    number: 14,
    left: "Rápido",
    right: "Lento",
  },
];

const vocabularyFields = [
  {
    key: "termosAutorais",
    label: "Termos autorais",
    placeholder:
      "Liste termos próprios, expressões criadas pela marca ou palavras que reforçam sua assinatura verbal.",
  },
  {
    key: "termosTecnicosNecessarios",
    label: "Termos técnicos necessários",
    placeholder:
      "Liste termos técnicos importantes que precisam aparecer na comunicação.",
  },
  {
    key: "termosQueSeRepetem",
    label: "Termos que se repetem",
    placeholder:
      "Liste palavras, expressões ou estruturas que devem aparecer com frequência na comunicação.",
  },
  {
    key: "termosProibidos",
    label: "Termos proibidos",
    placeholder:
      "Liste palavras, expressões ou abordagens que devem ser evitadas.",
  },
  {
    key: "metaforasEAnalogias",
    label: "Metáforas e analogias",
    placeholder:
      "Liste metáforas, comparações e analogias que combinam com a narrativa da marca.",
  },
  {
    key: "elementosDaNarrativa",
    label: "Elementos da narrativa",
    placeholder:
      "Registre elementos importantes da história, abordagem, argumento ou construção narrativa.",
  },
];

const emotionOptions = [
  "Indignação",
  "Confiança",
  "Preocupação",
  "Empolgação",
  "Ansiedade",
  "Envolvimento",
  "Sarcasmo",
  "Determinação",
  "Solidariedade",
  "Melancolia",
  "Alegria",
  "Nostalgia",
  "Medo",
  "Tranquilidade",
];

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
                  const isActive = module.slug === "tom-de-voz";

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
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function TomDeVozPage() {
  const [data, setData] = useState<ToneVoiceData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        characteristics: parsed.characteristics?.length
          ? parsed.characteristics
          : initialData.characteristics,
        toneChoices: parsed.toneChoices || {},
        vocabulary: parsed.vocabulary || {},
        emotions: Array.isArray(parsed.emotions) ? parsed.emotions : [],
        observations: parsed.observations || "",
        references: parsed.references?.length
          ? parsed.references.map((reference: ReferenceItem) => ({
              image: reference.image || "",
              title: reference.title || "",
              link: reference.link || "",
            }))
          : initialData.references,
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

  function updateCharacteristic(
    index: number,
    key: keyof CharacteristicItem,
    value: string
  ) {
    setData((current) => {
      const nextCharacteristics = [...current.characteristics];

      nextCharacteristics[index] = {
        ...nextCharacteristics[index],
        [key]: value,
      };

      return {
        ...current,
        characteristics: nextCharacteristics,
      };
    });
  }

  function addCharacteristic() {
    setData((current) => ({
      ...current,
      characteristics: [
        ...current.characteristics,
        {
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeCharacteristic(index: number) {
    setData((current) => ({
      ...current,
      characteristics:
        current.characteristics.length > 1
          ? current.characteristics.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                title: "",
                description: "",
              },
            ],
    }));
  }

  function updateToneChoice(key: string, value: string) {
    setData((current) => ({
      ...current,
      toneChoices: {
        ...current.toneChoices,
        [key]: value,
      },
    }));
  }

  function updateVocabulary(key: string, value: string) {
    setData((current) => ({
      ...current,
      vocabulary: {
        ...current.vocabulary,
        [key]: value,
      },
    }));
  }

  function toggleEmotion(emotion: string) {
    setData((current) => {
      const alreadySelected = current.emotions.includes(emotion);

      return {
        ...current,
        emotions: alreadySelected
          ? current.emotions.filter((item) => item !== emotion)
          : [...current.emotions, emotion],
      };
    });
  }

  function updateReference(
    index: number,
    key: keyof ReferenceItem,
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

  function updateReferenceImage(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateReference(index, "image", String(reader.result || ""));
    };

    reader.readAsDataURL(file);
  }

  function removeReferenceImage(index: number) {
    updateReference(index, "image", "");
  }

  function addReference() {
    setData((current) => ({
      ...current,
      references: [
        ...current.references,
        {
          image: "",
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
                image: "",
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
                Essência do Projeto
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Tom de Voz
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Defina como a marca se comunica e conversa com seu público. O
                tom de voz engloba linguagem, palavras, ritmo, personalidade e
                percepção desejada em todos os pontos de interação.
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
              title="Características do tom de voz"
              description="Registre características gerais que ajudam a definir como a marca deve falar, escrever, orientar, vender, responder e se posicionar."
            >
              <div className="space-y-5">
                {data.characteristics.map((characteristic, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Característica {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-slate-950">
                          {characteristic.title || "Nova característica"}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCharacteristic(index)}
                        className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Título da característica
                        </label>

                        <input
                          type="text"
                          value={characteristic.title}
                          onChange={(event) =>
                            updateCharacteristic(
                              index,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder="Ex: Acolhedor, direto, técnico, provocativo, inspirador..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Descrição da característica
                        </label>

                        <textarea
                          rows={5}
                          value={characteristic.description}
                          onChange={(event) =>
                            updateCharacteristic(
                              index,
                              "description",
                              event.target.value
                            )
                          }
                          placeholder="Explique como essa característica deve aparecer nos conteúdos, nas legendas, nos textos comerciais, nos vídeos, nos e-mails e nas interações com o público."
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addCharacteristic}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
              >
                + Nova característica
              </button>
            </SectionCard>

            <SectionCard
              title="Tom de voz do discurso"
              description="Selecione qual lado representa melhor a forma como a marca deve falar. Somente as opções selecionadas aparecem na apresentação."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {tonePairs.map((pair) => {
                  const selectedValue = data.toneChoices[pair.key];

                  return (
                    <div
                      key={pair.key}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Tom {String(pair.number).padStart(2, "0")}
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {[pair.left, pair.right].map((option) => {
                          const isSelected = selectedValue === option;

                          return (
                            <label
                              key={option}
                              className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                isSelected
                                  ? "border-slate-950 bg-slate-950 text-white"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                              }`}
                            >
                              <input
                                type="radio"
                                name={pair.key}
                                value={option}
                                checked={isSelected}
                                onChange={() =>
                                  updateToneChoice(pair.key, option)
                                }
                                className="sr-only"
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard
              title="Vocabulário e estrutura"
              description="Registre termos, expressões, metáforas e elementos narrativos que orientam a construção dos conteúdos."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {vocabularyFields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      {field.label}
                    </label>

                    <textarea
                      rows={5}
                      value={data.vocabulary[field.key] || ""}
                      onChange={(event) =>
                        updateVocabulary(field.key, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Emoção predominante"
              description="Selecione as emoções que devem aparecer com mais força na comunicação."
            >
              <div className="flex flex-wrap gap-3">
                {emotionOptions.map((emotion) => {
                  const isSelected = data.emotions.includes(emotion);

                  return (
                    <label
                      key={emotion}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isSelected
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleEmotion(emotion)}
                        className="sr-only"
                      />
                      {emotion}
                    </label>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard
              title="Observações sobre o tom de voz"
              description="Use este espaço para registrar orientações gerais sobre linguagem, narrativa, postura e cuidados de comunicação."
            >
              <textarea
                rows={6}
                value={data.observations}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    observations: event.target.value,
                  }))
                }
                placeholder="Registre observações importantes sobre a forma como a marca deve falar, escrever, conduzir argumentos, lidar com objeções e construir sua narrativa."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Adicione referências como canais no YouTube, perfis, marcas, vídeos, textos, páginas ou qualquer material que ajude a visualizar o tom desejado."
            >
              <div className="space-y-4">
                {data.references.map((reference, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
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

                    <div className="grid gap-5 md:grid-cols-[130px_1fr] md:items-center">
                      <div>
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
                          {reference.image ? (
                            <img
                              src={reference.image}
                              alt="Imagem da referência"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            "Imagem"
                          )}
                        </div>

                        <div className="mt-3 flex flex-col gap-2">
                          <label className="cursor-pointer rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800">
                            Escolher
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={(event) =>
                                updateReferenceImage(index, event)
                              }
                              className="hidden"
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => removeReferenceImage(index)}
                            className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                          >
                            Remover
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-4">
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
                            placeholder="Ex: Canal no YouTube, perfil, marca, texto ou vídeo"
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
                      </div>
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