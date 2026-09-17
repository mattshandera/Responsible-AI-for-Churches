/**
 * The shared Open Graph / Twitter card image.
 *
 * Rendered by `next/og` (satori) at build time, so there is no binary asset to
 * keep in sync with the site's wording and no extra dependency to install.
 * Note that satori supports only a subset of CSS — flexbox, no `gap` on some
 * versions, and every element with more than one child needs an explicit
 * `display: "flex"`.
 */
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const ogAlt =
  "Responsible AI for Churches — build an AI policy for your church in ten minutes";
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BRAND = "#1e4084";
const INK = "#18181b";
const INK_SOFT = "#3f3f46";
const CANVAS = "#faf9f7";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CANVAS,
          padding: "72px 80px",
          borderTop: `18px solid ${BRAND}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: BRAND,
            }}
          >
            Free · Open source · CC BY-SA 4.0
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: INK,
            }}
          >
            Build an AI policy for your church.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 34,
              lineHeight: 1.35,
              color: INK_SOFT,
            }}
          >
            Seven questions in. A finished Responsible AI Principles document
            out — Markdown or PDF.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 600,
            color: BRAND,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              marginRight: 18,
              borderRadius: 10,
              background: BRAND,
              color: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            +
          </div>
          {SITE_NAME}
        </div>
      </div>
    ),
    ogSize,
  );
}
