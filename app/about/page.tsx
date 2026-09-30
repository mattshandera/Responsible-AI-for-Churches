import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { SOURCE_URL } from "@/lib/document";

export const metadata: Metadata = {
  title: "About · Responsible AI for Churches",
  description:
    "Who built this tool and why — a note from Matt Shandera on ministry, enterprise AI, and Gamaliel.ai.",
};

const MATT_URL = "https://mattshandera.com";
const GAMALIEL_URL = "https://gamaliel.ai";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Who built this, and why
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              A tool that asks a church to write down its rules for AI ought
              to tell you who is asking. This one is built and maintained by{" "}
              <a
                className="text-brand underline underline-offset-2"
                href={MATT_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                Matt Shandera
              </a>
              .
            </p>
            <p>
              Matt has spent his career at the intersection of ministry and
              enterprise technology — as a Campus Pastor at LCBC Church,
              Director of Marketing at CURE International, and in senior
              leadership roles at New Relic and Confluent, where he led
              hands-on AI implementation for a billion-dollar global business.
              Today he leads growth and community at{" "}
              <a
                className="text-brand underline underline-offset-2"
                href={GAMALIEL_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                Gamaliel.ai
              </a>
              , an open-source, AI-powered Bible study platform anchored in
              the Nicene Creed.
            </p>
            <p>
              He writes and speaks about what faithful engagement with AI
              looks like for church and ministry leaders at{" "}
              <a
                className="text-brand underline underline-offset-2"
                href={MATT_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                mattshandera.com
              </a>
              . This builder grew out of that work — churches kept asking
              where to start, so here is a place to start.
            </p>
            <p className="text-sm text-muted">
              This project is independent of Gamaliel.ai and of any church or
              employer Matt has worked with. Like the rest of the site, it is
              released under CC BY-SA 4.0 — see the{" "}
              <a className="text-brand underline underline-offset-2" href={SOURCE_URL}>
                source on GitHub
              </a>
              .
            </p>
          </div>
          <p className="mt-10">
            <Link
              href="/"
              className="text-sm font-medium text-muted transition hover:text-brand"
            >
              ← Back home
            </Link>
          </p>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto max-w-7xl px-4 text-xs text-muted lg:px-8">
          Released under CC BY-SA 4.0 ·{" "}
          <a className="hover:text-brand" href={SOURCE_URL}>
            Source on GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
