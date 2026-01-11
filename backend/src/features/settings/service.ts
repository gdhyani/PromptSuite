import { UserSettings } from "../../models/UserSettings.js";
import { logger } from "../../lib/logger.js";
import type { ProviderSettings, SaveProviderInput, UserSettings as UserSettingsType } from "./types.js";

function maskApiKey(key: string): string {
  if (key.length <= 8) return "****";
  return key.slice(0, 4) + "****" + key.slice(-4);
}

export const settingsService = {
  async getProviders(userId: string): Promise<ProviderSettings[]> {
    logger.debug("settingsService.getProviders", { userId });

    const settings = await UserSettings.findOne({ userId });

    if (!settings || settings.providers.length === 0) {
      return [
        { provider: "openai", apiKey: "", isConfigured: false },
        { provider: "anthropic", apiKey: "", isConfigured: false },
        { provider: "custom", apiKey: "", customEndpoint: "", isConfigured: false },
      ];
    }

    const providers: ProviderSettings[] = [
      { provider: "openai", apiKey: "", isConfigured: false },
      { provider: "anthropic", apiKey: "", isConfigured: false },
      { provider: "custom", apiKey: "", customEndpoint: "", isConfigured: false },
    ];

    for (const p of settings.providers) {
      const idx = providers.findIndex((pr) => pr.provider === p.provider);
      if (idx !== -1) {
        providers[idx] = {
          provider: p.provider,
          apiKey: maskApiKey(p.apiKey),
          customEndpoint: p.customEndpoint,
          isConfigured: true,
        };
      }
    }

    return providers;
  },

  async saveProvider(userId: string, input: SaveProviderInput): Promise<ProviderSettings> {
    logger.info("settingsService.saveProvider", { userId, provider: input.provider });

    let settings = await UserSettings.findOne({ userId });

    if (!settings) {
      settings = new UserSettings({
        userId,
        providers: [],
      });
    }

    // Update or add provider
    const existingIdx = settings.providers.findIndex((p) => p.provider === input.provider);

    const providerData = {
      provider: input.provider,
      apiKey: input.apiKey, // In production, encrypt this
      customEndpoint: input.customEndpoint,
    };

    if (existingIdx !== -1) {
      settings.providers[existingIdx] = providerData;
    } else {
      settings.providers.push(providerData);
    }

    await settings.save();

    logger.info("Provider saved", { userId, provider: input.provider });

    return {
      provider: input.provider,
      apiKey: maskApiKey(input.apiKey),
      customEndpoint: input.customEndpoint,
      isConfigured: true,
    };
  },

  async deleteProvider(userId: string, provider: string): Promise<void> {
    logger.info("settingsService.deleteProvider", { userId, provider });

    await UserSettings.updateOne(
      { userId },
      { $pull: { providers: { provider } } }
    );

    logger.info("Provider deleted", { userId, provider });
  },

  async getSettings(userId: string): Promise<UserSettingsType> {
    logger.debug("settingsService.getSettings", { userId });

    const settings = await UserSettings.findOne({ userId });
    const providers = await this.getProviders(userId);

    return {
      providers,
      defaultModel: settings?.defaultModel || "gpt-4",
      defaultTemperature: settings?.defaultTemperature || 0.7,
      defaultMaxTokens: settings?.defaultMaxTokens || 1000,
    };
  },

  async getApiKey(userId: string, provider: string): Promise<string | null> {
    const settings = await UserSettings.findOne({ userId });
    if (!settings) return null;

    const p = settings.providers.find((pr) => pr.provider === provider);
    return p?.apiKey || null;
  },
};
