import { apiClient } from "@/lib/api/client";
import type { DetectedPrompt, PromptVersion, CreateVersionInput } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const promptService = {
  async getByProject(projectId: string): Promise<DetectedPrompt[]> {
    const response = await apiClient.get<ApiResponse<DetectedPrompt[]>>(
      `/api/projects/${projectId}/prompts`
    );
    return response.data.data;
  },

  async getById(id: string): Promise<DetectedPrompt> {
    const response = await apiClient.get<ApiResponse<DetectedPrompt>>(`/api/prompts/${id}`);
    return response.data.data;
  },

  async getVersions(promptId: string): Promise<PromptVersion[]> {
    const response = await apiClient.get<ApiResponse<PromptVersion[]>>(
      `/api/prompts/${promptId}/versions`
    );
    return response.data.data;
  },

  async createVersion(promptId: string, data: CreateVersionInput): Promise<PromptVersion> {
    const response = await apiClient.post<ApiResponse<PromptVersion>>(
      `/api/prompts/${promptId}/versions`,
      data
    );
    return response.data.data;
  },
};
