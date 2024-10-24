#!/usr/bin/env -S npx nodejsscript
import { describeFromReadme } from "../.common.js";

$.api("", true)
.describe(describeFromReadme())
.action(function main(){
	s.run`git config core.hooksPath bs/git-hooks`;
	$.exit(0);
})
.parse();
