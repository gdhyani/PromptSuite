"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Zap,
  GitBranch,
  Shield,
  BarChart3,
  Users,
  Wrench,
} from "lucide-react";

const guides = [
  {
    title: "Getting Started with Prompt Detection",
    description:
      "Learn how PromptSuite automatically detects OpenAI SDK calls in your codebase and extracts prompt configurations.",
    category: "Beginner",
    time: "10 min",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50",
    featured: true,
  },
  {
    title: "Connecting Your GitHub Repository",
    description:
      "Step-by-step guide to connecting your GitHub repository and setting up automatic prompt scanning.",
    category: "Beginner",
    time: "5 min",
    icon: GitBranch,
    color: "text-slate-600",
    bg: "bg-slate-100",
    featured: true,
  },
  {
    title: "Testing Prompts with Variables",
    description:
      "Master template variables and learn how to test prompts with different input values efficiently.",
    category: "Intermediate",
    time: "8 min",
    icon: Wrench,
    color: "text-violet-600",
    bg: "bg-violet-50",
    featured: true,
  },
  {
    title: "Setting Up Escalation Rules",
    description:
      "Configure automatic flagging rules based on latency, cost, or content patterns for quality assurance.",
    category: "Advanced",
    time: "12 min",
    icon: Shield,
    color: "text-rose-600",
    bg: "bg-rose-50",
    featured: false,
  },
  {
    title: "Understanding Analytics & Metrics",
    description:
      "Deep dive into usage analytics, cost tracking, and latency percentiles for prompt optimization.",
    category: "Intermediate",
    time: "15 min",
    icon: BarChart3,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    featured: false,
  },
  {
    title: "Team Collaboration Best Practices",
    description:
      "Learn how to effectively collaborate on prompts with your team using shared workspaces and comments.",
    category: "Intermediate",
    time: "10 min",
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50",
    featured: false,
  },
  {
    title: "Self-Hosting PromptSuite",
    description:
      "Complete guide to deploying PromptSuite on your own infrastructure with Docker or Kubernetes.",
    category: "Advanced",
    time: "20 min",
    icon: Wrench,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    featured: false,
  },
  {
    title: "Building Custom Integrations",
    description:
      "Use the PromptSuite API to build custom integrations with your CI/CD pipeline and other tools.",
    category: "Advanced",
    time: "25 min",
    icon: Zap,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    featured: false,
  },
];

const categoryColors = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

export default function GuidesPage() {
  const featuredGuides = guides.filter((g) => g.featured);
  const allGuides = guides.filter((g) => !g.featured);

  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              Guides
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Learn by doing
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Step-by-step tutorials to help you get the most out of
              PromptSuite. From beginner basics to advanced workflows.
            </p>
          </div>

          {/* Featured Guides */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Start Here
            </h2>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {featuredGuides.map((guide, index) => (
                <a
                  key={index}
                  href="#"
                  className="group p-5 sm:p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${guide.bg} flex items-center justify-center mb-4`}
                  >
                    <guide.icon className={`h-6 w-6 ${guide.color}`} />
                  </div>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${
                      categoryColors[guide.category as keyof typeof categoryColors]
                    }`}
                  >
                    {guide.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {guide.time}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* All Guides */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              All Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {allGuides.map((guide, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${guide.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <guide.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${guide.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                          categoryColors[guide.category as keyof typeof categoryColors]
                        }`}
                      >
                        {guide.category}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.time}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                      {guide.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Looking for API docs?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Check out our comprehensive API reference for building custom
              integrations.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              View Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
