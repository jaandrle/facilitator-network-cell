/// <reference types="vite/client" />
import { config } from "../../bs/helpers/.config";
declare global {
	declare const VITE: {
		readonly config: typeof config;
	};
}
interface ImportMetaEnv {
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
