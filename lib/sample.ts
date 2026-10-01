import { PRINCIPLES } from "./principles";
import { DEFAULT_ANSWERS, type Answers } from "./types";

/**
 * The sample organization the landing page previews. It runs through the
 * same `buildDocument` as a real draft, so the preview is the product's own
 * output and cannot drift from it.
 *
 * The names echo the wizard's placeholders. Location, website, and email are
 * left out on purpose: they would make a fictional church read like a real
 * one endorsing the tool.
 */
export const SAMPLE_ANSWERS: Answers = {
  ...DEFAULT_ANSWERS,
  orgName: "Grace Community Church",
  ownerName: "Jordan Ellis",
  ownerRole: "Executive Pastor",
  // Skips the historical narrative so the principles, the substance of the
  // document, sit inside the landing page's crop.
  includeNarrative: false,
  selectedPrincipleIds: PRINCIPLES.map((p) => p.id),
  useCases: ["transcription", "summarization", "outlines", "copywriting", "research"],
  prohibited: ["counseling", "discipline", "congregant-data", "likeness"],
  approverRole: "our Executive Pastor",
  disclosureStatement:
    "Portions of this content were drafted with AI assistance and reviewed by our staff.",
};
