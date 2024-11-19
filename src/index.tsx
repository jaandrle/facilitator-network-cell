const el= (tag: string, idl: Record<string, string>)=>
	Object.assign(document.createElement(tag), idl);
document.head.append(
	el("title", { textContent: VITE.config.appName }),
	el("meta", { name: "theme-color", content: VITE.config.appColor }),
);

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./ui/globals";
import App from "@/app";
createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<GlobalStyle />
		<App />
		<ToastContainer
			position="bottom-center"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="dark"
		/>
	</StrictMode>
);
