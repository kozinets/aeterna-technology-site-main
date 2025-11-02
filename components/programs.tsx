"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CircuitBoard, Globe2, Microscope, Network, ShieldHalf } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: BrainCircuit,
    title: "Intelligence",
    headline: "Generative and self-learning models",
    description:
      "From adaptive language agents to cognitive governance systems. Atlas, Helios, and Synapse AI operate across cloud and sovereign deployments.",
    actions: [
      { label: "Launch Atlas", href: "/ai/atlas", accent: true },
      { label: "Helios docs", href: "/ai/helios/docs" }
    ],
    metrics: [
      { label: "Exascale", value: "Compute", tone: "positive" as const },
      { label: "Multi-Agent", value: "Collaboration", tone: "critical" as const }
    ]
  },
  {
    icon: Network,
    title: "Networks",
    headline: "Quantum-secure and distributed communications",
    description:
      "Build hyper-resilient networks for robots, drones, and biosensors with zero trust, anonymization, and hybrid protocols.",
    actions: [
      { label: "NOVA Free Proxy", href: "/network/nova-proxy", accent: true },
      { label: "EdgeGrid", href: "/network/edge-grid" }
    ],
    metrics: [
      { label: "<3ms", value: "Latency", tone: "positive" as const },
      { label: "Orbital", value: "Coverage", tone: "positive" as const }
    ]
  },
  {
    icon: Microscope,
    title: "Biomedicine",
    headline: "Implants, prosthetics, and longevity",
    description:
      "Where biology meets code. Neural interfaces, tissue printers, immortality programs, and regenerative therapeutics.",
    actions: [
      { label: "NeuroWeave", href: "/bio/neuro-weave", accent: true },
      { label: "Vitality Labs", href: "/bio/vitality-labs" }
    ],
    metrics: [
      { label: "FDA+EU", value: "Compliance", tone: "critical" as const },
      { label: "SentiMesh", value: "Feedback", tone: "positive" as const }
    ]
  },
  {
    icon: CircuitBoard,
    title: "Robotics",
    headline: "Self-orchestrating production loops",
    description:
      "Adaptive robots, autonomous factories, and cybernetic labs managed through Sentient Cloud mission control.",
    actions: [
      { label: "Orbital Forge", href: "/robots/orbital-forge", accent: true },
      { label: "Synthesis Lab", href: "/robots/synthesis" }
    ],
    metrics: [
      { label: "500+", value: "Fleet", tone: "positive" as const },
      { label: "99.97%", value: "Uptime", tone: "positive" as const }
    ]
  },
  {
    icon: ShieldHalf,
    title: "Security",
    headline: "Global cyber resilience",
    description:
      "Quantum Zero Trust, secret orchestration, and digital identity for defense and enterprise ecosystems.",
    actions: [
      { label: "Quantum Zero Trust", href: "/security/quantum", accent: true },
      { label: "Consensus Fabric", href: "/crypto/consensus" }
    ],
    metrics: [
      { label: "PQ-ready", value: "Encryption", tone: "critical" as const },
      { label: "Tier-0", value: "Recovery", tone: "positive" as const }
    ]
  },
  {
    icon: Globe2,
    title: "Global Ops",
    headline: "Unified missions and infrastructure",
    description:
      "One control plane for drone fleets, biolabs, data centers, and orbital platforms.",
    actions: [
      { label: "Mission Ops", href: "/ops/mission", accent: true },
      { label: "Aeterna Pass", href: "/platform/pass" }
    ],
    metrics: [
      { label: "42", value: "Nations", tone: "positive" as const },
      { label: "NeuroOps", value: "Interface", tone: "critical" as const }
    ]
  }
];

export function Programs() {
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
                <category.icon className="h-6 w-6 text-[var(--icon-secondary)]" />
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
