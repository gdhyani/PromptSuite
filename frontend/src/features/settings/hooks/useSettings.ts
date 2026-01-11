"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "../services/settingsService";
import type { SaveProviderInput } from "../types";
import { logger } from "@/lib/logger";

export const settingsKeys = {
  all: ["settings"] as const,
  providers: () => [...settingsKeys.all, "providers"] as const,
  settings: () => [...settingsKeys.all, "full"] as const,
};

export function useProviders() {
  return useQuery({
    queryKey: settingsKeys.providers(),
    queryFn: () => {
      logger.info("Fetching providers");
      return settingsService.getProviders();
    },
    staleTime: 60000,
  });
}

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.settings(),
    queryFn: () => {
      logger.info("Fetching settings");
      return settingsService.getSettings();
    },
    staleTime: 60000,
  });
}

export function useSaveProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SaveProviderInput) => {
      logger.info("Saving provider", { provider: input.provider });
      return settingsService.saveProvider(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.providers() });
      queryClient.invalidateQueries({ queryKey: settingsKeys.settings() });
    },
    onError: (error) => {
      logger.error("Failed to save provider", { error });
    },
  });
}

export function useDeleteProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (provider: string) => {
      logger.info("Deleting provider", { provider });
      return settingsService.deleteProvider(provider);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.providers() });
      queryClient.invalidateQueries({ queryKey: settingsKeys.settings() });
    },
    onError: (error) => {
      logger.error("Failed to delete provider", { error });
    },
  });
}
