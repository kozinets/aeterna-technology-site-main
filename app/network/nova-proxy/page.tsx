import { AccessPortal } from "@/components/access-portal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { NovaProxyAnalytics } from "@/components/charts/nova-proxy-analytics";
import { getAccessPortalCollection, getPageContent } from "@/lib/cms/site-config";
import type { NovaProxyContent } from "@/lib/cms/types";
import { CheckCircle2, Download, Globe, Layers, Shield, Zap } from "lucide-react";
import Link from "next/link";

const HERO_ICON_MAP = {
  shield: Shield,
  globe: Globe,
  zap: Zap
} as const;

export default function NovaProxyPage() {
  const pageContent = getPageContent("network/nova-proxy") as NovaProxyContent | undefined;
  const accessPortalCollection = getAccessPortalCollection();

  if (!pageContent) {
    return (
      <>
        <Header />
        <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-12 sm:px-8 lg:px-12">
          <p className="text-sm text-[var(--text-secondary)]">Unable to load NOVA proxy content.</p>
        </main>
        <Footer />
      </>
    );
  }

  const { hero, highlights, nodeEconomy, telemetryBursts, developerKits, badges } = pageContent;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-12 sm:px-8 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{hero.category}</span>
            <h1 className="text-4xl font-semibold text-[var(--text-primary)] md:text-5xl">
              <span style={{ color: hero.accentColor }}>{hero.title.split(" — ")[0]}</span>
              {hero.title.includes(" — ") ? ` — ${hero.title.split(" — ")[1]}` : null}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">{hero.summary}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
              {hero.features.map((feature) => {
                const Icon = HERO_ICON_MAP[feature.icon as keyof typeof HERO_ICON_MAP];
                return (
                  <div key={feature.text} className="flex items-center gap-2">
                    {Icon ? <Icon className="h-5 w-5 text-[var(--text-status-warning)]" /> : null}
                    <span>{feature.text}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4">
              {hero.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href as any}
                  className={
                    action.variant === "primary"
                      ? "inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      : "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  }
                >
                  {action.label}
                  {action.variant === "primary" ? <Download className="h-4 w-4" /> : null}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Why the free mesh matters</p>
            <ul className="space-y-5">
              {highlights.map((item) => (
                <li key={item.tag} className="relative flex flex-col gap-2 pl-5">
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{item.tag}</span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Become a <span style={{ color: hero.accentColor }}>NOVA Node</span> and earn with every encrypted route.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Contributors host the paid tier. When enterprise subscribers connect through your node, 80% of the subscription value is transferred to your wallet. Aeterna automatically retains 20% to operate the verification, routing, and compliance fabric.
            </p>
            <ol className="space-y-6">
              {nodeEconomy.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] text-sm font-semibold text-[var(--text-status-warning)]">
                    {index + 1}
                  </span>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
              {badges.map((badge) => (
                <span key={badge} className="rounded-full border border-[var(--border-default)] px-3 py-1 text-[var(--text-status-warning)]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Mesh telemetry</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {telemetryBursts.map((burst) => (
                <div key={burst.label} className="relative flex flex-col gap-1 pl-4">
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-light)]" aria-hidden="true" />
                  <span
                    className={`text-[11px] uppercase tracking-[0.24em] ${
                      burst.tone === "critical"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-status-warning)]"
                    }`}
                  >
                    {burst.label}
                  </span>
                  <span className="text-lg font-semibold text-[var(--text-primary)]">{burst.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Proof of quality</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="h-5 w-5 text-[var(--text-status-warning)]" />
                  Hardware attestation with automatic posture scoring.
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Layers className="h-5 w-5 text-[var(--text-status-warning)]" />
                  Layered isolation prevents cross-tenant visibility.
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Zap className="h-5 w-5 text-[var(--text-status-error)]" />
                  Adaptive throttling protects consumers and node operators.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Developer readiness</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Everything you need to integrate NOVA into sovereign infrastructure: agent SDKs, compliance tooling, and marketplace tooling for contributors.
            </p>
            <ul className="space-y-4">
              {developerKits.map((kit) => (
                <li key={kit.title} className="border-b border-[var(--border-light)] pb-4 last:border-b-0 last:pb-0">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">{kit.title}</h4>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{kit.description}</p>
                  <Link
                    href={kit.href as any}
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    Explore kit
                    <Download className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <NovaProxyAnalytics />
          </div>
        </section>

        <section className="mt-20">
          <AccessPortal collection={accessPortalCollection} />
        </section>
      </main>
      <Footer />
    </>
  );
}
