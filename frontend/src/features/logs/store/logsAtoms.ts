import { atom } from "jotai";
import type { LogFilters } from "../types";

export const logsFiltersAtom = atom<LogFilters>({
  search: "",
  model: null,
  status: "all",
  dateRange: {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 days ago
    end: new Date().toISOString().split("T")[0], // today
  },
  tags: [],
});

export const selectedLogIdAtom = atom<string | null>(null);

export const logsViewModeAtom = atom<"table" | "detail">("table");
