"use client";

import {
  Github,
  Code2,
  Terminal,
  Webhook,
  GitBranch,
  Box,
  Layers,
  Zap,
  ArrowRight,
} from "lucide-react";

const integrations = [
  {
    name: "GitHub",
    description: "Connect your repos and auto-detect prompts from your codebase",
    icon: Github,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    name: "VS Code",
    description: "Edit and test prompts directly from your editor",
    icon: Code2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    name: "OpenAI",
    description: "Full support for GPT-4o, GPT-4 Turbo, and all OpenAI models",
    icon: Zap,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    name: "Anthropic",
    description: "Claude 3.5 Sonnet, Opus, and Haiku integration",
    icon: Box,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    name: "CLI Tool",
    description: "Scan codebases and manage prompts from your terminal",
    icon: Terminal,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    name: "Webhooks",
    description: "Get notified on prompt changes, test runs, and alerts",
    icon: Webhook,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    name: "GitLab",
    description: "Coming soon: GitLab integration for enterprise teams",
    icon: GitBranch,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    comingSoon: true,
  },
  {
    name: "REST API",
    description: "Build custom integrations with our comprehensive API",
    icon: Layers,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

export function Integrations() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Integrations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Works with your
            <br />
            <span className="text-gradient-blue">existing stack</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            PromptSuite integrates seamlessly with the tools you already use.
            No disruption to your workflow.
          </p>
        </div>

        {/* Integrations grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group relative"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {integration.comingSoon && (
                <span className="absolute top-3 right-3 text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                  Coming soon
                </span>
              )}

              <div
                className={`w-12 h-12 rounded-xl ${integration.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <integration.icon className={`h-6 w-6 ${integration.iconColor}`} />
              </div>

              <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                {integration.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>

        {/* API callout */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 rounded-2xl" />
          <div className="relative bg-white/80 backdrop-blur p-8 sm:p-10 rounded-2xl border border-slate-200 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Need a custom integration?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Our REST API gives you full programmatic access to PromptSuite.
              Build custom workflows, integrate with your CI/CD, or create your own tools.
            </p>
            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
            >
              <Code2 className="h-4 w-4" />
              View API Docs
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
