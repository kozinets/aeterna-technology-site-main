"use client";

import { useRef, useState, type PointerEvent } from "react";
import Link from "next/link";

type Story = {
  title: string;
  description: string;
  linkLabel: string;
};

export function StoryScroller({ stories }: { stories: Story[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ startY: 0, scrollTop: 0, pointerId: 0 });
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    dragState.current = {
      startY: event.clientY,
      scrollTop: container.scrollTop,
      pointerId: event.pointerId,
    };

    container.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const container = containerRef.current;
    if (!container) return;

    const delta = event.clientY - dragState.current.startY;
    container.scrollTop = dragState.current.scrollTop - delta;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`${dragging ? "cursor-grabbing" : "cursor-grab"} max-h-[28rem] space-y-4 overflow-y-auto pr-2 scrollbar-hide`}
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={(event) => dragging && endDrag(event)}
      onPointerCancel={endDrag}
    >
      {stories.map((story) => (
        <article
          key={story.title}
          className="rounded-2xl border border-emerald-300/10 bg-[#0f2623] p-5 text-emerald-100 shadow-inner"
        >
          <h3 className="text-lg font-semibold text-white">{story.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">{story.description}</p>
          <Link
            href="#stories"
            className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-200 transition hover:text-white"
          >
            {story.linkLabel}
          </Link>
        </article>
      ))}
    </div>
  );
}
