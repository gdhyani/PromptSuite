import { registry } from "../../lib/openapi/registry.js";
import {
  promptIdSchema,
  projectPromptsSchema,
  createVersionSchema,
  detectedPromptSchema,
  promptVersionSchema,
  promptListResponseSchema,
  promptDetailResponseSchema,
  versionResponseSchema,
  versionListResponseSchema,
} from "./validation.js";

// Register schemas
registry.register("DetectedPrompt", detectedPromptSchema);
registry.register("PromptVersion", promptVersionSchema);
registry.register("PromptListResponse", promptListResponseSchema);
registry.register("PromptDetailResponse", promptDetailResponseSchema);
registry.register("VersionResponse", versionResponseSchema);
registry.register("VersionListResponse", versionListResponseSchema);

// === Prompt Routes ===

registry.registerPath({
  method: "get",
  path: "/api/projects/{id}/prompts",
  tags: ["Prompts"],
  summary: "List project prompts",
  description: "Get all detected prompts for a project",
  security: [{ bearerAuth: [] }],
  request: {
    params: projectPromptsSchema,
  },
  responses: {
    200: {
      description: "Prompts retrieved successfully",
      content: {
        "application/json": {
          schema: promptListResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/prompts/{id}",
  tags: ["Prompts"],
  summary: "Get prompt details",
  description: "Get a specific prompt with its version history",
  security: [{ bearerAuth: [] }],
  request: {
    params: promptIdSchema,
  },
  responses: {
    200: {
      description: "Prompt retrieved successfully",
      content: {
        "application/json": {
          schema: promptDetailResponseSchema,
        },
      },
    },
    404: {
      description: "Prompt not found",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/prompts/{id}/versions",
  tags: ["Prompts"],
  summary: "Create prompt version",
  description: "Save a new version of the prompt with updated content and config",
  security: [{ bearerAuth: [] }],
  request: {
    params: promptIdSchema,
    body: {
      content: {
        "application/json": {
          schema: createVersionSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Version created successfully",
      content: {
        "application/json": {
          schema: versionResponseSchema,
        },
      },
    },
    404: {
      description: "Prompt not found",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/prompts/{id}/versions",
  tags: ["Prompts"],
  summary: "List prompt versions",
  description: "Get all versions of a prompt",
  security: [{ bearerAuth: [] }],
  request: {
    params: promptIdSchema,
  },
  responses: {
    200: {
      description: "Versions retrieved successfully",
      content: {
        "application/json": {
          schema: versionListResponseSchema,
        },
      },
    },
    404: {
      description: "Prompt not found",
    },
  },
});
