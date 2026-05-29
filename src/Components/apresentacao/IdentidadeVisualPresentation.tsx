import { ModuleIcon } from "./ModuleIcon";

type ColorItem = { name: string; color: string; code: string };
type VisualReference = { image: string };
type ExternalReference = { image: string; title: string; link: string };

type VisualIdentityData = {
  fields: Record<string, string>;
  colors: ColorItem[];
  visualReferences: VisualReference[];
  externalReferences: ExternalReference[];
};

function isVisualIdentityData(v: unknown): v is VisualIdentityData {
  return typeof v === "object" && v !== null && "fields" in v && "colors" in v;
}

const fieldLabels: [string, string, string][] = [
  [
    "direcaoVisual",
    "Direção visual",
    "A atmosfera, estilo e percepção que a marca precisa transmitir.",
  ],
  [
    "fontesETipografia",
    "Fontes e tipografia",
    "Estilo das fontes, hierarquia, personalidade tipográfica.",
  ],
  [
    "elementosVisuais",
    "Elementos visuais",
    "Elementos gráficos, ícones, formas, padrões e detalhes visuais.",
  ],
  [
    "oQueEvitar",
    "O que evitar",
    "Cores, estilos, imagens ou abordagens que não combinam com a identidade.",
  ],
];

export default function IdentidadeVisualPresentation({ data }: { data: unknown }) {
  const d = isVisualIdentityData(data) ? data : null;
  const fields = d?.fields ?? {};
  const colors = (d?.colors ?? []).filter((c) => c.name?.trim() || c.code?.trim());
  const visualRefs = (d?.visualReferences ?? []).filter((r) => r.image?.trim());
  const externalRefs = (d?.externalReferences ?? []).filter(
    (r) => r.title?.trim() || r.image?.trim()
  );

  const filledFields = fieldLabels.filter(([k]) => fields[k]?.trim());

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="identidade-visual" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Essência do Projeto
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Identidade Visual
            </h2>
          </div>
        </div>
      </section>

      {/* Colors */}
      {colors.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Paleta de cores
          </h3>
          <div className="flex flex-wrap gap-5">
            {colors.map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div
                  className="h-20 w-20 rounded-2xl shadow-sm ring-1 ring-slate-200"
                  style={{ backgroundColor: color.color || color.code }}
                />
                <div className="text-center">
                  {color.name && (
                    <p className="text-sm font-medium text-slate-950">{color.name}</p>
                  )}
                  <p className="mt-0.5 font-mono text-xs text-slate-400">
                    {color.code?.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Text fields */}
      {filledFields.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Diretrizes visuais
          </h3>
          <div className="space-y-8">
            {filledFields.map(([key, label, helper]) => (
              <div key={key}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {label}
                </p>
                {helper && (
                  <p className="mb-2 text-sm text-slate-400">{helper}</p>
                )}
                <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
                  {fields[key]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Visual references (image only) */}
      {visualRefs.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Referências visuais
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visualRefs.map((ref, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200"
              >
                <img
                  src={ref.image}
                  alt={`Referência ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* External references */}
      {externalRefs.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Referências externas
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {externalRefs.map((ref, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200"
              >
                {ref.image && (
                  <img
                    src={ref.image}
                    alt={ref.title || "Referência"}
                    className="aspect-video w-full object-cover"
                  />
                )}
                {(ref.title || ref.link) && (
                  <div className="p-4">
                    {ref.title && (
                      <p className="text-sm font-semibold text-slate-950">
                        {ref.title}
                      </p>
                    )}
                    {ref.link && (
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block text-xs text-slate-500 hover:text-slate-950"
                      >
                        {ref.link}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {!d && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
