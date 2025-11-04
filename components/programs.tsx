"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CircuitBoard,
  Globe2,
  Microscope,
  Network,
  ShieldHalf
} from "lucide-react";
import Link from "next/link";
import type { ProgramsCollection } from "@/lib/cms/types";

const ICON_MAP = {
  "brain-circuit": BrainCircuit,
  network: Network,
  microscope: Microscope,
  "circuit-board": CircuitBoard,
  "shield-half": ShieldHalf,
  "globe-2": Globe2
} as const;

export function Programs({ collection }: { collection: ProgramsCollection }) {
  const categories = collection.categories;

  return (
    <section id="programs" className="mt-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <span className="badge">Portfolio atlas</span>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
            Every Aeterna product strengthens the <span className="text-[var(--text-status-warning)]">wider architecture</span>.
          </h2>
          <p className="max-w-3xl text-base text-[var(--text-secondary)]">
            Technologies compound across divisions: intelligence trains implants, networks fortify labs, and cryptography establishes trust among autonomous agents.
          </p>
        </div>
        <Link
          href={"/catalog" as any}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
          Full catalog
        </Link>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {categories.map((category, index) => (
          <motion.article
            key={category.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative flex flex-col gap-5 pl-6"
          >
            <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)] transition group-hover:bg-[var(--text-status-warning)]" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP];
                  return Icon ? <Icon className="h-6 w-6 text-[var(--icon-secondary)]" /> : null;
                })()}
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{category.title}</span>
              </div>
              <div className="flex gap-3 text-xs text-[var(--text-tertiary)]">
                {category.metrics.map((metric) => (
                  <span key={metric.label} className="flex items-center gap-1">
                    <strong
                      className={`font-semibold ${
                        metric.tone === "positive"
                          ? "text-[var(--text-status-warning)]"
                          : metric.tone === "critical"
                            ? "text-[var(--text-status-error)]"
                            : "text-[var(--text-primary)]"
                      }`}
                    >
                      {metric.label}
                    </strong>
                    {metric.value}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{category.headline}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{category.description}</p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em]">
              {category.actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href as any}
                  className={`inline-flex items-center gap-2 px-4 py-2 transition ${
                    action.accent
                      ? "rounded-full bg-[var(--interactive-bg-accent-default)] text-[var(--text-status-warning)]"
                      : "rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
              {category.metrics.map((metric) => (
                <span key={`${category.title}-${metric.label}`} className="rounded-full border border-[var(--border-light)] px-3 py-1">
                  #{metric.label.replace(/[^a-zA-Z0-9]+/g, "")}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
