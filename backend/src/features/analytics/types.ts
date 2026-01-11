export interface ProjectAnalytics {
  totalRuns: number;
  totalTokens: number;
  totalCost: number;
  avgLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  avgRating: number;
  thumbsUp: number;
  thumbsDown: number;
  flaggedCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export interface DailyStats {
  date: string;
  stats: ProjectAnalytics;
}

export interface CostBreakdown {
  model: string;
  runs: number;
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
}

export interface AnalyticsQuery {
  startDate?: string;
  endDate?: string;
  model?: string;
  promptId?: string;
}
