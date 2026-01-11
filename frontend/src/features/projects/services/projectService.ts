import { apiClient } from "@/lib/api/client";
import type { Project, CreateProjectInput, ProjectStats } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const projectService = {
  async getAll(): Promise<Project[]> {
    const response = await apiClient.get<ApiResponse<Project[]>>("/api/projects");
    return response.data.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await apiClient.get<ApiResponse<Project>>(`/api/projects/${id}`);
    return response.data.data;
  },

  async create(data: CreateProjectInput): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>("/api/projects", data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/projects/${id}`);
  },

  async scan(id: string): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>(`/api/projects/${id}/scan`);
    return response.data.data;
  },

  async getStats(id: string): Promise<ProjectStats> {
    const response = await apiClient.get<ApiResponse<ProjectStats>>(
      `/api/projects/${id}/analytics`
    );
    return response.data.data;
  },
};
