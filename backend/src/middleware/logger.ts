import { Request, Response, NextFunction } from "express";
import { createRequestLogger } from "../lib/logger.js";

export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  const reqLogger = createRequestLogger(req.id, (req as any).user?.id);

  reqLogger.info("Request", {
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    reqLogger.info("Response", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration,
    });
  });

  next();
}
