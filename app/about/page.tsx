import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "About Matt Shandera · Responsible AI for Churches",
  description:
    "Matt Shandera has spent his career at the intersection of mission and technology — from Campus Pastor and nonprofit leader to senior roles at New Relic and Confluent. Now he writes and speaks about what the AI moment means for the Church.",
};

const ENGAGEMENTS = [
  {
    event: "GLN Basecamp",
    talk: "Ministry in the Age of AI",
    detail: "Featured speaker, alongside Craig Groeschel and Greg Sankey.",
  },
  {
    event: "Global Leadership Network Canada",
    talk: "AI and the Church: Faithful Leadership in a Rapidly Changing World",
    detail: "Full pastoral cohort, May 2026.",
  },
  {
    event: "Museum of the Bible",
    talk: "A presentation to roughly 200 pastors",
    detail: "",
  },
  {
    event: "HOPE International",
    talk: "Lunch and learn with Peter Greer",
    detail: "",
  },
  { event: "Love Fort Wayne", talk: "Pastors event", detail: "" },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-3xl px-4 pb-12 pt-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            About
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            At the intersection of faith, technology, and what comes next.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Ministry veteran. Enterprise tech executive. Now helping the Church
            navigate AI faithfully.
          </p>
        </section>

        <section className="border-y border-line bg-surface py-12">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <blockquote className="border-l-[3px] border-brand pl-5">
              <p className="font-serif text-2xl font-bold italic leading-snug text-ink">
                AI isn&rsquo;t coming to the mission field. It&rsquo;s already
                here.
              </p>
            </blockquote>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-soft">
              <p>
                That line opens most of what Matt Shandera writes and says, and
                it is neither panic nor sunshine. AI is already reshaping how
                organizations communicate, fundraise, make decisions, and deploy
                resources globally — and no border changes that reality.
              </p>
              <p>
                So the question in front of church and ministry leaders is no
                longer whether to engage it. It is whether they will do so with
                their eyes open — and whether the principles they say they hold
                ever make it onto paper, where staff and congregation can hold
                them to it.
              </p>
              <p>
                This builder is one small piece of that work: a way to move from
                agreeing with a set of principles to publishing your own.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Mission: In the Age of AI
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-soft">
            <p>
              Matt writes{" "}
              <a
                className="text-brand underline underline-offset-2"
                href="https://missionintheageofai.substack.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Mission: In the Age of AI
              </a>
              , a monthly reflection on AI, faith, and what it means for the
              Church. No hype. No fear. Just honest thinking.
            </p>
            <p>
              The writing is aimed at the people who have to make actual
              decisions — the executive pastor choosing a transcription tool,
              the communications director wondering what to disclose, the elder
              board that has never discussed any of this. It translates between
              two worlds that rarely talk to each other, without talking down to
              either one.
            </p>
          </div>
        </section>

        <section className="border-y border-line bg-surface py-14">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Gamaliel.ai
            </h2>
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-soft">
              <p>
                Matt is a founding team member at{" "}
                <a
                  className="text-brand underline underline-offset-2"
                  href="https://gamaliel.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Gamaliel.ai
                </a>
                , where he serves as Head of Growth &amp; Community. Gamaliel is
                an open-source, AI-powered Bible study platform anchored in the
                Nicene Creed, founded by Lew Cirne — the founder of New Relic.
              </p>
              <p>
                His work there spans product strategy, theological architecture,
                growth, and speaking. The through-line is a single stubborn
                commitment: building Biblical AI tools without compromising
                theological integrity. He also works with Life.Church&rsquo;s
                YouVersion team on guardrails that keep AI tools answering
                faithfully from Scripture.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Background
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-soft">
            <p>
              Matt has spent his career at the intersection of mission and
              technology — Campus Pastor at LCBC Church, Director of Marketing
              at CURE International, and senior leadership roles at New Relic
              and Confluent, where he led hands-on AI implementation supporting
              a billion-dollar global business.
            </p>
            <p>
              That is nearly a decade in nonprofit and ministry leadership
              alongside senior enterprise software roles. The combination is the
              point. Plenty of people can explain what a model does; fewer can
              explain it to a room of pastors and know what Tuesday morning
              actually looks like for them.
            </p>
            <p>
              He lives in Mechanicsburg, Pennsylvania with his wife and three
              boys.
            </p>
          </div>
        </section>

        <section className="border-y border-line bg-surface py-14">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Speaking
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Matt speaks to churches, conferences, and ministry organizations
              on what faithful engagement with AI looks like.
            </p>
            <ul className="mt-7 space-y-5">
              {ENGAGEMENTS.map((e) => (
                <li key={e.event} className="border-l-2 border-line pl-4">
                  <p className="text-sm font-bold text-ink">{e.event}</p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-ink-soft">
                    {e.talk}
                  </p>
                  {e.detail ? (
                    <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                      {e.detail}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Stay in the conversation
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            The newsletter, the writing, and speaking inquiries all live at{" "}
            <a
              className="text-brand underline underline-offset-2"
              href="https://mattshandera.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              mattshandera.com
            </a>
            .
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://mattshandera.com"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
            >
              mattshandera.com
            </a>
            <a
              href="https://missionintheageofai.substack.com"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-line bg-surface px-6 py-3 text-base font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              Read the newsletter
            </a>
          </div>

          <p className="mt-12 font-serif text-2xl font-bold italic text-ink">
            There is only now.
          </p>
        </section>

        <section className="border-t border-line bg-surface py-12">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <p className="text-sm leading-relaxed text-ink-soft">
              Not sure where to start? The builder walks you through it in about
              ten minutes.
            </p>
            <Link
              href="/build"
              className="mt-4 inline-block rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
            >
              Build your principles
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto max-w-3xl px-4 text-xs text-muted lg:px-8">
          Released under CC BY-SA 4.0 ·{" "}
          <a
            className="hover:text-brand"
            href="https://github.com/mattshandera/Responsible-AI-for-Churches"
          >
            Source on GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
