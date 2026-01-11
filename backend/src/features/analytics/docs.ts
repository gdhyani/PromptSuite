import { registry } from "../../lib/openapi/registry.js";
import {
  analyticsQuerySchema,
  projectIdParamSchema,
  promptIdParamSchema,
  projectAnalyticsResponseSchema,
  dailyAnalyticsResponseSchema,
  costsResponseSchema,
} from "./validation.js";

// Register schemas
registry.register("ProjectAnalyticsResponse", projectAnalyticsResponseSchema);
registry.register("DailyAnalyticsResponse", dailyAnalyticsResponseSchema);
registry.register("CostsResponse", costsResponseSchema);

// === Analytics Routes ===

registry.registerPath({
  method: "get",
  path: "/api/projects/{id}/analytics",
  tags: ["Analytics"],
  summary: "Get project analytics",
  description: "Get aggregated analytics for a project including usage, costs, and latency metrics",
  security: [{ bearerAuth: [] }],
  request: {
    params: projectIdParamSchema,
    query: analyticsQuerySchema,
  },
  responses: {
    200: {
      description: "Analytics retrieved successfully",
      content: {
        "application/json": {
          schema: projectAnalyticsResponseSchema,
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
  path: "/api/projects/{id}/analytics/daily",
  tags: ["Analytics"],
  summary: "Get daily analytics breakdown",
  description: "Get day-by-day analytics breakdown for trend visualization",
  security: [{ bearerAuth: [] }],
  request: {
    params: projectIdParamSchema,
    query: analyticsQuerySchema,
  },
  responses: {
    200: {
      description: "Daily analytics retrieved successfully",
      content: {
        "application/json": {
          schema: dailyAnalyticsResponseSchema,
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
  path: "/api/prompts/{id}/analytics",
  tags: ["Analytics"],
  summary: "Get prompt analytics",
  description: "Get analytics specific to a single prompt",
  security: [{ bearerAuth: [] }],
  request: {
    params: promptIdParamSchema,
    query: analyticsQuerySchema,
  },
  responses: {
    200: {
      description: "Prompt analytics retrieved successfully",
      content: {
        "application/json": {
          schema: projectAnalyticsResponseSchema,
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
  path: "/api/projects/{id}/costs",
  tags: ["Analytics"],
  summary: "Get cost breakdown",
  description: "Get detailed cost breakdown by model and prompt",
  security: [{ bearerAuth: [] }],
  request: {
    params: projectIdParamSchema,
    query: analyticsQuerySchema,
  },
  responses: {
    200: {
      description: "Costs retrieved successfully",
      content: {
        "application/json": {
          schema: costsResponseSchema,
        },
      },
    },
    404: {
      description: "Project not found",
    },
  },
});
