import { AccessPortal } from "@/components/access-portal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ArrowRight, Banknote, CheckCircle2, Fingerprint, Lock, Smartphone, Wallet } from "lucide-react";
import Link from "next/link";

const paymentHighlights = [
  {
    tag: "#ZeroFee",
    title: "Zero-fee transfers",
    detail: "Move value between wallets instantly with no fees for personal accounts and deterministic micro fees for merchants."
  },
  {
    tag: "#AnyAsset",
    title: "Multi-asset orchestration",
    detail: "Hold stablecoins, L2 assets, and NFTs in one ledger with automatic conversion policies and programmable routing."
  },
  {
    tag: "#Identity",
    title: "Neural-grade identity",
    detail: "Biometric Aeterna Pass credentials secure every payment with adaptive risk scoring and hardware attestation."
  }
];

const enterpriseJourney = [
  {
    title: "Authenticate your organisation",
    description:
      "Submit corporate credentials, treasury policies, and regulatory documents to receive verified Aeterna Pay institution status."
  },
  {
    title: "Connect ledgers and rails",
    description:
      "Link custodial wallets, self-hosted nodes, and fiat on-ramps while configuring automated settlement and reporting lanes."
  },
  {
    title: "Launch programmable commerce",
    description:
      "Expose APIs for checkout, invoicing, payroll, and treasury rebalancing with deterministic fees and compliance mirrors."
  }
];

const settlementSignals = [
  { label: "Daily volume", value: "$4.6B", tone: "positive" as const },
  { label: "Merchants", value: "92,000", tone: "positive" as const },
  { label: "Average confirmation", value: "1.8s", tone: "positive" as const },
  { label: "Fraud incidents", value: "0 active", tone: "critical" as const }
];

const walletCapabilities = [
  {
    title: "Peer-to-peer and contactless",
    description:
      "Send to usernames, device links, or NFC tap-to-transfer using encrypted session codes that expire instantly after delivery."
  },
  {
    title: "Smart requests",
    description:
      "Generate invoices, share payment links, or broadcast subscription flows with built-in settlement status tracking."
  },
  {
    title: "Programmable treasury",
    description: "Automate rules for auto-sweep, multi-sig approvals, and cross-border payroll with zero manual reconciliation."
  }
];

export default function AeternaPayPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-12 sm:px-8 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Crypto & Trust</span>
            <h1 className="text-4xl font-semibold text-[var(--text-primary)] md:text-5xl">
              <span style={{ color: "#4ADE80" }}>Aeterna Pay</span> — frictionless crypto commerce for civilisation-scale economies.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Aeterna Pay unifies wallets, compliance, and settlement automation. Individuals move value without paying fees. Teams and
              enterprises orchestrate treasury flows with programmable governance and reporting rails.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-[var(--text-status-warning)]" />
                <span>Personal wallets in seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-[var(--text-status-warning)]" />
                <span>Zero-fee consumer payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="h-5 w-5 text-[var(--text-status-error)]" />
                <span>Adaptive identity checks</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={"/apps/aeterna-pay" as any}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Create your wallet
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={"/docs/aeterna-pay" as any}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Review API guide
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Platform pillars</p>
            <ul className="space-y-5">
              {paymentHighlights.map((highlight) => (
                <li key={highlight.tag} className="relative flex flex-col gap-2 pl-5">
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{highlight.tag}</span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{highlight.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{highlight.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              One <span style={{ color: "#4ADE80" }}>institutional pipeline</span> for every merchant, DAO, and sovereign treasury.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              End-to-end automation removes reconciliation work. Connect your ledgers once and Aeterna Pay enforces policies across every
              channel — checkout, payroll, cross-border remittances, and micro-transactions.
            </p>
            <ol className="space-y-6">
              {enterpriseJourney.map((item, index) => (
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
              <span className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-warning)]">On-chain compliance</span>
              <span className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-error)]">Programmable fees</span>
              <span className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-secondary)]">Instant treasury sync</span>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Settlement signals</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {settlementSignals.map((signal) => (
                <div key={signal.label} className="relative flex flex-col gap-1 pl-4">
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-light)]" aria-hidden="true" />
                  <span
                    className={`text-[11px] uppercase tracking-[0.24em] ${
                      signal.tone === "critical"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-status-warning)]"
                    }`}
                  >
                    {signal.label}
                  </span>
                  <span className="text-lg font-semibold text-[var(--text-primary)]">{signal.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Guard rails</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="h-5 w-5 text-[var(--text-status-warning)]" />
                  Real-time AML and sanctions screening with verifiable reporting.
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Lock className="h-5 w-5 text-[var(--text-status-warning)]" />
                  Multi-factor governance and custom approval ladders for high-value flows.
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Smartphone className="h-5 w-5 text-[var(--text-status-error)]" />
                  Device binding and NFC tap-to-authorise for instant peer transfers.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">A wallet engineered for every scenario.</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Aeterna Pay bridges consumer simplicity with institutional controls. Build shared vaults, automate disbursements, and move
              value with nothing more than a username or NFC tap.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {walletCapabilities.map((capability) => (
              <div key={capability.title} className="relative flex flex-col gap-3 pl-5">
                <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">{capability.title}</p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{capability.description}</p>
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
