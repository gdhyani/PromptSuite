import { apiClient } from "@/lib/api/client";
import type { ProviderSettings, SaveProviderInput, UserSettings } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const settingsService = {
  async getProviders(): Promise<ProviderSettings[]> {
    const response = await apiClient.get<ApiResponse<ProviderSettings[]>>("/api/settings/providers");
    return response.data.data;
  },

  async saveProvider(input: SaveProviderInput): Promise<ProviderSettings> {
    const response = await apiClient.post<ApiResponse<ProviderSettings>>(
      "/api/settings/providers",
      input
    );
    return response.data.data;
  },

  async deleteProvider(provider: string): Promise<void> {
    await apiClient.delete("/api/settings/providers", { data: { provider } });
  },

  async getSettings(): Promise<UserSettings> {
    const response = await apiClient.get<ApiResponse<UserSettings>>("/api/settings");
    return response.data.data;
  },
};
