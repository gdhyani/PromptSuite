import mongoose, { Schema } from "mongoose";

export interface IUserSettings {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  providers: Array<{
    provider: "openai" | "anthropic" | "custom";
    apiKey: string; // Encrypted
    customEndpoint?: string;
  }>;
  defaultModel: string;
  defaultTemperature: number;
  defaultMaxTokens: number;
  updatedAt: Date;
}

const userSettingsSchema = new Schema<IUserSettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    providers: {
      type: [
        {
          provider: {
            type: String,
            enum: ["openai", "anthropic", "custom"],
            required: true,
          },
          apiKey: {
            type: String,
            required: true,
          },
          customEndpoint: {
            type: String,
          },
        },
      ],
      default: [],
    },
    defaultModel: {
      type: String,
      default: "gpt-4",
    },
    defaultTemperature: {
      type: Number,
      default: 0.7,
      min: 0,
      max: 2,
    },
    defaultMaxTokens: {
      type: Number,
      default: 1000,
      min: 1,
      max: 128000,
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

export const UserSettings = mongoose.model<IUserSettings>("UserSettings", userSettingsSchema);
