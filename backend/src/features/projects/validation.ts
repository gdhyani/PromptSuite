import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// === Request Schemas ===

export const createProjectSchema = z
  .object({
    type: z.enum(["github", "snippet"]).openapi({ description: "Project type" }),
    name: z.string().min(1, "Project name is required").max(100).openapi({ example: "My AI Project" }),
    description: z.string().max(500).optional().openapi({ example: "A project using OpenAI" }),
    githubUrl: z.string().url().optional().openapi({ example: "https://github.com/user/repo" }),
    branch: z.string().optional().default("main").openapi({ example: "main" }),
    code: z.string().optional().openapi({ description: "Code snippet for snippet type projects" }),
  })
  .refine(
    (data) => {
      if (data.type === "github" && !data.githubUrl) {
        return false;
      }
      return true;
    },
    { message: "GitHub URL is required for GitHub projects", path: ["githubUrl"] }
  )
  .openapi("CreateProjectRequest");

export const projectIdSchema = z.object({
  id: z.string().min(1, "Project ID is required"),
}).openapi("ProjectIdParams");

// === Response Schemas ===

export const projectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["github", "snippet"]),
  name: z.string(),
  description: z.string().nullable(),
  githubUrl: z.string().nullable(),
  branch: z.string().nullable(),
  lastScanned: z.string().datetime().nullable(),
  promptCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).openapi("Project");

export const projectListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(projectSchema),
}).openapi("ProjectListResponse");

export const projectResponseSchema = z.object({
  success: z.boolean(),
  data: projectSchema,
}).openapi("ProjectResponse");

export const scanResultSchema = z.object({
  success: z.boolean(),
  data: z.object({
    promptsDetected: z.number(),
    filesScanned: z.number(),
  }),
}).openapi("ScanResult");

// === Types ===

export type CreateProjectBody = z.infer<typeof createProjectSchema>;
export type ProjectIdParams = z.infer<typeof projectIdSchema>;
export type Project = z.infer<typeof projectSchema>;
