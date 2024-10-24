import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

import { config } from "./bs/helpers/.config.js";

export default defineConfig({
	define: { VITE: { config } },
	plugins: [
		react(),
		tsconfigPaths(),
	],
	root: "./src",
	build: {
		outDir: "../dist",
		minify: false,
		emptyOutDir: true,
	},
});
