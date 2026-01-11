import { logger } from "../../lib/logger.js";

// Pricing per 1M tokens (USD)
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  "gpt-4": { input: 30.0, output: 60.0 },
  "gpt-4-turbo": { input: 10.0, output: 30.0 },
  "gpt-4-turbo-preview": { input: 10.0, output: 30.0 },
  "gpt-4o": { input: 5.0, output: 15.0 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
  "gpt-3.5-turbo-16k": { input: 3.0, output: 4.0 },
  "claude-3-opus": { input: 15.0, output: 75.0 },
  "claude-3-sonnet": { input: 3.0, output: 15.0 },
  "claude-3-haiku": { input: 0.25, output: 1.25 },
};

const DEFAULT_PRICING = { input: 10.0, output: 30.0 };

interface CostResult {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: string;
}

export const costCalculator = {
  calculate(model: string, inputTokens: number, outputTokens: number): CostResult {
    const pricing = MODEL_PRICING[model] || DEFAULT_PRICING;

    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    const totalCost = inputCost + outputCost;

    logger.debug("Cost calculated", {
      model,
      inputTokens,
      outputTokens,
      totalCost,
    });

    return {
      inputCost: Math.round(inputCost * 1_000_000) / 1_000_000,
      outputCost: Math.round(outputCost * 1_000_000) / 1_000_000,
      totalCost: Math.round(totalCost * 1_000_000) / 1_000_000,
      currency: "USD",
    };
  },

  getModelPricing(model: string) {
    return MODEL_PRICING[model] || DEFAULT_PRICING;
  },

  getAllModels(): string[] {
    return Object.keys(MODEL_PRICING);
  },
};
