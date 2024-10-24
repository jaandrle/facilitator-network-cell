const { join }= require("node:path");
const { readFileSync }= require("node:fs");
const path= join(__dirname, "../../package.json");
const pkg= JSON.parse(readFileSync(path, "utf8"));

const config= pkg.config;
exports= {
	config, default: config
};
