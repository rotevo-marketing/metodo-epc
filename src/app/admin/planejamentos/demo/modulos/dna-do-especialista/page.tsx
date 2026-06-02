"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const STORAGE_KEY = "metodo-epc-demo-especialista";

type SpecialistCharacteristic = {
  title: string;
  description: string;
};

type SpecialistData = {
  fields: Record<string, string>;
  photo: string;
  characteristics: SpecialistCharacteristic[];
};

const initialData: SpecialistData = {
  fields: {},
  photo: "",
  characteristics: [
    {
      title: "",
      description: "",
    },
  ],
};

const menuGroups = [
  {
    title: "Planejamento",
    items: [{ label: "Cliente Demo", href: "/admin/planejamentos/demo" }],
  },
  {
    title: "Essência do projeto",
    items: [
      {
        label: "Especialista",
        href: "/admin/planejamentos/demo/modulos/dna-do-especialista",
        active: true,
      },
      {
        label: "Empresa",
        href: "/admin/planejamentos/demo/modulos/dna-da-empresa",
      },
      {
        label: "DNA do Conteúdo",
        href: "/admin/planejamentos/demo/modulos/dna-de-conteudo",
      },
      {
        label: "Tom de Voz",
        href: "/admin/planejamentos/demo/modulos/tom-de-voz",
      },
      {
        label: "Identidade Visual",
        href: "/admin/planejamentos/demo/modulos/identidade-visual",
      },
    ],
  },
  {
    title: "Fundamentos estratégicos do projeto",
    items: [
      {
        label: "Objetivos do Projeto",
        href: "/admin/planejamentos/demo/modulos/objetivos-do-projeto",
      },
      {
        label: "Referências e Concorrentes",
        href: "/admin/planejamentos/demo/modulos/referencias-e-concorrentes",
      },
      {
        label: "Análise de Concorrência",
        href: "/admin/planejamentos/demo/modulos/pesquisa-de-concorrencia",
      },
      {
        label: "Análise SWOT",
        href: "/admin/planejamentos/demo/modulos/analise-swot",
      },
      {
        label: "Palavras-chave",
        href: "/admin/planejamentos/demo/modulos/palavras-chave",
      },
      {
        label: "Personas",
        href: "/admin/planejamentos/demo/modulos/personas",
      },
      {
        label: "Jornada de Compra",
        href: "/admin/planejamentos/demo/modulos/jornada-de-compra",
      },
      {
        label: "Canais Digitais Atuais",
        href: "/admin/planejamentos/demo/modulos/canais-digitais-atuais",
      },
    ],
  },
  {
    title: "Estratégia editorial e canais de conteúdo",
    items: [
      {
        label: "Funil de Conteúdo",
        href: "/admin/planejamentos/demo/modulos/funil-de-conteudo",
      },
      {
        label: "Linhas Editoriais",
        href: "/admin/planejamentos/demo/modulos/linhas-editoriais",
      },
      {
        label: "Instagram",
        href: "/admin/planejamentos/demo/modulos/instagram",
      },
      {
        label: "TikTok",
        href: "/admin/planejamentos/demo/modulos/tiktok",
      },
      {
        label: "Youtube",
        href: "/admin/planejamentos/demo/modulos/youtube",
      },
      {
        label: "Facebook",
        href: "/admin/planejamentos/demo/modulos/facebook",
      },
      {
        label: "Linkedin",
        href: "/admin/planejamentos/demo/modulos/linkedin",
      },
      {
        label: "WhatsApp",
        href: "/admin/planejamentos/demo/modulos/whatsapp",
      },
      {
        label: "Blog",
        href: "/admin/planejamentos/demo/modulos/blog",
      },
      {
        label: "Pinterest",
        href: "/admin/planejamentos/demo/modulos/pinterest",
      },
      {
        label: "Podcast",
        href: "/admin/planejamentos/demo/modulos/podcasts",
      },
      {
        label: "Lives",
        href: "/admin/planejamentos/demo/modulos/lives",
      },
      {
        label: "Materiais Educacionais",
        href: "/admin/planejamentos/demo/modulos/materiais-educacionais",
      },
      {
        label: "Estratégia do Site",
        href: "/admin/planejamentos/demo/modulos/estrategia-do-site",
      },
      {
        label: "Mapa do Site",
        href: "/admin/planejamentos/demo/modulos/mapa-do-site",
      },
    ],
  },
  {
    title: "Campanhas, automações e conversão",
    items: [
      {
        label: "Campanha: Captação de Lead",
        href: "/admin/planejamentos/demo/modulos/campanha-captacao-de-lead",
      },
      {
        label: "Campanha: Conversão de Vendas",
        href: "/admin/planejamentos/demo/modulos/campanha-conversao-de-vendas",
      },
      {
        label: "Campanha: Distribuição de Conteúdo",
        href: "/admin/planejamentos/demo/modulos/campanha-distribuicao-de-conteudo",
      },
      {
        label: "Fluxo de Automação",
        href: "/admin/planejamentos/demo/modulos/fluxo-de-automacao",
      },
    ],
  },
  {
    title: "Execução, acompanhamento e gestão",
    items: [
      {
        label: "Linha do Tempo",
        href: "/admin/planejamentos/demo/modulos/linha-do-tempo",
      },
      {
        label: "Calendário de Conteúdo",
        href: "/admin/planejamentos/demo/modulos/calendario-de-conteudo",
      },
      {
        label: "Métricas e Indicadores",
        href: "/admin/planejamentos/demo/modulos/metricas-e-indicadores",
      },
      {
        label: "Orientações Adicionais",
        href: "/admin/planejamentos/demo/modulos/orientacoes-adicionais",
      },
    ],
  },
];

const specialistFields = [
  {
    key: "quemEoQueFaz",
    label: "Quem é e o que faz",
    helper:
      "Apresente quem é o especialista, o que ele faz, para quem faz e qual transformação entrega.",
    placeholder:
      "Ex: Especialista em reestruturação interna para empresários em expansão, atuando na base invisível que sustenta decisões, crescimento e resultados.",
  },
  {
    key: "especialidadesExpertise",
    label: "Especialidades e expertise",
    helper:
      "Liste áreas de domínio, conhecimentos técnicos, diferenciais, métodos, formações e temas de autoridade.",
    placeholder:
      "Ex: liderança, mentalidade financeira, padrões de decisão, gestão emocional, posicionamento e crescimento empresarial.",
  },
  {
    key: "trajetoriaProfissional",
    label: "Trajetória profissional",
    helper:
      "Conte a trajetória profissional, experiências relevantes, cargos, projetos, decisões importantes e evolução de carreira.",
    placeholder:
      "Descreva os principais pontos da trajetória que ajudam a construir autoridade e confiança.",
  },
  {
    key: "historiaPessoal",
    label: "História pessoal",
    helper:
      "Registre elementos da história pessoal que ajudam a humanizar a narrativa e aproximar o especialista do público.",
    placeholder:
      "Conte experiências, viradas, desafios, aprendizados e elementos pessoais que fazem sentido para a comunicação.",
  },
  {
    key: "marcosConquistas",
    label: "Marcos e conquistas",
    helper:
      "Liste conquistas, resultados, certificações, cases, reconhecimentos, números ou momentos importantes da trajetória.",
    placeholder:
      "Ex: projetos realizados, clientes atendidos, formações, eventos, publicações, resultados alcançados ou reconhecimentos.",
  },
  {
    key: "bandeirasCausas",
    label: "Bandeiras e causas",
    helper:
      "Defina quais ideias, causas, posicionamentos ou pontos de vista o especialista defende publicamente.",
    placeholder:
      "Ex: crescimento com consciência, liderança mais madura, decisões alinhadas, negócios sustentáveis e saúde emocional do empreendedor.",
  },
  {
    key: "propositoDigital",
    label: "Propósito no digital",
    helper:
      "Explique por que o especialista deseja se posicionar no digital e qual papel sua presença online deve cumprir.",
    placeholder:
      "Ex: Educar empresários, reorganizar percepções, construir autoridade e atrair clientes mais conscientes do problema que precisam resolver.",
  },
  {
    key: "autodefinicao",
    label: "Autodefinição",
    helper:
      "Registre como o especialista define a si mesmo de forma simples, direta e estratégica.",
    placeholder:
      "Ex: Sou uma especialista que ajuda empresários em expansão a reorganizarem a estrutura interna que sustenta crescimento, decisões e resultados.",
  },
  {
    key: "comoGostariaDeSerVisto",
    label: "Como gostaria de ser visto",
    helper:
      "Descreva a percepção que o público deve ter ao entrar em contato com o especialista, seus conteúdos e sua presença digital.",
    placeholder:
      "Ex: Como uma referência estratégica, profunda, direta e confiável para empresários que querem crescer sem perder clareza, estrutura e controle.",
  },
];

function PageSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto bg-white px-5 py-6 ring-1 ring-slate-200 lg:block">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Metodo EPC
        </h1>
        <p className="mt-1 text-xs text-slate-500">Painel administrativo</p>
      </div>

      <nav className="mt-8 space-y-7">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded-xl px-3 py-2 text-sm transition",
                    item.active
                      ? "bg-slate-100 font-semibold text-slate-950"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function TextAreaCard({
  label,
  helper,
  placeholder,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  helper: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <label className="text-sm font-semibold text-slate-950">{label}</label>

      <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />
    </section>
  );
}

export default function DnaDoEspecialistaPage() {
  const [data, setData] = useState<SpecialistData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        const savedCharacteristics = parsed.characteristics?.length
  ? parsed.characteristics
  : parsed.personality?.length
    ? parsed.personality.map((item: string) => ({
        title: item,
        description: "",
      }))
    : initialData.characteristics;

const filledCharacteristics = savedCharacteristics.filter(
  (item: SpecialistCharacteristic) =>
    item.title?.trim() || item.description?.trim()
);

setData({
  fields: parsed.fields || {},
  photo: parsed.photo || "",
  characteristics: filledCharacteristics.length
    ? filledCharacteristics
    : initialData.characteristics,
});
      } catch {
        setData(initialData);
      }
    }
  }, []);

  function saveData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedMessage("Módulo salvo com sucesso.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2800);
  }

  function updateField(key: string, value: string) {
    setData((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value,
      },
    }));
  }

  function updatePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setData((current) => ({
        ...current,
        photo: String(reader.result || ""),
      }));
    };

    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setData((current) => ({
      ...current,
      photo: "",
    }));
  }

  function updateCharacteristic(
    index: number,
    key: keyof SpecialistCharacteristic,
    value: string
  ) {
    setData((current) => {
      const nextCharacteristics = [...current.characteristics];

      nextCharacteristics[index] = {
        ...nextCharacteristics[index],
        [key]: value,
      };

      return {
        ...current,
        characteristics: nextCharacteristics,
      };
    });
  }

  function addCharacteristic() {
    setData((current) => ({
      ...current,
      characteristics: [
        ...current.characteristics,
        {
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeCharacteristic(index: number) {
    setData((current) => ({
      ...current,
      characteristics:
        current.characteristics.length > 1
          ? current.characteristics.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                title: "",
                description: "",
              },
            ],
    }));
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 lg:pl-72">
      <PageSidebar />

      <section className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/admin/planejamentos/demo"
              className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              ← Voltar para planejamentos
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Essência do projeto
            </p>

            <h2 className="mt-3 text-5xl font-light tracking-[-0.04em] text-slate-950">
              Especialista
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Preencha as informações que definem quem é o especialista, sua
              trajetória, autoridade, forma de atuação, propósito digital e
              personalidade pública.
            </p>

            {savedMessage && (
              <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {savedMessage}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/apresentacao/demo"
              className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white hover:ring-slate-950"
            >
              Ver apresentação
            </Link>

            <button
              type="button"
              onClick={saveData}
              className="inline-flex h-12 min-w-[140px] cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Salvar módulo
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {specialistFields.map((field) => (
            <TextAreaCard
              key={field.key}
              label={field.label}
              helper={field.helper}
              placeholder={field.placeholder}
              value={data.fields[field.key] || ""}
              onChange={(value) => updateField(field.key, value)}
            />
          ))}

          <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Personalidade do especialista
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
                Adicione a foto e registre as principais características que
                ajudam a construir a personalidade pública do especialista.
              </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-950">
                Foto do especialista
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use uma imagem quadrada para melhor resultado na apresentação.
                Tamanho recomendado: 720x720px.
              </p>

              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {data.photo ? (
                    <img
                      src={data.photo}
                      alt="Foto do especialista"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Foto"
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Escolher foto
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={updatePhoto}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={removePhoto}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
                  >
                    Remover
                  </button>

                  <p className="w-full text-sm text-slate-500">
                    Formatos aceitos: JPG, PNG ou WEBP.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {data.characteristics.map((characteristic, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                        Característica {String(index + 1).padStart(2, "0")}
                      </p>

                      <h4 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-950">
                        {characteristic.title || "Nova característica"}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeCharacteristic(index)}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </div>

                  <div className="mt-5 grid gap-5">
                    <div>
                      <label className="text-sm font-semibold text-slate-950">
                        Título da característica
                      </label>

                      <input
                        type="text"
                        value={characteristic.title}
                        onChange={(event) =>
                          updateCharacteristic(index, "title", event.target.value)
                        }
                        placeholder="Ex: Didático, direto, provocativo, acolhedor..."
                        className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-950">
                        Descrição da característica
                      </label>

                      <textarea
                        rows={5}
                        value={characteristic.description}
                        onChange={(event) =>
                          updateCharacteristic(
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        placeholder="Explique como essa característica aparece na comunicação, no conteúdo, na postura e na forma como o especialista se apresenta."
                        className="mt-3 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addCharacteristic}
              className="mt-6 cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white hover:ring-slate-950"
            >
              + Nova característica
            </button>
          </section>
        </div>

        <div className="sticky bottom-0 -mx-6 mt-8 border-t border-slate-200 bg-slate-100/90 px-6 py-5 backdrop-blur lg:-mx-10 lg:px-10">
          <div className="mx-auto flex max-w-6xl justify-end gap-3">
            <Link
              href="/admin/planejamentos/demo"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Voltar para planejamentos
            </Link>

            <Link
              href="/apresentacao/demo"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Ver apresentação
            </Link>

            <button
              type="button"
              onClick={saveData}
              className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Salvar módulo
            </button>
          </div>
        </div>

        {savedMessage && (
          <div className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl">
            {savedMessage}
          </div>
        )}
      </section>
    </main>
  );
}