"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { promptService } from "../services/promptService";
import type { CreateVersionInput } from "../types";
import { logger } from "@/lib/logger";

export const promptKeys = {
  all: ["prompts"] as const,
  lists: () => [...promptKeys.all, "list"] as const,
  list: (projectId: string) => [...promptKeys.lists(), projectId] as const,
  details: () => [...promptKeys.all, "detail"] as const,
  detail: (id: string) => [...promptKeys.details(), id] as const,
  versions: (promptId: string) => [...promptKeys.all, "versions", promptId] as const,
};

export function usePrompts(projectId: string) {
  return useQuery({
    queryKey: promptKeys.list(projectId),
    queryFn: () => {
      logger.info("Fetching prompts", { projectId });
      return promptService.getByProject(projectId);
    },
    enabled: !!projectId,
    staleTime: 30000,
  });
}

export function usePrompt(id: string) {
  return useQuery({
    queryKey: promptKeys.detail(id),
    queryFn: () => {
      logger.info("Fetching prompt", { promptId: id });
      return promptService.getById(id);
    },
    enabled: !!id,
    staleTime: 30000,
  });
}

export function usePromptVersions(promptId: string) {
  return useQuery({
    queryKey: promptKeys.versions(promptId),
    queryFn: () => {
      logger.info("Fetching prompt versions", { promptId });
      return promptService.getVersions(promptId);
    },
    enabled: !!promptId,
    staleTime: 30000,
  });
}

export function useCreatePromptVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ promptId, data }: { promptId: string; data: CreateVersionInput }) => {
      logger.info("Creating prompt version", { promptId });
      return promptService.createVersion(promptId, data);
    },
    onSuccess: (version, { promptId }) => {
      logger.info("Prompt version created", { promptId, versionId: version.id });
      queryClient.invalidateQueries({ queryKey: promptKeys.versions(promptId) });
      queryClient.invalidateQueries({ queryKey: promptKeys.detail(promptId) });
    },
    onError: (error) => {
      logger.error("Failed to create prompt version", { error });
    },
  });
}
