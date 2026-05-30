import { ModuleIcon } from "./ModuleIcon";
import { RichText } from "./RichText";

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
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:p-7">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#5f6f8a]">
        {label}
      </p>
      <RichText content={value} className="text-base leading-7 text-slate-800" />
    </div>
  );
}

function CharCard({ c }: { c: SpecialistCharacteristic }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
      {c.title && (
        <p className="text-base font-semibold text-slate-950">{c.title}</p>
      )}
      <RichText content={c.description} className="mt-2 text-sm leading-relaxed text-slate-700" />
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
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      {/* Header */}
      <section className="p-8 lg:p-12">
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
      </section>

      {/* Photo standalone — only when no characteristics */}
      {photo && characteristics.length === 0 && (
        <section className="p-8 lg:p-12">
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

      {/* Fields — each in its own card */}
      {filledFields.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Sobre o especialista
          </h3>
          <div className="space-y-4">
            {filledFields.map(([key, label]) => (
              <Field key={key} label={label} value={fields[key] ?? ""} />
            ))}
          </div>
        </section>
      )}

      {/* Personalidade do especialista — grid layout */}
      {characteristics.length > 0 && (
        <section className="p-8 lg:p-12">
          <p className="mb-8 text-base font-semibold uppercase tracking-[0.22em] text-[#5f6f8a]">
            Personalidade do especialista
          </p>

          {/* Desktop: cross grid */}
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-8">
            <div />
            <div>{characteristics[0] && <CharCard c={characteristics[0]} />}</div>
            <div />
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
        <section className="p-8">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
