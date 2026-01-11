"use client";

import {
  GitBranch,
  FlaskConical,
  BarChart3,
  GitCompare,
  Users,
  Zap,
  Shield,
  Code2,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Auto-detect prompts",
    description:
      "Connect your GitHub repo and we'll automatically find all OpenAI, Anthropic, and other LLM API calls in your codebase.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: FlaskConical,
    title: "Visual prompt editor",
    description:
      "Edit prompts with syntax highlighting, variable detection, and instant preview. No code changes required.",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: GitBranch,
    title: "Version control",
    description:
      "Track every change to your prompts with full history, diffs, and the ability to rollback anytime.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: GitCompare,
    title: "A/B testing & evals",
    description:
      "Compare prompt variations side by side. Run automated evaluations with custom test suites.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description:
      "Monitor cost, latency, and token usage across all prompts. Get alerts when things go wrong.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Zap,
    title: "Instant playground",
    description:
      "Test any prompt immediately with your API keys. Stream responses and compare models in real-time.",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Invite your team, assign reviewers, and set up approval workflows for production prompts.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: Shield,
    title: "Enterprise security",
    description:
      "SOC 2 compliant, SSO support, audit logs, and your data never touches our servers during testing.",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Features
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Everything you need to ship
            <br />
            <span className="text-gradient-blue">better AI features</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From prompt detection to production monitoring, PromptSuite gives you
            the complete toolkit to build, test, and optimize your AI-powered
            applications.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
