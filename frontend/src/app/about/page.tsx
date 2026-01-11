"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Heart,
  Globe,
  Users,
  Github,
  Twitter,
  Linkedin,
  Sparkles,
  Target,
  Lightbulb,
} from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "Co-founder & CEO",
    bio: "Previously ML Engineer at OpenAI. Passionate about making AI tools accessible.",
    initials: "SC",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Marcus Rodriguez",
    role: "Co-founder & CTO",
    bio: "Former Staff Engineer at Stripe. Open source advocate and TypeScript enthusiast.",
    initials: "MR",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product",
    bio: "Product leader from Notion. Obsessed with developer experience and workflow optimization.",
    initials: "PS",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Alex Kim",
    role: "Lead Engineer",
    bio: "Full-stack developer from Vercel. Loves building tools that developers actually want to use.",
    initials: "AK",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
];

const values = [
  {
    icon: Heart,
    title: "Open Source First",
    description:
      "We believe the best tools are built in the open. PromptSuite is MIT licensed and always will be.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Target,
    title: "Developer Experience",
    description:
      "Every feature is designed with developers in mind. We obsess over the small details that make big differences.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description:
      "AI is evolving fast, and so are we. We ship weekly updates and listen closely to community feedback.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              About Us
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Building the future of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                prompt engineering
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              We&apos;re a small team of engineers and designers who believe that
              managing AI prompts shouldn&apos;t be a pain. PromptSuite was born
              from our own frustrations iterating on prompts in production.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16 sm:mb-20 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-center">
            <Sparkles className="h-10 w-10 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              To give every developer the tools they need to build, test, and
              optimize AI-powered applications with confidence. We want to make
              prompt engineering as seamless as writing code.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-12">
              What we believe
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-4`}
                  >
                    <value.icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3">
              Meet the team
            </h2>
            <p className="text-slate-600 text-center mb-8 sm:mb-12 max-w-xl mx-auto">
              A small but mighty team working to make prompt management better
              for everyone.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={member.twitter}
                      className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.github}
                      className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            {[
              { label: "GitHub Stars", value: "2.4k+" },
              { label: "Contributors", value: "89" },
              { label: "Countries", value: "45+" },
              { label: "Discord Members", value: "1.2k" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Want to join us?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              We&apos;re always looking for talented people who share our vision.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              <Users className="h-5 w-5" />
              View Open Positions
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
