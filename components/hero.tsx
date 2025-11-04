"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const missionVerbs = ["elevate", "advance", "empower", "enhance"];

const searchExamples = [
  "Atlas agents drafting orbital cities",
  "Request NOVA Proxy credentials",
  "NeuroWeave immortality trials",
  "DePIN orchestration network briefs",
  "Strategic alliance onboarding",
  "Quantum Zero Trust status"
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
    href: "/platform/sentient-cloud",
    tone: "positive" as const
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

const operationsFeed = [
  {
    label: "#AtlasCommand",
    detail: "102 autonomous councils synthesizing planetary strategies.",
    tone: "positive" as const
  },
  {
    label: "#NOVAProxy",
    detail: "Proxy mesh absorbed 3.1B encrypted packets in the last hour.",
    tone: "positive" as const
  },
  {
    label: "#Continuity",
    detail: "Immortality Initiative onboarded 412 longevity fellows this week.",
    tone: "critical" as const
  },
  {
    label: "#SentientCloud",
    detail: "Orbital relays balanced 28% more bio-signal workloads overnight.",
    tone: "positive" as const
  }
];

const releaseFeed = [
  {
    id: "nova",
    tag: "#Launch",
    title: "NOVA Proxy global release",
    summary: "Adaptive relay fabric with community node economics and encrypted ingress for every mission tier.",
    time: "Pinned release",
    href: "/network/nova-proxy",
    pinned: true
  },
  {
    id: "continuity",
    tag: "#Research",
    title: "Immortality fellows briefing",
    summary: "Continuity Initiative outlines new neural twin validation framework for orbital colonies.",
    time: "3 hours ago",
    href: "/research/continuity"
  },
  {
    id: "sentient",
    tag: "#Update",
    title: "Sentient Cloud sovereign rollout",
    summary: "EdgeGrid partnerships extend deterministic compute corridors across 12 new regions.",
    time: "6 hours ago",
    href: "/platform/sentient-cloud"
  }
];

const knowledgeFeed = [
  {
    id: "biotech",
    tag: "#BioForge",
    title: "Orbital Forge regenerative trials",
    time: "12 hours ago",
    href: "/bio/vitality-labs"
  },
  {
    id: "robotics",
    tag: "#Robotics",
    title: "Atlas mechs finish lunar drilling mission",
    time: "18 hours ago",
    href: "/robotics/lunar"
  },
  {
    id: "security",
    tag: "#Security",
    title: "Quantum Zero Trust patch 7 deployed",
    time: "1 day ago",
    href: "/security/qzt"
  },
  {
    id: "finance",
    tag: "#AeternaPay",
    title: "Treasury automation hits 9.8T credits settled",
    time: "2 days ago",
    href: "/crypto/aeterna-pay"
  }
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
    signal: "#EdgeGrid",
    value: "42 deterministic cities",
    detail: "Quantum-secure corridors sustain 99.999% uptime for robotics fleets.",
    tone: "positive" as const
  },
  {
    signal: "#OrbitalForge",
    value: "28 manufacturing arrays",
    detail: "Orbital Forge fabricates implants and satellites with autonomous QA loops.",
    tone: "positive" as const
  },
  {
    signal: "#GeneForge",
    value: "98 regenerative trials",
    detail: "Vitality Labs cycles cellular reprogramming with adaptive immune mirrors.",
    tone: "critical" as const
  },
  {
    signal: "#NeuroOps",
    value: "Latency 1.1ms",
    detail: "Brain-computer interfaces synchronize with Sentient Cloud neural exchange.",
    tone: "positive" as const
  }
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
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    const verbTimer = setInterval(() => setVerbIndex((index) => (index + 1) % missionVerbs.length), 2800);
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

  const activeVerb = missionVerbs[verbIndex];
  const activePlaceholder = searchExamples[placeholderIndex];
  const activeThread = useMemo(() => missionThreads[threadIndex], [threadIndex]);
  const activeStory = featureStories[storyIndex];
  const pinnedRelease = releaseFeed.find((item) => item.pinned);
  const remainingReleases = releaseFeed.filter((item) => !item.pinned);
  const duplicatedTicker = useMemo(() => [...tickerItems, ...tickerItems], []);

  const advanceStory = (direction: 1 | -1) => {
    setStoryIndex((current) => {
      const nextIndex = (current + direction + featureStories.length) % featureStories.length;
      return nextIndex;
    });
  };

  return (
    <section className="flex flex-col gap-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,0.95fr)]"
      >
        <div className="flex flex-col gap-10">
          <div className="space-y-6">
            <span className="badge">Corporate intelligence</span>
            <h1 className="text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">
              What mission can Aeterna
              <span className="relative ml-3 inline-flex min-w-[8ch] justify-center overflow-hidden text-[var(--text-status-warning)]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeVerb}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.36 }}
                    className="inline-flex"
                  >
                    {activeVerb}
                  </motion.span>
                </AnimatePresence>
              </span>
              your civilization?
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
              Aeterna Technology integrates artificial intelligence, neuroengineering, cryptography, robotics, and orbital systems
              into one continuous corporate infrastructure. Every facility operates inside a transparent, mission-guided fabric.
            </p>
            <div className="relative flex items-center">
              <input
                className="w-full rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] px-6 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--text-status-warning)]"
                placeholder={activePlaceholder}
              />
              <ArrowRight className="absolute right-4 h-5 w-5 text-[var(--icon-secondary)]" />
            </div>
          </div>
          {pinnedRelease ? (
            <div className="space-y-4 border border-[var(--border-default)] px-6 py-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-status-warning)]">
                  {pinnedRelease.tag}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  {pinnedRelease.time}
                </span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{pinnedRelease.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{pinnedRelease.summary}</p>
              </div>
              <Link
                href={pinnedRelease.href as any}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-status-warning)] transition hover:text-[var(--text-primary)]"
              >
                Explore NOVA launch detail
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2">
            {remainingReleases.map((release) => (
              <Link
                key={release.id}
                href={release.href as any}
                className="group flex flex-col gap-2 border border-[var(--border-light)] p-4 transition hover:border-[var(--border-default)]"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{release.tag}</span>
                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-status-warning)]">
                  {release.title}
                </p>
                <p
                  className="text-xs text-[var(--text-secondary)]"
                  style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                >
                  {release.summary}
                </p>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{release.time}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="space-y-4 border border-[var(--border-default)] px-6 py-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Live mission thread</span>
              <span>Real-time</span>
            </div>
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeThread.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <p
                    className={`min-h-[52px] text-lg font-semibold ${
                      activeThread.tone === "critical"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-status-warning)]"
                    }`}
                  >
                    {activeThread.title}
                  </p>
                  <p className="min-h-[60px] text-sm text-[var(--text-secondary)]">{activeThread.detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setThreadIndex((index) => (index - 1 + missionThreads.length) % missionThreads.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                aria-label="Previous mission"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setThreadIndex((index) => (index + 1) % missionThreads.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                aria-label="Next mission"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-4 border border-[var(--border-default)] px-6 py-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Mission stories</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => advanceStory(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => advanceStory(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                  aria-label="Next story"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                    activeStory.tone === "critical"
                      ? "text-[var(--text-status-error)]"
                      : "text-[var(--text-status-warning)]"
                  }`}
                >
                  #{activeStory.tag.toLowerCase()}
                </span>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">{activeStory.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{activeStory.description}</p>
                <Link
                  href={activeStory.href as any}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-status-warning)] transition hover:text-[var(--text-primary)]"
                >
                  {activeStory.action}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {operationsFeed.map((operation) => (
              <div key={operation.label} className="flex min-h-[110px] flex-col justify-between border border-[var(--border-light)] p-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{operation.label}</span>
                <p
                  className={`text-sm font-semibold ${
                    operation.tone === "critical"
                      ? "text-[var(--text-status-error)]"
                      : "text-[var(--text-status-warning)]"
                  }`}
                >
                  {operation.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="space-y-4 border border-[var(--border-default)] px-6 py-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Latest intelligence</span>
              <Link
                href={"/insights" as any}
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-status-warning)]"
              >
                View archive
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="space-y-3">
              {knowledgeFeed.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href as any}
                    className="group flex items-center justify-between gap-4 border-b border-[var(--border-light)] pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{item.tag}</span>
                      <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-status-warning)]">
                        {item.title}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.time}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Mission telemetry</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Updated live</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {missionAnalytics.map((metric) => (
                <div
                  key={metric.signal}
                  className="flex min-h-[120px] flex-col justify-between border border-[var(--border-light)] p-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{metric.signal}</span>
                  <p
                    className={`text-sm font-semibold ${
                      metric.tone === "critical"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-status-warning)]"
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative overflow-hidden border border-[var(--border-default)]"
      >
        <motion.div
          className="flex min-w-full gap-10 py-4"
          animate={{ x: [0, -400] }}
          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
        >
          {duplicatedTicker.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex min-w-[220px] items-center gap-3 px-6">
              <Dot
                className={`h-5 w-5 ${
                  item.tone === "critical"
                    ? "text-[var(--text-status-error)]"
                    : "text-[var(--text-status-warning)]"
                }`}
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{item.label}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{item.detail}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
