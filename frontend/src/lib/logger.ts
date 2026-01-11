type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  requestId?: string;
  userId?: string;
  context?: LogContext;
}

class Logger {
  private requestId?: string;
  private userId?: string;

  setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      requestId: this.requestId,
      userId: this.userId,
      context,
    };

    const logFn = level === "error" ? console.error : level === "warn" ? console.warn : console.log;

    if (process.env.NODE_ENV === "development") {
      logFn(`[${entry.level.toUpperCase()}] ${entry.message}`, context || "");
    } else {
      logFn(JSON.stringify(entry));
    }
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === "development") {
      this.log("debug", message, context);
    }
  }

  info(message: string, context?: LogContext) {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log("warn", message, context);
  }

  error(message: string, context?: LogContext) {
    this.log("error", message, context);
  }
}

export const logger = new Logger();
