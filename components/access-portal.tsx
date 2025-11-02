"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Fingerprint, LockKeyhole, ServerCog, Users } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    title: "Open Research",
    description: "Public demos, free proxies, open models, and datasets for rapid exploration.",
    features: [
      "Atlas Playground and language models",
      "NOVA Free Proxy with SDK",
      "Transparency reports and public APIs"
    ],
    cta: "Get access",
    href: "/access/open",
    accent: false
  },
  {
    title: "Strategic",
    description: "Expanded entry to secured products, DePIN orchestration, and robotics missions.",
    features: [
      "Sentient Cloud and EdgeGrid",
      "DePIN Orchestration Network",
      "Robotics and biomed test environments"
    ],
    cta: "Book a consultation",
    href: "/access/strategic",
    accent: true
  },
  {
    title: "Sovereign",
    description: "Full customization with dedicated data centers, quantum cryptography, and joint labs.",
    features: [
      "Quantum Zero Trust deployments",
      "NeuroWeave immortality protocols",
      "Joint research and mission governance"
    ],
    cta: "Schedule an audit",
    href: "/access/sovereign",
    accent: false
  }
];

export function AccessPortal() {
  return (
    <section id="access" className="mx-auto mt-28 max-w-[1200px]">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="section-shell px-10 py-12"
        >
          <div className="space-y-5">
            <span className="badge">Unified access</span>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
              Authorization across the Aeterna Pass ecosystem.
            </h2>
            <p className="max-w-2xl text-base text-[var(--text-secondary)]">
              One credential for AI clouds, biomedical labs, autonomous factories, and classified research. Access is coordinated by neural governance and quantum-grade cryptography.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[Fingerprint, LockKeyhole, ServerCog, Users].map((Icon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="rounded-3xl border border-[var(--border-light)] bg-[var(--bg-secondary)]/60 p-5"
              >
                <Icon className="h-6 w-6 text-[var(--icon-accent)]" />
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {index === 0 && "Biometric authorization with neural signatures"}
                  {index === 1 && "Post-quantum encryption and key matrices"}
                  {index === 2 && "Hybrid cloud and on-prem orchestration"}
                  {index === 3 && "Role governance for teams, nations, and enterprises"}
                </p>
              </motion.div>
            ))}
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
            <div key={tier.title} className="grid-card">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">{tier.title}</h3>
                <span className="text-xs uppercase tracking-[0.14em] text-[var(--text-tertiary)]">Access tier</span>
              </div>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{tier.description}</p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-tertiary)]">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--icon-accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href as any}
                className={`mt-6 inline-flex items-center justify-center rounded-full border border-[var(--border-default)] px-5 py-2 text-sm font-medium transition ${
                  tier.accent
                    ? "bg-[var(--interactive-bg-accent-default)] text-[var(--text-accent)] hover:bg-[var(--interactive-bg-accent-hover)]"
                    : "bg-[var(--interactive-bg-secondary-default)] text-[var(--text-secondary)] hover:bg-[var(--interactive-bg-secondary-hover)]"
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
