export interface DetectedPrompt {
  id: string;
  projectId: string;
  filePath: string;
  lineNumber: number;
  promptType: "system" | "user" | "tool" | "structured_output";
  originalContent: string;
  extractedConfig: {
    model: string;
    temperature: number | null;
    maxTokens: number | null;
    tools: unknown[];
    responseFormat: unknown;
  };
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PromptVersion {
  id: string;
  promptId: string;
  content: string;
  config: {
    model: string;
    temperature: number | null;
    maxTokens: number | null;
  };
  createdAt: string;
}

export interface CreateVersionInput {
  content: string;
  config?: {
    model?: string;
    temperature?: number | null;
    maxTokens?: number | null;
  };
}

export interface PromptMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
