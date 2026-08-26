import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build Your Church's Responsible AI Principles",
  description:
    "Answer a short set of questions and download a customized Responsible AI Principles document for your church or ministry, as Markdown or PDF.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
