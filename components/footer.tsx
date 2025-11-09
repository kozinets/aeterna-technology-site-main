"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe2, MapPin } from "lucide-react";
import { LanguageModal, type LocaleOption } from "./language-modal";
import { AeternaLogo } from "./aeterna-logo";
import { getFooterCollection } from "@/lib/cms/site-config";

const footerCollection = getFooterCollection();
const footerColumns = footerCollection.columns;
const operationsContacts = footerCollection.contacts;
const statusBadges = footerCollection.statusBadges;
const globalPresence = footerCollection.globalPresence ?? [];
const footnotes = footerCollection.footnotes ?? [];

type LocaleView = "language" | "region";

export function Footer() {
  const [localeOpen, setLocaleOpen] = useState(false);
  const [activeView, setActiveView] = useState<LocaleView>("language");
  const [languageSelection, setLanguageSelection] = useState<LocaleOption>({
    code: "en-US",
    name: "English (United States)",
  });
  const [regionSelection, setRegionSelection] = useState<LocaleOption>({
    code: "001",
    name: "Global network",
    flag: "🌐",
  });

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    try {
      const browserLocale = navigator.language;
      const languageDisplay = new Intl.DisplayNames([browserLocale, "en"], { type: "language" });
      const resolvedLanguage = languageDisplay.of(browserLocale) ?? browserLocale;
      setLanguageSelection((current) => ({ ...current, code: browserLocale, name: resolvedLanguage }));

      const locale = new Intl.Locale(browserLocale);
      const regionCode = locale.maximize().region ?? locale.region ?? "001";
      const regionDisplay = new Intl.DisplayNames([browserLocale, "en"], { type: "region" });
      const regionName = regionDisplay.of(regionCode) ?? regionCode;
      setRegionSelection({ code: regionCode, name: regionName, flag: getFlagEmoji(regionCode) });
    } catch {
      // Silent fallback when Intl APIs are unavailable.
    }
  }, []);

  return (
    <footer className="mt-32 border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-5">
            <Link href="/" aria-label="Aeterna Technology home" className="flex items-center">
              <AeternaLogo className="h-9" />
            </Link>
            <p className="text-sm leading-relaxed text-[var(--text-tertiary)]">
              Aeterna Technology builds the connective tissue for civilization-scale intelligence. We orchestrate sovereign
              compute, orbital logistics, neural health infrastructures, and secure payment lattices across more than 180
              jurisdictions with unified governance.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              {statusBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-warning)]"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="grid gap-3 text-xs text-[var(--text-tertiary)] sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/40 p-4">
                <p className="text-[10px] uppercase tracking-[0.26em]">Headquarters</p>
                <p className="mt-2 text-sm text-[var(--text-primary)]">Helios Continuum Campus</p>
                <p>Tycho City · Mare Tranquillitatis</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/40 p-4">
                <p className="text-[10px] uppercase tracking-[0.26em]">Global certification</p>
                <p className="mt-2 text-sm text-[var(--text-primary)]">ISO/IEC 27001 · SOC 2 Type II · Orbital Safety Mark IV</p>
                <p>Renewed: Q2 2024</p>
              </div>
            </div>
          </div>
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {footerColumns.map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{group.title}</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link className="transition hover:text-[var(--text-primary)]" href={link.href as any}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {globalPresence.length ? (
          <div className="grid gap-6 border-t border-[var(--border-light)] pt-8 md:grid-cols-2 xl:grid-cols-3">
            {globalPresence.map((cluster) => (
              <div
                key={cluster.title}
                className="rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/30 p-5 text-sm text-[var(--text-secondary)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{cluster.title}</p>
                <ul className="mt-3 space-y-2">
                  {cluster.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex flex-col gap-8 border-t border-[var(--border-light)] pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-1 gap-6 text-sm text-[var(--text-secondary)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {operationsContacts.map((contact) => (
              <div key={contact.label} className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{contact.label}</span>
                <span className="break-all">{contact.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-3 text-xs text-[var(--text-tertiary)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <span className="text-[var(--text-status-warning)]">© {new Date().getFullYear()} Aeterna Technology</span>
            <Link href="/privacy" className="transition hover:text-[var(--text-primary)]">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-[var(--text-primary)]">
              Terms
            </Link>
            <Link href="/status" className="transition hover:text-[var(--text-primary)]">
              Status
            </Link>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveView("language");
                  setLocaleOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-[var(--text-secondary)] transition hover:border-[var(--text-status-warning)] hover:text-[var(--text-primary)]"
              >
                <Globe2 className="h-4 w-4" />
                <span className="text-left">
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Language</span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{languageSelection.name}</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveView("region");
                  setLocaleOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2 text-[var(--text-secondary)] transition hover:border-[var(--text-status-warning)] hover:text-[var(--text-primary)]"
              >
                <MapPin className="h-4 w-4" />
                <span className="text-left">
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Region</span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{regionSelection.name}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        {footnotes.length ? (
          <div className="flex flex-col gap-2 border-t border-[var(--border-light)] pt-6 text-xs leading-relaxed text-[var(--text-tertiary)]">
            {footnotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        ) : null}
      </div>
      <LanguageModal
        open={localeOpen}
        onClose={() => setLocaleOpen(false)}
        view={activeView}
        onViewChange={setActiveView}
        selectedLanguage={languageSelection}
        selectedRegion={regionSelection}
        onLanguageSelect={setLanguageSelection}
        onRegionSelect={setRegionSelection}
      />
    </footer>
  );
}

function getFlagEmoji(code: string | undefined) {
  if (!code) return undefined;
  if (code === "001") {
    return "🌐";
  }
  if (code.length !== 2) {
    return undefined;
  }
  const base = 127397;
  return String.fromCodePoint(...code.toUpperCase().split("").map((char) => (char.codePointAt(0) ?? 0) + base));
}
