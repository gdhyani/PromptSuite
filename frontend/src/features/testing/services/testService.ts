import { apiClient } from "@/lib/api/client";
import type { TestRun, TestExecutionInput } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const testService = {
  async execute(input: TestExecutionInput): Promise<TestRun> {
    const response = await apiClient.post<ApiResponse<TestRun>>("/api/test", input);
    return response.data.data;
  },

  async executeStream(
    input: TestExecutionInput,
    onChunk: (content: string) => void,
    onComplete: (usage: { promptTokens: number; completionTokens: number; totalTokens: number }) => void,
    onError: (error: string) => void
  ): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const response = await fetch(`${apiUrl}/api/test/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Stream request failed");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));

            switch (data.type) {
              case "content":
                onChunk(data.data);
                break;
              case "usage":
                onComplete(data.usage);
                break;
              case "error":
                onError(data.error);
                break;
            }
          } catch {
            // Ignore JSON parse errors for incomplete chunks
          }
        }
      }
    }
  },

  async getByPrompt(promptId: string): Promise<TestRun[]> {
    const response = await apiClient.get<ApiResponse<TestRun[]>>(
      `/api/test/prompts/${promptId}/runs`
    );
    return response.data.data;
  },

  async toggleStar(runId: string): Promise<TestRun> {
    const response = await apiClient.post<ApiResponse<TestRun>>(`/api/test/runs/${runId}/star`);
    return response.data.data;
  },
};
