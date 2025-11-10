"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ChevronDown, Globe2, MapPin } from "lucide-react";
import { Header } from "@/components/header";
import { MissionColumn } from "@/components/mission-column";
import { StoryScroller } from "@/components/story-scroller";

type Sector = "all" | "ai" | "network" | "crypto" | "orbital" | "biotech" | "governance";

type Tone = "violet" | "teal" | "emerald" | "amber" | "blue" | "purple";

type LaunchCard = {
  id: string;
  tier: "primary" | "companion";
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
    tier: "primary",
    category: "Flagship launch",
    title: "Helios Continuum checks in",
    date: "June 24, 2024",
    tone: "violet",
    sectors: ["all", "ai", "network", "orbital", "governance", "biotech", "crypto"]
  },
  {
    id: "upcoming-atlas",
    tier: "companion",
    category: "Next deployment",
    title: "Atlas Relay mesh rehearsal",
    date: "July 2, 2024",
    tone: "teal",
    sectors: ["all", "network", "orbital", "governance", "ai"]
  },
  {
    id: "heritage-chronicle",
    tier: "companion",
    category: "Heritage system",
    title: "Chronicle Loom archive sync",
    date: "May 9, 2024",
    tone: "amber",
    sectors: ["all", "ai", "governance", "biotech", "crypto"]
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
    sectors: ["all", "orbital", "governance"]
  },
  {
    category: "Oceanic alliance",
    title: "Circadian Reef drones stay in sync across 12 nations",
    date: "May 29, 2024",
    sectors: ["all", "network", "ai"]
  },
  {
    category: "Cultural recovery",
    title: "Chronicle Loom revives the Qira ceremonial code",
    date: "May 6, 2024",
    sectors: ["all", "ai", "governance"]
  },
  {
    category: "Lunar health",
    title: "Pulse Vault safeguards Selene clinics",
    date: "April 27, 2024",
    sectors: ["all", "biotech", "orbital"]
  },
  {
    category: "DePIN expansion",
    title: "Mesh operators onboard 4,200 new sovereign nodes",
    date: "April 11, 2024",
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
    date: "June 2024",
    tone: "blue",
    sectors: ["all", "network", "governance"]
  },
  {
    category: "Enterprises",
    title: "Executive intelligence fabric",
    date: "May 2024",
    tone: "amber",
    sectors: ["all", "ai", "crypto"]
  },
  {
    category: "Risk",
    title: "Strategic observatory council",
    date: "April 2024",
    tone: "teal",
    sectors: ["all", "governance", "orbital"]
  },
  {
    category: "Healthcare",
    title: "Continuum care exchanges",
    date: "April 2024",
    tone: "emerald",
    sectors: ["all", "biotech", "ai"]
  }
];

const footerNavigation = [
  {
    title: "Products",
    links: [
      { label: "Helios Continuum", href: "/products/helios" },
      { label: "Atlas Relay", href: "/products/atlas" },
      { label: "Pulse Vault", href: "/products/pulse" },
      { label: "Chronicle Loom", href: "/products/chronicle" },
      { label: "Continuum Ledger", href: "/products/ledger" },
      { label: "Aegis Shield", href: "/products/aegis" }
    ]
  },
  {
    title: "Solutions",
    links: [
      { label: "Sovereign AI", href: "/solutions/ai" },
      { label: "Orbital logistics", href: "/solutions/orbital" },
      { label: "Quantum finance", href: "/solutions/finance" },
      { label: "Civic intelligence", href: "/solutions/civic" },
      { label: "Healthcare systems", href: "/solutions/health" },
      { label: "Industrial autonomy", href: "/solutions/industrial" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Developer docs", href: "/docs" },
      { label: "Integration hub", href: "/integrations" },
      { label: "Security advisories", href: "/security" },
      { label: "Network status", href: "/status" },
      { label: "Brand toolkit", href: "/brand" },
      { label: "Press kit", href: "/press" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Aeterna", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Ethics council", href: "/ethics" },
      { label: "Partners", href: "/partners" }
    ]
  },
  {
    title: "Network",
    links: [
      { label: "Mission directory", href: "/missions" },
      { label: "Operator network", href: "/operators" },
      { label: "Research labs", href: "/labs" },
      { label: "Global alliances", href: "/alliances" },
      { label: "Customer stories", href: "/stories" },
      { label: "Community", href: "/community" }
    ]
  }
];

const policyLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Status", href: "/status" },
  { label: "Trust center", href: "/trust" }
];

const languageOptions = [
  "English (United States)",
  "Español (España)",
  "Deutsch",
  "Français",
  "Italiano",
  "Português (Brasil)",
  "Polski",
  "Türkçe",
  "العربية",
  "한국어",
  "日本語",
  "Русский",
  "हिन्दी",
  "Bahasa Indonesia",
  "简体中文",
  "繁體中文",
  "ไทย",
  "Tiếng Việt",
  "Svenska",
  "Norsk Bokmål"
];

const regionOptions = [
  "Global",
  "North America",
  "South America",
  "Europe",
  "Middle East",
  "Africa",
  "South Asia",
  "East Asia",
  "Southeast Asia",
  "Oceania",
  "Central Asia",
  "Arctic",
  "Lunar settlements",
  "Orbital platforms"
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
    const candidates = launchCards.filter((card) => card.tier === "primary");
    return (
      candidates.find((card) => matchesSector(card.sectors, activeSector)) ?? candidates[0]
    );
  }, [activeSector]);

  const companionCards = useMemo(() => {
    const candidates = launchCards.filter((card) => card.tier === "companion");
    const filtered = candidates.filter((card) => matchesSector(card.sectors, activeSector));
    return (filtered.length ? filtered : candidates).slice(0, 2);
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
    () => filterHighlights(researchHighlights, activeSector).slice(0, 2),
    [activeSector]
  );

  const filteredPrograms = useMemo(
    () => filterHighlights(businessPrograms, activeSector).slice(0, 3),
    [activeSector]
  );

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
        <aside className="flex-none px-6 py-10 lg:basis-[35%] lg:px-12 lg:py-14">
          <div className="mx-auto flex h-full w-full max-w-xl items-center justify-center">
            <MissionColumn searchExamples={searchExamples} />
          </div>
        </aside>
        <section className="relative flex-1 bg-black text-white lg:basis-[65%] lg:overflow-y-auto">
          <div className="mx-auto flex min-h-full w-full max-w-[960px] flex-col gap-8 px-6 pb-16 pt-10 sm:px-10 lg:pb-20 lg:pt-12">
            <nav className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-white/50">
              {focusAreas.map((area) => {
                const active = area.id === activeSector;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveSector(area.id)}
                    className={`transition hover:text-white ${active ? "text-white" : ""}`}
                  >
                    {area.label}
                  </button>
                );
              })}
            </nav>
            <div className="space-y-10">
              <section className="space-y-5" aria-labelledby="launch-slate">
                <h2 id="launch-slate" className="sr-only">
                  Launch slate
                </h2>
                <div className="grid gap-6 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <article
                    className={`relative isolate flex min-h-[240px] flex-col overflow-hidden rounded-[28px] p-6 lg:min-h-[320px] ${
                      toneStyles[flagshipCard.tone].background
                    } ${toneStyles[flagshipCard.tone].text} ${toneStyles[flagshipCard.tone].shadow}`}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 bg-black/45 backdrop-blur-[2px]"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{flagshipCard.category}</span>
                    </div>
                    <h3 className="relative mt-auto text-2xl font-semibold text-white">{flagshipCard.title}</h3>
                    <span className="relative mt-4 text-xs uppercase tracking-[0.2em] opacity-80">{flagshipCard.date}</span>
                  </article>
                  <div className="grid gap-6">
                    {companionCards.map((item) => (
                      <article
                        key={item.id}
                        className={`relative isolate flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[28px] p-6 ${
                          toneStyles[item.tone].background
                        } ${toneStyles[item.tone].text} ${toneStyles[item.tone].shadow}`}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 bg-black/45 backdrop-blur-[2px]"
                          aria-hidden="true"
                        />
                        <div className="relative">
                          <span className="block text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        </div>
                        <div className="relative mt-4">
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        </div>
                        <div className="relative mt-6">
                          <span className="block text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-8" aria-labelledby="latest-news">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 id="latest-news" className="text-2xl font-semibold">
                    Latest news
                  </h2>
                  <Link
                    href={"/newsroom" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                {filteredNews.length ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNews.map((item) => (
                      <article
                        key={item.title}
                        className="relative isolate flex min-h-[180px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#1f2937] p-6 text-slate-100 lg:aspect-square"
                      >
                        <span
                          className="pointer-events-none absolute inset-0 bg-black/45 backdrop-blur-[2px]"
                          aria-hidden="true"
                        />
                        <div className="relative">
                          <span className="block text-[11px] uppercase tracking-[0.2em] text-slate-200/80">{item.category}</span>
                        </div>
                        <div className="relative mt-4">
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        </div>
                        <div className="relative mt-6">
                          <span className="block text-xs uppercase tracking-[0.2em] text-slate-200/70">{item.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/60">Mission communications for this focus area are being composed.</p>
                )}
              </section>

              <section className="space-y-8" aria-labelledby="stories">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 id="stories" className="text-2xl font-semibold">
                    Stories
                  </h2>
                  <Link
                    href={"/stories" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                <StoryScroller stories={filteredStories.map(({ sectors: _sectors, ...story }) => story)} />
              </section>

              <section className="space-y-8" aria-labelledby="research">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 id="research" className="text-2xl font-semibold">
                    Latest research
                  </h2>
                  <Link
                    href={"/research" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                {filteredResearch.length ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {filteredResearch.map((item) => (
                      <article
                        key={item.title}
                        className={`relative isolate flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[28px] p-6 lg:min-h-[240px] ${
                          toneStyles[item.tone ?? "violet"].background
                        } ${toneStyles[item.tone ?? "violet"].text} ${toneStyles[item.tone ?? "violet"].shadow}`}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 bg-black/45 backdrop-blur-[2px]"
                          aria-hidden="true"
                        />
                        <div className="relative">
                          <span className="block text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        </div>
                        <div className="relative mt-4">
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        </div>
                        <div className="relative mt-6">
                          <span className="block text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/60">No research updates for this focus yet—check back soon.</p>
                )}
              </section>

              <section className="space-y-8" aria-labelledby="business">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 id="business" className="text-2xl font-semibold">
                    Aeterna for business
                  </h2>
                  <Link
                    href={"/programs" as Route}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
                  >
                    View all
                  </Link>
                </div>
                {filteredPrograms.length ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPrograms.map((item) => (
                      <article
                        key={item.title}
                        className={`relative isolate flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[28px] p-6 lg:aspect-square ${
                          toneStyles[item.tone ?? "blue"].background
                        } ${toneStyles[item.tone ?? "blue"].text} ${toneStyles[item.tone ?? "blue"].shadow}`}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 bg-black/45 backdrop-blur-[2px]"
                          aria-hidden="true"
                        />
                        <div className="relative">
                          <span className="block text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        </div>
                        <div className="relative mt-4">
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        </div>
                        <div className="relative mt-6">
                          <span className="block text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/60">Select another focus area to reveal aligned business programs.</p>
                )}
              </section>

              <FooterPanel />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function FooterPanel() {
  const currentYear = new Date().getFullYear();
  const [languageChoice, setLanguageChoice] = useState(languageOptions[0]);
  const [regionChoice, setRegionChoice] = useState(regionOptions[0]);
  const [activeDialog, setActiveDialog] = useState<"language" | "region" | null>(null);

  useEffect(() => {
    if (!activeDialog) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDialog(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeDialog]);

  const activeOptions = activeDialog === "language" ? languageOptions : regionOptions;
  const activeChoice = activeDialog === "language" ? languageChoice : regionChoice;

  const handleSelect = (value: string) => {
    if (activeDialog === "language") {
      setLanguageChoice(value);
    }

    if (activeDialog === "region") {
      setRegionChoice(value);
    }

    setActiveDialog(null);
  };

  return (
    <footer className="border-t border-white/10 pt-12 text-sm text-white/70">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {footerNavigation.map((column) => (
          <div key={column.title} className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50">{column.title}</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href as Route} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-6 text-sm text-white/70">
        <div className="flex flex-wrap gap-6">
          <div className="flex min-w-[220px] flex-col gap-2 text-xs uppercase tracking-[0.22em] text-white/50">
            <span className="flex items-center gap-2 text-white/60">
              <Globe2 className="h-4 w-4" /> Language
            </span>
            <button
              type="button"
              onClick={() => setActiveDialog("language")}
              className="flex w-full items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
            >
              <span className="truncate text-left">{languageChoice}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="flex min-w-[220px] flex-col gap-2 text-xs uppercase tracking-[0.22em] text-white/50">
            <span className="flex items-center gap-2 text-white/60">
              <MapPin className="h-4 w-4" /> Region
            </span>
            <button
              type="button"
              onClick={() => setActiveDialog("region")}
              className="flex w-full items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
            >
              <span className="truncate text-left">{regionChoice}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-white/50">
          Aeterna localizes compliance, currency, and mission governance across every active territory and orbital platform.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <span>© {currentYear} Aeterna Technology</span>
        <div className="flex flex-wrap gap-4">
          {policyLinks.map((link) => (
            <Link key={link.label} href={link.href as Route} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {activeDialog ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={() => setActiveDialog(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl border border-white/12 bg-[#0b0b0f] p-6 text-sm text-white/80 shadow-[0_32px_96px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  {activeDialog === "language" ? "Language" : "Region"}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {activeDialog === "language" ? "Select your language" : "Select your region"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60 transition hover:border-white/30 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-1 text-xs text-white/50">
              <span>Current selection</span>
              <span className="block text-sm font-medium text-white">{activeChoice}</span>
            </div>
            <ul className="mt-5 max-h-60 space-y-1 overflow-y-auto pr-1">
              {activeOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left transition ${
                      option === activeChoice
                        ? "bg-white/15 text-white"
                        : "hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{option}</span>
                    {option === activeChoice ? (
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">Active</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </footer>
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
