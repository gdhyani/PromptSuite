export interface TestExecutionInput {
  promptId?: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  config: {
    model: string;
    temperature?: number | null;
    maxTokens?: number | null;
    stream?: boolean;
  };
  variables?: Record<string, string>;
  apiKey?: string;
}

export interface TestRunResponse {
  id: string;
  promptId: string | null;
  input: {
    variables: Record<string, string>;
    config: {
      model: string;
      temperature: number | null;
      maxTokens: number | null;
    };
    messages: Array<{
      role: string;
      content: string;
    }>;
  };
  output: {
    response: string;
    usage: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
    latencyMs: number;
    finishReason: string;
  };
  provider: string;
  model: string;
  starred: boolean;
  cost: {
    inputCost: number;
    outputCost: number;
    totalCost: number;
    currency: string;
  };
  createdAt: string;
}
