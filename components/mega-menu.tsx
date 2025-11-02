"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Lock, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

type MegaMenuSection = {
  id: string;
  title: string;
  description: string;
  items: {
    title: string;
    summary: string;
    href: string;
    badge?: string;
  }[];
};

const securityHighlights = [
  {
    icon: Sparkles,
    title: "Neural Access Fabric",
    description: "Единая нейросеть для персонализации интерфейсов доступа к исследованиям и продуктам.",
    href: "/platform/fabric"
  },
  {
    icon: ShieldCheck,
    title: "Quantum Zero Trust",
    description: "Мгновенная проверка подлинности на квантовых ключах для корпоративных и государственных клиентов.",
    href: "/platform/quantum-zero-trust"
  },
  {
    icon: Lock,
    title: "Aeterna Pass",
    description: "Единый пропуск в тестовые среды, облака и биомедицинские лаборатории Aeterna.",
    href: "/platform/pass"
  }
];

export function MegaMenu({
  open,
  sections
}: {
  open: boolean;
  sections: MegaMenuSection[];
}) {
  const columns = useMemo(() => {
    const colCount = 3;
    return sections.reduce<MegaMenuSection[][]>((acc, section, index) => {
      const columnIndex = index % colCount;
      acc[columnIndex] = acc[columnIndex] ? [...acc[columnIndex], section] : [section];
      return acc;
    }, Array.from({ length: 3 }, () => [] as MegaMenuSection[]));
  }, [sections]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 top-full z-40 mt-6 w-[min(1200px,90vw)] -translate-x-1/2 overflow-hidden rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated-primary)]/95 backdrop-blur-lg shadow-[0_40px_120px_rgba(2,133,255,0.2)]"
        >
          <div className="grid grid-cols-1 gap-12 px-12 py-10 lg:grid-cols-[2fr_1fr]">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {columns.map((column, columnIndex) => (
                <div key={`column-${columnIndex}`} className="space-y-10">
                  {column.map((section) => (
                    <div key={section.id} className="space-y-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{section.title}</p>
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">{section.description}</p>
                      </div>
                      <ul className="space-y-4">
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <Link
                              href={item.href}
                              className="group flex items-start justify-between gap-3 rounded-2xl border border-transparent bg-[var(--bg-secondary)]/30 px-4 py-3 transition-colors hover:border-[var(--border-default)] hover:bg-[var(--interactive-bg-secondary-hover)]"
                            >
                              <div>
                                <p className="font-medium text-[var(--text-primary)]">{item.title}</p>
                                <p className="mt-1 text-sm leading-relaxed text-[var(--text-tertiary)]">{item.summary}</p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {item.badge ? (
                                  <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-3 py-0.5 text-xs uppercase tracking-[0.12em] text-[var(--text-accent)]">
                                    {item.badge}
                                  </span>
                                ) : null}
                                <ChevronRight className="mt-auto h-4 w-4 text-[var(--icon-tertiary)] transition-transform group-hover:translate-x-1" />
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <aside className="flex flex-col justify-between rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated-secondary)]/80 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Доступ и безопасность</p>
                <h3 className="mt-3 font-display text-2xl text-[var(--text-primary)]">
                  Консолидированный доступ к исследовательской экосистеме Aeterna
                </h3>
              </div>
              <ul className="mt-6 space-y-5">
                {securityHighlights.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="group flex items-start gap-4 rounded-2xl border border-transparent bg-[var(--bg-secondary)]/30 p-4 transition hover:border-[var(--border-default)] hover:bg-[var(--interactive-bg-secondary-hover)]"
                    >
                      <item.icon className="mt-1 h-6 w-6 text-[var(--icon-accent)]" />
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{item.title}</p>
                        <p className="mt-1 text-sm text-[var(--text-tertiary)]">{item.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/access"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-accent-default)] px-5 py-3 text-sm font-medium text-[var(--text-accent)] transition hover:bg-[var(--interactive-bg-accent-hover)]"
              >
                Запросить доступ к закрытым программам
                <ChevronRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
