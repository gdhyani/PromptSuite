import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PromptSuite - AI Prompt Management & Testing Platform",
    template: "%s | PromptSuite",
  },
  description:
    "Auto-detect AI prompts from your codebase, test with real LLMs, track costs and latency, and ship better AI features faster. Open-source prompt management for modern teams.",
  keywords: [
    "AI prompts",
    "prompt management",
    "LLM testing",
    "OpenAI",
    "Claude",
    "GPT-4",
    "prompt engineering",
    "AI development",
    "prompt optimization",
    "AI observability",
  ],
  authors: [{ name: "PromptSuite Team" }],
  creator: "PromptSuite",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptsuite.dev",
    siteName: "PromptSuite",
    title: "PromptSuite - AI Prompt Management & Testing Platform",
    description:
      "Auto-detect AI prompts from your codebase, test with real LLMs, track costs and latency, and ship better AI features faster.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptSuite - AI Prompt Management & Testing Platform",
    description:
      "Auto-detect AI prompts from your codebase, test with real LLMs, and ship better AI features faster.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
