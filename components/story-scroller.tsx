"use client";

import { useRef, useState, type PointerEvent, type WheelEvent } from "react";
import Link from "next/link";

type Story = {
  title: string;
  category: string;
  date: string;
  linkLabel?: string;
};

export function StoryScroller({ stories }: { stories: Story[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ startX: 0, scrollLeft: 0, pointerId: 0 });
  const [dragging, setDragging] = useState(false);

  if (!stories.length) {
    return (
      <p className="rounded-3xl bg-white/5 px-5 py-8 text-center text-sm text-indigo-100/70">
        Stories for this focus area are coming online shortly.
      </p>
    );
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    dragState.current = {
      startX: event.clientX,
      scrollLeft: container.scrollLeft,
      pointerId: event.pointerId,
    };

    container.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const container = containerRef.current;
    if (!container) return;

    const delta = event.clientX - dragState.current.startX;
    container.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const isVerticalScrollDominant = Math.abs(event.deltaY) > Math.abs(event.deltaX);
    if (!isVerticalScrollDominant) {
      return;
    }

    container.scrollLeft += event.deltaY;
    event.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      aria-label="Mission stories"
      className={`${dragging ? "cursor-grabbing" : "cursor-grab"} overflow-x-auto pb-2 pt-1 scrollbar-hide`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={(event) => dragging && endDrag(event)}
      onPointerCancel={endDrag}
      onWheel={handleWheel}
    >
      <div className="flex gap-4 sm:gap-6">
        {stories.map((story) => (
          <article
            key={story.title}
            className="min-w-[220px] rounded-[24px] bg-[#1e1b4b] p-5 text-indigo-100 shadow-[0_0_40px_-24px_rgba(76,29,149,0.8)] sm:min-w-[260px]"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-indigo-200/70">{story.category}</span>
            <h3 className="mt-3 text-lg font-semibold text-white">{story.title}</h3>
            <div className="mt-6 flex items-center justify-between text-xs text-indigo-200/70">
              <span>{story.date}</span>
              {story.linkLabel ? (
                <Link href="#stories" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  {story.linkLabel}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
