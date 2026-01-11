"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Github,
  Star,
  GitFork,
  Users,
  Heart,
  ExternalLink,
  MessageSquare,
  BookOpen,
} from "lucide-react";

const stats = [
  { label: "GitHub Stars", value: "2.4k", icon: Star },
  { label: "Forks", value: "340", icon: GitFork },
  { label: "Contributors", value: "89", icon: Users },
  { label: "Discord Members", value: "1.2k", icon: MessageSquare },
];

const contributors = [
  "AC", "BK", "CM", "DJ", "EL", "FM", "GN", "HO", "IP", "JQ", "KR", "LS"
];

export function OpenSource() {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
              Open Source
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Built in the open,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                by the community
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6 sm:mb-8">
              PromptSuite is open source and free to self-host. We believe the
              best tools are built collaboratively. Join our growing community
              of contributors and help shape the future of prompt management.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500" />
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://github.com/promptsuite/promptsuite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm sm:text-base"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Star on GitHub
                </Button>
              </a>
              <Link href="/docs" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 border-slate-700 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read the docs
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - Contributors */}
          <div className="relative">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Recent Contributors
                </h3>
                <a
                  href="https://github.com/promptsuite/promptsuite/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  View all
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Contributor avatars */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                {contributors.map((initials, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold ring-2 ring-slate-800 hover:ring-blue-500/50 transition-all cursor-pointer"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {initials}
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-400 font-medium">Recent activity</p>
                {[
                  { user: "sarah-dev", action: "merged PR #234", time: "2 hours ago" },
                  { user: "marcus-ai", action: "opened issue #456", time: "5 hours ago" },
                  { user: "priya-eng", action: "pushed to main", time: "8 hours ago" },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-[10px] font-medium">
                      {activity.user[0].toUpperCase()}
                    </div>
                    <span className="text-slate-300">
                      <span className="text-white font-medium">@{activity.user}</span>{" "}
                      {activity.action}
                    </span>
                    <span className="text-slate-500 ml-auto text-[10px] sm:text-xs hidden sm:block">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] sm:text-xs font-semibold shadow-lg animate-float hidden sm:block">
              MIT Licensed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
