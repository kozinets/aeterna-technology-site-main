import { AccessPortal } from "@/components/access-portal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CheckCircle2, Download, Globe, Layers, Shield, Zap } from "lucide-react";
import Link from "next/link";

const freeMeshHighlights = [
  {
    tag: "#PulseScan",
    title: "Continuous discovery",
    detail:
      "Billions of public proxies are scanned, scored, and updated every hour with live geolocation and reputation telemetry."
  },
  {
    tag: "#Integrity",
    title: "Quality assurance",
    detail:
      "Every endpoint passes multi-layer latency, encryption, and availability checks before entering the NOVA catalogue."
  },
  {
    tag: "#OpenSDK",
    title: "SDKs for any stack",
    detail:
      "Drop-in clients for browsers, servers, and mobile securely rotate identities with deterministic routing policies."
  }
];

const nodeEconomy = [
  {
    title: "Enroll as a node",
    description:
      "Install the NOVA daemon on desktop, server, or edge devices and register hardware posture, bandwidth, and jurisdiction."
  },
  {
    title: "Relay encrypted traffic",
    description:
      "Subscribers are matched to the healthiest node for their region. Requests inherit your IP while remaining policy compliant."
  },
  {
    title: "Share monthly revenue",
    description:
      "At the end of each billing cycle you receive 80% of subscription revenue generated across your node sessions."
  }
];

const telemetryBursts = [
  { label: "Validated endpoints", value: "4.1M", tone: "positive" as const },
  { label: "Average latency", value: "2.8 ms", tone: "positive" as const },
  { label: "Regions online", value: "184", tone: "positive" as const },
  { label: "Node uptime", value: "99.999%", tone: "positive" as const },
  { label: "Compromised relays", value: "0 detected", tone: "critical" as const }
];

const developerKits = [
  {
    title: "Open source agents",
    description: "Self-host the NOVA CLI, SDKs, and router blueprints to embed proxy orchestration in your own stack.",
    href: "/docs/nova/agents"
  },
  {
    title: "Enterprise governance",
    description: "Configure audit feeds, request policies, and compliance mirrors for regulated workloads.",
    href: "/docs/nova/governance"
  },
  {
    title: "Node marketplace",
    description: "Discover payout structures, jurisdiction requirements, and deployment playbooks for contributors.",
    href: "/docs/nova/marketplace"
  }
];

export default function NovaProxyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-12 sm:px-8 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Network & Edge</span>
            <h1 className="text-4xl font-semibold text-[var(--text-primary)] md:text-5xl">
              <span style={{ color: "#4ADE80" }}>NOVA Free Proxy</span> — sovereign privacy at planetary scale.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              NOVA converges free community relays and paid contributor nodes into one programmable mesh. Every request is signed,
              anonymized, and steered through the healthiest route with zero-knowledge accounting.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[var(--text-status-warning)]" />
                <span>Post-quantum handshakes</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[var(--text-status-warning)]" />
                <span>184 live regions</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-[var(--text-status-error)]" />
                <span>Adaptive rate control</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={"/downloads/nova" as any}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Download clients
                <Download className="h-4 w-4" />
              </Link>
              <Link
                href={"/docs/nova" as any}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Explore documentation
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Why the free mesh matters</p>
            <ul className="space-y-5">
              {freeMeshHighlights.map((item) => (
                <li key={item.tag} className="relative flex flex-col gap-2 pl-5">
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{item.tag}</span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Become a <span style={{ color: "#4ADE80" }}>NOVA Node</span> and earn with every encrypted route.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Contributors host the paid tier. When enterprise subscribers connect through your node, 80% of the subscription
              value is transferred to your wallet. Aeterna automatically retains 20% to operate the verification, routing, and
              compliance fabric.
            </p>
            <ol className="space-y-6">
              {nodeEconomy.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-sm font-semibold text-[var(--text-status-warning)]">
                    {index + 1}
                  </span>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
              <span className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-warning)]">Zero downtime SLAs</span>
              <span className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-error)]">Automated payouts</span>
              <span className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-secondary)]">Multi-device binaries</span>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Mesh telemetry</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {telemetryBursts.map((burst) => (
                <div key={burst.label} className="relative flex flex-col gap-1 pl-4">
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-light)]" aria-hidden="true" />
                  <span
                    className={`text-[11px] uppercase tracking-[0.24em] ${
                      burst.tone === "critical"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-status-warning)]"
                    }`}
                  >
                    {burst.label}
                  </span>
                  <span className="text-lg font-semibold text-[var(--text-primary)]">{burst.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Proof of quality</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="h-5 w-5 text-[var(--text-status-warning)]" />
                  Hardware attestation with automatic posture scoring.
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Layers className="h-5 w-5 text-[var(--text-status-warning)]" />
                  Layered isolation prevents cross-tenant visibility.
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Zap className="h-5 w-5 text-[var(--text-status-error)]" />
                  Adaptive throttling protects consumers and node operators.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Build on top of the NOVA fabric.</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Use our open tooling or integrate enterprise governance to weave NOVA directly into your data pipelines, testing
              harnesses, and mission infrastructure.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {developerKits.map((kit) => (
              <div key={kit.title} className="relative flex flex-col gap-3 pl-5">
                <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">{kit.title}</p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{kit.description}</p>
                <Link
                  href={kit.href as any}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  View brief
                </Link>
              </div>
            ))}
          </div>
        </section>

        <AccessPortal />
      </main>
      <Footer />
    </>
  );
}
