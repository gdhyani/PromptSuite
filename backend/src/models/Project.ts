import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: "github" | "snippet";
  name: string;
  description: string;
  githubUrl: string | null;
  branch: string;
  lastScanned: Date | null;
  lastCommitSha: string | null;
  promptCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["github", "snippet"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: null,
    },
    branch: {
      type: String,
      default: "main",
    },
    lastScanned: {
      type: Date,
      default: null,
    },
    lastCommitSha: {
      type: String,
      default: null,
    },
    promptCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ userId: 1, name: 1 });

export const Project = mongoose.model<IProject>("Project", projectSchema);
