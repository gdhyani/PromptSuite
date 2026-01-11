import { apiClient } from "@/lib/api/client";
import type { User, LoginResponse } from "../types";

export const authService = {
  async loginWithPat(token: string): Promise<LoginResponse> {
    const response = await apiClient.post<{ success: boolean; data: LoginResponse }>(
      "/api/auth/pat",
      { token }
    );
    return response.data.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ success: boolean; data: User }>("/api/auth/me");
    return response.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/api/auth/logout");
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },

  getGitHubAuthUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    return `${apiUrl}/api/auth/github`;
  },

  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};
