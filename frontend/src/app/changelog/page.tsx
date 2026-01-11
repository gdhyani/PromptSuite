"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Tag, Sparkles, Bug, Zap, Shield } from "lucide-react";

const changelogEntries = [
  {
    version: "1.2.0",
    date: "January 8, 2026",
    type: "feature",
    title: "Human-in-the-Loop Review System",
    description:
      "Introduced a comprehensive HITL system with review queues, feedback collection, and annotation panels for quality assurance.",
    changes: [
      "Added review queue for flagged responses",
      "Implemented thumbs up/down and star ratings",
      "Created annotation panel for adding notes",
      "Built approval workflow for production prompts",
    ],
  },
  {
    version: "1.1.0",
    date: "December 15, 2025",
    type: "feature",
    title: "Analytics Dashboard",
    description:
      "New observability features including request logging, latency tracking, and cost analytics.",
    changes: [
      "Real-time usage analytics with charts",
      "Cost breakdown by model and prompt",
      "Latency percentiles (p50, p95, p99)",
      "Searchable request logs",
    ],
  },
  {
    version: "1.0.2",
    date: "December 1, 2025",
    type: "fix",
    title: "Bug Fixes & Improvements",
    description: "Various bug fixes and performance improvements.",
    changes: [
      "Fixed GitHub OAuth token refresh issues",
      "Improved prompt detection accuracy for nested calls",
      "Resolved streaming response truncation",
      "Enhanced error handling for API timeouts",
    ],
  },
  {
    version: "1.0.1",
    date: "November 20, 2025",
    type: "security",
    title: "Security Updates",
    description: "Important security patches and dependency updates.",
    changes: [
      "Updated authentication token encryption",
      "Patched XSS vulnerability in prompt editor",
      "Enhanced API key storage security",
      "Added rate limiting for public endpoints",
    ],
  },
  {
    version: "1.0.0",
    date: "November 1, 2025",
    type: "feature",
    title: "Initial Release",
    description:
      "The first stable release of PromptSuite with core prompt management features.",
    changes: [
      "GitHub repository integration",
      "Automatic prompt detection from codebases",
      "Visual prompt editor with live testing",
      "Version history and diff viewer",
      "OpenAI and Anthropic provider support",
    ],
  },
];

const typeConfig = {
  feature: {
    icon: Sparkles,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  fix: {
    icon: Bug,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  improvement: {
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  security: {
    icon: Shield,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              Changelog
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              What&apos;s new in PromptSuite
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Stay up to date with the latest features, improvements, and fixes.
              We ship updates regularly to make PromptSuite better.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-8 sm:space-y-12">
              {changelogEntries.map((entry, index) => {
                const config = typeConfig[entry.type as keyof typeof typeConfig];
                const Icon = config.icon;

                return (
                  <div
                    key={entry.version}
                    className="relative pl-8 sm:pl-20"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0 sm:left-8 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${config.bg} ${config.border} border-2 flex items-center justify-center`}
                    >
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>

                    {/* Content card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold">
                          <Tag className="h-3 w-3" />
                          v{entry.version}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {entry.date}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                        {entry.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-4">
                        {entry.description}
                      </p>

                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
