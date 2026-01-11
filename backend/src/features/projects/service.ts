import { Project } from "../../models/Project.js";
import { DetectedPrompt } from "../../models/DetectedPrompt.js";
import { logger } from "../../lib/logger.js";
import { NotFoundError, ForbiddenError } from "../../lib/errors.js";
import type { CreateProjectInput, ProjectResponse } from "./types.js";

function toProjectResponse(project: any): ProjectResponse {
  return {
    id: project._id.toString(),
    type: project.type,
    name: project.name,
    description: project.description,
    githubUrl: project.githubUrl,
    branch: project.branch,
    lastScanned: project.lastScanned?.toISOString() || null,
    lastCommitSha: project.lastCommitSha || null,
    promptCount: project.promptCount,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export const projectService = {
  async create(userId: string, input: CreateProjectInput): Promise<ProjectResponse> {
    logger.debug("projectService.create", { userId, name: input.name });

    const project = await Project.create({
      userId,
      type: input.type,
      name: input.name,
      description: input.description || "",
      githubUrl: input.githubUrl || null,
      branch: input.branch || "main",
    });

    logger.info("Project created", { projectId: project._id, userId });
    return toProjectResponse(project);
  },

  async getAll(userId: string): Promise<ProjectResponse[]> {
    logger.debug("projectService.getAll", { userId });

    const projects = await Project.find({ userId }).sort({ updatedAt: -1 });
    return projects.map(toProjectResponse);
  },

  async getById(projectId: string, userId: string): Promise<ProjectResponse> {
    logger.debug("projectService.getById", { projectId, userId });

    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError("Project not found", { projectId });
    }

    if (project.userId.toString() !== userId) {
      throw new ForbiddenError("Access denied to this project");
    }

    return toProjectResponse(project);
  },

  async delete(projectId: string, userId: string): Promise<void> {
    logger.debug("projectService.delete", { projectId, userId });

    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError("Project not found", { projectId });
    }

    if (project.userId.toString() !== userId) {
      throw new ForbiddenError("Access denied to this project");
    }

    // Delete associated prompts
    await DetectedPrompt.deleteMany({ projectId });

    await project.deleteOne();
    logger.info("Project deleted", { projectId, userId });
  },

  async updatePromptCount(projectId: string): Promise<void> {
    const count = await DetectedPrompt.countDocuments({ projectId });
    await Project.findByIdAndUpdate(projectId, {
      promptCount: count,
      lastScanned: new Date(),
    });
    logger.debug("Project prompt count updated", { projectId, count });
  },
};
