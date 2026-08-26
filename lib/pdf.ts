import { jsPDF } from "jspdf";
import type { Block } from "./document";
import { parseInline, type Run } from "./inline";

const PAGE = { width: 612, height: 792 }; // US Letter, points
const M = { left: 72, right: 72, top: 76, bottom: 68 };
const CONTENT_WIDTH = PAGE.width - M.left - M.right;

const INK = { r: 24, g: 24, b: 27 };
const MUTED = { r: 113, g: 113, b: 122 };
const ACCENT = { r: 30, g: 64, b: 132 };
const RULE = { r: 212, g: 212, b: 216 };

type Piece = Run & { width: number; italic?: boolean };
type Line = Piece[];

type Style = {
  family: "times" | "helvetica";
  size: number;
  leading: number;
  italic?: boolean;
};

function setStyle(doc: jsPDF, style: Style, bold: boolean, italic?: boolean) {
  const wantItalic = italic ?? style.italic ?? false;
  const variant =
    bold && wantItalic
      ? "bolditalic"
      : bold
        ? "bold"
        : wantItalic
          ? "italic"
          : "normal";
  doc.setFont(style.family, variant);
  doc.setFontSize(style.size);
}

function wrap(doc: jsPDF, runs: Run[], style: Style, maxWidth: number): Line[] {
  const lines: Line[] = [];
  let line: Line = [];
  let used = 0;

  for (const run of runs) {
    const tokens = run.text.split(/(\s+)/).filter((t) => t.length > 0);
    for (const token of tokens) {
      const isSpace = /^\s+$/.test(token);
      if (isSpace && line.length === 0) continue;
      setStyle(doc, style, run.bold);
      const width = doc.getTextWidth(token);
      if (!isSpace && used + width > maxWidth && line.length > 0) {
        // Drop a trailing space before breaking.
        while (line.length && /^\s+$/.test(line[line.length - 1].text)) line.pop();
        lines.push(line);
        line = [];
        used = 0;
      }
      line.push({ text: token, bold: run.bold, href: run.href, width });
      used += width;
    }
  }
  while (line.length && /^\s+$/.test(line[line.length - 1].text)) line.pop();
  if (line.length) lines.push(line);
  return lines.length ? lines : [[]];
}

class Cursor {
  y = M.top;
  constructor(readonly doc: jsPDF) {}

  space(amount: number) {
    this.y += amount;
  }

  /** Ensure `need` points of vertical room, adding a page if not. */
  ensure(need: number) {
    if (this.y + need > PAGE.height - M.bottom) {
      this.doc.addPage();
      this.y = M.top;
    }
  }

  drawLines(lines: Line[], style: Style, x: number, color = INK) {
    for (const line of lines) {
      this.ensure(style.leading);
      let cx = x;
      for (const piece of line) {
        setStyle(this.doc, style, piece.bold, style.italic);
        if (piece.href) {
          this.doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
        } else {
          this.doc.setTextColor(color.r, color.g, color.b);
        }
        this.doc.text(piece.text, cx, this.y);
        if (piece.href) {
          this.doc.link(cx, this.y - style.size * 0.85, piece.width, style.size, {
            url: piece.href,
          });
          this.doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
          this.doc.setLineWidth(0.4);
          this.doc.line(cx, this.y + 1.6, cx + piece.width, this.y + 1.6);
        }
        cx += piece.width;
      }
      this.y += style.leading;
    }
  }
}

const BODY: Style = { family: "times", size: 11, leading: 15.5 };
const BODY_ITALIC: Style = { ...BODY, size: 10, leading: 13.5, italic: true };
const H1: Style = { family: "helvetica", size: 21, leading: 26 };
const H2: Style = { family: "helvetica", size: 13.5, leading: 18 };
const H3: Style = { family: "helvetica", size: 11, leading: 15 };
const META: Style = { family: "helvetica", size: 9, leading: 13 };
const QUOTE: Style = { family: "times", size: 11, leading: 15, italic: true };

function paragraph(c: Cursor, text: string, style: Style, x: number, width: number, color = INK) {
  c.drawLines(wrap(c.doc, parseInline(text), style, width), style, x, color);
}

/** Render the document blocks into a jsPDF instance. */
export function renderPdf(blocks: Block[], footerLabel: string): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
  doc.setLineHeightFactor(1.15);
  const c = new Cursor(doc);

  for (const block of blocks) {
    switch (block.type) {
      case "h1": {
        c.space(2);
        c.ensure(H1.leading);
        c.drawLines(
          wrap(doc, [{ text: block.text, bold: true }], H1, CONTENT_WIDTH),
          H1,
          M.left,
        );
        c.space(4);
        break;
      }
      case "h2": {
        c.space(14);
        c.ensure(H2.leading + BODY.leading * 2);
        const runs: Run[] = [{ text: block.text, bold: true }];
        c.drawLines(wrap(doc, runs, H2, CONTENT_WIDTH), H2, M.left);
        c.space(4);
        break;
      }
      case "h3": {
        c.space(10);
        c.ensure(H3.leading + BODY.leading * 2);
        c.drawLines(
          wrap(doc, [{ text: block.text, bold: true }], H3, CONTENT_WIDTH),
          H3,
          M.left,
        );
        c.space(2);
        break;
      }
      case "p": {
        paragraph(c, block.text, BODY, M.left, CONTENT_WIDTH);
        c.space(8);
        break;
      }
      case "kv": {
        c.space(2);
        for (const row of block.rows) {
          c.ensure(META.leading);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(META.size);
          doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
          const label = `${row.label.toUpperCase()}  `;
          doc.text(label, M.left, c.y);
          const lw = doc.getTextWidth(label);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(INK.r, INK.g, INK.b);
          doc.text(row.value, M.left + lw, c.y);
          c.y += META.leading;
        }
        c.space(6);
        break;
      }
      case "ul": {
        for (const item of block.items) {
          const indent = 16;
          c.ensure(BODY.leading);
          doc.setFont("times", "normal");
          doc.setFontSize(BODY.size);
          doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
          doc.text("•", M.left + 2, c.y);
          paragraph(c, item, BODY, M.left + indent, CONTENT_WIDTH - indent);
          c.space(3);
        }
        c.space(6);
        break;
      }
      case "ol": {
        block.items.forEach((item, idx) => {
          const indent = 24;
          c.ensure(BODY.leading * 2);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(ACCENT.r, ACCENT.g, ACCENT.b);
          doc.text(String(idx + 1).padStart(2, "0"), M.left, c.y);
          paragraph(c, item.text, BODY, M.left + indent, CONTENT_WIDTH - indent);
          if (item.sub) {
            paragraph(
              c,
              item.sub,
              BODY_ITALIC,
              M.left + indent,
              CONTENT_WIDTH - indent,
              MUTED,
            );
          }
          c.space(8);
        });
        c.space(2);
        break;
      }
      case "quote": {
        c.space(4);
        const indent = 18;
        const lines = wrap(doc, parseInline(block.text), QUOTE, CONTENT_WIDTH - indent);
        c.ensure(lines.length * QUOTE.leading);
        const top = c.y - QUOTE.size;
        c.drawLines(lines, QUOTE, M.left + indent, MUTED);
        if (block.cite) {
          c.drawLines(
            wrap(doc, [{ text: `— ${block.cite}`, bold: false }], META, CONTENT_WIDTH - indent),
            META,
            M.left + indent,
            MUTED,
          );
        }
        doc.setDrawColor(RULE.r, RULE.g, RULE.b);
        doc.setLineWidth(1.5);
        doc.line(M.left + 2, top, M.left + 2, c.y - 6);
        c.space(8);
        break;
      }
      case "hr": {
        c.space(6);
        c.ensure(12);
        doc.setDrawColor(RULE.r, RULE.g, RULE.b);
        doc.setLineWidth(0.7);
        doc.line(M.left, c.y, PAGE.width - M.right, c.y);
        c.space(12);
        break;
      }
    }
  }

  const total = doc.getNumberOfPages();
  for (let page = 1; page <= total; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    const y = PAGE.height - 40;
    doc.text(footerLabel, M.left, y);
    doc.text(`${page} / ${total}`, PAGE.width - M.right, y, { align: "right" });
  }

  return doc;
}
