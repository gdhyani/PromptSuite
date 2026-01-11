import mongoose, { Schema } from "mongoose";

export interface ITestRun {
  _id: mongoose.Types.ObjectId;
  promptId: mongoose.Types.ObjectId;
  versionId: mongoose.Types.ObjectId | null;
  userId: mongoose.Types.ObjectId;
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
  tags: string[];
  metadata: Record<string, unknown>;
  cost: {
    inputCost: number;
    outputCost: number;
    totalCost: number;
    currency: string;
  };
  review: {
    status: "pending" | "approved" | "rejected" | "needs_review";
    reviewedBy: mongoose.Types.ObjectId | null;
    reviewedAt: Date | null;
    feedback: {
      rating: number | null;
      thumbs: "up" | "down" | null;
      comment: string;
    };
    annotations: Array<{
      text: string;
      label: string;
      createdBy: mongoose.Types.ObjectId;
      createdAt: Date;
    }>;
  };
  flagged: boolean;
  flagReason: string;
  createdAt: Date;
}

const testRunSchema = new Schema<ITestRun>(
  {
    promptId: {
      type: Schema.Types.ObjectId,
      ref: "DetectedPrompt",
      required: true,
      index: true,
    },
    versionId: {
      type: Schema.Types.ObjectId,
      ref: "PromptVersion",
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    input: {
      variables: { type: Schema.Types.Mixed, default: {} },
      config: {
        model: { type: String, default: "gpt-4" },
        temperature: { type: Number, default: null },
        maxTokens: { type: Number, default: null },
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
    },
    output: {
      response: { type: String, default: "" },
      usage: {
        promptTokens: { type: Number, default: 0 },
        completionTokens: { type: Number, default: 0 },
        totalTokens: { type: Number, default: 0 },
      },
      latencyMs: { type: Number, default: 0 },
      finishReason: { type: String, default: "" },
    },
    provider: {
      type: String,
      default: "openai",
    },
    model: {
      type: String,
      default: "gpt-4",
    },
    starred: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    cost: {
      inputCost: { type: Number, default: 0 },
      outputCost: { type: Number, default: 0 },
      totalCost: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    review: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "needs_review"],
        default: "pending",
      },
      reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
      reviewedAt: { type: Date, default: null },
      feedback: {
        rating: { type: Number, default: null },
        thumbs: { type: String, enum: ["up", "down", null], default: null },
        comment: { type: String, default: "" },
      },
      annotations: {
        type: [
          {
            text: { type: String, required: true },
            label: { type: String, required: true },
            createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
            createdAt: { type: Date, default: Date.now },
          },
        ],
        default: [],
      },
    },
    flagged: {
      type: Boolean,
      default: false,
    },
    flagReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

testRunSchema.index({ promptId: 1, createdAt: -1 });
testRunSchema.index({ userId: 1, createdAt: -1 });
testRunSchema.index({ "review.status": 1 });
testRunSchema.index({ flagged: 1 });

export const TestRun = mongoose.model<ITestRun>("TestRun", testRunSchema);
