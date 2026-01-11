"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Mail,
  MessageSquare,
  Github,
  Twitter,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "For general inquiries and support",
    value: "hello@promptsuite.com",
    href: "mailto:hello@promptsuite.com",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: MessageSquare,
    title: "Discord",
    description: "Join our community for real-time help",
    value: "discord.gg/promptsuite",
    href: "https://discord.gg/promptsuite",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Report bugs or request features",
    value: "github.com/promptsuite",
    href: "https://github.com/promptsuite/promptsuite",
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  {
    icon: Twitter,
    title: "Twitter",
    description: "Follow us for updates and news",
    value: "@promptsuite",
    href: "https://twitter.com/promptsuite",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2 sm:mb-3">
              Contact
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Get in touch
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hi? We&apos;d love to
              hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                  Send us a message
                </h2>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all bg-white">
                      <option value="">Select a topic</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${method.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <method.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${method.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-1">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        {method.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Response time */}
              <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">Response Time</h3>
                </div>
                <p className="text-sm text-slate-600">
                  We typically respond within 24 hours on business days. For
                  urgent issues, please reach out on Discord for faster support.
                </p>
              </div>

              {/* Location */}
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">Location</h3>
                </div>
                <p className="text-sm text-slate-600">
                  We&apos;re a fully remote team with members across the globe. Our
                  company is incorporated in San Francisco, CA.
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
