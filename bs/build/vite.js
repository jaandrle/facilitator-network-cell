#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
const path= $.pathFromURL(import.meta.url);

if($.isMain(import.meta))
	$.api("", true)
	.describe(describeFromReadme())
	.option("--lint", "Force lint before build", false)
	.action(function main({ lint }){
		buildVite({ lint });
		$.exit(0);
	})
	.parse();

/**
 * @typedef {Object} BuildOptions
 * @property {boolean} [options.lint] Force lint before build
 * */
/** @param {BuildOptions} options */
export function buildVite({ lint }= {}){
	buildConfig();
	buildFE({ lint });
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
/** @param {BuildOptions} options */
export function buildFE({ lint }= {}){
	if(lint) lintFE();
	s.run`npx tsc --noCheck`;
	if(!$.is_verbose){
		echo.use("-R", "Vite build...");
		s.run`npx vite build --logLevel warn`;
		echo("✓ Vite build");
	} else {
		s.run`npx vite build`;
	}
}
