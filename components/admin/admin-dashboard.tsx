"use client";

import { useEffect, useMemo, useState, type ComponentType, type CSSProperties } from "react";
import {
  AlertTriangle,
  Archive,
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  Copy,
  Download,
  FileDigit,
  FilePlus,
  Filter,
  Flame,
  FolderPlus,
  History,
  Layers,
  LineChart,
  ListPlus,
  MapPin,
  MonitorSmartphone,
  Move,
  Pencil,
  Pin,
  Play,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Wand2
} from "lucide-react";
import * as d3 from "d3";
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import siteConfig from "@/lib/cms/site-config";
import type {
  AutomationRule,
  Collections,
  ContentItem,
  AccessPortalCollection,
  DataFeed,
  FooterCollection,
  HeroCollection,
  HomeCollection,
  InsightsCollection,
  NavigationNode,
  PageDefinition,
  PageModule,
  ModuleAction,
  ModuleMedia,
  ModuleStat,
  ModuleType,
  ProgramsCollection,
  PulseCollection,
  StaticPageContent,
  SiteConfig,
  ThemeCollections
} from "@/lib/cms/types";


type AdminTab =
  | "overview"
  | "navigation"
  | "pages"
  | "builder"
  | "library"
  | "feeds"
  | "collections"
  | "automations"
  | "settings";

type ModuleTemplate = {
  type: ModuleType;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  defaults: Partial<PageModule>;
};

type DragMeta =
  | { source: "palette"; moduleType: ModuleType }
  | { source: "canvas"; moduleId: string };

type AuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  target: string;
  summary: string;
  detail?: string;
};

const MODULE_LIBRARY: ModuleTemplate[] = [
  {
    type: "hero",
    label: "Mission hero",
    description: "Large headline with verb rotation and dual call-to-actions.",
    icon: Flame,
    defaults: {
      title: "Untitled mission canvas",
      subtitle: "Compose a strategic overview with actions and live metrics.",
      verb: "advance",
      actions: [
        { label: "Primary action", href: "/#" },
        { label: "Secondary", href: "/#" }
      ],
      media: { type: "image", src: "/assets/placeholder/hero.jpg", caption: "Upload media" }
    }
  },
  {
    type: "stat-block",
    label: "Signal stats",
    description: "Grid of KPIs highlighting operational telemetry.",
    icon: BarChart3,
    defaults: {
      title: "Operational signals",
      stats: [
        { label: "Primary metric", value: "0", tone: "positive" },
        { label: "Secondary metric", value: "0", tone: "critical" },
        { label: "Tertiary metric", value: "0" }
      ]
    }
  },
  {
    type: "feature-grid",
    label: "Feature matrix",
    description: "Columnar layout for product capabilities and descriptions.",
    icon: Layers,
    defaults: {
      title: "Feature grid",
      columns: [
        { title: "Capability", body: "Describe the outcome." },
        { title: "Automation", body: "Highlight the automation advantage." },
        { title: "Security", body: "Note compliance and safety controls." }
      ],
      layout: "grid"
    }
  },
  {
    type: "media",
    label: "Media spotlight",
    description: "Embed rich media, product renders, or charts.",
    icon: MonitorSmartphone,
    defaults: {
      title: "Media spotlight",
      media: { type: "video", src: "https://assets.aeterna/video.mp4", caption: "Describe the media asset" },
      description: "Explain the significance of the visual asset."
    }
  },
  {
    type: "list",
    label: "Release list",
    description: "Chronological list of launches, posts, or changelog entries.",
    icon: ListPlus,
    defaults: {
      title: "Release highlights",
      items: ["content-id-1", "content-id-2"],
      layout: "list"
    }
  },
  {
    type: "feed",
    label: "Live feed",
    description: "Attach a live data stream to update visitors in real time.",
    icon: ArrowLeftRight,
    defaults: {
      title: "Live feed",
      feedId: "mission-stream",
      layout: "grid"
    }
  },
  {
    type: "timeline",
    label: "Roadmap timeline",
    description: "Communicate upcoming launches and milestones.",
    icon: MapPin,
    defaults: {
      title: "Roadmap",
      items: ["Q3 launch", "Q4 expansion", "Q1 milestone"],
      layout: "dual"
    }
  },
  {
    type: "cta",
    label: "Call to action",
    description: "High-impact prompt with single conversion objective.",
    icon: Wand2,
    defaults: {
      title: "Ready to deploy?",
      description: "Invite alliances, partners, or researchers to engage.",
      actions: [{ label: "Engage", href: "/contact" }]
    }
  },
  {
    type: "markdown",
    label: "Rich narrative",
    description: "Freeform narrative section with inline media support.",
    icon: BookMarked,
    defaults: {
      title: "Narrative",
      body: "<p>Craft long-form content with headings, callouts, and inline research citations.</p>"
    }
  }
];

function createModuleFromTemplate(template: ModuleTemplate): PageModule {
  return {
    id: generateId("module"),
    type: template.type,
    title: template.defaults.title ?? template.label,
    subtitle: template.defaults.subtitle,
    description: template.defaults.description,
    body: template.defaults.body,
    verb: template.defaults.verb,
    actions: template.defaults.actions ? JSON.parse(JSON.stringify(template.defaults.actions)) : undefined,
    stats: template.defaults.stats ? JSON.parse(JSON.stringify(template.defaults.stats)) : undefined,
    items: template.defaults.items ? [...template.defaults.items] : undefined,
    feedId: template.defaults.feedId,
    layout: template.defaults.layout,
    media: template.defaults.media ? { ...template.defaults.media } : undefined,
    pinned: template.defaults.pinned,
    columns: template.defaults.columns ? JSON.parse(JSON.stringify(template.defaults.columns)) : undefined
  };
}

const createConfigClone = (): SiteConfig => JSON.parse(JSON.stringify(siteConfig)) as SiteConfig;

const STORAGE_KEY = "aeterna-admin-config";
const ACTIVITY_STORAGE_KEY = "aeterna-admin-activity";

export function AdminDashboard() {
  const [config, setConfig] = useState<SiteConfig>(() => createConfigClone());
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [selectedPageId, setSelectedPageId] = useState<string>(() => {
    const initial = createConfigClone();
    return initial.pages[0]?.id ?? "";
  });
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activityLog, setActivityLog] = useState<AuditEntry[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SiteConfig;
        setConfig(parsed);
        const firstPage = parsed.pages[0]?.id ?? "";
        setSelectedPageId((current) => (parsed.pages.some((page) => page.id === current) ? current : firstPage));
      } catch (error) {
        console.error("Failed to parse stored config", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuditEntry[];
        setActivityLog(parsed);
      } catch (error) {
        console.error("Failed to parse stored activity log", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const selectedPage = config.pages.find((page) => page.id === selectedPageId) ?? config.pages[0] ?? null;

  const totalModules = useMemo(
    () => config.pages.reduce((acc, page) => acc + page.modules.length, 0),
    [config.pages]
  );

  const handleConfigChange = (updater: (current: SiteConfig) => SiteConfig) => {
    setConfig((current) => updater(JSON.parse(JSON.stringify(current)) as SiteConfig));
  };

  const registerActivity = (entry: Omit<AuditEntry, "id" | "timestamp">) => {
    setActivityLog((current) => {
      const next: AuditEntry[] = [
        { id: generateId("activity"), timestamp: new Date().toISOString(), ...entry },
        ...current
      ].slice(0, 80);
      return next;
    });
  };

  const clearActivityLog = () => {
    setActivityLog([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ACTIVITY_STORAGE_KEY);
    }
    setToastMessage("Activity timeline cleared");
  };

  const handleCollectionsUpdate = (
    updater: (collections: Collections) => Collections,
    message?: string,
    audit?: { summary: string; target?: string; detail?: string }
  ) => {
    handleConfigChange((current) => ({ ...current, collections: updater(current.collections) }));
    const toast = message ?? "Collections updated";
    setToastMessage(toast);
    registerActivity({
      actor: "Operator",
      target: audit?.target ?? "Collections",
      summary: audit?.summary ?? toast,
      detail: audit?.detail
    });
  };

  const handleNavigationUpdate = (navigation: NavigationNode[]) => {
    handleConfigChange((current) => ({ ...current, navigation }));
    setToastMessage("Navigation updated");
    registerActivity({
      actor: "Operator",
      target: "Navigation",
      summary: "Updated navigation tree",
      detail: `${navigation.length} root nodes`
    });
  };

  const handlePageUpdate = (pageId: string, update: (page: PageDefinition) => PageDefinition) => {
    handleConfigChange((current) => ({
      ...current,
      pages: current.pages.map((page) => (page.id === pageId ? update(page) : page))
    }));
  };

  const handlePageCreation = (page: PageDefinition) => {
    handleConfigChange((current) => ({ ...current, pages: [...current.pages, page] }));
    setSelectedPageId(page.id);
    setSelectedModuleId(page.modules[0]?.id ?? null);
    setToastMessage(`Created page ${page.name}`);
    registerActivity({
      actor: "Operator",
      target: "Pages",
      summary: `Created page ${page.name}`,
      detail: page.slug
    });
  };

  const handlePageRemoval = (pageId: string) => {
    const removedPage = config.pages.find((page) => page.id === pageId);
    handleConfigChange((current) => ({
      ...current,
      pages: current.pages.filter((page) => page.id !== pageId)
    }));
    setSelectedPageId((currentPage) => {
      if (currentPage === pageId) {
        const fallback = config.pages.find((page) => page.id !== pageId)?.id ?? "";
        return fallback;
      }
      return currentPage;
    });
    setToastMessage("Page removed");
    registerActivity({
      actor: "Operator",
      target: "Pages",
      summary: removedPage ? `Removed page ${removedPage.name}` : "Removed page",
      detail: removedPage?.slug
    });
  };

  const handleLibraryUpdate = (items: ContentItem[]) => {
    handleConfigChange((current) => ({ ...current, contentLibrary: items }));
    registerActivity({
      actor: "Operator",
      target: "Content library",
      summary: "Updated content assets",
      detail: `${items.length} entries`
    });
  };

  const handleFeedUpdate = (feeds: DataFeed[]) => {
    handleConfigChange((current) => ({ ...current, dataFeeds: feeds }));
    registerActivity({
      actor: "Operator",
      target: "Data feeds",
      summary: "Adjusted data feed registry",
      detail: `${feeds.filter((feed) => feed.status === "connected").length} live sources`
    });
  };

  const handleReset = () => {
    const fresh = createConfigClone();
    setConfig(fresh);
    setSelectedPageId(fresh.pages[0]?.id ?? "");
    setSelectedModuleId(null);
    window.localStorage.removeItem(STORAGE_KEY);
    setToastMessage("Configuration restored to baseline");
    registerActivity({
      actor: "Operator",
      target: "System",
      summary: "Restored baseline configuration"
    });
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aeterna-config-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setToastMessage("Configuration exported");
    registerActivity({
      actor: "Operator",
      target: "System",
      summary: "Exported configuration snapshot"
    });
  };

  const handleImport = async (file: File) => {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text) as SiteConfig;
      setConfig(parsed);
      setSelectedPageId(parsed.pages[0]?.id ?? "");
      setSelectedModuleId(null);
      setToastMessage("Configuration imported");
      registerActivity({
        actor: "Operator",
        target: "System",
        summary: `Imported configuration ${file.name}`
      });
    } catch (error) {
      console.error("Failed to import configuration", error);
      setToastMessage("Import failed – invalid file");
    }
  };

  const handlePublish = () => {
    setToastMessage("Publishing pipeline triggered – preview queued");
    registerActivity({
      actor: "Operator",
      target: "Publishing",
      summary: "Queued preview deployment"
    });
  };

  const importInputId = "config-import-input";

  return (
    <section className="space-y-10 text-[var(--text-primary)]">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <span className="badge">Administrative control</span>
          <h1 className="text-3xl font-semibold lg:text-4xl">Aeterna control center</h1>
          <p className="max-w-2xl text-sm text-[var(--text-secondary)]">
            Govern navigation, launch product canvases, orchestrate live data feeds, and compose landing modules through the
            visual builder. All changes persist locally and can be exported for deployment.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <ArrowLeftRight className="h-4 w-4" /> Reset
          </button>
          <label
            htmlFor={importInputId}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <Upload className="h-4 w-4" /> Import
          </label>
          <input
            id={importInputId}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) {
                void handleImport(file);
                event.currentTarget.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--interactive-bg-accent-default)] px-4 py-2 text-sm font-semibold text-[var(--text-accent)] transition hover:bg-[var(--interactive-bg-accent-hover)]"
          >
            <Save className="h-4 w-4" /> Publish preview
          </button>
        </div>
      </header>

      <AdminTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {toastMessage ? (
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
          <CheckCircle2 className="h-4 w-4 text-[var(--text-status-warning)]" />
          <span>{toastMessage}</span>
        </div>
      ) : null}

      {activeTab === "overview" ? (
        <OverviewPanel
          config={config}
          totalModules={totalModules}
          activityLog={activityLog}
          onClearActivity={clearActivityLog}
        />
      ) : activeTab === "navigation" ? (
        <NavigationManager navigation={config.navigation} onChange={handleNavigationUpdate} />
      ) : null}
      {activeTab === "pages" ? (
        <PagesManager
          pages={config.pages}
          onCreate={handlePageCreation}
          onRemove={handlePageRemoval}
          onSelect={setSelectedPageId}
          selectedId={selectedPageId}
        />
      ) : activeTab === "builder" ? (
        <PageBuilder
          page={selectedPage}
          dataFeeds={config.dataFeeds}
          contentLibrary={config.contentLibrary}
          onSelectModule={setSelectedModuleId}
          selectedModuleId={selectedModuleId}
          onPageUpdate={(updater) => selectedPage && handlePageUpdate(selectedPage.id, updater)}
          onAudit={(summary, target, detail) =>
            registerActivity({ actor: "Operator", target, summary, detail })
          }
        />
      ) : activeTab === "library" ? (
        <ContentLibraryManager items={config.contentLibrary} pages={config.pages} onChange={handleLibraryUpdate} />
      ) : activeTab === "feeds" ? (
        <DataFeedManager feeds={config.dataFeeds} modules={config.pages.flatMap((page) => page.modules)} onChange={handleFeedUpdate} />
      ) : activeTab === "collections" ? (
        <CollectionsManager collections={config.collections} onChange={handleCollectionsUpdate} />
      ) : activeTab === "automations" ? (
        <AutomationManager
          automations={config.collections.automations}
          onChange={(automations) =>
            handleCollectionsUpdate(
              (current) => ({ ...current, automations }),
              "Automation rules updated",
              {
                summary: "Adjusted automation flows",
                target: "Automations",
                detail: `${automations.length} active rules`
              }
            )
          }
        />
      ) : (
        <SettingsPanel
          config={config}
          onConfigChange={handleConfigChange}
          onClearActivityLog={clearActivityLog}
          activityCount={activityLog.length}
        />
      )}
    </section>
  );
}

function AdminTabBar({ activeTab, onTabChange }: { activeTab: AdminTab; onTabChange: (tab: AdminTab) => void }) {
  const tabs: { id: AdminTab; label: string; icon: ComponentType<{ className?: string }> }[] = [
    { id: "overview", label: "Overview", icon: LineChart },
    { id: "navigation", label: "Navigation", icon: Layers },
    { id: "pages", label: "Pages", icon: FileDigit },
    { id: "builder", label: "Visual builder", icon: Wand2 },
    { id: "library", label: "Content", icon: Archive },
    { id: "feeds", label: "Data feeds", icon: SlidersHorizontal },
    { id: "collections", label: "Collections", icon: BookMarked },
    { id: "automations", label: "Automations", icon: Play },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
              isActive
                ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

function OverviewPanel({
  config,
  totalModules,
  activityLog,
  onClearActivity
}: {
  config: SiteConfig;
  totalModules: number;
  activityLog: AuditEntry[];
  onClearActivity: () => void;
}) {
  const publishedPages = config.pages.filter((page) => page.status === "published");
  const draftPages = config.pages.length - publishedPages.length;
  const connectedFeeds = config.dataFeeds.filter((feed) => feed.status === "connected");
  const pinnedContent = config.contentLibrary.filter((item) => item.pinned);
  const qualityReport = useMemo(() => createQualityReport(config), [config]);
  const recentActivity = activityLog.slice(0, 6);

  return (
    <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
      <div className="space-y-5">
        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
          <h2 className="text-lg font-semibold">Operational pulse</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Snapshot of the digital estate — pages, content, data pipelines, and publication cadence.
          </p>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-[var(--text-tertiary)]">Published canvases</dt>
              <dd className="text-[var(--text-status-warning)]">{publishedPages.length}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--text-tertiary)]">Draft & review</dt>
              <dd className="text-[var(--text-status-error)]">{draftPages}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--text-tertiary)]">Total modules in rotation</dt>
              <dd className="text-[var(--text-primary)]">{totalModules}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--text-tertiary)]">Live data feeds</dt>
              <dd className="text-[var(--text-status-warning)]">{connectedFeeds.length}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--text-tertiary)]">Pinned releases</dt>
              <dd className="text-[var(--text-primary)]">{pinnedContent.length}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)]">
            <ActionLink icon={FilePlus} label="Create landing page" detail="Launch a new product or mission narrative." />
            <ActionLink icon={FolderPlus} label="Add navigation branch" detail="Extend ecosystem or research menus." />
            <ActionLink icon={Play} label="Schedule livestream" detail="Embed upcoming broadcast modules on the home canvas." />
            <ActionLink icon={Pencil} label="Draft research brief" detail="Compose peer-reviewed publications with inline media." />
          </div>
        </div>
        <QualityScorecard report={qualityReport} />
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Publishing cadence</h2>
              <p className="text-sm text-[var(--text-secondary)]">Rolling 30-day release velocity across all divisions.</p>
            </div>
            <div className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              Real time
            </div>
          </div>
          <PublishingCadenceChart items={config.contentLibrary} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {config.dataFeeds.map((feed) => (
            <div key={feed.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{feed.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{feed.source}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                    feed.status === "connected"
                      ? "text-[var(--text-status-warning)]"
                      : feed.status === "degraded"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {feed.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-[var(--text-secondary)]">{feed.description}</p>
            </div>
          ))}
        </div>
        <ActivityTimeline entries={recentActivity} onClear={onClearActivity} />
      </div>
    </div>
  );
}

type QualityMetric = {
  id: string;
  label: string;
  description: string;
  tone: "positive" | "warning" | "critical";
  value: string;
  icon: ComponentType<{ className?: string }>;
};

type QualityReport = {
  score: number;
  status: "healthy" | "attention" | "critical";
  metrics: QualityMetric[];
  liveFeedCount: number;
};

function createQualityReport(config: SiteConfig): QualityReport {
  const modules = config.pages.flatMap((page) => page.modules);
  const moduleCount = modules.length;
  const modulesWithNarrative = modules.filter(
    (module) => module.title || module.subtitle || module.description || module.body
  );
  const coverage = moduleCount === 0 ? 100 : Math.round((modulesWithNarrative.length / moduleCount) * 100);

  const orphanedContent = config.contentLibrary.filter((item) => item.relatedPages.length === 0);
  const liveFeeds = config.dataFeeds.filter((feed) => feed.status === "connected");
  const connectedFeeds = config.dataFeeds.filter((feed) => feed.connectedModules.length > 0);

  const heroCtaModules = modules.filter((module) => module.type === "hero" || module.type === "cta");
  const actionableModules = heroCtaModules.filter(
    (module) => module.actions && module.actions.some((action) => action.href && action.href.trim().length > 0)
  );

  const feedModules = modules.filter((module) => module.type === "feed");
  const configuredFeedModules = feedModules.filter((module) => Boolean(module.feedId));

  const penalty =
    orphanedContent.length * 3 +
    (config.dataFeeds.length - connectedFeeds.length) * 4 +
    (heroCtaModules.length - actionableModules.length) * 2 +
    (feedModules.length - configuredFeedModules.length) * 2;

  const score = Math.max(0, Math.round((coverage + Math.max(0, 100 - penalty)) / 2));
  const status: QualityReport["status"] = score >= 85 ? "healthy" : score >= 65 ? "attention" : "critical";

  const metrics: QualityMetric[] = [
    {
      id: "coverage",
      label: "Content coverage",
      description: "Modules with complete narrative fields",
      value: `${coverage}%`,
      tone: coverage >= 85 ? "positive" : coverage >= 65 ? "warning" : "critical",
      icon: Sparkles
    },
    {
      id: "orphaned",
      label: "Orphaned entries",
      description: "Library assets missing page references",
      value: `${orphanedContent.length}`,
      tone: orphanedContent.length === 0 ? "positive" : orphanedContent.length < 3 ? "warning" : "critical",
      icon: AlertTriangle
    },
    {
      id: "feeds",
      label: "Feed connectivity",
      description: "Live data sources linked to modules",
      value: `${connectedFeeds.length}/${config.dataFeeds.length}`,
      tone:
        config.dataFeeds.length === 0 || connectedFeeds.length === config.dataFeeds.length
          ? "positive"
          : connectedFeeds.length > 0
            ? "warning"
            : "critical",
      icon: ShieldCheck
    },
    {
      id: "cta",
      label: "CTA readiness",
      description: "Hero & CTA modules with actionable links",
      value: `${actionableModules.length}/${heroCtaModules.length || 0}`,
      tone:
        heroCtaModules.length === 0 || actionableModules.length === heroCtaModules.length
          ? "positive"
          : actionableModules.length > 0
            ? "warning"
            : "critical",
      icon: ClipboardList
    },
    {
      id: "feedModules",
      label: "Feed modules configured",
      description: "Modules wired to live telemetry feeds",
      value: `${configuredFeedModules.length}/${feedModules.length || 0}`,
      tone:
        feedModules.length === 0 || configuredFeedModules.length === feedModules.length
          ? "positive"
          : configuredFeedModules.length > 0
            ? "warning"
            : "critical",
      icon: SlidersHorizontal
    }
  ];

  return { score, status, metrics, liveFeedCount: liveFeeds.length };
}

function QualityScorecard({ report }: { report: QualityReport }) {
  const statusLabel =
    report.status === "healthy" ? "Healthy" : report.status === "attention" ? "Needs attention" : "Critical";
  const statusToneClass =
    report.status === "healthy"
      ? "text-[var(--text-status-warning)]"
      : report.status === "attention"
        ? "text-[var(--text-secondary)]"
        : "text-[var(--text-status-error)]";

  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Experience quality</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Observability signals for the current configuration snapshot.
          </p>
        </div>
        <div className="text-right">
          <span className={`block text-3xl font-semibold ${statusToneClass}`}>{report.score}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{statusLabel}</span>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {report.metrics.map((metric) => {
          const toneClass =
            metric.tone === "positive"
              ? "text-[var(--text-status-warning)]"
              : metric.tone === "warning"
                ? "text-[var(--text-secondary)]"
                : "text-[var(--text-status-error)]";
          return (
            <div
              key={metric.id}
              className="flex items-start gap-3 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4"
            >
              <span className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] ${toneClass}`}>
                <metric.icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm text-[var(--text-primary)]">
                  <span className="font-semibold">{metric.label}</span>
                  <span className={`font-semibold ${toneClass}`}>{metric.value}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-[var(--text-tertiary)]">
        Live feeds online: {report.liveFeedCount}. Score penalizes orphaned content and unconfigured modules.
      </p>
    </div>
  );
}

function ActivityTimeline({ entries, onClear }: { entries: AuditEntry[]; onClear: () => void }) {
  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Activity timeline</h2>
          <p className="text-sm text-[var(--text-secondary)]">Recent configuration edits stored locally.</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
          Clear log
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--text-tertiary)]">No changes recorded yet — adjustments will appear here.</p>
      ) : (
        <ol className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-start gap-3 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4">
              <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-status-warning)]">
                <History className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[var(--text-primary)]">{entry.summary}</span>
                  <span className="rounded-full border border-[var(--border-default)] px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    {entry.target}
                  </span>
                </div>
                {entry.detail ? (
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{entry.detail}</p>
                ) : null}
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function ActionLink({ icon: Icon, label, detail }: { icon: ComponentType<{ className?: string }>; label: string; detail: string }) {
  return (
    <button
      type="button"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-default)] px-4 py-3 text-left transition hover:border-[var(--text-status-warning)]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-status-warning)]">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{label}</p>
          <p className="text-xs text-[var(--text-secondary)]">{detail}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-[var(--icon-tertiary)] transition group-hover:translate-x-1 group-hover:text-[var(--text-status-warning)]" />
    </button>
  );
}

function PublishingCadenceChart({ items }: { items: ContentItem[] }) {
  const svgId = "publishing-cadence-chart";

  useEffect(() => {
    const svg = d3.select<SVGSVGElement, unknown>(`#${svgId}`);
    const container = svg.node()?.parentElement;
    if (!svg.node() || !container) return;

    const now = new Date();
    const days = Array.from({ length: 30 }, (_, index) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - index));
      const iso = date.toISOString().slice(0, 10);
      const count = items.filter((item) => item.publishedAt.slice(0, 10) === iso).length;
      return { date, count };
    });

    const render = () => {
      const width = container.clientWidth;
      const height = 220;
      const margin = { top: 20, right: 24, bottom: 28, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const x = d3.scaleTime().domain([days[0].date, days[days.length - 1].date]).range([0, innerWidth]);
      const y = d3.scaleLinear().domain([0, d3.max(days, (d) => d.count)! + 1]).range([innerHeight, 0]);

      const area = d3
        .area<typeof days[number]>()
        .x((d) => x(d.date))
        .y0(innerHeight)
        .y1((d) => y(d.count))
        .curve(d3.curveCatmullRom.alpha(0.5));

      const line = d3
        .line<typeof days[number]>()
        .x((d) => x(d.date))
        .y((d) => y(d.count))
        .curve(d3.curveCatmullRom.alpha(0.5));

      const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      group
        .append("path")
        .datum(days)
        .attr("fill", "#1f3a2f")
        .attr("opacity", 0.8)
        .attr("d", area);

      group
        .append("path")
        .datum(days)
        .attr("fill", "none")
        .attr("stroke", "#4ADE80")
        .attr("stroke-width", 2)
        .attr("d", line);

      group
        .selectAll("circle")
        .data(days)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.date))
        .attr("cy", (d) => y(d.count))
        .attr("r", 3)
        .attr("fill", "#4ADE80");

      const xAxis = d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat("%b %d"));
      const yAxis = d3.axisLeft(y).ticks(4).tickFormat((value) => `${value}`);

      group
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis as any)
        .selectAll("text")
        .attr("fill", "#afafaf")
        .attr("font-size", "10px");

      group
        .append("g")
        .call(yAxis as any)
        .selectAll("text")
        .attr("fill", "#afafaf")
        .attr("font-size", "10px");

      group
        .selectAll(".grid-line")
        .data(y.ticks(4))
        .enter()
        .append("line")
        .attr("class", "grid-line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", (value) => y(value))
        .attr("y2", (value) => y(value))
        .attr("stroke", "#ffffff0d");
    };

    render();
    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [items, svgId]);

  return <svg id={svgId} className="mt-6 h-[220px] w-full" />;
}

function NavigationManager({ navigation, onChange }: { navigation: NavigationNode[]; onChange: (nav: NavigationNode[]) => void }) {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(navigation[0]?.id ?? null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSectionId && navigation.length > 0) {
      setSelectedSectionId(navigation[0].id);
    }
  }, [navigation, selectedSectionId]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleSectionDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = navigation.findIndex((section) => section.id === active.id);
    const newIndex = navigation.findIndex((section) => section.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(navigation, oldIndex, newIndex);
    onChange(reordered);
  };

  const selectedSection = navigation.find((section) => section.id === selectedSectionId) ?? null;
  const selectedChild = selectedSection?.children?.find((child) => child.id === selectedChildId) ?? null;

  const updateSection = (sectionId: string, update: (section: NavigationNode) => NavigationNode) => {
    onChange(
      navigation.map((section) => (section.id === sectionId ? update({ ...section }) : section))
    );
  };

  const updateChild = (childId: string, update: (child: NavigationNode) => NavigationNode) => {
    if (!selectedSection) return;
    onChange(
      navigation.map((section) => {
        if (section.id !== selectedSection.id) return section;
        return {
          ...section,
          children: section.children?.map((child) => (child.id === childId ? update({ ...child }) : child))
        };
      })
    );
  };

  const addSection = () => {
    const newSection: NavigationNode = {
      id: generateId("section"),
      label: "New section",
      type: "section",
      children: []
    };
    onChange([...navigation, newSection]);
    setSelectedSectionId(newSection.id);
    setSelectedChildId(null);
  };

  const removeSection = (sectionId: string) => {
    const filtered = navigation.filter((section) => section.id !== sectionId);
    onChange(filtered);
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(filtered[0]?.id ?? null);
      setSelectedChildId(null);
    }
  };

  const addChild = () => {
    if (!selectedSection) return;
    const newChild: NavigationNode = {
      id: generateId("link"),
      label: "New link",
      href: "/",
      type: "link"
    };
    updateSection(selectedSection.id, (section) => ({
      ...section,
      children: [...(section.children ?? []), newChild]
    }));
    setSelectedChildId(newChild.id);
  };

  const removeChild = (childId: string) => {
    if (!selectedSection) return;
    updateSection(selectedSection.id, (section) => ({
      ...section,
      children: (section.children ?? []).filter((child) => child.id !== childId)
    }));
    if (selectedChildId === childId) {
      setSelectedChildId(null);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Navigation tree</h2>
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <PlusIcon className="h-3 w-3" /> Add section
          </button>
        </div>
        <DndContext sensors={sensors} onDragEnd={handleSectionDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={navigation.map((section) => section.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {navigation.map((section) => (
                <SortableSectionCard
                  key={section.id}
                  section={section}
                  isActive={section.id === selectedSectionId}
                  onSelect={() => {
                    setSelectedSectionId(section.id);
                    setSelectedChildId(null);
                  }}
                  onRemove={() => removeSection(section.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <div className="space-y-6">
        {selectedSection ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
              <h3 className="text-lg font-semibold">Section properties</h3>
              <div className="mt-4 grid gap-4 text-sm">
                <label className="grid gap-2">
                  <span className="text-[var(--text-tertiary)]">Label</span>
                  <input
                    className="input"
                    value={selectedSection.label}
                    onChange={(event) =>
                      updateSection(selectedSection.id, (section) => ({ ...section, label: event.target.value }))
                    }
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[var(--text-tertiary)]">Description</span>
                  <textarea
                    className="input min-h-[80px]"
                    value={selectedSection.description ?? ""}
                    onChange={(event) =>
                      updateSection(selectedSection.id, (section) => ({ ...section, description: event.target.value }))
                    }
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[var(--text-tertiary)]">Badge (optional)</span>
                  <input
                    className="input"
                    value={selectedSection.badge ?? ""}
                    onChange={(event) =>
                      updateSection(selectedSection.id, (section) => ({ ...section, badge: event.target.value || undefined }))
                    }
                  />
                </label>
              </div>
            </div>
            <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Links in section</h3>
                <button
                  type="button"
                  onClick={addChild}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  <PlusIcon className="h-3 w-3" /> Add link
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {(selectedSection.children ?? []).length === 0 ? (
                  <p className="text-sm text-[var(--text-tertiary)]">No links yet. Add destinations for this section.</p>
                ) : (
                  <ChildList
                    sectionId={selectedSection.id}
                    children={selectedSection.children ?? []}
                    selectedChildId={selectedChildId}
                    onSelectChild={setSelectedChildId}
                    onReorder={(children) =>
                      updateSection(selectedSection.id, (section) => ({
                        ...section,
                        children
                      }))
                    }
                    onRemoveChild={removeChild}
                  />
                )}
              </div>
              {selectedChild ? (
                <div className="mt-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Link details</h4>
                  <div className="mt-4 grid gap-4 text-sm">
                    <label className="grid gap-2">
                      <span className="text-[var(--text-tertiary)]">Label</span>
                      <input
                        className="input"
                        value={selectedChild.label}
                        onChange={(event) =>
                          updateChild(selectedChild.id, (child) => ({ ...child, label: event.target.value }))
                        }
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-[var(--text-tertiary)]">Destination</span>
                      <input
                        className="input"
                        value={selectedChild.href ?? ""}
                        onChange={(event) =>
                          updateChild(selectedChild.id, (child) => ({ ...child, href: event.target.value }))
                        }
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-[var(--text-tertiary)]">Badge</span>
                      <input
                        className="input"
                        value={selectedChild.badge ?? ""}
                        onChange={(event) =>
                          updateChild(selectedChild.id, (child) => ({ ...child, badge: event.target.value || undefined }))
                        }
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeChild(selectedChild.id)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-status-error)]"
                  >
                    Remove link
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-tertiary)]">Select a section to edit navigation details.</p>
        )}
      </div>
    </div>
  );
}

function SortableSectionCard({
  section,
  isActive,
  onSelect,
  onRemove
}: {
  section: NavigationNode;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
        isActive
          ? "border-[var(--text-status-warning)] bg-[var(--bg-secondary)]"
          : "border-[var(--border-default)] bg-[var(--bg-secondary)]"
      }`}
    >
      <button type="button" className="flex flex-1 flex-col text-left" onClick={onSelect}>
        <span className="text-sm font-semibold text-[var(--text-primary)]">{section.label}</span>
        <span className="text-xs text-[var(--text-tertiary)]">{section.description ?? "No description"}</span>
      </button>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Drag section"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-tertiary)]"
          {...attributes}
          {...listeners}
        >
          <Move className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-status-error)]"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function ChildList({
  sectionId,
  children,
  selectedChildId,
  onSelectChild,
  onReorder,
  onRemoveChild
}: {
  sectionId: string;
  children: NavigationNode[];
  selectedChildId: string | null;
  onSelectChild: (id: string | null) => void;
  onReorder: (children: NavigationNode[]) => void;
  onRemoveChild: (id: string) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = children.findIndex((child) => child.id === active.id);
    const newIndex = children.findIndex((child) => child.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(children, oldIndex, newIndex);
    onReorder(reordered);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      <SortableContext items={children.map((child) => child.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {children.map((child) => {
            const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: child.id });
            const style = {
              transform: CSS.Transform.toString(transform),
              transition
            };
            const isActive = child.id === selectedChildId;
            return (
              <div
                key={child.id}
                ref={setNodeRef}
                style={style}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                  isActive
                    ? "border-[var(--text-status-warning)] bg-[var(--bg-tertiary)]"
                    : "border-[var(--border-default)] bg-[var(--bg-secondary)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectChild(isActive ? null : child.id)}
                  className="flex flex-1 flex-col text-left"
                >
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{child.label}</span>
                  <span className="text-xs text-[var(--text-tertiary)]">{child.href ?? "No destination"}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-tertiary)]"
                    {...attributes}
                    {...listeners}
                  >
                    <Move className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveChild(child.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-status-error)]"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
function PagesManager({
  pages,
  onCreate,
  onRemove,
  onSelect,
  selectedId
}: {
  pages: PageDefinition[];
  onCreate: (page: PageDefinition) => void;
  onRemove: (pageId: string) => void;
  onSelect: (pageId: string) => void;
  selectedId: string;
}) {
  const [filter, setFilter] = useState<string>("");
  const [draftName, setDraftName] = useState<string>("");
  const [draftSlug, setDraftSlug] = useState<string>("");

  const filteredPages = pages.filter((page) => page.name.toLowerCase().includes(filter.toLowerCase()));

  const createPage = () => {
    if (!draftName.trim()) return;
    const id = generateId("page");
    const slug = draftSlug.trim() || `/${draftName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    const page: PageDefinition = {
      id,
      name: draftName,
      slug,
      description: "New landing canvas",
      status: "draft",
      tags: [],
      lastUpdated: new Date().toISOString(),
      modules: [
        {
          id: generateId("module"),
          type: "hero",
          title: `${draftName} mission hero`,
          subtitle: "Describe the mission impact.",
          actions: [{ label: "Explore", href: "#" }]
        }
      ]
    };
    onCreate(page);
    setDraftName("");
    setDraftSlug("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Page inventory</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage all published and in-flight canvases. Use filters to locate specific mission pages.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <label className="flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-secondary)]">
            <Filter className="h-4 w-4" />
            <input
              className="bg-transparent outline-none"
              placeholder="Filter pages"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="grid gap-4 text-sm lg:grid-cols-[320px_1fr]">
        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Create page</h3>
          <div className="mt-4 space-y-4">
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Title</span>
              <input className="input" value={draftName} onChange={(event) => setDraftName(event.target.value)} />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Slug</span>
              <input className="input" value={draftSlug} onChange={(event) => setDraftSlug(event.target.value)} placeholder="/new-product" />
            </label>
            <button
              type="button"
              onClick={createPage}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--interactive-bg-accent-default)] px-4 py-2 text-sm font-semibold text-[var(--text-accent)] transition hover:bg-[var(--interactive-bg-accent-hover)]"
            >
              <FilePlus className="h-4 w-4" /> Create page
            </button>
          </div>
        </div>
        <div className="grid gap-3">
          {filteredPages.map((page) => {
            const isSelected = page.id === selectedId;
            return (
              <div
                key={page.id}
                className={`rounded-3xl border px-5 py-4 transition ${
                  isSelected
                    ? "border-[var(--text-status-warning)] bg-[var(--bg-secondary)]"
                    : "border-[var(--border-default)] bg-[var(--bg-secondary)] hover:border-[var(--text-status-warning)]"
                }`}
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <button type="button" onClick={() => onSelect(page.id)} className="text-left">
                      <p className="text-base font-semibold text-[var(--text-primary)]">{page.name}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{page.slug}</p>
                    </button>
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">{page.description}</p>
                  </div>
                  <div className="flex flex-col items-start gap-2 text-xs text-[var(--text-tertiary)] lg:items-end">
                    <span className="rounded-full border border-[var(--border-default)] px-3 py-1 uppercase tracking-[0.2em]">
                      {page.status}
                    </span>
                    <span>Last updated {new Date(page.lastUpdated).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onSelect(page.id)}
                        className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                      >
                        Edit modules
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(page.id)}
                        className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-status-error)]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
interface BuilderProps {
  page: PageDefinition | null;
  dataFeeds: DataFeed[];
  contentLibrary: ContentItem[];
  selectedModuleId: string | null;
  onSelectModule: (moduleId: string | null) => void;
  onPageUpdate: (updater: (page: PageDefinition) => PageDefinition) => void;
  onAudit?: (summary: string, target: string, detail?: string) => void;
}

function PageBuilder({ page, dataFeeds, contentLibrary, selectedModuleId, onSelectModule, onPageUpdate, onAudit }: BuilderProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const [activeDrag, setActiveDrag] = useState<DragMeta | null>(null);

  if (!page) {
    return <p className="text-sm text-[var(--text-tertiary)]">Select a page to begin visual composition.</p>;
  }

  const modules = page.modules;

  const addModule = (moduleType: ModuleType, targetId?: string) => {
    const template = MODULE_LIBRARY.find((entry) => entry.type === moduleType);
    if (!template) return;
    const newModule = createModuleFromTemplate(template);

    onPageUpdate((current) => {
      const nextModules = [...current.modules];
      if (!targetId) {
        nextModules.push(newModule);
      } else {
        const targetIndex = nextModules.findIndex((module) => module.id === targetId);
        if (targetIndex === -1) {
          nextModules.push(newModule);
        } else {
          nextModules.splice(targetIndex, 0, newModule);
        }
      }
      return { ...current, modules: nextModules, lastUpdated: new Date().toISOString() };
    });
    onSelectModule(newModule.id);
    onAudit?.(`Added ${template.label}`, page.name, newModule.id);
  };

  const updateModule = (moduleId: string, update: (module: PageModule) => PageModule) => {
    onPageUpdate((current) => ({
      ...current,
      modules: current.modules.map((module) => (module.id === moduleId ? update({ ...module }) : module)),
      lastUpdated: new Date().toISOString()
    }));
  };

  const removeModule = (moduleId: string) => {
    const removed = modules.find((module) => module.id === moduleId);
    onPageUpdate((current) => ({
      ...current,
      modules: current.modules.filter((module) => module.id !== moduleId),
      lastUpdated: new Date().toISOString()
    }));
    if (selectedModuleId === moduleId) {
      onSelectModule(null);
    }
    onAudit?.(
      removed ? `Removed ${removed.title ?? removed.type}` : "Removed module",
      page.name,
      moduleId
    );
  };

  const duplicateModule = (moduleId: string) => {
    const source = modules.find((module) => module.id === moduleId);
    if (!source) return;
    const clone = JSON.parse(JSON.stringify(source)) as PageModule;
    clone.id = generateId("module");
    if (clone.title) {
      clone.title = `${clone.title} copy`;
    }
    onPageUpdate((current) => {
      const index = current.modules.findIndex((module) => module.id === moduleId);
      if (index === -1) {
        return { ...current, modules: [...current.modules, clone], lastUpdated: new Date().toISOString() };
      }
      const nextModules = [...current.modules];
      nextModules.splice(index + 1, 0, clone);
      return { ...current, modules: nextModules, lastUpdated: new Date().toISOString() };
    });
    onSelectModule(clone.id);
    onAudit?.(
      `Duplicated ${source.title ?? source.type}`,
      page.name,
      clone.id
    );
  };

  const togglePin = (moduleId: string) => {
    const target = modules.find((module) => module.id === moduleId);
    if (!target) return;
    const nextState = !target.pinned;
    updateModule(moduleId, (module) => ({ ...module, pinned: nextState }));
    onAudit?.(
      `${nextState ? "Pinned" : "Unpinned"} ${target.title ?? target.type}`,
      page.name,
      moduleId
    );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveDrag(null);
    if (!over) return;
    const activeMeta = active.data.current as DragMeta | undefined;
    if (!activeMeta) return;

    if (activeMeta.source === "palette") {
      const targetId = typeof over.id === "string" && over.id !== "canvas" ? (over.id as string) : undefined;
      addModule(activeMeta.moduleType, targetId);
      return;
    }

    if (activeMeta.source === "canvas") {
      const oldIndex = modules.findIndex((module) => module.id === activeMeta.moduleId);
      if (oldIndex === -1) return;
      if (over.id === "canvas-end") {
        if (oldIndex === modules.length - 1) return;
        const reordered = arrayMove(modules, oldIndex, modules.length - 1);
        onPageUpdate((current) => ({
          ...current,
          modules: reordered,
          lastUpdated: new Date().toISOString()
        }));
        onAudit?.("Moved module to end", page.name, activeMeta.moduleId);
        return;
      }
      const newIndex = modules.findIndex((module) => module.id === over.id);
      if (newIndex === -1 || newIndex === oldIndex) return;
      const reordered = arrayMove(modules, oldIndex, newIndex);
      onPageUpdate((current) => ({
        ...current,
        modules: reordered,
        lastUpdated: new Date().toISOString()
      }));
      onAudit?.("Reordered module", page.name, activeMeta.moduleId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActiveDrag(active.data.current as DragMeta);
      }}
      onDragCancel={() => setActiveDrag(null)}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <div className="grid gap-6 lg:grid-cols-[260px_1fr_320px]">
        <ModulePalette onSelect={addModule} />
        <div className="space-y-3">
          <SortableContext items={modules.map((module) => module.id)} strategy={verticalListSortingStrategy}>
            <CanvasDroppable>
              {modules.length === 0 ? (
                <div className="flex h-48 items-center justify-center rounded-3xl border border-dashed border-[var(--border-default)] text-sm text-[var(--text-tertiary)]">
                  Drag modules from the library or click a template to begin composing this page.
                </div>
              ) : (
                modules.map((module) => (
                  <SortableModuleCard
                    key={module.id}
                    module={module}
                    isActive={module.id === selectedModuleId}
                    onSelect={() => onSelectModule(module.id)}
                    onRemove={() => removeModule(module.id)}
                    onDuplicate={() => duplicateModule(module.id)}
                    onTogglePin={() => togglePin(module.id)}
                  />
                ))
              )}
              <div id="canvas-end" className="h-2" />
            </CanvasDroppable>
          </SortableContext>
        </div>
        <ModuleInspector
          module={modules.find((module) => module.id === selectedModuleId) ?? null}
          dataFeeds={dataFeeds}
          contentLibrary={contentLibrary}
          onUpdate={(updater) => {
            if (!selectedModuleId) return;
            updateModule(selectedModuleId, updater);
          }}
          onAudit={(summary, detail) => onAudit?.(summary, page.name, detail)}
        />
      </div>
      <DragOverlay>
        {activeDrag
          ? activeDrag.source === "palette"
            ? (
              <ModuleLibraryCard template={MODULE_LIBRARY.find((entry) => entry.type === activeDrag.moduleType)!} dragPreview />
            )
            : (
              <ModulePreview module={modules.find((module) => module.id === activeDrag.moduleId)!} dragging />
            )
          : null}
      </DragOverlay>
    </DndContext>
  );
}

function ModulePalette({ onSelect }: { onSelect: (type: ModuleType, targetId?: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Module library</h3>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">Drag into the canvas or click to append to the end.</p>
      </div>
      <div className="space-y-3">
        {MODULE_LIBRARY.map((template) => (
          <ModuleLibraryCard key={template.type} template={template} onSelect={() => onSelect(template.type)} />
        ))}
      </div>
    </div>
  );
}

function ModuleLibraryCard({
  template,
  onSelect,
  dragPreview = false
}: {
  template: ModuleTemplate;
  onSelect?: () => void;
  dragPreview?: boolean;
}) {
  if (dragPreview) {
    return (
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-status-warning)]">
            <template.icon className="h-5 w-5" />
          </span>
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-[var(--text-primary)]">{template.label}</p>
            <p className="text-xs text-[var(--text-secondary)]">{template.description}</p>
          </div>
        </div>
      </div>
    );
  }

  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: `palette-${template.type}`,
    data: { source: "palette", moduleType: template.type } satisfies DragMeta
  });

  const style: CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition: transition ?? undefined
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4 transition ${
        onSelect ? "hover:border-[var(--text-status-warning)]" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-status-warning)]">
          <template.icon className="h-5 w-5" />
        </span>
        <div className="flex-1 space-y-1">
          <p className="font-semibold text-[var(--text-primary)]">{template.label}</p>
          <p className="text-xs text-[var(--text-secondary)]">{template.description}</p>
        </div>
      </div>
    </div>
  );
}

function CanvasDroppable({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });
  return (
    <div
      ref={setNodeRef}
      id="canvas"
      className={`space-y-3 rounded-3xl ${
        isOver
          ? "ring-1 ring-[var(--text-status-warning)] ring-offset-2 ring-offset-[var(--bg-secondary)]"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

function SortableModuleCard({
  module,
  isActive,
  onSelect,
  onRemove,
  onDuplicate,
  onTogglePin
}: {
  module: PageModule;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onTogglePin: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: module.id,
    data: { source: "canvas", moduleId: module.id } satisfies DragMeta
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const isPinned = Boolean(module.pinned);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-3xl border px-5 py-5 transition ${
        isActive
          ? "border-[var(--text-status-warning)] bg-[var(--bg-secondary)]"
          : "border-[var(--border-default)] bg-[var(--bg-secondary)] hover:border-[var(--text-status-warning)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <button type="button" onClick={onSelect} className="flex-1 text-left">
          <ModulePreview module={module} />
        </button>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-tertiary)]"
            {...attributes}
            {...listeners}
          >
            <Move className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDuplicate}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-secondary)]"
            title="Duplicate module"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onTogglePin}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] ${
              isPinned ? "text-[var(--text-status-warning)]" : "text-[var(--text-tertiary)]"
            }`}
            title={isPinned ? "Unpin module" : "Pin module"}
          >
            <Pin className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-status-error)]"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

function ModulePreview({ module, dragging = false }: { module: PageModule; dragging?: boolean }) {
  const requiresFeedBinding = module.type === "feed" && !module.feedId;
  return (
    <div className={`space-y-3 ${dragging ? "pointer-events-none" : ""}`}>
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
        <span className="rounded-full border border-[var(--border-default)] px-2 py-1">{module.type}</span>
        {module.layout ? <span>layout: {module.layout}</span> : null}
        {module.pinned ? (
          <span className="rounded-full border border-[var(--border-default)] px-2 py-1 text-[var(--text-status-warning)]">
            Pinned
          </span>
        ) : null}
      </div>
      {module.title ? <h4 className="text-lg font-semibold text-[var(--text-primary)]">{module.title}</h4> : null}
      {module.subtitle ? <p className="text-sm text-[var(--text-secondary)]">{module.subtitle}</p> : null}
      {module.description ? <p className="text-xs text-[var(--text-secondary)]">{module.description}</p> : null}
      {module.stats ? (
        <div className="grid gap-2 md:grid-cols-3">
          {module.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[var(--border-default)] px-3 py-2 text-xs">
              <p className="text-[var(--text-tertiary)]">{stat.label}</p>
              <p
                className={`text-sm font-semibold ${
                  stat.tone === "positive"
                    ? "text-[var(--text-status-warning)]"
                    : stat.tone === "critical"
                      ? "text-[var(--text-status-error)]"
                      : "text-[var(--text-primary)]"
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {module.actions ? (
        <div className="flex flex-wrap gap-2 text-xs">
          {module.actions.map((action) => (
            <span key={action.label} className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-secondary)]">
              {action.label}
            </span>
          ))}
        </div>
      ) : null}
      {module.media ? (
        <div className="rounded-2xl border border-[var(--border-default)] p-3 text-xs text-[var(--text-secondary)]">
          Media: {module.media.type} – {module.media.src}
        </div>
      ) : null}
      {module.items ? (
        <ul className="list-disc space-y-1 pl-5 text-xs text-[var(--text-secondary)]">
          {module.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {module.columns ? (
        <div className="grid gap-3 md:grid-cols-2">
          {module.columns.map((column) => (
            <div key={column.title} className="rounded-2xl border border-[var(--border-default)] p-3 text-xs text-[var(--text-secondary)]">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{column.title}</p>
              <p className="mt-1">{column.body}</p>
            </div>
          ))}
        </div>
      ) : null}
      {requiresFeedBinding ? (
        <p className="text-xs text-[var(--text-status-error)]">Connect a data feed to activate this module.</p>
      ) : null}
    </div>
  );
}
interface ModuleInspectorProps {
  module: PageModule | null;
  dataFeeds: DataFeed[];
  contentLibrary: ContentItem[];
  onUpdate: (updater: (module: PageModule) => PageModule) => void;
  onAudit?: (summary: string, detail?: string) => void;
}

function ModuleInspector({ module, dataFeeds, contentLibrary, onUpdate, onAudit }: ModuleInspectorProps) {
  const [activeTab, setActiveTab] = useState<"properties" | "content" | "data">("properties");

  useEffect(() => {
    setActiveTab("properties");
  }, [module?.id]);

  if (!module) {
    return (
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 text-sm text-[var(--text-tertiary)]">
        Select a module to edit its properties, narrative, and data bindings.
      </div>
    );
  }

  const template = MODULE_LIBRARY.find((entry) => entry.type === module.type);

  const update = (partial: Partial<PageModule>) => {
    onUpdate((current) => ({ ...current, ...partial }));
  };

  const copyBlueprint = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(module, null, 2));
      onAudit?.("Copied module blueprint", module.id);
    } catch (error) {
      console.error("Failed to copy module blueprint", error);
    }
  };

  const resetToTemplate = () => {
    if (!template) return;
    const base = createModuleFromTemplate(template);
    onUpdate(() => ({ ...base, id: module.id, pinned: module.pinned }));
    onAudit?.("Reset module to template", template.label);
  };

  const applyPreset = () => {
    if (module.type === "hero" || module.type === "cta") {
      update({
        actions: [
          { label: "Request access", href: "/network/access" },
          { label: "View roadmap", href: "/network/roadmap" }
        ],
        verb: module.verb ?? "activate"
      });
      onAudit?.("Autofilled CTA actions", "Primary + secondary calls");
    } else if (module.type === "stat-block") {
      update({
        stats: [
          { label: "Nodes online", value: "128", tone: "positive" },
          { label: "Latency", value: "24ms", tone: "positive" },
          { label: "Incidents", value: "0", tone: "critical" }
        ]
      });
      onAudit?.("Seeded KPI stats", "Nodes / Latency / Incidents");
    }
  };

  const syncPinnedFromLibrary = () => {
    const pinned = contentLibrary.filter((item) => item.pinned);
    if (pinned.length === 0) {
      onAudit?.("No pinned releases available");
      return;
    }
    const nextItems = pinned.slice(0, Math.max(3, module.items?.length ?? 3)).map((item) => item.id);
    update({ items: nextItems });
    onAudit?.("Linked pinned releases", `${nextItems.length} items`);
  };

  const connectDefaultFeed = () => {
    const primary = dataFeeds.find((feed) => feed.status === "connected");
    if (!primary) {
      onAudit?.("No live data feeds to connect");
      return;
    }
    update({ feedId: primary.id });
    onAudit?.("Connected live feed", primary.name);
  };

  const updateAction = (index: number, field: keyof ModuleAction, value: string) => {
    const actions = [...(module.actions ?? [])];
    actions[index] = { ...actions[index], [field]: value };
    update({ actions });
  };

  const updateStat = (index: number, field: keyof ModuleStat, value: string) => {
    const stats = [...(module.stats ?? [])];
    const next = { ...stats[index] };
    if (field === "tone") {
      if (!value) {
        delete next.tone;
      } else {
        next.tone = value as ModuleStat["tone"];
      }
    } else if (field === "label") {
      next.label = value;
    } else if (field === "value") {
      next.value = value;
    }
    stats[index] = next;
    update({ stats });
  };

  const updateColumn = (index: number, field: "title" | "body", value: string) => {
    const columns = [...(module.columns ?? [])];
    columns[index] = { ...columns[index], [field]: value };
    update({ columns });
  };

  const libraryItems = contentLibrary.map((item) => ({ id: item.id, label: item.title }));

  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Module inspector</h3>
          <p className="text-xs text-[var(--text-tertiary)]">Editing: {module.title ?? module.type}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => void copyBlueprint()}
            className="rounded-full border border-[var(--border-default)] px-3 py-1 uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Copy blueprint
          </button>
          {template ? (
            <button
              type="button"
              onClick={resetToTemplate}
              className="rounded-full border border-[var(--border-default)] px-3 py-1 uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              Reset template
            </button>
          ) : null}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {(["properties", "content", "data"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-3 py-1 uppercase tracking-[0.18em] ${
              activeTab === tab
                ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                : "border border-[var(--border-default)] text-[var(--text-secondary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-4 text-sm">
        {activeTab === "properties" ? (
          <div className="space-y-4">
            {(module.type === "hero" || module.type === "cta" || module.type === "stat-block") ? (
              <button
                type="button"
                onClick={applyPreset}
                className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Apply preset content
              </button>
            ) : null}
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Title</span>
              <input className="input" value={module.title ?? ""} onChange={(event) => update({ title: event.target.value })} />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Subtitle</span>
              <input
                className="input"
                value={module.subtitle ?? ""}
                onChange={(event) => update({ subtitle: event.target.value })}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Layout</span>
              <select
                className="input"
                value={module.layout ?? ""}
                onChange={(event) => update({ layout: (event.target.value as PageModule["layout"]) || undefined })}
              >
                <option value="">Auto</option>
                <option value="grid">Grid</option>
                <option value="dual">Dual</option>
                <option value="list">List</option>
                <option value="split">Split</option>
              </select>
            </label>
            {module.type === "hero" ? (
              <label className="grid gap-2">
                <span className="text-[var(--text-tertiary)]">Verb highlight</span>
                <input className="input" value={module.verb ?? ""} onChange={(event) => update({ verb: event.target.value })} />
              </label>
            ) : null}
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border-default)] px-4 py-2 text-xs">
              <span className="text-[var(--text-secondary)]">Pinned on homepage</span>
              <button
                type="button"
                onClick={() => update({ pinned: !module.pinned })}
                className={`rounded-full px-3 py-1 uppercase tracking-[0.2em] ${
                  module.pinned
                    ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                    : "border border-[var(--border-default)] text-[var(--text-secondary)]"
                }`}
              >
                {module.pinned ? "Yes" : "No"}
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Actions</span>
                <button
                  type="button"
                  onClick={() => update({ actions: [...(module.actions ?? []), { label: "Call to action", href: "#" }] })}
                  className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                >
                  Add action
                </button>
              </div>
              {(module.actions ?? []).length === 0 ? (
                <p className="text-xs text-[var(--text-tertiary)]">No actions configured.</p>
              ) : (
                (module.actions ?? []).map((action, index) => (
                  <div key={index} className="grid gap-2 rounded-2xl border border-[var(--border-default)] p-3">
                    <label className="grid gap-1 text-xs">
                      <span className="text-[var(--text-tertiary)]">Label</span>
                      <input
                        className="input"
                        value={action.label}
                        onChange={(event) => updateAction(index, "label", event.target.value)}
                      />
                    </label>
                    <label className="grid gap-1 text-xs">
                      <span className="text-[var(--text-tertiary)]">Href</span>
                      <input
                        className="input"
                        value={action.href}
                        onChange={(event) => updateAction(index, "href", event.target.value)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => update({ actions: (module.actions ?? []).filter((_, idx) => idx !== index) })}
                      className="justify-self-end rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-status-error)]"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Stats</span>
                <button
                  type="button"
                  onClick={() =>
                    update({
                      stats: [...(module.stats ?? []), { label: "Metric", value: "0", tone: "positive" }]
                    })
                  }
                  className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                >
                  Add stat
                </button>
              </div>
              {(module.stats ?? []).length === 0 ? (
                <p className="text-xs text-[var(--text-tertiary)]">No metrics attached.</p>
              ) : (
                (module.stats ?? []).map((stat, index) => (
                  <div key={index} className="grid gap-2 rounded-2xl border border-[var(--border-default)] p-3">
                    <label className="grid gap-1 text-xs">
                      <span className="text-[var(--text-tertiary)]">Label</span>
                      <input className="input" value={stat.label} onChange={(event) => updateStat(index, "label", event.target.value)} />
                    </label>
                    <label className="grid gap-1 text-xs">
                      <span className="text-[var(--text-tertiary)]">Value</span>
                      <input className="input" value={stat.value} onChange={(event) => updateStat(index, "value", event.target.value)} />
                    </label>
                    <label className="grid gap-1 text-xs">
                      <span className="text-[var(--text-tertiary)]">Tone</span>
                      <select
                        className="input"
                        value={stat.tone ?? "neutral"}
                        onChange={(event) =>
                          updateStat(index, "tone", event.target.value === "neutral" ? "" : (event.target.value as ModuleStat["tone"]))
                        }
                      >
                        <option value="neutral">Neutral</option>
                        <option value="positive">Positive</option>
                        <option value="critical">Critical</option>
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => update({ stats: (module.stats ?? []).filter((_, idx) => idx !== index) })}
                      className="justify-self-end rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-status-error)]"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            {module.type === "feature-grid" ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Columns</span>
                  <button
                    type="button"
                    onClick={() =>
                      update({ columns: [...(module.columns ?? []), { title: "New column", body: "Describe the feature." }] })
                    }
                    className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                  >
                    Add column
                  </button>
                </div>
                {(module.columns ?? []).map((column, index) => (
                  <div key={index} className="grid gap-2 rounded-2xl border border-[var(--border-default)] p-3">
                    <label className="grid gap-1 text-xs">
                      <span className="text-[var(--text-tertiary)]">Title</span>
                      <input className="input" value={column.title} onChange={(event) => updateColumn(index, "title", event.target.value)} />
                    </label>
                    <label className="grid gap-1 text-xs">
                      <span className="text-[var(--text-tertiary)]">Body</span>
                      <textarea className="input" value={column.body} onChange={(event) => updateColumn(index, "body", event.target.value)} />
                    </label>
                    <button
                      type="button"
                      onClick={() => update({ columns: (module.columns ?? []).filter((_, idx) => idx !== index) })}
                      className="justify-self-end rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-status-error)]"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : activeTab === "content" ? (
          <div className="space-y-4">
            {module.type === "list" ? (
              <button
                type="button"
                onClick={syncPinnedFromLibrary}
                className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Pull pinned releases
              </button>
            ) : null}
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Description</span>
              <textarea
                className="input min-h-[120px]"
                value={module.description ?? ""}
                onChange={(event) => update({ description: event.target.value })}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Rich narrative</span>
              <RichTextEditor value={module.body ?? ""} onChange={(value) => update({ body: value })} />
            </label>
            {module.media ? (
              <div className="grid gap-3 rounded-2xl border border-[var(--border-default)] p-3 text-xs">
                <label className="grid gap-1">
                  <span className="text-[var(--text-tertiary)]">Media type</span>
                  <select
                    className="input"
                    value={module.media.type}
                    onChange={(event) => update({ media: { ...module.media!, type: event.target.value as ModuleMedia["type"] } })}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="chart">Chart</option>
                  </select>
                </label>
                <label className="grid gap-1">
                  <span className="text-[var(--text-tertiary)]">Source</span>
                  <input
                    className="input"
                    value={module.media.src}
                    onChange={(event) => update({ media: { ...module.media!, src: event.target.value } })}
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-[var(--text-tertiary)]">Caption</span>
                  <input
                    className="input"
                    value={module.media.caption ?? ""}
                    onChange={(event) => update({ media: { ...module.media!, caption: event.target.value } })}
                  />
                </label>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => update({ media: { type: "image", src: "/assets/placeholder/media.jpg" } })}
                className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]"
              >
                Attach media
              </button>
            )}
            {module.type === "list" ? (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Linked content</span>
                <div className="flex gap-2">
                  <select
                    className="input"
                    onChange={(event) => {
                      if (!event.target.value) return;
                      update({ items: [...(module.items ?? []), event.target.value] });
                      event.target.value = "";
                    }}
                  >
                    <option value="">Add from library</option>
                    {libraryItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => update({ items: [...(module.items ?? []), `custom-${generateId("item")}`] })}
                    className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                  >
                    Add custom
                  </button>
                </div>
                <ul className="space-y-2 text-xs">
                  {(module.items ?? []).map((itemId, index) => {
                    const item = libraryItems.find((entry) => entry.id === itemId);
                    return (
                      <li key={`${itemId}-${index}`} className="flex items-center justify-between rounded-2xl border border-[var(--border-default)] px-3 py-2">
                        <span className="text-[var(--text-secondary)]">{item ? item.label : itemId}</span>
                        <button
                          type="button"
                          onClick={() => update({ items: (module.items ?? []).filter((_, idx) => idx !== index) })}
                          className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-error)]"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4">
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Data feed</span>
              <select
                className="input"
                value={module.feedId ?? ""}
                onChange={(event) => update({ feedId: event.target.value || undefined })}
              >
                <option value="">No feed</option>
                {dataFeeds.map((feed) => (
                  <option key={feed.id} value={feed.id}>
                    {feed.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={connectDefaultFeed}
              className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              Connect first live feed
            </button>
            {module.feedId ? (
              <p className="text-xs text-[var(--text-secondary)]">
                Connected to {module.feedId}. Refresh cadence {dataFeeds.find((feed) => feed.id === module.feedId)?.refreshInterval}.
              </p>
            ) : (
              <p className="text-xs text-[var(--text-tertiary)]">Attach a data feed to stream live telemetry into this module.</p>
            )}
            <div className="rounded-2xl border border-[var(--border-default)] p-4 text-xs text-[var(--text-secondary)]">
              <p className="font-semibold text-[var(--text-primary)]">Library references</p>
              <ul className="mt-2 space-y-1">
                {contentLibrary.slice(0, 5).map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.title}</span>
                    <span className="text-[var(--text-tertiary)]">{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [html, setHtml] = useState<string>(value);

  useEffect(() => {
    setHtml(value);
  }, [value]);

  return (
    <div className="space-y-2">
      <div
        className="min-h-[140px] rounded-2xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-4 text-sm text-[var(--text-secondary)] focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => {
          const next = (event.currentTarget as HTMLDivElement).innerHTML;
          setHtml(next);
          onChange(next);
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="rounded-2xl border border-[var(--border-default)] p-3 text-xs text-[var(--text-tertiary)]">
        Preview
        <div className="mt-2 space-y-2 text-[var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

function ContentLibraryManager({ items, pages, onChange }: { items: ContentItem[]; pages: PageDefinition[]; onChange: (items: ContentItem[]) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (!selectedId && items.length > 0) {
      setSelectedId(items[0].id);
    }
  }, [items, selectedId]);

  const selectedItem = items.find((item) => item.id === selectedId) ?? null;

  const updateItem = (itemId: string, update: (item: ContentItem) => ContentItem) => {
    onChange(items.map((item) => (item.id === itemId ? update({ ...item }) : item)));
  };

  const createItem = () => {
    const id = generateId("content");
    const item: ContentItem = {
      id,
      title: "New article",
      type: "article",
      author: "Editorial",
      publishedAt: new Date().toISOString(),
      status: "draft",
      summary: "Add a short summary",
      thumbnail: "/assets/placeholder/article.jpg",
      pinned: false,
      relatedPages: []
    };
    onChange([...items, item]);
    setSelectedId(id);
  };

  const removeItem = (itemId: string) => {
    onChange(items.filter((item) => item.id !== itemId));
    if (selectedId === itemId) {
      setSelectedId(items.filter((item) => item.id !== itemId)[0]?.id ?? null);
    }
  };

  const publishedCount = items.filter((item) => item.status === "published").length;
  const draftCount = items.filter((item) => item.status !== "published").length;
  const pinnedCount = items.filter((item) => item.pinned).length;
  const typeDistribution = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Content library</h2>
            <button
              type="button"
            onClick={createItem}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <PlusIcon /> New
          </button>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                selectedId === item.id
                  ? "border-[var(--text-status-warning)] bg-[var(--bg-secondary)]"
                  : "border-[var(--border-default)] bg-[var(--bg-secondary)] hover:border-[var(--text-status-warning)]"
              }`}
            >
              <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{item.type} · {item.status}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        {selectedItem ? (
          <div className="space-y-4 text-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
                <p className="text-xs text-[var(--text-tertiary)]">{selectedItem.id}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => updateItem(selectedItem.id, (item) => ({ ...item, pinned: !item.pinned }))}
                  className={`rounded-full px-3 py-1 uppercase tracking-[0.18em] ${
                    selectedItem.pinned
                      ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                      : "border border-[var(--border-default)] text-[var(--text-secondary)]"
                  }`}
                >
                  {selectedItem.pinned ? "Pinned" : "Pin"}
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(selectedItem.id)}
                  className="rounded-full border border-[var(--border-default)] px-3 py-1 uppercase tracking-[0.18em] text-[var(--text-status-error)]"
                >
                  Delete
                </button>
              </div>
            </div>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Title</span>
              <input
                className="input"
                value={selectedItem.title}
                onChange={(event) => updateItem(selectedItem.id, (item) => ({ ...item, title: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Author</span>
              <input
                className="input"
                value={selectedItem.author}
                onChange={(event) => updateItem(selectedItem.id, (item) => ({ ...item, author: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Summary</span>
              <textarea
                className="input min-h-[120px]"
                value={selectedItem.summary}
                onChange={(event) => updateItem(selectedItem.id, (item) => ({ ...item, summary: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Thumbnail</span>
              <input
                className="input"
                value={selectedItem.thumbnail ?? ""}
                onChange={(event) => updateItem(selectedItem.id, (item) => ({ ...item, thumbnail: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Status</span>
              <select
                className="input"
                value={selectedItem.status}
                onChange={(event) => updateItem(selectedItem.id, (item) => ({ ...item, status: event.target.value as ContentItem["status"] }))}
              >
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="published">Published</option>
              </select>
            </label>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Related pages</span>
              <div className="flex flex-wrap gap-2">
                {pages.map((page) => {
                  const selected = selectedItem.relatedPages.includes(page.id);
                  return (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() =>
                        updateItem(selectedItem.id, (item) => ({
                          ...item,
                          relatedPages: selected
                            ? item.relatedPages.filter((id) => id !== page.id)
                            : [...item.relatedPages, page.id]
                        }))
                      }
                      className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                        selected
                          ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                          : "border border-[var(--border-default)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {page.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-tertiary)]">Select a content item to edit metadata and publication state.</p>
        )}
      </div>
    </div>
  );
}

function DataFeedManager({ feeds, modules, onChange }: { feeds: DataFeed[]; modules: PageModule[]; onChange: (feeds: DataFeed[]) => void }) {
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(feeds[0]?.id ?? null);

  useEffect(() => {
    if (!selectedFeedId && feeds.length > 0) {
      setSelectedFeedId(feeds[0].id);
    }
  }, [feeds, selectedFeedId]);

  const selectedFeed = feeds.find((feed) => feed.id === selectedFeedId) ?? null;

  const updateFeed = (feedId: string, update: (feed: DataFeed) => DataFeed) => {
    onChange(feeds.map((feed) => (feed.id === feedId ? update({ ...feed }) : feed)));
  };

  const createFeed = () => {
    const id = generateId("feed");
    const feed: DataFeed = {
      id,
      name: "New feed",
      description: "Describe the data source",
      source: "https://api.aeterna/internal",
      refreshInterval: "5m",
      format: "json",
      status: "offline",
      connectedModules: []
    };
    onChange([...feeds, feed]);
    setSelectedFeedId(id);
  };

  const removeFeed = (feedId: string) => {
    onChange(feeds.filter((feed) => feed.id !== feedId));
    if (selectedFeedId === feedId) {
      setSelectedFeedId(feeds.filter((feed) => feed.id !== feedId)[0]?.id ?? null);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Data feeds</h2>
          <button
            type="button"
            onClick={createFeed}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <PlusIcon /> New
          </button>
        </div>
        <div className="space-y-3">
          {feeds.map((feed) => (
            <button
              key={feed.id}
              type="button"
              onClick={() => setSelectedFeedId(feed.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                selectedFeedId === feed.id
                  ? "border-[var(--text-status-warning)] bg-[var(--bg-secondary)]"
                  : "border-[var(--border-default)] bg-[var(--bg-secondary)] hover:border-[var(--text-status-warning)]"
              }`}
            >
              <p className="text-sm font-semibold text-[var(--text-primary)]">{feed.name}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{feed.refreshInterval} · {feed.status}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        {selectedFeed ? (
          <div className="space-y-4 text-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedFeed.name}</h3>
                <p className="text-xs text-[var(--text-tertiary)]">{selectedFeed.source}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => removeFeed(selectedFeed.id)}
                  className="rounded-full border border-[var(--border-default)] px-3 py-1 uppercase tracking-[0.18em] text-[var(--text-status-error)]"
                >
                  Delete
                </button>
              </div>
            </div>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Name</span>
              <input
                className="input"
                value={selectedFeed.name}
                onChange={(event) => updateFeed(selectedFeed.id, (feed) => ({ ...feed, name: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Description</span>
              <textarea
                className="input min-h-[100px]"
                value={selectedFeed.description}
                onChange={(event) => updateFeed(selectedFeed.id, (feed) => ({ ...feed, description: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Source URL</span>
              <input
                className="input"
                value={selectedFeed.source}
                onChange={(event) => updateFeed(selectedFeed.id, (feed) => ({ ...feed, source: event.target.value }))}
              />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[var(--text-tertiary)]">Refresh interval</span>
                <input
                  className="input"
                  value={selectedFeed.refreshInterval}
                  onChange={(event) => updateFeed(selectedFeed.id, (feed) => ({ ...feed, refreshInterval: event.target.value }))}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[var(--text-tertiary)]">Format</span>
                <select
                  className="input"
                  value={selectedFeed.format}
                  onChange={(event) => updateFeed(selectedFeed.id, (feed) => ({ ...feed, format: event.target.value as DataFeed["format"] }))}
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                  <option value="websocket">WebSocket</option>
                </select>
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-[var(--text-tertiary)]">Status</span>
              <select
                className="input"
                value={selectedFeed.status}
                onChange={(event) => updateFeed(selectedFeed.id, (feed) => ({ ...feed, status: event.target.value as DataFeed["status"] }))}
              >
                <option value="connected">Connected</option>
                <option value="degraded">Degraded</option>
                <option value="offline">Offline</option>
              </select>
            </label>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Connected modules</span>
              <div className="flex flex-wrap gap-2">
                {modules.map((module) => {
                  const selected = selectedFeed.connectedModules.includes(module.id);
                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() =>
                        updateFeed(selectedFeed.id, (feed) => ({
                          ...feed,
                          connectedModules: selected
                            ? feed.connectedModules.filter((id) => id !== module.id)
                            : [...feed.connectedModules, module.id]
                        }))
                      }
                      className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                        selected
                          ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                          : "border border-[var(--border-default)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {module.title ?? module.type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-tertiary)]">Select a feed to manage connectivity and module bindings.</p>
        )}
      </div>
    </div>
  );
}

function SettingsPanel({
  config,
  onConfigChange,
  onClearActivityLog,
  activityCount
}: {
  config: SiteConfig;
  onConfigChange: (updater: (config: SiteConfig) => SiteConfig) => void;
  onClearActivityLog: () => void;
  activityCount: number;
}) {
  const pinnedContent = config.homepage.pinnedReleases;
  const featuredModules = config.homepage.featuredModules;

  const togglePinned = (id: string) => {
    onConfigChange((current) => ({
      ...current,
      homepage: {
        ...current.homepage,
        pinnedReleases: pinnedContent.includes(id)
          ? current.homepage.pinnedReleases.filter((release) => release !== id)
          : [...current.homepage.pinnedReleases, id]
      }
    }));
  };

  const toggleFeatured = (id: string) => {
    onConfigChange((current) => ({
      ...current,
      homepage: {
        ...current.homepage,
        featuredModules: featuredModules.includes(id)
          ? current.homepage.featuredModules.filter((module) => module !== id)
          : [...current.homepage.featuredModules, id]
      }
    }));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        <h2 className="text-lg font-semibold">Homepage releases</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Control which launches stay pinned to the top of the hero canvas.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {config.contentLibrary.map((item) => {
            const selected = pinnedContent.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => togglePinned(item.id)}
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                  selected
                    ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                    : "border border-[var(--border-default)] text-[var(--text-secondary)]"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        <h2 className="text-lg font-semibold">Featured modules</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Choose the modules that compose the hero spotlight.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {config.pages.flatMap((page) => page.modules).map((module) => {
            const selected = featuredModules.includes(module.id);
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => toggleFeatured(module.id)}
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                  selected
                    ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)]"
                    : "border border-[var(--border-default)] text-[var(--text-secondary)]"
                }`}
              >
                {module.title ?? module.type}
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        <h2 className="text-lg font-semibold">Spotlight page</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Select which product or mission gets the primary hero CTA.</p>
        <select
          className="mt-4 input"
          value={config.homepage.spotlightPageId ?? ""}
          onChange={(event) =>
            onConfigChange((current) => ({
              ...current,
              homepage: { ...current.homepage, spotlightPageId: event.target.value || null }
            }))
          }
        >
          <option value="">None</option>
          {config.pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        <h2 className="text-lg font-semibold">Deployment notes</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Export the JSON after making edits to propagate changes to the static site or connect the admin API endpoint to your
          deployment pipeline.
        </p>
        <ul className="mt-4 space-y-2 text-xs text-[var(--text-tertiary)]">
          <li>1. Review navigation and module arrangements in the builder.</li>
          <li>2. Export configuration and commit to the repository configuration folder.</li>
          <li>3. Trigger CI to regenerate static pages via `next export`.</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        <h2 className="text-lg font-semibold">Activity ledger</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Local-only change history used by the overview timeline. Clear it before switching operators.
        </p>
        <div className="mt-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
          <span>
            {activityCount} {activityCount === 1 ? "event" : "events"} tracked
          </span>
          <button
            type="button"
            onClick={onClearActivityLog}
            className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Clear history
          </button>
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Library analytics</h3>
        <p className="text-sm text-[var(--text-secondary)]">Snapshot of editorial coverage for cross-checking dynamic modules.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4 text-sm">
            <p className="text-[var(--text-tertiary)]">Published</p>
            <p className="text-xl font-semibold text-[var(--text-status-warning)]">{publishedCount}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4 text-sm">
            <p className="text-[var(--text-tertiary)]">Draft & review</p>
            <p className="text-xl font-semibold text-[var(--text-status-error)]">{draftCount}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4 text-sm">
            <p className="text-[var(--text-tertiary)]">Pinned assets</p>
            <p className="text-xl font-semibold text-[var(--text-primary)]">{pinnedCount}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 text-xs text-[var(--text-secondary)] sm:grid-cols-2">
          {Object.entries(typeDistribution).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between rounded-xl border border-[var(--border-light)] bg-[var(--bg-primary)] px-3 py-2">
              <span className="uppercase tracking-[0.18em]">{type}</span>
              <span className="font-semibold text-[var(--text-primary)]">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return <span className="inline-flex h-4 w-4 items-center justify-center">+</span>;
}

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function JsonEditorSection({
  title,
  description,
  value,
  onApply
}: {
  title: string;
  description: string;
  value: unknown;
  onApply: (parsed: any) => void;
}) {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);
  const stats = useMemo(() => {
    return {
      lines: draft.split(/\r?\n/).length,
      characters: draft.length
    };
  }, [draft]);

  useEffect(() => {
    setDraft(JSON.stringify(value, null, 2));
  }, [value]);

  const beautifyDraft = () => {
    try {
      const parsed = JSON.parse(draft);
      setDraft(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch {
      setError("Beautify failed – invalid JSON");
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(draft);
      onApply(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON structure");
    }
  };

  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{description}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDraft(JSON.stringify(value, null, 2))}
            className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={beautifyDraft}
            className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Beautify
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="rounded-full bg-[var(--interactive-bg-accent-default)] px-4 py-1 text-xs font-semibold text-[var(--text-accent)] transition hover:bg-[var(--interactive-bg-accent-hover)]"
          >
            Apply
          </button>
        </div>
      </div>
      <textarea
        className="mt-4 h-64 w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4 font-mono text-xs text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
        value={draft}
        spellCheck={false}
        onChange={(event) => setDraft(event.target.value)}
      />
      {error ? <p className="mt-2 text-xs text-[var(--text-status-error)]">{error}</p> : null}
      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        {stats.lines} lines · {stats.characters} characters
      </p>
    </div>
  );
}

function ThemeDesigner({ theme, onChange }: { theme: ThemeCollections; onChange: (theme: ThemeCollections) => void }) {
  const updatePalette = (index: number, update: Partial<ThemeCollections["palettes"][number]>) => {
    const next = {
      ...theme,
      palettes: theme.palettes.map((palette, idx) => (idx === index ? { ...palette, ...update } : palette))
    };
    onChange(next);
  };

  const removePalette = (id: string) => {
    if (theme.palettes.length <= 1) return;
    onChange({ ...theme, palettes: theme.palettes.filter((palette) => palette.id !== id) });
  };

  const addPalette = () => {
    const next = {
      ...theme,
      palettes: [
        ...theme.palettes,
        {
          id: generateId("palette"),
          name: "New palette",
          primary: "#ffffff",
          secondary: "#0f172a",
          accent: "#38bdf8",
          background: "#0f172a",
          useCase: ""
        }
      ]
    };
    onChange(next);
  };

  const updateTypography = (index: number, update: Partial<ThemeCollections["typography"][number]>) => {
    onChange({
      ...theme,
      typography: theme.typography.map((token, idx) => (idx === index ? { ...token, ...update } : token))
    });
  };

  return (
    <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Theme palettes</h3>
          <p className="text-sm text-[var(--text-secondary)]">Curate the color systems used across hero, modules, and automations dashboards.</p>
        </div>
        <button
          type="button"
          onClick={addPalette}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
          Add palette
        </button>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {theme.palettes.map((palette, index) => (
          <div key={palette.id} className="space-y-4 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4">
            <div className="flex items-center justify-between gap-4">
              <input
                className="w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                value={palette.name}
                onChange={(event) => updatePalette(index, { name: event.target.value })}
                placeholder="Palette name"
              />
              <button
                type="button"
                onClick={() => removePalette(palette.id)}
                className="text-xs text-[var(--text-tertiary)] transition hover:text-[var(--text-status-error)]"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <label className="space-y-1">
                <span className="text-[var(--text-tertiary)]">Primary</span>
                <input
                  type="color"
                  value={palette.primary}
                  onChange={(event) => updatePalette(index, { primary: event.target.value })}
                  className="h-10 w-full cursor-pointer rounded"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[var(--text-tertiary)]">Secondary</span>
                <input
                  type="color"
                  value={palette.secondary}
                  onChange={(event) => updatePalette(index, { secondary: event.target.value })}
                  className="h-10 w-full cursor-pointer rounded"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[var(--text-tertiary)]">Accent</span>
                <input
                  type="color"
                  value={palette.accent}
                  onChange={(event) => updatePalette(index, { accent: event.target.value })}
                  className="h-10 w-full cursor-pointer rounded"
                />
              </label>
              <label className="space-y-1 col-span-2">
                <span className="text-[var(--text-tertiary)]">Background</span>
                <input
                  className="w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                  value={palette.background}
                  onChange={(event) => updatePalette(index, { background: event.target.value })}
                  placeholder="CSS background value"
                />
              </label>
              <label className="space-y-1 col-span-2">
                <span className="text-[var(--text-tertiary)]">Use case</span>
                <input
                  className="w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                  value={palette.useCase}
                  onChange={(event) => updatePalette(index, { useCase: event.target.value })}
                  placeholder="Where this palette is applied"
                />
              </label>
            </div>
            <div className="rounded-xl border border-[var(--border-default)] p-4" style={{ background: palette.background }}>
              <p className="text-sm font-semibold" style={{ color: palette.primary }}>
                Preview headline
              </p>
              <p className="text-xs" style={{ color: palette.secondary }}>
                Body copy using secondary color.
              </p>
              <span className="mt-2 inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: palette.accent }}>
                Accent signal
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Typography scale</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {theme.typography.map((token, index) => (
            <div key={token.token} className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-4">
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--text-tertiary)]">
                <span>{token.token}</span>
              </div>
              <input
                className="mt-3 w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                value={token.value}
                onChange={(event) => updateTypography(index, { value: event.target.value })}
                placeholder="Value"
              />
              <input
                className="mt-2 w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                value={token.usage}
                onChange={(event) => updateTypography(index, { usage: event.target.value })}
                placeholder="Usage"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectionsManager({
  collections,
  onChange
}: {
  collections: Collections;
  onChange: (
    updater: (collections: Collections) => Collections,
    message?: string,
    audit?: { summary: string; target?: string; detail?: string }
  ) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <JsonEditorSection
        title="Mega navigation"
        description="Edit the structured navigation powering the mega menu, secondary panels, and top-level anchors."
        value={collections.navigation}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              navigation: value as Collections["navigation"]
            }),
            "Navigation schema updated",
            { summary: "Updated navigation schema", target: "Navigation" }
          )
        }
      />
      <JsonEditorSection
        title="Hero narrative"
        description="Mission verbs, rotating search prompts, releases, and analytic signals shown on the homepage hero."
        value={collections.hero}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              hero: value as HeroCollection
            }),
            "Hero collection updated",
            { summary: "Refined hero narrative", target: "Hero" }
          )
        }
      />
      <JsonEditorSection
        title="Home ecosystem"
        description="Ecosystem nodes, campus stats, alliance descriptors, and roadmap milestones."
        value={collections.home}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              home: value as HomeCollection
            }),
            "Home ecosystem updated",
            { summary: "Adjusted home collections", target: "Home" }
          )
        }
      />
      <JsonEditorSection
        title="Program catalog"
        description="Categories, actions, and metrics for the programs grid."
        value={collections.programs}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              programs: value as ProgramsCollection
            }),
            "Program catalog updated",
            { summary: "Updated programs", target: "Programs" }
          )
        }
      />
      <JsonEditorSection
        title="Insights feed"
        description="Editorial articles and signals displayed in the insights module."
        value={collections.insights}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              insights: value as InsightsCollection
            }),
            "Insights feed updated",
            { summary: "Curated insights", target: "Insights" }
          )
        }
      />
      <JsonEditorSection
        title="Realtime pulse"
        description="Operations transmissions, sensor readings, and live stream events."
        value={collections.pulse}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              pulse: value as PulseCollection
            }),
            "Realtime pulse updated",
            { summary: "Maintained pulse streams", target: "Pulse" }
          )
        }
      />
      <JsonEditorSection
        title="Access tiers"
        description="Portal tiers and security highlights surfaced in the access component."
        value={collections.accessPortal}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              accessPortal: value as AccessPortalCollection
            }),
            "Access portal updated",
            { summary: "Refined access tiers", target: "Access portal" }
          )
        }
      />
      <JsonEditorSection
        title="Footer architecture"
        description="Footer columns, contact directories, and live status tags."
        value={collections.footer}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              footer: value as FooterCollection
            }),
            "Footer collection updated",
            { summary: "Updated footer architecture", target: "Footer" }
          )
        }
      />
      {Object.entries(collections.pages).map(([slug, content]) => (
        <JsonEditorSection
          key={slug}
          title={`Dynamic page: ${slug}`}
          description="Module definitions for dynamic routes sourced from the JSON database."
          value={content}
          onApply={(value) =>
            onChange(
              (current) => ({
                ...current,
                pages: { ...current.pages, [slug]: value }
              }),
              `Updated JSON for ${slug}`,
              { summary: `Edited collection for ${slug}`, target: "Dynamic page" }
            )
          }
        />
      ))}
      <JsonEditorSection
        title="Legal content — Terms"
        description="Update headline, lead, and sections for the terms of use page."
        value={collections.legal.terms}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              legal: { ...current.legal, terms: value as StaticPageContent }
            }),
            "Terms content updated",
            { summary: "Edited terms of use", target: "Legal" }
          )
        }
      />
      <JsonEditorSection
        title="Legal content — Privacy"
        description="Edit privacy policy sections and lead paragraphs."
        value={collections.legal.privacy}
        onApply={(value) =>
          onChange(
            (current) => ({
              ...current,
              legal: { ...current.legal, privacy: value as StaticPageContent }
            }),
            "Privacy content updated",
            { summary: "Updated privacy policy", target: "Legal" }
          )
        }
      />
      <div className="lg:col-span-2">
        <ThemeDesigner
          theme={collections.theme}
          onChange={(theme) =>
            onChange(
              (current) => ({ ...current, theme }),
              "Theme tokens updated",
              { summary: "Refined design system", target: "Theme" }
            )
          }
        />
      </div>
    </div>
  );
}

function AutomationManager({
  automations,
  onChange
}: {
  automations: AutomationRule[];
  onChange: (rules: AutomationRule[]) => void;
}) {
  const toggleStatus = (id: string) => {
    onChange(
      automations.map((rule) =>
        rule.id === id ? { ...rule, status: rule.status === "active" ? "paused" : "active" } : rule
      )
    );
  };

  const updateRule = (id: string, update: Partial<AutomationRule>) => {
    onChange(automations.map((rule) => (rule.id === id ? { ...rule, ...update } : rule)));
  };

  const addRule = () => {
    onChange([
      ...automations,
      {
        id: generateId("automation"),
        name: "New automation",
        description: "Describe what this automation accomplishes.",
        trigger: "content.created",
        action: "notify.owners",
        status: "active"
      }
    ]);
  };

  const removeRule = (id: string) => {
    onChange(automations.filter((rule) => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Automation rules</h2>
          <p className="text-sm text-[var(--text-secondary)]">Orchestrate webhook triggers, publishing workflows, and alerting pipelines.</p>
        </div>
        <button
          type="button"
          onClick={addRule}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
          <PlusIcon /> Add automation
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {automations.map((rule) => (
          <div key={rule.id} className="space-y-4 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <input
                  className="w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm font-semibold text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                  value={rule.name}
                  onChange={(event) => updateRule(rule.id, { name: event.target.value })}
                />
                <textarea
                  className="h-20 w-full rounded-2xl border border-[var(--border-light)] bg-[var(--bg-primary)] p-3 text-xs text-[var(--text-secondary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                  value={rule.description}
                  onChange={(event) => updateRule(rule.id, { description: event.target.value })}
                />
              </div>
              <button
                type="button"
                onClick={() => removeRule(rule.id)}
                className="text-xs text-[var(--text-tertiary)] transition hover:text-[var(--text-status-error)]"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-3 text-xs text-[var(--text-secondary)]">
              <label className="space-y-1">
                <span>Trigger</span>
                <input
                  className="w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                  value={rule.trigger}
                  onChange={(event) => updateRule(rule.id, { trigger: event.target.value })}
                />
              </label>
              <label className="space-y-1">
                <span>Action</span>
                <input
                  className="w-full rounded-full border border-[var(--border-default)] px-3 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                  value={rule.action}
                  onChange={(event) => updateRule(rule.id, { action: event.target.value })}
                />
              </label>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${rule.status === "active" ? "text-[var(--text-status-warning)]" : "text-[var(--text-tertiary)]"}`}>
                  {rule.status === "active" ? "Active" : "Paused"}
                </span>
                <button
                  type="button"
                  onClick={() => toggleStatus(rule.id)}
                  className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  Toggle status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
