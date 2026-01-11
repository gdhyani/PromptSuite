import { atom } from "jotai";

export const selectedProjectIdAtom = atom<string | null>(null);

export const projectFiltersAtom = atom({
  type: "all" as "all" | "github" | "snippet",
  search: "",
});

export const isCreateProjectModalOpenAtom = atom(false);
