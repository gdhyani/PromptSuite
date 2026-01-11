"use client";

import { useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { userAtom, tokenAtom, isAuthLoadingAtom } from "../store/authAtoms";
import { authService } from "../services/authService";
import { logger } from "@/lib/logger";

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isLoading, setIsLoading] = useAtom(isAuthLoadingAtom);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = authService.getToken();
      if (storedToken) {
        setToken(storedToken);
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          logger.info("User authenticated", { userId: userData.id });
        } catch (error) {
          logger.error("Failed to fetch user", { error });
          authService.clearToken();
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [setToken, setUser, setIsLoading]);

  const loginWithPat = useCallback(
    async (pat: string) => {
      try {
        const response = await authService.loginWithPat(pat);
        authService.setToken(response.token);
        setToken(response.token);
        setUser(response.user);
        logger.info("Login successful", { userId: response.user.id });
        router.push("/dashboard");
      } catch (error) {
        logger.error("Login failed", { error });
        throw error;
      }
    },
    [setToken, setUser, router]
  );

  const loginWithGitHub = useCallback(() => {
    window.location.href = authService.getGitHubAuthUrl();
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      logger.warn("Logout API call failed", { error });
    }
    authService.clearToken();
    setToken(null);
    setUser(null);
    router.push("/login");
  }, [setToken, setUser, router]);

  const handleAuthCallback = useCallback(
    (callbackToken: string) => {
      authService.setToken(callbackToken);
      setToken(callbackToken);
      authService.getCurrentUser().then((userData) => {
        setUser(userData);
        router.push("/dashboard");
      });
    },
    [setToken, setUser, router]
  );

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    loginWithPat,
    loginWithGitHub,
    logout,
    handleAuthCallback,
  };
}
