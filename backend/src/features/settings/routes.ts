import { Router, type IRouter } from "express";
import { settingsController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { saveProviderSchema, deleteProviderSchema } from "./validation.js";

const router: IRouter = Router();

// All routes require authentication
router.use(authMiddleware);

// Get all provider settings
router.get("/providers", settingsController.getProviders);

// Save provider API key
router.post("/providers", validate({ body: saveProviderSchema }), settingsController.saveProvider);

// Delete provider API key
router.delete(
  "/providers",
  validate({ body: deleteProviderSchema }),
  settingsController.deleteProvider
);

// Get full settings
router.get("/", settingsController.getSettings);

export default router;
