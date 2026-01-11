import { TestRun } from "../../models/TestRun.js";
import { Project } from "../../models/Project.js";
import { logger } from "../../lib/logger.js";
import { NotFoundError } from "../../lib/errors.js";
import type { ProjectAnalytics, DailyStats, CostBreakdown, AnalyticsQuery } from "./types.js";

function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

export const analyticsService = {
  async getProjectAnalytics(
    projectId: string,
    userId: string,
    query?: AnalyticsQuery
  ): Promise<ProjectAnalytics> {
    logger.debug("analyticsService.getProjectAnalytics", { projectId });

    // Verify project access
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      throw new NotFoundError("Project not found", { projectId });
    }

    // Build query filter
    const filter: Record<string, unknown> = { userId };

    // Get prompts for this project
    const { DetectedPrompt } = await import("../../models/DetectedPrompt.js");
    const prompts = await DetectedPrompt.find({ projectId }).select("_id");
    const promptIds = prompts.map((p) => p._id);

    if (promptIds.length > 0) {
      filter.promptId = { $in: promptIds };
    } else {
      // No prompts = no runs
      return {
        totalRuns: 0,
        totalTokens: 0,
        totalCost: 0,
        avgLatencyMs: 0,
        p50LatencyMs: 0,
        p95LatencyMs: 0,
        p99LatencyMs: 0,
        avgRating: 0,
        thumbsUp: 0,
        thumbsDown: 0,
        flaggedCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
      };
    }

    if (query?.startDate) {
      filter.createdAt = { ...((filter.createdAt as object) || {}), $gte: new Date(query.startDate) };
    }
    if (query?.endDate) {
      filter.createdAt = { ...((filter.createdAt as object) || {}), $lte: new Date(query.endDate) };
    }
    if (query?.model) {
      filter.model = query.model;
    }

    const runs = await TestRun.find(filter);

    const totalRuns = runs.length;
    const totalTokens = runs.reduce((sum, r) => sum + (r.output?.usage?.totalTokens || 0), 0);
    const totalCost = runs.reduce((sum, r) => sum + (r.cost?.totalCost || 0), 0);
    const latencies = runs.map((r) => r.output?.latencyMs || 0).filter((l) => l > 0);
    const avgLatencyMs = latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;

    const ratings = runs
      .map((r) => r.review?.feedback?.rating)
      .filter((r): r is number => r !== null && r !== undefined);
    const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    const thumbsUp = runs.filter((r) => r.review?.feedback?.thumbs === "up").length;
    const thumbsDown = runs.filter((r) => r.review?.feedback?.thumbs === "down").length;
    const flaggedCount = runs.filter((r) => r.flagged).length;
    const approvedCount = runs.filter((r) => r.review?.status === "approved").length;
    const rejectedCount = runs.filter((r) => r.review?.status === "rejected").length;

    return {
      totalRuns,
      totalTokens,
      totalCost,
      avgLatencyMs: Math.round(avgLatencyMs),
      p50LatencyMs: Math.round(calculatePercentile(latencies, 50)),
      p95LatencyMs: Math.round(calculatePercentile(latencies, 95)),
      p99LatencyMs: Math.round(calculatePercentile(latencies, 99)),
      avgRating: Math.round(avgRating * 10) / 10,
      thumbsUp,
      thumbsDown,
      flaggedCount,
      approvedCount,
      rejectedCount,
    };
  },

  async getDailyAnalytics(
    projectId: string,
    userId: string,
    query?: AnalyticsQuery
  ): Promise<DailyStats[]> {
    logger.debug("analyticsService.getDailyAnalytics", { projectId });

    // Verify project access
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      throw new NotFoundError("Project not found", { projectId });
    }

    // Get prompts for this project
    const { DetectedPrompt } = await import("../../models/DetectedPrompt.js");
    const prompts = await DetectedPrompt.find({ projectId }).select("_id");
    const promptIds = prompts.map((p) => p._id);

    if (promptIds.length === 0) {
      return [];
    }

    const startDate = query?.startDate
      ? new Date(query.startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = query?.endDate ? new Date(query.endDate) : new Date();

    const pipeline = [
      {
        $match: {
          userId: project.userId,
          promptId: { $in: promptIds },
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalRuns: { $sum: 1 },
          totalTokens: { $sum: "$output.usage.totalTokens" },
          totalCost: { $sum: "$cost.totalCost" },
          avgLatencyMs: { $avg: "$output.latencyMs" },
          thumbsUp: {
            $sum: { $cond: [{ $eq: ["$review.feedback.thumbs", "up"] }, 1, 0] },
          },
          thumbsDown: {
            $sum: { $cond: [{ $eq: ["$review.feedback.thumbs", "down"] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 as const } },
    ];

    const results = await TestRun.aggregate(pipeline);

    return results.map((r) => ({
      date: r._id,
      stats: {
        totalRuns: r.totalRuns,
        totalTokens: r.totalTokens || 0,
        totalCost: r.totalCost || 0,
        avgLatencyMs: Math.round(r.avgLatencyMs || 0),
        p50LatencyMs: 0, // Would need separate calculation
        p95LatencyMs: 0,
        p99LatencyMs: 0,
        avgRating: 0,
        thumbsUp: r.thumbsUp || 0,
        thumbsDown: r.thumbsDown || 0,
        flaggedCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
      },
    }));
  },

  async getCostBreakdown(projectId: string, userId: string): Promise<CostBreakdown[]> {
    logger.debug("analyticsService.getCostBreakdown", { projectId });

    // Verify project access
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      throw new NotFoundError("Project not found", { projectId });
    }

    // Get prompts for this project
    const { DetectedPrompt } = await import("../../models/DetectedPrompt.js");
    const prompts = await DetectedPrompt.find({ projectId }).select("_id");
    const promptIds = prompts.map((p) => p._id);

    if (promptIds.length === 0) {
      return [];
    }

    const pipeline = [
      {
        $match: {
          userId: project.userId,
          promptId: { $in: promptIds },
        },
      },
      {
        $group: {
          _id: "$model",
          runs: { $sum: 1 },
          inputTokens: { $sum: "$output.usage.promptTokens" },
          outputTokens: { $sum: "$output.usage.completionTokens" },
          totalCost: { $sum: "$cost.totalCost" },
        },
      },
      { $sort: { totalCost: -1 as const } },
    ];

    const results = await TestRun.aggregate(pipeline);

    return results.map((r) => ({
      model: r._id || "unknown",
      runs: r.runs,
      inputTokens: r.inputTokens || 0,
      outputTokens: r.outputTokens || 0,
      totalCost: r.totalCost || 0,
    }));
  },
};
