"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

const knowledgeBase = [
  {
    title: "Atlas deployment guide",
    summary: "Spin up multi-agent research clusters with compliance overlays.",
    href: "/docs/atlas/deployment",
    tag: "#AtlasOps"
  },
  {
    title: "NOVA Proxy credentials",
    summary: "Request and rotate zero-knowledge access tokens for the free proxy network.",
    href: "/network/nova-proxy/credentials",
    tag: "#Network"
  },
  {
    title: "Aeterna Pay settlements",
    summary: "Integrate the zero-fee crypto treasury and automate payouts.",
    href: "/platform/aeterna-pay/settlement",
    tag: "#Finance"
  },
  {
    title: "NeuroWeave trials",
    summary: "Review current implant protocols and longevity research cohorts.",
    href: "/bio/neuro-weave/trials",
    tag: "#Biomed"
  },
  {
    title: "Sentient Cloud roadmap",
    summary: "Planned upgrades for orbital relays, sovereign regions, and mission orchestration.",
    href: "/platform/sentient-cloud/roadmap",
    tag: "#Cloud"
  }
];

const rotatingExamples = [
  "#Atlas agents designing orbital ports",
  "#NeuroOps realtime feed",
  "#AeternaPay invoicing guide",
  "#QuantumZeroTrust rollout",
  "#Vitality longevity papers"
];

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const timer = window.setInterval(() => {
      setExampleIndex((index) => (index + 1) % rotatingExamples.length);
    }, 2600);

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.clearInterval(timer);
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    if (!query) {
      return knowledgeBase;
    }
    const normalized = query.toLowerCase();
    return knowledgeBase.filter((item) =>
      [item.title, item.summary, item.tag].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[105] flex items-start justify-center bg-[var(--bg-scrim)] px-4 pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search across Aeterna"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-3xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-primary)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border-default)] px-5 py-4">
              <Search className="h-4 w-4 text-[var(--icon-secondary)]" />
              <input
                autoFocus
                type="search"
                placeholder={rotatingExamples[exampleIndex]}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="flex-1 bg-transparent text-sm text-[var(--text-secondary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
              />
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                <Command className="h-3.5 w-3.5" />
                K
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-[360px] overflow-y-auto px-5 py-5">
              {filtered.map((item) => (
                <li key={item.title} className="border-b border-[var(--border-light)] py-4 last:border-none">
                  <Link href={item.href as any} className="group flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-status-warning)]">{item.tag}</span>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-status-warning)]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{item.summary}</p>
                  </Link>
                </li>
              ))}
              {filtered.length === 0 ? (
                <li className="py-10 text-center text-sm text-[var(--text-tertiary)]">
                  No results for “{query}”. Try another signal.
                </li>
              ) : null}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
