# Responsible AI Principles — Document Builder

A Q&A tool that walks a church through seven short steps and produces a
customized version of [`README.md`](./README.md) as a **Markdown** or **PDF**
download.

Live document generation happens entirely in the browser. No answers are sent
to a server, and there is no database, no API, and no analytics.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Deploying to Vercel

The app lives at the repository root, so Vercel needs no configuration.

1. Go to [vercel.com/new](https://vercel.com/new) and import
   `mattshandera/Responsible-AI-for-Churches`.
2. Vercel detects Next.js and fills in the build settings itself. Leave the
   root directory as `./`.
3. Deploy.

There are no environment variables to set. Both routes are statically
prerendered, so the whole thing runs on Vercel's free tier.

To deploy from the CLI instead:

```bash
npx vercel        # preview deployment
npx vercel --prod # production
```

## How it is put together

```
app/
  page.tsx           Landing page
  build/page.tsx     The wizard route
components/
  Builder.tsx        Wizard state, the seven steps, download handlers
  Preview.tsx        Live HTML preview of the generated document
  fields.tsx         Form inputs
lib/
  principles.ts      The 18 principles + a practice clause per posture
  options.ts         Use cases, automations, limits, tones, cadences
  types.ts           The answer shape
  document.ts        Answers -> a block model (the single source of truth)
  markdown.ts        Block model -> Markdown
  pdf.ts             Block model -> PDF (jsPDF, loaded on demand)
  inline.ts          The small `**bold**` / `[link](url)` parser both share
```

Both output formats render from the same block model in `lib/document.ts`, so
the Markdown, the PDF, and the on-screen preview cannot drift apart. Adding a
new section means adding blocks in one place.

### Changing the content

- **Editing a principle, or adding a nineteenth:** `lib/principles.ts`. Each
  entry needs a `statement`, a `why` (helper text shown in the builder), and a
  `practice` for each of the three postures.
- **Adding a use case, automation, or limit:** `lib/options.ts`.
- **Changing how a section is worded:** the `*Blocks` functions in
  `lib/document.ts`.

### Two things that are deliberately not configurable

- **Attribution.** The source is CC BY-SA 4.0, so every generated document
  carries the attribution and ShareAlike notice. This is a license obligation,
  not a preference.
- **Where the data goes.** Answers are kept in `localStorage` under
  `raifc-builder-v1` and nowhere else. A church's draft AI policy — including
  the parts about its own congregant data — should not be sitting on someone
  else's server.

## License

CC BY-SA 4.0, matching the document it generates.
