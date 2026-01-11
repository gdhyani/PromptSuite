import { Request, Response, NextFunction } from "express";
import { statusService } from "./service.js";
import { logger } from "../../lib/logger.js";

export const statusController = {
  async getStatus(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Status check requested");

      const status = await statusService.getStatus();

      logger.info("Status check completed", { overall: status.overall });
      res.json({ success: true, data: status });
    } catch (error) {
      next(error);
    }
  },
};
