"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type MissionColumnProps = {
  searchExamples: string[];
};

export function MissionColumn({ searchExamples }: MissionColumnProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (searchExamples.length <= 1) return;

    const timer = setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % searchExamples.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [searchExamples]);

  const activePlaceholder = searchExamples[placeholderIndex % searchExamples.length];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-12 text-center lg:px-10">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Mission command</p>
      <h1 className="mt-6 max-w-lg text-4xl font-semibold text-white sm:text-[2.8rem]">
        What mission can Aeterna empower your civilization?
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
        Chart autonomous futures, synchronize orbital infrastructure, and align every expedition with the systems that keep
        your civilization thriving.
      </p>
      <div className="mt-10 w-full max-w-md">
        <div className="relative flex items-center">
          <input
            className="w-full rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] px-6 py-3 text-sm text-white outline-none transition focus:border-[var(--text-status-warning)]"
            placeholder={activePlaceholder}
          />
          <ArrowRight className="pointer-events-none absolute right-4 h-5 w-5 text-[var(--icon-secondary)]" />
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Dynamic query suggestions update every few seconds.</p>
      </div>
    </div>
  );
}
