"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, GaugeCircle, Satellite, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const transmissions = [
  {
    title: "Atlas Council",
    detail: "Thread 1892 approved orbital bio-dome deployment with autonomous compliance gates.",
    meta: "Approval latency 2.4s",
    tone: "positive" as const
  },
  {
    title: "Sentient Cloud",
    detail: "Quantum relay synchronized across 14 sovereign regions with zero packet loss.",
    meta: "Telemetry lock 99.998%",
    tone: "positive" as const
  },
  {
    title: "Containment Protocol",
    detail: "Neural risk model triggered amber advisory for synthetic pathogen experiment.",
    meta: "Response unit en route",
    tone: "critical" as const
  }
];

const sensorGrid = [
  { label: "BioForge", value: "+12% synthesis", icon: GaugeCircle },
  { label: "Proxy Mesh", value: "642 active nodes", icon: Satellite },
  { label: "NeuroOps", value: "Latency 1.1ms", icon: Timer },
  { label: "Mission Ops", value: "38 live directives", icon: Activity }
];

const streamEvents = [
  { label: "Robotics", text: "Orbital Forge prints carbon lattice prosthetics", tone: "positive" as const },
  { label: "Longevity", text: "Vitality Labs extends trial cohort to 5 continents", tone: "positive" as const },
  { label: "Security", text: "Quantum Zero Trust patch 7 deployed globally", tone: "critical" as const },
  { label: "Network", text: "NOVA Proxy adds 24 new regional entrances", tone: "positive" as const }
];

export function RealtimePulse() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % transmissions.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const activeTransmission = useMemo(() => transmissions[index], [index]);

  return (
    <section className="mx-auto mt-28 w-full max-w-[1400px] px-2 sm:px-6">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="badge">Realtime pulse</span>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
              Live operations streaming from <span className="text-[var(--text-status-warning)]">Aeterna command</span>.
            </h2>
          </div>
          <p className="max-w-lg text-sm text-[var(--text-secondary)]">
            Continuous telemetry shows how intelligence, biomedicine, and infrastructure respond the moment you connect.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="border border-[var(--border-default)] p-6">
              <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Priority transmission</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTransmission.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 space-y-3"
                >
                  <p
                    className={`text-lg font-semibold ${
                      activeTransmission.tone === "critical"
                        ? "text-[var(--text-status-error)]"
                        : "text-[var(--text-status-warning)]"
                    }`}
                  >
                    {activeTransmission.title}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">{activeTransmission.detail}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{activeTransmission.meta}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {sensorGrid.map((item, sensorIndex) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: sensorIndex * 0.05 }}
                  className="flex items-center gap-4 border-l border-[var(--border-default)] pl-5"
                >
                  <item.icon className="h-5 w-5 text-[var(--icon-secondary)]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.label}</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Live stream</span>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              {streamEvents.map((event, eventIndex) => (
                <li key={event.label} className="flex items-start justify-between gap-4 border-b border-[var(--border-light)] pb-3">
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        event.tone === "critical"
                          ? "text-[var(--text-status-error)]"
                          : "text-[var(--text-status-warning)]"
                      }`}
                    >
                      {event.label}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">{event.text}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    T-{eventIndex * 3 + 2}m
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
