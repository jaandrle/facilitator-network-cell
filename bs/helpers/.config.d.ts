export const config: {
	appId: string,
	appName: string,
	appColor: string,
};
export function configJSONFileAssign(src: string, update: (c: typeof config) => Record<string, any>): void;
export default config;
