"use client";

import { useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-mapa-do-site";

type SiteMapPageItem = {
  title: string;
  type: string;
  objective: string;
  description: string;
  requiredSections: string;
  mainCta: string;
  priority: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type SiteMapData = {
  pages: SiteMapPageItem[];
  strategicNotes: string;
  references: ExternalReference[];
};

const pageTypes = [
  "Institucional",
  "Comercial",
  "Captação",
  "Conteúdo",
  "Relacionamento",
  "Conversão",
  "Suporte",
  "Legal",
  "Outro",
];

const pagePriorities = ["Alta", "Média", "Baixa", "Futura"];

const initialPage: SiteMapPageItem = {
  title: "",
  type: "Institucional",
  objective: "",
  description: "",
  requiredSections: "",
  mainCta: "",
  priority: "Alta",
};

const initialData: SiteMapData = {
  pages: [initialPage],
  strategicNotes: "",
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
                  const isActive = module.slug === "mapa-do-site";

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

export default function MapaDoSitePage() {
  const [data, setData] = useState<SiteMapData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        pages:
          Array.isArray(parsed.pages) && parsed.pages.length
            ? parsed.pages.map((page: Partial<SiteMapPageItem>) => ({
                title: page.title || "",
                type: page.type || "Institucional",
                objective: page.objective || "",
                description: page.description || "",
                requiredSections: page.requiredSections || "",
                mainCta: page.mainCta || "",
                priority: page.priority || "Alta",
              }))
            : [initialPage],
        strategicNotes: parsed.strategicNotes || "",
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

  function updatePage(index: number, key: keyof SiteMapPageItem, value: string) {
    setData((current) => {
      const nextPages = [...current.pages];

      nextPages[index] = {
        ...nextPages[index],
        [key]: value,
      };

      return {
        ...current,
        pages: nextPages,
      };
    });
  }

  function addPage() {
    setData((current) => ({
      ...current,
      pages: [
        ...current.pages,
        {
          ...initialPage,
        },
      ],
    }));
  }

  function removePage(index: number) {
    setData((current) => ({
      ...current,
      pages:
        current.pages.length > 1
          ? current.pages.filter((_, pageIndex) => pageIndex !== index)
          : [
              {
                ...initialPage,
              },
            ],
    }));
  }

  function movePage(index: number, direction: "up" | "down") {
    setData((current) => {
      const nextPages = [...current.pages];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= nextPages.length) {
        return current;
      }

      const currentPage = nextPages[index];
      nextPages[index] = nextPages[targetIndex];
      nextPages[targetIndex] = currentPage;

      return {
        ...current,
        pages: nextPages,
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
                Mapa do Site
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Configure as páginas necessárias para o site. Escreva o que cada
                página deve contemplar para facilitar o desenvolvimento e
                garantir que a estrutura esteja alinhada à estratégia.
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
              title="Páginas do site"
              description="Defina as páginas principais, a função de cada uma, as seções necessárias, prioridade e chamada principal."
            >
              <div className="space-y-5">
                {data.pages.map((page, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Página {String(index + 1).padStart(2, "0")}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Defina uma página do site, seu objetivo, estrutura,
                          conteúdo necessário e papel dentro da jornada do
                          visitante.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => movePage(index, "up")}
                          className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                          Subir
                        </button>

                        <button
                          type="button"
                          onClick={() => movePage(index, "down")}
                          className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                          Descer
                        </button>

                        <button
                          type="button"
                          onClick={() => removePage(index)}
                          className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px_180px]">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Título da página
                        </label>

                        <input
                          type="text"
                          value={page.title}
                          onChange={(event) =>
                            updatePage(index, "title", event.target.value)
                          }
                          placeholder="Ex: Início, Sobre, Serviços, Blog, Contato, Landing Page..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Tipo da página
                        </label>

                        <select
                          value={page.type}
                          onChange={(event) =>
                            updatePage(index, "type", event.target.value)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        >
                          {pageTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Prioridade
                        </label>

                        <select
                          value={page.priority}
                          onChange={(event) =>
                            updatePage(index, "priority", event.target.value)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        >
                          {pagePriorities.map((priority) => (
                            <option key={priority} value={priority}>
                              {priority}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Objetivo da página
                      </label>

                      <input
                        type="text"
                        value={page.objective}
                        onChange={(event) =>
                          updatePage(index, "objective", event.target.value)
                        }
                        placeholder="Ex: Apresentar a marca, captar leads, vender uma oferta, educar o público ou gerar contato."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Descrição
                      </label>

                      <textarea
                        rows={6}
                        value={page.description}
                        onChange={(event) =>
                          updatePage(index, "description", event.target.value)
                        }
                        placeholder="Descreva o que essa página deve conter, qual será sua função, qual mensagem ela precisa transmitir e qual ação o visitante deve realizar."
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Seções obrigatórias
                        </label>

                        <textarea
                          rows={5}
                          value={page.requiredSections}
                          onChange={(event) =>
                            updatePage(
                              index,
                              "requiredSections",
                              event.target.value
                            )
                          }
                          placeholder="Ex: Hero, prova social, benefícios, serviços, depoimentos, FAQ, formulário, chamada final..."
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          CTA principal
                        </label>

                        <textarea
                          rows={5}
                          value={page.mainCta}
                          onChange={(event) =>
                            updatePage(index, "mainCta", event.target.value)
                          }
                          placeholder="Ex: Entrar em contato, agendar diagnóstico, baixar material, comprar, solicitar orçamento ou falar no WhatsApp."
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addPage}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Nova página
              </button>
            </SectionCard>

            <SectionCard
              title="Observações sobre a estrutura do site"
              description="Use este campo para registrar orientações gerais sobre menu, navegação, hierarquia, páginas obrigatórias, páginas futuras e prioridades do desenvolvimento."
            >
              <textarea
                rows={8}
                value={data.strategicNotes}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    strategicNotes: event.target.value,
                  }))
                }
                placeholder="Registre observações estratégicas sobre a organização do site, fluxo de navegação, experiência do usuário e prioridades."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estrutura do site."
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
                        placeholder="Ex: Sitemap, wireframe, briefing, referência de navegação ou site exemplo"
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