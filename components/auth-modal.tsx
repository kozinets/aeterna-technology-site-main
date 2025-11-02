"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, LogIn, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

const entryPoints = [
  {
    title: "Aeterna Pass",
    description: "Unified biometric identity with adaptive trust scores for all corporate surfaces.",
    href: "/platform/pass",
    icon: ShieldCheck,
    accent: "#Clearance"
  },
  {
    title: "Research Console",
    description: "Secure access to labs, missions, and classified knowledge briefs across divisions.",
    href: "/access/console",
    icon: Fingerprint,
    accent: "#AtlasMesh"
  },
  {
    title: "Aeterna Pay",
    description: "Zero-friction crypto commerce with institutional routing and settlement automation.",
    href: "/platform/aeterna-pay",
    icon: LogIn,
    accent: "#Settlement"
  }
];

export function AuthModal({ open, onClose }: AuthModalProps) {
  useEffect(() => {
    if (!open) {
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
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[var(--bg-scrim)] px-4"
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
            className="w-full max-w-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-primary)] p-6"
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
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {entryPoints.map((entry) => (
                <li key={entry.title} className="group flex flex-col gap-3 border border-[var(--border-light)] p-4 transition hover:border-[var(--border-default)]">
                  <div className="flex items-center gap-3">
                    <entry.icon className="h-5 w-5 text-[var(--icon-secondary)]" />
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{entry.accent}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{entry.title}</h3>
                  <p className="flex-1 text-sm text-[var(--text-secondary)]">{entry.description}</p>
                  <Link
                    href={entry.href as any}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-status-warning)] transition hover:text-[var(--text-primary)]"
                  >
                    Continue
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              Need assistance? <span className="text-[var(--text-status-error)]">security@aeterna.global</span>
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
