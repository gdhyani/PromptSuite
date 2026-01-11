import { apiClient } from "@/lib/api/client";
import type { ProjectAnalytics, DailyAnalytics, CostBreakdown } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const analyticsService = {
  async getProjectAnalytics(projectId: string): Promise<ProjectAnalytics> {
    const response = await apiClient.get<ApiResponse<ProjectAnalytics>>(
      `/api/projects/${projectId}/analytics`
    );
    return response.data.data;
  },

  async getDailyAnalytics(projectId: string, startDate?: string, endDate?: string): Promise<DailyAnalytics[]> {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const response = await apiClient.get<ApiResponse<DailyAnalytics[]>>(
      `/api/projects/${projectId}/analytics/daily?${params.toString()}`
    );
    return response.data.data;
  },

  async getCostBreakdown(projectId: string): Promise<CostBreakdown[]> {
    const response = await apiClient.get<ApiResponse<CostBreakdown[]>>(
      `/api/projects/${projectId}/costs`
    );
    return response.data.data;
  },
};
