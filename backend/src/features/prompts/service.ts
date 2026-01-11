import { DetectedPrompt } from "../../models/DetectedPrompt.js";
import { PromptVersion } from "../../models/PromptVersion.js";
import { Project } from "../../models/Project.js";
import { logger } from "../../lib/logger.js";
import { NotFoundError, ForbiddenError } from "../../lib/errors.js";
import type { PromptResponse, PromptVersionResponse, CreateVersionInput } from "./types.js";

function toPromptResponse(prompt: any): PromptResponse {
  return {
    id: prompt._id.toString(),
    projectId: prompt.projectId.toString(),
    filePath: prompt.filePath,
    lineNumber: prompt.lineNumber,
    promptType: prompt.promptType,
    originalContent: prompt.originalContent,
    extractedConfig: prompt.extractedConfig,
    messages: prompt.messages,
    variables: prompt.variables,
    createdAt: prompt.createdAt.toISOString(),
    updatedAt: prompt.updatedAt.toISOString(),
  };
}

function toVersionResponse(version: any): PromptVersionResponse {
  return {
    id: version._id.toString(),
    promptId: version.promptId.toString(),
    content: version.content,
    messages: version.messages,
    config: version.config,
    createdAt: version.createdAt.toISOString(),
  };
}

export const promptService = {
  async getByProject(projectId: string, userId: string): Promise<PromptResponse[]> {
    logger.debug("promptService.getByProject", { projectId });

    // Verify project access
    const project = await Project.findById(projectId);
    if (!project) {
      throw new NotFoundError("Project not found", { projectId });
    }
    if (project.userId.toString() !== userId) {
      throw new ForbiddenError("Access denied to this project");
    }

    const prompts = await DetectedPrompt.find({ projectId }).sort({ filePath: 1, lineNumber: 1 });
    return prompts.map(toPromptResponse);
  },

  async getById(promptId: string, userId: string): Promise<PromptResponse> {
    logger.debug("promptService.getById", { promptId });

    const prompt = await DetectedPrompt.findById(promptId);
    if (!prompt) {
      throw new NotFoundError("Prompt not found", { promptId });
    }

    // Verify project access
    const project = await Project.findById(prompt.projectId);
    if (!project || project.userId.toString() !== userId) {
      throw new ForbiddenError("Access denied to this prompt");
    }

    return toPromptResponse(prompt);
  },

  async getVersions(promptId: string, userId: string): Promise<PromptVersionResponse[]> {
    logger.debug("promptService.getVersions", { promptId });

    // Verify prompt access
    await this.getById(promptId, userId);

    const versions = await PromptVersion.find({ promptId }).sort({ createdAt: -1 });
    return versions.map(toVersionResponse);
  },

  async createVersion(
    promptId: string,
    userId: string,
    input: CreateVersionInput
  ): Promise<PromptVersionResponse> {
    logger.debug("promptService.createVersion", { promptId });

    // Verify prompt access
    await this.getById(promptId, userId);

    const version = await PromptVersion.create({
      promptId,
      content: input.content,
      messages: input.messages,
      config: {
        model: input.config.model,
        temperature: input.config.temperature ?? null,
        maxTokens: input.config.maxTokens ?? null,
      },
    });

    logger.info("Prompt version created", { promptId, versionId: version._id });
    return toVersionResponse(version);
  },
};
