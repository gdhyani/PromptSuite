import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// === Response Schemas ===

export const serviceStatusSchema = z.object({
  name: z.string().openapi({ example: "API Server" }),
  status: z.enum(["operational", "degraded", "outage"]).openapi({ example: "operational" }),
  latency: z.number().optional().openapi({ example: 45 }),
  lastChecked: z.string().datetime().openapi({ example: "2024-01-15T10:30:00.000Z" }),
}).openapi("ServiceStatus");

export const uptimeSchema = z.object({
  percentage: z.number().openapi({ example: 99.9 }),
  since: z.string().datetime().openapi({ example: "2024-01-01T00:00:00.000Z" }),
}).openapi("Uptime");

export const incidentSchema = z.object({
  date: z.string().openapi({ example: "2024-01-10" }),
  title: z.string().openapi({ example: "Database Connection Issues" }),
  status: z.enum(["resolved", "ongoing", "investigating"]).openapi({ example: "resolved" }),
  description: z.string().openapi({ example: "Brief intermittent connectivity issues" }),
}).openapi("Incident");

export const statusResponseSchema = z.object({
  overall: z.enum(["operational", "degraded", "outage"]),
  services: z.array(serviceStatusSchema),
  uptime: uptimeSchema,
  lastIncident: incidentSchema.optional(),
}).openapi("StatusResponse");
