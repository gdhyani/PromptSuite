"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Shield, Lock, Eye, Database, Globe, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-7 w-7 text-blue-600" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500">
              Last updated: January 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <div className="p-5 sm:p-6 rounded-xl bg-blue-50 border border-blue-100 mb-8">
              <p className="text-sm sm:text-base text-blue-900 m-0">
                <strong>TL;DR:</strong> We collect minimal data, never sell your
                information, and you have full control over your data. Your prompts
                and code stay yours.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                <Database className="h-6 w-6 text-blue-600" />
                Information We Collect
              </h2>
              <p className="text-slate-600 mb-4">
                We collect information you provide directly to us:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <strong>Account Information:</strong> Email address, name, and
                  profile information when you create an account.
                </li>
                <li>
                  <strong>GitHub Data:</strong> Repository names and code content
                  when you connect your GitHub account for prompt detection.
                </li>
                <li>
                  <strong>Prompt Data:</strong> Prompts, test inputs, and outputs
                  when you use our testing features.
                </li>
                <li>
                  <strong>API Keys:</strong> Third-party API keys you provide for
                  testing (stored encrypted).
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with our service
                  for analytics and improvement.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
                How We Use Your Information
              </h2>
              <ul className="space-y-2 text-slate-600">
                <li>Provide, maintain, and improve our services</li>
                <li>Detect prompts in your connected repositories</li>
                <li>Execute prompt tests using your provided API keys</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve the product</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                <Lock className="h-6 w-6 text-blue-600" />
                Data Security
              </h2>
              <p className="text-slate-600 mb-4">
                We take security seriously and implement industry-standard measures:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>All data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                <li>API keys are stored using envelope encryption</li>
                <li>We never store full prompt responses beyond your session</li>
                <li>Regular security audits and penetration testing</li>
                <li>SOC 2 Type II compliance (in progress)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
                Data Sharing
              </h2>
              <p className="text-slate-600 mb-4">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <strong>Service Providers:</strong> Cloud hosting (AWS), analytics
                  (Posthog), and error tracking (Sentry)
                </li>
                <li>
                  <strong>AI Providers:</strong> Only when you explicitly test
                  prompts, and only the data required for the test
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to
                  protect our rights
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Your Rights
              </h2>
              <p className="text-slate-600 mb-4">You have the right to:</p>
              <ul className="space-y-2 text-slate-600">
                <li>Access, correct, or delete your personal data</li>
                <li>Export your data in a machine-readable format</li>
                <li>Disconnect your GitHub account at any time</li>
                <li>Delete your account and all associated data</li>
                <li>Opt out of non-essential communications</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Cookies
              </h2>
              <p className="text-slate-600">
                We use essential cookies for authentication and session management.
                We use analytics cookies only with your consent. You can manage
                cookie preferences in your browser settings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-slate-600">
                We may update this policy from time to time. We will notify you of
                significant changes by email or through the service. Your continued
                use after changes constitutes acceptance of the new policy.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
                Contact Us
              </h2>
              <p className="text-slate-600">
                If you have questions about this Privacy Policy, please contact us
                at{" "}
                <a
                  href="mailto:privacy@promptsuite.com"
                  className="text-blue-600 hover:underline"
                >
                  privacy@promptsuite.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
