import { Request, Response, NextFunction } from "express";
import { authService } from "./service.js";
import { sendSuccess } from "../../lib/response.js";
import { env } from "../../config/env.js";
import { getGitHubAuthUrl } from "./utils/oauth.js";
import { logger } from "../../lib/logger.js";

export const authController = {
  // Redirect to GitHub OAuth
  async initiateGitHub(_req: Request, res: Response): Promise<void> {
    const authUrl = getGitHubAuthUrl();
    res.redirect(authUrl);
  },

  // Handle GitHub OAuth callback
  async handleGitHubCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { code } = req.query as { code: string };
      logger.info("GitHub callback received", { code: code?.substring(0, 8) + "..." });

      const result = await authService.handleGitHubCallback(code);

      // Redirect to frontend with token
      const redirectUrl = `${env.FRONTEND_URL}/auth/callback?token=${result.token}`;
      res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  },

  // Authenticate with PAT
  async authenticateWithPat(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.body;
      logger.info("PAT authentication attempt");

      const result = await authService.handlePatAuth(token);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  // Get current user
  async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const user = await authService.getCurrentUser(userId);
      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  },

  // Logout
  async logout(_req: Request, res: Response): Promise<void> {
    // Since we use JWT, just tell client to remove token
    sendSuccess(res, { message: "Logged out successfully" });
  },
};
