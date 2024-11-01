export const config: {
	appId: string,
	appName: string,
	appColor: string,
};
export const pkg: {
	name: string,
	version: string,
	config: typeof config
};
export function configJSONFileAssign(src: string, update: (c: typeof config) => Record<string, any>): void;
export default config;
