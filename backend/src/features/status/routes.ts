import { Router, IRouter } from "express";
import { statusController } from "./controller.js";

const router: IRouter = Router();

// Public endpoint - no auth required
router.get("/", statusController.getStatus);

export default router;
