/**
 * Renders a Schema.org graph as JSON-LD.
 *
 * `application/ld+json` is not executed as script, so the only escaping that
 * matters is `<` — which would otherwise let a value close the tag early.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
