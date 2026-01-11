import { Request, Response, NextFunction } from "express";
import { executeStreamingPrompt } from "../../services/ai/streamHandler.js";
import { ValidationError } from "../../lib/errors.js";
import { logger } from "../../lib/logger.js";

export const streamController = {
  async executeStream(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { messages, config, apiKey } = req.body;

      if (!apiKey) {
        throw new ValidationError("API key is required for streaming execution");
      }

      logger.info("Starting stream execution", { userId: req.user?.id, model: config.model });

      await executeStreamingPrompt(
        {
          messages,
          model: config.model,
          temperature: config.temperature ?? undefined,
          maxTokens: config.maxTokens ?? undefined,
          apiKey,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  },
};
