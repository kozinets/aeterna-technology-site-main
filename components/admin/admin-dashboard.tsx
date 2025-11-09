"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  GaugeCircle,
  Globe,
  Satellite,
  ShieldCheck,
  SignalHigh,
  Zap
} from "lucide-react";

type Mission = {
  id: string;
  title: string;
  sector: string;
  status: "green" | "amber" | "red";
  updatedAt: string;
};

type ResearchTrack = {
  name: string;
  lead: string;
  progress: number;
  risk: "low" | "medium" | "high";
};

type Automation = {
  name: string;
  summary: string;
  owner: string;
};

const missionQueue: Mission[] = [
  {
    id: "MC-2046",
    title: "Terraforming rehearsal for Mars Gate",
    sector: "Orbital logistics",
    status: "green",
    updatedAt: "08:42 UTC"
  },
  {
    id: "MC-2051",
    title: "Quantum corridor expansion to Europa",
    sector: "Quantum relay",
    status: "amber",
    updatedAt: "07:55 UTC"
  },
  {
    id: "MC-2054",
    title: "Deep-sea sanctum biosphere stabilization",
    sector: "Bio-dome ecosystems",
    status: "green",
    updatedAt: "07:03 UTC"
  }
];

const researchTracks: ResearchTrack[] = [
  {
    name: "Photonic neuromesh",
    lead: "Dr. Aria Qamar",
    progress: 72,
    risk: "medium"
  },
  {
    name: "Autonomous diplomacy",
    lead: "Councilor Lee",
    progress: 48,
    risk: "low"
  },
  {
    name: "Resonant habitat shielding",
    lead: "Chief Engineer Ramos",
    progress: 31,
    risk: "high"
  }
];

const automationRules: Automation[] = [
  {
    name: "Orbital response mesh",
    summary: "Escalate orbital anomalies to Atlas Relay and notify sentry fleet command.",
    owner: "Atlas Core"
  },
  {
    name: "Sanctuary wellness cadence",
    summary: "Distribute pulse diagnostics to subterranean clinics every 45 minutes.",
    owner: "Continuum Health"
  },
  {
    name: "Diplomatic field intelligence",
    summary: "Route cultural intelligence briefs to allied governments once decrypted.",
    owner: "Aeterna Liaison"
  }
];

export function AdminDashboard() {
  const stabilityScore = useMemo(() => 96.2, []);
  const incidentCount = useMemo(() => 4, []);
  const networkLatency = useMemo(() => "31 ms", []);

  return (
    <div className="space-y-10 rounded-3xl border border-white/10 bg-black/70 p-8 text-neutral-100 shadow-[0_0_120px_-60px_rgba(0,0,0,0.8)]">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Mission control</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Aeterna command center</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-300">
            Monitor civilization scale systems, synchronize research vectors, and deploy automations from a single
            administrative fabric.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 transition hover:border-emerald-300 hover:text-white"
        >
          Launch public site
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShieldCheck}
          title="Integrity"
          value={`${stabilityScore.toFixed(1)}%`}
          description="Operational stability across mission fabrics"
          tone="positive"
        />
        <MetricCard
          icon={Activity}
          title="Incidents"
          value={`${incidentCount}`}
          description="Active anomaly investigations in progress"
          tone="warning"
        />
        <MetricCard
          icon={SignalHigh}
          title="Network latency"
          value={networkLatency}
          description="Median signal delay across quantum corridors"
          tone="neutral"
        />
        <MetricCard
          icon={GaugeCircle}
          title="Expansion index"
          value="128 missions"
          description="Live deployments across terrestrial and orbital theaters"
          tone="positive"
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 rounded-3xl border border-white/10 bg-[#1a1f2b] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Mission queue</h2>
            <Link href={"/missions" as any} className="text-sm text-sky-200 transition hover:text-white">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {missionQueue.map((mission) => (
              <article
                key={mission.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#161b26] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">{mission.id}</p>
                  <h3 className="text-lg font-semibold text-white">{mission.title}</h3>
                  <p className="text-sm text-neutral-300">{mission.sector}</p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusPill tone={mission.status}>{mission.updatedAt}</StatusPill>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-300 transition hover:border-white/40 hover:text-white"
                  >
                    Handoff
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="space-y-5 rounded-3xl border border-white/10 bg-[#20192d] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Signal health</h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-purple-300/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-200 transition hover:border-purple-200 hover:text-white"
            >
              Dispatch audit
              <Zap className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-4 text-sm text-neutral-300">
            <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#271d39] p-4">
              <Satellite className="h-5 w-5 text-purple-200" />
              42 orbital relays synchronized · 99.2% coverage
            </p>
            <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#271d39] p-4">
              <Globe className="h-5 w-5 text-sky-200" />
              128 terrestrial sanctums reporting nominal biosignals
            </p>
            <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#271d39] p-4">
              <Bot className="h-5 w-5 text-emerald-200" />
              Autonomous envoys active in 63 governance councils
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 rounded-3xl border border-white/10 bg-[#1b2324] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Research cadence</h2>
            <Link href={"/research" as any} className="text-sm text-emerald-200 transition hover:text-white">
              Schedule review
            </Link>
          </div>
          <div className="space-y-4">
            {researchTracks.map((track) => (
              <div
                key={track.name}
                className="rounded-2xl border border-white/10 bg-[#141d1e] p-4 text-sm text-neutral-200"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{track.name}</h3>
                    <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">{track.lead}</p>
                  </div>
                  <RiskPill level={track.risk} />
                </div>
                <div className="mt-4 h-2 rounded-full bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-300 to-blue-400"
                    style={{ width: `${track.progress}%` }}
                  />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-500">{track.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5 rounded-3xl border border-white/10 bg-[#201f1a] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Automation lattice</h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200 transition hover:border-amber-200 hover:text-white"
            >
              Add automation
              <BadgeCheck className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <article key={rule.name} className="rounded-2xl border border-white/10 bg-[#262418] p-4 text-sm text-amber-100">
                <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                <p className="mt-2 leading-relaxed text-amber-100/80">{rule.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.24em] text-amber-200/70">Owner · {rule.owner}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#241d1f] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Critical advisories</h2>
            <p className="text-sm text-neutral-300">Review emerging risks requiring immediate mission council attention.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-rose-200 transition hover:border-rose-200 hover:text-white"
          >
            Open response board
            <AlertTriangle className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdvisoryCard
            icon={ArrowUpRight}
            title="Atlas Relay load spike"
            detail="Redistribute mesh traffic before threshold breach"
            tone="amber"
          />
          <AdvisoryCard
            icon={ShieldCheck}
            title="Pulse Vault audit"
            detail="Finalize biometric notarization for lunar clinics"
            tone="emerald"
          />
          <AdvisoryCard
            icon={Globe}
            title="Cultural envoy request"
            detail="Approve expanded corridor for Qira storytellers"
            tone="sky"
          />
          <AdvisoryCard
            icon={Zap}
            title="Solar flare watch"
            detail="Prepare heliospheric shields and reroute deep-space drones"
            tone="rose"
          />
        </div>
      </section>
    </div>
  );
}

type MetricCardProps = {
  icon: typeof ShieldCheck;
  title: string;
  value: string;
  description: string;
  tone: "positive" | "warning" | "neutral";
};

function MetricCard({ icon: Icon, title, value, description, tone }: MetricCardProps) {
  const toneStyles = {
    positive: "from-emerald-500/20 to-emerald-500/0 text-emerald-200",
    warning: "from-amber-500/20 to-amber-500/0 text-amber-200",
    neutral: "from-sky-500/20 to-sky-500/0 text-sky-200"
  } as const;

  return (
    <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${toneStyles[tone]} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <Icon className="h-10 w-10 text-white/70" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-neutral-200/80">{description}</p>
    </div>
  );
}

type StatusPillProps = {
  tone: Mission["status"];
  children: string;
};

function StatusPill({ tone, children }: StatusPillProps) {
  const toneMap = {
    green: "bg-emerald-500/15 text-emerald-200",
    amber: "bg-amber-500/15 text-amber-200",
    red: "bg-rose-500/15 text-rose-200"
  } as const;

  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${toneMap[tone]}`}>{children}</span>;
}

type RiskPillProps = {
  level: ResearchTrack["risk"];
};

function RiskPill({ level }: RiskPillProps) {
  const toneMap = {
    low: "bg-emerald-500/15 text-emerald-200",
    medium: "bg-amber-500/15 text-amber-200",
    high: "bg-rose-500/15 text-rose-200"
  } as const;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em] ${toneMap[level]}`}>
      Risk: {level}
    </span>
  );
}

type AdvisoryCardProps = {
  icon: typeof ArrowUpRight;
  title: string;
  detail: string;
  tone: "emerald" | "amber" | "sky" | "rose";
};

function AdvisoryCard({ icon: Icon, title, detail, tone }: AdvisoryCardProps) {
  const toneMap = {
    emerald: "border-emerald-400/40 text-emerald-100",
    amber: "border-amber-400/40 text-amber-100",
    sky: "border-sky-400/40 text-sky-100",
    rose: "border-rose-400/40 text-rose-100"
  } as const;

  return (
    <div className={`flex flex-col gap-3 rounded-2xl border ${toneMap[tone]} bg-black/40 p-4`}>
      <Icon className="h-5 w-5" />
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/80">{detail}</p>
      </div>
    </div>
  );
}
