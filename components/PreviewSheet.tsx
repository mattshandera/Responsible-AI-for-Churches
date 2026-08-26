"use client";

import { useEffect, useRef } from "react";
import Preview from "./Preview";
import type { Block } from "@/lib/document";

export type SheetState = "closed" | "peek" | "full";

/** Distance from the top of the viewport at each state. */
const OFFSET: Record<SheetState, string> = {
  closed: "100%",
  peek: "45vh",
  full: "3.5rem",
};

/** How far a vertical swipe must travel before it changes state. */
const SWIPE_THRESHOLD = 44;

/**
 * The mobile live preview: a bottom sheet over the form.
 *
 * Peek is the state that matters — it leaves the top of the form visible, so
 * answering a question and seeing it land in the document is one gesture
 * rather than a round trip to the bottom of the page.
 */
export default function PreviewSheet({
  state,
  onChange,
  blocks,
}: {
  state: SheetState;
  onChange: (next: SheetState) => void;
  blocks: Block[];
}) {
  const open = state !== "closed";
  const dragStart = useRef<number | null>(null);

  // Escape closes, and the page behind must not scroll while the sheet is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange("closed");
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onChange]);

  function onTouchStart(e: React.TouchEvent) {
    dragStart.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = dragStart.current;
    dragStart.current = null;
    if (start === null) return;
    const delta = e.changedTouches[0].clientY - start;
    if (delta < -SWIPE_THRESHOLD) {
      onChange("full");
    } else if (delta > SWIPE_THRESHOLD) {
      onChange(state === "full" ? "peek" : "closed");
    }
  }

  return (
    <div className="lg:hidden" aria-hidden={!open}>
      {/* Decorative: the header's close button and Escape are the real
          affordances, so the scrim stays out of the accessibility tree. */}
      <div
        aria-hidden="true"
        onClick={() => onChange("closed")}
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-[340ms] ${
          state === "full"
            ? "opacity-45"
            : state === "peek"
              ? "opacity-25"
              : "pointer-events-none opacity-0"
        }`}
      />

      <section
        role="dialog"
        aria-modal={open}
        aria-label="Live preview of your document"
        style={{ transform: `translateY(${OFFSET[state]})` }}
        className="fixed inset-x-0 bottom-0 top-0 z-50 flex flex-col rounded-t-[20px] bg-surface shadow-[0_-10px_34px_rgba(24,24,27,0.2)] transition-transform duration-[340ms] ease-[cubic-bezier(.32,.72,0,1)]"
      >
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="shrink-0 touch-none"
        >
          <button
            type="button"
            aria-label={state === "full" ? "Collapse preview" : "Expand preview"}
            onClick={() => onChange(state === "full" ? "peek" : "full")}
            className="flex w-full justify-center pb-1 pt-2"
          >
            <span className="h-1 w-10 rounded-full bg-zinc-300" />
          </button>
          <div className="flex items-center border-b border-line pl-4 pr-1.5">
            <p className="flex-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Live preview
            </p>
            <button
              type="button"
              aria-label={state === "full" ? "Collapse preview" : "Expand preview"}
              onClick={() => onChange(state === "full" ? "peek" : "full")}
              className="flex h-11 w-11 items-center justify-center text-ink-soft"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 transition-transform duration-300 ${
                  state === "full" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => onChange("closed")}
              className="flex h-11 w-11 items-center justify-center text-ink-soft"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5 pb-24 pt-5 text-[0.95rem]">
          <Preview blocks={blocks} />
        </div>
      </section>
    </div>
  );
}
