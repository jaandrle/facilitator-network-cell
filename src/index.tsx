const el= (tag: string, idl: Record<string, string>)=>
	Object.assign(document.createElement(tag), idl);
document.head.append(
	el("title", { textContent: VITE.config.appName }),
	el("meta", { name: "theme-color", content: VITE.config.appColor })
);

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { GlobalStyle } from "./ui/globals";
import App from "@/app";
createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<GlobalStyle />
		<App />
	</StrictMode>
);
