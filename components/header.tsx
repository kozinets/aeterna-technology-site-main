"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MegaMenu } from "./mega-menu";

const NAVIGATION = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Neural networks, agentic systems, and sovereign compute clouds.",
    items: [
      {
        title: "Atlas Cognitive Engine",
        summary: "A generative stack for orchestrating autonomous digital ecosystems.",
        href: "/ai/atlas",
        badge: "beta"
      },
      {
        title: "Helios Model Suite",
        summary: "Models for bioinformatics, neuromorphic computing, and synthetic data.",
        href: "/ai/helios"
      },
      {
        title: "AIDev Mesh",
        summary: "Real-time collaboration network for training and testing AI teams.",
        href: "/ai/aidev-mesh"
      }
    ]
  },
  {
    id: "network",
    title: "Network & Edge",
    description: "Secure networks, quantum links, and adaptive proxy fabrics.",
    items: [
      {
        title: "NOVA Free Proxy",
        summary: "A global proxy mesh with dynamic routing and quantum-grade resilience.",
        href: "/network/nova-proxy",
        badge: "new"
      },
      {
        title: "Aeterna EdgeGrid",
        summary: "Deterministic edge compute fabric for low-latency operations.",
        href: "/network/edge-grid"
      },
      {
        title: "Synapse Mesh",
        summary: "Self-organizing networks for robots, implants, and autonomous labs.",
        href: "/network/synapse-mesh"
      }
    ]
  },
  {
    id: "crypto",
    title: "Crypto & Trust",
    description: "Decentralized infrastructure and post-quantum security services.",
    items: [
      {
        title: "DePIN Orchestration Network",
        summary: "Operational control and monetization for next-gen physical networks.",
        href: "/crypto/depin"
      },
      {
        title: "Post-Quantum Vault",
        summary: "Custodial vault with PQC key orchestration for AI and biomedical assets.",
        href: "/crypto/vault"
      },
      {
        title: "Consensus Fabric",
        summary: "Digital identity and trusted compute governance platform.",
        href: "/crypto/consensus"
      }
    ]
  },
  {
    id: "biotech",
    title: "Bioengineering",
    description: "Implants, prosthetics, longevity research, and regenerative medicine.",
    items: [
      {
        title: "NeuroWeave Implants",
        summary: "Brain-computer interfaces with adaptive micro-architecture.",
        href: "/bio/neuro-weave"
      },
      {
        title: "Aeterna Vitality Labs",
        summary: "Longevity, regeneration, and cellular reprogramming initiatives.",
        href: "/bio/vitality-labs"
      },
      {
        title: "Adaptive Prosthetics",
        summary: "Bionic prosthetics with neural control and sensory feedback.",
        href: "/bio/adaptive-prosthetics"
      }
    ]
  }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-transparent px-8 py-4 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(24,24,24,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderColor: scrolled ? "var(--border-default)" : "transparent"
      }}
    >
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wider">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] font-display text-base uppercase text-[var(--text-accent)] shadow-[0_0_40px_rgba(102,181,255,0.2)]">
            AT
          </span>
          <span className="font-display text-xl uppercase tracking-[0.24em] text-[var(--text-primary)]">
            Aeterna Technology
          </span>
        </Link>
        <nav className="hidden gap-6 lg:flex">
          <button
            type="button"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onFocus={() => setMenuOpen(true)}
            className="relative text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-accent)]"
          >
            Ecosystem
          </button>
          <a className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-accent)]" href="#programs">
            Programs
          </a>
          <a className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-accent)]" href="#insights">
            Research
          </a>
          <a className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-accent)]" href="#access">
            Access
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={"/platform/login" as any}
          className="hidden items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-secondary-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--interactive-bg-secondary-hover)] lg:flex"
        >
          <UserRound className="h-4 w-4 text-[var(--icon-secondary)]" />
          Sign in
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)]/60 text-[var(--icon-secondary)] transition hover:border-[var(--border-heavy)] hover:text-[var(--text-accent)]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="absolute left-1/2 top-full z-40 hidden w-full max-w-[1200px] -translate-x-1/2 lg:block"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <MegaMenu open={menuOpen} sections={NAVIGATION} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
