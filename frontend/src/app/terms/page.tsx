"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FileText, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-7 w-7 text-blue-600" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500">
              Last updated: January 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 mb-8">
              <p className="text-sm sm:text-base text-slate-700 m-0">
                By using PromptSuite, you agree to these terms. Please read them
                carefully before using our service.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600">
                By accessing or using PromptSuite (&quot;Service&quot;), you agree to be
                bound by these Terms of Service (&quot;Terms&quot;). If you disagree with
                any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-slate-600">
                PromptSuite is a prompt management and testing platform that allows
                users to detect, edit, test, and optimize AI prompts from their
                codebases. The Service includes web applications, APIs, and related
                tools.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                3. User Accounts
              </h2>
              <ul className="space-y-2 text-slate-600">
                <li>You must provide accurate information when creating an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>You may not share your account credentials with others</li>
                <li>One person or entity may not maintain multiple accounts</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                4. Acceptable Use
              </h2>
              <p className="text-slate-600 mb-4">You agree not to:</p>
              <ul className="space-y-2 text-slate-600">
                <li>Use the Service for any illegal purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service to send spam or malicious content</li>
                <li>Resell or redistribute the Service without permission</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-slate-600 mb-4">
                <strong>Your Content:</strong> You retain ownership of all prompts,
                code, and content you submit to the Service. By using the Service,
                you grant us a limited license to process this content solely to
                provide the Service.
              </p>
              <p className="text-slate-600">
                <strong>Our Content:</strong> The Service, including its original
                content, features, and functionality, is owned by PromptSuite and
                protected by international copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-slate-600">
                The Service integrates with third-party services including GitHub
                and AI providers (OpenAI, Anthropic, etc.). Your use of these
                services is subject to their respective terms and policies. We are
                not responsible for the content, privacy policies, or practices of
                third-party services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                7. API Usage
              </h2>
              <p className="text-slate-600">
                When using our API, you must comply with our API documentation and
                rate limits. We reserve the right to throttle or suspend API access
                for abuse or excessive usage.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-slate-600">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND.
                WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT
                LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-slate-600">
                IN NO EVENT SHALL PROMPTSUITE BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF
                PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                10. Termination
              </h2>
              <p className="text-slate-600">
                We may terminate or suspend your account at any time for violations
                of these Terms. Upon termination, your right to use the Service
                ceases immediately. You may also delete your account at any time
                through the settings page.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-slate-600">
                We reserve the right to modify these Terms at any time. We will
                notify you of material changes via email or through the Service.
                Your continued use after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                12. Governing Law
              </h2>
              <p className="text-slate-600">
                These Terms are governed by the laws of the State of California,
                United States, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
                Contact
              </h2>
              <p className="text-slate-600">
                For questions about these Terms, please contact us at{" "}
                <a
                  href="mailto:legal@promptsuite.com"
                  className="text-blue-600 hover:underline"
                >
                  legal@promptsuite.com
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
