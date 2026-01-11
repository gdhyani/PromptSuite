"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    title: "Introducing PromptSuite: The Open-Source Prompt Management Platform",
    excerpt:
      "Today we're excited to announce PromptSuite, a new way to manage, test, and optimize AI prompts without touching your code.",
    author: "Sarah Chen",
    date: "January 5, 2026",
    readTime: "5 min read",
    category: "Announcements",
    featured: true,
    image: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    title: "Why Prompt Management Matters for Production AI Applications",
    excerpt:
      "As AI becomes central to modern applications, managing prompts effectively is crucial. Here's why you need a dedicated solution.",
    author: "Marcus Rodriguez",
    date: "December 28, 2025",
    readTime: "8 min read",
    category: "Engineering",
    featured: true,
    image: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    title: "Building a Human-in-the-Loop System for AI Quality Assurance",
    excerpt:
      "How we designed PromptSuite's HITL features to ensure AI outputs meet quality standards before reaching production.",
    author: "Priya Sharma",
    date: "December 20, 2025",
    readTime: "12 min read",
    category: "Product",
    featured: false,
    image: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    title: "Prompt Detection: How We Parse OpenAI SDK Calls from Codebases",
    excerpt:
      "A deep dive into our TypeScript AST-based approach to automatically detecting and extracting prompts from code.",
    author: "Alex Kim",
    date: "December 15, 2025",
    readTime: "15 min read",
    category: "Engineering",
    featured: false,
    image: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    title: "Best Practices for Prompt Versioning and Testing",
    excerpt:
      "Learn the strategies our team uses to iterate on prompts safely while maintaining reliability in production.",
    author: "Sarah Chen",
    date: "December 10, 2025",
    readTime: "7 min read",
    category: "Best Practices",
    featured: false,
    image: "bg-gradient-to-br from-rose-500 to-pink-600",
  },
  {
    title: "The Cost of Untested Prompts: A Case Study",
    excerpt:
      "How one team reduced their AI costs by 40% using systematic prompt testing and optimization workflows.",
    author: "Marcus Rodriguez",
    date: "December 5, 2025",
    readTime: "6 min read",
    category: "Case Studies",
    featured: false,
    image: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
];

const categories = [
  "All",
  "Announcements",
  "Engineering",
  "Product",
  "Best Practices",
  "Case Studies",
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              Blog
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Insights & Updates
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              News, tutorials, and deep dives from the PromptSuite team.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-10 sm:mb-12">
            {categories.map((cat, index) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Posts */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredPosts.map((post, index) => (
              <a
                key={index}
                href="#"
                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition-all"
              >
                <div className={`h-48 ${post.image}`} />
                <div className="p-5 sm:p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Other Posts */}
          <div className="space-y-4">
            {otherPosts.map((post, index) => (
              <a
                key={index}
                href="#"
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all"
              >
                <div
                  className={`w-full sm:w-48 h-32 sm:h-32 rounded-lg ${post.image} flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <ArrowRight className="hidden sm:block h-5 w-5 text-slate-300 group-hover:text-blue-600 self-center flex-shrink-0 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              Get the latest articles, tutorials, and product updates delivered
              to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
