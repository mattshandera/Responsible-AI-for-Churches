/**
 * The draft a person is working on, as this browser remembers it. Nothing
 * here is ever sent anywhere: it lives in localStorage on this device only.
 *
 * Shared by the builder (which writes it) and the landing page (which reads
 * it to offer "Continue your draft"), so the two agree on keys and shape.
 */

/** Every answer, as one JSON object (the `Answers` shape). */
export const DRAFT_KEY = "raifc-builder-v1";

/** The wizard step the person was on, as a 0-based index. */
export const STEP_KEY = "raifc-builder-step-v1";

export const STEPS = [
  { id: "org", title: "Your organization", blurb: "Who this document is for." },
  { id: "doc", title: "Document details", blurb: "Title, version, and owner." },
  { id: "posture", title: "Posture & voice", blurb: "How far you are willing to go, and how it should read." },
  { id: "principles", title: "Principles", blurb: "Keep, cut, reword, or add your own." },
  { id: "usage", title: "How you use AI", blurb: "What is actually happening today." },
  { id: "guardrails", title: "Guardrails", blurb: "Where AI does not go, and who approves it." },
  { id: "review", title: "Review & download", blurb: "Read it through, then take it with you." },
] as const;

/**
 * The step to resume on. Past step 1 only once an organization name exists,
 * since the wizard won't advance without one.
 */
export function savedStep(orgName: string, raw: string | null): number {
  const n = Number(raw);
  if (!orgName.trim() || !Number.isInteger(n)) return 0;
  return Math.min(Math.max(n, 0), STEPS.length - 1);
}

export type DraftSummary = { orgName: string; step: number };

/**
 * A summary of the saved draft, or null when there is nothing worth
 * resuming. Opening the builder saves a blank draft straight away, so a
 * draft only counts once it has an organization name.
 */
export function readDraftSummary(): DraftSummary | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const orgName = String(JSON.parse(raw)?.orgName ?? "").trim();
    if (!orgName) return null;
    return { orgName, step: savedStep(orgName, window.localStorage.getItem(STEP_KEY)) };
  } catch {
    return null;
  }
}
