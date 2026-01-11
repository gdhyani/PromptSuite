import { Request, Response, NextFunction } from "express";
import { testingService } from "./service.js";
import { sendSuccess, sendCreated } from "../../lib/response.js";

export const testingController = {
  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await testingService.executeTest(userId, req.body);
      sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getByPrompt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const promptId = req.params.id as string;

      const runs = await testingService.getByPrompt(promptId, userId);
      sendSuccess(res, runs);
    } catch (error) {
      next(error);
    }
  },

  async toggleStar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const runId = req.params.id as string;

      const run = await testingService.toggleStar(runId, userId);
      sendSuccess(res, run);
    } catch (error) {
      next(error);
    }
  },
};
