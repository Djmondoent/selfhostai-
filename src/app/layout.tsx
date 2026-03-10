import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://selfhostai.xyz"),
  title: "SelfHostAI | Self-host your AI-built app without the headache",
  description:
    "SelfHostAI turns AI-generated apps into beginner-friendly hosting plans with deployment guides, Nginx configs, SSL steps, and troubleshooting help.",
  openGraph: {
    title: "SelfHostAI",
    description: "From vibe-coded to live in production.",
    url: "https://selfhostai.xyz",
    siteName: "SelfHostAI"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
