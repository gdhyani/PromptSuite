import { Router, type IRouter } from "express";
import { analyticsController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { projectIdParamSchema, analyticsQuerySchema } from "./validation.js";

const router: IRouter = Router();

// All routes require authentication
router.use(authMiddleware);

// Get project analytics
router.get(
  "/projects/:id/analytics",
  validate({ params: projectIdParamSchema, query: analyticsQuerySchema }),
  analyticsController.getProjectAnalytics
);

// Get daily analytics breakdown
router.get(
  "/projects/:id/analytics/daily",
  validate({ params: projectIdParamSchema, query: analyticsQuerySchema }),
  analyticsController.getDailyAnalytics
);

// Get cost breakdown by model
router.get(
  "/projects/:id/costs",
  validate({ params: projectIdParamSchema }),
  analyticsController.getCostBreakdown
);

export default router;
