/**
 * Canonical site URL plus the SEO copy that hangs off it.
 *
 * Every absolute URL the site emits — canonicals, Open Graph, the sitemap,
 * robots.txt, JSON-LD — resolves from `SITE_URL`, so there is exactly one
 * place to change when the domain changes. It is resolved at build time in
 * this order:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — set this in Vercel once a custom domain exists.
 *   2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel sets this itself, so even an
 *      unconfigured deploy gets correct canonicals rather than localhost ones.
 *   3. localhost, for `npm run dev`.
 *
 * Note that (2) is the *production* domain on every deploy, including previews.
 * That is what we want: a preview deploy should point search engines at the
 * real page, not at itself.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Responsible AI for Churches";

export const AUTHOR_NAME = "Matt Shandera";

export const REPO_URL = "https://github.com/mattshandera/Responsible-AI-for-Churches";

/**
 * The phrases people actually type when they go looking for this. Meta
 * keywords carry no ranking weight with Google, but they cost nothing and a
 * few other engines and internal site searches still read them.
 */
export const SITE_KEYWORDS = [
  "AI policy for churches",
  "church AI policy",
  "church AI policy template",
  "build an AI policy for churches",
  "AI policy generator",
  "responsible AI principles",
  "AI guidelines for ministry",
  "church technology policy",
  "AI use policy for nonprofits",
  "ministry AI ethics",
  "AI policy template",
  "church staff AI guidelines",
];

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
