import { Router, type IRouter } from "express";
import { promptController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { promptIdSchema, createVersionSchema } from "./validation.js";

const router: IRouter = Router();

// All routes require authentication
router.use(authMiddleware);

// Get prompt by ID
router.get("/:id", validate({ params: promptIdSchema }), promptController.getById);

// Get prompt versions
router.get("/:id/versions", validate({ params: promptIdSchema }), promptController.getVersions);

// Create new version
router.post(
  "/:id/versions",
  validate({ params: promptIdSchema, body: createVersionSchema }),
  promptController.createVersion
);

export default router;
