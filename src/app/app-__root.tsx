import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { useTranslationInit } from "@/core/translations";
import { useBackButtonRegister } from "@/core/useBackButton";
import { isScaled } from "@/ui/sizes";

export const Route = createRootRoute({
	component: Root,
	notFoundComponent: () => (
		<>
			<h1>Not Found</h1>
			<Link to="/">GO HOME</Link>
		</>
	),
});

function Root() {
	const { loading, language: lang, i18n } = useTranslationInit();
	useEffect(() => {
		Object.assign(document.documentElement, { lang, dir: i18n.dir() });
	}, [lang, i18n.dir]);
	useEffect(() => {
		document.body.dataset.js_state = loading ? "loading" : "ready";
	}, [loading]);
	useEffect(() => {
		const listener = () => {
			document.body.style.removeProperty("--app-scale");
			if (!matchMedia(isScaled).matches) return;
			const { clientHeight } = document.documentElement;
			document.body.style.setProperty("--app-scale", `${clientHeight / 500}`);
		};
		listener();
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, []);
	useBackButtonRegister();

	return (
		<>
			<Outlet />
			{import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
		</>
	);
}
