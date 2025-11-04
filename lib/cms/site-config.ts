import rawConfig from "@/data/site-config.json";
import type { SiteConfig } from "./types";

export const siteConfig = rawConfig as SiteConfig;

export function getNavigationCollections() {
  return siteConfig.collections.navigation;
}

export function getHeroCollection() {
  return siteConfig.collections.hero;
}

export function getHomeCollection() {
  return siteConfig.collections.home;
}

export function getProgramsCollection() {
  return siteConfig.collections.programs;
}

export function getInsightsCollection() {
  return siteConfig.collections.insights;
}

export function getPulseCollection() {
  return siteConfig.collections.pulse;
}

export function getAccessPortalCollection() {
  return siteConfig.collections.accessPortal;
}

export function getFooterCollection() {
  return siteConfig.collections.footer;
}

export function getPageContent(slug: string) {
  return siteConfig.collections.pages[slug];
}

export function getLegalContent(key: "terms" | "privacy") {
  return siteConfig.collections.legal[key];
}

export function getThemeCollections() {
  return siteConfig.collections.theme;
}

export function getAutomationRules() {
  return siteConfig.collections.automations;
}

export default siteConfig;
