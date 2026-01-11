"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Github, Key, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

export default function LoginPage() {
  const [pat, setPat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithPat, loginWithGitHub } = useAuth();

  const handlePatLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pat.trim()) {
      toast.error("Please enter a Personal Access Token");
      return;
    }

    setIsLoading(true);
    try {
      await loginWithPat(pat);
      toast.success("Login successful!");
    } catch {
      toast.error("Invalid token. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    loginWithGitHub();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 light">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 via-transparent to-indigo-100/40 rounded-full blur-3xl" />

      <div className="w-full max-w-md z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900">PromptSuite</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
            <p className="text-sm text-slate-500">
              Sign in to your account to continue managing your prompts
            </p>
          </div>

          <div className="space-y-4">
            {/* GitHub OAuth */}
            <Button
              onClick={handleGitHubLogin}
              className="w-full h-11 gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-lg shadow-slate-900/10"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-medium">Or</span>
              </div>
            </div>

            {/* PAT Login */}
            <form onSubmit={handlePatLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pat" className="text-sm font-medium text-slate-700">
                  Personal Access Token
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="pat"
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxx"
                    value={pat}
                    onChange={(e) => setPat(e.target.value)}
                    className="pl-10 h-11 bg-slate-50 border-slate-200 font-mono text-sm focus:border-blue-300 focus:ring-blue-200"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Create a{" "}
                  <a
                    href="https://github.com/settings/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    GitHub Personal Access Token
                  </a>{" "}
                  with repo scope
                </p>
              </div>
              <Button
                type="submit"
                variant="outline"
                className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in with Token"
                )}
              </Button>
            </form>

            <p className="text-xs text-center text-slate-500 pt-4">
              By continuing, you agree to our{" "}
              <Link href={"/terms" as Route} className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={"/privacy" as Route} className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have a GitHub account?{" "}
          <a
            href="https://github.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
