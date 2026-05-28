"use client";

import { useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-estrategia-do-site";

type SiteReference = {
  title: string;
  url: string;
};

type SiteIntegration = {
  name: string;
};

type SiteSimpleItem = {
  value: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type SiteStrategyData = {
  visualIdentity: string;
  references: SiteReference[];
  integrations: SiteIntegration[];
  essentialPages: SiteSimpleItem[];
  importantFeatures: SiteSimpleItem[];
  strategicNotes: string;
  externalReferences: ExternalReference[];
};

const initialData: SiteStrategyData = {
  visualIdentity: "",
  references: [{ title: "", url: "" }],
  integrations: [{ name: "" }],
  essentialPages: [{ value: "" }],
  importantFeatures: [{ value: "" }],
  strategicNotes: "",
  externalReferences: [{ title: "", link: "" }],
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
                  const isActive = module.slug === "estrategia-do-site";

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

export default function EstrategiaDoSitePage() {
  const [data, setData] = useState<SiteStrategyData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        visualIdentity: parsed.visualIdentity || "",
        references:
          Array.isArray(parsed.references) && parsed.references.length
            ? parsed.references.map((reference: Partial<SiteReference>) => ({
                title: reference.title || "",
                url: reference.url || "",
              }))
            : [{ title: "", url: "" }],
        integrations:
          Array.isArray(parsed.integrations) && parsed.integrations.length
            ? parsed.integrations.map((integration: Partial<SiteIntegration>) => ({
                name: integration.name || "",
              }))
            : [{ name: "" }],
        essentialPages:
          Array.isArray(parsed.essentialPages) && parsed.essentialPages.length
            ? parsed.essentialPages.map((item: Partial<SiteSimpleItem>) => ({
                value: item.value || "",
              }))
            : [{ value: "" }],
        importantFeatures:
          Array.isArray(parsed.importantFeatures) &&
          parsed.importantFeatures.length
            ? parsed.importantFeatures.map((item: Partial<SiteSimpleItem>) => ({
                value: item.value || "",
              }))
            : [{ value: "" }],
        strategicNotes: parsed.strategicNotes || "",
        externalReferences:
          Array.isArray(parsed.externalReferences) &&
          parsed.externalReferences.length
            ? parsed.externalReferences.map(
                (reference: Partial<ExternalReference>) => ({
                  title: reference.title || "",
                  link: reference.link || "",
                })
              )
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

  function updateReference(
    index: number,
    key: keyof SiteReference,
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
      references: [...current.references, { title: "", url: "" }],
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
          : [{ title: "", url: "" }],
    }));
  }

  function updateIntegration(index: number, value: string) {
    setData((current) => {
      const nextIntegrations = [...current.integrations];

      nextIntegrations[index] = {
        name: value,
      };

      return {
        ...current,
        integrations: nextIntegrations,
      };
    });
  }

  function addIntegration() {
    setData((current) => ({
      ...current,
      integrations: [...current.integrations, { name: "" }],
    }));
  }

  function removeIntegration(index: number) {
    setData((current) => ({
      ...current,
      integrations:
        current.integrations.length > 1
          ? current.integrations.filter(
              (_, integrationIndex) => integrationIndex !== index
            )
          : [{ name: "" }],
    }));
  }

  function updateSimpleItem(
    listKey: "essentialPages" | "importantFeatures",
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

  function addSimpleItem(listKey: "essentialPages" | "importantFeatures") {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeSimpleItem(
    listKey: "essentialPages" | "importantFeatures",
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

  function addExternalReference() {
    setData((current) => ({
      ...current,
      externalReferences: [
        ...current.externalReferences,
        { title: "", link: "" },
      ],
    }));
  }

  function removeExternalReference(index: number) {
    setData((current) => ({
      ...current,
      externalReferences:
        current.externalReferences.length > 1
          ? current.externalReferences.filter(
              (_, referenceIndex) => referenceIndex !== index
            )
          : [{ title: "", link: "" }],
    }));
  }

  function SimpleListSection({
    title,
    description,
    listKey,
    placeholder,
    buttonLabel,
  }: {
    title: string;
    description: string;
    listKey: "essentialPages" | "importantFeatures";
    placeholder: string;
    buttonLabel: string;
  }) {
    return (
      <SectionCard title={title} description={description}>
        <div className="space-y-4">
          {data[listKey].map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto]"
            >
              <input
                type="text"
                value={item.value}
                onChange={(event) =>
                  updateSimpleItem(listKey, index, event.target.value)
                }
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <button
                type="button"
                onClick={() => removeSimpleItem(listKey, index)}
                className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSimpleItem(listKey)}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
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
                Estratégia do Site
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Explique como deve ser o site do novo projeto, quais elementos
                visuais devem ser respeitados, quais páginas precisam existir e
                quais ferramentas, integrações ou plugins precisam estar
                presentes.
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
              title="Identidade visual do site"
              description="Faça uma extensão da identidade visual do projeto para o site. Registre cores, estilo das imagens, fontes, elementos visuais, sensações desejadas e referências de aparência."
            >
              <textarea
                rows={8}
                value={data.visualIdentity}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    visualIdentity: event.target.value,
                  }))
                }
                placeholder="Descreva a direção visual do site, incluindo estilo, cores, referências, imagens, tipografia, elementos gráficos e sensação desejada."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Referências"
              description="Registre referências que podem nortear a concepção ou remodelação do site."
            >
              <div className="space-y-4">
                {data.references.map((reference, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Referência
                      </label>

                      <input
                        type="text"
                        value={reference.title}
                        onChange={(event) =>
                          updateReference(index, "title", event.target.value)
                        }
                        placeholder="Ex: Site, página, landing page ou projeto de referência"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        URL
                      </label>

                      <input
                        type="url"
                        value={reference.url}
                        onChange={(event) =>
                          updateReference(index, "url", event.target.value)
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

            <SectionCard
              title="Integrações e plugins"
              description="Liste os plugins, ferramentas e integrações que o site deve conter para que a estratégia atinja os resultados esperados."
            >
              <div className="space-y-4">
                {data.integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Integração ou plugin
                      </label>

                      <input
                        type="text"
                        value={integration.name}
                        onChange={(event) =>
                          updateIntegration(index, event.target.value)
                        }
                        placeholder="Ex: Formulário de contato, WhatsApp, RD Station, Pixel, Google Analytics, CRM..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeIntegration(index)}
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
                onClick={addIntegration}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Nova integração
              </button>
            </SectionCard>

            <SimpleListSection
              title="Páginas essenciais"
              description="Liste as páginas que precisam existir no site para apresentar a empresa, educar o público, gerar conversão e apoiar a jornada."
              listKey="essentialPages"
              placeholder="Ex: Home, sobre, serviços, blog, contato, página de captura, obrigado, vendas..."
              buttonLabel="Nova página"
            />

            <SimpleListSection
              title="Funcionalidades importantes"
              description="Liste recursos, blocos ou funcionalidades que o site precisa ter para melhorar navegação, conversão, clareza e experiência do usuário."
              listKey="importantFeatures"
              placeholder="Ex: Botão fixo de WhatsApp, formulário, captura de leads, prova social, FAQ, depoimentos..."
              buttonLabel="Nova funcionalidade"
            />

            <SectionCard
              title="Observações estratégicas do site"
              description="Use este campo para registrar objetivos, prioridades, páginas indispensáveis, cuidados e recomendações gerais para o site."
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
                placeholder="Registre observações sobre estrutura, função comercial, experiência do usuário, conversão, conteúdo, SEO e prioridades do site."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do site."
            >
              <div className="space-y-4">
                {data.externalReferences.map((reference, index) => (
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
                          updateExternalReference(
                            index,
                            "title",
                            event.target.value
                          )
                        }
                        placeholder="Ex: Briefing, wireframe, referência visual ou documento do projeto"
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

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeExternalReference(index)}
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
                onClick={addExternalReference}
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