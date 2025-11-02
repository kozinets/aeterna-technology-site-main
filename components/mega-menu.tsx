"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MegaMenuItem = {
  title: string;
  summary: string;
  href: string;
  badge?: string;
  focus: string;
  preview: string;
  metrics: string[];
};

type MegaMenuSection = {
  id: string;
  title: string;
  description: string;
  meta: string;
  items: MegaMenuItem[];
};

export function MegaMenu({
  open,
  sections
}: {
  open: boolean;
  sections: MegaMenuSection[];
}) {
  const initialSection = useMemo(() => sections[0]?.id ?? "", [sections]);
  const [activeSectionId, setActiveSectionId] = useState(initialSection);
  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeSectionId) ?? sections[0],
    [activeSectionId, sections]
  );
  const [activeItem, setActiveItem] = useState<MegaMenuItem | null>(activeSection?.items[0] ?? null);

  useEffect(() => {
    setActiveSectionId((current) => {
      if (sections.some((section) => section.id === current)) {
        return current;
      }
      return sections[0]?.id ?? "";
    });
  }, [sections]);

  useEffect(() => {
    setActiveItem(activeSection?.items[0] ?? null);
  }, [activeSection]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-full z-40 w-full border border-[var(--border-default)] bg-[var(--bg-elevated-primary)]"
        >
          <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-12 py-10 lg:grid-cols-[220px_1fr_320px]">
            <div className="space-y-4 border-r border-[var(--border-light)] pr-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Divisions</p>
              <ul className="space-y-2">
                {sections.map((section) => {
                  const isActive = section.id === activeSection?.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveSectionId(section.id)}
                        onFocus={() => setActiveSectionId(section.id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                          isActive
                            ? "border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                            : "border-transparent text-[var(--text-tertiary)] hover:border-[var(--border-default)] hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        <span className="text-sm font-medium">{section.title}</span>
                        <p className="mt-1 text-xs text-[var(--text-tertiary)]">{section.meta}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Programs</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{activeSection?.description}</p>
              </div>
              <ul className="space-y-3">
                {activeSection?.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href as any}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-[var(--bg-secondary)] px-4 py-3 transition hover:border-[var(--border-default)]"
                      onMouseEnter={() => setActiveItem(item)}
                      onFocus={() => setActiveItem(item)}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-tertiary)]">{item.summary}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge ? (
                          <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--text-primary)]">
                            {item.badge}
                          </span>
                        ) : null}
                        <ChevronRight className="h-4 w-4 text-[var(--icon-tertiary)] transition group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={"/ecosystem" as any}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                View entire ecosystem
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <aside className="flex flex-col gap-5 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated-secondary)] p-6">
              {activeItem ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{activeItem.focus}</span>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{activeItem.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{activeItem.preview}</p>
                  <ul className="space-y-2 text-xs text-[var(--text-tertiary)]">
                    {activeItem.metrics.map((metric) => (
                      <li key={metric} className="flex items-center gap-2">
                        <Dot className="h-4 w-4 text-[var(--icon-secondary)]" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={activeItem.href as any}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-accent-default)] px-4 py-2 text-xs font-medium text-[var(--interactive-label-accent-default)] transition hover:bg-[var(--interactive-bg-accent-hover)]"
                  >
                    Launch program
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </aside>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
