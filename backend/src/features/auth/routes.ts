import { Router, type IRouter } from "express";
import { authController } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { authRateLimiter } from "../../middleware/rateLimit.js";
import { patAuthSchema, githubCallbackSchema } from "./validation.js";

const router: IRouter = Router();

// GitHub OAuth
router.get("/github", authController.initiateGitHub);
router.get(
  "/github/callback",
  validate({ query: githubCallbackSchema }),
  authController.handleGitHubCallback
);

// PAT authentication
router.post(
  "/pat",
  authRateLimiter,
  validate({ body: patAuthSchema }),
  authController.authenticateWithPat
);

// Current user
router.get("/me", authMiddleware, authController.getCurrentUser);

// Logout
router.post("/logout", authMiddleware, authController.logout);

export default router;
