const el = (tag: string, idl: Record<string, string>) => Object.assign(document.createElement(tag), idl);
document.head.append(
	el("title", { textContent: VITE.config.appName }),
	el("meta", { name: "theme-color", content: VITE.config.appColor }),
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { GlobalStyle } from "./ui/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const history = createHashHistory();
const router = createRouter({
	routeTree,
	history,
	defaultPreload: "intent",
	defaultViewTransition: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<GlobalStyle />
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
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
	</StrictMode>,
);
