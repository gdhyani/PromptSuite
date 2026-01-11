"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../services/projectService";
import type { CreateProjectInput } from "../types";
import { logger } from "@/lib/logger";

export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  stats: (id: string) => [...projectKeys.all, "stats", id] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: () => {
      logger.info("Fetching projects");
      return projectService.getAll();
    },
    staleTime: 30000, // 30 seconds
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => {
      logger.info("Fetching project", { projectId: id });
      return projectService.getById(id);
    },
    enabled: !!id,
    staleTime: 30000,
  });
}

export function useProjectStats(id: string) {
  return useQuery({
    queryKey: projectKeys.stats(id),
    queryFn: () => {
      logger.info("Fetching project stats", { projectId: id });
      return projectService.getStats(id);
    },
    enabled: !!id,
    staleTime: 60000, // 1 minute
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectInput) => {
      logger.info("Creating project", { name: data.name });
      return projectService.create(data);
    },
    onSuccess: (project) => {
      logger.info("Project created", { projectId: project.id });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      logger.error("Failed to create project", { error });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      logger.info("Deleting project", { projectId: id });
      return projectService.delete(id);
    },
    onSuccess: (_, id) => {
      logger.info("Project deleted", { projectId: id });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.removeQueries({ queryKey: projectKeys.detail(id) });
    },
    onError: (error) => {
      logger.error("Failed to delete project", { error });
    },
  });
}

export function useScanProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      logger.info("Scanning project", { projectId: id });
      return projectService.scan(id);
    },
    onSuccess: (project) => {
      logger.info("Project scan complete", {
        projectId: project.id,
        promptCount: project.promptCount,
      });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(project.id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      logger.error("Failed to scan project", { error });
    },
  });
}
