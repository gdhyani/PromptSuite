import { Request, Response, NextFunction } from "express";
import { analyticsService } from "./service.js";
import { sendSuccess } from "../../lib/response.js";
import { logger } from "../../lib/logger.js";

export const analyticsController = {
  async getProjectAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const projectId = req.params.id as string;
      const { startDate, endDate, model } = req.query;

      logger.info("Fetching project analytics", { projectId, userId });

      const analytics = await analyticsService.getProjectAnalytics(projectId, userId, {
        startDate: startDate as string,
        endDate: endDate as string,
        model: model as string,
      });

      sendSuccess(res, analytics);
    } catch (error) {
      next(error);
    }
  },

  async getDailyAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const projectId = req.params.id as string;
      const { startDate, endDate } = req.query;

      logger.info("Fetching daily analytics", { projectId, userId });

      const daily = await analyticsService.getDailyAnalytics(projectId, userId, {
        startDate: startDate as string,
        endDate: endDate as string,
      });

      sendSuccess(res, daily);
    } catch (error) {
      next(error);
    }
  },

  async getCostBreakdown(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const projectId = req.params.id as string;

      logger.info("Fetching cost breakdown", { projectId, userId });

      const costs = await analyticsService.getCostBreakdown(projectId, userId);

      sendSuccess(res, costs);
    } catch (error) {
      next(error);
    }
  },
};
