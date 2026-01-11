import { registry } from "../../lib/openapi/registry.js";
import {
  createProjectSchema,
  projectIdSchema,
  projectSchema,
  projectListResponseSchema,
  projectResponseSchema,
  scanResultSchema,
} from "./validation.js";

// Register schemas
registry.register("Project", projectSchema);
registry.register("ProjectListResponse", projectListResponseSchema);
registry.register("ProjectResponse", projectResponseSchema);
registry.register("ScanResult", scanResultSchema);

// === Project Routes ===

registry.registerPath({
  method: "get",
  path: "/api/projects",
  tags: ["Projects"],
  summary: "List projects",
  description: "Get all projects for the authenticated user",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Projects retrieved successfully",
      content: {
        "application/json": {
          schema: projectListResponseSchema,
        },
      },
    },
    401: {
      description: "Not authenticated",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/projects",
  tags: ["Projects"],
  summary: "Create project",
  description: "Create a new project from a GitHub repository or code snippet",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createProjectSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Project created successfully",
      content: {
        "application/json": {
          schema: projectResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
    },
    401: {
      description: "Not authenticated",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/projects/{id}",
  tags: ["Projects"],
  summary: "Get project",
  description: "Get a specific project by ID",
  security: [{ bearerAuth: [] }],
  request: {
    params: projectIdSchema,
  },
  responses: {
    200: {
      description: "Project retrieved successfully",
      content: {
        "application/json": {
          schema: projectResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/projects/{id}/scan",
  tags: ["Projects"],
  summary: "Scan project",
  description: "Trigger a prompt detection scan for the project. Scans the codebase for OpenAI SDK calls.",
  security: [{ bearerAuth: [] }],
  request: {
    params: projectIdSchema,
  },
  responses: {
    200: {
      description: "Scan completed successfully",
      content: {
        "application/json": {
          schema: scanResultSchema,
        },
      },
    },
    404: {
      description: "Project not found",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/projects/{id}",
  tags: ["Projects"],
  summary: "Delete project",
  description: "Delete a project and all associated data",
  security: [{ bearerAuth: [] }],
  request: {
    params: projectIdSchema,
  },
  responses: {
    204: {
      description: "Project deleted successfully",
    },
    404: {
      description: "Project not found",
    },
  },
});
