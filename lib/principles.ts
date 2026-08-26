/**
 * The 18 principles from "Responsible AI Principles for Churches" v1.0.
 *
 * `statement` is the canonical wording from the source document (CC BY-SA 4.0).
 * `practice` supplies one concrete commitment per posture, so a generated
 * document says what the church will actually *do*, not only what it believes.
 */

export type Posture = "cautious" | "balanced" | "pioneering";

export type Principle = {
  id: string;
  number: number;
  title: string;
  statement: string;
  /** Why a church might keep this one — shown as helper text in the builder. */
  why: string;
  practice: Record<Posture, string>;
};

export const POSTURES: {
  id: Posture;
  label: string;
  blurb: string;
}[] = [
  {
    id: "cautious",
    label: "Cautious",
    blurb:
      "AI stays in a narrow, supervised lane. Every use is approved in advance and reviewed by a person before it reaches the congregation.",
  },
  {
    id: "balanced",
    label: "Balanced",
    blurb:
      "AI is a normal part of staff work within clear boundaries. Staff can use approved tools freely; sensitive areas stay off-limits.",
  },
  {
    id: "pioneering",
    label: "Pioneering",
    blurb:
      "The church actively experiments and shares what it learns, while keeping firm limits around pastoral care and congregant data.",
  },
];

export const PRINCIPLES: Principle[] = [
  {
    id: "human-centered",
    number: 1,
    title: "Human-Centered",
    statement:
      "We believe AI should be used to augment human creativity and connection, not replace the unique, God-given essence of human ministry.",
    why: "The anchor principle. Everything else is a working out of this one.",
    practice: {
      cautious:
        "AI will not be used for any task whose value depends on a person having actually done it.",
      balanced:
        "Before adopting a tool we ask what it frees our people to do, not only what it saves.",
      pioneering:
        "We measure new AI tools by whether they increase relational ministry time, and we retire the ones that do not.",
    },
  },
  {
    id: "transparency",
    number: 2,
    title: "Transparency",
    statement:
      "We will be open about when and how AI is used in our communications and operations.",
    why: "Trust is the church's currency. Disclosure protects it.",
    practice: {
      cautious:
        "Any content substantially produced with AI carries a visible disclosure, and this document is public.",
      balanced:
        "We disclose AI assistance where a reasonable person would want to know, and this document is public.",
      pioneering:
        "We publish this document, our tool list, and what we are currently experimenting with.",
    },
  },
  {
    id: "accuracy",
    number: 3,
    title: "Accuracy & Truth",
    statement:
      "We will verify AI-generated content to ensure it aligns with scriptural truth and factual reality.",
    why: "Models state falsehoods fluently. Scripture and facts both need checking.",
    practice: {
      cautious:
        "Every scriptural reference, quotation, statistic, and name is verified against a primary source before publication.",
      balanced:
        "Scripture references, quotations, and factual claims are verified against a primary source before publication.",
      pioneering:
        "Scripture references and factual claims are verified before publication, and we track where our tools tend to fail.",
    },
  },
  {
    id: "bias",
    number: 4,
    title: "Bias Mitigation",
    statement:
      "We recognize that AI can reflect human biases; we will actively work to identify and mitigate these to ensure all are treated with dignity.",
    why: "Training data carries the culture's assumptions about who counts.",
    practice: {
      cautious:
        "Content depicting or describing people is reviewed by a person before use, and we do not use AI to generate images of congregants.",
      balanced:
        "We review AI output for who it centers and who it leaves out, especially in imagery and illustration.",
      pioneering:
        "We test our tools for bias in the populations we serve and report what we find to our leadership.",
    },
  },
  {
    id: "privacy",
    number: 5,
    title: "Privacy & Data Ethics",
    statement:
      "We will protect the data of our congregants and staff with the highest level of integrity.",
    why: "What people share with a church is often the most sensitive thing about them.",
    practice: {
      cautious:
        "No congregant, member, donor, or staff information is entered into any AI tool, in any form.",
      balanced:
        "Congregant, donor, counseling, and personnel information is never entered into a consumer AI tool; only approved tools with a data-protection agreement may handle it.",
      pioneering:
        "Congregant data is used only in approved tools under a written data-protection agreement, and we keep a record of which systems hold what.",
    },
  },
  {
    id: "accountability",
    number: 6,
    title: "Accountability",
    statement:
      "Humans remain responsible for the outcomes and impact of AI-driven tools and decisions.",
    why: '"The AI did it" is never an answer a church can give.',
    practice: {
      cautious:
        "Every AI-assisted output has a named staff member accountable for it before it is released.",
      balanced:
        "Every AI-assisted output has a named staff member accountable for it.",
      pioneering:
        "Every AI system and agent we run has a named owner accountable for its behavior.",
    },
  },
  {
    id: "inclusivity",
    number: 7,
    title: "Inclusivity",
    statement:
      "AI should be used to make the Gospel more accessible to all, regardless of language, ability, or background.",
    why: "Accessibility is one of the clearest goods AI offers a church.",
    practice: {
      cautious:
        "We use AI for captioning and accessibility first, before any promotional use.",
      balanced:
        "We use AI to caption, translate, and adapt our content for those our current formats exclude.",
      pioneering:
        "We actively seek out barriers in our ministry that AI can lower, beginning with language and disability access.",
    },
  },
  {
    id: "stewardship",
    number: 8,
    title: "Stewardship",
    statement:
      "We will evaluate the cost and efficiency of AI tools to ensure they are a wise use of the resources entrusted to the church.",
    why: "Subscriptions accumulate quietly. This money was given, not earned.",
    practice: {
      cautious:
        "Every AI subscription is approved in advance and reviewed at each budget cycle.",
      balanced:
        "AI subscriptions are inventoried and reviewed at least annually against what they actually produce.",
      pioneering:
        "We track spend and value per tool, and consolidate or cancel what does not earn its place.",
    },
  },
  {
    id: "empowerment",
    number: 9,
    title: "Empowerment",
    statement:
      "We will provide training and resources to help our community navigate the AI era with wisdom.",
    why: "Our people are facing AI at work and at home whether or not we address it.",
    practice: {
      cautious:
        "Staff receive basic guidance on these principles before using any AI tool.",
      balanced:
        "Staff are trained on these principles, and we offer periodic teaching to the congregation on living wisely with AI.",
      pioneering:
        "We train staff and volunteers regularly and teach the congregation on discipleship in an AI age.",
    },
  },
  {
    id: "oversight",
    number: 10,
    title: "Human Oversight",
    statement:
      "Critical decisions, especially those involving pastoral care or theological interpretation, must always involve human discernment.",
    why: "The line most churches most want drawn, drawn explicitly.",
    practice: {
      cautious:
        "AI is never used in pastoral care, counseling, discipline, hiring, benevolence decisions, or the preparation of preaching.",
      balanced:
        "AI is never the deciding voice in pastoral care, counseling, discipline, hiring, or benevolence decisions.",
      pioneering:
        "Pastoral care, counseling, discipline, hiring, and benevolence decisions remain human decisions, whatever tools inform them.",
    },
  },
  {
    id: "safety",
    number: 11,
    title: "Safety",
    statement:
      "We will prioritize tools that have robust safety measures to prevent the generation of harmful or inappropriate content.",
    why: "Especially where children and youth ministry are involved.",
    practice: {
      cautious:
        "Only tools on our approved list may be used, and no AI tool is used in children's or youth ministry without explicit approval.",
      balanced:
        "We prefer vendors with published safety practices, and AI use in children's and youth ministry requires approval.",
      pioneering:
        "We evaluate vendor safety practices before adoption and re-check them as tools change.",
    },
  },
  {
    id: "collaboration",
    number: 12,
    title: "Collaboration",
    statement:
      "We will share our learnings and best practices with the broader Body of Christ.",
    why: "Most churches are solving these same questions alone.",
    practice: {
      cautious:
        "We will share what we learn with churches who ask.",
      balanced:
        "We share what works and what fails with other churches and ministries in our network.",
      pioneering:
        "We publish our practices, tooling, and failures so other churches do not have to start from zero.",
    },
  },
  {
    id: "innovation",
    number: 13,
    title: "Innovation for Good",
    statement:
      "We will seek out ways AI can solve complex problems and meet the needs of the vulnerable.",
    why: "Keeps the policy from being purely defensive.",
    practice: {
      cautious:
        "We will consider AI first where it serves those in need rather than where it saves us effort.",
      balanced:
        "We look for uses that serve the vulnerable, not only uses that reduce staff workload.",
      pioneering:
        "We dedicate time each year to piloting AI against a real need in our community.",
    },
  },
  {
    id: "theology",
    number: 14,
    title: "Theological Reflection",
    statement:
      "We will maintain an ongoing dialogue about the intersection of faith, technology, and what it means to be made in the Image of God.",
    why: "The questions AI raises are older than AI.",
    practice: {
      cautious:
        "Our leadership will revisit the theological questions raised by AI before expanding our use of it.",
      balanced:
        "Our leadership discusses the theological questions raised by our AI use at least annually.",
      pioneering:
        "We treat theological reflection as a standing part of our technology decisions, not a step at the end.",
    },
  },
  {
    id: "improvement",
    number: 15,
    title: "Continuous Improvement",
    statement:
      "These principles will evolve as technology and our understanding of its impact grow.",
    why: "Dates this document honestly instead of pretending it is final.",
    practice: {
      cautious: "This document is reviewed on a set schedule and versioned.",
      balanced: "This document is reviewed on a set schedule and versioned.",
      pioneering:
        "This document is reviewed on a set schedule, versioned, and revised whenever our practice changes.",
    },
  },
  {
    id: "provenance",
    number: 16,
    title: "Digital Provenance",
    statement:
      "We will strive to maintain the integrity of our brand and voice. In an era of deepfakes and subversive technology, we will explore digitally signing content to defend our authenticity.",
    why: "A convincing fake of your pastor is now cheap to make.",
    practice: {
      cautious:
        "We publish only through channels we control, and we tell our congregation how to verify that a message is genuinely from us.",
      balanced:
        "We maintain a known set of official channels and will act quickly on any impersonation of our staff or ministry.",
      pioneering:
        "We are adopting content provenance and signing practices for the media we publish.",
    },
  },
  {
    id: "legal",
    number: 17,
    title: "Legal Compliance",
    statement:
      "We will stay informed and compliant with evolving state and federal legal requirements regarding AI.",
    why: "State AI law is moving fast and does not exempt nonprofits.",
    practice: {
      cautious:
        "We will seek counsel before any AI use touching minors, employment, or donor data.",
      balanced:
        "We track legal developments affecting our state and seek counsel where AI touches minors, employment, or donor data.",
      pioneering:
        "We review our AI practices against current state and federal requirements as part of each scheduled review.",
    },
  },
  {
    id: "environment",
    number: 18,
    title: "Environmental Stewardship",
    statement:
      "As believers committed to stewarding the Earth, we will consider and work to mitigate the environmental impact of the AI technologies we utilize.",
    why: "Creation care applied to compute.",
    practice: {
      cautious:
        "We will not generate media at volume without a ministry reason for it.",
      balanced:
        "We weigh the environmental cost of AI use, particularly high-volume image and video generation.",
      pioneering:
        "We factor energy and water use into vendor selection and avoid generation at volume without purpose.",
    },
  },
];

export const PRINCIPLES_BY_ID = new Map(PRINCIPLES.map((p) => [p.id, p]));
