"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Replaces the wrapping chip grid on small screens. The chips cost four rows
 * — 130px — before any content; this is one 48px row plus a progress rule.
 */
export default function MobileStepBar({
  steps,
  step,
  onSelect,
  canJump,
}: {
  steps: readonly { id: string; title: string }[];
  step: number;
  onSelect: (i: number) => void;
  canJump: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-line bg-surface/95 backdrop-blur lg:hidden">
      <div className="flex items-center px-1">
        {step === 0 ? (
          <Link
            href="/"
            aria-label="Back to the start page"
            className="flex h-12 w-12 items-center justify-center text-ink-soft"
          >
            <BackIcon />
          </Link>
        ) : (
          <button
            type="button"
            aria-label="Previous step"
            onClick={() => onSelect(step - 1)}
            className="flex h-12 w-12 items-center justify-center text-ink-soft"
          >
            <BackIcon />
          </button>
        )}

        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-[15px] font-bold leading-[18px] tracking-tight text-ink">
            {steps[step].title}
          </p>
          <p className="text-[11px] leading-[14px] text-muted">
            Step {step + 1} of {steps.length}
          </p>
        </div>

        <button
          type="button"
          aria-label="All steps"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center text-ink-soft"
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
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="h-[3px] bg-line">
        <div
          className="h-[3px] bg-brand transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close step list"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <ul className="absolute inset-x-0 z-20 border-b border-line bg-surface py-1 shadow-lg">
            {steps.map((s, i) => {
              const reachable = canJump || i <= step;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => {
                      onSelect(i);
                      setMenuOpen(false);
                    }}
                    className={`flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left text-sm ${
                      i === step
                        ? "font-semibold text-brand"
                        : reachable
                          ? "text-ink"
                          : "text-muted/60"
                    }`}
                  >
                    <span className="w-4 text-xs font-semibold tabular-nums text-muted">
                      {i + 1}
                    </span>
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
