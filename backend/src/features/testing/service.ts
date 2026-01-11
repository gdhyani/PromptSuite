import { TestRun } from "../../models/TestRun.js";
import { logger } from "../../lib/logger.js";
import { NotFoundError, ValidationError } from "../../lib/errors.js";
import { aiProxyService } from "../../services/ai/proxy.js";
import { costCalculator } from "../../services/cost/calculator.js";
import type { TestExecutionInput, TestRunResponse } from "./types.js";

function toTestRunResponse(run: any): TestRunResponse {
  return {
    id: run._id.toString(),
    promptId: run.promptId?.toString() || null,
    input: run.input,
    output: run.output,
    provider: run.provider,
    model: run.model,
    starred: run.starred,
    cost: run.cost,
    createdAt: run.createdAt.toISOString(),
  };
}

export const testingService = {
  async executeTest(userId: string, input: TestExecutionInput): Promise<TestRunResponse> {
    logger.info("Executing test", { userId, model: input.config.model });

    if (!input.apiKey) {
      throw new ValidationError("API key is required for test execution");
    }

    const startTime = Date.now();

    // Execute the prompt via AI proxy
    const result = await aiProxyService.execute({
      messages: input.messages.map((m) => ({
        role: m.role as "system" | "user" | "assistant",
        content: m.content,
      })),
      model: input.config.model,
      temperature: input.config.temperature ?? undefined,
      maxTokens: input.config.maxTokens ?? undefined,
      apiKey: input.apiKey,
    });

    const latencyMs = Date.now() - startTime;

    // Calculate costs
    const cost = costCalculator.calculate(
      input.config.model,
      result.usage.promptTokens,
      result.usage.completionTokens
    );

    // Save test run
    const testRun = await TestRun.create({
      promptId: input.promptId || null,
      userId,
      input: {
        variables: input.variables || {},
        config: {
          model: input.config.model,
          temperature: input.config.temperature ?? null,
          maxTokens: input.config.maxTokens ?? null,
        },
        messages: input.messages,
      },
      output: {
        response: result.content,
        usage: result.usage,
        latencyMs,
        finishReason: result.finishReason,
      },
      provider: "openai",
      model: input.config.model,
      cost,
    });

    logger.info("Test executed", {
      testRunId: testRun._id,
      latencyMs,
      tokens: result.usage.totalTokens,
    });

    return toTestRunResponse(testRun);
  },

  async getByPrompt(promptId: string, userId: string): Promise<TestRunResponse[]> {
    logger.debug("testingService.getByPrompt", { promptId });

    const runs = await TestRun.find({ promptId, userId })
      .sort({ createdAt: -1 })
      .limit(50);

    return runs.map(toTestRunResponse);
  },

  async toggleStar(runId: string, userId: string): Promise<TestRunResponse> {
    logger.debug("testingService.toggleStar", { runId });

    const run = await TestRun.findOne({ _id: runId, userId });
    if (!run) {
      throw new NotFoundError("Test run not found", { runId });
    }

    run.starred = !run.starred;
    await run.save();

    logger.info("Test run star toggled", { runId, starred: run.starred });
    return toTestRunResponse(run);
  },
};
