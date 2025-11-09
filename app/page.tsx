import Link from "next/link";
import { Header } from "@/components/header";
import { ArrowUpRight, CalendarCheck, Rocket, ShieldCheck, SignalHigh } from "lucide-react";
import { StoryScroller } from "@/components/story-scroller";

const flagshipProduct = {
  title: "Helios Continuum",
  tagline: "Orbital-scale intelligence infrastructure launching 2025",
  description:
    "A fusion of photonic cores, quantum routing, and adaptive governance contracts. Designed to empower civilizations with a single nervous system that spans ground, orbit, and deep-sea colonies.",
  cta: "Enter mission dossier",
};

const upcomingProduct = {
  title: "Atlas Relay",
  description:
    "Distributed command mesh that translates human intent into orchestrated robotics. Perfect for planetary terraforming teams and climate intervention coalitions.",
};

const heritageProducts = [
  {
    title: "Pulse Vault",
    description: "Biometric memory chains safeguarding sovereign data realms.",
  },
  {
    title: "Chronicle Loom",
    description: "Narrative AI preserving generational knowledge without distortion.",
  },
  {
    title: "Echelon Nodes",
    description: "Edge accelerators that retrofit legacy industries with realtime cognition.",
  },
];

const latestNews = [
  {
    title: "Aeterna joins Europa Accord",
    date: "June 12, 2024",
    description: "Co-authoring the charter for interplanetary ethics and autonomy safeguards.",
  },
  {
    title: "Helios Continuum clears orbital review",
    date: "June 05, 2024",
    description: "Independent regulators confirm trajectory stability across geosynchronous bands.",
  },
  {
    title: "Atlas Relay partners with Pacific Climate Coalition",
    date: "May 28, 2024",
    description: "Deploying adaptive mesh to stabilize oceanic temperature gradients.",
  },
  {
    title: "Quantum campus opens in Dakar",
    date: "May 16, 2024",
    description: "A new continental hub for photonic material research and sovereign compute.",
  },
  {
    title: "Neural corridors reach 30 light-min latency",
    date: "May 03, 2024",
    description: "Interplanetary communications now operate below strategic response thresholds.",
  },
  {
    title: "Continuum academies release governance syllabus",
    date: "April 22, 2024",
    description: "Nations fast-track mission stewards through certified command simulations.",
  },
];

const stories = [
  {
    title: "Terraforming the Midnight Belt",
    description:
      "How three frontier settlements used Helios predictive matrices to stabilize comet mining arcs and cultivate breathable corridors in six months.",
    linkLabel: "Read the transformation log",
  },
  {
    title: "Guardians of the Circadian Reef",
    description:
      "An oceanic alliance employs Atlas Relay to synchronize biome drones across twelve sovereign territories without a single data breach.",
    linkLabel: "Dive into the reef protocol",
  },
  {
    title: "Chronicle Loom saves a lost language",
    description:
      "Elders of the Qira community encoded ceremonial knowledge into regenerative memory chains, reviving rituals dormant for a century.",
    linkLabel: "Explore cultural recovery",
  },
  {
    title: "Pulse Vault and the lunar clinics",
    description:
      "Medical guilds on Selene built trust across rival councils using tamper-evident diagnostics with near-zero latency audits.",
    linkLabel: "See the lunar blueprint",
  },
];

const researchHighlights = [
  {
    title: "Adaptive Ethics Mesh",
    description: "Self-healing policy layer that reconciles jurisdictional paradoxes within 42 ms.",
    badge: "Whitepaper",
  },
  {
    title: "Exo-Cortex Biointerface",
    description: "Hybrid neural mesh translating marine mammal language into strategic telemetry.",
    badge: "Field trial",
  },
];

const businessSolutions = [
  {
    title: "Sovereign industries",
    description: "Deploy modular cognition cells across energy, health, and transit networks with continuous compliance telemetry.",
  },
  {
    title: "Enterprise intelligence fabric",
    description: "Unify global operations into one command lattice that learns, predicts, and adapts alongside your executives.",
  },
  {
    title: "Strategic risk observatory",
    description: "Horizon scanning dashboards for boardrooms balancing exploration and regulation across multiple planets.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 pb-16 pt-12 lg:flex-row lg:px-12">
        <section className="lg:w-[40%] lg:pr-12">
          <div className="space-y-12 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:space-y-16">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-lime-300/80">Mission command</p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                What mission can Aeterna empower your civilization?
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-neutral-300">
                We craft connective tissue for societies reaching beyond planetary limits. From orbital habitats to subterranean
                sanctuaries, Aeterna aligns intelligence, governance, and trust so your people thrive anywhere.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">Operational beacons</p>
              <ul className="space-y-3 text-sm text-neutral-200">
                <li className="flex items-start gap-3">
                  <Rocket className="mt-0.5 h-5 w-5 text-emerald-300" />
                  Launch autonomous expeditions with strategic oversight across every theater.
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-sky-300" />
                  Maintain unbroken security perimeters with transparent, interoperable governance.
                </li>
                <li className="flex items-start gap-3">
                  <SignalHigh className="mt-0.5 h-5 w-5 text-amber-200" />
                  Orchestrate fleets of sensors, drones, and envoys through a unified signal lattice.
                </li>
                <li className="flex items-start gap-3">
                  <CalendarCheck className="mt-0.5 h-5 w-5 text-rose-300" />
                  Forecast decades of impact with scenario engines tuned for your civilization's ethos.
                </li>
              </ul>
            </div>
            <div className="hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 text-sm text-neutral-300 lg:block">
              <p className="font-semibold text-white">Signal status</p>
              <p className="mt-2 leading-relaxed">
                Mission control nodes: <span className="text-emerald-300">142 active</span>. Orbital corridors: <span className="text-sky-300">Stable</span>.
                Terrestrial sanctuaries: <span className="text-amber-200">Expanding</span>.
              </p>
            </div>
          </div>
        </section>
        <section className="lg:w-[60%]">
          <div className="space-y-12 rounded-[2rem] bg-black/60 p-4 shadow-[0_0_80px_-40px_rgba(0,0,0,0.9)] lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto lg:pr-2">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#251d3a] p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-3 md:auto-rows-[minmax(160px,1fr)]">
                <article className="flex flex-col justify-between rounded-2xl bg-[#3c2f5c]/90 p-6 shadow-inner md:col-span-2">
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-violet-200/80">New frontier</p>
                    <h2 className="text-2xl font-semibold text-white">{flagshipProduct.title}</h2>
                    <p className="text-sm text-violet-100/90">{flagshipProduct.tagline}</p>
                    <p className="text-sm leading-relaxed text-violet-100/80">{flagshipProduct.description}</p>
                  </div>
                  <Link
                    href="#mission-dossier"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-100 transition hover:text-white"
                  >
                    {flagshipProduct.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
                <article className="flex flex-col justify-between rounded-2xl bg-[#2f2640]/90 p-6 text-violet-100">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-violet-200/70">Coming next</p>
                    <h3 className="text-xl font-semibold text-white">{upcomingProduct.title}</h3>
                    <p className="text-sm leading-relaxed text-violet-100/80">{upcomingProduct.description}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-violet-200/70">
                    Status: In verification
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden />
                  </span>
                </article>
                {heritageProducts.map((product) => (
                  <article
                    key={product.title}
                    className="rounded-2xl bg-[#2a2345]/80 p-6 text-violet-100 shadow-inner"
                  >
                    <h4 className="text-lg font-semibold text-white">{product.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-violet-100/80">{product.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#111b2c] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Latest news</h2>
                <Link href="#all-news" className="text-sm text-sky-200 transition hover:text-white">
                  View all
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {latestNews.map((item) => (
                  <article key={item.title} className="rounded-2xl bg-[#0d1626] p-5 text-slate-100">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-300/80">{item.date}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-200/80">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#102022] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Stories</h2>
                <span className="text-xs uppercase tracking-[0.28em] text-emerald-200/70">Drag to explore</span>
              </div>
              <StoryScroller stories={stories} />
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#241f2f] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Latest research</h2>
                <Link href="#research" className="text-sm text-rose-200 transition hover:text-white">
                  Research archive
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {researchHighlights.map((item) => (
                  <article key={item.title} className="flex flex-col justify-between rounded-2xl bg-[#2f263d] p-6 text-rose-100">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-rose-200">
                        {item.badge}
                      </span>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-rose-100/80">{item.description}</p>
                    </div>
                    <Link
                      href="#research"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-100 transition hover:text-white"
                    >
                      Continue reading
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#1e2721] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Aeterna for business</h2>
                <Link href="#business" className="text-sm text-emerald-200 transition hover:text-white">
                  Talk to strategists
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {businessSolutions.map((item) => (
                  <article key={item.title} className="rounded-2xl bg-[#17201a] p-6 text-emerald-100">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <footer className="rounded-3xl border border-white/10 bg-[#0b1018] p-8 text-sm text-neutral-400">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Essential links</p>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-300">
                  <Link href={"/privacy" as any} className="transition hover:text-white">
                    Privacy
                  </Link>
                  <Link href={"/terms" as any} className="transition hover:text-white">
                    Terms
                  </Link>
                  <Link href={"/network" as any} className="transition hover:text-white">
                    Global network
                  </Link>
                  <Link href={"/contact" as any} className="transition hover:text-white">
                    Contact mission control
                  </Link>
                </div>
              </div>
              <p className="mt-6 text-xs text-neutral-500">© {new Date().getFullYear()} Aeterna Technology. Engineered for enduring civilizations.</p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
