"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Header } from "@/components/header";
import { MissionColumn } from "@/components/mission-column";
import { StoryScroller } from "@/components/story-scroller";

type Sector = "all" | "ai" | "network" | "crypto" | "orbital" | "biotech" | "governance";

type Tone = "violet" | "teal" | "emerald" | "amber" | "blue" | "purple";

type LaunchCard = {
  id: string;
  layout: "flagship" | "upcoming" | "heritage";
  category: string;
  title: string;
  date: string;
  tone: Tone;
  sectors: Sector[];
};

type Highlight = {
  category: string;
  title: string;
  date: string;
  tone?: Tone;
  sectors: Sector[];
};

type StoryEntry = {
  category: string;
  title: string;
  date: string;
  linkLabel?: string;
  sectors: Sector[];
};

const focusAreas: { id: Sector; label: string }[] = [
  { id: "all", label: "All missions" },
  { id: "ai", label: "AI & cognition" },
  { id: "network", label: "Networks" },
  { id: "crypto", label: "Crypto" },
  { id: "orbital", label: "Orbital" },
  { id: "biotech", label: "Biotech" },
  { id: "governance", label: "Civic" }
];

const searchExamples = [
  "Calibrate Helios oversight",
  "Schedule Atlas Relay activation",
  "Audit continuum supply lines",
  "Open sovereign intelligence brief"
];

const launchCards: LaunchCard[] = [
  {
    id: "flagship-helios",
    layout: "flagship",
    category: "Flagship launch",
    title: "Helios Continuum checks in",
    date: "June 24, 2024",
    tone: "violet",
    sectors: ["all", "ai", "network", "orbital", "governance"]
  },
  {
    id: "flagship-vault",
    layout: "flagship",
    category: "Flagship launch",
    title: "Pulse Vault sentinel refresh",
    date: "June 12, 2024",
    tone: "emerald",
    sectors: ["all", "biotech", "ai"]
  },
  {
    id: "flagship-finance",
    layout: "flagship",
    category: "Flagship launch",
    title: "Continuum clearinghouse upgrade",
    date: "June 5, 2024",
    tone: "teal",
    sectors: ["all", "crypto", "network"]
  },
  {
    id: "upcoming-atlas",
    layout: "upcoming",
    category: "Next deployment",
    title: "Atlas Relay mesh rehearsal",
    date: "July 2, 2024",
    tone: "teal",
    sectors: ["all", "network", "orbital", "governance"]
  },
  {
    id: "upcoming-aegis",
    layout: "upcoming",
    category: "Next deployment",
    title: "Aegis bio-shield field trials",
    date: "July 9, 2024",
    tone: "emerald",
    sectors: ["all", "biotech", "ai"]
  },
  {
    id: "upcoming-ledger",
    layout: "upcoming",
    category: "Next deployment",
    title: "Ledger lattice compliance sync",
    date: "July 14, 2024",
    tone: "amber",
    sectors: ["all", "crypto", "governance"]
  },
  {
    id: "heritage-chronicle",
    layout: "heritage",
    category: "Heritage system",
    title: "Chronicle Loom archive sync",
    date: "May 9, 2024",
    tone: "amber",
    sectors: ["all", "ai", "governance"]
  },
  {
    id: "heritage-echelon",
    layout: "heritage",
    category: "Heritage system",
    title: "Echelon Nodes uplink audit",
    date: "April 30, 2024",
    tone: "blue",
    sectors: ["all", "network", "orbital"]
  },
  {
    id: "heritage-safeguard",
    layout: "heritage",
    category: "Heritage system",
    title: "Safeguard collective policy refresh",
    date: "April 18, 2024",
    tone: "purple",
    sectors: ["all", "governance", "crypto"]
  },
  {
    id: "heritage-biome",
    layout: "heritage",
    category: "Heritage system",
    title: "Biome stabilizer serum restock",
    date: "April 2, 2024",
    tone: "emerald",
    sectors: ["biotech", "ai", "all"]
  }
];

const newsItems: Highlight[] = [
  {
    category: "Press",
    title: "Aeterna joins Europa Accord",
    date: "June 12, 2024",
    sectors: ["all", "governance", "orbital"]
  },
  {
    category: "Regulation",
    title: "Helios Continuum clears orbital review",
    date: "June 5, 2024",
    sectors: ["all", "orbital", "governance"]
  },
  {
    category: "Partnerships",
    title: "Atlas Relay powers Pacific Climate Coalition",
    date: "May 28, 2024",
    sectors: ["all", "network", "biotech"]
  },
  {
    category: "Expansion",
    title: "Quantum campus opens in Dakar",
    date: "May 16, 2024",
    sectors: ["all", "ai", "governance"]
  },
  {
    category: "Telemetry",
    title: "Neural corridors reach 30 light-min latency",
    date: "May 3, 2024",
    sectors: ["all", "network", "ai"]
  },
  {
    category: "Academy",
    title: "Continuum governance syllabus released",
    date: "April 22, 2024",
    sectors: ["all", "governance"]
  },
  {
    category: "Finance",
    title: "Ledger lattice certified for quantum clearing",
    date: "April 16, 2024",
    sectors: ["all", "crypto", "governance"]
  },
  {
    category: "Health",
    title: "Pulse Vault expands to Selene clinics",
    date: "April 4, 2024",
    sectors: ["all", "biotech", "ai"]
  }
];

const stories: StoryEntry[] = [
  {
    category: "Terraforming",
    title: "Frontier settlements stabilize the Midnight Belt",
    date: "June 10, 2024",
    linkLabel: "View log",
    sectors: ["all", "orbital", "governance"]
  },
  {
    category: "Oceanic alliance",
    title: "Circadian Reef drones stay in sync across 12 nations",
    date: "May 29, 2024",
    linkLabel: "Open brief",
    sectors: ["all", "network", "ai"]
  },
  {
    category: "Cultural recovery",
    title: "Chronicle Loom revives the Qira ceremonial code",
    date: "May 6, 2024",
    linkLabel: "See archive",
    sectors: ["all", "ai", "governance"]
  },
  {
    category: "Lunar health",
    title: "Pulse Vault safeguards Selene clinics",
    date: "April 27, 2024",
    linkLabel: "Review report",
    sectors: ["all", "biotech", "orbital"]
  },
  {
    category: "DePIN expansion",
    title: "Mesh operators onboard 4,200 new sovereign nodes",
    date: "April 11, 2024",
    linkLabel: "Inspect",
    sectors: ["all", "crypto", "network"]
  }
];

const researchHighlights: Highlight[] = [
  {
    category: "Whitepaper",
    title: "Adaptive Ethics Mesh",
    date: "June 1, 2024",
    tone: "emerald",
    sectors: ["all", "governance", "ai"]
  },
  {
    category: "Field trial",
    title: "Exo-Cortex Biointerface",
    date: "May 21, 2024",
    tone: "purple",
    sectors: ["all", "biotech", "ai"]
  },
  {
    category: "Orbital study",
    title: "Radiation attunement arrays",
    date: "May 12, 2024",
    tone: "blue",
    sectors: ["all", "orbital", "network"]
  }
];

const businessPrograms: Highlight[] = [
  {
    category: "Industries",
    title: "Sovereign operations network",
    date: "Updated weekly",
    tone: "blue",
    sectors: ["all", "network", "governance"]
  },
  {
    category: "Enterprises",
    title: "Executive intelligence fabric",
    date: "Updated biweekly",
    tone: "amber",
    sectors: ["all", "ai", "crypto"]
  },
  {
    category: "Risk",
    title: "Strategic observatory council",
    date: "Updated monthly",
    tone: "teal",
    sectors: ["all", "governance", "orbital"]
  },
  {
    category: "Healthcare",
    title: "Continuum care exchanges",
    date: "Updated monthly",
    tone: "emerald",
    sectors: ["all", "biotech", "ai"]
  }
];

const toneStyles: Record<
  Tone,
  { background: string; shadow: string; text: string }
> = {
  violet: {
    background: "bg-[#303f9f]",
    shadow: "shadow-[0_0_60px_-30px_rgba(63,81,181,0.85)]",
    text: "text-indigo-100"
  },
  teal: {
    background: "bg-[#00695c]",
    shadow: "shadow-[0_0_60px_-30px_rgba(0,150,136,0.8)]",
    text: "text-teal-100"
  },
  emerald: {
    background: "bg-[#1b5e20]",
    shadow: "shadow-[0_0_60px_-30px_rgba(46,125,50,0.85)]",
    text: "text-emerald-100"
  },
  amber: {
    background: "bg-[#b26a00]",
    shadow: "shadow-[0_0_60px_-30px_rgba(255,143,0,0.7)]",
    text: "text-amber-100"
  },
  blue: {
    background: "bg-[#0d47a1]",
    shadow: "shadow-[0_0_60px_-30px_rgba(33,150,243,0.75)]",
    text: "text-blue-100"
  },
  purple: {
    background: "bg-[#4527a0]",
    shadow: "shadow-[0_0_60px_-30px_rgba(94,53,177,0.78)]",
    text: "text-purple-100"
  }
};

export default function Page() {
  const [activeSector, setActiveSector] = useState<Sector>("all");

  const flagshipCard = useMemo(() => {
    const candidates = launchCards.filter((card) => card.layout === "flagship");
    return (
      candidates.find((card) => matchesSector(card.sectors, activeSector)) ?? candidates[0]
    );
  }, [activeSector]);

  const upcomingCard = useMemo(() => {
    const candidates = launchCards.filter((card) => card.layout === "upcoming");
    return (
      candidates.find((card) => matchesSector(card.sectors, activeSector)) ?? candidates[0]
    );
  }, [activeSector]);

  const heritageCards = useMemo(() => {
    const candidates = launchCards.filter((card) => card.layout === "heritage");
    const filtered = candidates.filter((card) => matchesSector(card.sectors, activeSector));
    return (filtered.length ? filtered : candidates).slice(0, 3);
  }, [activeSector]);

  const filteredNews = useMemo(
    () => filterHighlights(newsItems, activeSector).slice(0, 6),
    [activeSector]
  );

  const filteredStories = useMemo(
    () => filterStories(stories, activeSector).slice(0, 5),
    [activeSector]
  );

  const filteredResearch = useMemo(
    () => filterHighlights(researchHighlights, activeSector).slice(0, 3),
    [activeSector]
  );

  const filteredPrograms = useMemo(
    () => filterHighlights(businessPrograms, activeSector).slice(0, 3),
    [activeSector]
  );

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-16 pt-10 lg:flex-row lg:items-start">
        <aside className="lg:sticky lg:top-24 lg:w-[32%] lg:self-start">
          <div className="rounded-[32px] border border-[var(--border-default)] bg-[var(--bg-primary)]/80 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.7)]">
            <MissionColumn searchExamples={searchExamples} />
          </div>
        </aside>
        <section className="flex-1">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10 rounded-[40px] bg-black/95 px-4 py-6 shadow-[0_70px_120px_-80px_rgba(0,0,0,0.9)] sm:px-8 sm:py-10 lg:px-12">
            <nav className="flex flex-wrap items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
              {focusAreas.map((area) => {
                const active = area.id === activeSector;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveSector(area.id)}
                    className={`rounded-full px-3 py-1 transition ${
                      active ? "bg-white/15 text-white" : "hover:text-white"
                    }`}
                  >
                    {area.label}
                  </button>
                );
              })}
            </nav>

            <div className="space-y-10">
              <div className="rounded-[32px] bg-white/[0.04] p-5 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.7)] sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Launch slate</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Status updated weekly</span>
                  </div>
                  <Link
                    href={"/launches" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:auto-rows-[minmax(0,1fr)]">
                  <article
                    className={`flex min-h-[220px] flex-col justify-between rounded-[24px] p-6 lg:col-span-2 lg:row-span-2 ${
                      toneStyles[flagshipCard.tone].background
                    } ${toneStyles[flagshipCard.tone].text} ${toneStyles[flagshipCard.tone].shadow}`}
                  >
                    <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{flagshipCard.category}</span>
                    <h3 className="mt-4 text-2xl font-semibold text-white">{flagshipCard.title}</h3>
                    <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{flagshipCard.date}</span>
                  </article>
                  <article
                    className={`flex min-h-[220px] flex-col justify-between rounded-[24px] p-6 ${
                      toneStyles[upcomingCard.tone].background
                    } ${toneStyles[upcomingCard.tone].text} ${toneStyles[upcomingCard.tone].shadow}`}
                  >
                    <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{upcomingCard.category}</span>
                    <h3 className="mt-4 text-xl font-semibold text-white">{upcomingCard.title}</h3>
                    <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{upcomingCard.date}</span>
                  </article>
                  {heritageCards.map((item) => (
                    <article
                      key={item.id}
                      className={`flex min-h-[200px] flex-col justify-between rounded-[24px] p-6 ${
                        toneStyles[item.tone].background
                      } ${toneStyles[item.tone].text} ${toneStyles[item.tone].shadow}`}
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                      <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                      <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] bg-white/[0.04] p-5 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.7)] sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Latest news</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">All channels</span>
                  </div>
                  <Link
                    href={"/newsroom" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                {filteredNews.length ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNews.map((item) => (
                      <article
                        key={item.title}
                        className="flex min-h-[180px] flex-col justify-between rounded-[24px] bg-[#263238] p-5 text-slate-100 shadow-[0_0_48px_-32px_rgba(38,50,56,0.9)]"
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-200/80">{item.category}</span>
                        <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                        <span className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-200/70">{item.date}</span>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-3xl bg-white/5 px-6 py-10 text-center text-sm text-white/60">
                    Mission communications for this focus area are being composed.
                  </p>
                )}
              </div>

              <div className="rounded-[32px] bg-white/[0.04] p-5 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.7)] sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Stories</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Drag to explore</span>
                  </div>
                  <Link
                    href={"/stories" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                <StoryScroller
                  stories={filteredStories.map(({ sectors: _sectors, ...story }) => story)}
                />
              </div>

              <div className="rounded-[32px] bg-white/[0.04] p-5 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.7)] sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Latest research</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Mission labs</span>
                  </div>
                  <Link
                    href={"/research" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                {filteredResearch.length ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {filteredResearch.map((item) => (
                      <article
                        key={item.title}
                        className={`flex min-h-[200px] flex-col justify-between rounded-[24px] p-6 ${
                          toneStyles[item.tone ?? "violet"].background
                        } ${toneStyles[item.tone ?? "violet"].text} ${toneStyles[item.tone ?? "violet"].shadow}`}
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                        <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-3xl bg-white/5 px-6 py-10 text-center text-sm text-white/60">
                    No research updates for this focus yet—check back soon.
                  </p>
                )}
              </div>

              <div className="rounded-[32px] bg-white/[0.04] p-5 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.7)] sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Aeterna for business</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Program suites</span>
                  </div>
                  <Link
                    href={"/programs" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                {filteredPrograms.length ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPrograms.map((item) => (
                      <article
                        key={item.title}
                        className={`flex min-h-[200px] flex-col justify-between rounded-[24px] p-6 ${
                          toneStyles[item.tone ?? "blue"].background
                        } ${toneStyles[item.tone ?? "blue"].text} ${toneStyles[item.tone ?? "blue"].shadow}`}
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                        <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-3xl bg-white/5 px-6 py-10 text-center text-sm text-white/60">
                    Select another focus area to reveal aligned business programs.
                  </p>
                )}
              </div>
            </div>

            <footer className="rounded-[32px] bg-white/[0.04] p-6 text-sm text-white/70 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.7)] sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <span>© {new Date().getFullYear()} Aeterna Technology</span>
                <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.24em] text-white/60">
                  <Link href="/privacy" className="transition hover:text-white">
                    Privacy
                  </Link>
                  <Link href="/terms" className="transition hover:text-white">
                    Terms
                  </Link>
                  <Link href="/status" className="transition hover:text-white">
                    Status
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function matchesSector(sectors: Sector[], active: Sector) {
  return active === "all" || sectors.includes(active);
}

function filterHighlights(items: Highlight[], active: Sector) {
  return items.filter((item) => matchesSector(item.sectors, active));
}

function filterStories(items: StoryEntry[], active: Sector) {
  return items.filter((item) => matchesSector(item.sectors, active));
}
