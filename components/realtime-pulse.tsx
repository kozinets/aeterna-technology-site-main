"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, GaugeCircle, Satellite, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { PulseCollection } from "@/lib/cms/types";

const ICON_MAP = {
  "gauge-circle": GaugeCircle,
  satellite: Satellite,
  timer: Timer,
  activity: Activity
} as const;

export function RealtimePulse({ collection }: { collection: PulseCollection }) {
  const transmissions = collection.transmissions;
  const sensorGrid = collection.sensorGrid;
  const streamEvents = collection.streamEvents;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (transmissions.length < 2) {
      return;
    }
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % transmissions.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [transmissions]);

  const activeTransmission = useMemo(
    () => (transmissions.length ? transmissions[index % transmissions.length] : null),
    [index, transmissions]
  );

  return (
    <section className="mt-28">
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
            <div className="relative space-y-3 rounded-none border-0 pl-6">
              <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Priority transmission</span>
              <AnimatePresence mode="wait">
                {activeTransmission ? (
                  <motion.div
                    key={activeTransmission.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 space-y-3"
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
                ) : null}
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
                  className="relative flex items-center gap-4 pl-5"
                >
                  <span className="absolute left-0 top-0 h-full w-px bg-[var(--border-default)]" aria-hidden="true" />
                  {(() => {
                    const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
                    return Icon ? <Icon className="h-5 w-5 text-[var(--icon-secondary)]" /> : null;
                  })()}
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
                <li
                  key={event.label}
                  className="flex items-start justify-between gap-4 border-b border-[var(--border-light)] pb-3 last:border-b-0 last:pb-0"
                >
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
