import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../lib/errors.js";
import { sendError } from "../lib/response.js";
import { createRequestLogger } from "../lib/logger.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const reqLogger = createRequestLogger(req.id, (req as any).user?.id);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const details = err.errors.reduce(
      (acc, e) => ({
        ...acc,
        [e.path.join(".")]: e.message,
      }),
      {}
    );
    reqLogger.warn("Validation error", { details });
    sendError(res, "VALIDATION_ERROR", "Invalid request data", 400, details);
    return;
  }

  // Handle custom AppError
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      reqLogger.error("Server error", {
        code: err.code,
        message: err.message,
        stack: err.stack,
        details: err.details,
      });
    } else {
      reqLogger.warn("Client error", {
        code: err.code,
        message: err.message,
        details: err.details,
      });
    }
    sendError(res, err.code, err.message, err.statusCode, err.details);
    return;
  }

  // Handle unknown errors
  reqLogger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
  });
  sendError(res, "INTERNAL_ERROR", "An unexpected error occurred", 500);
}
