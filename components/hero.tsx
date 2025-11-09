"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { HeroCollection } from "@/lib/cms/types";

export function Hero({ content }: { content: HeroCollection }) {
  const missionVerbs = content.verbs.length ? content.verbs : ["elevate"];
  const searchExamples = content.searchExamples.length
    ? content.searchExamples
    : ["Explore the Aeterna ecosystem"];
  const missionThreads = content.missionThreads;
  const featureStories = content.featureStories;
  const operationsFeed = content.operationsFeed;
  const releaseFeed = content.releaseFeed;
  const knowledgeFeed = content.knowledgeFeed;
  const missionAnalytics = content.missionAnalytics;
  const tickerItems = content.tickerItems;

  const [verbIndex, setVerbIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [threadIndex, setThreadIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    if (missionVerbs.length > 1) {
      const verbTimer = setInterval(() => setVerbIndex((index) => (index + 1) % missionVerbs.length), 2800);
      return () => clearInterval(verbTimer);
    }
  }, [missionVerbs]);

  useEffect(() => {
    if (searchExamples.length > 1) {
      const placeholderTimer = setInterval(
        () => setPlaceholderIndex((index) => (index + 1) % searchExamples.length),
        3200
      );
      return () => clearInterval(placeholderTimer);
    }
  }, [searchExamples]);

  useEffect(() => {
    if (missionThreads.length > 1) {
      const threadTimer = setInterval(
        () => setThreadIndex((index) => (index + 1) % missionThreads.length),
        4200
      );
      return () => clearInterval(threadTimer);
    }
  }, [missionThreads]);

  const activeVerb = missionVerbs[verbIndex % missionVerbs.length];
  const activePlaceholder = searchExamples[placeholderIndex % searchExamples.length];
  const activeThread = useMemo(
    () => (missionThreads.length ? missionThreads[threadIndex % missionThreads.length] : null),
    [missionThreads, threadIndex]
  );
  const activeStory = featureStories.length ? featureStories[storyIndex % featureStories.length] : null;
  const pinnedRelease = releaseFeed.find((item) => item.pinned);
  const remainingReleases = releaseFeed.filter((item) => !item.pinned);
  const duplicatedTicker = useMemo(
    () => (tickerItems.length ? [...tickerItems, ...tickerItems] : []),
    [tickerItems]
  );

  const advanceStory = (direction: 1 | -1) => {
    if (!featureStories.length) return;
    setStoryIndex((current) => {
      const nextIndex = (current + direction + featureStories.length) % featureStories.length;
      return nextIndex;
    });
  };

  const goToPreviousThread = () => {
    if (!missionThreads.length) return;
    setThreadIndex((index) => (index - 1 + missionThreads.length) % missionThreads.length);
  };

  const goToNextThread = () => {
    if (!missionThreads.length) return;
    setThreadIndex((index) => (index + 1) % missionThreads.length);
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
                  {activeThread ? (
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
                  ) : null}
                </AnimatePresence>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={goToPreviousThread}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                  aria-label="Previous mission"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextThread}
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
            {activeStory ? (
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
            ) : (
              <div className="space-y-3 text-sm text-[var(--text-tertiary)]">
                <p>Mission stories will populate once intelligence briefs are published.</p>
              </div>
            )}
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
      {duplicatedTicker.length ? (
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
      ) : null}
    </section>
  );
}
