"use client";

import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Shield,
  Lock,
  Key,
  Server,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Mail,
  ExternalLink,
} from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Encryption at Rest",
    description:
      "All data is encrypted using AES-256 encryption. API keys use envelope encryption with regularly rotated master keys.",
  },
  {
    icon: Server,
    title: "Encryption in Transit",
    description:
      "All connections use TLS 1.3. We enforce HSTS and use certificate pinning for sensitive operations.",
  },
  {
    icon: Key,
    title: "Secure Key Storage",
    description:
      "Your API keys are stored encrypted and never logged. We use hardware security modules (HSMs) for key management.",
  },
  {
    icon: Eye,
    title: "Access Controls",
    description:
      "Role-based access control (RBAC) ensures team members only see what they need. Full audit logging of all access.",
  },
];

const certifications = [
  { name: "SOC 2 Type II", status: "In Progress", expected: "Q2 2026" },
  { name: "GDPR Compliant", status: "Compliant", expected: null },
  { name: "CCPA Compliant", status: "Compliant", expected: null },
  { name: "ISO 27001", status: "Planned", expected: "Q4 2026" },
];

const practices = [
  "All code changes require peer review",
  "Automated security scanning in CI/CD pipeline",
  "Regular penetration testing by third-party firms",
  "Bug bounty program for responsible disclosure",
  "Employee security training and background checks",
  "Incident response plan with 24/7 on-call",
  "Regular backup and disaster recovery testing",
  "Minimal data retention policies",
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-7 w-7 text-emerald-600" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Security at PromptSuite
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              We take security seriously. Your code, prompts, and data are
              protected by industry-leading security practices.
            </p>
          </div>

          {/* Trust Banner */}
          <div className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Your trust is our priority
            </h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              PromptSuite is designed from the ground up with security in mind.
              We never access your code unless you explicitly grant permission,
              and we never store your AI responses beyond your session.
            </p>
          </div>

          {/* Security Features */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-10">
              Security Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-10">
              Compliance & Certifications
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-slate-200 bg-white text-center"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {cert.name}
                  </h3>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      cert.status === "Compliant"
                        ? "bg-emerald-100 text-emerald-700"
                        : cert.status === "In Progress"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cert.status === "Compliant" && (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    {cert.status}
                  </div>
                  {cert.expected && (
                    <p className="text-xs text-slate-500 mt-2">
                      Expected: {cert.expected}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security Practices */}
          <div className="mb-12 sm:mb-16 grid lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                Our Security Practices
              </h2>
              <ul className="space-y-3">
                {practices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700">
                      {practice}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Bug Bounty */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white mb-6">
                <AlertTriangle className="h-8 w-8 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Bug Bounty Program</h3>
                <p className="text-slate-300 mb-4">
                  Found a security vulnerability? We reward responsible
                  disclosure. Report issues to our security team and get
                  recognized for helping keep PromptSuite secure.
                </p>
                <a
                  href="mailto:security@promptsuite.com"
                  className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  security@promptsuite.com
                </a>
              </div>

              {/* Security Contact */}
              <div className="p-6 rounded-xl border border-slate-200 bg-white">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Security Questions?
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  If you have questions about our security practices or need a
                  security questionnaire completed, contact our security team.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                >
                  Contact Security Team
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Data Handling */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 border border-blue-100">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              How We Handle Your Data
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Code Access</h3>
                <p className="text-sm text-slate-600">
                  We only access code you explicitly connect. File contents are
                  processed for prompt detection and not stored permanently.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">API Keys</h3>
                <p className="text-sm text-slate-600">
                  Your API keys are encrypted and only used when you execute
                  tests. They are never logged or exposed in any way.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">AI Responses</h3>
                <p className="text-sm text-slate-600">
                  Test responses are only stored if you choose to save them.
                  Session data is cleared when you log out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
