"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Github,
  Play,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
  Terminal,
} from "lucide-react";

const trustedCompanies = [
  "Vercel",
  "Stripe",
  "Linear",
  "Notion",
  "Figma",
  "Supabase",
];

const stats = [
  { value: "10K+", label: "Developers" },
  { value: "2M+", label: "Prompts tested" },
  { value: "99.9%", label: "Uptime" },
];

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up">
            <Badge className="px-4 py-1.5 text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors mb-6">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-blue-500" />
              Now with GPT-4o and Claude 3.5 support
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Manage AI prompts
            <br />
            <span className="text-gradient-blue">like a pro</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up px-4" style={{ animationDelay: "0.2s" }}>
            Auto-detect prompts from your codebase, test with real LLMs, track
            costs and latency, and ship better AI features faster.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up px-4" style={{ animationDelay: "0.3s" }}>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all text-base font-semibold group"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 border-slate-300 bg-white hover:bg-slate-50 text-slate-900 text-base font-semibold group"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500 animate-fade-up px-4 mb-16" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>SOC 2 compliant</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>GitHub integration</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>

        {/* Hero visual - Code editor preview */}
        <div className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="relative max-w-5xl mx-auto">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60" />

            {/* Main card */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-red-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-amber-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-emerald-400 transition-colors" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 font-mono flex items-center gap-2">
                    <Terminal className="h-3 w-3" />
                    promptsuite.dev/dashboard
                  </div>
                </div>
              </div>

              {/* Content preview - Mobile */}
              <div className="block md:hidden p-4 min-h-[300px] bg-white">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Detected Prompts
                    </h3>
                    <p className="text-xs text-slate-500">
                      AI Chat Assistant • 12 prompts
                    </p>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                    Synced
                  </Badge>
                </div>

                {/* Mobile prompt cards */}
                <div className="space-y-2">
                  {[
                    { name: "system_greeting", model: "gpt-4o", cost: "$12.34" },
                    { name: "code_review", model: "gpt-4-turbo", cost: "$28.90" },
                    { name: "summarize_text", model: "gpt-3.5", cost: "$4.56" },
                  ].map((prompt) => (
                    <div
                      key={prompt.name}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-xs font-semibold text-slate-900 font-mono">
                          {prompt.name}
                        </code>
                        <span className="text-[10px] font-mono text-slate-500">
                          {prompt.model}
                        </span>
                      </div>
                      <div className="mt-1 text-[10px] text-slate-500 text-right">
                        {prompt.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content preview - Desktop */}
              <div className="hidden md:grid grid-cols-12 min-h-[420px]">
                {/* Sidebar */}
                <div className="col-span-2 border-r border-slate-100 bg-slate-50/50 p-3">
                  <div className="space-y-1">
                    {["Dashboard", "Projects", "Prompts", "Analytics", "Logs"].map(
                      (item, i) => (
                        <div
                          key={item}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            i === 2
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Main content */}
                <div className="col-span-10 p-6 bg-white">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Detected Prompts
                      </h3>
                      <p className="text-sm text-slate-500">
                        AI Chat Assistant • 12 prompts detected
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                        Synced
                      </Badge>
                    </div>
                  </div>

                  {/* Prompt cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "system_greeting",
                        model: "gpt-4o",
                        runs: "3,421",
                        cost: "$12.34",
                      },
                      {
                        name: "code_review",
                        model: "gpt-4-turbo",
                        runs: "1,892",
                        cost: "$28.90",
                      },
                      {
                        name: "summarize_text",
                        model: "gpt-3.5-turbo",
                        runs: "8,234",
                        cost: "$4.56",
                      },
                      {
                        name: "translate_content",
                        model: "claude-3.5",
                        runs: "2,156",
                        cost: "$15.78",
                      },
                    ].map((prompt) => (
                      <div
                        key={prompt.name}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <code className="text-sm font-semibold text-slate-900 font-mono group-hover:text-blue-700 transition-colors">
                            {prompt.name}
                          </code>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-mono border-slate-200 text-slate-600"
                          >
                            {prompt.model}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{prompt.runs} runs</span>
                          <span className="font-medium text-slate-700">
                            {prompt.cost}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats cards - Hidden on mobile/tablet */}
            <div className="absolute -left-12 top-1/4 bg-white rounded-xl p-4 animate-float hidden xl:block border border-slate-200 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">-23%</p>
                  <p className="text-xs text-slate-500">Cost reduced</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -right-12 top-1/2 bg-white rounded-xl p-4 animate-float hidden xl:block border border-slate-200 shadow-lg"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">1.2s</p>
                  <p className="text-xs text-slate-500">Avg latency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted by section */}
        <div className="mt-20 text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-xs sm:text-sm text-slate-500 mb-8">
            Trusted by developers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-12 gap-y-4">
            {trustedCompanies.map((company) => (
              <span
                key={company}
                className="text-lg md:text-xl font-semibold text-slate-300 hover:text-slate-400 transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
