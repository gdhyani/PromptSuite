"use client";

import { GitBranch, Search, FlaskConical, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: GitBranch,
    title: "Connect your repo",
    description:
      "Link your GitHub repository with one click. We support any codebase using OpenAI, Anthropic, or other major LLM providers.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    number: "02",
    icon: Search,
    title: "Auto-detect prompts",
    description:
      "Our scanner analyzes your code and automatically finds all LLM API calls, extracting prompts, models, and configurations.",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Edit & test",
    description:
      "Use our visual editor to modify prompts, test with real API calls, and compare different versions side by side.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy with confidence",
    description:
      "Push optimized prompts back to your repo with full version history, analytics, and monitoring in production.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            From code to production
            <br />
            <span className="text-gradient-blue">in minutes</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Get started in under 2 minutes. No SDK installation required - we work
            with your existing codebase.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-amber-200 hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all h-full group">
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-bold text-slate-200 font-display group-hover:text-slate-300 transition-colors">
                      {step.number}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center`}
                    >
                      <step.icon className={`h-7 w-7 ${step.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector dot for desktop */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full ${step.iconBg} hidden lg:flex items-center justify-center shadow-sm border border-slate-200`}
                >
                  <div className={`w-2 h-2 rounded-full ${step.iconColor.replace('text-', 'bg-')}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code snippet preview */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <span className="text-sm text-slate-500 ml-2 font-mono">
                src/services/ai.ts
              </span>
            </div>

            {/* Code content */}
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-slate-300">
                <code>
                  <span className="text-slate-500">{"//"} </span>
                  <span className="text-emerald-400">
                    PromptSuite auto-detected this prompt
                  </span>
                  {"\n"}
                  <span className="text-purple-400">const</span> response{" "}
                  <span className="text-slate-500">=</span>{" "}
                  <span className="text-purple-400">await</span> openai.chat.completions.
                  <span className="text-amber-400">create</span>
                  <span className="text-slate-500">{"({"}</span>
                  {"\n"}
                  {"  "}model<span className="text-slate-500">:</span>{" "}
                  <span className="text-emerald-400">"gpt-4o"</span>
                  <span className="text-slate-500">,</span>
                  {"\n"}
                  {"  "}messages<span className="text-slate-500">:</span>{" "}
                  <span className="text-slate-500">[</span>
                  {"\n"}
                  {"    "}
                  <span className="text-slate-500">{"{"}</span>
                  {"\n"}
                  {"      "}role<span className="text-slate-500">:</span>{" "}
                  <span className="text-emerald-400">"system"</span>
                  <span className="text-slate-500">,</span>
                  {"\n"}
                  {"      "}content<span className="text-slate-500">:</span>{" "}
                  <span className="text-emerald-400">
                    "You are a helpful assistant..."
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="text-slate-500">{"}"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-500">],</span>
                  {"\n"}
                  {"  "}temperature<span className="text-slate-500">:</span>{" "}
                  <span className="text-amber-400">0.7</span>
                  {"\n"}
                  <span className="text-slate-500">{"});"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
