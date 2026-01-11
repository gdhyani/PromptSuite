"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Book,
  Rocket,
  Settings,
  Code2,
  GitBranch,
  Zap,
  Terminal,
  ArrowRight,
  Search,
  ExternalLink,
  Key,
  Database,
  BarChart3,
  Shield,
} from "lucide-react";

const quickLinks = [
  {
    title: "Getting Started",
    description: "Set up PromptSuite in under 5 minutes",
    icon: Rocket,
    href: "#getting-started",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "GitHub Integration",
    description: "Connect your repository and detect prompts",
    icon: GitBranch,
    href: "#github-integration",
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  {
    title: "API Reference",
    description: "Complete REST API documentation",
    icon: Code2,
    href: "#api-reference",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Configuration",
    description: "Customize PromptSuite for your workflow",
    icon: Settings,
    href: "#configuration",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const apiEndpoints = [
  {
    category: "Authentication",
    icon: Key,
    endpoints: [
      { method: "GET", path: "/api/auth/github", description: "Initiate GitHub OAuth" },
      { method: "GET", path: "/api/auth/github/callback", description: "OAuth callback handler" },
      { method: "POST", path: "/api/auth/pat", description: "Authenticate with Personal Access Token" },
      { method: "GET", path: "/api/auth/me", description: "Get current authenticated user" },
      { method: "POST", path: "/api/auth/logout", description: "Logout and invalidate session" },
    ],
  },
  {
    category: "Projects",
    icon: Database,
    endpoints: [
      { method: "GET", path: "/api/projects", description: "List all projects for current user" },
      { method: "POST", path: "/api/projects", description: "Create a new project" },
      { method: "GET", path: "/api/projects/:id", description: "Get project details" },
      { method: "POST", path: "/api/projects/:id/scan", description: "Trigger prompt scan" },
      { method: "DELETE", path: "/api/projects/:id", description: "Delete a project" },
    ],
  },
  {
    category: "Prompts",
    icon: Terminal,
    endpoints: [
      { method: "GET", path: "/api/projects/:id/prompts", description: "List detected prompts" },
      { method: "GET", path: "/api/prompts/:id", description: "Get prompt with versions" },
      { method: "POST", path: "/api/prompts/:id/versions", description: "Save new version" },
      { method: "GET", path: "/api/prompts/:id/versions", description: "List prompt versions" },
    ],
  },
  {
    category: "Testing",
    icon: Zap,
    endpoints: [
      { method: "POST", path: "/api/test", description: "Execute prompt test" },
      { method: "GET", path: "/api/prompts/:id/runs", description: "Get test run history" },
      { method: "POST", path: "/api/runs/:id/star", description: "Star/unstar a test run" },
    ],
  },
  {
    category: "Analytics",
    icon: BarChart3,
    endpoints: [
      { method: "GET", path: "/api/projects/:id/analytics", description: "Project analytics overview" },
      { method: "GET", path: "/api/projects/:id/analytics/daily", description: "Daily analytics breakdown" },
      { method: "GET", path: "/api/prompts/:id/analytics", description: "Prompt-specific analytics" },
      { method: "GET", path: "/api/projects/:id/costs", description: "Cost breakdown by model" },
    ],
  },
  {
    category: "Settings",
    icon: Settings,
    endpoints: [
      { method: "GET", path: "/api/settings/providers", description: "Get saved API keys (masked)" },
      { method: "POST", path: "/api/settings/providers", description: "Save API key" },
    ],
  },
  {
    category: "Status",
    icon: Shield,
    endpoints: [
      { method: "GET", path: "/api/status", description: "Get system status and service health" },
      { method: "GET", path: "/health", description: "Simple health check endpoint" },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700",
  POST: "bg-blue-100 text-blue-700",
  PUT: "bg-amber-100 text-amber-700",
  DELETE: "bg-rose-100 text-rose-700",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              Documentation
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              PromptSuite API
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8">
              Complete API reference for integrating with PromptSuite. Build custom
              workflows and automate your prompt management.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-16">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="group p-5 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${link.bg} flex items-center justify-center mb-3`}
                >
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-slate-600">{link.description}</p>
              </a>
            ))}
          </div>

          {/* Base URL */}
          <div className="mb-10 p-5 sm:p-6 rounded-xl bg-slate-900 text-white">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Base URL</h3>
            <code className="text-lg sm:text-xl font-mono text-emerald-400">
              https://api.promptsuite.dev
            </code>
            <p className="text-sm text-slate-400 mt-2">
              For self-hosted: Use your configured <code className="text-slate-300">BACKEND_URL</code>
            </p>
          </div>

          {/* API Endpoints */}
          <div id="api-reference" className="space-y-8 sm:space-y-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              API Reference
            </h2>

            {apiEndpoints.map((section) => (
              <div
                key={section.category}
                className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {section.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {section.endpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <span
                        className={`inline-flex w-fit px-2.5 py-1 rounded text-xs font-bold ${methodColors[endpoint.method]}`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-slate-700 flex-1">
                        {endpoint.path}
                      </code>
                      <span className="text-sm text-slate-500">
                        {endpoint.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Authentication Section */}
          <div id="getting-started" className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Authentication
            </h2>
            <div className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white">
              <p className="text-slate-600 mb-4">
                PromptSuite uses JWT (JSON Web Tokens) for authentication. Include the
                token in the Authorization header:
              </p>
              <div className="p-4 rounded-lg bg-slate-900 text-white font-mono text-sm overflow-x-auto">
                <pre>{`Authorization: Bearer <your-jwt-token>`}</pre>
              </div>
              <p className="text-sm text-slate-500 mt-4">
                Tokens are obtained through GitHub OAuth or by providing a Personal Access Token.
              </p>
            </div>
          </div>

          {/* Interactive API Docs Link */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Interactive API Documentation
            </h3>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Explore our API with an interactive documentation viewer. Test endpoints
              directly in your browser.
            </p>
            <a
              href="/api/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
            >
              <Code2 className="h-5 w-5" />
              Open API Explorer
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Help CTA */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <Book className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Need help getting started?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Check out our step-by-step guides or reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/guides"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                View Guides
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
