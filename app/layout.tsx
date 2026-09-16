import type { Metadata } from "next";
import Script from "next/script";
import {
  AUTHOR_NAME,
  REPO_URL,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  // Makes every relative URL below (and in each page's `alternates`) resolve
  // against the real domain instead of being emitted relative.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Responsible AI for Churches — Free AI Policy Builder",
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Answer seven questions and download a customized AI policy for your church or ministry — eighteen responsible AI principles, as Markdown or PDF. Free and open source.",
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  category: "technology",
  authors: [{ name: AUTHOR_NAME, url: REPO_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "Build an AI Policy for Your Church — Free Template",
    description:
      "A seven-step builder that turns your answers into a finished Responsible AI Principles document for your church. Markdown or PDF, free, and nothing leaves your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build an AI Policy for Your Church — Free Template",
    description:
      "Seven questions in, a finished Responsible AI Principles document out. Markdown or PDF, free, and nothing leaves your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to verify the domain in
  // Google Search Console without touching the DNS records.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const GA_MEASUREMENT_ID = "G-V8FY9G3EM7";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
