"use client";

import { Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MegaMenu } from "./mega-menu";

type NavigationItem = {
  title: string;
  summary: string;
  href: string;
  badge?: string;
  focus: string;
  preview: string;
  metrics: string[];
};

type NavigationSection = {
  id: string;
  title: string;
  description: string;
  meta: string;
  items: NavigationItem[];
};

const NAVIGATION: NavigationSection[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Neural engines, autonomous agents, and sovereign cognition stacks.",
    meta: "Cognitive architecture",
    items: [
      {
        title: "Atlas Cognitive Engine",
        summary: "Planetscale agency orchestration with embedded governance modules.",
        href: "/ai/atlas",
        badge: "beta",
        focus: "Autonomous research fleets",
        preview: "Atlas coordinates thousands of model collectives to design, debate, and execute missions without human latency.",
        metrics: ["Agent mesh", "Alignment core", "Mission studio"]
      },
      {
        title: "Helios Model Suite",
        summary: "Multimodal models for neuromorphic biology and synthetic matter.",
        href: "/ai/helios",
        focus: "Bio-systems cognition",
        preview: "Helios blends biological data, materials research, and orbital telemetry to build living intelligence blueprints.",
        metrics: ["Bio-compute", "Adaptive memory", "Compliance"]
      },
      {
        title: "AIDev Mesh",
        summary: "Collaborative workspace for training and validating AI teams in real time.",
        href: "/ai/aidev-mesh",
        focus: "Coordinated development",
        preview: "AIDev Mesh provides a secure arena for multi-tenant agents, with review boards, deployment locks, and provenance logs.",
        metrics: ["Version spine", "Secure sandbox", "Telemetry"]
      }
    ]
  },
  {
    id: "network",
    title: "Network & Edge",
    description: "Quantum links, adaptive proxies, and orbital-grade connectivity fabrics.",
    meta: "Communications lattice",
    items: [
      {
        title: "NOVA Free Proxy",
        summary: "Global privacy mesh with adaptive routing and programmable ingress.",
        href: "/network/nova-proxy",
        badge: "new",
        focus: "Open relay fabric",
        preview: "NOVA wraps every request in rotating identities, while maintaining observability for enterprise audits.",
        metrics: ["<3ms latency", "Global PoPs", "Open SDK"]
      },
      {
        title: "Aeterna EdgeGrid",
        summary: "Deterministic edge compute for cities, labs, and low-earth orbit.",
        href: "/network/edge-grid",
        focus: "Sovereign edge cloud",
        preview: "EdgeGrid pairs quantum key distribution with deterministic scheduling to secure mission-critical workloads.",
        metrics: ["Deterministic", "PQ secure", "Operator console"]
      },
      {
        title: "Synapse Mesh",
        summary: "Self-organizing network for robots, implants, and autonomous habitats.",
        href: "/network/synapse-mesh",
        focus: "Cyber-biological link",
        preview: "Synapse Mesh streams neural telemetry to implants and prosthetics with adaptive bandwidth shaping.",
        metrics: ["Neural QoS", "Mesh governance", "Edge AI"]
      }
    ]
  },
  {
    id: "crypto",
    title: "Crypto & Trust",
    description: "Decentralized infrastructure, finance primitives, and post-quantum security.",
    meta: "Trusted autonomy",
    items: [
      {
        title: "DePIN Orchestration Network",
        summary: "Programmable economy for physical networks and autonomy fleets.",
        href: "/crypto/depin",
        focus: "Economy control plane",
        preview: "Govern thousands of edge devices with composite DAOs, revenue splits, and automated compliance.",
        metrics: ["DAO mesh", "Revenue share", "Telemetry"]
      },
      {
        title: "Post-Quantum Vault",
        summary: "Custodial vault with PQC key orchestration for AI and biomedical assets.",
        href: "/crypto/vault",
        focus: "Secure key fabric",
        preview: "Vault orchestrates lattice-based cryptography for models, neural data, and diplomatic archives.",
        metrics: ["PQC", "Key rotation", "Hardware enclaves"]
      },
      {
        title: "Consensus Fabric",
        summary: "Digital identity and governance rails for critical infrastructure.",
        href: "/crypto/consensus",
        focus: "Institutional trust",
        preview: "Consensus Fabric issues verifiable credentials and notarizes every machine decision across jurisdictions.",
        metrics: ["Identity", "Audit", "Policy"]
      }
    ]
  },
  {
    id: "biotech",
    title: "Bioengineering",
    description: "Implants, longevity, regeneration, and sensory augmentation platforms.",
    meta: "Living systems",
    items: [
      {
        title: "NeuroWeave Implants",
        summary: "Brain-computer interfaces with adaptive neurovascular architecture.",
        href: "/bio/neuro-weave",
        focus: "Consciousness continuity",
        preview: "NeuroWeave maps neural rhythms into digital twins while delivering haptic feedback across the nervous system.",
        metrics: ["Neural mesh", "Bio feedback", "Clinical ops"]
      },
      {
        title: "Aeterna Vitality Labs",
        summary: "Longevity, regeneration, and cellular reprogramming initiatives.",
        href: "/bio/vitality-labs",
        focus: "Regenerative biology",
        preview: "Vitality Labs fuses gene editing, synthetic organs, and AI diagnostics to extend human capability.",
        metrics: ["Regeneration", "Biofoundry", "Clinical trials"]
      },
      {
        title: "Adaptive Prosthetics",
        summary: "Bionic prosthetics with neural control and sensory feedback.",
        href: "/bio/adaptive-prosthetics",
        focus: "Responsive mobility",
        preview: "Adaptive Prosthetics translate neural intentions into motion with sub-sensory latency and learning loops.",
        metrics: ["Motor control", "Sensory", "Custom fit"]
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
        background: scrolled ? "rgba(26,26,26,0.95)" : "rgba(26,26,26,0.7)",
        backdropFilter: "blur(14px)",
        borderColor: scrolled ? "var(--border-default)" : "transparent"
      }}
    >
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wider">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] font-display text-base uppercase text-[var(--text-inverted)]">
            AT
          </span>
          <span className="font-display text-xl uppercase tracking-[0.24em] text-[var(--text-secondary)]">
            Aeterna Technology
          </span>
        </Link>
        <nav className="hidden gap-6 lg:flex">
          <button
            type="button"
            onMouseEnter={() => setMenuOpen(true)}
            onFocus={() => setMenuOpen(true)}
            className="relative text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Ecosystem
          </button>
          <a className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]" href="#programs">
            Programs
          </a>
          <a className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]" href="#insights">
            Research
          </a>
          <a className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]" href="#access">
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)]/70 text-[var(--icon-secondary)] transition hover:border-[var(--border-heavy)] hover:text-[var(--text-primary)] lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <div
        className="hidden lg:block"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <MegaMenu open={menuOpen} sections={NAVIGATION} />
      </div>
    </header>
  );
}
