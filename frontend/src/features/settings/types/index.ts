export interface ProviderSettings {
  provider: "openai" | "anthropic" | "custom";
  apiKey: string;
  customEndpoint?: string;
  isConfigured: boolean;
}

export interface SaveProviderInput {
  provider: "openai" | "anthropic" | "custom";
  apiKey: string;
  customEndpoint?: string;
}

export interface UserSettings {
  providers: ProviderSettings[];
  defaultModel: string;
  defaultTemperature: number;
  defaultMaxTokens: number;
}
