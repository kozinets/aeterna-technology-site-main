"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const missionVerbs = ["elevate", "amplify", "stabilize", "ignite", "advance", "fortify"];

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
    title: "Continuity Initiative",
    description: "Longevity guilds combine cellular reprogramming, cryonics, and neural twins for civilization-scale memory.",
    action: "Read research",
    href: "/insights/continuity-initiative",
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

const operationsFeed = [
  {
    label: "Atlas",
    detail: "102 autonomous councils synthesizing planetary strategies.",
    tone: "positive" as const
  },
  {
    label: "NOVA",
    detail: "Proxy mesh absorbed 3.1B encrypted packets in the last hour.",
    tone: "positive" as const
  },
  {
    label: "Continuity",
    detail: "Immortality Initiative onboarded 412 longevity fellows this week.",
    tone: "critical" as const
  },
  {
    label: "Sentient Cloud",
    detail: "Orbital relays balanced 28% more bio-signal workloads overnight.",
    tone: "positive" as const
  }
];

const heroMetrics = [
  { label: "#138Labs", caption: "Operational today", tone: "positive" as const },
  { label: "#NeuroOps", caption: "Global coverage", tone: "critical" as const },
  { label: "#480Programs", caption: "Continuously updated", tone: "positive" as const }
];

const tickerItems = [
  { label: "NOVA Proxy", detail: "Latency 2.8ms", tone: "positive" as const },
  { label: "Atlas Council", detail: "42k concurrent agents", tone: "positive" as const },
  { label: "NeuroWeave", detail: "Clinical trials +18 sites", tone: "positive" as const },
  { label: "DePIN Network", detail: "Revenue split live", tone: "critical" as const },
  { label: "Sentient Cloud", detail: "Orbital relay sync", tone: "positive" as const }
];

const civicChannels = [
  "AtlasDiplomacy",
  "NeuroOps",
  "ProxyRelays",
  "BiotechGuilds",
  "OrbitalForge",
  "Continuity",
  "SovereignAccess"
];

const missionAnalytics = [
  {
    signal: "#ProxyFlux",
    value: "3.8B packets/hour",
    detail: "NOVA validators maintain deterministic handoffs across 184 regions.",
    tone: "positive" as const
  },
  {
    signal: "#Continuity",
    value: "412 immortality fellows",
    detail: "Longevity guilds complete synthesis cycles without containment drift.",
    tone: "critical" as const
  },
  {
    signal: "#AtlasCommand",
    value: "102 autonomous councils",
    detail: "Mission planners resolved 1,204 scenarios in the last 90 minutes.",
    tone: "positive" as const
  },
  {
    signal: "#EdgeGrid",
    value: "42 deterministic cities",
    detail: "Quantum-secure corridors sustain 99.999% uptime for robotics fleets.",
    tone: "positive" as const
  },
  {
    signal: "#GeneForge",
    value: "98 regenerative trials",
    detail: "Vitality Labs cycles cellular reprogramming with adaptive immune mirrors.",
    tone: "critical" as const
  },
  {
    signal: "#OrbitalForge",
    value: "28 manufacturing arrays",
    detail: "Orbital Forge fabricates implants and satellites with autonomous QA loops.",
    tone: "positive" as const
  }
];

export function Hero() {
  const [verbIndex, setVerbIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [threadIndex, setThreadIndex] = useState(0);
  const [operationsIndex, setOperationsIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    const verbTimer = setInterval(() => setVerbIndex((index) => (index + 1) % missionVerbs.length), 2600);
    const placeholderTimer = setInterval(
      () => setPlaceholderIndex((index) => (index + 1) % searchExamples.length),
      3200
    );
    const threadTimer = setInterval(() => setThreadIndex((index) => (index + 1) % missionThreads.length), 4200);
    const operationsTimer = setInterval(() => setOperationsIndex((index) => (index + 1) % operationsFeed.length), 3600);
    const storyTimer = setInterval(() => setStoryIndex((index) => (index + 1) % featureStories.length), 5200);

    return () => {
      clearInterval(verbTimer);
      clearInterval(placeholderTimer);
      clearInterval(threadTimer);
      clearInterval(operationsTimer);
      clearInterval(storyTimer);
    };
  }, []);

  const activeThread = useMemo(() => missionThreads[threadIndex], [threadIndex]);
  const activeVerb = missionVerbs[verbIndex];
  const activePlaceholder = searchExamples[placeholderIndex];
  const activeOperations = useMemo(() => operationsFeed[operationsIndex], [operationsIndex]);
  const activeStory = featureStories[storyIndex];

  const duplicatedTicker = useMemo(() => [...tickerItems, ...tickerItems], []);

  const advanceStory = (direction: 1 | -1) => {
    setStoryIndex((current) => {
      const nextIndex = (current + direction + featureStories.length) % featureStories.length;
      return nextIndex;
    });
  };

  return (
    <section className="flex flex-col gap-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)_minmax(0,0.85fr)]"
      >
        <div className="flex flex-col gap-9">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              <Sparkles className="h-4 w-4 text-[var(--icon-secondary)]" />
              Corporate intelligence
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-6xl">
              What mission can Aeterna
              <span className="relative ml-2 inline-flex items-center align-middle">
                <motion.span
                  layout
                  className="inline-flex min-w-[8ch] items-center justify-center overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--interactive-bg-tertiary-default)] px-2 py-1 text-[var(--text-status-warning)]"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeVerb}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28 }}
                      className="whitespace-nowrap"
                    >
                      {activeVerb}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
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
                className="min-w-[260px] flex-1 bg-transparent text-base text-[var(--text-secondary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
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
        <div className="flex flex-col gap-9">
          <div className="relative pl-5">
            <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Operational signals</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOperations.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="mt-3 min-h-[6.5rem] space-y-1"
              >
                <p
                  className={`text-sm font-semibold ${
                    activeOperations.tone === "critical"
                      ? "text-[var(--text-status-error)]"
                      : "text-[var(--text-status-warning)]"
                  }`}
                >
                  #{activeOperations.label}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">{activeOperations.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {missionAnalytics.map((item) => (
              <motion.div
                key={item.signal}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35 }}
                className="relative flex flex-col gap-1 overflow-hidden pl-4"
              >
                <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-light)]" aria-hidden="true" />
                <span
                  className={`text-[10px] uppercase tracking-[0.24em] ${
                    item.tone === "critical"
                      ? "text-[var(--text-status-error)]"
                      : "text-[var(--text-status-warning)]"
                  }`}
                >
                  {item.signal}
                </span>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</p>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{item.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="relative pl-5">
            <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-light)]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Civic channels</span>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
              {civicChannels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-secondary)]"
                >
                  #{channel}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="relative pl-6">
            <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
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
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden"
                  }}
                >
                  {activeThread.title}
                </p>
                <p
                  className="text-sm text-[var(--text-secondary)]"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden"
                  }}
                >
                  {activeThread.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Mission stories</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => advanceStory(-1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  aria-label="Previous mission story"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => advanceStory(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  aria-label="Next mission story"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeStory.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex min-h-[220px] flex-col gap-3 pl-5"
                >
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-light)]" aria-hidden="true" />
                  <span
                    className={`text-[10px] uppercase tracking-[0.28em] ${
                      activeStory.tone === "positive"
                        ? "text-[var(--text-status-warning)]"
                        : activeStory.tone === "critical"
                          ? "text-[var(--text-status-error)]"
                          : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {activeStory.tag}
                  </span>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">{activeStory.title}</h2>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{activeStory.description}</p>
                  <Link
                    href={activeStory.href as any}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {activeStory.action}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
          <div className="relative flex flex-col gap-3 pl-6">
            <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
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
