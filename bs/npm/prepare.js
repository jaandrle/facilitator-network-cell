#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";

$.api("", true)
.describe(describeFromReadme())
.action(function main(){
	if(!s.$("-fS").run`git config core.hooksPath`.code)
		$.exit(0);
	s.$("-V").run`git config core.hooksPath bs/git-hooks`;
	$.exit(0);
})
.parse();
