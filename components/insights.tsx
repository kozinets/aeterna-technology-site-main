"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Beaker, Binary, RadioTower, Sparkles } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    tag: "Research",
    title: "Neurobionic Immortality Protocol",
    description:
      "Immersive NeuroWeave implants synchronized with regenerative matrices to preserve consciousness continuity.",
    readingTime: "12 min",
    href: "/insights/neurobionic-immortality"
  },
  {
    tag: "AI",
    title: "Atlas 5.0: Architect Agents",
    description:
      "The latest Atlas release trains autonomous teams to plan orbital missions and bioengineered cities.",
    readingTime: "8 min",
    href: "/insights/atlas-agents"
  },
  {
    tag: "Crypto",
    title: "DePIN Orchestration Network",
    description:
      "Govern physical networks from drones to energy grids with cryptographic revenue sharing and composite DAOs.",
    readingTime: "9 min",
    href: "/insights/depin"
  }
];

const signals = [
  {
    icon: Binary,
    title: "Neuro-Sat Grid",
    description: "Orbital relays delivering instantaneous data for implants and drones without ground latency."
  },
  {
    icon: RadioTower,
    title: "Synthesis Fields",
    description: "Urban sites with robotic bioreactors and autonomous logistics corridors."
  },
  {
    icon: Beaker,
    title: "Immortality Trials",
    description: "Long-horizon studies in cellular reprogramming and digital memory fidelity."
  }
];

export function Insights() {
  return (
    <section id="insights" className="mx-auto mt-28 max-w-[1200px]">
      <div className="section-shell px-10 py-12">
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
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <hr className="gradient-divider my-10" />
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex flex-col rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)] p-6"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{article.tag}</span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{article.description}</p>
                <div className="mt-auto flex items-center justify-between pt-6 text-xs text-[var(--text-tertiary)]">
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
            className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated-secondary)] p-8"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[var(--icon-secondary)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Live missions</span>
            </div>
            <p className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
              Our missions synchronize labs, orbit, and metaspaces to accelerate progress.
            </p>
            <ul className="mt-6 space-y-5">
              {signals.map((signal, index) => (
                <li key={signal.title} className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-tertiary)] p-4">
                  <div className="flex items-center gap-3">
                    <signal.icon className="h-5 w-5 text-[var(--icon-secondary)]" />
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
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              Active missions
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
