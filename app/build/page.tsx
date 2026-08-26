import type { Metadata } from "next";
import Builder from "@/components/Builder";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Build your document · Responsible AI for Churches",
};

export default function BuildPage() {
  return (
    <>
      <SiteHeader cta={false} />
      <Builder />
    </>
  );
}
