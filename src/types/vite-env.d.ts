/// <reference types="vite/client" />
import type { config } from "../../bs/helpers/.config";
import type { IpEnv } from "../../bs/helpers/.env";

type RemoveVitePrefix<T extends string> = T extends `VITE_${infer U}` ? U : T;
//remove VITE_ from IpEnv keys `{ VITE_key: "value" }`
type IpConfig<T extends keyof IpEnv> = {
	[Key in RemoveVitePrefix<T>]: IpEnv[`VITE_${Key}`];
}
declare global {
	declare const VITE: {
		readonly config: typeof config;
	} & IpConfig<keyof IpEnv>;
}
type ImportMetaEnv = IpEnv;

export interface ImportMeta {
	readonly env: ImportMetaEnv;
}
