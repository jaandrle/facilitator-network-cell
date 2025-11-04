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
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const history = createHashHistory();
const router = createRouter({
	routeTree, history,
	defaultPreload: "intent",
	defaultViewTransition: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<GlobalStyle />
		<RouterProvider router={router} />
		<ToastContainer
			position="bottom-center"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="dark"
		/>
	</StrictMode>
);
