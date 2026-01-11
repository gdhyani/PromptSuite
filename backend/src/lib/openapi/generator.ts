import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import type { OpenAPIObject } from "openapi3-ts/oas31";
import { registry } from "./registry.js";

export function generateOpenAPISpec(): OpenAPIObject {
  const generator = new OpenApiGeneratorV31(registry.definitions);

  return generator.generateDocument({
    openapi: "3.1.0",
    info: {
      title: "PromptSuite API",
      version: "1.0.0",
      description: `
PromptSuite is an open-source prompt management and testing platform that auto-detects AI prompts from codebases and provides a UI to edit, test, and optimize them without touching code.

## Features
- **Automatic Prompt Detection** - Scans your codebase for OpenAI SDK calls
- **Visual Prompt Editor** - Edit prompts without touching code
- **Testing & Analytics** - Test prompts and track metrics
- **Version Control** - Track prompt changes over time
- **Human-in-the-Loop** - Review and approve prompts before production

## Authentication
All authenticated endpoints require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`
      `,
      contact: {
        name: "PromptSuite Support",
        email: "support@promptsuite.dev",
        url: "https://promptsuite.dev",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
      {
        url: "https://api.promptsuite.dev",
        description: "Production server",
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Projects", description: "Project management" },
      { name: "Prompts", description: "Prompt detection and management" },
      { name: "Testing", description: "Prompt testing and execution" },
      { name: "Analytics", description: "Usage analytics and metrics" },
      { name: "Settings", description: "User settings and API keys" },
      { name: "Status", description: "System status and health checks" },
    ],
  });
}
