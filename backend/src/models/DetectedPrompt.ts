import mongoose, { Schema, Document } from "mongoose";

export interface IExtractedConfig {
  model: string | null;
  temperature: number | null;
  maxTokens: number | null;
  topP: number | null;
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
  endLineNumber: number;
  endColumnNumber: number;
  promptType: "system" | "user" | "assistant" | "tool" | "structured_output";
  provider: "openai" | "anthropic" | "google" | "azure" | "custom";
  sdkMethod: string;
  originalContent: string;
  extractedConfig: IExtractedConfig;
  messages: Array<{
    role: string;
    content: string;
    variables: string[];
    variableRef?: {
      name: string;
      definedAt?: { line: number; column: number };
    };
  }>;
  variables: string[];
  confidence: number;
  createdAt: Date;
  updatedAt: Date;
}

const extractedConfigSchema = new Schema(
  {
    model: { type: String, default: null },
    temperature: { type: Number, default: null },
    maxTokens: { type: Number, default: null },
    topP: { type: Number, default: null },
    stream: { type: Boolean, default: false },
    tools: { type: [Schema.Types.Mixed], default: [] },
    responseFormat: { type: Schema.Types.Mixed, default: null },
  },
  { _id: false }
);

const variableRefSchema = new Schema(
  {
    name: { type: String, required: true },
    definedAt: {
      line: { type: Number },
      column: { type: Number },
    },
  },
  { _id: false }
);

const messageSchema = new Schema(
  {
    role: { type: String, required: true },
    content: { type: String, default: "" },
    variables: { type: [String], default: [] },
    variableRef: { type: variableRefSchema, default: null },
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
    endLineNumber: {
      type: Number,
      default: 0,
    },
    endColumnNumber: {
      type: Number,
      default: 0,
    },
    promptType: {
      type: String,
      enum: ["system", "user", "assistant", "tool", "structured_output"],
      required: true,
    },
    provider: {
      type: String,
      enum: ["openai", "anthropic", "google", "azure", "custom"],
      default: "openai",
    },
    sdkMethod: {
      type: String,
      default: "chat.completions.create",
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
    confidence: {
      type: Number,
      default: 0.5,
      min: 0,
      max: 1,
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
