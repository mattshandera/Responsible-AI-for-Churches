# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js (App Router) single-page tool: a seven-step wizard that walks a
church through questions and generates a customized "Responsible AI
Principles" document, downloadable as Markdown or PDF. Everything runs
client-side — no server, no database, no API, no analytics beyond a GA4
tag. Answers persist only in the browser's `localStorage`
(`raifc-builder-v1`).

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # production build
npm run start       # serve the production build
npm run lint         # next lint
npm run typecheck    # tsc --noEmit
```

There is no test suite. Always run `npm run build` (or at least
`typecheck` + `lint`) before considering a change done — the build also
statically prerenders both routes, so it's the closest thing to an
end-to-end check this repo has.

## Architecture

```
app/
  page.tsx           Landing page
  build/page.tsx      The wizard route
  layout.tsx           Root layout; site-wide metadata + the GA4 tag
  sitemap.ts / robots.ts        Generated /sitemap.xml and /robots.txt
  opengraph-image.tsx / twitter-image.tsx   The share card, drawn by next/og
components/
  Builder.tsx           Wizard state, the seven steps, download handlers
  Preview.tsx            Live HTML preview of the generated document
  PreviewSheet.tsx        Mobile bottom-sheet version of the preview
  MobileActionBar.tsx / MobileStepBar.tsx   Mobile-only navigation chrome
  fields.tsx              Shared form inputs (TextField, RadioCards, etc.)
lib/
  principles.ts          The 18 principles + a practice clause per posture
  options.ts              Use cases, automations, prohibited uses, tones, cadences
  types.ts                 The `Answers` shape (the wizard's single state object)
  document.ts               Answers -> a `Block[]` model (the single source of truth)
  markdown.ts                Block model -> Markdown
  pdf.ts                      Block model -> PDF (jsPDF, imported on demand)
  inline.ts                    The shared `**bold**` / `[link](url)` parser
  site.ts                       Canonical URL + the SEO copy that hangs off it
  structured-data.ts             Schema.org JSON-LD for the two routes
  og.tsx                          The share card's layout (next/og)
components/JsonLd.tsx        Renders a Schema.org graph into the page
```

**Both output formats render from the same block model in `lib/document.ts`**,
so the Markdown, the PDF, and the on-screen preview cannot drift apart.
Adding a new section to the generated document means adding blocks in one
place (`document.ts`), not touching the renderers.

`Builder.tsx` owns all wizard state as a single `Answers` object (defined
in `lib/types.ts`), restores/persists it to `localStorage`, and derives
`blocks`/`markdown` from it via `useMemo`. The PDF renderer (`lib/pdf.ts`)
is dynamically imported inside `downloadPdf()` so `jspdf` isn't in the
initial bundle.

### Changing the generated document's content

- **Editing a principle, or adding a nineteenth:** `lib/principles.ts`.
  Each entry needs a `statement`, a `why` (helper text shown in the
  builder), and a `practice` per posture (`cautious` / `balanced` /
  `pioneering`).
- **Adding a use case, automation, or prohibited use:** `lib/options.ts`.
- **Changing how a section is worded:** the `*Blocks` functions in
  `lib/document.ts`.

### Two things that are deliberately not configurable

- **Attribution.** The source is CC BY-SA 4.0, so every generated
  document carries the attribution and ShareAlike notice — a license
  obligation, not a preference (`attributionBlocks` in `document.ts`).
- **Where the data goes.** Answers never leave the browser. A church's
  draft AI policy — including the parts about its own congregant data —
  should not be sitting on someone else's server.

## Metadata and discoverability

The site is meant to be found by people searching things like "build an AI
policy for churches", so the metadata is load-bearing rather than
decorative.

- **One source for the domain.** `lib/site.ts` resolves `SITE_URL` from
  `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's own
  `VERCEL_PROJECT_PRODUCTION_URL`, then to localhost. Canonicals, Open
  Graph URLs, the sitemap, robots.txt, and the JSON-LD `@id`s all derive
  from it, so a custom domain is a one-variable change. Set
  `NEXT_PUBLIC_SITE_URL` in Vercel as soon as a real domain exists —
  everything else follows.
- **Titles and descriptions** live in each route's `metadata` export, with
  the site-wide defaults and the `%s · Responsible AI for Churches`
  template in `app/layout.tsx`. The home page uses `title.absolute` so the
  search phrase sits at the front of the tab title rather than after the
  site name.
- **Structured data** is in `lib/structured-data.ts`. Every claim in it has
  to stay visible on the page that ships it — that is Google's rule, and
  the reason the `HowTo` steps quote the landing page's own three-step
  section verbatim. `FAQPage` is deliberately absent: Google stopped
  showing FAQ rich results outside government and health sites in 2023.
- **The share card** (`lib/og.tsx`) is drawn at build time by `next/og`, so
  there is no image asset to keep in sync with the copy. Satori supports
  only a subset of CSS — flexbox only, and any element with more than one
  child needs an explicit `display: "flex"`.
- **Search Console** can be verified without touching DNS by setting
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel.

`npm run build` prerenders `/sitemap.xml`, `/robots.txt`, and both image
routes, so a successful build is also a check that this all still emits.

## Deploying

Deploys to Vercel from the repo root; `vercel.json` pins
`"framework": "nextjs"` because the project was once imported before
`package.json` existed, which can cause Vercel to mis-detect the preset
and expect a `public/` directory. If a deploy ever fails with
"No Output Directory named public", see the fuller explanation in
`BUILDER.md` before changing build settings.
