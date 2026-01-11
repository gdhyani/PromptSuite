"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (token) {
      handleAuthCallback(token);
    } else {
      router.push("/login?error=No token provided");
    }
  }, [searchParams, handleAuthCallback, router]);

  return (
    <div className="flex items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>Completing authentication...</span>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>Loading...</span>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="text-center z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-2xl tracking-tight">PromptSuite</span>
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <AuthCallbackContent />
        </Suspense>
      </div>
    </div>
  );
}
