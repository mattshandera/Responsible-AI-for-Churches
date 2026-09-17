import type { Metadata } from "next";
import Builder from "@/components/Builder";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import { builderStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Build Your Church's AI Policy",
  description:
    "Seven short steps — your church, your posture toward AI, your use cases, and your limits — and you leave with a ready-to-adopt AI policy as Markdown or PDF.",
  alternates: { canonical: "/build" },
  openGraph: {
    url: "/build",
    title: "Build Your Church's AI Policy — Seven Questions",
    description:
      "Answer seven short questions and download a finished Responsible AI Principles document for your church, as Markdown or PDF.",
  },
  twitter: {
    title: "Build Your Church's AI Policy — Seven Questions",
    description:
      "Answer seven short questions and download a finished Responsible AI Principles document for your church, as Markdown or PDF.",
  },
};

export default function BuildPage() {
  return (
    <>
      <JsonLd data={builderStructuredData()} />
      {/* The mobile step bar carries navigation on small screens. */}
      <div className="hidden lg:block">
        <SiteHeader cta={false} />
      </div>
      <Builder />
    </>
  );
}
