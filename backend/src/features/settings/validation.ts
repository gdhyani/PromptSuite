import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// === Request Schemas ===

export const saveProviderSchema = z.object({
  provider: z.enum(["openai", "anthropic", "custom"]).openapi({ example: "openai" }),
  apiKey: z.string().min(1, "API key is required").openapi({ example: "sk-..." }),
  customEndpoint: z.string().url().optional().openapi({ example: "https://api.custom.ai/v1" }),
}).openapi("SaveProviderRequest");

export const deleteProviderSchema = z.object({
  provider: z.enum(["openai", "anthropic", "custom"]),
}).openapi("DeleteProviderParams");

// === Response Schemas ===

export const providerConfigSchema = z.object({
  provider: z.enum(["openai", "anthropic", "custom"]),
  maskedKey: z.string().openapi({ example: "sk-...abc1" }),
  customEndpoint: z.string().nullable(),
  createdAt: z.string().datetime(),
}).openapi("ProviderConfig");

export const providersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(providerConfigSchema),
}).openapi("ProvidersResponse");

export const saveProviderResponseSchema = z.object({
  success: z.boolean(),
  data: providerConfigSchema,
}).openapi("SaveProviderResponse");

// === Types ===

export type SaveProviderBody = z.infer<typeof saveProviderSchema>;
export type DeleteProviderParams = z.infer<typeof deleteProviderSchema>;
