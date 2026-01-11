/**
 * Common types for prompt detection across all languages
 */

export type PromptType = "system" | "user" | "assistant" | "tool" | "structured_output";

export type AIProvider = "openai" | "anthropic" | "google" | "azure" | "custom";

export interface DetectedMessage {
  role: string;
  content: string;
  variables: string[];
  // If content comes from a variable reference
  variableRef?: {
    name: string;
    definedAt?: {
      line: number;
      column: number;
    };
  };
}

export interface ExtractedConfig {
  model: string | null;
  temperature: number | null;
  maxTokens: number | null;
  topP: number | null;
  stream: boolean;
  tools: ToolDefinition[];
  responseFormat: ResponseFormat | null;
}

export interface ToolDefinition {
  name: string;
  description?: string;
  parameters?: Record<string, unknown>;
}

export interface ResponseFormat {
  type: "json_object" | "json_schema" | "text";
  schema?: Record<string, unknown>;
}

export interface DetectedPrompt {
  // Location info
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  endLineNumber: number;
  endColumnNumber: number;

  // Classification
  promptType: PromptType;
  provider: AIProvider;
  sdkMethod: string; // e.g., "chat.completions.create", "messages.create"

  // Content
  originalContent: string;
  extractedConfig: ExtractedConfig;
  messages: DetectedMessage[];
  variables: string[];

  // Metadata
  confidence: number; // 0-1, how confident we are in the detection
  warnings: string[]; // Any issues during parsing
}

export interface DetectionResult {
  prompts: DetectedPrompt[];
  errors: DetectionError[];
  stats: {
    filesScanned: number;
    promptsFound: number;
    parseErrors: number;
    timeMs: number;
  };
}

export interface DetectionError {
  filePath: string;
  line?: number;
  message: string;
  code: string;
}

export interface DetectorOptions {
  // Which providers to detect
  providers?: AIProvider[];
  // Follow variable references to resolve content
  resolveVariables?: boolean;
  // Maximum depth for variable resolution
  maxResolutionDepth?: number;
  // Include source code snippets
  includeSourceSnippets?: boolean;
}

export const DEFAULT_DETECTOR_OPTIONS: DetectorOptions = {
  providers: ["openai", "anthropic"],
  resolveVariables: true,
  maxResolutionDepth: 3,
  includeSourceSnippets: true,
};
