import type { Answers } from "./types";

export type Tier = "Getting started" | "Solid foundation" | "Well-developed";

export type Check = {
  id: string;
  kind: "complete" | "coherent";
  weight: 1 | 2 | 3;
  passed: boolean;
  /** Index into the wizard's STEPS, so the UI can jump to the fix. */
  step: number;
  /** Shown while the check is failing. */
  fix: string;
};

export type Quality = {
  /** 0-100, weighted share of checks passed. */
  score: number;
  tier: Tier;
  checks: Check[];
};

const filled = (s: string) => s.trim().length > 0;

export function tierFor(score: number): Tier {
  if (score >= 80) return "Well-developed";
  if (score >= 50) return "Solid foundation";
  return "Getting started";
}

/**
 * A deterministic checklist over the wizard's answers. Runs entirely in the
 * browser. A check that does not apply to the current answers counts as
 * passed, so nobody is marked down for a question they were never asked.
 */
export function scoreAnswers(a: Answers): Quality {
  const principleCount = a.selectedPrincipleIds.length + a.customPrinciples.length;
  const prohibitedCount = a.prohibited.length + a.customProhibited.filter(filled).length;
  const useCaseCount = a.useCases.length + a.customUseCases.filter(filled).length;
  const customised =
    Object.keys(a.principleOverrides).length > 0 || a.customPrinciples.length > 0;

  const checks: Check[] = [
    // Completeness
    {
      id: "owner",
      kind: "complete",
      weight: 3,
      passed: filled(a.orgName) && filled(a.ownerName) && filled(a.ownerRole),
      step: 1,
      fix: "Name the person who owns this document, and their role.",
    },
    {
      id: "contact",
      kind: "complete",
      weight: 1,
      passed: filled(a.ownerEmail),
      step: 1,
      fix: "Add a contact email so people know where to send questions.",
    },
    {
      id: "principles",
      kind: "complete",
      weight: 3,
      passed: principleCount >= 5,
      step: 3,
      fix: "Keep at least five principles so the policy has real substance.",
    },
    {
      id: "approver",
      kind: "complete",
      weight: 3,
      passed: !a.approvalRequired || filled(a.approverRole),
      step: 5,
      fix: "You require approval for AI use. Say who approves it.",
    },
    {
      id: "prohibited",
      kind: "complete",
      weight: 2,
      passed: prohibitedCount >= 1,
      step: 5,
      fix: "List at least one place AI does not go.",
    },
    {
      id: "disclosure",
      kind: "complete",
      weight: 2,
      passed: filled(a.disclosureStatement),
      step: 5,
      fix: "Write the line you will use to tell people when AI helped.",
    },
    {
      id: "cadence",
      kind: "complete",
      weight: 2,
      passed: a.reviewCadence !== "none",
      step: 5,
      fix: "Pick a review cadence. AI changes fast and a policy that never gets revisited goes stale.",
    },
    {
      id: "usage",
      kind: "complete",
      weight: 2,
      passed: !a.usesAiToday || useCaseCount >= 1,
      step: 4,
      fix: "You said you use AI today. Name at least one way.",
    },
    {
      id: "own-words",
      kind: "complete",
      weight: 1,
      passed: customised,
      step: 3,
      fix: "Reword or add a principle so the document sounds like your church.",
    },

    // Coherence: answers that pull against each other
    {
      id: "automation-approval",
      kind: "coherent",
      weight: 3,
      passed: !a.usesAutomation || a.approvalRequired,
      step: 5,
      fix: "You use automation but do not require approval. Automation is where approval matters most.",
    },
    {
      id: "cautious-guardrails",
      kind: "coherent",
      weight: 2,
      passed: a.posture !== "cautious" || prohibitedCount >= 3,
      step: 5,
      fix: "A cautious posture usually comes with a fuller list of prohibited uses. Add a few.",
    },
    {
      id: "pioneering-disclosure",
      kind: "coherent",
      weight: 2,
      passed: a.posture !== "pioneering" || (filled(a.disclosureStatement) && a.approvalRequired),
      step: 5,
      fix: "A pioneering posture leans on transparency. Require approval and write a disclosure line.",
    },
    {
      id: "congregant-data",
      kind: "coherent",
      weight: 3,
      passed:
        a.posture === "pioneering" ||
        a.prohibited.includes("congregant-data") ||
        a.customProhibited.some((p) => /congregant|member/i.test(p)),
      step: 5,
      fix: "Consider prohibiting the use of congregant data in AI tools.",
    },
  ];

  const total = checks.reduce((n, c) => n + c.weight, 0);
  const earned = checks.reduce((n, c) => n + (c.passed ? c.weight : 0), 0);
  const score = Math.round((earned / total) * 100);

  return { score, tier: tierFor(score), checks };
}
