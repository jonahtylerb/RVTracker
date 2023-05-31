import { writable } from "svelte/store";
import type { RVType } from "../utils";

export const RVToDelete = writable<RVType | null>(null);
