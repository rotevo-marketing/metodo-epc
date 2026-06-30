"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type EditorialLineItem = {
  title: string;
  objective: string;
  description: string;
  targetAudience: string;
  contentPillars: string;
  formats: string;
  frequency: string;
  examples: string;
  notes: string;
};

export type EditorialLineReference = {
  title: string;
  link: string;
};

export type EditorialLinesData = {
  lines: EditorialLineItem[];
  generalGuidelines: string;
  references: EditorialLineReference[];
};

const initialEditorialLine: EditorialLineItem = {
  title: "",
  objective: "",
  description: "",
  targetAudience: "",
  contentPillars: "",
  formats: "",
  frequency: "",
  examples: "",
  notes: "",
};

export const initialEditorialLinesData: EditorialLinesData = {
  lines: [
    {
      title: "Autoridade",
      objective:
        "Construir percepção de domínio, experiência e confiança sobre o tema central do projeto.",
      description: "",
      targetAudience: "",
      contentPillars: "",
      formats: "",
      frequency: "",
      examples: "",
      notes: "",
    },
    {
      title: "Educação",
      objective:
        "Ensinar conceitos, orientar decisões e ajudar o público a compreender problemas, soluções e caminhos possíveis.",
      description: "",
      targetAudience: "",
      contentPillars: "",
      formats: "",
      frequency: "",
      examples: "",
      notes: "",
    },
    {
      title: "Conexão",
      objective:
        "Gerar identificação, proximidade, confiança e vínculo emocional com o especialista, empresa ou projeto.",
      description: "",
      targetAudience: "",
      contentPillars: "",
      formats: "",
      frequency: "",
      examples: "",
      notes: "",
    },
    {
      title: "Conversão",
      objective:
        "Conduzir o público para uma ação estratégica, como contato, cadastro, reunião, proposta ou compra.",
      description: "",
      targetAudience: "",
      contentPillars: "",
      formats: "",
      frequency: "",
      examples: "",
      notes: "",
    },
  ],
  generalGuidelines: "",
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

function TextAreaField({
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

type LinhasEditoriaisFormProps = {
  data: EditorialLinesData;
  setData: Dispatch<SetStateAction<EditorialLinesData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function LinhasEditoriaisForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: LinhasEditoriaisFormProps) {
  function updateLine(
    index: number,
    key: keyof EditorialLineItem,
    value: string
  ) {
    setData((current) => {
      const nextLines = [...current.lines];

      nextLines[index] = {
        ...nextLines[index],
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
      lines: [
        ...current.lines,
        {
          ...initialEditorialLine,
        },
      ],
    }));
  }

  function duplicateLine(index: number) {
    setData((current) => ({
      ...current,
      lines: [
        ...current.lines,
        {
          ...current.lines[index],
        },
      ],
    }));
  }

  function removeLine(index: number) {
    setData((current) => ({
      ...current,
      lines:
        current.lines.length > 1
          ? current.lines.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                ...initialEditorialLine,
              },
            ],
    }));
  }

  function moveLine(index: number, direction: "up" | "down") {
    setData((current) => {
      const nextLines = [...current.lines];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= nextLines.length) {
        return current;
      }

      const currentLine = nextLines[index];
      nextLines[index] = nextLines[targetIndex];
      nextLines[targetIndex] = currentLine;

      return {
        ...current,
        lines: nextLines,
      };
    });
  }

  function updateReference(
    index: number,
    key: keyof EditorialLineReference,
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
        title="Linhas editoriais"
        description="Organize os principais temas, assuntos, objetivos e formatos que vão guiar a produção de conteúdo do projeto."
      >
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={addLine}
            className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            + Nova linha editorial
          </button>
        </div>

        <div className="space-y-6">
          {data.lines.map((line, index) => (
            <div
              key={`${line.title}-${index}`}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Linha editorial {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                    {line.title || "Nova linha editorial"}
                  </h3>

                  {line.objective ? (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                      {line.objective}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveLine(index, "up")}
                    className="cursor-pointer rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-black"
                  >
                    Subir
                  </button>

                  <button
                    type="button"
                    onClick={() => moveLine(index, "down")}
                    className="cursor-pointer rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-black"
                  >
                    Descer
                  </button>

                  <button
                    type="button"
                    onClick={() => duplicateLine(index)}
                    className="cursor-pointer rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-black"
                  >
                    Duplicar
                  </button>

                  <button
                    type="button"
                    onClick={() => removeLine(index)}
                    className="cursor-pointer rounded-full px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Nome da linha editorial
                    </label>

                    <input
                      type="text"
                      value={line.title}
                      onChange={(event) =>
                        updateLine(index, "title", event.target.value)
                      }
                      placeholder="Ex: Autoridade, Educação, Conexão, Conversão..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Frequência recomendada
                    </label>

                    <input
                      type="text"
                      value={line.frequency}
                      onChange={(event) =>
                        updateLine(index, "frequency", event.target.value)
                      }
                      placeholder="Ex: 2 vezes por semana, quinzenal, mensal..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <TextAreaField
                  label="Objetivo estratégico"
                  value={line.objective}
                  placeholder="Explique o papel dessa linha editorial dentro da estratégia de conteúdo."
                  rows={4}
                  onChange={(value) => updateLine(index, "objective", value)}
                />

                <TextAreaField
                  label="Descrição da linha editorial"
                  value={line.description}
                  placeholder="Descreva quais tipos de temas entram nessa linha, qual função ela cumpre e como ela deve aparecer nos conteúdos."
                  onChange={(value) => updateLine(index, "description", value)}
                />

                <TextAreaField
                  label="Público ou intenção principal"
                  value={line.targetAudience}
                  placeholder="Explique para quem essa linha fala, qual nível de consciência do público ela trabalha e que tipo de percepção deve gerar."
                  onChange={(value) => updateLine(index, "targetAudience", value)}
                />

                <TextAreaField
                  label="Pilares e assuntos possíveis"
                  value={line.contentPillars}
                  placeholder="Liste temas, pilares, editorias, quadros, assuntos recorrentes e ângulos de conteúdo relacionados a esta linha."
                  onChange={(value) => updateLine(index, "contentPillars", value)}
                />

                <TextAreaField
                  label="Formatos recomendados"
                  value={line.formats}
                  placeholder="Ex: Reels, carrossel, stories, live, blog, e-mail, WhatsApp, vídeo longo, post estático, podcast..."
                  rows={4}
                  onChange={(value) => updateLine(index, "formats", value)}
                />

                <TextAreaField
                  label="Exemplos de conteúdos"
                  value={line.examples}
                  placeholder="Liste ideias de posts, vídeos, carrosséis, stories, lives, e-mails ou conteúdos específicos para essa linha editorial."
                  onChange={(value) => updateLine(index, "examples", value)}
                />

                <TextAreaField
                  label="Observações internas"
                  value={line.notes}
                  placeholder="Registre cuidados, limites, tom, referências, decisões e observações importantes para produzir essa linha editorial."
                  rows={4}
                  onChange={(value) => updateLine(index, "notes", value)}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Diretrizes gerais das linhas editoriais"
        description="Use este campo para orientar a lógica geral da produção de conteúdo, equilíbrio entre linhas, prioridades e cuidados editoriais."
      >
        <RichTextEditor
          value={data.generalGuidelines}
          onChange={(value) =>
            setData((current) => ({ ...current, generalGuidelines: value }))
          }
          placeholder="Ex: Manter equilíbrio entre autoridade, conexão e conversão. Priorizar conteúdos educativos no topo do funil, conteúdos de prova no meio e conteúdos de oferta no fundo. Evitar temas que não reforcem o posicionamento central."
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam a orientar exemplos de conteúdo, quadros, editorias e padrões visuais."
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
                  placeholder="Ex: Perfil, post, linha editorial, quadro, referência visual ou documento"
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