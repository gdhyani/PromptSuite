import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// === Request Schemas ===

export const promptIdSchema = z.object({
  id: z.string().min(1, "Prompt ID is required"),
}).openapi("PromptIdParams");

export const projectPromptsSchema = z.object({
  id: z.string().min(1, "Project ID is required"),
}).openapi("ProjectPromptsParams");

export const messageSchema = z.object({
  role: z.string().min(1).openapi({ example: "system" }),
  content: z.string().openapi({ example: "You are a helpful assistant" }),
}).openapi("Message");

export const configSchema = z.object({
  model: z.string().default("gpt-4").openapi({ example: "gpt-4" }),
  temperature: z.number().min(0).max(2).nullable().optional().openapi({ example: 0.7 }),
  maxTokens: z.number().min(1).nullable().optional().openapi({ example: 1000 }),
}).openapi("PromptConfig");

export const createVersionSchema = z.object({
  content: z.string().min(1, "Content is required").openapi({ example: "You are a helpful assistant" }),
  messages: z.array(messageSchema),
  config: configSchema,
}).openapi("CreateVersionRequest");

// === Response Schemas ===

export const detectedPromptSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  filePath: z.string(),
  lineNumber: z.number(),
  promptType: z.enum(["system", "user", "tool", "structured_output"]),
  originalContent: z.string(),
  extractedConfig: configSchema,
  variables: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).openapi("DetectedPrompt");

export const promptVersionSchema = z.object({
  id: z.string(),
  promptId: z.string(),
  content: z.string(),
  messages: z.array(messageSchema),
  config: configSchema,
  createdAt: z.string().datetime(),
}).openapi("PromptVersion");

export const promptListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(detectedPromptSchema),
}).openapi("PromptListResponse");

export const promptDetailResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    prompt: detectedPromptSchema,
    versions: z.array(promptVersionSchema),
  }),
}).openapi("PromptDetailResponse");

export const versionResponseSchema = z.object({
  success: z.boolean(),
  data: promptVersionSchema,
}).openapi("VersionResponse");

export const versionListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(promptVersionSchema),
}).openapi("VersionListResponse");

// === Types ===

export type PromptIdParams = z.infer<typeof promptIdSchema>;
export type ProjectPromptsParams = z.infer<typeof projectPromptsSchema>;
export type CreateVersionBody = z.infer<typeof createVersionSchema>;
