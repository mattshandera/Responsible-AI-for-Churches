import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Both routes are statically prerendered, so a build is the only thing that
  // can change them — the build date is an honest `lastModified`.
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/build"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
