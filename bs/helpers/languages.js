#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";
import { updateLanguages } from "./.languages.js";
export { updateLanguages };

if($.isMain(import.meta.url))
	$.api()
	.describe(describeFromReadme())
	.action(function main(){
		updateLanguages();
		$.exit(0);
	})
	.parse();
