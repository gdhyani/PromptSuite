import pino from "pino";

const isDev = process.env.NODE_ENV === "development";

const pinoLogger = pino({
  level: isDev ? "debug" : "info",
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  base: {
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Wrapper to support both (message) and (message, data) signatures
function createLogMethod(level: "info" | "error" | "warn" | "debug") {
  return (message: string, data?: Record<string, unknown>) => {
    if (data) {
      pinoLogger[level](data, message);
    } else {
      pinoLogger[level](message);
    }
  };
}

export const logger = {
  info: createLogMethod("info"),
  error: createLogMethod("error"),
  warn: createLogMethod("warn"),
  debug: createLogMethod("debug"),
  child: (bindings: Record<string, unknown>) => {
    const childPino = pinoLogger.child(bindings);
    return {
      info: (message: string, data?: Record<string, unknown>) => {
        if (data) childPino.info(data, message);
        else childPino.info(message);
      },
      error: (message: string, data?: Record<string, unknown>) => {
        if (data) childPino.error(data, message);
        else childPino.error(message);
      },
      warn: (message: string, data?: Record<string, unknown>) => {
        if (data) childPino.warn(data, message);
        else childPino.warn(message);
      },
      debug: (message: string, data?: Record<string, unknown>) => {
        if (data) childPino.debug(data, message);
        else childPino.debug(message);
      },
    };
  },
};

export function createRequestLogger(requestId: string, userId?: string) {
  return logger.child({ requestId, userId });
}
