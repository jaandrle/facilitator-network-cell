import { defineConfig, createFilter, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import { config } from "./bs/helpers/.config.js";
import { updateLanguages } from "./bs/helpers/.languages.js";

export default defineConfig({
	define: { VITE: { config } },
	plugins: [
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
});
