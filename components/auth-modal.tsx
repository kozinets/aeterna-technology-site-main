"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, LogIn, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

type EntryPipeline = {
  title: string;
  description: string;
  artifacts: string[];
};

type EntryPoint = {
  title: string;
  description: string;
  href: string;
  icon: typeof ShieldCheck;
  accent: string;
  pipeline: EntryPipeline[];
  requirements: string[];
  support: { label: string; value: string }[];
};

const entryPoints: EntryPoint[] = [
  {
    title: "Aeterna Pass",
    description: "Unified biometric identity with adaptive trust scores for all corporate surfaces.",
    href: "/platform/pass",
    icon: ShieldCheck,
    accent: "#Clearance",
    pipeline: [
      {
        title: "Biometric handshake",
        description: "Enroll neural signature, facial scan, and quantum-safe key pair inside the credential fabric.",
        artifacts: ["Neural imprint", "Hardware token", "PQ signature"]
      },
      {
        title: "Device attestation",
        description: "Register trusted devices with live posture scoring and configure adaptive threat responses.",
        artifacts: ["Device posture", "Geo fencing", "Risk profile"]
      },
      {
        title: "Clearance routing",
        description: "Assign facility tiers, mission roles, and emergency escalation channels across the ecosystem.",
        artifacts: ["Mission roles", "Facility tiers", "Escalation tree"]
      }
    ],
    requirements: ["2FA enforced", "Hardware attestation", "Continuous scoring"],
    support: [
      { label: "Operations", value: "pass@aeterna.global" },
      { label: "Response SLA", value: "< 4 minutes" },
      { label: "Global hubs", value: "NYC · Zurich · Singapore" }
    ]
  },
  {
    title: "Research Console",
    description: "Secure access to labs, missions, and classified knowledge briefs across divisions.",
    href: "/access/console",
    icon: Fingerprint,
    accent: "#AtlasMesh",
    pipeline: [
      {
        title: "Clearance intake",
        description: "Submit institutional credentials, mission scope, and biosecurity compliance documents.",
        artifacts: ["Institution ID", "Mission dossier", "Containment attestation"]
      },
      {
        title: "Containment alignment",
        description: "Map research cells to secure zones, configure telemetry mirrors, and define audit cadence.",
        artifacts: ["Secure zones", "Telemetry mirror", "Audit cadence"]
      },
      {
        title: "Runtime approval",
        description: "Issue time-bound session keys, launch sandboxed labs, and start adaptive oversight streams.",
        artifacts: ["Session keys", "Sandbox labs", "Oversight stream"]
      }
    ],
    requirements: ["Red/black segmentation", "Zero trust proxy", "Real-time logging"],
    support: [
      { label: "Research ops", value: "labs@aeterna.global" },
      { label: "Escalation", value: "+1-917-555-8023" },
      { label: "Active missions", value: "126" }
    ]
  },
  {
    title: "Aeterna Pay",
    description: "Zero-friction crypto commerce with institutional routing and settlement automation.",
    href: "/platform/aeterna-pay",
    icon: LogIn,
    accent: "#Settlement",
    pipeline: [
      {
        title: "Entity verification",
        description: "Configure treasury permissions, settlement jurisdictions, and compliance contacts.",
        artifacts: ["Treasury dossier", "Jurisdiction map", "Compliance lead"]
      },
      {
        title: "Wallet orchestration",
        description: "Connect custodial, self-hosted, and programmatic wallets with deterministic routing.",
        artifacts: ["Custodial link", "Smart routing", "Risk throttles"]
      },
      {
        title: "Settlement automation",
        description: "Define fee policies, instant conversions, and reporting channels for stakeholders.",
        artifacts: ["Fee policy", "Instant FX", "Reporting webhooks"]
      }
    ],
    requirements: ["AML intelligence", "On-chain analytics", "Zero fee retail"],
    support: [
      { label: "Payments desk", value: "pay@aeterna.global" },
      { label: "Ops window", value: "24/7" },
      { label: "Live volume", value: "$4.6B / 24h" }
    ]
  }
];

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [selectedEntry, setSelectedEntry] = useState<EntryPoint | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedEntry(null);
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-[var(--bg-scrim)] px-4 py-10 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Authenticate with Aeterna"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            layout
            className={`flex w-full max-h-[90vh] flex-col overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] p-6 ${
              selectedEntry ? "max-w-[90vw] lg:max-w-5xl" : "max-w-[90vw] sm:max-w-2xl"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Secure entry</p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                  Authenticate with <span className="text-[var(--text-status-warning)]">Aeterna</span> systems.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Choose the identity plane that matches your clearance level. Multifactor and hardware attestation are enforced
                  across every login event.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close authentication modal"
                className="flex h-8 w-8 items-center justify-center text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto pr-1">
              {selectedEntry ? (
                <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{selectedEntry.accent}</p>
                        <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">{selectedEntry.title} pipeline</h3>
                      </div>
                    <button
                      type="button"
                      onClick={() => setSelectedEntry(null)}
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                      ← All entry points
                    </button>
                  </div>
                  <ol className="space-y-5">
                    {selectedEntry.pipeline.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-sm font-semibold text-[var(--text-status-warning)]">
                          {index + 1}
                        </span>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{step.title}</p>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                            {step.artifacts.map((artifact) => (
                              <span
                                key={`${step.title}-${artifact}`}
                                className="rounded-full border border-[var(--border-light)] px-3 py-1"
                              >
                                #{artifact.replace(/\s+/g, "")}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                    {selectedEntry.requirements.map((requirement) => (
                      <span
                        key={`${selectedEntry.title}-${requirement}`}
                        className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-warning)]"
                      >
                        {requirement}
                      </span>
                    ))}
                  </div>
                </div>
                <aside className="space-y-6 border-l border-[var(--border-light)] pl-6">
                  <div className="flex items-center gap-3">
                    <selectedEntry.icon className="h-6 w-6 text-[var(--icon-secondary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">{selectedEntry.description}</p>
                  </div>
                  <div className="space-y-3 text-sm text-[var(--text-tertiary)]">
                    {selectedEntry.support.map((entry) => (
                      <div key={entry.label} className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{entry.label}</span>
                        <span className="text-sm text-[var(--text-secondary)]">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={selectedEntry.href as any}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-default)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    Continue to {selectedEntry.title}
                    <LogIn className="h-4 w-4" />
                  </Link>
                </aside>
              </div>
            ) : (
              <>
                <ul className="grid gap-4 sm:grid-cols-3">
                  {entryPoints.map((entry) => (
                    <li key={entry.title} className="group flex flex-col gap-3 border border-[var(--border-light)] p-4 transition hover:border-[var(--border-default)]">
                      <div className="flex items-center gap-3">
                        <entry.icon className="h-5 w-5 text-[var(--icon-secondary)]" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{entry.accent}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{entry.title}</h3>
                      <p className="flex-1 text-sm text-[var(--text-secondary)]">{entry.description}</p>
                      <button
                        type="button"
                        onClick={() => setSelectedEntry(entry)}
                        className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-status-warning)] transition hover:text-[var(--text-primary)]"
                      >
                        Continue
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                  Need assistance? <span className="text-[var(--text-status-error)]">security@aeterna.global</span>
                </p>
              </>
            )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
