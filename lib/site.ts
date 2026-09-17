/**
 * Canonical site URL plus the SEO copy that hangs off it.
 *
 * Every absolute URL the site emits — canonicals, Open Graph, the sitemap,
 * robots.txt, JSON-LD — resolves from `SITE_URL`.
 *
 * The domain is a constant here rather than an environment variable because
 * it is a fact about this project, not about where the project happens to be
 * running: it is not a secret, it changes roughly never, and it is the single
 * most consequential string in the site's SEO. In version control it is
 * visible and reviewable. Read from a deploy platform's settings it is
 * neither, and a later change to the project's domain list could silently
 * rewrite every canonical tag on the site.
 *
 * Both routes are statically prerendered, so these URLs are written into the
 * HTML at build time, with no request to infer a host from. Something has to
 * say what the site is called; this is that something.
 */
/**
 * The apex, not `www` — Vercel redirects `www` here, so this is the form
 * visitors land on and the one the canonical tag has to name. The two
 * disagreeing is a contradiction: a canonical pointing at a host that
 * redirects back to the page doing the pointing.
 */
const PRODUCTION_URL = "https://responsibleai.church";

function resolveSiteUrl(): string {
  // Escape hatch for a staging domain, or a fork deployed somewhere else.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // `next dev`, where localhost URLs make the share card and the sitemap
  // inspectable against the copy being edited.
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  // Everything else — production and preview deploys alike. A preview should
  // point search engines at the real page rather than compete with it.
  return PRODUCTION_URL;
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
