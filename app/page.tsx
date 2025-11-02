import { Header } from "@/components/header";
import { AccessPortal } from "@/components/access-portal";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Insights } from "@/components/insights";
import { Programs } from "@/components/programs";
import { Building2, Cpu, FlaskConical, Orbit, Radar, Sparkles, Workflow } from "lucide-react";

const ecosystemModules = [
  {
    title: "Aeterna Genesis",
    description: "Incubator for breakthrough ventures: organ bioprinting, material synthesis, and nanorobotics.",
    detail: "18 divisions connected through Sentient Cloud and Vitality Labs"
  },
  {
    title: "Continuum Campus",
    description: "University of the future with neural lecture halls, quantum computers, and robotic laboratories.",
    detail: "32,000 researchers and students"
  },
  {
    title: "Orbital Forge",
    description: "Space manufacturing platform for implants, satellites, and autonomous stations.",
    detail: "LEO/MEO orbits linked by quantum channels"
  },
  {
    title: "Aeterna Network Fabric",
    description: "Global proxy, DePIN, and quantum communications network for data, robots, and implants.",
    detail: "Powered by NOVA Proxy, Synapse Mesh, and Quantum Zero Trust"
  }
];

const alliance = [
  {
    icon: Building2,
    title: "Governments",
    text: "Sovereign clouds, digital twins of infrastructure, and longevity programs for critical leaders."
  },
  {
    icon: Workflow,
    title: "Enterprises",
    text: "Autonomous production, biofoundries, and cognitive operations orchestration."
  },
  {
    icon: FlaskConical,
    title: "Universities",
    text: "Access to Aeterna labs, joint research, data exchanges, and model co-creation."
  },
  {
    icon: Orbit,
    title: "Orbital missions",
    text: "Satellite fleets, stations, and drones governed by Atlas Command and Sentient Cloud."
  }
];

export default function Page() {
  return (
    <main>
      <Header />
      <div className="px-6 pb-24 pt-20">
        <Hero />
        <Programs />
        <section className="mx-auto mt-28 max-w-[1200px]">
          <div className="section-shell px-10 py-12">
            <div className="flex flex-col gap-6 md:flex-row md:justify-between">
              <div className="max-w-2xl space-y-4">
                <span className="badge">Integrated ecosystems</span>
                <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                  The Aeterna ecosystem unfolds technology through living campuses and orbital platforms.
                </h2>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  From subterranean labs to orbital foundries, every site is synchronized via Sentient Cloud and Quantum Zero Trust. We build a network where digital and biological systems evolve in unison.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Cpu,
                    label: "Sentient Cloud",
                    value: "Exascale compute"
                  },
                  {
                    icon: Sparkles,
                    label: "Neural Lattice",
                    value: "Self-learning agents"
                  },
                  {
                    icon: Radar,
                    label: "Aeterna Link",
                    value: "Instant exchange"
                  }
                ].map((item) => (
                  <div key={item.label} className="glass-panel flex flex-col gap-2 p-5">
                    <item.icon className="h-6 w-6 text-[var(--icon-accent)]" />
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.label}</span>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {ecosystemModules.map((module) => (
                <div key={module.title} className="grid-card">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">{module.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{module.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{module.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto mt-28 max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="section-shell px-10 py-12">
              <span className="badge">Alliance</span>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                Aeterna partnership programs.
              </h2>
              <p className="mt-4 text-base text-[var(--text-secondary)]">
                We collaborate with governments, enterprises, and universities to launch joint programs, co-own infrastructure, and advance global missions.
              </p>
              <div className="mt-8 grid gap-5">
                {alliance.map((unit) => (
                  <div key={unit.title} className="glass-panel flex gap-4 p-5">
                    <unit.icon className="mt-1 h-6 w-6 text-[var(--icon-accent)]" />
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{unit.title}</h3>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">{unit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="section-shell px-10 py-12">
              <span className="badge">Continuum timeline</span>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">Aeterna evolution roadmap.</h2>
              <div className="mt-8 space-y-6">
                {[
                  "2024 — Quantum Zero Trust deployed across 12 nations",
                  "2025 — Orbital Forge launches with Sentient Cloud v3",
                  "2026 — NeuroWeave immortality programs reach global scale",
                  "2027 — Autonomous cities orchestrated by Atlas"
                ].map((milestone) => (
                  <div key={milestone} className="border-l border-[var(--border-default)] pl-6">
                    <p className="text-sm text-[var(--text-secondary)]">{milestone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Insights />
        <AccessPortal />
      </div>
      <Footer />
    </main>
  );
}
