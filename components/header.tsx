"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MegaMenu } from "./mega-menu";
import { AeternaLogo } from "./aeterna-logo";
import { AuthModal } from "./auth-modal";
import { SearchModal } from "./search-modal";
import { getNavigationCollections } from "@/lib/cms/site-config";
import type { SecondaryPanelGroup } from "@/lib/cms/types";

const navigationCollections = getNavigationCollections();
const NAVIGATION = navigationCollections.sections;
const SECONDARY_MENUS = navigationCollections.secondary;
const TOP_NAV = navigationCollections.top;

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItemBase =
    "relative flex h-full items-center gap-2 px-4 pb-3 text-sm font-medium leading-tight transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-all after:duration-150";

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
          <AeternaLogo className="h-6 shrink-0 lg:h-7" />
        </Link>
        <div className="hidden flex-1 items-center lg:flex">
          <nav className="flex h-full flex-1 items-stretch gap-1 text-sm font-medium">
            {TOP_NAV.map((item) => {
              if (item.type === "anchor") {
                return (
                  <Link
                    key={item.id}
                    href={item.href as any}
                    className={`${navItemBase} text-[var(--text-secondary)] after:bg-transparent hover:text-[var(--text-primary)] hover:after:bg-[var(--border-default)]`}
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
                  className={`${navItemBase} ${
                    isOpen
                      ? "text-[var(--text-primary)] after:bg-[var(--text-status-warning)]"
                      : "text-[var(--text-secondary)] after:bg-transparent hover:text-[var(--text-primary)] hover:after:bg-[var(--border-default)]"
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
            className="hidden h-10 w-10 items-center justify-center text-[var(--icon-secondary)] transition hover:text-[var(--text-primary)] lg:flex"
            aria-label="Search across Aeterna"
          >
            <Search className="h-5 w-5" />
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
      <SecondaryMenu open={openMenu === "research"} groups={SECONDARY_MENUS.research ?? []} />
      <SecondaryMenu open={openMenu === "access"} groups={SECONDARY_MENUS.access ?? []} />
      <SecondaryMenu open={openMenu === "company"} groups={SECONDARY_MENUS.company ?? []} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function SecondaryMenu({ open, groups }: { open: boolean; groups: SecondaryPanelGroup[] }) {
  if (!groups.length) {
    return null;
  }
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, scaleY: 0.9 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.92 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          style={{ transformOrigin: "top center" }}
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

