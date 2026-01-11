"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "For individual developers exploring AI.",
    price: "$0",
    period: "forever",
    features: [
      "1 project",
      "Up to 100 prompt runs/month",
      "Basic analytics",
      "Community support",
      "Public templates",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For teams building production AI features.",
    price: "$29",
    period: "per user/month",
    features: [
      "Unlimited projects",
      "Unlimited prompt runs",
      "Advanced analytics & alerts",
      "Version history & rollback",
      "A/B testing & evaluations",
      "Team collaboration",
      "Priority support",
      "Private templates",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with custom requirements.",
    price: "Custom",
    period: "contact us",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Custom integrations",
      "Dedicated success manager",
      "SLA guarantee",
      "On-premise deployment",
      "Audit logs & compliance",
      "Custom contracts",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Pricing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Start for free, upgrade when you need more. No hidden fees, no
            surprises. Cancel anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? "border-blue-200 bg-gradient-to-b from-blue-50/50 to-white shadow-xl shadow-blue-100/50"
                  : "border-slate-200 bg-white"
              } p-8`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                  Most popular
                </Badge>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-slate-900 font-display">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-slate-500 text-sm">/{plan.period}</span>
                  )}
                </div>
                {plan.price === "Custom" && (
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full ${
                        plan.popular ? "bg-blue-100" : "bg-slate-100"
                      } flex items-center justify-center`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          plan.popular ? "text-blue-600" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/login" className="block">
                <Button
                  className={`w-full h-12 text-base font-semibold ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 mb-6">
            Trusted by developers at
          </p>
          <div className="flex items-center justify-center gap-12 opacity-50 grayscale">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma"].map((company) => (
              <span
                key={company}
                className="text-xl font-semibold text-slate-400"
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
