"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CircuitBoard, Globe2, Microscope, Network, ShieldHalf } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: BrainCircuit,
    title: "Интеллект",
    headline: "Генеративные и самообучающиеся модели",
    description:
      "Эволюция от адаптивных языковых агентов до когнитивных систем управления экосистемами. Atlas, Helios и Synapse AI доступны в облаке и on-premise.",
    actions: [
      { label: "Запуск Atlas", href: "/ai/atlas", accent: true },
      { label: "Документация Helios", href: "/ai/helios/docs" }
    ],
    metrics: [
      { label: "Exascale", value: "Compute" },
      { label: "Multi-Agent", value: "Collaboration" }
    ]
  },
  {
    icon: Network,
    title: "Сети",
    headline: "Квантовые и распределённые коммуникации",
    description:
      "Построение гиперустойчивых сетей для роботов, дронов и биосенсоров. Нулевой трест, деперсонализация и гибридные протоколы.",
    actions: [
      { label: "NOVA Free Proxy", href: "/network/nova-proxy", accent: true },
      { label: "EdgeGrid", href: "/network/edge-grid" }
    ],
    metrics: [
      { label: "<3ms", value: "Latency" },
      { label: "Orbital", value: "Coverage" }
    ]
  },
  {
    icon: Microscope,
    title: "Биомедицина",
    headline: "Импланты, протезы и долголетие",
    description:
      "Конвергенция биологии и цифровых систем. Нейроинтерфейсы, тканевые принтеры, программы бессмертия и регенерации.",
    actions: [
      { label: "NeuroWeave", href: "/bio/neuro-weave", accent: true },
      { label: "Vitality Labs", href: "/bio/vitality-labs" }
    ],
    metrics: [
      { label: "FDA+EU", value: "Compliance" },
      { label: "SentiMesh", value: "Feedback" }
    ]
  },
  {
    icon: CircuitBoard,
    title: "Робототехника",
    headline: "Самоорганизующиеся производственные контуры",
    description:
      "Адаптивные роботы, автономные фабрики и кибернетические лаборатории. Управление миссиями и парком устройств через Sentient Cloud.",
    actions: [
      { label: "Orbital Forge", href: "/robots/orbital-forge", accent: true },
      { label: "Synthesis Lab", href: "/robots/synthesis" }
    ],
    metrics: [
      { label: "500+", value: "Fleet" },
      { label: "99.97%", value: "Uptime" }
    ]
  },
  {
    icon: ShieldHalf,
    title: "Безопасность",
    headline: "Глобальная киберустойчивость",
    description:
      "Quantum Zero Trust, оркестрация секретов, цифровые идентичности. Ключевая опора для оборонных и корпоративных программ.",
    actions: [
      { label: "Quantum Zero Trust", href: "/security/quantum", accent: true },
      { label: "Consensus Fabric", href: "/crypto/consensus" }
    ],
    metrics: [
      { label: "PQ-ready", value: "Encryption" },
      { label: "Tier-0", value: "Recovery" }
    ]
  },
  {
    icon: Globe2,
    title: "Глобальные операции",
    headline: "Объединённые миссии и инфраструктура",
    description:
      "Единый контрольный центр над флотами дронов, биолабораториями, дата-центрами и космическими платформами.",
    actions: [
      { label: "Mission Ops", href: "/ops/mission", accent: true },
      { label: "Aeterna Pass", href: "/platform/pass" }
    ],
    metrics: [
      { label: "42", value: "Nations" },
      { label: "NeuroOps", value: "Interface" }
    ]
  }
];

export function Programs() {
  return (
    <section id="programs" className="mx-auto mt-24 max-w-[1200px] space-y-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <span className="badge">Энциклопедия направлений</span>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
            Каждый продукт Aeterna — часть взаимосвязанной архитектуры.
          </h2>
          <p className="max-w-3xl text-base text-[var(--text-secondary)]">
            Мы проектируем технологии, которые усиливают друг друга: ИИ обучает импланты, сети защищают лаборатории, а криптография обеспечивает доверие между автономными агентами.
          </p>
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-secondary-default)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--interactive-bg-secondary-hover)]"
        >
          Полный каталог
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {categories.map((category, index) => (
          <motion.article
            key={category.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="grid-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <category.icon className="h-6 w-6 text-[var(--icon-accent)]" />
                <span className="text-sm uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{category.title}</span>
              </div>
              <div className="flex gap-3 text-xs text-[var(--text-tertiary)]">
                {category.metrics.map((metric) => (
                  <span key={metric.label} className="rounded-full border border-[var(--border-light)] px-3 py-1">
                    <strong className="font-semibold text-[var(--text-accent)]">{metric.label}</strong> {metric.value}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-[var(--text-primary)]">{category.headline}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{category.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {category.actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                    action.accent
                      ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)] hover:bg-[var(--interactive-bg-accent-hover)]"
                      : "bg-[var(--interactive-bg-secondary-default)] text-[var(--text-secondary)] hover:bg-[var(--interactive-bg-secondary-hover)]"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
