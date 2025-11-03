"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MegaMenu } from "./mega-menu";
import { AeternaLogo } from "./aeterna-logo";
import { AuthModal } from "./auth-modal";
import { SearchModal } from "./search-modal";

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

type SecondaryPanelItem = {
  title: string;
  description: string;
  href: string;
  tone?: "positive" | "critical";
  meta?: string;
};

type SecondaryPanelGroup = {
  title: string;
  items: SecondaryPanelItem[];
};

type TopNavItem =
  | { id: string; label: string; type: "mega" | "secondary" }
  | { id: string; label: string; type: "anchor"; href: string };

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
        preview:
          "Atlas coordinates thousands of model collectives to design, debate, and execute missions without human latency.",
        metrics: ["Agent mesh", "Alignment core", "Mission studio"]
      },
      {
        title: "Helios Model Suite",
        summary: "Multimodal models for neuromorphic biology and synthetic matter.",
        href: "/ai/helios",
        focus: "Bio-systems cognition",
        preview:
          "Helios blends biological data, materials research, and orbital telemetry to build living intelligence blueprints.",
        metrics: ["Bio-compute", "Adaptive memory", "Compliance"]
      },
      {
        title: "AIDev Mesh",
        summary: "Collaborative workspace for training and validating AI teams in real time.",
        href: "/ai/aidev-mesh",
        focus: "Coordinated development",
        preview:
          "AIDev Mesh provides a secure arena for multi-tenant agents, with review boards, deployment locks, and provenance logs.",
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
        preview:
          "NOVA wraps every request in rotating identities, while maintaining observability for enterprise audits.",
        metrics: ["<3ms latency", "Global PoPs", "Open SDK"]
      },
      {
        title: "Aeterna EdgeGrid",
        summary: "Deterministic edge compute for cities, labs, and low-earth orbit.",
        href: "/network/edge-grid",
        focus: "Sovereign edge cloud",
        preview:
          "EdgeGrid pairs quantum key distribution with deterministic scheduling to secure mission-critical workloads.",
        metrics: ["Deterministic", "PQ secure", "Operator console"]
      },
      {
        title: "Synapse Mesh",
        summary: "Self-organizing network for robots, implants, and autonomous habitats.",
        href: "/network/synapse-mesh",
        focus: "Cyber-biological link",
        preview:
          "Synapse Mesh streams neural telemetry to implants and prosthetics with adaptive bandwidth shaping.",
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
        title: "Aeterna Pay",
        summary: "Zero-fee wallets and programmable settlement for individuals and enterprises.",
        href: "/crypto/aeterna-pay",
        badge: "launch",
        focus: "Commerce fabric",
        preview:
          "Aeterna Pay fuses biometric identity, multi-asset wallets, and automated treasury orchestration under one control plane.",
        metrics: ["Zero fee", "NFC transfers", "Treasury APIs"]
      },
      {
        title: "DePIN Orchestration Network",
        summary: "Programmable economy for physical networks and autonomy fleets.",
        href: "/crypto/depin",
        focus: "Economy control plane",
        preview:
          "Govern thousands of edge devices with composite DAOs, revenue splits, and automated compliance.",
        metrics: ["DAO mesh", "Revenue share", "Telemetry"]
      },
      {
        title: "Post-Quantum Vault",
        summary: "Custodial vault with PQC key orchestration for AI and biomedical assets.",
        href: "/crypto/vault",
        focus: "Secure key fabric",
        preview:
          "Vault orchestrates lattice-based cryptography for models, neural data, and diplomatic archives.",
        metrics: ["PQC", "Key rotation", "Hardware enclaves"]
      },
      {
        title: "Consensus Fabric",
        summary: "Digital identity and governance rails for critical infrastructure.",
        href: "/crypto/consensus",
        focus: "Institutional trust",
        preview:
          "Consensus Fabric issues verifiable credentials and notarizes every machine decision across jurisdictions.",
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
        preview:
          "NeuroWeave maps neural rhythms into digital twins while delivering haptic feedback across the nervous system.",
        metrics: ["Neural mesh", "Bio feedback", "Clinical ops"]
      },
      {
        title: "Aeterna Vitality Labs",
        summary: "Longevity, regeneration, and cellular reprogramming initiatives.",
        href: "/bio/vitality-labs",
        focus: "Regenerative biology",
        preview:
          "Vitality Labs fuses gene editing, synthetic organs, and AI diagnostics to extend human capability.",
        metrics: ["Regeneration", "Biofoundry", "Clinical trials"]
      },
      {
        title: "Adaptive Prosthetics",
        summary: "Bionic prosthetics with neural control and sensory feedback.",
        href: "/bio/adaptive-prosthetics",
        focus: "Responsive mobility",
        preview:
          "Adaptive Prosthetics translate neural intentions into motion with sub-sensory latency and learning loops.",
        metrics: ["Motor control", "Sensory", "Custom fit"]
      }
    ]
  }
];

const SECONDARY_MENUS: Record<string, SecondaryPanelGroup[]> = {
  research: [
    {
      title: "Research streams",
      items: [
        {
          title: "Immortality Initiative",
          description: "Long-horizon trials for consciousness continuity and regenerative medicine.",
          href: "/research/immortality",
          tone: "positive"
        },
        {
          title: "Cybernetic BioLabs",
          description: "Implants, neural recording, and adaptive prosthetics with live telemetry.",
          href: "/research/cybernetic-biolabs"
        },
        {
          title: "Containment Protocols",
          description: "Risk management for autonomous agents, pathogens, and synthetic organisms.",
          href: "/research/containment",
          tone: "critical"
        }
      ]
    },
    {
      title: "Briefings",
      items: [
        {
          title: "Mission Atlas",
          description: "Weekly directives for autonomous exploration squads across orbit and deep sea.",
          href: "/briefs/mission-atlas"
        },
        {
          title: "NeuroWeave Clinical",
          description: "Regulatory dashboards, compliance notes, and neural feedback scoring.",
          href: "/briefs/neuro-clinical",
          tone: "critical"
        },
        {
          title: "Synthesis Insights",
          description: "Highlights from material science labs, robotics foundries, and quantum comms.",
          href: "/briefs/synthesis",
          tone: "positive"
        }
      ]
    }
  ],
  access: [
    {
      title: "Access tiers",
      items: [
        {
          title: "Open Research",
          description: "Atlas playgrounds, NOVA proxy, and transparency reports.",
          href: "/access/open",
          tone: "positive"
        },
        {
          title: "Strategic Alliance",
          description: "DePIN orchestration, robotics missions, and sovereign regions onboarding.",
          href: "/access/strategic"
        },
        {
          title: "Sovereign Command",
          description: "Joint labs, quantum cryptography, and mission governance audits.",
          href: "/access/sovereign",
          tone: "critical"
        }
      ]
    },
    {
      title: "Credential fabric",
      items: [
        {
          title: "Aeterna Pass",
          description: "Unified biometric credential to traverse AI, biotech, and orbital facilities.",
          href: "/platform/pass"
        },
        {
          title: "Audit console",
          description: "Live compliance scoring, behavioral analytics, and anomaly response.",
          href: "/platform/audit",
          tone: "critical"
        },
        {
          title: "Partner onboarding",
          description: "Secure exchange for governments, enterprises, and universities.",
          href: "/partners/onboarding",
          tone: "positive"
        }
      ]
    }
  ],
  company: [
    {
      title: "About Aeterna",
      items: [
        {
          title: "Corporate Manifesto",
          description: "Our doctrine for synchronizing intelligence, biology, and infrastructure.",
          href: "/company/manifesto",
          tone: "positive"
        },
        {
          title: "Ethics & Governance",
          description: "Alignment frameworks, containment councils, and escalation paths.",
          href: "/company/governance",
          tone: "critical"
        },
        {
          title: "Leadership",
          description: "Global executives guiding AI, biotech, cryptography, and orbital missions.",
          href: "/company/leadership"
        }
      ]
    },
    {
      title: "Careers & missions",
      items: [
        {
          title: "Mission briefs",
          description: "Live openings for intelligence architects, bioengineers, and roboticists.",
          href: "/careers/missions"
        },
        {
          title: "Fellowships",
          description: "Invite-only residencies across quantum security and regenerative science.",
          href: "/careers/fellowships",
          tone: "positive"
        },
        {
          title: "Security clearance",
          description: "Red and black clearance procedures for sensitive facilities.",
          href: "/careers/security",
          tone: "critical"
        }
      ]
    }
  ]
};

const TOP_NAV: TopNavItem[] = [
  { id: "ecosystem", label: "Ecosystem", type: "mega" },
  { id: "research", label: "Research & Labs", type: "secondary" },
  { id: "access", label: "Access", type: "secondary" },
  { id: "company", label: "Company", type: "secondary" },
  { id: "programs", label: "Programs", type: "anchor", href: "#programs" },
  { id: "insights", label: "Insights", type: "anchor", href: "#insights" }
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const closeMenus = () => setOpenMenu(null);

  const toggleMenu = (id: string) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-primary)]"
      onMouseLeave={closeMenus}
    >
      <div className="relative mx-auto flex h-20 w-full max-w-[1440px] items-center gap-8 px-4 lg:px-12">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Aeterna Technology — home"
        >
          <AeternaLogo className="h-8 shrink-0 lg:h-9" />
        </Link>
        <div className="hidden flex-1 items-stretch lg:flex">
          <nav className="flex h-full flex-1 items-stretch gap-2 text-sm font-medium">
            {TOP_NAV.map((item) => {
              if (item.type === "anchor") {
                return (
                  <Link
                    key={item.id}
                    href={item.href as any}
                    className="flex h-full items-center gap-2 border-b-2 border-transparent px-0 pb-1 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    onFocus={closeMenus}
                    onMouseEnter={closeMenus}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openMenu === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`flex h-full items-center gap-2 border-b-2 px-0 pb-1 leading-none transition ${
                    isOpen
                      ? "border-[var(--text-status-warning)] text-[var(--text-primary)]"
                      : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  onClick={() => toggleMenu(item.id)}
                  onMouseEnter={() => setOpenMenu(item.id)}
                  onFocus={() => setOpenMenu(item.id)}
                  aria-expanded={isOpen}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      isOpen ? "text-[var(--text-status-warning)]" : "text-[var(--icon-tertiary)]"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
        <div
          className="ml-auto flex items-center gap-3"
          onMouseEnter={closeMenus}
          onFocusCapture={closeMenus}
        >
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] lg:flex"
          >
            <Search className="h-4 w-4 text-[var(--icon-secondary)]" />
            Search
          </button>
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] lg:flex"
          >
            <UserRound className="h-4 w-4 text-[var(--icon-secondary)]" />
            Sign in
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)] lg:hidden"
            aria-label="Open navigation"
            aria-expanded={openMenu !== null}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      <MegaMenu open={openMenu === "ecosystem"} sections={NAVIGATION} />
      <SecondaryMenu open={openMenu === "research"} groups={SECONDARY_MENUS.research} />
      <SecondaryMenu open={openMenu === "access"} groups={SECONDARY_MENUS.access} />
      <SecondaryMenu open={openMenu === "company"} groups={SECONDARY_MENUS.company} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function SecondaryMenu({ open, groups }: { open: boolean; groups: SecondaryPanelGroup[] }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full z-40 mt-[-1px] border-y border-[var(--border-default)] bg-[var(--bg-primary)]"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-10 md:grid-cols-2 lg:grid-cols-3 lg:px-12">
            {groups.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{group.title}</p>
                <ul className="space-y-3">
                  {group.items.map((item) => {
                    const toneClass =
                      item.tone === "positive"
                        ? "text-[var(--text-status-warning)]"
                        : item.tone === "critical"
                          ? "text-[var(--text-status-error)]"
                          : "text-[var(--text-primary)]";

                    return (
                      <li key={item.title}>
                        <Link
                          href={item.href as any}
                          className="group flex items-start justify-between gap-4 border-b border-[var(--border-light)] pb-4"
                        >
                          <div className="space-y-1">
                            <p className={`text-sm font-semibold ${toneClass}`}>{item.title}</p>
                            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                          </div>
                          <ChevronRight className="mt-1 h-4 w-4 text-[var(--icon-tertiary)] transition group-hover:translate-x-1" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

