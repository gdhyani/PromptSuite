"use client";

import { useState, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { testService } from "../services/testService";
import { testRunKeys } from "./useTestRuns";
import type { TestExecutionInput, TestStatus } from "../types";
import { logger } from "@/lib/logger";

interface UseStreamTestOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onChunk?: (content: string, fullContent: string) => void;
}

export function useStreamTest(options: UseStreamTestOptions = {}) {
  const [status, setStatus] = useState<TestStatus>("idle");
  const [response, setResponse] = useState("");
  const [usage, setUsage] = useState<{
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const responseRef = useRef("");
  const queryClient = useQueryClient();

  const execute = useCallback(
    async (input: TestExecutionInput) => {
      setStatus("running");
      setResponse("");
      setUsage(null);
      setError(null);
      responseRef.current = "";

      logger.info("Executing streaming test", { model: input.config.model, promptId: input.promptId });

      try {
        await testService.executeStream(
          input,
          // onChunk
          (content) => {
            responseRef.current += content;
            setResponse(responseRef.current);
            options.onChunk?.(content, responseRef.current);
          },
          // onComplete
          (tokenUsage) => {
            setUsage(tokenUsage);
            setStatus("success");
            options.onSuccess?.();

            if (input.promptId) {
              queryClient.invalidateQueries({ queryKey: testRunKeys.byPrompt(input.promptId) });
            }

            logger.info("Streaming test completed", {
              promptId: input.promptId,
              tokens: tokenUsage.totalTokens,
            });
          },
          // onError
          (errorMessage) => {
            setError(errorMessage);
            setStatus("error");
            options.onError?.(errorMessage);
            logger.error("Streaming test failed", { error: errorMessage });
          }
        );
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Stream execution failed";
        setError(errorMessage);
        setStatus("error");
        options.onError?.(errorMessage);
        logger.error("Stream execution failed", { error: errorMessage });
      }
    },
    [queryClient, options]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setResponse("");
    setUsage(null);
    setError(null);
    responseRef.current = "";
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
