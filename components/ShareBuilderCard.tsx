"use client";

import { useState } from "react";
import { share, trackShare, type ShareOutcome } from "@/lib/share";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const MESSAGE =
  "I used this free tool to build an AI policy for our church. It takes about ten minutes, and nothing you type leaves your browser. Thought it might help your team too.";

/**
 * Shown once a policy has been downloaded or shared: the moment someone has
 * just got value from the builder is the moment they are most likely to pass
 * it on. It shares a link to the builder, never the person's document.
 */
export default function ShareBuilderCard() {
  const [outcome, setOutcome] = useState<ShareOutcome | null>(null);

  async function onShare() {
    const result = await share({ title: SITE_NAME, text: MESSAGE, url: SITE_URL });
    trackShare("builder", result);
    setOutcome(result);
    if (result === "copied") window.setTimeout(() => setOutcome(null), 2500);
  }

  return (
    <section
      aria-labelledby="pass-it-on"
      className="rounded-xl border border-brand/30 bg-brand-soft p-4"
    >
      <h3 id="pass-it-on" className="text-sm font-semibold text-ink">
        Know a church that needs one of these?
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
        Most churches have staff using AI and no policy for it yet. If this
        helped, pass the builder to a pastor, elder, or ministry leader who
        could use it.
      </p>
      <button
        type="button"
        onClick={onShare}
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand px-4 text-[15px] font-semibold text-white transition hover:opacity-90 sm:h-10 sm:w-auto sm:text-sm"
      >
        <ShareIcon />
        {outcome === "copied" ? "Link copied" : "Share the builder"}
      </button>
      <p className="mt-2 text-xs text-muted" aria-live="polite">
        {outcome === "shared"
          ? "Thank you for passing it on."
          : outcome === "failed"
            ? `Sharing is blocked here. The link is ${SITE_URL}`
            : "Shares a link to the builder, not your document or your answers."}
      </p>
    </section>
  );
}

export function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <path d="m16 6-4-4-4 4" />
      <path d="M12 2v13" />
    </svg>
  );
}
