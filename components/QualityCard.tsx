"use client";

import type { Quality } from "@/lib/quality";

const STEP_NAMES = [
  "Your church",
  "Document details",
  "Posture & voice",
  "Principles",
  "How you use AI",
  "Guardrails",
];

export function ScoreChip({ quality }: { quality: Quality }) {
  return (
    <p className="text-xs text-muted">
      Draft quality{" "}
      <span className="font-semibold text-ink">{quality.score}</span> ·{" "}
      {quality.tier}
    </p>
  );
}

export default function QualityCard({
  quality,
  onJump,
}: {
  quality: Quality;
  onJump: (step: number) => void;
}) {
  const open = quality.checks
    .filter((c) => !c.passed)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4);

  return (
    <section
      aria-labelledby="quality-heading"
      className="rounded-xl border border-line bg-surface p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 id="quality-heading" className="text-sm font-semibold text-ink">
          How strong is this draft?
        </h3>
        <p className="text-sm text-muted">
          <span className="text-lg font-semibold text-ink">{quality.score}</span>
          /100 · {quality.tier}
        </p>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={quality.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Draft quality"
      >
        <div className="h-full rounded-full bg-brand" style={{ width: `${quality.score}%` }} />
      </div>

      {open.length === 0 ? (
        <p className="mt-3 text-xs text-muted">
          Every check passes. Nicely done. The score only measures completeness and
          consistency, so still read it through with your leadership.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {open.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-3 text-xs">
              <span className="text-ink-soft">{c.fix}</span>
              <button
                type="button"
                onClick={() => onJump(c.step)}
                className="shrink-0 font-medium text-brand hover:underline"
              >
                Fix in {STEP_NAMES[c.step] ?? "builder"}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 border-t border-line pt-3 text-xs text-muted">
        Calculated in your browser from your answers. It is not included in the
        downloaded document.
      </p>
    </section>
  );
}
