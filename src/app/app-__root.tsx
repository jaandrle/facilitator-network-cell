
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { useBackButtonRegister } from "@/core/useBackButton";
import { useEffect } from "react";
import { useTranslationInit } from "@/core/translations";
import { isScaled } from "@/ui/sizes";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

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
	}, [lang]);
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
			{import.meta.env.DEV && <TanStackRouterDevtools />}
		</>
	);
}
