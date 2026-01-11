import { apiClient } from "@/lib/api/client";
import type { LogsResponse, LogFilters } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const logsService = {
  async getLogs(
    projectId: string,
    filters?: Partial<LogFilters>,
    page = 1,
    pageSize = 50
  ): Promise<LogsResponse> {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));

    if (filters?.search) params.set("search", filters.search);
    if (filters?.model) params.set("model", filters.model);
    if (filters?.status && filters.status !== "all") params.set("status", filters.status);
    if (filters?.dateRange?.start) params.set("startDate", filters.dateRange.start);
    if (filters?.dateRange?.end) params.set("endDate", filters.dateRange.end);
    if (filters?.tags?.length) params.set("tags", filters.tags.join(","));

    const response = await apiClient.get<ApiResponse<LogsResponse>>(
      `/api/projects/${projectId}/logs?${params.toString()}`
    );
    return response.data.data;
  },

  async addTags(runId: string, tags: string[]): Promise<void> {
    await apiClient.post(`/api/runs/${runId}/tags`, { tags });
  },

  async updateMetadata(runId: string, metadata: Record<string, unknown>): Promise<void> {
    await apiClient.put(`/api/runs/${runId}/metadata`, { metadata });
  },
};
