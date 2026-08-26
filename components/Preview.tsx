"use client";

import { Fragment } from "react";
import type { Block } from "@/lib/document";
import { parseInline } from "@/lib/inline";

function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((run, i) => {
        if (run.href) {
          return (
            <a key={i} href={run.href} target="_blank" rel="noreferrer noopener">
              {run.text}
            </a>
          );
        }
        return run.bold ? (
          <strong key={i}>{run.text}</strong>
        ) : (
          <Fragment key={i}>{run.text}</Fragment>
        );
      })}
    </>
  );
}

export default function Preview({ blocks }: { blocks: Block[] }) {
  return (
    <article className="doc-preview">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h1":
            return <h1 key={i}>{block.text}</h1>;
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "p":
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item.text} />
                    {item.sub ? <span className="practice">{item.sub}</span> : null}
                  </li>
                ))}
              </ol>
            );
          case "kv":
            return (
              <div key={i} className="mb-3">
                {block.rows.map((row, j) => (
                  <div key={j} className="kv">
                    <strong>{row.label}</strong>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <Inline text={block.text} />
                {block.cite ? <cite>— {block.cite}</cite> : null}
              </blockquote>
            );
          case "hr":
            return <hr key={i} />;
        }
      })}
    </article>
  );
}
