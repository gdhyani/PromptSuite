import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// === Request Schemas ===

export const testMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]).openapi({ example: "user" }),
  content: z.string().openapi({ example: "Hello, how can you help me?" }),
}).openapi("TestMessage");

export const testConfigSchema = z.object({
  model: z.string().default("gpt-4").openapi({ example: "gpt-4" }),
  temperature: z.number().min(0).max(2).nullable().optional().openapi({ example: 0.7 }),
  maxTokens: z.number().min(1).nullable().optional().openapi({ example: 1000 }),
  stream: z.boolean().optional().default(false).openapi({ example: false }),
}).openapi("TestConfig");

export const testExecutionSchema = z.object({
  promptId: z.string().optional().openapi({ description: "Optional prompt ID to associate test with" }),
  messages: z.array(testMessageSchema),
  config: testConfigSchema,
  variables: z.record(z.string()).optional().openapi({ example: { name: "John", task: "coding" } }),
  apiKey: z.string().optional().openapi({ description: "Optional API key override" }),
}).openapi("TestExecutionRequest");

export const testRunIdSchema = z.object({
  id: z.string().min(1, "Test run ID is required"),
}).openapi("TestRunIdParams");

export const promptTestRunsSchema = z.object({
  id: z.string().min(1, "Prompt ID is required"),
}).openapi("PromptTestRunsParams");

// === Response Schemas ===

export const usageSchema = z.object({
  promptTokens: z.number(),
  completionTokens: z.number(),
  totalTokens: z.number(),
}).openapi("TokenUsage");

export const costSchema = z.object({
  inputCost: z.number(),
  outputCost: z.number(),
  totalCost: z.number(),
  currency: z.string().default("USD"),
}).openapi("Cost");

export const testRunSchema = z.object({
  id: z.string(),
  promptId: z.string().nullable(),
  input: z.object({
    messages: z.array(testMessageSchema),
    config: testConfigSchema,
    variables: z.record(z.string()).optional(),
  }),
  output: z.object({
    response: z.string(),
    usage: usageSchema,
    latencyMs: z.number(),
    finishReason: z.string(),
  }),
  provider: z.string(),
  model: z.string(),
  starred: z.boolean(),
  cost: costSchema.optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
}).openapi("TestRun");

export const testExecutionResponseSchema = z.object({
  success: z.boolean(),
  data: testRunSchema,
}).openapi("TestExecutionResponse");

export const testRunListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(testRunSchema),
}).openapi("TestRunListResponse");

export const starResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    starred: z.boolean(),
  }),
}).openapi("StarResponse");

// === Types ===

export type TestExecutionBody = z.infer<typeof testExecutionSchema>;
export type TestRunIdParams = z.infer<typeof testRunIdSchema>;
export type PromptTestRunsParams = z.infer<typeof promptTestRunsSchema>;
