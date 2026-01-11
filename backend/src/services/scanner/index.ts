import { Project } from "../../models/Project.js";
import { DetectedPrompt } from "../../models/DetectedPrompt.js";
import { User } from "../../models/User.js";
import { logger } from "../../lib/logger.js";
import { NotFoundError, ForbiddenError } from "../../lib/errors.js";
import { githubService } from "../github/client.js";
import { detectOpenAIPrompts } from "../detector/openaiParser.js";

export const scannerService = {
  async scanProject(projectId: string, userId: string): Promise<void> {
    logger.info("Starting project scan", { projectId, userId });

    const project = await Project.findById(projectId);
    if (!project) {
      throw new NotFoundError("Project not found", { projectId });
    }

    if (project.userId.toString() !== userId) {
      throw new ForbiddenError("Access denied to this project");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found", { userId });
    }

    // Clear existing prompts for this project
    await DetectedPrompt.deleteMany({ projectId });

    let commitSha: string | null = null;

    if (project.type === "github" && project.githubUrl) {
      // Get the latest commit SHA for tracking
      commitSha = await githubService.getLatestCommitSha(
        project.githubUrl,
        project.branch,
        user.accessToken
      );
      logger.info("Latest commit SHA", { commitSha, projectId });

      // Fetch files from GitHub
      const files = await githubService.getRepoFiles(
        project.githubUrl,
        project.branch,
        user.accessToken
      );

      logger.info("Files fetched from GitHub", { count: files.length, projectId });

      // Process each TypeScript/JavaScript file
      for (const file of files) {
        if (file.path.match(/\.(ts|tsx|js|jsx)$/) && !file.path.includes("node_modules")) {
          try {
            const content = await githubService.getFileContent(
              project.githubUrl,
              file.path,
              project.branch,
              user.accessToken
            );

            const prompts = detectOpenAIPrompts(content, file.path);

            for (const prompt of prompts) {
              await DetectedPrompt.create({
                projectId,
                filePath: prompt.filePath,
                lineNumber: prompt.lineNumber,
                columnNumber: prompt.columnNumber,
                promptType: prompt.promptType,
                originalContent: prompt.originalContent,
                extractedConfig: prompt.extractedConfig,
                messages: prompt.messages,
                variables: prompt.variables,
              });
            }

            if (prompts.length > 0) {
              logger.debug("Prompts detected", { file: file.path, count: prompts.length });
            }
          } catch (error) {
            logger.warn("Failed to process file", { file: file.path, error });
          }
        }
      }
    }

    // Update project stats
    const promptCount = await DetectedPrompt.countDocuments({ projectId });
    await Project.findByIdAndUpdate(projectId, {
      promptCount,
      lastScanned: new Date(),
      lastCommitSha: commitSha,
    });

    logger.info("Project scan completed", { projectId, promptCount, commitSha });
  },
};
