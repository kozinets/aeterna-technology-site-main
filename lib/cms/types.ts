export type Tone = "positive" | "critical";

export type NavigationNode = {
  id: string;
  label: string;
  href?: string;
  badge?: string;
  description?: string;
  children?: NavigationNode[];
  type?: "section" | "link";
};

export type ModuleType =
  | "hero"
  | "stat-block"
  | "feature-grid"
  | "media"
  | "list"
  | "feed"
  | "timeline"
  | "cta"
  | "markdown";

export type ModuleAction = { label: string; href: string };

export type ModuleStat = { label: string; value: string; tone?: Tone };

export type ModuleMedia = { type: "image" | "video" | "chart"; src: string; caption?: string };

export type PageModule = {
  id: string;
  type: ModuleType;
  title?: string;
  subtitle?: string;
  description?: string;
  body?: string;
  verb?: string;
  actions?: ModuleAction[];
  stats?: ModuleStat[];
  items?: string[];
  feedId?: string;
  layout?: "grid" | "dual" | "list" | "split";
  media?: ModuleMedia;
  pinned?: boolean;
  columns?: { title: string; body: string }[];
};

export type PageDefinition = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "draft" | "review" | "scheduled" | "published";
  tags: string[];
  lastUpdated: string;
  modules: PageModule[];
};

export type ContentItem = {
  id: string;
  title: string;
  type: "article" | "release" | "update" | "brief";
  author: string;
  publishedAt: string;
  status: "draft" | "review" | "published";
  summary: string;
  thumbnail?: string;
  pinned?: boolean;
  relatedPages: string[];
};

export type DataFeed = {
  id: string;
  name: string;
  description: string;
  source: string;
  refreshInterval: string;
  format: "json" | "csv" | "xml" | "websocket";
  status: "connected" | "degraded" | "offline";
  connectedModules: string[];
};

export type MegaMenuItem = {
  id: string;
  title: string;
  summary: string;
  href: string;
  badge?: string;
  focus: string;
  preview: string;
  metrics: string[];
};

export type MegaMenuSection = {
  id: string;
  title: string;
  description: string;
  meta: string;
  items: MegaMenuItem[];
};

export type TopNavItem =
  | { id: string; label: string; type: "mega" | "secondary" }
  | { id: string; label: string; type: "anchor"; href: string };

export type SecondaryPanelItem = {
  title: string;
  description: string;
  href: string;
  tone?: Tone;
  meta?: string;
};

export type SecondaryPanelGroup = {
  title: string;
  items: SecondaryPanelItem[];
};

export type NavigationCollections = {
  sections: MegaMenuSection[];
  top: TopNavItem[];
  secondary: Record<string, SecondaryPanelGroup[]>;
};

export type HeroThread = { title: string; detail: string; tone: Tone };
export type HeroFeatureStory = {
  tag: string;
  title: string;
  description: string;
  action: string;
  href: string;
  tone: Tone;
};
export type HeroFeedItem = { label: string; detail: string; tone: Tone };
export type HeroRelease = {
  id: string;
  tag: string;
  title: string;
  summary: string;
  time: string;
  href: string;
  pinned?: boolean;
};
export type HeroKnowledgeItem = { id: string; tag: string; title: string; time: string; href: string };
export type HeroAnalyticsItem = { signal: string; value: string; detail: string; tone: Tone };

export type HeroCollection = {
  verbs: string[];
  searchExamples: string[];
  missionThreads: HeroThread[];
  featureStories: HeroFeatureStory[];
  operationsFeed: HeroFeedItem[];
  releaseFeed: HeroRelease[];
  knowledgeFeed: HeroKnowledgeItem[];
  missionAnalytics: HeroAnalyticsItem[];
  tickerItems: HeroFeedItem[];
};

export type EcosystemNode = {
  title: string;
  description: string;
  detail: string;
  streams: string[];
};

export type CampusStat = { icon: string; label: string; value: string; tone: Tone };

export type AllianceUnit = { icon: string; title: string; text: string; tone: Tone };

export type TimelineEntry = { year: string; description: string; tone: Tone };

export type HomeCollection = {
  ecosystemNodes: EcosystemNode[];
  campusStats: CampusStat[];
  alliances: AllianceUnit[];
  timeline: TimelineEntry[];
};

export type ProgramMetric = { label: string; value: string; tone: Tone };
export type ProgramAction = { label: string; href: string; accent: boolean };
export type ProgramCategory = {
  icon: string;
  title: string;
  headline: string;
  description: string;
  actions: ProgramAction[];
  metrics: ProgramMetric[];
};

export type ProgramsCollection = {
  categories: ProgramCategory[];
};

export type InsightArticle = {
  tag: string;
  title: string;
  description: string;
  readingTime: string;
  href: string;
};

export type InsightSignal = { icon: string; title: string; description: string };

export type InsightsCollection = {
  articles: InsightArticle[];
  signals: InsightSignal[];
};

export type Transmission = { title: string; detail: string; meta: string; tone: Tone };
export type SensorReading = { label: string; value: string; icon: string };
export type StreamEvent = { label: string; text: string; tone: Tone };

export type PulseCollection = {
  transmissions: Transmission[];
  sensorGrid: SensorReading[];
  streamEvents: StreamEvent[];
};

export type AccessTier = {
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  accent: boolean;
};

export type AccessHighlight = { icon: string; description: string };

export type AccessPortalCollection = {
  tiers: AccessTier[];
  highlights: AccessHighlight[];
};

export type FooterColumn = { title: string; links: { label: string; href: string }[] };
export type FooterContact = { label: string; value: string };
export type FooterPresence = { title: string; details: string[] };

export type FooterCollection = {
  columns: FooterColumn[];
  contacts: FooterContact[];
  statusBadges: string[];
  globalPresence: FooterPresence[];
  footnotes: string[];
};

export type NovaProxyContent = {
  hero: {
    category: string;
    title: string;
    accentColor: string;
    summary: string;
    features: { icon: string; text: string }[];
    actions: { label: string; href: string; variant: "primary" | "outline" }[];
  };
  highlights: { tag: string; title: string; detail: string }[];
  nodeEconomy: { title: string; description: string }[];
  telemetryBursts: { label: string; value: string; tone: Tone }[];
  developerKits: { title: string; description: string; href: string }[];
  badges: string[];
};

export type StaticLegalSection = {
  heading: string;
  body: string[];
};

export type StaticPageContent = {
  title: string;
  lead: string;
  sections: StaticLegalSection[];
};

export type ThemePalette = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  useCase: string;
};

export type TypographyScale = {
  token: string;
  value: string;
  usage: string;
};

export type ThemeCollections = {
  palettes: ThemePalette[];
  typography: TypographyScale[];
};

export type AutomationRule = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: "active" | "paused";
};

export type Collections = {
  navigation: NavigationCollections;
  hero: HeroCollection;
  home: HomeCollection;
  programs: ProgramsCollection;
  insights: InsightsCollection;
  pulse: PulseCollection;
  accessPortal: AccessPortalCollection;
  footer: FooterCollection;
  pages: {
    [slug: string]: NovaProxyContent;
  };
  legal: {
    terms: StaticPageContent;
    privacy: StaticPageContent;
  };
  theme: ThemeCollections;
  automations: AutomationRule[];
};

export type SiteConfig = {
  navigation: NavigationNode[];
  pages: PageDefinition[];
  contentLibrary: ContentItem[];
  dataFeeds: DataFeed[];
  homepage: {
    pinnedReleases: string[];
    featuredModules: string[];
    spotlightPageId: string | null;
  };
  collections: Collections;
};
