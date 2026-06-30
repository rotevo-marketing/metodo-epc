"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-identidade-visual";

type ColorItem = {
  name: string;
  color: string;
  code: string;
};

type VisualReference = {
  image: string;
};

type ExternalReference = {
  image: string;
  title: string;
  link: string;
};

type VisualIdentityData = {
  fields: Record<string, string>;
  colors: ColorItem[];
  visualReferences: VisualReference[];
  externalReferences: ExternalReference[];
};

const initialData: VisualIdentityData = {
  fields: {},
  colors: [
  {
    name: "",
    color: "#000000",
    code: "#000000",
  },
  {
    name: "",
    color: "#FFFFFF",
    code: "#FFFFFF",
  },
  {
    name: "",
    color: "#C8A45D",
    code: "#C8A45D",
  },
],
  visualReferences: [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ],
  externalReferences: [
    {
      image: "",
      title: "",
      link: "",
    },
  ],
};

const visualFields = [
  {
    key: "direcaoVisual",
    title: "Direção visual",
    description:
      "Explique a direção estética do projeto, incluindo sensação desejada, estilo, atmosfera, aparência geral e percepção visual que a marca precisa transmitir.",
    placeholder:
      "Ex: Uma identidade visual limpa, sofisticada e estratégica, com estética minimalista, forte presença de espaços em branco, composição editorial e sensação de autoridade tranquila.",
  },
  {
    key: "fontesETipografia",
    title: "Fontes e tipografia",
    description:
      "Defina o estilo das fontes, peso, hierarquia, uso de títulos, textos, letras maiúsculas, espaçamento e personalidade tipográfica.",
    placeholder:
      "Ex: Títulos com fonte leve, elegante e espaçada. Textos com boa leitura, aparência premium e estrutura editorial.",
  },
  {
    key: "elementosVisuais",
    title: "Elementos visuais",
    description:
      "Liste elementos gráficos, símbolos, linhas, texturas, ícones, formas, padrões ou detalhes visuais que podem compor a identidade.",
    placeholder:
      "Ex: Linhas finas, ícones minimalistas, elementos inspirados em estratégia, símbolos discretos, composição com bastante respiro e blocos editoriais.",
  },
  {
    key: "oQueEvitar",
    title: "O que evitar",
    description:
      "Registre cores, estilos, imagens, fontes, excessos ou abordagens visuais que não combinam com a identidade do projeto.",
    placeholder:
      "Ex: Evitar excesso de cores, efeitos muito chamativos, fontes pesadas, aparência infantilizada, imagens poluídas e elementos visuais genéricos.",
  },
];

function normalizeHex(hex: string) {
  return hex.toUpperCase();
}

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
                  const isActive = module.slug === "identidade-visual";

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

export default function IdentidadeVisualPage() {
  const [data, setData] = useState<VisualIdentityData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        fields: parsed.fields || {},
        colors: Array.isArray(parsed.colors) && parsed.colors.length
  ? parsed.colors
  : initialData.colors,
        visualReferences: parsed.visualReferences?.length
          ? parsed.visualReferences
          : initialData.visualReferences,
        externalReferences: parsed.externalReferences?.length
          ? parsed.externalReferences.map((reference: ExternalReference) => ({
              image: reference.image || "",
              title: reference.title || "",
              link: reference.link || "",
            }))
          : initialData.externalReferences,
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

  function updateField(key: string, value: string) {
    setData((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value,
      },
    }));
  }

  function updateColor(index: number, key: keyof ColorItem, value: string) {
    setData((current) => {
      const nextColors = [...current.colors];

      nextColors[index] = {
        ...nextColors[index],
        [key]: value,
      };

      if (key === "color") {
  nextColors[index].code = normalizeHex(value);
}

      return {
        ...current,
        colors: nextColors,
      };
    });
  }

  function addColor() {
    setData((current) => ({
      ...current,
      colors: [
        ...current.colors,
        {
  name: "",
  color: "#000000",
  code: "#000000",
},
      ],
    }));
  }

  function removeColor(index: number) {
    setData((current) => ({
      ...current,
      colors:
        current.colors.length > 1
          ? current.colors.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
  name: "",
  color: "#000000",
  code: "#000000",
},
            ],
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

  function updateExternalReference(
    index: number,
    key: keyof ExternalReference,
    value: string
  ) {
    setData((current) => {
      const nextReferences = [...current.externalReferences];

      nextReferences[index] = {
        ...nextReferences[index],
        [key]: value,
      };

      return {
        ...current,
        externalReferences: nextReferences,
      };
    });
  }

  function updateExternalReferenceImage(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateExternalReference(index, "image", String(reader.result || ""));
    };

    reader.readAsDataURL(file);
  }

  function removeExternalReferenceImage(index: number) {
    updateExternalReference(index, "image", "");
  }

  function addExternalReference() {
    setData((current) => ({
      ...current,
      externalReferences: [
        ...current.externalReferences,
        {
          image: "",
          title: "",
          link: "",
        },
      ],
    }));
  }

  function removeExternalReference(index: number) {
    setData((current) => ({
      ...current,
      externalReferences:
        current.externalReferences.length > 1
          ? current.externalReferences.filter(
              (_, itemIndex) => itemIndex !== index
            )
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
                Identidade Visual
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Defina a direção estética do projeto, incluindo estilo visual,
                paleta, tipografia, imagens, elementos gráficos e referências
                que devem orientar a comunicação.
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
              title="Direção visual"
              description="Explique a direção estética do projeto, incluindo sensação desejada, estilo, atmosfera, aparência geral e percepção visual que a marca precisa transmitir."
            >
              <textarea
                rows={6}
                value={data.fields.direcaoVisual || ""}
                onChange={(event) =>
                  updateField("direcaoVisual", event.target.value)
                }
                placeholder="Ex: Uma identidade visual limpa, sofisticada e estratégica, com estética minimalista, forte presença de espaços em branco, composição editorial e sensação de autoridade tranquila."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Paleta de cores"
              description="Defina as cores principais do projeto. Use o círculo para selecionar a cor e registre o RGB ou HEX que será usado como referência."
            >
              <div className="grid gap-4 md:grid-cols-3">
                {(data.colors || initialData.colors).map((colorItem, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Cor {String(index + 1).padStart(2, "0")}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="cursor-pointer text-xs font-semibold text-red-500 transition hover:text-red-600"
                      >
                        Excluir
                      </button>
                    </div>

                    <div className="mt-5 flex flex-col items-center">
                      <label className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full ring-1 ring-slate-200">
                        <span
                          className="absolute inset-0"
                          style={{ backgroundColor: colorItem.color }}
                        />
                        <input
                          type="color"
                          value={colorItem.color}
                          onChange={(event) =>
                            updateColor(index, "color", event.target.value)
                          }
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </label>

                      <input
                        type="text"
                        value={colorItem.name}
                        onChange={(event) =>
                          updateColor(index, "name", event.target.value)
                        }
                        placeholder="Nome da cor"
                        className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />

                      <input
                        type="text"
                        value={colorItem.code}
                        onChange={(event) =>
                          updateColor(index, "code", event.target.value)
                        }
                        placeholder="Código HEX"
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addColor}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
              >
                + Nova cor
              </button>
            </SectionCard>

            {visualFields.map((field) => (
              <SectionCard
                key={field.key}
                title={field.title}
                description={field.description}
              >
                <textarea
                  rows={6}
                  value={data.fields[field.key] || ""}
                  onChange={(event) =>
                    updateField(field.key, event.target.value)
                  }
                  placeholder={field.placeholder}
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </SectionCard>
            ))}

            <SectionCard
              title="Referências visuais"
              description="Adicione imagens de referência para ajudar na construção visual do planejamento. Tamanho recomendado: 1920x1080px."
            >
              <div className="grid gap-4 md:grid-cols-3">
                {data.visualReferences.map((reference, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
                  >
                    <div className="flex aspect-video items-center justify-center">
                      {reference.image ? (
                        <img
                          src={reference.image}
                          alt={`Referência visual ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-center text-slate-500 transition hover:bg-slate-100">
                          <span className="text-4xl font-light">+</span>
                          <span className="mt-2 text-sm font-semibold">
                            Adicionar imagem
                          </span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(event) =>
                              updateVisualReferenceImage(index, event)
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {reference.image && (
                      <div className="flex justify-end gap-2 border-t border-slate-200 bg-white p-3">
                        <label className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">
                          Trocar
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(event) =>
                              updateVisualReferenceImage(index, event)
                            }
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => removeVisualReferenceImage(index)}
                          className="cursor-pointer rounded-full px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Formatos aceitos: JPG, PNG ou WEBP.
              </p>
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Adicione moodboards, marcas, perfis, sites, vídeos, páginas ou qualquer referência visual que ajude a entender a direção estética do projeto."
            >
              <div className="space-y-4">
                {data.externalReferences.map((reference, index) => (
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
                        onClick={() => removeExternalReference(index)}
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
                                updateExternalReferenceImage(index, event)
                              }
                              className="hidden"
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => removeExternalReferenceImage(index)}
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
                              updateExternalReference(
                                index,
                                "title",
                                event.target.value
                              )
                            }
                            placeholder="Ex: Moodboard, marca, perfil, site ou referência visual"
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
                              updateExternalReference(
                                index,
                                "link",
                                event.target.value
                              )
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
                onClick={addExternalReference}
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