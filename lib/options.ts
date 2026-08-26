import type { OrgKind, ReviewCadence, Tone } from "./types";

export const ORG_KINDS: { id: OrgKind; label: string; noun: string }[] = [
  { id: "church", label: "A local church", noun: "church" },
  { id: "multisite", label: "A multisite church", noun: "church" },
  { id: "denomination", label: "A denomination or network", noun: "network" },
  { id: "ministry", label: "A ministry or nonprofit", noun: "ministry" },
  { id: "school", label: "A Christian school or seminary", noun: "school" },
  { id: "other", label: "Something else", noun: "organization" },
];

export const TONES: { id: Tone; label: string; blurb: string }[] = [
  {
    id: "pastoral",
    label: "Pastoral",
    blurb: "Warm and theological. Reads like it came from a pastor.",
  },
  {
    id: "plain",
    label: "Plain",
    blurb: "Direct and practical. Reads like a staff handbook.",
  },
  {
    id: "formal",
    label: "Formal",
    blurb: "Policy language. Reads like a board-approved document.",
  },
];

export const REVIEW_CADENCES: { id: ReviewCadence; label: string; phrase: string }[] = [
  { id: "quarterly", label: "Every quarter", phrase: "quarterly" },
  { id: "semiannual", label: "Twice a year", phrase: "twice a year" },
  { id: "annual", label: "Once a year", phrase: "annually" },
  { id: "none", label: "No fixed schedule yet", phrase: "" },
];

export const USE_CASES: { id: string; label: string; detail: string }[] = [
  { id: "transcription", label: "Speech-to-text transcription", detail: "Converting sermons and meetings into written records." },
  { id: "summarization", label: "Content summarization", detail: "Creating highlights and key takeaways from long-form teaching." },
  { id: "outlines", label: "Outline generation", detail: "Brainstorming structures for lessons and series." },
  { id: "images", label: "Image & video editing and generation", detail: "Enhancing our outreach and brand visuals." },
  { id: "copywriting", label: "Copywriting", detail: "Drafting initial social media posts and newsletters." },
  { id: "research", label: "Research", detail: "Gathering data and summarizing complex topics for further review." },
  { id: "translation", label: "Translation", detail: "Making our content available in the languages our community speaks." },
  { id: "captioning", label: "Captioning & accessibility", detail: "Captioning services and media so more people can take part." },
  { id: "faq", label: "Website FAQ & wayfinding", detail: "Helping visitors find service times, locations, and next steps." },
  { id: "scheduling", label: "Scheduling & coordination", detail: "Drafting schedules and coordinating volunteer teams." },
  { id: "design", label: "Design & layout assistance", detail: "Producing slides, print pieces, and stage graphics." },
  { id: "coding", label: "Software & website development", detail: "Assisting our technical team with code and site maintenance." },
];

export const AUTOMATIONS: { id: string; label: string; detail: string }[] = [
  { id: "files", label: "Automated file organization", detail: "Archival and management in cloud storage." },
  { id: "sync", label: "Data synchronization", detail: "Transferring information between ministry platforms." },
  { id: "reports", label: "Routine report generation", detail: "Distribution of standard metrics and updates." },
  { id: "maintenance", label: "Scheduled maintenance", detail: "Regular system health checks and technical oversight." },
  { id: "followup", label: "Guest follow-up drafting", detail: "Preparing first-time guest follow-up for a person to review and send." },
  { id: "inbox", label: "Inbox triage", detail: "Sorting and routing incoming messages to the right staff member." },
];

export const PROHIBITED: { id: string; label: string }[] = [
  { id: "counseling", label: "Pastoral counseling or spiritual direction" },
  { id: "preaching", label: "Writing sermons or teaching delivered as our own" },
  { id: "prayer", label: "Generating prayers presented as a person's own" },
  { id: "discipline", label: "Church discipline or membership decisions" },
  { id: "hiring", label: "Hiring, firing, or performance decisions" },
  { id: "benevolence", label: "Benevolence or financial assistance decisions" },
  { id: "minors", label: "Any use involving minors without explicit approval" },
  { id: "congregant-data", label: "Entering congregant, donor, or counseling data into consumer AI tools" },
  { id: "likeness", label: "Synthetic voice or likeness of our staff, volunteers, or members" },
  { id: "surveillance", label: "Monitoring or profiling attendance and giving behavior" },
  { id: "undisclosed", label: "Publishing AI-generated content without human review" },
];
