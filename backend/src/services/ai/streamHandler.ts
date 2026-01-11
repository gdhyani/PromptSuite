import { Response } from "express";
import OpenAI from "openai";
import { logger } from "../../lib/logger.js";

interface StreamExecuteInput {
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  model: string;
  temperature?: number;
  maxTokens?: number;
  apiKey: string;
}

export async function executeStreamingPrompt(
  input: StreamExecuteInput,
  res: Response
): Promise<void> {
  logger.info("Starting streaming execution", { model: input.model });

  const openai = new OpenAI({ apiKey: input.apiKey });

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const startTime = Date.now();
  let fullContent = "";
  let promptTokens = 0;
  let completionTokens = 0;

  try {
    const stream = await openai.chat.completions.create({
      model: input.model,
      messages: input.messages,
      temperature: input.temperature,
      max_tokens: input.maxTokens,
      stream: true,
      stream_options: { include_usage: true },
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;
      const content = delta?.content || "";

      if (content) {
        fullContent += content;
        // Send content chunk
        res.write(`data: ${JSON.stringify({ type: "content", content })}\n\n`);
      }

      // Check for usage in the final chunk
      if (chunk.usage) {
        promptTokens = chunk.usage.prompt_tokens;
        completionTokens = chunk.usage.completion_tokens;
      }

      // Check for finish reason
      if (chunk.choices[0]?.finish_reason) {
        const latencyMs = Date.now() - startTime;

        // Send completion event
        res.write(
          `data: ${JSON.stringify({
            type: "done",
            usage: {
              promptTokens,
              completionTokens,
              totalTokens: promptTokens + completionTokens,
            },
            latencyMs,
            finishReason: chunk.choices[0].finish_reason,
          })}\n\n`
        );
      }
    }

    logger.info("Streaming completed", {
      model: input.model,
      tokens: promptTokens + completionTokens,
      latencyMs: Date.now() - startTime,
    });
  } catch (error: any) {
    logger.error("Streaming error", { error: error.message });
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        error: error.message || "Streaming failed",
      })}\n\n`
    );
  } finally {
    res.end();
  }
}
