import { registry } from "../../lib/openapi/registry.js";
import { statusResponseSchema } from "./validation.js";

// Register schemas
registry.register("StatusResponse", statusResponseSchema);

// === Status Routes ===

registry.registerPath({
  method: "get",
  path: "/api/status",
  tags: ["Status"],
  summary: "Get system status",
  description: "Get the current operational status of all services",
  responses: {
    200: {
      description: "Status retrieved successfully",
      content: {
        "application/json": {
          schema: statusResponseSchema,
        },
      },
    },
  },
});
