/**
 * Unified prompt detector - orchestrates language-specific detectors
 */

import { typescriptDetector } from "./typescript/index.js";
import { pythonDetector } from "./python/index.js";
import type { LanguageDetector, DetectorResult } from "./base.js";
import type {
  DetectedPrompt,
  DetectorOptions,
  DetectionResult,
  DEFAULT_DETECTOR_OPTIONS,
} from "./types.js";
import { logger } from "../../lib/logger.js";

// Registry of all available detectors
const detectors: LanguageDetector[] = [
  typescriptDetector,
  pythonDetector,
];

/**
 * Get the appropriate detector for a file
 */
export function getDetectorForFile(filePath: string): LanguageDetector | null {
  for (const detector of detectors) {
    if (detector.canHandle(filePath)) {
      return detector;
    }
  }
  return null;
}

/**
 * Detect prompts in a single file
 */
export async function detectPromptsInFile(
  code: string,
  filePath: string,
  options: DetectorOptions = {}
): Promise<DetectorResult> {
  const detector = getDetectorForFile(filePath);

  if (!detector) {
    return {
      prompts: [],
      errors: [{
        filePath,
        message: `No detector available for file type`,
        code: "UNSUPPORTED_FILE_TYPE",
      }],
    };
  }

  logger.debug("Detecting prompts", { filePath, detector: detector.language });

  const startTime = Date.now();
  const result = await detector.detect(code, filePath, options);
  const duration = Date.now() - startTime;

  logger.debug("Detection complete", {
    filePath,
    promptsFound: result.prompts.length,
    errors: result.errors.length,
    durationMs: duration,
  });

  return result;
}

/**
 * Detect prompts in multiple files
 */
export async function detectPromptsInFiles(
  files: Array<{ path: string; content: string }>,
  options: DetectorOptions = {}
): Promise<DetectionResult> {
  const startTime = Date.now();
  const allPrompts: DetectedPrompt[] = [];
  const allErrors: DetectionResult["errors"] = [];
  let parseErrors = 0;

  for (const file of files) {
    const result = await detectPromptsInFile(file.content, file.path, options);
    allPrompts.push(...result.prompts);
    allErrors.push(...result.errors);
    if (result.errors.length > 0) {
      parseErrors++;
    }
  }

  return {
    prompts: allPrompts,
    errors: allErrors,
    stats: {
      filesScanned: files.length,
      promptsFound: allPrompts.length,
      parseErrors,
      timeMs: Date.now() - startTime,
    },
  };
}

/**
 * Check if a file extension is supported
 */
export function isFileSupported(filePath: string): boolean {
  return getDetectorForFile(filePath) !== null;
}

/**
 * Get list of supported file extensions
 */
export function getSupportedExtensions(): string[] {
  const extensions: string[] = [];
  for (const detector of detectors) {
    extensions.push(...detector.extensions);
  }
  return [...new Set(extensions)];
}

// Re-export types
export * from "./types.js";
export * from "./base.js";
