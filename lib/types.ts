import type { Posture } from "./principles";

export type Tone = "pastoral" | "plain" | "formal";
export type ReviewCadence = "quarterly" | "semiannual" | "annual" | "none";
export type OrgKind =
  | "church"
  | "multisite"
  | "denomination"
  | "ministry"
  | "school"
  | "other";

export type Answers = {
  // Step 1 — organization
  orgName: string;
  orgKind: OrgKind;
  orgLocation: string;
  orgWebsite: string;

  // Step 2 — document
  docTitle: string;
  version: string;
  effectiveDate: string; // yyyy-mm-dd
  ownerName: string;
  ownerRole: string;
  ownerEmail: string;

  // Step 3 — posture & voice
  posture: Posture;
  tone: Tone;
  includeNarrative: boolean;
  includePractices: boolean;
  includeScripture: boolean;

  // Step 4 — principles
  selectedPrincipleIds: string[];
  /** Principle id -> replacement statement text. */
  principleOverrides: Record<string, string>;
  customPrinciples: { title: string; statement: string }[];

  // Step 5 — current use
  usesAiToday: boolean;
  useCases: string[];
  customUseCases: string[];
  usesAutomation: boolean;
  automations: string[];
  customAutomations: string[];

  // Step 6 — guardrails
  prohibited: string[];
  customProhibited: string[];
  approvalRequired: boolean;
  approverRole: string;
  disclosureStatement: string;
  reviewCadence: ReviewCadence;

  // Step 7 — attribution
  adaptedNote: string;
};

export const DEFAULT_ANSWERS: Answers = {
  orgName: "",
  orgKind: "church",
  orgLocation: "",
  orgWebsite: "",

  docTitle: "",
  version: "1.0",
  effectiveDate: new Date().toISOString().slice(0, 10),
  ownerName: "",
  ownerRole: "",
  ownerEmail: "",

  posture: "balanced",
  tone: "pastoral",
  includeNarrative: true,
  includePractices: true,
  includeScripture: false,

  selectedPrincipleIds: [],
  principleOverrides: {},
  customPrinciples: [],

  usesAiToday: true,
  useCases: [],
  customUseCases: [],
  usesAutomation: false,
  automations: [],
  customAutomations: [],

  prohibited: [],
  customProhibited: [],
  approvalRequired: true,
  approverRole: "",
  disclosureStatement: "",
  reviewCadence: "annual",

  adaptedNote: "",
};
