"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function CTA() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to level up your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            AI development workflow?
          </span>
        </h2>

        {/* Subheadline */}
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
          Join thousands of developers who use PromptSuite to build, test, and
          optimize their AI-powered applications. Get started in under 2 minutes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isLoading ? (
            <div className="h-12 w-40 bg-slate-700 rounded-lg animate-pulse" />
          ) : isAuthenticated ? (
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-12 px-8 bg-white hover:bg-slate-100 text-slate-900 shadow-xl text-base font-semibold group"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button
                size="lg"
                className="h-12 px-8 bg-white hover:bg-slate-100 text-slate-900 shadow-xl text-base font-semibold group"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 border-slate-700 hover:bg-slate-800 text-white text-base font-semibold"
          >
            Schedule a demo
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "10K+", label: "Developers" },
            { value: "1M+", label: "Prompts tested" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-white font-display">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
