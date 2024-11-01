#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
const path= $.pathFromURL(import.meta.url);

if($.isMain(import.meta))
	$.api("", true)
	.describe(describeFromReadme())
	.action(async function main(){
		await buildCapacitor($.slice(1));
		$.exit(0);
	})
	.parse();

export async function buildCapacitor(options){
	buildConfig();
	await buildAndroid(options);
}
import { configJSONFileAssign, pkg } from "../helpers/.config.js";
export function buildConfig(){
	configJSONFileAssign(
		path`../../capacitor.config.json`,
		({ appId, appName }) => ({ appId, appName })
	);
	s.$("-V").run`npx capacitor-set-version set:android -v ${pkg.version} -b 1`;
}
export async function buildAndroid(options){
	try{
		await s.$("-V").runA(
			"npx cap build android ::options::",
			{ options },
			{ stdio: "inherit" }
		);
	} catch(e){
		echo(e);
		$.exit(e.exitCode || 1);
	}
}
