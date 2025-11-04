"use client";

import Link from "next/link";
import { useState } from "react";
import { Globe2 } from "lucide-react";
import { LanguageModal } from "./language-modal";
import { AeternaLogo } from "./aeterna-logo";
import { getFooterCollection } from "@/lib/cms/site-config";

const footerCollection = getFooterCollection();
const footerColumns = footerCollection.columns;
const operationsContacts = footerCollection.contacts;
const statusBadges = footerCollection.statusBadges;

export function Footer() {
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <footer className="mt-32 border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-14 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-lg space-y-4">
            <Link href="/" aria-label="Aeterna Technology home" className="flex items-center">
              <AeternaLogo className="h-9" />
            </Link>
            <p className="text-sm leading-relaxed text-[var(--text-tertiary)]">
              Aeterna Technology builds the connective tissue for civilization-scale intelligence. Networks, implants, cryptography, robotics, and orbital systems operate through one mission fabric.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              {statusBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-warning)]">
                  {badge}
                </span>
              ))}
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
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <button
              type="button"
              onClick={() => setLanguageOpen(true)}
              className="inline-flex items-center gap-2 border border-[var(--border-default)] px-3 py-1 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              <Globe2 className="h-4 w-4" />
              Language & region
            </button>
          </div>
        </div>
      </div>
      <LanguageModal open={languageOpen} onClose={() => setLanguageOpen(false)} />
    </footer>
  );
}
