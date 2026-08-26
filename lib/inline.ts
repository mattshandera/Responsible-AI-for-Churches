/** Shared inline parser for the tiny markdown subset the renderers support. */
export type Run = { text: string; bold: boolean; href?: string };

const TOKEN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function parseInline(input: string): Run[] {
  const runs: Run[] = [];
  let last = 0;
  for (const m of input.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) runs.push({ text: input.slice(last, at), bold: false });
    if (m[1] !== undefined) {
      runs.push({ text: m[1], bold: true });
    } else {
      runs.push({ text: m[2], bold: false, href: m[3] });
    }
    last = at + m[0].length;
  }
  if (last < input.length) runs.push({ text: input.slice(last), bold: false });
  return runs.filter((r) => r.text.length > 0);
}

/** Flatten to plain text, e.g. for a document summary. */
export function stripInline(input: string): string {
  return parseInline(input)
    .map((r) => r.text)
    .join("");
}
