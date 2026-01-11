import { atom } from "jotai";
import type { User } from "../types";

export const userAtom = atom<User | null>(null);
export const tokenAtom = atom<string | null>(null);
export const isAuthenticatedAtom = atom((get) => get(tokenAtom) !== null);
export const isAuthLoadingAtom = atom(true);
