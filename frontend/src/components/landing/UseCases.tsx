"use client";

import {
  Scan,
  FlaskConical,
  BarChart3,
  GitCompare,
  Shield,
  Workflow,
  Code2,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: Scan,
    title: "Automatic Prompt Detection",
    description:
      "Connect your GitHub repository and PromptSuite automatically scans your codebase to detect all OpenAI SDK calls, extracting prompts, configurations, and template variables.",
    highlights: [
      "Detects system prompts, user messages, and function calls",
      "Extracts model settings (temperature, max_tokens, etc.)",
      "Identifies template variables like {role} or {context}",
      "Shows exact file path and line number references",
    ],
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: FlaskConical,
    title: "Visual Prompt Testing",
    description:
      "Edit prompts in a clean visual interface and test them instantly with your own API keys. No code changes required - iterate faster than ever.",
    highlights: [
      "Live prompt editor with syntax highlighting",
      "Fill template variables with test values",
      "Adjust model, temperature, and other settings",
      "Stream responses in real-time",
    ],
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Observability",
    description:
      "Track every prompt execution with detailed metrics. Monitor latency, token usage, and costs across your entire prompt portfolio.",
    highlights: [
      "Latency percentiles (p50, p95, p99)",
      "Token usage and cost breakdown by model",
      "Request logging with full request/response",
      "Custom tags and metadata for organization",
    ],
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: GitCompare,
    title: "Version Control",
    description:
      "Every prompt edit is tracked. Compare versions side-by-side, see what changed, and roll back to previous versions if needed.",
    highlights: [
      "Full edit history for every prompt",
      "Side-by-side diff viewer",
      "Compare test results across versions",
      "Export optimized prompts back to code",
    ],
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Shield,
    title: "Human-in-the-Loop",
    description:
      "Set up quality assurance workflows with review queues, feedback collection, and approval gates before prompts go to production.",
    highlights: [
      "Automatic flagging based on rules",
      "Review queue with priority levels",
      "Thumbs up/down and star ratings",
      "Annotation panel for corrections",
    ],
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Workflow,
    title: "Escalation Rules",
    description:
      "Define rules to automatically flag responses based on latency, cost, content patterns, or confidence scores for human review.",
    highlights: [
      "Rule-based response flagging",
      "Latency and cost thresholds",
      "Content pattern matching",
      "Priority-based routing",
    ],
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

const useCases = [
  {
    title: "Solo Developers",
    description:
      "Iterate on AI-powered side projects without constantly editing code. Test prompt variations in minutes instead of hours.",
    icon: Code2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Engineering Teams",
    description:
      "Get visibility into all prompts across your codebase. Collaborate on improvements with version history and review workflows.",
    icon: Workflow,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Prompt Engineers",
    description:
      "Optimize prompts across multiple projects. Track performance metrics and build a library of proven templates.",
    icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export function UseCases() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Capabilities
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Everything you need for
            <br />
            <span className="text-gradient-blue">prompt management</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From automatic detection to production monitoring, PromptSuite gives
            you complete control over your AI prompts.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${cap.iconBg} flex items-center justify-center mb-4`}
              >
                <cap.icon className={`h-6 w-6 ${cap.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {cap.description}
              </p>
              <ul className="space-y-2">
                {cap.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-500"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${cap.iconColor.replace('text-', 'bg-')} mt-1.5 flex-shrink-0`}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Who It's For */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Built for everyone working with AI
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${useCase.iconBg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <useCase.icon className={`h-6 w-6 ${useCase.iconColor}`} />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {useCase.title}
                </h4>
                <p className="text-sm text-slate-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/docs">
            <Button
              size="lg"
              className="h-12 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 font-semibold shadow-lg shadow-blue-500/25"
            >
              Explore Documentation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
