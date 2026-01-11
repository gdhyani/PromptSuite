"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { testService } from "../services/testService";
import { testRunKeys } from "./useTestRuns";
import type { TestExecutionInput, TestStatus } from "../types";
import { logger } from "@/lib/logger";

interface UseExecuteTestOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useExecuteTest(options: UseExecuteTestOptions = {}) {
  const [status, setStatus] = useState<TestStatus>("idle");
  const [response, setResponse] = useState("");
  const [usage, setUsage] = useState<{
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const execute = useCallback(
    async (input: TestExecutionInput) => {
      setStatus("running");
      setResponse("");
      setUsage(null);
      setError(null);

      logger.info("Executing test", { model: input.config.model, promptId: input.promptId });

      try {
        const result = await testService.execute(input);
        setResponse(result.output.response);
        setUsage(result.output.usage);
        setStatus("success");

        if (input.promptId) {
          queryClient.invalidateQueries({ queryKey: testRunKeys.byPrompt(input.promptId) });
        }

        options.onSuccess?.();
        logger.info("Test executed", {
          promptId: input.promptId,
          latencyMs: result.output.latencyMs,
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Test execution failed";
        setError(errorMessage);
        setStatus("error");
        options.onError?.(errorMessage);
        logger.error("Test execution failed", { error: errorMessage });
      }
    },
    [queryClient, options]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setResponse("");
    setUsage(null);
    setError(null);
  }, []);

  return {
    execute,
    reset,
    status,
    response,
    usage,
    error,
    isRunning: status === "running",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
