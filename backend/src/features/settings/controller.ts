import { Request, Response, NextFunction } from "express";
import { settingsService } from "./service.js";
import { sendSuccess, sendCreated, sendNoContent } from "../../lib/response.js";
import { logger } from "../../lib/logger.js";

export const settingsController = {
  async getProviders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;

      logger.info("Fetching providers", { userId });
      const providers = await settingsService.getProviders(userId);

      sendSuccess(res, providers);
    } catch (error) {
      next(error);
    }
  },

  async saveProvider(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;

      logger.info("Saving provider", { userId, provider: req.body.provider });
      const provider = await settingsService.saveProvider(userId, req.body);

      sendCreated(res, provider);
    } catch (error) {
      next(error);
    }
  },

  async deleteProvider(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { provider } = req.body;

      logger.info("Deleting provider", { userId, provider });
      await settingsService.deleteProvider(userId, provider);

      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  },

  async getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;

      logger.info("Fetching settings", { userId });
      const settings = await settingsService.getSettings(userId);

      sendSuccess(res, settings);
    } catch (error) {
      next(error);
    }
  },
};
