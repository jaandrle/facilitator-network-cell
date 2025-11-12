/// <reference types="vite/client" />
import type { config } from "../../bs/helpers/.config";

declare global {
	declare const VITE: {
		readonly config: typeof config;
	};
}
// biome-ignore lint/complexity/noBannedTypes: TBD
type ImportMetaEnv = {};

export interface ImportMeta {
	readonly env: ImportMetaEnv;
}
