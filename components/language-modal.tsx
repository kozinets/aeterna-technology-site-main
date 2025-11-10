"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LocaleView = "language" | "region";

export type LocaleOption = {
  code: string;
  name: string;
  secondary?: string;
  flag?: string;
};

type LanguageModalProps = {
  open: boolean;
  onClose: () => void;
  view: LocaleView;
  onViewChange: (view: LocaleView) => void;
  selectedLanguage: LocaleOption;
  selectedRegion: LocaleOption;
  onLanguageSelect: (option: LocaleOption) => void;
  onRegionSelect: (option: LocaleOption) => void;
};

const FALLBACK_LANGUAGES = [
  "en", "zh", "es", "hi", "fr", "ar", "bn", "ru", "pt", "id", "de", "ja", "pa", "te", "vi", "ko", "it", "pl", "uk",
  "nl", "fa", "tr", "ta", "ms", "th", "gu", "he", "cs", "hu", "sv", "fi", "el", "ro", "da", "no", "sk", "sr", "bg",
  "et", "lt", "lv", "hr", "sl", "ga", "is", "af", "sw", "zu"
];

const FALLBACK_REGIONS = [
  "001", "019", "150", "142", "009", "US", "GB", "CA", "FR", "DE", "BR", "MX", "AR", "CL", "AU", "NZ", "JP", "KR", "CN",
  "SG", "IN", "AE", "SA", "NG", "KE", "ZA", "EG", "IL", "SE", "NO", "FI"
];

export function LanguageModal({
  open,
  onClose,
  view,
  onViewChange,
  selectedLanguage,
  selectedRegion,
  onLanguageSelect,
  onRegionSelect,
}: LanguageModalProps) {
  const [query, setQuery] = useState("");
  const activeView = view;

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

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setQuery("");
    }
  }, [open, activeView]);

  const resolvedLocale = useMemo(() => {
    if (typeof navigator !== "undefined" && navigator.language) {
      return navigator.language;
    }
    return "en";
  }, []);

  const languageDisplay = useMemo(() => {
    try {
      return new Intl.DisplayNames([resolvedLocale, "en"], { type: "language" });
    } catch {
      return new Intl.DisplayNames(["en"], { type: "language" });
    }
  }, [resolvedLocale]);

  const regionDisplay = useMemo(() => {
    try {
      return new Intl.DisplayNames([resolvedLocale, "en"], { type: "region" });
    } catch {
      return new Intl.DisplayNames(["en"], { type: "region" });
    }
  }, [resolvedLocale]);

  const languageOptions = useMemo(() => {
    const supported = getSupportedValues("language");
    const unique = Array.from(new Set(supported));

    return unique
      .map<LocaleOption>((code) => {
        const name = languageDisplay.of(code) ?? code;
        const secondary = getAutonym(code);
        return { code, name, secondary };
      })
      .filter((option) => option.name && option.code !== "und")
      .sort((a, b) => a.name.localeCompare(b.name, resolvedLocale));
  }, [languageDisplay, resolvedLocale]);

  const regionOptions = useMemo(() => {
    const supported = getSupportedValues("region");
    const unique = Array.from(new Set(supported));

    return unique
      .map<LocaleOption>((code) => {
        const name = regionDisplay.of(code) ?? code;
        return {
          code,
          name,
          flag: getFlagEmoji(code),
          secondary: code.length > 2 ? undefined : code.toUpperCase(),
        };
      })
      .filter((option) => option.name)
      .sort((a, b) => a.name.localeCompare(b.name, resolvedLocale));
  }, [regionDisplay, resolvedLocale]);

  const activeOptions = activeView === "language" ? languageOptions : regionOptions;

  const filteredOptions = useMemo(() => {
    if (!query) {
      return activeOptions;
    }
    const normalized = query.toLowerCase();
    return activeOptions.filter((option) =>
      [option.name, option.secondary, option.code]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalized))
    );
  }, [activeOptions, query]);

  const handleSelect = (option: LocaleOption) => {
    if (activeView === "language") {
      onLanguageSelect(option);
    } else {
      onRegionSelect(option);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-scrim)] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Select language or region"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="max-h-[82vh] w-full max-w-4xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-primary)] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Global language & region</h3>
                <p className="text-sm text-[var(--text-tertiary)]">
                  Align your experience with localized regulations, mission logistics, and billing frameworks across every frontier.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-[var(--icon-secondary)] transition hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
                aria-label="Close language selection"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-white/5 p-4 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                <span>
                  <span className="font-semibold text-[var(--text-primary)]">Language:</span> {selectedLanguage.name}
                </span>
                <span>
                  <span className="font-semibold text-[var(--text-primary)]">Region:</span> {selectedRegion.name}
                </span>
              </div>
              <span className="text-[var(--text-tertiary)]">Selections sync across the Aeterna network.</span>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] p-1 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                <button
                  type="button"
                  onClick={() => onViewChange("language")}
                  className={`rounded-full px-4 py-1 transition ${
                    activeView === "language" ? "bg-white/10 text-[var(--text-primary)]" : "hover:text-[var(--text-primary)]"
                  }`}
                >
                  Languages
                </button>
                <button
                  type="button"
                  onClick={() => onViewChange("region")}
                  className={`rounded-full px-4 py-1 transition ${
                    activeView === "region" ? "bg-white/10 text-[var(--text-primary)]" : "hover:text-[var(--text-primary)]"
                  }`}
                >
                  Locations
                </button>
              </div>
              <div className="flex-1">
                <label className="sr-only" htmlFor="locale-search">
                  Search languages and locations
                </label>
                <input
                  id="locale-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={activeView === "language" ? "Search by language or locale" : "Search by city, region, or code"}
                  className="w-full rounded-full border border-[var(--border-default)] bg-transparent px-4 py-2 text-sm text-[var(--text-secondary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--text-status-warning)] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 grid max-h-[44vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
              {filteredOptions.map((option) => {
                const isActive =
                  activeView === "language"
                    ? option.code === selectedLanguage.code
                    : option.code === selectedRegion.code;

                return (
                  <button
                    key={`${activeView}-${option.code}`}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? "border-[var(--text-status-warning)] bg-white/10 text-[var(--text-primary)]"
                        : "border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {option.flag ? <span className="text-lg">{option.flag}</span> : null}
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{option.name}</p>
                        {option.secondary ? (
                          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{option.secondary}</p>
                        ) : null}
                      </div>
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)]">{option.code}</span>
                  </button>
                );
              })}
              {filteredOptions.length === 0 ? (
                <p className="col-span-full rounded-2xl border border-dashed border-[var(--border-default)] px-4 py-10 text-center text-sm text-[var(--text-tertiary)]">
                  No matches for “{query}”. Try another search term.
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function getAutonym(code: string) {
  try {
    const display = new Intl.DisplayNames([code], { type: "language" });
    const autonym = display.of(code);
    if (!autonym || autonym.toLowerCase() === code.toLowerCase()) {
      return undefined;
    }
    return autonym;
  } catch {
    return undefined;
  }
}

function getFlagEmoji(code: string) {
  if (code === "001") {
    return "🌐";
  }
  if (code.length !== 2) {
    return undefined;
  }
  const base = 127397;
  const chars = code
    .toUpperCase()
    .split("")
    .map((char) => char.codePointAt(0) ?? 0)
    .map((point) => point + base);
  return String.fromCodePoint(...chars);
}

function getSupportedValues(kind: "language" | "region") {
  const fn = (Intl as unknown as { supportedValuesOf?: (input: string) => string[] }).supportedValuesOf;
  if (typeof fn === "function") {
    try {
      return fn(kind);
    } catch {
      // ignore and fall back
    }
  }
  return kind === "language" ? FALLBACK_LANGUAGES : FALLBACK_REGIONS;
}
