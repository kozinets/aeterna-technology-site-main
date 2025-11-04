"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Beaker, Binary, RadioTower, Sparkles } from "lucide-react";
import Link from "next/link";
import type { InsightsCollection } from "@/lib/cms/types";

const ICON_MAP = {
  binary: Binary,
  "radio-tower": RadioTower,
  beaker: Beaker
} as const;

export function Insights({ collection }: { collection: InsightsCollection }) {
  const articles = collection.articles;
  const signals = collection.signals;

  return (
    <section id="insights" className="mt-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <span className="badge">Signals from the future</span>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
            Intelligence, research, and <span className="text-[var(--text-status-warning)]">missions</span> from Aeterna.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            Dive into our latest discoveries and operational briefings. From neurogenetics to cybernetic cities, Aeterna teams publish insights in real time.
          </p>
        </div>
        <Link
          href={"/insights" as any}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
          View all
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex flex-col gap-3 border-b border-[var(--border-light)] pb-6"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">#{article.tag}</span>
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">{article.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{article.description}</p>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-[var(--text-tertiary)]">
                <span>{article.readingTime}</span>
                <Link
                  href={article.href as any}
                  className="flex items-center gap-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  Read
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative flex flex-col gap-6 pl-6"
        >
          <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[var(--icon-secondary)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Live missions</span>
          </div>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            Our missions synchronize labs, orbit, and metaspaces to accelerate progress.
          </p>
          <ul className="space-y-4">
            {signals.map((signal, index) => (
              <li key={signal.title} className="relative pl-4">
                <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-light)]" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = ICON_MAP[signal.icon as keyof typeof ICON_MAP];
                    return Icon ? <Icon className="h-5 w-5 text-[var(--icon-secondary)]" /> : null;
                  })()}
                  <span
                    className={`text-sm font-semibold ${
                      index === 0
                        ? "text-[var(--text-status-warning)]"
                        : index === 2
                          ? "text-[var(--text-status-error)]"
                          : "text-[var(--text-primary)]"
                    }`}
                  >
                    {signal.title}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">{signal.description}</p>
              </li>
            ))}
          </ul>
          <Link
            href={"/missions" as any}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Active missions
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
