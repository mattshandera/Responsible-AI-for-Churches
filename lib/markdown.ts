import type { Block } from "./document";

export function renderMarkdown(blocks: Block[]): string {
  const out: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "h1":
        out.push(`# ${block.text}`);
        break;
      case "h2":
        out.push(`## ${block.text}`);
        break;
      case "h3":
        out.push(`### ${block.text}`);
        break;
      case "p":
        out.push(block.text);
        break;
      case "ul":
        out.push(block.items.map((i) => `* ${i}`).join("\n"));
        break;
      case "ol":
        out.push(
          block.items
            .map((item, idx) => {
              const marker = `${idx + 1}. `;
              const head = `${marker}${item.text}`;
              // Two trailing spaces force a hard break; the continuation is
              // indented to the marker width so it stays inside the item.
              return item.sub
                ? `${head}  \n${" ".repeat(marker.length)}*${item.sub}*`
                : head;
            })
            .join("\n"),
        );
        break;
      case "kv":
        out.push(
          block.rows.map((r) => `**${r.label}:** ${r.value}`).join("  \n"),
        );
        break;
      case "quote":
        out.push(
          block.cite
            ? `> ${block.text}\n>\n> — ${block.cite}`
            : `> ${block.text}`,
        );
        break;
      case "hr":
        out.push("---");
        break;
    }
  }

  return out.join("\n\n") + "\n";
}
