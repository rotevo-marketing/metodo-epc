"use client";

import { useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-linhas-editoriais";

type EditorialTopic = {
  title: string;
  description: string;
};

type EditorialLine = {
  title: string;
  function: string;
  journeyCompatibility: string;
  systemRole: string;
  structuralLimit: string;
  topics: EditorialTopic[];
};

type EditorialLinesData = {
  lines: EditorialLine[];
  observation: string;
};

const initialTopic: EditorialTopic = {
  title: "",
  description: "",
};

function createEmptyEditorialLine(): EditorialLine {
  return {
    title: "",
    function: "",
    journeyCompatibility: "",
    systemRole: "",
    structuralLimit: "",
    topics: [
      {
        ...initialTopic,
      },
    ],
  };
}

const initialData: EditorialLinesData = {
  lines: [createEmptyEditorialLine()],
  observation: "",
};

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
                  const isActive = module.slug === "linhas-editoriais";

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

function TextAreaField({
  label,
  value,
  placeholder,
  rows = 5,
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

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />
    </div>
  );
}

export default function LinhasEditoriaisPage() {
  const [data, setData] = useState<EditorialLinesData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        lines:
          Array.isArray(parsed.lines) && parsed.lines.length
            ? parsed.lines.map((line: Partial<EditorialLine>) => ({
                title: line.title || "",
                function: line.function || "",
                journeyCompatibility: line.journeyCompatibility || "",
                systemRole: line.systemRole || "",
                structuralLimit: line.structuralLimit || "",
                topics:
                  Array.isArray(line.topics) && line.topics.length
                    ? line.topics.map((topic: Partial<EditorialTopic>) => ({
                        title: topic.title || "",
                        description: topic.description || "",
                      }))
                    : [
                        {
                          ...initialTopic,
                        },
                      ],
              }))
            : initialData.lines,
        observation: parsed.observation || "",
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

  function updateLine(
    lineIndex: number,
    key: keyof Omit<EditorialLine, "topics">,
    value: string
  ) {
    setData((current) => {
      const nextLines = [...current.lines];

      nextLines[lineIndex] = {
        ...nextLines[lineIndex],
        [key]: value,
      };

      return {
        ...current,
        lines: nextLines,
      };
    });
  }

  function addLine() {
    setData((current) => ({
      ...current,
      lines: [...current.lines, createEmptyEditorialLine()],
    }));
  }

  function removeLine(lineIndex: number) {
    setData((current) => ({
      ...current,
      lines:
        current.lines.length > 1
          ? current.lines.filter((_, index) => index !== lineIndex)
          : [createEmptyEditorialLine()],
    }));
  }

  function updateTopic(
    lineIndex: number,
    topicIndex: number,
    key: keyof EditorialTopic,
    value: string
  ) {
    setData((current) => {
      const nextLines = [...current.lines];
      const nextTopics = [...nextLines[lineIndex].topics];

      nextTopics[topicIndex] = {
        ...nextTopics[topicIndex],
        [key]: value,
      };

      nextLines[lineIndex] = {
        ...nextLines[lineIndex],
        topics: nextTopics,
      };

      return {
        ...current,
        lines: nextLines,
      };
    });
  }

  function addTopic(lineIndex: number) {
    setData((current) => {
      const nextLines = [...current.lines];

      nextLines[lineIndex] = {
        ...nextLines[lineIndex],
        topics: [
          ...nextLines[lineIndex].topics,
          {
            ...initialTopic,
          },
        ],
      };

      return {
        ...current,
        lines: nextLines,
      };
    });
  }

  function removeTopic(lineIndex: number, topicIndex: number) {
    setData((current) => {
      const nextLines = [...current.lines];
      const currentTopics = nextLines[lineIndex].topics;

      nextLines[lineIndex] = {
        ...nextLines[lineIndex],
        topics:
          currentTopics.length > 1
            ? currentTopics.filter((_, index) => index !== topicIndex)
            : [
                {
                  ...initialTopic,
                },
              ],
      };

      return {
        ...current,
        lines: nextLines,
      };
    });
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
                Linhas Editoriais
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Defina os pilares editoriais do projeto, incluindo função,
                compatibilidade com a jornada, papel no sistema, limites
                estruturais e assuntos derivados de cada linha.
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

          <form className="space-y-8">
            {data.lines.map((line, lineIndex) => (
              <SectionCard
                key={lineIndex}
                title={`Linha Editorial ${String(lineIndex + 1).padStart(
                  2,
                  "0"
                )}`}
                description="Cadastre a função estratégica da linha, sua relação com a jornada, o papel que ela cumpre no sistema e os assuntos que podem nascer dela."
              >
                <div className="mb-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeLine(lineIndex)}
                    className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Excluir linha
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Título da linha editorial
                    </label>

                    <input
                      type="text"
                      value={line.title}
                      onChange={(event) =>
                        updateLine(lineIndex, "title", event.target.value)
                      }
                      placeholder="Ex: Deslocamento de percepção, autoridade, bastidores, educação..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <TextAreaField
                    label="Função da linha"
                    value={line.function}
                    onChange={(value) =>
                      updateLine(lineIndex, "function", value)
                    }
                    placeholder="Explique a função estratégica dessa linha editorial. Ex: romper uma percepção, educar o público, gerar identificação, sustentar autoridade ou preparar para uma decisão."
                  />

                  <TextAreaField
                    label="Compatibilidade com jornada"
                    value={line.journeyCompatibility}
                    onChange={(value) =>
                      updateLine(lineIndex, "journeyCompatibility", value)
                    }
                    placeholder="Explique em quais momentos da jornada essa linha aparece e como ela se conecta às personas, dúvidas, dores ou níveis de consciência."
                  />

                  <TextAreaField
                    label="Papel no sistema"
                    value={line.systemRole}
                    onChange={(value) =>
                      updateLine(lineIndex, "systemRole", value)
                    }
                    placeholder="Explique o papel dessa linha dentro do sistema editorial. Ex: linha de entrada, ativação de questão, sustentação de autoridade, vínculo, prova ou decisão."
                  />

                  <TextAreaField
                    label="Limite estrutural"
                    value={line.structuralLimit}
                    onChange={(value) =>
                      updateLine(lineIndex, "structuralLimit", value)
                    }
                    placeholder="Explique o que essa linha não faz, não resolve ou não deve tentar cumprir sozinha. Ex: não sugere solução, não motiva, não vende diretamente."
                  />

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">
                          Assuntos dessa linha editorial
                        </h3>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                          Cadastre os assuntos que podem nascer dessa linha.
                          Cada assunto pode conter tópicos, ideias, ângulos ou
                          abordagens para conteúdos.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => addTopic(lineIndex)}
                        className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        + Novo assunto
                      </button>
                    </div>

                    <div className="space-y-4">
                      {line.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="rounded-2xl border border-slate-200 bg-white p-5"
                        >
                          <div className="mb-4 flex items-center justify-between gap-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                              Assunto {String(topicIndex + 1).padStart(2, "0")}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                removeTopic(lineIndex, topicIndex)
                              }
                              className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                            >
                              Excluir assunto
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-600">
                                Título do assunto
                              </label>

                              <input
                                type="text"
                                value={topic.title}
                                onChange={(event) =>
                                  updateTopic(
                                    lineIndex,
                                    topicIndex,
                                    "title",
                                    event.target.value
                                  )
                                }
                                placeholder="Ex: Você não está errando, está repetindo"
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                              />
                            </div>

                            <TextAreaField
                              label="Descrição ou tópicos do assunto"
                              value={topic.description}
                              rows={6}
                              onChange={(value) =>
                                updateTopic(
                                  lineIndex,
                                  topicIndex,
                                  "description",
                                  value
                                )
                              }
                              placeholder="Liste os tópicos, ideias, ângulos ou abordagens desse assunto. Você pode colar em formato de lista."
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addTopic(lineIndex)}
                      className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
                    >
                      + Adicionar assunto
                    </button>
                  </div>
                </div>
              </SectionCard>
            ))}

            <button
              type="button"
              onClick={addLine}
              className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Nova linha editorial
            </button>

            <SectionCard
              title="Observações sobre a estratégia editorial"
              description="Use este campo para registrar orientações gerais sobre temas, limites, prioridades, formatos e cuidados editoriais."
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
                placeholder="Registre observações estratégicas sobre como as linhas editoriais devem ser usadas na produção de conteúdo."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
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