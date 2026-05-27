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
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">{value}</p>
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

      {/* Photo */}
      {photo && (
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

      {/* Characteristics */}
      {characteristics.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Características marcantes
          </h3>
          <div className="space-y-6">
            {characteristics.map((c, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
              >
                {c.title && (
                  <p className="mb-2 text-sm font-semibold text-slate-950">
                    {c.title}
                  </p>
                )}
                {c.description && (
                  <p className="text-sm leading-7 text-slate-600">{c.description}</p>
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
