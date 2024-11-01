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
import { lintFE } from "../dev/lint.js";
export function buildFE(){
	lintFE();
	if(!$.is_verbose){
		echo.use("-R", "Vite build...");
		s.run`npx vite build --logLevel warn`;
		echo("✓ Vite build");
	} else {
		s.run`npx vite build`;
	}
}
