"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Sparkles } from "lucide-react";

const highlights = [
  {
    label: "138",
    suffix: " labs",
    description: "Integrated R&D campuses across five continents"
  },
  {
    label: "24/7",
    suffix: " neuro-ops",
    description: "Digital operations system for autonomous production"
  },
  {
    label: ">480",
    suffix: " products",
    description: "Programs spanning implants, AI clouds, robotics, and orbital systems"
  }
];

export function Hero() {
  return (
    <section className="relative mx-auto flex max-w-[1200px] flex-col gap-16 overflow-hidden rounded-[48px] border border-[var(--border-default)] bg-[var(--bg-elevated-primary)]/80 px-10 pb-16 pt-20 shadow-[0_30px_120px_rgba(2,133,255,0.2)]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-12 lg:flex-row lg:items-start"
      >
        <div className="flex-1 space-y-8">
          <span className="badge">Future of integrated intelligence</span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl">
            Aeterna Technology fuses artificial intelligence, bioengineering, and autonomous networks into one ecosystem.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            We engineer infrastructure for immortal digital and biological systems—from neural implants and quantum cryptography to generative AI platforms and autonomous factories.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#access"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-accent-default)] px-6 py-3 text-sm font-medium text-[var(--text-accent)] transition hover:bg-[var(--interactive-bg-accent-hover)]"
            >
              Request authorization
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--interactive-bg-secondary-default)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--interactive-bg-secondary-hover)]"
            >
              Explore divisions
              <Shield className="h-4 w-4 text-[var(--icon-secondary)]" />
            </a>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex max-w-md flex-col gap-6 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-secondary)]/70 p-6 backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <span className="badge">Neural Mission Control</span>
            <Sparkles className="h-5 w-5 text-[var(--icon-accent)]" />
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Transform data, materials, and biosystems into self-learning products. Our neural lacing links labs, drone fleets, and implants in real time.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Sentient Cloud",
                text: "Quantum-resilient compute fabric for models at planetary scale."
              },
              {
                title: "BioSymphony",
                text: "Bio-digital human twins with neural feedback via implants and prosthetics."
              },
              {
                title: "Atlas Command",
                text: "Neuro-composers drafting autonomous research missions across Earth and orbit."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border-light)] bg-[var(--bg-tertiary)]/40 p-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {highlights.map((item) => (
          <motion.div
            key={item.label}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="grid-card"
          >
            <p className="text-3xl font-semibold text-[var(--text-accent)]">
              {item.label}
              <span className="text-base font-normal text-[var(--text-secondary)]">{item.suffix}</span>
            </p>
            <p className="mt-3 text-sm text-[var(--text-tertiary)]">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--bg-accent-static)]/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-12 h-64 w-64 rounded-full bg-[var(--bg-accent-static)]/10 blur-3xl" />
    </section>
  );
}
