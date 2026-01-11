/**
 * Base interface for language-specific prompt detectors
 */

import type { DetectedPrompt, DetectorOptions, DetectionError } from "./types.js";

export type SupportedLanguage = "typescript" | "javascript" | "python";

export interface LanguageDetector {
  /**
   * Language this detector handles
   */
  readonly language: SupportedLanguage;

  /**
   * File extensions this detector can process
   */
  readonly extensions: string[];

  /**
   * Detect prompts in the given source code
   */
  detect(
    code: string,
    filePath: string,
    options?: DetectorOptions
  ): Promise<DetectorResult>;

  /**
   * Check if this detector can handle the given file
   */
  canHandle(filePath: string): boolean;
}

export interface DetectorResult {
  prompts: DetectedPrompt[];
  errors: DetectionError[];
}

/**
 * Abstract base class with common functionality
 */
export abstract class BaseDetector implements LanguageDetector {
  abstract readonly language: SupportedLanguage;
  abstract readonly extensions: string[];

  abstract detect(
    code: string,
    filePath: string,
    options?: DetectorOptions
  ): Promise<DetectorResult>;

  canHandle(filePath: string): boolean {
    const ext = filePath.split(".").pop()?.toLowerCase() || "";
    return this.extensions.includes(ext);
  }

  /**
   * Extract template variables from a string
   * Handles: ${var}, {var}, {{var}}, %(var)s, {var!r}, f-string style
   */
  protected extractVariables(content: string): string[] {
    const variables: string[] = [];
    const patterns = [
      /\$\{(\w+)\}/g,           // ${var} - JS template literal
      /\{(\w+)\}/g,             // {var} - Python format / simple placeholder
      /\{\{(\w+)\}\}/g,         // {{var}} - Handlebars/Jinja style
      /%\((\w+)\)s/g,           // %(var)s - Python old-style
      /\{(\w+)(?:![rsa])?\}/g,  // {var!r} - Python format spec
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1] && !variables.includes(match[1])) {
          variables.push(match[1]);
        }
      }
    }

    return variables;
  }

  /**
   * Calculate confidence score based on detection quality
   */
  protected calculateConfidence(prompt: Partial<DetectedPrompt>): number {
    let score = 0.5; // Base score

    // Has messages with content
    if (prompt.messages && prompt.messages.length > 0) {
      score += 0.2;
      if (prompt.messages.some(m => m.content.length > 10)) {
        score += 0.1;
      }
    }

    // Has model specified
    if (prompt.extractedConfig?.model) {
      score += 0.1;
    }

    // Has valid provider
    if (prompt.provider) {
      score += 0.1;
    }

    return Math.min(score, 1);
  }
}
