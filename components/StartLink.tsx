"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readDraftSummary, STEPS, type DraftSummary } from "@/lib/draft";

/**
 * The landing page's main call to action, and the note under it. Both
 * render the "new visitor" version on the server; if this browser holds a
 * draft with a name in it, the button becomes "Continue your draft" and the
 * note says where they left off. /build restores the draft and the step on
 * its own, so both versions link to the same place.
 */
function useDraftSummary() {
  const [draft, setDraft] = useState<DraftSummary | null>(null);
  useEffect(() => {
    setDraft(readDraftSummary());
  }, []);
  return draft;
}

export default function StartLink({ className }: { className: string }) {
  const draft = useDraftSummary();
  return (
    <Link href="/build" className={className}>
      {draft ? "Continue your draft" : "Start the questions"}
    </Link>
  );
}

export function DraftNote() {
  const draft = useDraftSummary();
  if (!draft) return null;
  return (
    // A long name gives way; the step never does.
    <p className="mx-auto mt-3 flex max-w-md justify-center gap-1 text-xs text-ink-soft">
      <span className="min-w-0 truncate font-semibold">{draft.orgName}</span>
      <span className="shrink-0">
        · step {draft.step + 1} of {STEPS.length}, {STEPS[draft.step].title}
      </span>
    </p>
  );
}
