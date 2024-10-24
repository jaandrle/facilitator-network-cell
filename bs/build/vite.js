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
	buildManigest();
	buildFE();
}
import { config } from "../helpers/.config.js";
export function buildManigest(){
	const src= path`../../src/manifest.json`;
	const manifest= s.cat(src).xargs(JSON.parse);
	Object.assign(manifest, {
		name: config.appName,
		short_name: config.appName,
		background_color: config.appColor,
		theme_color: config.appColor,
	});
	s.echo(JSON.stringify(manifest, null, "\t")).to(src);
	echo(src);
}
export function buildFE(){
	s.run`npx tsc`;
	s.run`npx vite build`;
}
