"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";

type PlanejamentoModuleShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  savedMessage?: string;
  onSave?: () => void;
  backHref?: string;
  presentationHref?: string;
  saveLabel?: string;
};

const coverImageUrl =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2200&auto=format&fit=crop";

export default function PlanejamentoModuleShell({
  eyebrow,
  title,
  description,
  children,
  savedMessage,
  onSave,
  backHref = "/admin/planejamentos/demo",
  presentationHref = "/apresentacao/demo",
  saveLabel = "Salvar módulo",
}: PlanejamentoModuleShellProps) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="relative min-h-[520px] overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url(${coverImageUrl})`,
          }}
        />

        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10 flex min-h-[520px] flex-col justify-between px-6 py-8 lg:px-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <MetodoLogo href="/admin" size="sm" className="brightness-0 invert" />

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link
                href={backHref}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
              >
                Voltar para planejamentos
              </Link>

              <Link
                href={presentationHref}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
              >
                Ver apresentação
              </Link>

              <button
                type="button"
                onClick={onSave}
                className="cursor-pointer rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
              >
                {saveLabel}
              </button>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium uppercase tracking-[0.55em] text-white/70">
              {eyebrow}
            </p>

            <h1 className="mt-5 text-5xl font-light tracking-[-0.05em] text-white lg:text-7xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 lg:text-lg">
              {description}
            </p>

            {savedMessage ? (
              <p className="mt-6 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur">
                {savedMessage}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        {children}
      </section>

      <MetodoFooter />
    </main>
  );
}