"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const missionVerbs = ["accelerate", "stabilize", "shield", "elevate", "amplify", "propel"];

const searchExamples = [
  "Atlas agents drafting orbital cities",
  "Request NOVA Proxy credentials",
  "NeuroWeave immortality trials",
  "DePIN orchestration network briefs",
  "Strategic alliance onboarding",
  "Quantum Zero Trust status"
];

const featureStories = [
  {
    tag: "Launch",
    title: "Continuum Mission Control",
    description:
      "Synchronize AI models, robotics fleets, implants, and data infrastructure through one orchestrated console.",
    action: "Review mission brief",
    href: "/missions/continuum",
    tone: "positive" as const
  },
  {
    tag: "Update",
    title: "Sentient Cloud v5",
    description: "Planetary-scale compute fabric with autonomous failover, sovereign regions, and orbital relays.",
    action: "See capabilities",
    href: "/platform/sentient-cloud"
  },
  {
    tag: "Insight",
    title: "NeuroWeave immortality",
    description: "Clinical-stage implants preserving consciousness continuity with regenerative support.",
    action: "Read research",
    href: "/insights/neurobionic-immortality",
    tone: "critical" as const
  }
];

const missionThreads = [
  {
    title: "Atlas agents draft orbital biosphere",
    detail: "Autonomous teams design regenerative orbital habitats with real-time compliance streams.",
    tone: "positive" as const
  },
  {
    title: "EdgeGrid expands to 42 cities",
    detail: "Deterministic edge compute powers sovereign corridors across three continents.",
    tone: "positive" as const
  },
  {
    title: "Aeterna Pass v3",
    detail: "Unified biometric credentials secure AI, biotech, and security facilities globally.",
    tone: "critical" as const
  }
];

const heroMetrics = [
  { label: "138 labs", caption: "Operational today", tone: "positive" as const },
  { label: "24/7 neuro-ops", caption: "Global coverage", tone: "critical" as const },
  { label: ">480 products", caption: "Continuously updated", tone: "positive" as const }
];

const tickerItems = [
  { label: "NOVA Proxy", detail: "Latency 2.8ms", tone: "positive" as const },
  { label: "Atlas Council", detail: "42k concurrent agents", tone: "positive" as const },
  { label: "NeuroWeave", detail: "Clinical trials +18 sites", tone: "positive" as const },
  { label: "DePIN Network", detail: "Revenue split live", tone: "critical" as const },
  { label: "Sentient Cloud", detail: "Orbital relay sync", tone: "positive" as const }
];

export function Hero() {
  const [verbIndex, setVerbIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [threadIndex, setThreadIndex] = useState(0);

  useEffect(() => {
    const verbTimer = setInterval(() => setVerbIndex((index) => (index + 1) % missionVerbs.length), 2600);
    const placeholderTimer = setInterval(
      () => setPlaceholderIndex((index) => (index + 1) % searchExamples.length),
      3200
    );
    const threadTimer = setInterval(() => setThreadIndex((index) => (index + 1) % missionThreads.length), 4200);

    return () => {
      clearInterval(verbTimer);
      clearInterval(placeholderTimer);
      clearInterval(threadTimer);
    };
  }, []);

  const activeThread = useMemo(() => missionThreads[threadIndex], [threadIndex]);
  const activeVerb = missionVerbs[verbIndex];
  const activePlaceholder = searchExamples[placeholderIndex];

  const duplicatedTicker = useMemo(() => [...tickerItems, ...tickerItems], []);

  return (
    <section className="mx-auto flex w-full max-w-[1400px] flex-col gap-14 px-2 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-12 lg:grid-cols-[1.25fr_1fr]"
      >
        <div className="flex flex-col gap-8">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              <Sparkles className="h-4 w-4 text-[var(--icon-secondary)]" />
              Corporate intelligence
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-6xl">
              What mission can Aeterna
              <span className="relative ml-3 inline-flex min-w-[10rem] items-center justify-start">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={activeVerb}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                    className="text-[var(--text-status-warning)]"
                  >
                    {activeVerb}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-[var(--text-status-error)]"> your civilization?</span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
              Aeterna Technology integrates artificial intelligence, neuroengineering, cryptography, robotics, and orbital systems
              into one continuous corporate infrastructure. Every facility operates inside a transparent, mission-driven fabric.
            </p>
          </div>
          <div className="space-y-6">
            <form
              className="flex flex-wrap items-center gap-4 border-b border-[var(--border-default)] pb-4 text-sm text-[var(--text-tertiary)]"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="search"
                placeholder={activePlaceholder}
                className="min-w-[220px] flex-1 bg-transparent text-base text-[var(--text-secondary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
                aria-label="Search products, labs, missions, or briefs"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Launch query
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="grid gap-6 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="border-l-2 border-[var(--border-default)] pl-4"
                >
                  <p
                    className={`text-lg font-semibold ${
                      metric.tone === "positive"
                        ? "text-[var(--text-status-warning)]"
                        : metric.tone === "critical"
                          ? "text-[var(--text-status-error)]"
                          : "text-[var(--text-primary)]"
                    }`}
                  >
                    {metric.label}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">{metric.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="border-l border-[var(--border-default)] pl-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Live mission thread</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeThread.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mt-4 space-y-2"
              >
                <p
                  className={`text-lg font-semibold ${
                    activeThread.tone === "positive"
                      ? "text-[var(--text-status-warning)]"
                      : "text-[var(--text-status-error)]"
                  }`}
                >
                  {activeThread.title}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">{activeThread.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-5">
            {featureStories.map((story, index) => (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="border-b border-[var(--border-light)] pb-5"
              >
                <span
                  className={`text-[10px] uppercase tracking-[0.28em] ${
                    story.tone === "positive"
                      ? "text-[var(--text-status-warning)]"
                      : story.tone === "critical"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {story.tag}
                </span>
                <h2 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{story.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{story.description}</p>
                <Link
                  href={story.href as any}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  {story.action}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
          <div className="space-y-4 border border-[var(--border-default)] px-5 py-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <Shield className="h-4 w-4 text-[var(--icon-secondary)]" />
              Security posture
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Quantum Zero Trust governs every facility with biometric authorization, behavioral analytics, and continuous audit streams.
            </p>
          </div>
        </div>
      </motion.div>
      <div className="overflow-hidden border-y border-[var(--border-default)] py-4">
        <motion.div
          className="flex min-w-full items-center gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 36, repeat: Infinity }}
        >
          {duplicatedTicker.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
              <span
                className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                  item.tone === "critical" ? "text-[var(--text-status-error)]" : "text-[var(--text-status-warning)]"
                }`}
              >
                {item.label}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">{item.detail}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
