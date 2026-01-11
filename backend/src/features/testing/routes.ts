import { Router, type IRouter } from "express";
import { testingController } from "./controller.js";
import { streamController } from "./streamController.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { testRateLimiter } from "../../middleware/rateLimit.js";
import { testExecutionSchema, testRunIdSchema, promptTestRunsSchema } from "./validation.js";

const router: IRouter = Router();

// All routes require authentication
router.use(authMiddleware);

// Execute test (non-streaming)
router.post(
  "/",
  testRateLimiter,
  validate({ body: testExecutionSchema }),
  testingController.execute
);

// Execute test with streaming
router.post(
  "/stream",
  testRateLimiter,
  validate({ body: testExecutionSchema }),
  streamController.executeStream
);

// Get test runs by prompt
router.get(
  "/prompts/:id/runs",
  validate({ params: promptTestRunsSchema }),
  testingController.getByPrompt
);

// Toggle star on test run
router.post(
  "/runs/:id/star",
  validate({ params: testRunIdSchema }),
  testingController.toggleStar
);

export default router;
