import mongoose, { Schema, Document } from "mongoose";

export interface IPromptVersion extends Document {
  _id: mongoose.Types.ObjectId;
  promptId: mongoose.Types.ObjectId;
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
  createdAt: Date;
}

const promptVersionSchema = new Schema<IPromptVersion>(
  {
    promptId: {
      type: Schema.Types.ObjectId,
      ref: "DetectedPrompt",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    messages: {
      type: [
        {
          role: { type: String, required: true },
          content: { type: String, required: true },
        },
      ],
      default: [],
    },
    config: {
      model: { type: String, default: "gpt-4" },
      temperature: { type: Number, default: null },
      maxTokens: { type: Number, default: null },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

promptVersionSchema.index({ promptId: 1, createdAt: -1 });

export const PromptVersion = mongoose.model<IPromptVersion>(
  "PromptVersion",
  promptVersionSchema
);
