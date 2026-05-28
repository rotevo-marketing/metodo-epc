"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";

export type EducationalMaterial = {
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

export type EducationalMaterialsData = {
  materials: EducationalMaterial[];
  strategy: string;
  references: ExternalReference[];
};

export const materialTypes = [
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

export const initialEducationalMaterialsData: EducationalMaterialsData = {
  materials: [{ ...initialMaterial }],
  strategy: "",
  references: [{ title: "", link: "" }],
};

type MateriaisEducacionaisFormProps = {
  data: EducationalMaterialsData;
  setData: React.Dispatch<React.SetStateAction<EducationalMaterialsData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function MateriaisEducacionaisForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: MateriaisEducacionaisFormProps) {
  const [expandedMaterial, setExpandedMaterial] = useState<number | null>(0);

  function updateMaterial(index: number, key: keyof EducationalMaterial, value: string) {
    setData((current) => {
      const next = [...current.materials];
      next[index] = { ...next[index], [key]: value };
      return { ...current, materials: next };
    });
  }

  function addMaterial() {
    setData((current) => ({
      ...current,
      materials: [...current.materials, { ...initialMaterial }],
    }));
    setExpandedMaterial(data.materials.length);
  }

  function removeMaterial(index: number) {
    setData((current) => ({
      ...current,
      materials:
        current.materials.length > 1
          ? current.materials.filter((_, i) => i !== index)
          : [{ ...initialMaterial }],
    }));
    setExpandedMaterial(null);
  }

  function handleMaterialFile(index: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setData((current) => {
        const next = [...current.materials];
        next[index] = {
          ...next[index],
          fileName: file.name,
          fileData: String(reader.result || ""),
        };
        return { ...current, materials: next };
      });
    };
    reader.readAsDataURL(file);
  }

  function removeMaterialFile(index: number) {
    setData((current) => {
      const next = [...current.materials];
      next[index] = { ...next[index], fileName: "", fileData: "" };
      return { ...current, materials: next };
    });
  }

  function updateReference(index: number, key: "title" | "link", value: string) {
    setData((current) => {
      const next = [...current.references];
      next[index] = { ...next[index], [key]: value };
      return { ...current, references: next };
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
          ? current.references.filter((_, i) => i !== index)
          : [{ title: "", link: "" }],
    }));
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";
  const textareaClass =
    "w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";
  const labelClass = "mb-2 block text-sm font-semibold text-slate-600";

  return (
    <div className="mt-6 space-y-6">
      {/* Materiais cadastrados */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Materiais cadastrados</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Cadastre materiais educacionais com título, tipo, conteúdo, objetivo estratégico, distribuição e link ou arquivo de referência.
        </p>

        <div className="mt-6 space-y-5">
          {data.materials.map((material, index) => (
            <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <button
                type="button"
                onClick={() => setExpandedMaterial(expandedMaterial === index ? null : index)}
                className="flex w-full items-center justify-between text-left"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Material {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {material.title || `Material ${index + 1}`}
                    {material.type ? ` — ${material.type}` : ""}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  {expandedMaterial === index ? "Recolher" : "Expandir"}
                </span>
              </button>

              {expandedMaterial === index && (
                <div className="mt-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_220px]">
                    <div>
                      <label className={labelClass}>Título</label>
                      <input
                        type="text"
                        value={material.title}
                        onChange={(e) => updateMaterial(index, "title", e.target.value)}
                        placeholder="Ex: Guia prático, checklist, e-book, planilha ou aula gratuita"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Tipo</label>
                      <select
                        value={material.type}
                        onChange={(e) => updateMaterial(index, "type", e.target.value)}
                        className={inputClass}
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
                    <label className={labelClass}>Conteúdo</label>
                    <textarea
                      rows={7}
                      value={material.content}
                      onChange={(e) => updateMaterial(index, "content", e.target.value)}
                      placeholder="Descreva o conteúdo do material, os temas abordados, a promessa, a estrutura e como ele será usado na estratégia."
                      className={textareaClass}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Objetivo do material</label>
                      <textarea
                        rows={5}
                        value={material.objective}
                        onChange={(e) => updateMaterial(index, "objective", e.target.value)}
                        placeholder="Ex: Captar leads, educar o público, preparar para venda, reforçar autoridade ou entregar valor."
                        className={textareaClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Como será distribuído</label>
                      <textarea
                        rows={5}
                        value={material.distribution}
                        onChange={(e) => updateMaterial(index, "distribution", e.target.value)}
                        placeholder="Ex: Landing page, Instagram, WhatsApp, e-mail, anúncio, blog ou campanha de captação."
                        className={textareaClass}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={labelClass}>Arquivo ou referência do material</label>
                    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                        <label className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-50">
                          <span className="text-3xl leading-none">+</span>
                          <span className="mt-2 text-xs">
                            {material.fileName || "Subir arquivo"}
                          </span>
                          <input
                            type="file"
                            onChange={(e) => handleMaterialFile(index, e)}
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
                        <label className={labelClass}>Link do material</label>
                        <input
                          type="url"
                          value={material.materialLink}
                          onChange={(e) => updateMaterial(index, "materialLink", e.target.value)}
                          placeholder="https://..."
                          className={inputClass}
                        />
                        <p className="mt-3 text-xs leading-5 text-slate-500">
                          Use este campo quando o material estiver em uma pasta, página, drive, landing page ou ferramenta externa.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
                    className="mt-5 cursor-pointer rounded-full border border-red-100 bg-white px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Excluir material
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMaterial}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo material
        </button>
      </section>

      {/* Estratégia dos materiais */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Estratégia dos materiais</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Use este campo para registrar como os materiais educacionais se conectam à jornada, às campanhas, aos canais e às ofertas do projeto.
        </p>

        <div className="mt-6">
          <textarea
            rows={8}
            value={data.strategy}
            onChange={(e) => setData((c) => ({ ...c, strategy: e.target.value }))}
            placeholder="Explique como os materiais serão usados na estratégia, quais etapas da jornada eles atendem, quais públicos receberão cada material e quais resultados devem gerar."
            className={textareaClass}
          />
        </div>
      </section>

      {/* Referências externas */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Anexos e referências externas</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor os materiais propostos.
        </p>

        <div className="mt-6 space-y-4">
          {data.references.map((reference, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className={labelClass}>Título da referência</label>
                <input
                  type="text"
                  value={reference.title}
                  onChange={(e) => updateReference(index, "title", e.target.value)}
                  placeholder="Ex: Material, e-book, planilha, landing page ou referência visual"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Link</label>
                <input
                  type="url"
                  value={reference.link}
                  onChange={(e) => updateReference(index, "link", e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
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
      </section>

      {/* Ações */}
      <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/admin/planejamentos/${clientSlug}`}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Voltar para módulos
        </Link>

        <div className="flex gap-3">
          <Link
            href={presentationHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
