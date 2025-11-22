import { writable } from "svelte/store";
import type { Story } from "../routes/proxy+layout";

export const isMobile = writable(false);

export const stories = writable<Story[]>([]);
