import { atom } from "jotai";

export const apiKeyAtom = atom<string>("");

export const selectedProviderAtom = atom<"openai" | "anthropic" | "custom">("openai");

export const customEndpointAtom = atom<string>("");

// Store API key in localStorage
export const storedApiKeyAtom = atom(
  (get) => get(apiKeyAtom),
  (get, set, newKey: string) => {
    set(apiKeyAtom, newKey);
    if (typeof window !== "undefined") {
      if (newKey) {
        localStorage.setItem("promptsuite_api_key", newKey);
      } else {
        localStorage.removeItem("promptsuite_api_key");
      }
    }
  }
);
