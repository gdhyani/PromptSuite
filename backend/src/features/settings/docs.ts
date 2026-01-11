import { registry } from "../../lib/openapi/registry.js";
import {
  saveProviderSchema,
  deleteProviderSchema,
  providersResponseSchema,
  saveProviderResponseSchema,
} from "./validation.js";

// Register schemas
registry.register("ProvidersResponse", providersResponseSchema);
registry.register("SaveProviderResponse", saveProviderResponseSchema);

// === Settings Routes ===

registry.registerPath({
  method: "get",
  path: "/api/settings/providers",
  tags: ["Settings"],
  summary: "Get saved API keys",
  description: "Get all saved API provider configurations with masked keys",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Providers retrieved successfully",
      content: {
        "application/json": {
          schema: providersResponseSchema,
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
  path: "/api/settings/providers",
  tags: ["Settings"],
  summary: "Save API key",
  description: "Save or update an API provider configuration",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: saveProviderSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Provider saved successfully",
      content: {
        "application/json": {
          schema: saveProviderResponseSchema,
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
  method: "delete",
  path: "/api/settings/providers/{provider}",
  tags: ["Settings"],
  summary: "Delete API key",
  description: "Remove a saved API provider configuration",
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteProviderSchema,
  },
  responses: {
    204: {
      description: "Provider deleted successfully",
    },
    404: {
      description: "Provider not found",
    },
  },
});
