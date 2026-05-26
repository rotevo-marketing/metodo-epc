"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-materiais-educacionais";

type EducationalMaterial = {
  title: string;
  type: string;
  content: string;
  objective: string;
  distribution: string;
  fileName: string;
  fileData: string;
  materialLink: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type EducationalMaterialsData = {
  materials: EducationalMaterial[];
  strategy: string;
  references: ExternalReference[];
};

const materialTypes = [
  "E-book",
  "Checklist",
  "Planilha",
  "PDF",
  "Aula gratuita",
  "Webinário",
  "Infográfico",
  "Lista",
  "Template",
  "Guia prático",
  "Diagnóstico",
  "Outro",
];

const initialMaterial: EducationalMaterial = {
  title: "",
  type: "E-book",
  content: "",
  objective: "",
  distribution: "",
  fileName: "",
  fileData: "",
  materialLink: "",
};

const initialData: EducationalMaterialsData = {
  materials: [initialMaterial],
  strategy: "",
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
                  const isActive = module.slug === "materiais-educacionais";

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

export default function MateriaisEducacionaisPage() {
  const [data, setData] = useState<EducationalMaterialsData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        materials:
          Array.isArray(parsed.materials) && parsed.materials.length
            ? parsed.materials.map((material: Partial<EducationalMaterial>) => ({
                title: material.title || "",
                type: material.type || "E-book",
                content: material.content || "",
                objective: material.objective || "",
                distribution: material.distribution || "",
                fileName: material.fileName || "",
                fileData: material.fileData || "",
                materialLink: material.materialLink || "",
              }))
            : [initialMaterial],
        strategy: parsed.strategy || "",
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

  function updateMaterial(
    index: number,
    key: keyof EducationalMaterial,
    value: string
  ) {
    setData((current) => {
      const nextMaterials = [...current.materials];

      nextMaterials[index] = {
        ...nextMaterials[index],
        [key]: value,
      };

      return {
        ...current,
        materials: nextMaterials,
      };
    });
  }

  function addMaterial() {
    setData((current) => ({
      ...current,
      materials: [
        ...current.materials,
        {
          ...initialMaterial,
        },
      ],
    }));
  }

  function removeMaterial(index: number) {
    setData((current) => ({
      ...current,
      materials:
        current.materials.length > 1
          ? current.materials.filter(
              (_, materialIndex) => materialIndex !== index
            )
          : [
              {
                ...initialMaterial,
              },
            ],
    }));
  }

  function handleMaterialFile(
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
        const nextMaterials = [...current.materials];

        nextMaterials[index] = {
          ...nextMaterials[index],
          fileName: file.name,
          fileData: String(reader.result || ""),
        };

        return {
          ...current,
          materials: nextMaterials,
        };
      });
    };

    reader.readAsDataURL(file);
  }

  function removeMaterialFile(index: number) {
    setData((current) => {
      const nextMaterials = [...current.materials];

      nextMaterials[index] = {
        ...nextMaterials[index],
        fileName: "",
        fileData: "",
      };

      return {
        ...current,
        materials: nextMaterials,
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
                Materiais Educacionais
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Faça a lista de materiais como e-books, PDFs, planilhas,
                webinários, listas, infográficos e recursos educativos que podem
                ser usados na estratégia para educar, nutrir e captar leads
                segmentados.
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
              title="Materiais cadastrados"
              description="Cadastre materiais educacionais com título, tipo, conteúdo, objetivo estratégico, distribuição e link ou arquivo de referência."
            >
              <div className="space-y-5">
                {data.materials.map((material, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Material {String(index + 1).padStart(2, "0")}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Cadastre um material educacional com título, tipo,
                          conteúdo, objetivo estratégico e uso dentro da jornada
                          do público.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
                        className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Título
                        </label>

                        <input
                          type="text"
                          value={material.title}
                          onChange={(event) =>
                            updateMaterial(index, "title", event.target.value)
                          }
                          placeholder="Ex: Guia prático, checklist, e-book, planilha ou aula gratuita"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Tipo
                        </label>

                        <select
                          value={material.type}
                          onChange={(event) =>
                            updateMaterial(index, "type", event.target.value)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        >
                          {materialTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Conteúdo
                      </label>

                      <textarea
                        rows={7}
                        value={material.content}
                        onChange={(event) =>
                          updateMaterial(index, "content", event.target.value)
                        }
                        placeholder="Descreva o conteúdo do material, os temas abordados, a promessa, a estrutura e como ele será usado na estratégia."
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Objetivo do material
                        </label>

                        <textarea
                          rows={5}
                          value={material.objective}
                          onChange={(event) =>
                            updateMaterial(
                              index,
                              "objective",
                              event.target.value
                            )
                          }
                          placeholder="Ex: Captar leads, educar o público, preparar para venda, reforçar autoridade ou entregar valor."
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Como será distribuído
                        </label>

                        <textarea
                          rows={5}
                          value={material.distribution}
                          onChange={(event) =>
                            updateMaterial(
                              index,
                              "distribution",
                              event.target.value
                            )
                          }
                          placeholder="Ex: Landing page, Instagram, WhatsApp, e-mail, anúncio, blog ou campanha de captação."
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Arquivo ou referência do material
                      </label>

                      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                          <label className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-50">
                            <span className="text-3xl leading-none">+</span>
                            <span className="mt-2">
                              {material.fileName || "Subir arquivo"}
                            </span>

                            <input
                              type="file"
                              onChange={(event) =>
                                handleMaterialFile(index, event)
                              }
                              className="hidden"
                            />
                          </label>

                          {material.fileName && (
                            <button
                              type="button"
                              onClick={() => removeMaterialFile(index)}
                              className="mt-3 w-full cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                            >
                              Remover arquivo
                            </button>
                          )}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                          <label className="mb-2 block text-sm font-semibold text-slate-600">
                            Link do material
                          </label>

                          <input
                            type="url"
                            value={material.materialLink}
                            onChange={(event) =>
                              updateMaterial(
                                index,
                                "materialLink",
                                event.target.value
                              )
                            }
                            placeholder="https://..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                          />

                          <p className="mt-3 text-xs leading-5 text-slate-500">
                            Use este campo quando o material estiver em uma
                            pasta, página, drive, landing page ou ferramenta
                            externa.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addMaterial}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
              >
                + Novo material
              </button>
            </SectionCard>

            <SectionCard
              title="Estratégia dos materiais"
              description="Use este campo para registrar como os materiais educacionais se conectam à jornada, às campanhas, aos canais e às ofertas do projeto."
            >
              <textarea
                rows={8}
                value={data.strategy}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    strategy: event.target.value,
                  }))
                }
                placeholder="Explique como os materiais serão usados na estratégia, quais etapas da jornada eles atendem, quais públicos receberão cada material e quais resultados devem gerar."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor os materiais propostos."
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
                        placeholder="Ex: Material, e-book, planilha, landing page ou referência visual"
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