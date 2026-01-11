import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// Extend Zod with OpenAPI support
extendZodWithOpenApi(z);

// === Request Schemas ===

export const patAuthSchema = z.object({
  token: z.string().min(1, "Personal access token is required"),
}).openapi("PatAuthRequest");

export const githubCallbackSchema = z.object({
  code: z.string().min(1, "Authorization code is required"),
}).openapi("GitHubCallbackQuery");

// === Response Schemas ===

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatarUrl: z.string().url().nullable(),
  githubId: z.string(),
  createdAt: z.string().datetime(),
}).openapi("User");

export const authResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
    user: userSchema,
  }),
}).openapi("AuthResponse");

export const meResponseSchema = z.object({
  success: z.boolean(),
  data: userSchema,
}).openapi("MeResponse");

// === Types ===

export type PatAuthInput = z.infer<typeof patAuthSchema>;
export type GitHubCallbackInput = z.infer<typeof githubCallbackSchema>;
export type User = z.infer<typeof userSchema>;
