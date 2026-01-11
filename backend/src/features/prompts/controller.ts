import { Request, Response, NextFunction } from "express";
import { promptService } from "./service.js";
import { sendSuccess, sendCreated } from "../../lib/response.js";

export const promptController = {
  async getByProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const projectId = req.params.id as string;

      const prompts = await promptService.getByProject(projectId, userId);
      sendSuccess(res, prompts);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const promptId = req.params.id as string;

      const prompt = await promptService.getById(promptId, userId);
      sendSuccess(res, prompt);
    } catch (error) {
      next(error);
    }
  },

  async getVersions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const promptId = req.params.id as string;

      const versions = await promptService.getVersions(promptId, userId);
      sendSuccess(res, versions);
    } catch (error) {
      next(error);
    }
  },

  async createVersion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const promptId = req.params.id as string;

      const version = await promptService.createVersion(promptId, userId, req.body);
      sendCreated(res, version);
    } catch (error) {
      next(error);
    }
  },
};
