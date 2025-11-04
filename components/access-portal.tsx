"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Fingerprint, LockKeyhole, ServerCog, Users } from "lucide-react";
import Link from "next/link";
import { getAccessPortalCollection } from "@/lib/cms/site-config";
import type { AccessPortalCollection } from "@/lib/cms/types";

const ICON_MAP = {
  fingerprint: Fingerprint,
  "lock-keyhole": LockKeyhole,
  "server-cog": ServerCog,
  users: Users
} as const;

export function AccessPortal({ collection }: { collection?: AccessPortalCollection }) {
  const data = collection ?? getAccessPortalCollection();
  const tiers = data.tiers;
  const highlights = data.highlights;

  return (
    <section id="access" className="mt-28">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-5">
            <span className="badge">Unified access</span>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
              Authorization across the <span className="text-[var(--text-status-warning)]">Aeterna Pass</span> ecosystem.
            </h2>
            <p className="max-w-2xl text-base text-[var(--text-secondary)]">
              One credential for AI clouds, biomedical labs, autonomous factories, and classified research. Access is coordinated by neural governance and quantum-grade cryptography.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
              if (!Icon) return null;
              return (
                <motion.div
                  key={`${item.icon}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="relative flex flex-col gap-3 pl-5"
                >
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                  <Icon
                    className={`h-6 w-6 ${
                      index % 2 === 0 ? "text-[var(--text-status-warning)]" : "text-[var(--text-status-error)]"
                    }`}
                  />
                  <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          {tiers.map((tier) => (
            <div key={tier.title} className="relative flex flex-col gap-4 pl-6">
              <span
                className={`absolute left-0 top-0 h-full w-px ${
                  tier.accent ? "bg-[var(--text-status-warning)]" : "bg-[var(--border-default)]"
                }`}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">{tier.title}</h3>
                <span
                  className={`text-xs uppercase tracking-[0.14em] ${
                    tier.accent ? "text-[var(--text-status-warning)]" : "text-[var(--text-tertiary)]"
                  }`}
                >
                  Access tier
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              <ul className="space-y-3 text-sm text-[var(--text-tertiary)]">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2
                      className={`h-4 w-4 ${
                        tier.accent ? "text-[var(--text-status-warning)]" : "text-[var(--text-status-error)]"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                {tier.features.slice(0, 2).map((feature) => (
                  <span key={`${tier.title}-${feature}`} className="rounded-full border border-[var(--border-light)] px-3 py-1">
                    #{feature.split(" ")[0]}
                  </span>
                ))}
              </div>
              <Link
                href={tier.href as any}
                className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition ${
                  tier.accent
                    ? "rounded-full bg-[var(--interactive-bg-accent-default)] text-[var(--text-status-warning)]"
                    : "rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
