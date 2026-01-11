import { Request, Response, NextFunction } from "express";
import { projectService } from "./service.js";
import { sendSuccess, sendCreated, sendNoContent } from "../../lib/response.js";
import { logger } from "../../lib/logger.js";

export const projectController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      logger.info("Creating project", { userId, name: req.body.name });

      const project = await projectService.create(userId, req.body);
      sendCreated(res, project);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const projects = await projectService.getAll(userId);
      sendSuccess(res, projects);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const id = req.params.id as string;

      const project = await projectService.getById(id, userId);
      sendSuccess(res, project);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const id = req.params.id as string;

      await projectService.delete(id, userId);
      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  },

  async scan(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const id = req.params.id as string;

      // Verify project access
      const project = await projectService.getById(id, userId);

      // Import scanner service dynamically to avoid circular deps
      const { scannerService } = await import("../../services/scanner/index.js");
      await scannerService.scanProject(id, userId);

      // Get updated project with prompt count
      const updatedProject = await projectService.getById(id, userId);
      sendSuccess(res, updatedProject);
    } catch (error) {
      next(error);
    }
  },
};
