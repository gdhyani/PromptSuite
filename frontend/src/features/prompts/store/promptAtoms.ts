import { atom } from "jotai";
import type { PromptMessage } from "../types";

export const selectedPromptIdAtom = atom<string | null>(null);

export const promptFiltersAtom = atom({
  type: "all" as "all" | "system" | "user" | "tool" | "structured_output",
  search: "",
  file: "",
});

// Editor state
export const editorMessagesAtom = atom<PromptMessage[]>([
  { role: "system", content: "" },
  { role: "user", content: "" },
]);

export const editorConfigAtom = atom({
  model: "gpt-4",
  temperature: 0.7,
  maxTokens: 1000,
});

export const editorVariablesAtom = atom<Record<string, string>>({});
