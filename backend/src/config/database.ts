import mongoose from "mongoose";
import { logger } from "../lib/logger.js";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Connected to MongoDB");

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error", { error: error.message });
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });
  } catch (error) {
    logger.error("Failed to connect to MongoDB", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info("Disconnected from MongoDB");
}
