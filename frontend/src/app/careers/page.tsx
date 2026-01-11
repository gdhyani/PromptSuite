"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  MapPin,
  Clock,
  Heart,
  Zap,
  Globe,
  Coffee,
  Laptop,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    icon: Laptop,
    title: "Remote-First",
    description: "Work from anywhere in the world. We're fully distributed.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness stipend.",
  },
  {
    icon: Zap,
    title: "Top-Tier Equipment",
    description: "Latest MacBook Pro, monitors, and any tools you need.",
  },
  {
    icon: Globe,
    title: "Unlimited PTO",
    description: "Take time off when you need it. We trust you.",
  },
  {
    icon: Coffee,
    title: "Learning Budget",
    description: "$2,000/year for courses, conferences, and books.",
  },
  {
    icon: Sparkles,
    title: "Equity",
    description: "Meaningful equity stake in the company.",
  },
];

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build core features across our Next.js frontend and Node.js backend. You'll work on prompt detection, testing infrastructure, and our analytics platform.",
  },
  {
    title: "ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Improve our prompt detection algorithms and build intelligent features like auto-optimization and quality scoring.",
  },
  {
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-time",
    description:
      "Help developers succeed with PromptSuite. Create content, build demos, speak at conferences, and gather community feedback.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Shape the future of our product experience. Design intuitive interfaces for complex prompt management workflows.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              Careers
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Join our team
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Help us build the future of prompt engineering. We&apos;re a small,
              passionate team looking for people who want to make a real impact.
            </p>
          </div>

          {/* Mission Banner */}
          <div className="mb-12 sm:mb-16 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Why PromptSuite?
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We&apos;re at the forefront of AI tooling. Every day, you&apos;ll work on
              problems that matter to thousands of developers building the next
              generation of AI applications.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-10">
              Benefits & Perks
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <benefit.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3">
              Open Positions
            </h2>
            <p className="text-slate-600 text-center mb-8 sm:mb-10 max-w-xl mx-auto">
              Don&apos;t see the perfect role? Reach out anyway at{" "}
              <a
                href="mailto:careers@promptsuite.com"
                className="text-blue-600 hover:underline"
              >
                careers@promptsuite.com
              </a>
            </p>

            <div className="space-y-4">
              {openings.map((job, index) => (
                <a
                  key={index}
                  href="#"
                  className="group block p-5 sm:p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                          {job.department}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3 max-w-2xl">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="hidden sm:block h-5 w-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Questions?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Reach out to our team if you have any questions about working at
              PromptSuite.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
