#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
const path= $.pathFromURL(import.meta.url);

if($.isMain(import.meta))
	$.api("", true)
	.describe(describeFromReadme())
	.action(function main(){
		buildCapacitor($.slice(1));
		$.exit(0);
	})
	.parse();

export function buildCapacitor(options){
	buildManifest();
	buildAndroid(options);
}
import { config } from "../helpers/.config.js";
export function buildManifest(){
	const src= path`../../capacitor.config.json`;
	const manifest= s.cat(src).xargs(JSON.parse);
	Object.assign(manifest, {
		appId: config.appId,
		appName: config.appName,
	});
	s.echo(JSON.stringify(manifest, null, "\t")).to(src);
	echo(src);
}
export function buildAndroid(options){
	s.run`npx cap build android ${options}`;
}
