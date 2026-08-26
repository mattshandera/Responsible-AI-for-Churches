import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { PRINCIPLES } from "@/lib/principles";
import { LICENSE_URL, SOURCE_URL, UPSTREAM_URL } from "@/lib/document";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Free · Open source · CC BY-SA 4.0
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Your church needs an AI policy.
            <br />
            Build one in ten minutes.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Answer a short set of questions about your church, your posture, and
            where you have already drawn lines. You will leave with a finished
            Responsible AI Principles document — as Markdown or PDF — that reads
            like your church wrote it, because you did.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/build"
              className="rounded-xl bg-brand px-7 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Start the questions
            </Link>
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-line bg-surface px-7 py-3 text-base font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              Read the original
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">
            Nothing is uploaded. Everything runs in your browser.
          </p>
        </section>

        <section className="border-y border-line bg-surface py-14">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Answer the questions",
                  body: "Seven short steps: your church, your posture toward AI, what you actually use it for, and where it will never go.",
                },
                {
                  step: "02",
                  title: "Watch it write itself",
                  body: "The document updates as you answer. Keep all eighteen principles, cut the ones that do not fit, reword any of them, or add your own.",
                },
                {
                  step: "03",
                  title: "Download and adopt",
                  body: "Take the Markdown into your docs or repo, or the PDF into your next elders' meeting. Attribution and license are handled for you.",
                },
              ].map((c) => (
                <div key={c.step}>
                  <p className="text-sm font-bold text-brand">{c.step}</p>
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
          <Link className="hover:text-brand" href="/about">
            About
          </Link>{" "}
          ·{" "}
          <a className="hover:text-brand" href={SOURCE_URL}>
            Source on GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
