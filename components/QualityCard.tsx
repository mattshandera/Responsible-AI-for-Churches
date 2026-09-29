"use client";

import { useState } from "react";
import type { Quality } from "@/lib/quality";

type AiGrade = {
  score: number;
  tier: string;
  summary: string;
  strengths: string[];
  improvements: string[];
};

type AiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; grade: AiGrade };

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
  getRedactedMarkdown,
  onJump,
}: {
  quality: Quality;
  /** The document with the owner's name and email blanked out. */
  getRedactedMarkdown: () => string;
  onJump: (step: number) => void;
}) {
  const [ai, setAi] = useState<AiState>({ status: "idle" });
  const open = quality.checks.filter((c) => !c.passed);

  async function requestReview() {
    setAi({ status: "loading" });
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ markdown: getRedactedMarkdown() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAi({ status: "error", message: data.error || "The review did not work. Please try again." });
        return;
      }
      setAi({ status: "done", grade: data });
    } catch {
      setAi({ status: "error", message: "Could not reach the review service. Please try again." });
    }
  }

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
          {open
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 4)
            .map((c) => (
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

      <div className="mt-4 border-t border-line pt-3">
        {ai.status === "done" ? (
          <div className="text-xs leading-relaxed text-ink-soft">
            <p className="text-sm font-semibold text-ink">
              AI review: {ai.grade.score}/100 · {ai.grade.tier}
            </p>
            <p className="mt-1">{ai.grade.summary}</p>
            {ai.grade.strengths.length > 0 ? (
              <>
                <p className="mt-2 font-semibold text-ink">Working well</p>
                <ul className="list-disc pl-4">
                  {ai.grade.strengths.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </>
            ) : null}
            {ai.grade.improvements.length > 0 ? (
              <>
                <p className="mt-2 font-semibold text-ink">Worth a second look</p>
                <ul className="list-disc pl-4">
                  {ai.grade.improvements.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </>
            ) : null}
            <button
              type="button"
              onClick={requestReview}
              className="mt-3 font-medium text-brand hover:underline"
            >
              Review again
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={requestReview}
              disabled={ai.status === "loading"}
              className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink transition hover:border-brand hover:text-brand disabled:opacity-50"
            >
              {ai.status === "loading" ? "Reviewing…" : "Get an AI review"}
            </button>
            <p className="mt-2 text-xs text-muted">
              Optional. This sends your drafted document, without your name or
              email, to Anthropic&apos;s API to be graded. Nothing is saved on this
              site. Skip it and everything stays in your browser.
            </p>
            {ai.status === "error" ? (
              <p role="alert" className="mt-2 text-xs text-red-600">{ai.message}</p>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
