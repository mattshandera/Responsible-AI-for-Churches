/**
 * Schema.org JSON-LD for the two routes.
 *
 * Every claim here has to be visible on the page it ships with — that is both
 * Google's structured-data rule and the reason these live next to the copy
 * they describe. The `@id` values are stable URLs so the graph nodes can
 * reference each other across pages.
 *
 * Deliberately absent: `FAQPage`. Google stopped showing FAQ rich results for
 * everyone except government and health sites in 2023, so the markup would be
 * maintenance with no upside.
 */
import { PRINCIPLES } from "@/lib/principles";
import { LICENSE_URL, SOURCE_URL } from "@/lib/document";
import {
  absoluteUrl,
  AUTHOR_NAME,
  HOW_IT_WORKS,
  REPO_URL,
  SITE_NAME,
} from "@/lib/site";

const APP_ID = absoluteUrl("/#webapp");
const SITE_ID = absoluteUrl("/#website");
const AUTHOR_ID = absoluteUrl("/#author");

const author = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: AUTHOR_NAME,
  url: REPO_URL,
};

/**
 * The home page graph: who publishes this, what the software is, and the
 * three steps the page itself lays out.
 */
export function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      author,
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: absoluteUrl("/"),
        name: SITE_NAME,
        description:
          "A free, open-source builder that generates a customized Responsible AI Principles document for a church or ministry.",
        inLanguage: "en-US",
        publisher: { "@id": AUTHOR_ID },
      },
      {
        "@type": "WebApplication",
        "@id": APP_ID,
        name: "Responsible AI for Churches document builder",
        alternateName: "Church AI policy builder",
        url: absoluteUrl("/build"),
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Policy template generator",
        operatingSystem: "Any modern web browser",
        browserRequirements: "Requires JavaScript.",
        description:
          "Answer seven short questions about your church, your posture toward AI, and the lines you have already drawn, and download a finished AI policy as Markdown or PDF.",
        inLanguage: "en-US",
        isAccessibleForFree: true,
        license: LICENSE_URL,
        isBasedOn: SOURCE_URL,
        author: { "@id": AUTHOR_ID },
        publisher: { "@id": AUTHOR_ID },
        isPartOf: { "@id": SITE_ID },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        audience: {
          "@type": "Audience",
          audienceType:
            "Churches, ministries, and faith-based nonprofits setting AI policy",
        },
        featureList: [
          `${PRINCIPLES.length} responsible AI principles, each optional and editable`,
          "Three postures — cautious, balanced, or pioneering — that change what each principle commits you to do",
          "Markdown and PDF download",
          "Runs entirely in the browser; answers are never uploaded",
          "CC BY-SA 4.0, with attribution written into every document",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to build an AI policy for your church",
        description:
          "Three steps from a blank page to an AI policy your church can adopt.",
        totalTime: "PT10M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: "0",
        },
        tool: { "@id": APP_ID },
        // The same list the landing page renders, so the two cannot drift.
        step: HOW_IT_WORKS.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.body,
          url: absoluteUrl("/build"),
        })),
      },
    ],
  };
}

/** The builder route: the app itself, plus where it sits in the site. */
export function builderStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/build#webpage"),
        url: absoluteUrl("/build"),
        name: "Build your church's AI policy",
        description:
          "The seven-step builder that turns your answers into a Responsible AI Principles document for your church.",
        inLanguage: "en-US",
        isPartOf: { "@id": SITE_ID },
        mainEntity: { "@id": APP_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI policy for churches",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Build your document",
            item: absoluteUrl("/build"),
          },
        ],
      },
    ],
  };
}
