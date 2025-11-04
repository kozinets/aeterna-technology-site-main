"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Language = {
  code: string;
  label: string;
  language: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en-US", label: "United States", language: "English", flag: "🇺🇸" },
  { code: "en-GB", label: "United Kingdom", language: "English", flag: "🇬🇧" },
  { code: "en-CA", label: "Canada", language: "English", flag: "🇨🇦" },
  { code: "fr-FR", label: "France", language: "Français", flag: "🇫🇷" },
  { code: "de-DE", label: "Germany", language: "Deutsch", flag: "🇩🇪" },
  { code: "es-ES", label: "Spain", language: "Español", flag: "🇪🇸" },
  { code: "pt-BR", label: "Brazil", language: "Português", flag: "🇧🇷" },
  { code: "it-IT", label: "Italy", language: "Italiano", flag: "🇮🇹" },
  { code: "ja-JP", label: "Japan", language: "日本語", flag: "🇯🇵" },
  { code: "ko-KR", label: "Korea", language: "한국어", flag: "🇰🇷" },
  { code: "zh-CN", label: "China", language: "简体中文", flag: "🇨🇳" },
  { code: "zh-TW", label: "Taiwan", language: "繁體中文", flag: "🇹🇼" },
  { code: "ru-RU", label: "Russia", language: "Русский", flag: "🇷🇺" },
  { code: "ar-AE", label: "United Arab Emirates", language: "العربية", flag: "🇦🇪" },
  { code: "hi-IN", label: "India", language: "हिन्दी", flag: "🇮🇳" },
  { code: "tr-TR", label: "Turkey", language: "Türkçe", flag: "🇹🇷" },
  { code: "he-IL", label: "Israel", language: "עברית", flag: "🇮🇱" },
  { code: "pl-PL", label: "Poland", language: "Polski", flag: "🇵🇱" },
  { code: "sv-SE", label: "Sweden", language: "Svenska", flag: "🇸🇪" },
  { code: "fi-FI", label: "Finland", language: "Suomi", flag: "🇫🇮" },
  { code: "no-NO", label: "Norway", language: "Norsk", flag: "🇳🇴" },
  { code: "cs-CZ", label: "Czechia", language: "Čeština", flag: "🇨🇿" },
  { code: "el-GR", label: "Greece", language: "Ελληνικά", flag: "🇬🇷" },
  { code: "th-TH", label: "Thailand", language: "ไทย", flag: "🇹🇭" },
  { code: "id-ID", label: "Indonesia", language: "Bahasa Indonesia", flag: "🇮🇩" }
];

type LanguageModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LanguageModal({ open, onClose }: LanguageModalProps) {
  const [query, setQuery] = useState("");

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

  const filteredLanguages = useMemo(() => {
    if (!query) {
      return languages;
    }
    const normalized = query.toLowerCase();
    return languages.filter((language) =>
      [language.label, language.language, language.code].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query]);

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
            aria-label="Select your language"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="max-h-[80vh] w-full max-w-3xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-primary)] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Choose your region</h3>
                <p className="text-sm text-[var(--text-tertiary)]">
                  Tailor Aeterna experiences with localized compliance, currency, and mission briefings.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)]"
                aria-label="Close language selection"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-3 border-b border-[var(--border-default)] pb-4">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by country or language"
                className="flex-1 bg-transparent text-sm text-[var(--text-secondary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
              />
            </div>
            <div className="mt-6 grid max-h-[46vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className="flex items-center justify-between gap-4 border border-[var(--border-light)] px-4 py-3 text-left text-sm text-[var(--text-secondary)] transition hover:border-[var(--border-default)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{language.flag}</span>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{language.label}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{language.language}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">{language.code}</span>
                </button>
              ))}
              {filteredLanguages.length === 0 ? (
                <p className="col-span-full text-center text-sm text-[var(--text-tertiary)]">
                  No regions match “{query}”. Try another search.
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
