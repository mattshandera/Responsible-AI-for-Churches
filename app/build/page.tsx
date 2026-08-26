import type { Metadata } from "next";
import Builder from "@/components/Builder";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Build your document · Responsible AI for Churches",
};

export default function BuildPage() {
  return (
    <>
      {/* The mobile step bar carries navigation on small screens. */}
      <div className="hidden lg:block">
        <SiteHeader cta={false} />
      </div>
      <Builder />
    </>
  );
}
