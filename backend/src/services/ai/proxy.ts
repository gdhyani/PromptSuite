import OpenAI from "openai";
import { logger } from "../../lib/logger.js";
import { InternalError } from "../../lib/errors.js";

interface ExecuteInput {
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  model: string;
  temperature?: number;
  maxTokens?: number;
  apiKey: string;
}

interface ExecuteResult {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
}

export const aiProxyService = {
  async execute(input: ExecuteInput): Promise<ExecuteResult> {
    logger.debug("aiProxyService.execute", { model: input.model });

    try {
      const openai = new OpenAI({ apiKey: input.apiKey });

      const response = await openai.chat.completions.create({
        model: input.model,
        messages: input.messages,
        temperature: input.temperature,
        max_tokens: input.maxTokens,
      });

      const choice = response.choices[0];
      const usage = response.usage;

      return {
        content: choice.message.content || "",
        usage: {
          promptTokens: usage?.prompt_tokens || 0,
          completionTokens: usage?.completion_tokens || 0,
          totalTokens: usage?.total_tokens || 0,
        },
        finishReason: choice.finish_reason || "stop",
      };
    } catch (error: any) {
      logger.error("AI execution failed", {
        error: error.message,
        model: input.model,
      });

      if (error.status === 401) {
        throw new InternalError("Invalid API key");
      }
      if (error.status === 429) {
        throw new InternalError("Rate limit exceeded");
      }

      throw new InternalError(`AI execution failed: ${error.message}`);
    }
  },
};
