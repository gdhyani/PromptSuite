"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "PromptSuite completely changed how we iterate on prompts. What used to take days now takes minutes. The version control alone saved us from countless production issues.",
    author: "Sarah Chen",
    role: "AI Lead",
    company: "Acme AI",
    avatar: "SC",
    rating: 5,
  },
  {
    quote:
      "Finally, a tool that understands how developers work with LLMs. The automatic detection is magic — it found prompts I forgot we had.",
    author: "Marcus Johnson",
    role: "Senior Engineer",
    company: "TechFlow",
    avatar: "MJ",
    rating: 5,
  },
  {
    quote:
      "Our prompt costs dropped 34% in the first month. Being able to see exactly which prompts are expensive and optimize them is a game-changer.",
    author: "Emily Rodriguez",
    role: "CTO",
    company: "DataPipe",
    avatar: "ER",
    rating: 5,
  },
  {
    quote:
      "The playground is incredible for rapid prototyping. I can test prompt variations in seconds without touching our codebase.",
    author: "Alex Kim",
    role: "ML Engineer",
    company: "Neural Labs",
    avatar: "AK",
    rating: 5,
  },
  {
    quote:
      "We went from zero visibility into our AI costs to full observability. The analytics dashboard is exactly what we needed.",
    author: "Jordan Taylor",
    role: "Engineering Manager",
    company: "CloudScale",
    avatar: "JT",
    rating: 5,
  },
  {
    quote:
      "PromptSuite is now part of our CI/CD pipeline. We catch prompt regressions before they hit production.",
    author: "Priya Sharma",
    role: "DevOps Lead",
    company: "FastDeploy",
    avatar: "PS",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Loved by developers
            <br />
            <span className="text-gradient-blue">worldwide</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed px-4">
            See what engineers and teams are saying about PromptSuite.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="group p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-5 sm:mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
