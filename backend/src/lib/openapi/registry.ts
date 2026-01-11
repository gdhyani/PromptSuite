import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

// Create a single registry instance for the entire application
export const registry = new OpenAPIRegistry();

// Register common security scheme
registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "JWT token obtained from authentication endpoints",
});
