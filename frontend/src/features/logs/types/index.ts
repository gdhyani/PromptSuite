export interface LogEntry {
  id: string;
  promptId: string | null;
  promptName: string | null;
  model: string;
  provider: string;
  status: "success" | "error";
  latencyMs: number;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost: number;
  tags: string[];
  createdAt: string;
}

export interface LogFilters {
  search: string;
  model: string | null;
  status: "all" | "success" | "error";
  dateRange: {
    start: string;
    end: string;
  };
  tags: string[];
}

export interface LogsResponse {
  logs: LogEntry[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
