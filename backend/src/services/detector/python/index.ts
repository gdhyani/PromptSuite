/**
 * Python prompt detector - Placeholder for future implementation
 *
 * Will use tree-sitter-python or similar for AST parsing
 *
 * Patterns to detect:
 * - openai.ChatCompletion.create() (legacy)
 * - client.chat.completions.create() (v1.0+)
 * - anthropic.messages.create()
 * - genai.GenerativeModel().generate_content()
 */

import { BaseDetector, type DetectorResult } from "../base.js";
import type { DetectorOptions } from "../types.js";

export class PythonDetector extends BaseDetector {
  readonly language = "python" as const;
  readonly extensions = ["py"];

  async detect(
    code: string,
    filePath: string,
    options: DetectorOptions = {}
  ): Promise<DetectorResult> {
    // TODO: Implement using tree-sitter-python or regex as fallback
    // For now, return empty results

    return {
      prompts: [],
      errors: [{
        filePath,
        message: "Python detection not yet implemented",
        code: "NOT_IMPLEMENTED",
      }],
    };
  }
}

export const pythonDetector = new PythonDetector();
