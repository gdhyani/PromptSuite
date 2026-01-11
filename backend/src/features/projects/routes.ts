import { Router, type IRouter } from "express";
import { projectController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createProjectSchema, projectIdSchema } from "./validation.js";

const router: IRouter = Router();

// All routes require authentication
router.use(authMiddleware);

// List all projects
router.get("/", projectController.getAll);

// Create project
router.post("/", validate({ body: createProjectSchema }), projectController.create);

// Get project by ID
router.get("/:id", validate({ params: projectIdSchema }), projectController.getById);

// Scan project for prompts
router.post("/:id/scan", validate({ params: projectIdSchema }), projectController.scan);

// Delete project
router.delete("/:id", validate({ params: projectIdSchema }), projectController.delete);

export default router;
