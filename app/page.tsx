import { Header } from "@/components/header";
import { AccessPortal } from "@/components/access-portal";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Insights } from "@/components/insights";
import { Programs } from "@/components/programs";
import { Building2, Cpu, FlaskConical, Orbit, Radar, Sparkles, Workflow } from "lucide-react";

const ecosystemNodes = [
  {
    title: "Aeterna Genesis",
    description: "Incubator for breakthrough ventures in organ bioprinting, material synthesis, and nanorobotics.",
    detail: "18 divisions synchronized with Sentient Cloud and Vitality Labs",
    streams: ["Biofoundry", "Quantum materials", "Longevity"]
  },
  {
    title: "Continuum Campus",
    description: "A living university with neural lecture halls, quantum compute, and autonomous laboratories.",
    detail: "32,000 researchers and students operating across immersive environments",
    streams: ["Neural curriculum", "Shared datasets", "Joint missions"]
  },
  {
    title: "Orbital Forge",
    description: "Space manufacturing platform for implants, satellites, and autonomous stations.",
    detail: "LEO/MEO orbits connected through quantum channels and robotic foundries",
    streams: ["Zero-G assembly", "Station autonomy", "Launch cadence"]
  },
  {
    title: "Aeterna Network Fabric",
    description: "Global proxy, DePIN, and quantum communications lattice for data, robots, and implants.",
    detail: "Powered by NOVA Proxy, Synapse Mesh, and Quantum Zero Trust governance",
    streams: ["Proxy mesh", "Edge orchestration", "Telemetry"]
  }
];

const campusStats = [
  { icon: Cpu, label: "Sentient Cloud", value: "Exascale compute", tone: "positive" as const },
  { icon: Sparkles, label: "Neural Lattice", value: "Self-learning agents", tone: "positive" as const },
  { icon: Radar, label: "Aeterna Link", value: "Instant exchange", tone: "critical" as const }
];

const alliances = [
  {
    icon: Building2,
    title: "Governments",
    text: "Sovereign clouds, digital twins, and longevity initiatives for national leaders.",
    tone: "critical" as const
  },
  {
    icon: Workflow,
    title: "Enterprises",
    text: "Autonomous production, cybernetic factories, and cognitive operations.",
    tone: "positive" as const
  },
  {
    icon: FlaskConical,
    title: "Universities",
    text: "Joint research programs, data exchanges, and accelerated discoveries.",
    tone: "positive" as const
  },
  {
    icon: Orbit,
    title: "Orbital missions",
    text: "Satellites, stations, and drones governed by Atlas Command and Sentient Cloud.",
    tone: "critical" as const
  }
];

const timeline = [
  { year: "2024", description: "Quantum Zero Trust deployed across 12 nations", tone: "critical" as const },
  { year: "2025", description: "Orbital Forge launches with Sentient Cloud v5", tone: "positive" as const },
  { year: "2026", description: "NeuroWeave immortality programs reach global scale", tone: "positive" as const },
  { year: "2027", description: "Autonomous cities orchestrated by Atlas", tone: "positive" as const }
];

export default function Page() {
  return (
    <main>
      <Header />
      <div className="px-6 pb-24 pt-12">
        <Hero />
        <section className="mx-auto mt-24 max-w-[1200px]">
          <div className="section-shell px-10 py-12">
            <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="badge">Integrated ecosystems</span>
                  <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                    The Aeterna ecosystem is a <span className="text-[var(--text-status-warning)]">living corporate organism</span>.
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    Subterranean labs, orbital foundries, quantum networks, and longevity programs operate under one mission console.
                  </p>
                </div>
                <div className="grid gap-4">
                  {campusStats.map((item) => (
                    <div key={item.label} className="glass-panel flex items-center gap-3 p-5">
                      <item.icon
                        className={`h-6 w-6 ${
                          item.tone === "positive"
                            ? "text-[var(--text-status-warning)]"
                            : item.tone === "critical"
                              ? "text-[var(--text-status-error)]"
                              : "text-[var(--icon-secondary)]"
                        }`}
                      />
                      <div>
                        <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.label}</span>
                        <p
                          className={`text-sm font-semibold ${
                            item.tone === "positive"
                              ? "text-[var(--text-status-warning)]"
                              : item.tone === "critical"
                                ? "text-[var(--text-status-error)]"
                                : "text-[var(--text-primary)]"
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {ecosystemNodes.map((node) => (
                  <div key={node.title} className="grid-card space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">{node.title}</h3>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">{node.description}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{node.detail}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                      {node.streams.map((stream) => (
                        <span key={stream} className="rounded-full border border-[var(--border-default)] px-3 py-1">
                          {stream}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Programs />
        <section className="mx-auto mt-28 max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="section-shell px-10 py-12">
              <span className="badge">Alliance network</span>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                Strategic partners extend Aeterna's reach.
              </h2>
              <p className="mt-4 text-base text-[var(--text-secondary)]">
                Governments, enterprises, and universities integrate with our infrastructure to launch joint missions and co-own progress.
              </p>
              <div className="mt-8 grid gap-5">
                {alliances.map((unit) => (
                  <div key={unit.title} className="glass-panel flex gap-4 p-5">
                    <unit.icon
                      className={`mt-1 h-6 w-6 ${
                        unit.tone === "positive"
                          ? "text-[var(--text-status-warning)]"
                          : "text-[var(--text-status-error)]"
                      }`}
                    />
                    <div>
                      <h3
                        className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                          unit.tone === "positive"
                            ? "text-[var(--text-status-warning)]"
                            : "text-[var(--text-status-error)]"
                        }`}
                      >
                        {unit.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">{unit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="section-shell px-10 py-12">
              <span className="badge">Continuum timeline</span>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                Expansion roadmap.
              </h2>
              <div className="mt-8 space-y-6">
                {timeline.map((milestone) => (
                  <div key={milestone.year} className="border-l border-[var(--border-default)] pl-6">
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span
                        className={`font-semibold ${
                          milestone.tone === "positive"
                            ? "text-[var(--text-status-warning)]"
                            : "text-[var(--text-status-error)]"
                        }`}
                      >
                        {milestone.year}
                      </span>{" "}
                      — {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)] p-6 text-sm text-[var(--text-secondary)]">
                Every roadmap entry is governed by Atlas Mission Control with compliance checks, partner review boards, and biometric authorization through <span className="text-[var(--text-status-warning)]">Aeterna Pass</span>.
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
