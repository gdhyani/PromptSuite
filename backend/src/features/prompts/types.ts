export interface PromptResponse {
  id: string;
  projectId: string;
  filePath: string;
  lineNumber: number;
  promptType: string;
  originalContent: string;
  extractedConfig: {
    model: string;
    temperature: number | null;
    maxTokens: number | null;
    stream: boolean;
    tools: any[];
    responseFormat: any | null;
  };
  messages: Array<{
    role: string;
    content: string;
    variables: string[];
  }>;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PromptVersionResponse {
  id: string;
  promptId: string;
  content: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  config: {
    model: string;
    temperature: number | null;
    maxTokens: number | null;
  };
  createdAt: string;
}

export interface CreateVersionInput {
  content: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  config: {
    model: string;
    temperature?: number | null;
    maxTokens?: number | null;
  };
}
