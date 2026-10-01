"use client";

import { useEffect, useRef, useState } from "react";
import { share, trackShare, type ShareOutcome } from "@/lib/share";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const MESSAGE =
  "I used this free tool to build an AI policy for our organization. It takes about ten minutes, and nothing you type leaves your browser. Thought it might help your team too.";

// Says "organization" rather than "church" throughout: the builder suits
// any faith-driven organization (a church, a ministry, a nonprofit, a
// business with a strong culture of faith), and the person passing it on
// may be any of them, or thinking of any of them.
const HEADING = "Know an organization that needs one of these?";
const PITCH =
  "Most organizations have staff using AI and no policy for it yet. If this helped, pass the builder to a pastor, ministry leader, or nonprofit director who could use it.";

type Placement = "card" | "dialog";

function useShareBuilder(placement: Placement) {
  const [outcome, setOutcome] = useState<ShareOutcome | null>(null);

  async function onShare() {
    const result = await share({ title: SITE_NAME, text: MESSAGE, url: SITE_URL });
    trackShare("builder", result, placement);
    setOutcome(result);
    if (result === "copied") window.setTimeout(() => setOutcome(null), 2500);
    return result;
  }

  return { outcome, onShare };
}

function ShareButton({
  outcome,
  onClick,
}: {
  outcome: ShareOutcome | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand px-4 text-[15px] font-semibold text-white transition hover:opacity-90 sm:h-10 sm:w-auto sm:text-sm"
    >
      <ShareIcon />
      {outcome === "copied" ? "Link copied" : "Share the builder"}
    </button>
  );
}

function statusLine(outcome: ShareOutcome | null): string {
  if (outcome === "shared") return "Thank you for passing it on.";
  if (outcome === "failed") return `Sharing is blocked here. The link is ${SITE_URL}`;
  return "Shares a link to the builder, not your document or your answers.";
}

/**
 * Shown on the Review step once a policy has been downloaded or shared: the
 * moment someone has just got value from the builder is the moment they are
 * most likely to pass it on. It shares a link to the builder, never the
 * person's document.
 */
export default function ShareBuilderCard() {
  const { outcome, onShare } = useShareBuilder("card");

  return (
    <section
      aria-labelledby="pass-it-on"
      className="rounded-xl border border-brand/30 bg-brand-soft p-4"
    >
      <h3 id="pass-it-on" className="text-sm font-semibold text-ink">
        {HEADING}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
        {PITCH}
      </p>
      <div className="mt-3">
        <ShareButton outcome={outcome} onClick={onShare} />
      </div>
      <p className="mt-2 text-xs text-muted" aria-live="polite">
        {statusLine(outcome)}
      </p>
    </section>
  );
}

/**
 * The same ask as the card, raised once per browser the first time a policy
 * goes out. `Builder.tsx` decides when; this only draws it. A native
 * `<dialog>` gives focus trapping and Escape-to-close for free.
 */
export function ShareBuilderDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { outcome, onShare } = useShareBuilder("dialog");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  async function shareAndClose() {
    if ((await onShare()) === "shared") onClose();
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // A click on the backdrop lands on the <dialog> itself; the content
      // sits in the inner div, so this only fires outside it.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="share-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-black/40"
    >
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          Your policy is ready
        </p>
        <h2 id="share-dialog-title" className="mt-1 text-lg font-bold tracking-tight">
          {HEADING}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {PITCH}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse sm:justify-start">
          <ShareButton outcome={outcome} onClick={shareAndClose} />
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 items-center justify-center rounded-[10px] px-4 text-[15px] font-medium text-muted transition hover:text-ink sm:h-10 sm:text-sm"
          >
            Not now
          </button>
        </div>
        <p className="mt-3 text-xs text-muted" aria-live="polite">
          {statusLine(outcome)}
        </p>
      </div>
    </dialog>
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
