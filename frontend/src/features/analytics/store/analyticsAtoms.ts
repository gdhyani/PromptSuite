import { atom } from "jotai";

// Date range filter
export const analyticsDateRangeAtom = atom({
  startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days ago
  endDate: new Date().toISOString().split("T")[0], // today
});

// Model filter
export const analyticsModelFilterAtom = atom<string | null>(null);

// View mode (chart type)
export const analyticsViewModeAtom = atom<"usage" | "cost" | "latency">("usage");
