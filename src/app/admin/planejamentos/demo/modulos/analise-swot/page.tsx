import { moduleCategories, planningModules } from "@/data/modules";

const camposSwot = [
  {
    label: "Forças",
    description:
      "Ambiente interno. Pontos fortes e diferenciais competitivos. Habilidades, competências e recursos.",
    placeholder:
      "Liste as forças do projeto, como diferenciais, ativos, autoridade, recursos, reputação, experiência, equipe, método, resultados e vantagens competitivas.",
  },
  {
    label: "Fraquezas",
    description:
      "Ambiente interno. Limitações ou desvantagens que podem impactar a performance do negócio. O que é preciso melhorar para se manter bem no mercado.",
    placeholder:
      "Liste fraquezas, limitações, pontos de melhoria, gargalos internos, falta de clareza, ausência de processos, baixa presença digital ou outros desafios internos.",
  },
  {
    label: "Oportunidades",
    description:
      "Ambiente externo. Situações ou cenários que podem representar uma oportunidade de posicionamento ou crescimento do negócio.",
    placeholder:
      "Liste oportunidades do mercado, tendências, demandas, mudanças de comportamento, canais pouco explorados, temas emergentes e espaços estratégicos.",
  },
  {
    label: "Ameaças",
    description:
      "Ambiente externo. Situações ou cenários que podem gerar impacto negativo no negócio.",
    placeholder:
      "Liste ameaças externas, como concorrência, saturação de mercado, mudanças de algoritmo, objeções do público, crises, riscos de reputação ou barreiras comerciais.",
  },
];

export default function AnaliseSwotPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
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
                    const isActive = module.slug === "analise-swot";

                    return (
                      <a
                        key={module.slug}
                        href={
                          module.slug === "dna-do-especialista"
                            ? "/admin/planejamentos/demo"
                            : `/admin/planejamentos/demo/modulos/${module.slug}`
                        }
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

      <section className="min-h-screen p-6 lg:ml-80 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <a
                href="/admin"
                className="text-sm font-semibold text-slate-500 hover:text-slate-950"
              >
                ← Voltar para planejamentos
              </a>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Fundamentos estratégicos do projeto
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Análise SWOT
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Mapeie forças, fraquezas, oportunidades e ameaças para entender
                o cenário estratégico do projeto e orientar decisões de
                posicionamento, conteúdo, canais e execução.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/apresentacao/demo"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver apresentação
              </a>

              <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Salvar módulo
              </button>
            </div>
          </div>

          <form className="space-y-6">
            {camposSwot.map((campo) => (
              <div
                key={campo.label}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <label className="block text-xl font-bold text-slate-950">
                  {campo.label}
                </label>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {campo.description}
                </p>

                <textarea
                  rows={6}
                  placeholder={campo.placeholder}
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            ))}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <label className="block text-sm font-semibold text-slate-700">
                Síntese estratégica da SWOT
              </label>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use este campo para transformar a análise em direcionamentos
                práticos para o planejamento.
              </p>

              <textarea
                rows={6}
                placeholder="Registre as principais conclusões da análise SWOT e como elas devem orientar as decisões do projeto."
                className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

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

                <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
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