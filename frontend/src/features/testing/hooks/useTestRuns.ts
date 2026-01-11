"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testService } from "../services/testService";
import { logger } from "@/lib/logger";

export const testRunKeys = {
  all: ["testRuns"] as const,
  lists: () => [...testRunKeys.all, "list"] as const,
  byPrompt: (promptId: string) => [...testRunKeys.lists(), promptId] as const,
  details: () => [...testRunKeys.all, "detail"] as const,
  detail: (id: string) => [...testRunKeys.details(), id] as const,
};

export function useTestRuns(promptId: string) {
  return useQuery({
    queryKey: testRunKeys.byPrompt(promptId),
    queryFn: () => {
      logger.info("Fetching test runs", { promptId });
      return testService.getByPrompt(promptId);
    },
    enabled: !!promptId,
    staleTime: 30000,
  });
}

export function useToggleStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (runId: string) => {
      logger.info("Toggling star", { runId });
      return testService.toggleStar(runId);
    },
    onSuccess: (run) => {
      logger.info("Star toggled", { runId: run.id, starred: run.starred });
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: testRunKeys.lists() });
    },
    onError: (error) => {
      logger.error("Failed to toggle star", { error });
    },
  });
}
