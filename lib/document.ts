import { PRINCIPLES_BY_ID, POSTURES } from "./principles";
import {
  AUTOMATIONS,
  ORG_KINDS,
  PROHIBITED,
  REVIEW_CADENCES,
  USE_CASES,
} from "./options";
import type { Answers } from "./types";

export const SOURCE_URL =
  "https://github.com/mattshandera/Responsible-AI-for-Churches";
export const SOURCE_TITLE = "Responsible AI Principles for Churches";
export const UPSTREAM_URL =
  "https://www.marketingaiinstitute.com/blog/responsible-ai-manifesto-for-marketing-and-business";
export const LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/";

/**
 * Inline text may contain `**bold**` and `[label](url)`. Both renderers
 * understand that much and nothing more.
 */
export type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: { text: string; sub?: string }[] }
  | { type: "kv"; rows: { label: string; value: string }[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "hr" };

function orgNoun(a: Answers): string {
  return ORG_KINDS.find((k) => k.id === a.orgKind)?.noun ?? "organization";
}

export function orgLabel(a: Answers): string {
  return a.orgName.trim() || "Our church";
}

export function docTitle(a: Answers): string {
  const custom = a.docTitle.trim();
  if (custom) return custom;
  const name = a.orgName.trim();
  return name
    ? `Responsible AI Principles for ${name}`
    : "Responsible AI Principles";
}

export function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "responsible-ai-principles"
  );
}

export function fileBaseName(a: Answers): string {
  const name = a.orgName.trim();
  return name
    ? `${slugify(name)}-responsible-ai-principles`
    : "responsible-ai-principles";
}

/** The principles the user kept, in canonical order, with any edits applied. */
export function resolvedPrinciples(a: Answers): {
  title: string;
  statement: string;
  practice?: string;
  edited: boolean;
}[] {
  const kept = a.selectedPrincipleIds
    .map((id) => PRINCIPLES_BY_ID.get(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .sort((x, y) => x.number - y.number)
    .map((p) => {
      const override = a.principleOverrides[p.id]?.trim();
      return {
        title: p.title,
        statement: override || p.statement,
        practice: a.includePractices ? p.practice[a.posture] : undefined,
        edited: Boolean(override),
      };
    });

  const custom = a.customPrinciples
    .filter((p) => p.title.trim() && p.statement.trim())
    .map((p) => ({
      title: p.title.trim(),
      statement: p.statement.trim(),
      practice: undefined,
      edited: true,
    }));

  return [...kept, ...custom];
}

function overviewBlocks(a: Answers): Block[] {
  const org = orgLabel(a);
  const noun = orgNoun(a);
  const blocks: Block[] = [{ type: "h2", text: "Overview" }];

  if (a.tone === "formal") {
    blocks.push({
      type: "p",
      text: `This document establishes the principles governing the use of artificial intelligence at ${org}. It applies to staff, contractors, and volunteers acting on behalf of the ${noun}, and to any AI-assisted work produced in our name.`,
    });
    if (a.includeNarrative) {
      blocks.push({
        type: "p",
        text: `AI represents a fundamental shift in how people interact with technology and with one another. Like the road networks of the Roman Empire and the printing press before it, it is infrastructure: capable of extending the reach of the Gospel, and equally capable of harm. Its impact is determined by how it is stewarded.`,
      });
    }
    blocks.push({
      type: "p",
      text: `These principles are binding on our practice and are reviewed and revised as the technology and our understanding of it change.`,
    });
    return blocks;
  }

  if (a.tone === "plain") {
    blocks.push({
      type: "p",
      text: `This document says how ${org} uses AI, where we will not use it, and who is responsible when we do. It is written for our staff and volunteers, and it is public so our congregation can hold us to it.`,
    });
    if (a.includeNarrative) {
      blocks.push({
        type: "p",
        text: `AI is not the first technology to change how the Gospel travels. Roman roads, movable type, and the Internet each did the same. Every one of them could be used well or badly. This is our attempt to use this one well.`,
      });
    }
    return blocks;
  }

  // pastoral
  blocks.push({
    type: "p",
    text: `AI marks a fundamental shift in how we interact with technology and with one another. As with every major advance before it, AI can carry the hope and good news of the Gospel to ever-widening groups of people. It can also quietly erode the trust, the attention, and the human presence that ministry depends on. Which of those happens at ${org} is not up to the technology.`,
  });
  if (a.includeNarrative) {
    blocks.push({
      type: "p",
      text: `Beginning with the first major roads of the Roman Empire, technology has carried the message of the Gospel out into the world, bearing fruit and changing lives. Like the Gutenberg Press, AI is already opening new ground:`,
    });
    blocks.push({
      type: "ul",
      items: [
        "Improving access to the Bible and related content.",
        "Facilitating faster translation into new languages.",
        "Unlocking new modalities for interaction with God's word.",
        "Discovering a myriad of yet-to-be-discovered paradigms for interaction.",
      ],
    });
    blocks.push({
      type: "p",
      text: `As with the advent of the Internet, it is not a question of **if** AI will affect the church, but **how**. Roads, movable type, and the Internet were each neutral infrastructure; what mattered was the stewardship of them. The principles below describe how ${org} intends to steward this one — so that AI shares in, and never supplants, the transformative work of Jesus Christ.`,
    });
  }
  if (a.includeScripture) {
    blocks.push({
      type: "quote",
      text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.",
      cite: "Colossians 3:17 (NIV)",
    });
  }
  return blocks;
}

function principleBlocks(a: Answers): Block[] {
  const principles = resolvedPrinciples(a);
  if (principles.length === 0) return [];
  const posture = POSTURES.find((p) => p.id === a.posture);
  const blocks: Block[] = [{ type: "h2", text: "The Principles" }];

  if (posture) {
    blocks.push({
      type: "p",
      text: `Our posture toward AI is **${posture.label.toLowerCase()}**. ${posture.blurb}`,
    });
  }

  blocks.push({
    type: "ol",
    items: principles.map((p) => ({
      text: `**${p.title}:** ${p.statement}`,
      sub: p.practice,
    })),
  });
  return blocks;
}

function usageBlocks(a: Answers): Block[] {
  const org = orgLabel(a);
  const blocks: Block[] = [{ type: "h2", text: "How We Use AI Today" }];

  const chosen = a.useCases
    .map((id) => USE_CASES.find((u) => u.id === id))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));
  const customUses = a.customUseCases.filter((s) => s.trim());

  if (!a.usesAiToday || (chosen.length === 0 && customUses.length === 0)) {
    blocks.push({
      type: "p",
      text: `${org} is not yet making regular use of AI tools. We are publishing these principles first, so that our practice follows a decision we have already made rather than the other way around. This section will be filled in as our use begins.`,
    });
    return blocks;
  }

  blocks.push({
    type: "p",
    text: `Our current use of AI is concentrated in the following areas. We use a collection of Software-as-a-Service products for:`,
  });
  blocks.push({
    type: "ul",
    items: [
      ...chosen.map((u) => `**${u.label}:** ${u.detail}`),
      ...customUses.map((s) => s.trim()),
    ],
  });

  const autos = a.automations
    .map((id) => AUTOMATIONS.find((x) => x.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const customAutos = a.customAutomations.filter((s) => s.trim());

  if (a.usesAutomation && (autos.length > 0 || customAutos.length > 0)) {
    blocks.push({ type: "h3", text: "Operational Efficiency & Automation" });
    blocks.push({
      type: "p",
      text: `We also use AI to automate administrative and systems-level tasks. All such automation runs within strict human-defined parameters and is subject to continuous review. It exists to redirect staff time toward high-relational ministry, not to reduce the number of people doing ministry.`,
    });
    blocks.push({
      type: "ul",
      items: [
        ...autos.map((x) => `**${x.label}:** ${x.detail}`),
        ...customAutos.map((s) => s.trim()),
      ],
    });
  }

  return blocks;
}

function guardrailBlocks(a: Answers): Block[] {
  const org = orgLabel(a);
  const chosen = a.prohibited
    .map((id) => PROHIBITED.find((p) => p.id === id)?.label)
    .filter((s): s is string => Boolean(s));
  const custom = a.customProhibited.filter((s) => s.trim()).map((s) => s.trim());
  const all = [...chosen, ...custom];
  if (all.length === 0) return [];

  const blocks: Block[] = [
    { type: "h2", text: "Where We Do Not Use AI" },
    {
      type: "p",
      text: `Some work belongs to people, and no efficiency gain would justify handing it over. At ${org}, AI is not used for:`,
    },
    { type: "ul", items: all },
  ];
  if (a.includeScripture) {
    blocks.push({
      type: "quote",
      text: "Be as shrewd as snakes and as innocent as doves.",
      cite: "Matthew 10:16 (NIV)",
    });
  }
  return blocks;
}

function governanceBlocks(a: Answers): Block[] {
  const org = orgLabel(a);
  const blocks: Block[] = [
    { type: "h2", text: "Approval, Disclosure, and Review" },
  ];
  const items: string[] = [];

  if (a.approvalRequired) {
    const who = a.approverRole.trim();
    items.push(
      `**Approval.** New AI tools are approved before use${
        who ? ` by ${who}` : ""
      }. Staff and volunteers may not adopt a tool for ministry work on their own initiative.`,
    );
  } else {
    items.push(
      `**Approval.** Staff may use AI tools at their discretion within these principles. Tools that will handle congregant, donor, or personnel data require approval first${
        a.approverRole.trim() ? ` from ${a.approverRole.trim()}` : ""
      }.`,
    );
  }

  const disclosure = a.disclosureStatement.trim();
  items.push(
    disclosure
      ? `**Disclosure.** Where AI has meaningfully shaped something we publish, we say so. Our standard disclosure reads: "${disclosure}"`
      : `**Disclosure.** Where AI has meaningfully shaped something we publish, we say so plainly.`,
  );

  items.push(
    `**Human review.** No AI-assisted content reaches our congregation without a person reading it first and taking responsibility for it.`,
  );

  const cadence = REVIEW_CADENCES.find((c) => c.id === a.reviewCadence);
  items.push(
    cadence && cadence.phrase
      ? `**Review.** These principles, and the list of tools we use, are reviewed ${cadence.phrase} and versioned when they change.`
      : `**Review.** These principles are versioned, and will be revisited as our practice and the technology change.`,
  );

  items.push(
    `**Questions and concerns.** Anyone at ${org} may raise a concern about how AI is being used${
      a.ownerEmail.trim() ? ` by contacting ${a.ownerEmail.trim()}` : ""
    }, and we will answer it.`,
  );

  blocks.push({ type: "ul", items });
  return blocks;
}

function ownershipBlocks(a: Answers): Block[] {
  const name = a.ownerName.trim();
  const role = a.ownerRole.trim();
  const email = a.ownerEmail.trim();
  if (!name && !role && !email) return [];

  const who = [name, role].filter(Boolean).join(", ");
  const blocks: Block[] = [
    { type: "h2", text: "Who Owns This Document" },
    {
      type: "p",
      text: `${
        who || "The owner named below"
      } is responsible for keeping these principles current and for answering questions about them${
        email ? ` at ${email}` : ""
      }. Responsibility for how AI is used, however, sits with each person who uses it.`,
    },
  ];
  return blocks;
}

function attributionBlocks(a: Answers): Block[] {
  const org = orgLabel(a);
  const note = a.adaptedNote.trim();
  const blocks: Block[] = [
    { type: "hr" },
    { type: "h2", text: "Attribution & License" },
    {
      type: "p",
      text: `This document was adapted by ${org} from [${SOURCE_TITLE}](${SOURCE_URL}), which was itself inspired by the [Responsible AI Manifesto for Marketing and Business](${UPSTREAM_URL}) by Paul Roetzer of the Marketing AI Institute.`,
    },
  ];
  if (note) blocks.push({ type: "p", text: note });
  blocks.push({
    type: "p",
    text: `Like the work it builds on, this document is released under the [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](${LICENSE_URL}) license. You are free to share and adapt it, including commercially, provided you give appropriate credit and license your version under the same terms.`,
  });
  return blocks;
}

/** Assemble the full document for a set of answers. */
export function buildDocument(a: Answers): Block[] {
  const meta: { label: string; value: string }[] = [
    { label: "Prepared for", value: orgLabel(a) },
  ];
  if (a.orgLocation.trim())
    meta.push({ label: "Location", value: a.orgLocation.trim() });
  meta.push({ label: "Version", value: a.version.trim() || "1.0" });
  meta.push({ label: "Effective", value: formatDate(a.effectiveDate) });
  if (a.orgWebsite.trim())
    meta.push({ label: "Web", value: a.orgWebsite.trim() });

  const blocks: Block[] = [
    { type: "h1", text: docTitle(a) },
    { type: "kv", rows: meta },
  ];

  if (a.includeScripture) {
    blocks.push({
      type: "quote",
      text: '"Everything is permissible" — but not everything is beneficial.',
      cite: "1 Corinthians 10:23 (NIV)",
    });
  }

  blocks.push({ type: "hr" });
  blocks.push(...overviewBlocks(a));
  blocks.push(...principleBlocks(a));
  blocks.push(...usageBlocks(a));
  blocks.push(...guardrailBlocks(a));
  blocks.push(...governanceBlocks(a));
  blocks.push(...ownershipBlocks(a));
  blocks.push(...attributionBlocks(a));

  return blocks;
}
