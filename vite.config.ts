/// <reference types="vite/client" />

import { defineConfig, createFilter, createLogger, loadEnv } from "vite";
import unplugin from "@beqa/unplugin-transform-react-slots";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

import { config } from "./bs/helpers/.config.js";
import { updateLanguages } from "./bs/helpers/.languages.js";

const fromEnv = Object.fromEntries(
	Object.entries(loadEnv("development", process.cwd(), "VITE_"))
		.map(([k, v]) => [k.slice(5), v])
);
export default defineConfig({
	define: { VITE: { config, ...fromEnv } },
	plugins: [
		createSvgSpritePlugin({
			symbolId: "svgsprite-[name]",
			exportType: "custom",
			include: ["**/assets/*.svg", "**/assets/**/*.svg"],
			adapter: "id",
		}),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "./src/app",
			routeFilePrefix: "app-",
			routeFileIgnorePrefix: "",
			generatedRouteTree: "./routeTree.gen.ts",
			quoteStyle: "double",
			semicolons: true,
		}),
		unplugin.vite({
			exclude: /\.(json)/,
		}),
		react(),
		tsconfigPaths(),
		{
			name: "update-languages",
			configureServer(server){
				const filter= createFilter([ "**/translations/*.json" ]);
				const log= createLogger("info");

				server.watcher.on("change", file=> {
					if(!filter(file)) return;
					log.info(`Updating languages, because of ${file}`, { timestamp: true });
					updateLanguages();
				});
			}
		}
	],
	root: "./src",
	build: {
		outDir: "../dist",
		minify: false,
		emptyOutDir: true,
	},
	server: {
		headers: {
		},
	},
});
