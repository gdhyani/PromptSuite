import { registry } from "../../lib/openapi/registry.js";
import {
  testExecutionSchema,
  testRunIdSchema,
  promptTestRunsSchema,
  testRunSchema,
  testExecutionResponseSchema,
  testRunListResponseSchema,
  starResponseSchema,
} from "./validation.js";

// Register schemas
registry.register("TestRun", testRunSchema);
registry.register("TestExecutionResponse", testExecutionResponseSchema);
registry.register("TestRunListResponse", testRunListResponseSchema);
registry.register("StarResponse", starResponseSchema);

// === Testing Routes ===

registry.registerPath({
  method: "post",
  path: "/api/test",
  tags: ["Testing"],
  summary: "Execute prompt test",
  description: "Execute a prompt test against the AI provider. Optionally associate with a prompt ID for tracking.",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: testExecutionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Test executed successfully",
      content: {
        "application/json": {
          schema: testExecutionResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
    },
    401: {
      description: "Not authenticated",
    },
    500: {
      description: "AI provider error",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/prompts/{id}/runs",
  tags: ["Testing"],
  summary: "Get test history",
  description: "Get all test runs for a specific prompt",
  security: [{ bearerAuth: [] }],
  request: {
    params: promptTestRunsSchema,
  },
  responses: {
    200: {
      description: "Test runs retrieved successfully",
      content: {
        "application/json": {
          schema: testRunListResponseSchema,
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
  path: "/api/runs/{id}/star",
  tags: ["Testing"],
  summary: "Toggle star on test run",
  description: "Star or unstar a test run for easy reference",
  security: [{ bearerAuth: [] }],
  request: {
    params: testRunIdSchema,
  },
  responses: {
    200: {
      description: "Star toggled successfully",
      content: {
        "application/json": {
          schema: starResponseSchema,
        },
      },
    },
    404: {
      description: "Test run not found",
    },
  },
});
