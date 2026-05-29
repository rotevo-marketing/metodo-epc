import { ModuleIcon } from "./ModuleIcon";

type SpecialistCharacteristic = { title: string; description: string };

type SpecialistData = {
  fields: Record<string, string>;
  photo: string;
  characteristics: SpecialistCharacteristic[];
};

function isSpecialistData(v: unknown): v is SpecialistData {
  return typeof v === "object" && v !== null && "fields" in v;
}

const fieldLabels: [string, string][] = [
  ["quemEoQueFaz", "Quem é e o que faz"],
  ["especialidadesExpertise", "Especialidades e expertise"],
  ["trajetoriaProfissional", "Trajetória profissional"],
  ["historiaPessoal", "História pessoal"],
  ["marcosConquistas", "Marcos e conquistas"],
  ["bandeirasCausas", "Bandeiras e causas"],
  ["propositoDigital", "Propósito no digital"],
  ["autodefinicao", "Autodefinição"],
  ["comoGostariaDeSerVisto", "Como gostaria de ser visto"],
];

function Field({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <p className="mb-3 text-base font-semibold uppercase tracking-[0.22em] text-slate-400">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">{value}</p>
    </div>
  );
}

function CharCard({ c }: { c: SpecialistCharacteristic }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
      {c.title && (
        <p className="text-base font-semibold text-slate-950">{c.title}</p>
      )}
      {c.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.description}</p>
      )}
    </div>
  );
}

export default function EspecialistaPresentation({ data }: { data: unknown }) {
  const d = isSpecialistData(data) ? data : null;
  const fields = d?.fields ?? {};
  const photo = d?.photo ?? "";
  const characteristics = (d?.characteristics ?? []).filter(
    (c) => c.title?.trim() || c.description?.trim()
  );

  const filledFields = fieldLabels.filter(([k]) => fields[k]?.trim());

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="dna-do-especialista" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Essência do Projeto
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Especialista
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          O DNA do especialista que sustenta a comunicação: quem é, o que faz,
          sua trajetória, valores, propósito e como deseja ser percebido.
        </p>
      </section>

      {/* Photo standalone — only when no characteristics */}
      {photo && characteristics.length === 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Foto do especialista
          </p>
          <img
            src={photo}
            alt="Especialista"
            className="max-h-96 w-auto rounded-2xl object-cover"
          />
        </section>
      )}

      {/* Fields */}
      {filledFields.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Sobre o especialista
          </h3>
          <div className="space-y-8">
            {filledFields.map(([key, label]) => (
              <Field key={key} label={label} value={fields[key] ?? ""} />
            ))}
          </div>
        </section>
      )}

      {/* Personalidade do especialista — grid layout */}
      {characteristics.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          {/* Section header */}
          <p className="mb-10 text-base font-semibold uppercase tracking-[0.22em] text-slate-400">
            Personalidade do especialista
          </p>

          {/* Desktop: cross grid */}
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-8">
            {/* Row 1 */}
            <div />
            <div>{characteristics[0] && <CharCard c={characteristics[0]} />}</div>
            <div />

            {/* Row 2 */}
            <div>
              {characteristics[1] ? <CharCard c={characteristics[1]} /> : <div />}
            </div>
            <div className="flex justify-center">
              {photo ? (
                <img
                  src={photo}
                  alt="Especialista"
                  className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="h-40 w-40 rounded-full border-2 border-slate-200 bg-slate-100" />
              )}
            </div>
            <div>
              {characteristics[2] ? <CharCard c={characteristics[2]} /> : <div />}
            </div>

            {/* Row 3 */}
            <div />
            <div>{characteristics[3] ? <CharCard c={characteristics[3]} /> : <div />}</div>
            <div />
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden">
            {photo && (
              <div className="mb-8 flex justify-center">
                <img
                  src={photo}
                  alt="Especialista"
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>
            )}
            <div className="space-y-4">
              {characteristics.slice(0, 4).map((c, i) => (
                <CharCard key={i} c={c} />
              ))}
            </div>
          </div>

          {/* Extra characteristics beyond 4 */}
          {characteristics.length > 4 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {characteristics.slice(4).map((c, i) => (
                <CharCard key={i} c={c} />
              ))}
            </div>
          )}
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
