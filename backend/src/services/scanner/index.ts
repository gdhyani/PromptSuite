import { Project } from "../../models/Project.js";
import { DetectedPrompt } from "../../models/DetectedPrompt.js";
import { User } from "../../models/User.js";
import { logger } from "../../lib/logger.js";
import { NotFoundError, ForbiddenError } from "../../lib/errors.js";
import { githubService } from "../github/client.js";
import { detectPromptsInFile, isFileSupported, getSupportedExtensions } from "../detector/index.js";

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
    const supportedExtensions = getSupportedExtensions();

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

      // Filter to supported files, exclude node_modules
      const supportedFiles = files.filter(file => {
        if (file.path.includes("node_modules")) return false;
        if (file.path.includes("dist/")) return false;
        if (file.path.includes(".next/")) return false;
        if (file.path.includes("__pycache__")) return false;
        return isFileSupported(file.path);
      });

      logger.info("Supported files to scan", { count: supportedFiles.length, projectId });

      // Process each file
      for (const file of supportedFiles) {
        try {
          const content = await githubService.getFileContent(
            project.githubUrl,
            file.path,
            project.branch,
            user.accessToken
          );

          // Use the new async detector
          const result = await detectPromptsInFile(content, file.path, {
            resolveVariables: true,
            providers: ["openai", "anthropic", "google", "azure"],
          });

          // Log any errors
          for (const error of result.errors) {
            logger.warn("Detection error", { file: file.path, error: error.message });
          }

          // Save detected prompts
          for (const prompt of result.prompts) {
            await DetectedPrompt.create({
              projectId,
              filePath: prompt.filePath,
              lineNumber: prompt.lineNumber,
              columnNumber: prompt.columnNumber,
              endLineNumber: prompt.endLineNumber,
              endColumnNumber: prompt.endColumnNumber,
              promptType: prompt.promptType,
              provider: prompt.provider,
              sdkMethod: prompt.sdkMethod,
              originalContent: prompt.originalContent,
              extractedConfig: {
                model: prompt.extractedConfig.model,
                temperature: prompt.extractedConfig.temperature,
                maxTokens: prompt.extractedConfig.maxTokens,
                topP: prompt.extractedConfig.topP,
                stream: prompt.extractedConfig.stream,
                tools: prompt.extractedConfig.tools,
                responseFormat: prompt.extractedConfig.responseFormat,
              },
              messages: prompt.messages,
              variables: prompt.variables,
              confidence: prompt.confidence,
            });
          }

          if (result.prompts.length > 0) {
            logger.debug("Prompts detected", {
              file: file.path,
              count: result.prompts.length,
              providers: [...new Set(result.prompts.map(p => p.provider))],
            });
          }
        } catch (error) {
          logger.warn("Failed to process file", { file: file.path, error });
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
