import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { corsOptions } from "./config/cors.js";
import {
  requestIdMiddleware,
  requestLoggerMiddleware,
  errorHandler,
  generalRateLimiter,
} from "./middleware/index.js";

// Import OpenAPI generator and docs (docs files register paths on import)
import { generateOpenAPISpec } from "./lib/openapi/index.js";
import "./features/auth/docs.js";
import "./features/projects/docs.js";
import "./features/prompts/docs.js";
import "./features/testing/docs.js";
import "./features/analytics/docs.js";
import "./features/settings/docs.js";
import "./features/status/docs.js";

// Import routes
import authRoutes from "./features/auth/routes.js";
import projectRoutes from "./features/projects/routes.js";
import promptRoutes from "./features/prompts/routes.js";
import testRoutes from "./features/testing/routes.js";
import analyticsRoutes from "./features/analytics/routes.js";
import settingsRoutes from "./features/settings/routes.js";
import statusRoutes from "./features/status/routes.js";

const app: Application = express();

// Generate OpenAPI spec from registered schemas and paths
const openApiSpec = generateOpenAPISpec();

// OpenAPI spec endpoint
app.get("/openapi.json", (_req, res) => {
  res.json(openApiSpec);
});

// Swagger UI documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec as object, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "PromptSuite API Documentation",
}));

// Security middleware (after docs routes)
app.use(helmet());
app.use(cors(corsOptions));

// Request parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request ID and logging
app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);

// Rate limiting
app.use(generalRateLimiter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/test", testRoutes);
app.use("/api", analyticsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/status", statusRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
});

// Error handler
app.use(errorHandler);

export default app;
