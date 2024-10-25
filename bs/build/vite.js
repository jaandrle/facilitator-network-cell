#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
const path= $.pathFromURL(import.meta.url);

if($.isMain(import.meta))
	$.api("", true)
	.describe(describeFromReadme())
	.action(function main(){
		buildVite();
		$.exit(0);
	})
	.parse();

export function buildVite(){
	buildConfig();
	buildFE();
}
import { configJSONFileAssign } from "../helpers/.config.js";
export function buildConfig(){
	configJSONFileAssign(
		path`../../src/manifest.json`,
		({ appName, appColor }) => ({
			name: appName,
			short_name: appName,
			background_color: appColor,
			theme_color: appColor,
		})
	);
}
export function buildFE(){
	s.run`npx tsc`;
	s.run`npx vite build`;
}
