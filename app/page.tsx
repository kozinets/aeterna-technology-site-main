import { Header } from "@/components/header";
import { AccessPortal } from "@/components/access-portal";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Insights } from "@/components/insights";
import { Programs } from "@/components/programs";
import { RealtimePulse } from "@/components/realtime-pulse";
import {
  getAccessPortalCollection,
  getHeroCollection,
  getHomeCollection,
  getInsightsCollection,
  getProgramsCollection,
  getPulseCollection
} from "@/lib/cms/site-config";
import {
  Building2,
  Cpu,
  FlaskConical,
  Orbit,
  Radar,
  Sparkles,
  Workflow
} from "lucide-react";
import Link from "next/link";

const CAMPUS_ICON_MAP = {
  cpu: Cpu,
  sparkles: Sparkles,
  radar: Radar
} as const;

const ALLIANCE_ICON_MAP = {
  "building-2": Building2,
  workflow: Workflow,
  "flask-conical": FlaskConical,
  orbit: Orbit
} as const;

export default function Page() {
  const heroContent = getHeroCollection();
  const homeCollection = getHomeCollection();
  const programsCollection = getProgramsCollection();
  const insightsCollection = getInsightsCollection();
  const pulseCollection = getPulseCollection();
  const accessPortalCollection = getAccessPortalCollection();

  const ecosystemNodes = homeCollection.ecosystemNodes;
  const campusStats = homeCollection.campusStats;
  const alliances = homeCollection.alliances;
  const timeline = homeCollection.timeline;

  return (
    <main>
      <Header />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-12 sm:px-8 lg:px-12">
        <Hero content={heroContent} />
        <section className="mt-24">
          <div className="grid gap-14 lg:grid-cols-[280px_1fr]">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="badge">Integrated ecosystems</span>
                <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                  The Aeterna ecosystem is a <span className="text-[var(--text-status-warning)]">living corporate organism</span>.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Subterranean labs, orbital foundries, quantum networks, and longevity programs operate under one mission console.
                </p>
              </div>
              <div className="space-y-4">
                {campusStats.map((item) => {
                  const Icon = CAMPUS_ICON_MAP[item.icon as keyof typeof CAMPUS_ICON_MAP];
                  return (
                    <div key={item.label} className="relative flex items-center gap-3 pl-4">
                      <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                      {Icon ? (
                        <Icon
                          className={`h-6 w-6 ${
                            item.tone === "positive"
                              ? "text-[var(--text-status-warning)]"
                              : item.tone === "critical"
                                ? "text-[var(--text-status-error)]"
                                : "text-[var(--icon-secondary)]"
                          }`}
                        />
                      ) : null}
                      <div>
                        <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.label}</span>
                        <p
                          className={`text-sm font-semibold ${
                            item.tone === "positive"
                              ? "text-[var(--text-status-warning)]"
                              : item.tone === "critical"
                                ? "text-[var(--text-status-error)]"
                                : "text-[var(--text-primary)]"
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              {ecosystemNodes.map((node) => (
                <div
                  key={node.title}
                  className="relative flex flex-col gap-4 pb-6 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[var(--border-light)] after:content-[''] last:after:hidden"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{node.title}</h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{node.description}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{node.detail}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    {node.streams.map((stream) => (
                      <span key={stream} className="rounded-full border border-[var(--border-default)] px-3 py-1">
                        #{stream.replace(/\s+/g, "")}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Programs collection={programsCollection} />
        <section className="mt-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              <span className="badge">Alliance network</span>
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
                Strategic partners extend Aeterna's reach.
              </h2>
              <p className="text-base text-[var(--text-secondary)]">
                Governments, enterprises, and universities integrate with our infrastructure to launch joint missions and co-own progress.
              </p>
              <div className="grid gap-5">
                {alliances.map((unit) => {
                  const Icon = ALLIANCE_ICON_MAP[unit.icon as keyof typeof ALLIANCE_ICON_MAP];
                  return (
                    <div key={unit.title} className="relative flex gap-4 pl-5">
                      <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                      {Icon ? (
                        <Icon
                          className={`mt-1 h-6 w-6 ${
                            unit.tone === "positive"
                              ? "text-[var(--text-status-warning)]"
                              : "text-[var(--text-status-error)]"
                          }`}
                        />
                      ) : null}
                      <div>
                        <h3
                          className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                            unit.tone === "positive"
                              ? "text-[var(--text-status-warning)]"
                              : "text-[var(--text-status-error)]"
                          }`}
                        >
                          {unit.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">{unit.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-6">
              <span className="badge">Continuum timeline</span>
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">Expansion roadmap.</h2>
              <div className="space-y-6">
                {timeline.map((milestone) => (
                  <div key={milestone.year} className="relative pl-6">
                    <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span
                        className={`font-semibold ${
                          milestone.tone === "positive"
                            ? "text-[var(--text-status-warning)]"
                            : "text-[var(--text-status-error)]"
                        }`}
                      >
                        {milestone.year}
                      </span>{" "}
                      — {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className="border-l border-[var(--border-light)] pl-6 text-sm text-[var(--text-tertiary)]">
                Every roadmap entry is governed by Atlas Mission Control with compliance checks, partner review boards, and biometric authorization through <span className="text-[var(--text-status-warning)]">Aeterna Pass</span>.
              </p>
              <Link
                href={"/missions" as any}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Review mission governance
              </Link>
            </div>
          </div>
        </section>
        <RealtimePulse collection={pulseCollection} />
        <Insights collection={insightsCollection} />
        <AccessPortal collection={accessPortalCollection} />
      </div>
      <Footer />
    </main>
  );
}
