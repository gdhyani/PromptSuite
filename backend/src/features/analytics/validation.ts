import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// === Request Schemas ===

export const analyticsQuerySchema = z.object({
  startDate: z.string().optional().openapi({ example: "2024-01-01" }),
  endDate: z.string().optional().openapi({ example: "2024-01-31" }),
  model: z.string().optional().openapi({ example: "gpt-4" }),
  promptId: z.string().optional().openapi({ description: "Filter by prompt ID" }),
}).openapi("AnalyticsQuery");

export const projectIdParamSchema = z.object({
  id: z.string().min(1, "Project ID is required"),
}).openapi("ProjectIdParams");

export const promptIdParamSchema = z.object({
  id: z.string().min(1, "Prompt ID is required"),
}).openapi("PromptIdParams");

// === Response Schemas ===

export const analyticsStatsSchema = z.object({
  totalRuns: z.number(),
  avgLatencyMs: z.number(),
  p50LatencyMs: z.number(),
  p95LatencyMs: z.number(),
  p99LatencyMs: z.number(),
  totalTokens: z.number(),
  totalCost: z.number(),
  avgRating: z.number().nullable(),
  thumbsUp: z.number(),
  thumbsDown: z.number(),
}).openapi("AnalyticsStats");

export const projectAnalyticsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    stats: analyticsStatsSchema,
    period: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }),
  }),
}).openapi("ProjectAnalyticsResponse");

export const dailyStatsSchema = z.object({
  date: z.string(),
  runs: z.number(),
  tokens: z.number(),
  cost: z.number(),
  avgLatency: z.number(),
}).openapi("DailyStats");

export const dailyAnalyticsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(dailyStatsSchema),
}).openapi("DailyAnalyticsResponse");

export const costBreakdownSchema = z.object({
  model: z.string(),
  runs: z.number(),
  inputTokens: z.number(),
  outputTokens: z.number(),
  totalCost: z.number(),
}).openapi("CostBreakdown");

export const costsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    total: z.number(),
    byModel: z.array(costBreakdownSchema),
    byPrompt: z.array(z.object({
      promptId: z.string(),
      promptName: z.string().optional(),
      totalCost: z.number(),
    })),
  }),
}).openapi("CostsResponse");

// === Types ===

export type AnalyticsQuery = z.infer<typeof analyticsQuerySchema>;
export type ProjectIdParams = z.infer<typeof projectIdParamSchema>;
