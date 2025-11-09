import Link from "next/link";
import { Header } from "@/components/header";
import { MissionColumn } from "@/components/mission-column";
import { StoryScroller } from "@/components/story-scroller";

const searchExamples = [
  "Calibrate Helios oversight",
  "Schedule Atlas Relay activation",
  "Audit continuum supply lines",
  "Open sovereign intelligence brief",
];

const launchHighlights = {
  flagship: {
    category: "Flagship launch",
    title: "Helios Continuum checks in",
    date: "June 24, 2024",
    tone: "violet" as const,
  },
  upcoming: {
    category: "Next deployment",
    title: "Atlas Relay mesh rehearsal",
    date: "July 2, 2024",
    tone: "teal" as const,
  },
  heritage: [
    {
      category: "Heritage system",
      title: "Pulse Vault sentinel refresh",
      date: "May 18, 2024",
      tone: "emerald" as const,
    },
    {
      category: "Heritage system",
      title: "Chronicle Loom archive sync",
      date: "May 9, 2024",
      tone: "amber" as const,
    },
    {
      category: "Heritage system",
      title: "Echelon Nodes uplink audit",
      date: "April 30, 2024",
      tone: "blue" as const,
    },
  ],
};

const latestNews = [
  {
    category: "Press",
    title: "Aeterna joins Europa Accord",
    date: "June 12, 2024",
  },
  {
    category: "Regulation",
    title: "Helios Continuum clears orbital review",
    date: "June 5, 2024",
  },
  {
    category: "Partnerships",
    title: "Atlas Relay powers Pacific Climate Coalition",
    date: "May 28, 2024",
  },
  {
    category: "Expansion",
    title: "Quantum campus opens in Dakar",
    date: "May 16, 2024",
  },
  {
    category: "Telemetry",
    title: "Neural corridors reach 30 light-min latency",
    date: "May 3, 2024",
  },
  {
    category: "Academy",
    title: "Continuum governance syllabus released",
    date: "April 22, 2024",
  },
];

const stories = [
  {
    category: "Terraforming",
    title: "Frontier settlements stabilize the Midnight Belt",
    date: "June 10, 2024",
    linkLabel: "View log",
  },
  {
    category: "Oceanic alliance",
    title: "Circadian Reef drones stay in sync across 12 nations",
    date: "May 29, 2024",
    linkLabel: "Open brief",
  },
  {
    category: "Cultural recovery",
    title: "Chronicle Loom revives the Qira ceremonial code",
    date: "May 6, 2024",
    linkLabel: "See archive",
  },
  {
    category: "Lunar health",
    title: "Pulse Vault safeguards Selene clinics",
    date: "April 27, 2024",
    linkLabel: "Review report",
  },
];

const researchHighlights = [
  {
    category: "Whitepaper",
    title: "Adaptive Ethics Mesh",
    date: "June 1, 2024",
    tone: "emerald" as const,
  },
  {
    category: "Field trial",
    title: "Exo-Cortex Biointerface",
    date: "May 21, 2024",
    tone: "purple" as const,
  },
];

const businessPrograms = [
  {
    category: "Industries",
    title: "Sovereign operations network",
    date: "Updated weekly",
    tone: "blue" as const,
  },
  {
    category: "Enterprises",
    title: "Executive intelligence fabric",
    date: "Updated biweekly",
    tone: "amber" as const,
  },
  {
    category: "Risk",
    title: "Strategic observatory council",
    date: "Updated monthly",
    tone: "teal" as const,
  },
];

const toneStyles: Record<
  "violet" | "teal" | "emerald" | "amber" | "blue" | "purple",
  { background: string; shadow: string; text: string }
> = {
  violet: {
    background: "bg-[#303f9f]",
    shadow: "shadow-[0_0_60px_-30px_rgba(63,81,181,0.85)]",
    text: "text-indigo-100",
  },
  teal: {
    background: "bg-[#00695c]",
    shadow: "shadow-[0_0_60px_-30px_rgba(0,150,136,0.8)]",
    text: "text-teal-100",
  },
  emerald: {
    background: "bg-[#1b5e20]",
    shadow: "shadow-[0_0_60px_-30px_rgba(46,125,50,0.85)]",
    text: "text-emerald-100",
  },
  amber: {
    background: "bg-[#b26a00]",
    shadow: "shadow-[0_0_60px_-30px_rgba(255,143,0,0.7)]",
    text: "text-amber-100",
  },
  blue: {
    background: "bg-[#0d47a1]",
    shadow: "shadow-[0_0_60px_-30px_rgba(33,150,243,0.75)]",
    text: "text-blue-100",
  },
  purple: {
    background: "bg-[#4527a0]",
    shadow: "shadow-[0_0_60px_-30px_rgba(94,53,177,0.78)]",
    text: "text-purple-100",
  },
};

export default function Page() {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden h-full w-[35%] flex-shrink-0 bg-[var(--bg-primary)] lg:flex">
          <MissionColumn searchExamples={searchExamples} />
        </aside>
        <section className="flex-1 bg-black">
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-hide sm:px-6 lg:px-10">
              <div className="space-y-10 lg:space-y-12">
                <div className="lg:hidden">
                  <MissionColumn searchExamples={searchExamples} />
                </div>

                <div className="rounded-[32px] border border-white/5 bg-black p-5 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Launch slate</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Status updated weekly</span>
                  </div>
                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:auto-rows-[minmax(0,1fr)]">
                    <article
                      className={`flex min-h-[220px] flex-col justify-between rounded-[24px] p-6 ${
                        toneStyles[launchHighlights.flagship.tone].background
                      } ${toneStyles[launchHighlights.flagship.tone].text} ${toneStyles[launchHighlights.flagship.tone].shadow}`}
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{launchHighlights.flagship.category}</span>
                      <h3 className="mt-4 text-2xl font-semibold text-white">{launchHighlights.flagship.title}</h3>
                      <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{launchHighlights.flagship.date}</span>
                    </article>
                    <article
                      className={`flex min-h-[220px] flex-col justify-between rounded-[24px] p-6 lg:col-span-1 lg:row-span-1 ${
                        toneStyles[launchHighlights.upcoming.tone].background
                      } ${toneStyles[launchHighlights.upcoming.tone].text} ${toneStyles[launchHighlights.upcoming.tone].shadow}`}
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{launchHighlights.upcoming.category}</span>
                      <h3 className="mt-4 text-xl font-semibold text-white">{launchHighlights.upcoming.title}</h3>
                      <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{launchHighlights.upcoming.date}</span>
                    </article>
                    {launchHighlights.heritage.map((item) => (
                      <article
                        key={item.title}
                        className={`flex min-h-[200px] flex-col justify-between rounded-[24px] p-6 ${toneStyles[item.tone].background} ${
                          toneStyles[item.tone].text
                        } ${toneStyles[item.tone].shadow}`}
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                        <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/5 bg-black p-5 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Latest news</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">All channels</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {latestNews.map((item) => (
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
                </div>

                <div className="rounded-[32px] border border-white/5 bg-black p-5 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Stories</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Drag to explore</span>
                  </div>
                  <StoryScroller stories={stories} />
                </div>

                <div className="rounded-[32px] border border-white/5 bg-black p-5 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Latest research</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Mission labs</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {researchHighlights.map((item) => (
                      <article
                        key={item.title}
                        className={`flex min-h-[200px] flex-col justify-between rounded-[24px] p-6 ${toneStyles[item.tone].background} ${
                          toneStyles[item.tone].text
                        } ${toneStyles[item.tone].shadow}`}
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                        <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/5 bg-black p-5 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Aeterna for business</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Program suites</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {businessPrograms.map((item) => (
                      <article
                        key={item.title}
                        className={`flex min-h-[200px] flex-col justify-between rounded-[24px] p-6 ${toneStyles[item.tone].background} ${
                          toneStyles[item.tone].text
                        } ${toneStyles[item.tone].shadow}`}
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] opacity-80">{item.category}</span>
                        <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                        <span className="mt-6 text-xs uppercase tracking-[0.2em] opacity-80">{item.date}</span>
                      </article>
                    ))}
                  </div>
                </div>

                <footer className="mt-10 rounded-[32px] border border-white/5 bg-black p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-white/70">© {new Date().getFullYear()} Aeterna Technology</span>
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
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
