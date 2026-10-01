import type { Metadata } from "next";
import Link from "next/link";
import HeroWord from "@/components/HeroWord";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import { PRINCIPLES } from "@/lib/principles";
import { LICENSE_URL, SOURCE_URL, UPSTREAM_URL } from "@/lib/document";
import { HOW_IT_WORKS } from "@/lib/site";
import { homeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  // `absolute` because the head term belongs at the front of the tab title,
  // not after the site name the layout template would prepend.
  title: {
    absolute: "Build an AI Policy for Your Church | Free Template",
  },
  description:
    "Answer seven questions and download a customized AI policy for your church or ministry — eighteen responsible AI principles, as Markdown or PDF. Free, open source, and private to your browser.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Build an AI Policy for Your Church — Free Template",
    description:
      "A seven-step builder that turns your answers into a finished Responsible AI Principles document for your church. Markdown or PDF, free, and nothing leaves your browser.",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Free · Open source · Private
            <span className="hidden sm:inline"> to your browser</span>
          </p>
          {/* The word after "Your" cycles from church out to organization
              (HeroWord). The aria-label is what screen readers announce
              instead, and it keeps "church" in the heading. */}
          <h1
            aria-label="Your church, ministry, nonprofit, or business needs an AI policy. Build one in ten minutes."
            className="mt-4 text-[clamp(1.6rem,8.4vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[4rem] lg:leading-[1.06]"
          >
            <span aria-hidden="true" className="block">
              Your <HeroWord />
            </span>
            <span aria-hidden="true" className="block">
              needs an AI policy.
            </span>
            <span
              aria-hidden="true"
              className="mt-[0.2em] block text-[0.66em] leading-tight tracking-[-0.02em] text-ink-soft"
            >
              Build one in ten minutes.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Answer a short set of questions about your team, your posture, and
            the lines you have already drawn. You will leave with a finished
            Responsible AI Principles document — as Markdown or PDF — that reads
            like you wrote it, because you did.
          </p>
          {/* One obvious next step. The original lives on GitHub, which is
              a detour most visitors don't need, so it is a text link. */}
          <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-7">
            <Link
              href="/build"
              className="flex h-[52px] w-full items-center justify-center rounded-xl bg-brand px-7 text-base font-semibold text-white shadow-sm transition hover:opacity-90 sm:w-auto"
            >
              Start the questions
            </Link>
            <a
              href={`${SOURCE_URL}#responsible-ai-principles-for-churches`}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-12 items-center text-[15px] font-semibold text-brand underline underline-offset-4 transition hover:opacity-80"
            >
              Read the original principles
            </a>
          </div>
          <p className="mt-3 text-xs text-muted">
            Nothing is uploaded. Everything runs in your browser.
          </p>
          <p className="mx-auto mt-9 max-w-2xl border-t border-line pt-5 text-sm leading-relaxed text-ink-soft text-balance sm:border-0 sm:pt-0">
            <span className="font-semibold text-ink">Made for</span> churches ·
            ministries · nonprofits · schools &amp; seminaries · faith-driven
            businesses
          </p>
        </section>

        <section className="border-y border-line bg-surface py-14">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {HOW_IT_WORKS.map((c, i) => (
                <div key={c.title}>
                  <p className="text-sm font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-lg font-bold tracking-tight text-ink">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            The eighteen principles you start from
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Every one is optional and every one is editable. Each also carries a
            concrete practice that changes with the posture you choose, so the
            document says what your staff will actually do.
          </p>
          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.id} className="flex gap-2.5 text-sm">
                <span className="w-5 shrink-0 pt-px text-right text-xs font-bold text-brand">
                  {p.number}
                </span>
                <span>
                  <span className="font-semibold text-ink">{p.title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    {p.why}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line bg-surface py-12">
          <div className="mx-auto max-w-3xl px-4 text-sm leading-relaxed text-ink-soft lg:px-8">
            <h2 className="text-lg font-bold tracking-tight text-ink">
              About the source
            </h2>
            <p className="mt-3">
              This builder generates adaptations of{" "}
              <a className="text-brand underline underline-offset-2" href={SOURCE_URL}>
                Responsible AI Principles for Churches
              </a>
              , which was itself inspired by the{" "}
              <a className="text-brand underline underline-offset-2" href={UPSTREAM_URL}>
                Responsible AI Manifesto for Marketing and Business
              </a>{" "}
              by Paul Roetzer of the Marketing AI Institute.
            </p>
            <p className="mt-3">
              Both are released under{" "}
              <a className="text-brand underline underline-offset-2" href={LICENSE_URL}>
                CC BY-SA 4.0
              </a>
              . You may share and adapt the result, including commercially, as
              long as you credit the original and license your version under the
              same terms. Every document this builder produces includes that
              attribution.
            </p>
            <p className="mt-3 text-xs text-muted">
              This tool produces a starting point for discussion, not legal
              advice. Have your own counsel review anything touching employment,
              minors, or donor data.
            </p>
          </div>
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
