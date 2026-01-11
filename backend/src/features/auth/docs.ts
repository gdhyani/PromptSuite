import { registry } from "../../lib/openapi/registry.js";
import {
  patAuthSchema,
  githubCallbackSchema,
  authResponseSchema,
  meResponseSchema,
  userSchema,
} from "./validation.js";

// Register schemas
registry.register("User", userSchema);
registry.register("AuthResponse", authResponseSchema);
registry.register("MeResponse", meResponseSchema);

// === Auth Routes ===

registry.registerPath({
  method: "get",
  path: "/api/auth/github",
  tags: ["Auth"],
  summary: "Initiate GitHub OAuth",
  description: "Redirects to GitHub for OAuth authentication",
  responses: {
    302: {
      description: "Redirect to GitHub OAuth page",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/auth/github/callback",
  tags: ["Auth"],
  summary: "GitHub OAuth callback",
  description: "Handles GitHub OAuth callback and issues JWT token",
  request: {
    query: githubCallbackSchema,
  },
  responses: {
    302: {
      description: "Redirect to frontend with auth token",
    },
    401: {
      description: "Authentication failed",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/pat",
  tags: ["Auth"],
  summary: "Authenticate with PAT",
  description: "Authenticate using a GitHub Personal Access Token",
  request: {
    body: {
      content: {
        "application/json": {
          schema: patAuthSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Authentication successful",
      content: {
        "application/json": {
          schema: authResponseSchema,
        },
      },
    },
    401: {
      description: "Invalid token",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/auth/me",
  tags: ["Auth"],
  summary: "Get current user",
  description: "Get the currently authenticated user profile",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "User profile retrieved",
      content: {
        "application/json": {
          schema: meResponseSchema,
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
  path: "/api/auth/logout",
  tags: ["Auth"],
  summary: "Logout",
  description: "Logout and invalidate the current session",
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Logged out successfully",
    },
  },
});
