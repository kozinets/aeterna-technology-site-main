"use client";

import { ArrowUpRight, Check, ChevronDown, ChevronUp, GripVertical, PlayCircle, Plus, RefreshCw, Save, Trash2, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import * as d3 from "d3";

type MenuLink = {
  id: string;
  title: string;
  href: string;
  summary: string;
  badge?: string;
};

type MenuSection = {
  id: string;
  label: string;
  description: string;
  items: MenuLink[];
};

type LandingBlock = {
  id: string;
  label: string;
  type: "hero" | "ticker" | "story" | "research" | "cta";
  status: "live" | "draft" | "scheduled";
  accent: "positive" | "critical" | "neutral";
  summary: string;
};

type ResearchDraft = {
  id: string;
  title: string;
  lead: string;
  readiness: "ideation" | "peer-review" | "ready";
  figures: number;
  attachments: number;
};

type DataFeed = {
  id: string;
  label: string;
  endpoint: string;
  interval: number;
  secure: boolean;
  format: "json" | "csv" | "protobuf";
  status: "live" | "paused" | "error";
  lastSync: string;
};

type ReleaseBlueprint = {
  id: string;
  product: string;
  headline: string;
  owner: string;
  status: "design" | "review" | "published";
  metrics: { label: string; value: string }[];
  lastPublished: string;
  hasD3: boolean;
};

const initialMenu: MenuSection[] = [
  {
    id: "ecosystem",
    label: "Ecosystem",
    description: "Programs spanning AI, networks, crypto, and bioengineering.",
    items: [
      {
        id: "nova-proxy",
        title: "NOVA Free Proxy",
        href: "/network/nova-proxy",
        summary: "Adaptive relay fabric with open and incentivized node pools.",
        badge: "launch"
      },
      {
        id: "aeterna-pay",
        title: "Aeterna Pay",
        href: "/crypto/aeterna-pay",
        summary: "Zero-fee crypto treasury with enterprise orchestration."
      },
      {
        id: "neuro-weave",
        title: "NeuroWeave Implants",
        href: "/bio/neuro-weave",
        summary: "Adaptive neural interfaces with biometric co-processors."
      }
    ]
  },
  {
    id: "research",
    label: "Research & Labs",
    description: "Scientific programs, publications, and lab operations.",
    items: [
      {
        id: "continuity",
        title: "Continuity Initiative",
        href: "/research/continuity",
        summary: "Longevity fellows documenting immortality breakthroughs.",
        badge: "priority"
      },
      {
        id: "orbital-forge",
        title: "Orbital Forge",
        href: "/orbital/forge",
        summary: "Space manufacturing arrays with deterministic QA loops."
      }
    ]
  },
  {
    id: "company",
    label: "Company",
    description: "Corporate governance, alliances, and mission charters.",
    items: [
      {
        id: "alliances",
        title: "Strategic Alliances",
        href: "/company/alliances",
        summary: "Governments, universities, and enterprises collaborating with Aeterna."
      }
    ]
  }
];

const initialBlocks: LandingBlock[] = [
  {
    id: "hero-core",
    label: "Hero intelligence",
    type: "hero",
    status: "live",
    accent: "positive",
    summary: "Rotating corporate question, search bar, and live mission thread."
  },
  {
    id: "pinned-release",
    label: "Pinned release",
    type: "story",
    status: "live",
    accent: "positive",
    summary: "NOVA Proxy launch tile with zero-latency updates."
  },
  {
    id: "research-digest",
    label: "Research digest",
    type: "research",
    status: "draft",
    accent: "neutral",
    summary: "Latest papers, pinned studies, and figure galleries."
  },
  {
    id: "livestream",
    label: "Livestream window",
    type: "cta",
    status: "scheduled",
    accent: "critical",
    summary: "Hero slot for live orbital or laboratory stream embedding."
  }
];

const initialDrafts: ResearchDraft[] = [
  {
    id: "draft-1",
    title: "Orbital biosphere regeneration",
    lead: "Atlas Continuity Group",
    readiness: "peer-review",
    figures: 12,
    attachments: 6
  },
  {
    id: "draft-2",
    title: "NeuroWeave adaptive immune mirrors",
    lead: "Vitality Labs",
    readiness: "ideation",
    figures: 4,
    attachments: 2
  }
];

const initialFeeds: DataFeed[] = [
  {
    id: "feed-1",
    label: "NOVA latency telemetry",
    endpoint: "https://api.aeterna.network/nova/latency",
    interval: 15,
    secure: true,
    format: "json",
    status: "live",
    lastSync: "12s ago"
  },
  {
    id: "feed-2",
    label: "Atlas mission counter",
    endpoint: "https://api.aeterna.ai/atlas/missions",
    interval: 30,
    secure: true,
    format: "protobuf",
    status: "paused",
    lastSync: "5m ago"
  },
  {
    id: "feed-3",
    label: "Continuity cohort size",
    endpoint: "https://api.aeterna.bio/continuity/fellows",
    interval: 60,
    secure: false,
    format: "csv",
    status: "error",
    lastSync: "18m ago"
  }
];

const initialReleases: ReleaseBlueprint[] = [
  {
    id: "release-nova",
    product: "NOVA Free Proxy",
    headline: "Zero-friction privacy mesh with node revenue sharing",
    owner: "Network Division",
    status: "published",
    metrics: [
      { label: "Active nodes", value: "6,482" },
      { label: "Avg latency", value: "2.8ms" },
      { label: "Payout volume", value: "382k ₳" }
    ],
    lastPublished: "2h ago",
    hasD3: true
  },
  {
    id: "release-pay",
    product: "Aeterna Pay",
    headline: "Programmable settlement with biometric wallets",
    owner: "Crypto Division",
    status: "review",
    metrics: [
      { label: "Wallets", value: "12.4M" },
      { label: "TPS capacity", value: "340k" },
      { label: "AML score", value: "99.98%" }
    ],
    lastPublished: "12h ago",
    hasD3: true
  },
  {
    id: "release-neuro",
    product: "NeuroWeave",
    headline: "Adaptive implants with sensory reciprocity",
    owner: "Biomedicine",
    status: "design",
    metrics: [
      { label: "Implant sites", value: "62" },
      { label: "Latency", value: "1.1ms" },
      { label: "Trials", value: "98" }
    ],
    lastPublished: "--",
    hasD3: false
  }
];

export function AdminDashboard() {
  const [menuSections, setMenuSections] = useState<MenuSection[]>(initialMenu);
  const [selectedSectionId, setSelectedSectionId] = useState<string>(initialMenu[0].id);
  const [landingBlocks, setLandingBlocks] = useState<LandingBlock[]>(initialBlocks);
  const [researchDrafts, setResearchDrafts] = useState<ResearchDraft[]>(initialDrafts);
  const [dataFeeds, setDataFeeds] = useState<DataFeed[]>(initialFeeds);
  const [releaseBlueprints, setReleaseBlueprints] = useState<ReleaseBlueprint[]>(initialReleases);
  const [livestreamEnabled, setLivestreamEnabled] = useState(true);
  const [previewHero, setPreviewHero] = useState("What mission can Aeterna elevate your civilization?");

  const selectedSection = menuSections.find((section) => section.id === selectedSectionId) ?? menuSections[0];
  const liveBlocks = useMemo(() => landingBlocks.filter((block) => block.status === "live"), [landingBlocks]);
  const upcomingBlocks = useMemo(() => landingBlocks.filter((block) => block.status !== "live"), [landingBlocks]);
  const previewMenuTotal = menuSections.reduce((total, section) => total + section.items.length, 0);

  const addMenuItem = (sectionId: string) => {
    setMenuSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        const newItem: MenuLink = {
          id: `link-${Date.now()}`,
          title: "New program placeholder",
          href: "/program/new",
          summary: "Draft description for upcoming launch.",
          badge: "draft"
        };
        return { ...section, items: [...section.items, newItem] };
      })
    );
  };

  const removeMenuItem = (sectionId: string, itemId: string) => {
    setMenuSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return { ...section, items: section.items.filter((item) => item.id !== itemId) };
      })
    );
  };

  const moveMenuItem = (sectionId: string, itemId: string, direction: -1 | 1) => {
    setMenuSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        const index = section.items.findIndex((item) => item.id === itemId);
        if (index === -1) return section;
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= section.items.length) return section;
        const reordered = [...section.items];
        const [removed] = reordered.splice(index, 1);
        reordered.splice(targetIndex, 0, removed);
        return { ...section, items: reordered };
      })
    );
  };

  const toggleBlockStatus = (blockId: string) => {
    setLandingBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId) return block;
        const nextStatus = block.status === "live" ? "draft" : "live";
        return { ...block, status: nextStatus };
      })
    );
  };

  const removeBlock = (blockId: string) => {
    setLandingBlocks((prev) => prev.filter((block) => block.id !== blockId));
  };

  const addLandingBlock = (type: LandingBlock["type"]) => {
    setLandingBlocks((prev) => [
      ...prev,
      {
        id: `block-${Date.now()}`,
        label: `${type} module draft`,
        type,
        status: "draft",
        accent: "neutral",
        summary: "New customizable layout module awaiting configuration."
      }
    ]);
  };

  const promoteDraft = (draftId: string) => {
    setResearchDrafts((prev) =>
      prev.map((draft) => {
        if (draft.id !== draftId) return draft;
        const nextStage =
          draft.readiness === "ideation"
            ? "peer-review"
            : draft.readiness === "peer-review"
              ? "ready"
              : "ready";
        return { ...draft, readiness: nextStage };
      })
    );
  };

  const toggleFeedStatus = (feedId: string) => {
    setDataFeeds((prev) =>
      prev.map((feed) => {
        if (feed.id !== feedId) return feed;
        const nextStatus = feed.status === "live" ? "paused" : "live";
        return { ...feed, status: nextStatus, lastSync: "just now" };
      })
    );
  };

  const resyncFeed = (feedId: string) => {
    setDataFeeds((prev) =>
      prev.map((feed) => {
        if (feed.id !== feedId) return feed;
        return { ...feed, lastSync: "few seconds ago", status: feed.status === "error" ? "paused" : feed.status };
      })
    );
  };

  const publishRelease = (releaseId: string) => {
    setReleaseBlueprints((prev) =>
      prev.map((release) => {
        if (release.id !== releaseId) return release;
        return { ...release, status: "published", lastPublished: "just now" };
      })
    );
  };

  const updateHeroHeadline = (value: string) => {
    setPreviewHero(value);
  };

  return (
    <section className="space-y-12">
      <div className="flex flex-col gap-4">
        <span className="badge">Administration</span>
        <h1 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
          Control the entire Aeterna digital estate from one dashboard.
        </h1>
        <p className="max-w-3xl text-sm text-[var(--text-secondary)]">
          Compose landing experiences, orchestrate mega navigation, publish research dossiers, and stream live product analytics
          without leaving this console. Every action synchronizes with the public experience in seconds.
        </p>
      </div>
      <div className="grid gap-10 xl:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="space-y-10">
          <div className="space-y-4 border border-[var(--border-default)] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Navigation planner</span>
              <span>{previewMenuTotal} entries</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {menuSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                    section.id === selectedSectionId
                      ? "bg-[var(--text-status-warning)] text-[var(--text-inverted)]"
                      : "border border-[var(--border-default)] text-[var(--text-secondary)]"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{selectedSection.label}</p>
                <p className="text-xs text-[var(--text-secondary)]">{selectedSection.description}</p>
              </div>
              <ul className="space-y-3">
                {selectedSection.items.map((item) => (
                  <li key={item.id} className="rounded border border-[var(--border-light)] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{item.summary}</p>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.href}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          type="button"
                          onClick={() => moveMenuItem(selectedSection.id, item.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                          aria-label="Move up"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveMenuItem(selectedSection.id, item.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                          aria-label="Move down"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeMenuItem(selectedSection.id, item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-status-error)]"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {item.badge ? (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-[var(--border-default)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                        <GripVertical className="h-3 w-3" />
                        {item.badge}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => addMenuItem(selectedSection.id)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                <Plus className="h-4 w-4" />
                Add navigation entry
              </button>
            </div>
          </div>
          <div className="space-y-4 border border-[var(--border-default)] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Landing composer</span>
              <span>{liveBlocks.length} live</span>
            </div>
            <div className="space-y-3">
              {landingBlocks.map((block) => (
                <div key={block.id} className="rounded border border-[var(--border-light)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{block.label}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{block.summary}</p>
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
                        <span className="rounded-full border border-[var(--border-default)] px-3 py-1">{block.type}</span>
                        <span
                          className={`rounded-full px-3 py-1 ${
                            block.status === "live"
                              ? "bg-[var(--text-status-warning)] text-[var(--text-inverted)]"
                              : block.status === "scheduled"
                                ? "border border-[var(--border-default)] text-[var(--text-secondary)]"
                                : "border border-[var(--border-default)] text-[var(--text-tertiary)]"
                          }`}
                        >
                          {block.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleBlockStatus(block.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                        aria-label="Toggle status"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(block.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-status-error)]"
                        aria-label="Remove block"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {(["hero", "story", "research", "ticker", "cta"] as LandingBlock["type"][]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addLandingBlock(type)}
                  className="flex items-center justify-center gap-2 rounded border border-[var(--border-default)] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  <Plus className="h-3 w-3" />
                  Add {type}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4 border border-[var(--border-default)] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Research publisher</span>
              <span>{researchDrafts.length} drafts</span>
            </div>
            <div className="space-y-3">
              {researchDrafts.map((draft) => (
                <div key={draft.id} className="rounded border border-[var(--border-light)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{draft.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{draft.lead}</p>
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                        <span>Figures: {draft.figures}</span>
                        <span>Attachments: {draft.attachments}</span>
                        <span>Status: {draft.readiness}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => promoteDraft(draft.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                      aria-label="Promote draft"
                    >
                      <UploadCloud className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 border border-[var(--border-default)] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Data orchestration</span>
              <span>{dataFeeds.length} feeds</span>
            </div>
            <ul className="space-y-3">
              {dataFeeds.map((feed) => (
                <li key={feed.id} className="rounded border border-[var(--border-light)] p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{feed.label}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{feed.endpoint}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFeedStatus(feed.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                          aria-label="Toggle feed"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => resyncFeed(feed.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--icon-secondary)] transition hover:text-[var(--text-status-warning)]"
                          aria-label="Resync feed"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                      <span>Interval: {feed.interval}s</span>
                      <span>Format: {feed.format}</span>
                      <span>{feed.secure ? "Secure" : "Public"}</span>
                      <span>Status: {feed.status}</span>
                      <span>Last sync: {feed.lastSync}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-6 border border-[var(--border-default)] p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                <span>Live landing preview</span>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                  <input
                    type="checkbox"
                    className="h-3 w-3"
                    checked={livestreamEnabled}
                    onChange={(event) => setLivestreamEnabled(event.target.checked)}
                  />
                  Livestream slot
                </label>
              </div>
              <div className="space-y-4">
                <label className="flex flex-col gap-2 text-xs text-[var(--text-tertiary)]">
                  Hero prompt
                  <input
                    className="rounded border border-[var(--border-default)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none"
                    value={previewHero}
                    onChange={(event) => updateHeroHeadline(event.target.value)}
                  />
                </label>
                <div className="rounded border border-[var(--border-light)] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Hero preview</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{previewHero}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {liveBlocks.slice(0, 4).map((block) => (
                      <div key={block.id} className="space-y-1 border border-[var(--border-light)] p-3">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">#{block.type}</span>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{block.label}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{block.summary}</p>
                      </div>
                    ))}
                  </div>
                  {livestreamEnabled ? (
                    <div className="mt-4 flex items-center justify-between rounded border border-[var(--border-default)] p-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Livestream slot ready</p>
                        <p className="text-xs text-[var(--text-secondary)]">Embed orbital broadcast or laboratory feed with auto captioning.</p>
                      </div>
                      <PlayCircle className="h-6 w-6 text-[var(--text-status-warning)]" />
                    </div>
                  ) : null}
                </div>
                {upcomingBlocks.length ? (
                  <div className="rounded border border-[var(--border-light)] p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Scheduled modules</p>
                    <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
                      {upcomingBlocks.map((block) => (
                        <li key={block.id} className="flex items-center justify-between gap-3">
                          <span>
                            <strong className="text-[var(--text-primary)]">{block.label}</strong> — {block.summary}
                          </span>
                          <span className="rounded-full border border-[var(--border-default)] px-2 py-1 uppercase tracking-[0.18em]">
                            {block.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="space-y-6 border border-[var(--border-default)] p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                <span>Navigation analytics</span>
                <span>via D3.js</span>
              </div>
              <NavigationAnalytics sections={menuSections} />
              <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                {menuSections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--text-primary)]">{section.label}</span>
                    <span>{section.items.length} links</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 border border-[var(--border-default)] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Product release workspace</span>
              <span>D3 dashboards ready</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {releaseBlueprints.map((release) => (
                <div key={release.id} className="space-y-3 rounded border border-[var(--border-light)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{release.product}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{release.headline}</p>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Owner: {release.owner}</span>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${
                        release.status === "published"
                          ? "bg-[var(--text-status-warning)] text-[var(--text-inverted)]"
                          : release.status === "review"
                            ? "border border-[var(--border-default)] text-[var(--text-secondary)]"
                            : "border border-[var(--border-default)] text-[var(--text-tertiary)]"
                      }`}
                    >
                      {release.status}
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                    {release.metrics.map((metric) => (
                      <li key={metric.label} className="flex items-center justify-between">
                        <span>{metric.label}</span>
                        <span className="font-semibold text-[var(--text-primary)]">{metric.value}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    <span>Last publish: {release.lastPublished}</span>
                    <span>{release.hasD3 ? "D3 integrated" : "D3 pending"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => publishRelease(release.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Publish to site
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 border border-[var(--border-default)] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span>Release log</span>
              <Link
                href={"/insights/releases" as any}
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-status-warning)]"
              >
                View history
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              {releaseBlueprints.slice(0, 5).map((release) => (
                <li key={release.id} className="flex items-center justify-between gap-3 border-b border-[var(--border-light)] pb-2 last:border-b-0 last:pb-0">
                  <span>
                    <strong className="text-[var(--text-primary)]">{release.product}</strong> — {release.status}
                  </span>
                  <span>{release.lastPublished}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

type NavigationAnalyticsProps = {
  sections: MenuSection[];
};

function NavigationAnalytics({ sections }: NavigationAnalyticsProps) {
  const dataset = useMemo(
    () =>
      sections.map((section) => ({
        label: section.label,
        value: section.items.length === 0 ? 1 : section.items.length
      })),
    [sections]
  );

  const total = dataset.reduce((sum, item) => sum + item.value, 0);
  const palette = ["#4ADE80", "#FF9E6C", "#F3F3F3", "#66B5FF"].slice(0, dataset.length);

  const pie = useMemo(() => {
    const generator = d3.pie<{ label: string; value: number }>().sort(null).value((item) => item.value);
    return generator(dataset);
  }, [dataset]);

  const arcGenerator = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>().innerRadius(60).outerRadius(120).cornerRadius(6);

  return (
    <svg viewBox="0 0 280 280" className="mx-auto h-64 w-full">
      <g transform="translate(140,140)">
        {pie.map((segment, index) => (
          <path
            key={segment.data.label}
            d={arcGenerator(segment) ?? undefined}
            fill={palette[index % palette.length]}
            fillOpacity={0.9}
            stroke="#212121"
            strokeWidth={2}
          />
        ))}
        <text textAnchor="middle" fill="#FFFFFF" fontSize={22} fontWeight={600}>
          {total}
        </text>
        <text textAnchor="middle" dy={24} fill="#AFAFAF" fontSize={11} letterSpacing={3}>
          LINKS
        </text>
      </g>
    </svg>
  );
}
