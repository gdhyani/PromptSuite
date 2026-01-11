"use client";

import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import type { Route } from "next";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features", isHash: true },
    { name: "Changelog", href: "/changelog" as Route, isHash: false },
    { name: "Roadmap", href: "/roadmap" as Route, isHash: false },
    { name: "API", href: "/docs" as Route, isHash: false },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" as Route, isHash: false },
    { name: "Guides", href: "/guides" as Route, isHash: false },
    { name: "Blog", href: "/blog" as Route, isHash: false },
    { name: "Support", href: "/contact" as Route, isHash: false },
  ],
  Company: [
    { name: "About", href: "/about" as Route, isHash: false },
    { name: "Contact", href: "/contact" as Route, isHash: false },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" as Route, isHash: false },
    { name: "Terms", href: "/terms" as Route, isHash: false },
    { name: "Security", href: "/security" as Route, isHash: false },
    { name: "Status", href: "/status" as Route, isHash: false },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/promptsuite" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/promptsuite" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/promptsuite" },
];

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 mb-4">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25">
                <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-slate-900">
                PromptSuite
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6 max-w-xs">
              The complete platform for managing, testing, and optimizing AI
              prompts in your applications.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors"
                >
                  <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-sm">
                {category}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.isHash ? (
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href as Route}
                        className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} PromptSuite. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
