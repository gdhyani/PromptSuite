"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../services/analyticsService";
import { logger } from "@/lib/logger";

export const analyticsKeys = {
  all: ["analytics"] as const,
  project: (projectId: string) => [...analyticsKeys.all, "project", projectId] as const,
  daily: (projectId: string, startDate?: string, endDate?: string) =>
    [...analyticsKeys.all, "daily", projectId, startDate, endDate] as const,
  costs: (projectId: string) => [...analyticsKeys.all, "costs", projectId] as const,
};

export function useProjectAnalytics(projectId: string) {
  return useQuery({
    queryKey: analyticsKeys.project(projectId),
    queryFn: () => {
      logger.info("Fetching project analytics", { projectId });
      return analyticsService.getProjectAnalytics(projectId);
    },
    enabled: !!projectId,
    staleTime: 60000, // 1 minute
  });
}

export function useDailyAnalytics(projectId: string, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: analyticsKeys.daily(projectId, startDate, endDate),
    queryFn: () => {
      logger.info("Fetching daily analytics", { projectId, startDate, endDate });
      return analyticsService.getDailyAnalytics(projectId, startDate, endDate);
    },
    enabled: !!projectId,
    staleTime: 60000,
  });
}

export function useCostBreakdown(projectId: string) {
  return useQuery({
    queryKey: analyticsKeys.costs(projectId),
    queryFn: () => {
      logger.info("Fetching cost breakdown", { projectId });
      return analyticsService.getCostBreakdown(projectId);
    },
    enabled: !!projectId,
    staleTime: 60000,
  });
}
