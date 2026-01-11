"use client";

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { logsService } from "../services/logsService";
import type { LogFilters } from "../types";
import { logger } from "@/lib/logger";

export const logsKeys = {
  all: ["logs"] as const,
  lists: () => [...logsKeys.all, "list"] as const,
  list: (projectId: string, filters?: Partial<LogFilters>) =>
    [...logsKeys.lists(), projectId, filters] as const,
};

export function useLogs(projectId: string, filters?: Partial<LogFilters>) {
  return useInfiniteQuery({
    queryKey: logsKeys.list(projectId, filters),
    queryFn: ({ pageParam = 1 }) => {
      logger.info("Fetching logs", { projectId, page: pageParam });
      return logsService.getLogs(projectId, filters, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!projectId,
    staleTime: 30000,
  });
}

export function useAddTags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ runId, tags }: { runId: string; tags: string[] }) => {
      logger.info("Adding tags", { runId, tags });
      return logsService.addTags(runId, tags);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: logsKeys.lists() });
    },
    onError: (error) => {
      logger.error("Failed to add tags", { error });
    },
  });
}

export function useUpdateMetadata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ runId, metadata }: { runId: string; metadata: Record<string, unknown> }) => {
      logger.info("Updating metadata", { runId });
      return logsService.updateMetadata(runId, metadata);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: logsKeys.lists() });
    },
    onError: (error) => {
      logger.error("Failed to update metadata", { error });
    },
  });
}
