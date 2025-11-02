"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, Sparkles } from "lucide-react";

const featureStories = [
  {
    tag: "Launch",
    title: "Introducing Continuum Mission Control",
    description:
      "Synchronize AI models, robotics fleets, implants, and data infrastructure through one orchestrated console.",
    action: "Review mission brief",
    href: "/missions/continuum"
  },
  {
    tag: "Update",
    title: "Sentient Cloud 5 now live",
    description: "Planetary-scale compute fabric with autonomous failover, sovereign regions, and orbital relays.",
    action: "See capabilities",
    href: "/platform/sentient-cloud"
  },
  {
    tag: "Insight",
    title: "NeuroWeave immortality trials",
    description: "Clinical-stage implants preserving consciousness continuity with regenerative support.",
    action: "Read research",
    href: "/insights/neurobionic-immortality"
  }
];

const missionThreads = [
  {
    title: "Atlas agents draft orbital biosphere",
    detail: "Multi-agent teams design autonomous orbital habitats with regenerative loops." 
  },
  {
    title: "EdgeGrid expands to 42 cities",
    detail: "Deterministic edge compute arrives in new sovereign corridors across three continents." 
  },
  {
    title: "Aeterna Pass v3",
    detail: "Unified biometric credential for accessing AI, biotech, and security facilities." 
  }
];

export function Hero() {
  return (
    <section className="mx-auto mt-6 flex max-w-[1200px] flex-col gap-12 rounded-[48px] border border-[var(--border-default)] bg-[var(--bg-elevated-primary)]/90 px-10 pb-16 pt-14 shadow-[0_32px_140px_rgba(0,0,0,0.45)]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-12 lg:grid-cols-[1.2fr_1fr]"
      >
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <span className="badge">Corporate intelligence</span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl">
              What mission can Aeterna accelerate for your civilization?
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Aeterna Technology integrates artificial intelligence, neuroengineering, cryptography, robotics, and orbital systems to create one continuous corporate infrastructure. Everything is synchronized, audited, and mission-driven.
            </p>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-6 py-4 text-sm text-[var(--text-tertiary)]">
              <span>Search products, labs, missions, or briefs</span>
              <ArrowRight className="h-4 w-4" />
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              {["138 labs", "24/7 neuro-ops", ">480 products"].map((metric) => (
                <div key={metric} className="rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/80 px-4 py-4">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{metric}</p>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">Active today</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {featureStories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col gap-3 rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/85 p-6"
            >
              <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-tertiary)]">{story.tag}</span>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">{story.title}</h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{story.description}</p>
              <a
                href={story.href}
                className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                {story.action}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="grid gap-6 md:grid-cols-[1.4fr_1fr]"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          className="flex flex-col gap-4 rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/85 p-8"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[var(--icon-secondary)]" />
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Active threads</span>
          </div>
          <ul className="space-y-4">
            {missionThreads.map((thread) => (
              <li key={thread.title} className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-tertiary)]/60 p-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{thread.title}</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">{thread.detail}</p>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          className="flex flex-col justify-between gap-6 rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/85 p-8"
        >
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Security posture</span>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Quantum Zero Trust across every facility.</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Biometric, cryptographic, and behavioral defenses converge in the Aeterna Pass—governing autonomous labs and national partners.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-[var(--text-tertiary)]">
            {["Post-quantum", "Zero trust", "Neural biometrics", "Continuous audit"].map((label) => (
              <span key={label} className="rounded-full border border-[var(--border-default)] px-3 py-1">
                {label}
              </span>
            ))}
          </div>
          <a
            href="#access"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-accent-default)] px-5 py-3 text-sm font-medium text-[var(--text-inverted)] transition hover:bg-[var(--interactive-bg-accent-hover)]"
          >
            Request authorization
            <Shield className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
