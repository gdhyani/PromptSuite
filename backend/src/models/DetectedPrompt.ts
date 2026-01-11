import mongoose, { Schema, Document } from "mongoose";

export interface IExtractedConfig {
  model: string;
  temperature: number | null;
  maxTokens: number | null;
  stream: boolean;
  tools: any[];
  responseFormat: any | null;
}

export interface IDetectedPrompt extends Document {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  promptType: "system" | "user" | "assistant" | "tool" | "structured_output";
  originalContent: string;
  extractedConfig: IExtractedConfig;
  messages: Array<{
    role: string;
    content: string;
    variables: string[];
  }>;
  variables: string[];
  createdAt: Date;
  updatedAt: Date;
}

const extractedConfigSchema = new Schema(
  {
    model: { type: String, default: "gpt-4" },
    temperature: { type: Number, default: null },
    maxTokens: { type: Number, default: null },
    stream: { type: Boolean, default: false },
    tools: { type: [Schema.Types.Mixed], default: [] },
    responseFormat: { type: Schema.Types.Mixed, default: null },
  },
  { _id: false }
);

const messageSchema = new Schema(
  {
    role: { type: String, required: true },
    content: { type: String, required: true },
    variables: { type: [String], default: [] },
  },
  { _id: false }
);

const detectedPromptSchema = new Schema<IDetectedPrompt>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    lineNumber: {
      type: Number,
      required: true,
    },
    columnNumber: {
      type: Number,
      default: 0,
    },
    promptType: {
      type: String,
      enum: ["system", "user", "assistant", "tool", "structured_output"],
      required: true,
    },
    originalContent: {
      type: String,
      required: true,
    },
    extractedConfig: {
      type: extractedConfigSchema,
      default: () => ({}),
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
    variables: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

detectedPromptSchema.index({ projectId: 1, filePath: 1 });

export const DetectedPrompt = mongoose.model<IDetectedPrompt>(
  "DetectedPrompt",
  detectedPromptSchema
);
