/**
 * One sharing path for everything the builder hands off: the finished PDF,
 * and a link to the builder itself.
 *
 * It prefers the Web Share API, which opens the operating system's own share
 * sheet (Messages, Mail, AirDrop, WhatsApp, Teams — whatever the device has).
 * Where that is missing, each kind of payload degrades to the nearest thing
 * that still gets it out the door: a file is downloaded, a link is copied.
 *
 * `share()` must be called synchronously from a click handler. Browsers only
 * open the share sheet during the "user activation" a click grants, and
 * Safari is strict about it: an `await` before `navigator.share` (a dynamic
 * import, say) can spend the activation and turn the share into an error.
 * Anything slow has to be ready before the click.
 *
 * Nothing here sends data anywhere on its own. The share sheet goes where the
 * person picks, which is the same promise a download makes.
 */

export type SharePayload = {
  title: string;
  text: string;
  /** A link to share. Used when there is no file. */
  url?: string;
  /** A file to share. When present, this is what gets shared. */
  file?: File;
};

export type ShareOutcome =
  /** The OS share sheet completed. */
  | "shared"
  /** The person closed the share sheet without picking anything. */
  | "cancelled"
  /** No share sheet for files here, so the file was downloaded instead. */
  | "downloaded"
  /** No share sheet here, so the link was copied to the clipboard. */
  | "copied"
  | "failed";

export type ShareKind = "policy" | "builder";

/** Whether this browser can hand a PDF to the OS share sheet. */
export function canShareFiles(): boolean {
  if (typeof navigator === "undefined" || !navigator.canShare) return false;
  try {
    const probe = new File([""], "probe.pdf", { type: "application/pdf" });
    return navigator.canShare({ files: [probe] });
  } catch {
    return false;
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoking in the same tick can cancel the download in some browsers.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function share(payload: SharePayload): Promise<ShareOutcome> {
  const data: ShareData = payload.file
    ? { title: payload.title, text: payload.text, files: [payload.file] }
    : { title: payload.title, text: payload.text, url: payload.url };

  const native =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    (navigator.canShare ? navigator.canShare(data) : !payload.file);

  if (native) {
    try {
      await navigator.share(data);
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return "cancelled";
      }
      // NotAllowedError (the activation lapsed) and friends: fall through to
      // the same fallback a browser without the API gets.
    }
  }

  return fallback(payload);
}

async function fallback(payload: SharePayload): Promise<ShareOutcome> {
  if (payload.file) {
    downloadBlob(payload.file, payload.file.name);
    return "downloaded";
  }
  try {
    const link = payload.url ? `\n\n${payload.url}` : "";
    await navigator.clipboard.writeText(`${payload.text}${link}`);
    return "copied";
  } catch {
    return "failed";
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Count a completed share with GA4's recommended `share` event. It records
 * what kind of thing was shared, how, and from which button (`item_id`),
 * never the content.
 */
export function trackShare(kind: ShareKind, outcome: ShareOutcome, placement?: string) {
  if (outcome === "cancelled" || outcome === "failed") return;
  const method =
    outcome === "shared" ? "native" : outcome === "copied" ? "copy_link" : "download";
  window.gtag?.("event", "share", { method, content_type: kind, item_id: placement });
}

/**
 * Count each time the "pass it on" dialog is shown. Builder shares with
 * `item_id: "dialog"` divided by this is the dialog's conversion rate: the
 * number that says whether interrupting people is worth it.
 */
export function trackSharePrompt() {
  window.gtag?.("event", "share_prompt_shown");
}
