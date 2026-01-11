"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  CheckCircle2,
  Circle,
  Clock,
  Rocket,
  Users,
  Globe,
  Cpu,
  GitBranch,
  Smartphone,
  Plug,
} from "lucide-react";

const roadmapItems = [
  {
    quarter: "Q4 2025",
    status: "completed",
    items: [
      {
        title: "Core Platform Launch",
        description: "GitHub integration, prompt detection, and visual editor",
        icon: Rocket,
        completed: true,
      },
      {
        title: "OpenAI & Anthropic Support",
        description: "Full support for GPT-4o, Claude 3.5, and related models",
        icon: Cpu,
        completed: true,
      },
      {
        title: "Analytics Dashboard",
        description: "Usage tracking, cost analytics, and latency metrics",
        icon: Clock,
        completed: true,
      },
    ],
  },
  {
    quarter: "Q1 2026",
    status: "in-progress",
    items: [
      {
        title: "Human-in-the-Loop System",
        description: "Review queues, feedback collection, and approval workflows",
        icon: Users,
        completed: true,
      },
      {
        title: "Prompt Template Registry",
        description: "Save, share, and reuse prompt templates across projects",
        icon: GitBranch,
        completed: false,
      },
      {
        title: "Team Collaboration",
        description: "Shared workspaces, comments, and role-based permissions",
        icon: Users,
        completed: false,
      },
    ],
  },
  {
    quarter: "Q2 2026",
    status: "planned",
    items: [
      {
        title: "More AI Providers",
        description: "Google Gemini, Mistral, Cohere, and local LLM support",
        icon: Globe,
        completed: false,
      },
      {
        title: "Python & Java Detection",
        description: "Expand prompt detection beyond TypeScript/JavaScript",
        icon: Cpu,
        completed: false,
      },
      {
        title: "VS Code Extension",
        description: "Edit and test prompts directly from your editor",
        icon: Plug,
        completed: false,
      },
    ],
  },
  {
    quarter: "Q3 2026",
    status: "planned",
    items: [
      {
        title: "Mobile App",
        description: "Monitor and manage prompts on the go",
        icon: Smartphone,
        completed: false,
      },
      {
        title: "A/B Testing",
        description: "Compare prompt versions with statistical significance",
        icon: GitBranch,
        completed: false,
      },
      {
        title: "Auto PR Creation",
        description: "Push optimized prompts back to your codebase automatically",
        icon: GitBranch,
        completed: false,
      },
    ],
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  planned: {
    label: "Planned",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-200",
  },
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              Roadmap
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Where we&apos;re headed
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Our vision for the future of prompt management. Have a feature
              request? Let us know on{" "}
              <a
                href="https://github.com/promptsuite/promptsuite/discussions"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Discussions
              </a>
              .
            </p>
          </div>

          {/* Roadmap grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {roadmapItems.map((quarter) => {
              const config = statusConfig[quarter.status as keyof typeof statusConfig];

              return (
                <div
                  key={quarter.quarter}
                  className={`rounded-2xl border-2 ${config.border} ${config.bg} p-5 sm:p-6`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {quarter.quarter}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${config.bg} ${config.color} border ${config.border}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {quarter.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-slate-200"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            item.completed
                              ? "bg-emerald-100"
                              : "bg-slate-100"
                          }`}
                        >
                          <item.icon
                            className={`h-5 w-5 ${
                              item.completed
                                ? "text-emerald-600"
                                : "text-slate-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                              {item.title}
                            </h4>
                            {item.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-slate-300 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-sm sm:text-base text-slate-600 mb-4">
              Want to influence our roadmap?
            </p>
            <a
              href="https://github.com/promptsuite/promptsuite/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              <Users className="h-5 w-5" />
              Join the Discussion
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
