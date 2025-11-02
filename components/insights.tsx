"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Beaker, Binary, RadioTower, Sparkles } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    tag: "Research",
    title: "Нейробионический протокол бессмертия",
    description:
      "Интеграция иммерсивных имплантов NeuroWeave с регенеративными матрицами для непрерывной синхронизации сознания.",
    readingTime: "12 мин",
    href: "/insights/neurobionic-immortality"
  },
  {
    tag: "AI",
    title: "Atlas 5.0: агенты-архитекторы",
    description:
      "Новая версия Atlas обучает автономные команды, планирующие орбитальные миссии и развитие городов для биоинженерии.",
    readingTime: "8 мин",
    href: "/insights/atlas-agents"
  },
  {
    tag: "Crypto",
    title: "DePIN Orchestration Network",
    description:
      "Управление физическими сетями от дронов до энергетики с криптографическим распределением доходов и композитными DAO.",
    readingTime: "9 мин",
    href: "/insights/depin"
  }
];

const signals = [
  {
    icon: Binary,
    title: "Neuro-Sat Grid",
    description: "Орбитальная сеть для мгновенной передачи данных имплантов и дронов без наземных узлов."
  },
  {
    icon: RadioTower,
    title: "Synthesis Fields",
    description: "Городские площадки с роботизированными биореакторами и автономной логистикой."
  },
  {
    icon: Beaker,
    title: "Immortality Trials",
    description: "Долгосрочные исследования перепрограммирования клеток и цифровой памяти."
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
              Аналитика, исследования и миссии Aeterna.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Погрузитесь в новейшие открытия и операционные отчёты. От нейрогенетики до кибернетических городов, наши команды публикуют результаты в режиме реального времени.
            </p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-secondary-default)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--interactive-bg-secondary-hover)]"
          >
            Все материалы
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
                className="flex flex-col rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/60 p-6"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{article.tag}</span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{article.description}</p>
                <div className="mt-auto flex items-center justify-between pt-6 text-xs text-[var(--text-tertiary)]">
                  <span>{article.readingTime}</span>
                  <Link href={article.href} className="flex items-center gap-2 text-[var(--text-accent)]">
                    Читать
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
            className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated-secondary)]/80 p-8"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[var(--icon-accent)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Live missions</span>
            </div>
            <p className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
              Наши миссии синхронизируют лаборатории, орбиту и метапространства для ускорения прогресса.
            </p>
            <ul className="mt-6 space-y-5">
              {signals.map((signal) => (
                <li key={signal.title} className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-tertiary)]/40 p-4">
                  <div className="flex items-center gap-3">
                    <signal.icon className="h-5 w-5 text-[var(--icon-accent)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{signal.title}</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--text-tertiary)]">{signal.description}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/missions"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-accent)]"
            >
              Действующие миссии
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
