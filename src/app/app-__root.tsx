import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import {
	useRegisterAppAutoHeight,
	useRegisterAppAutoScale,
	useRegisterAppBackButton,
	useTranslationInit,
} from "@/core";

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
	useRegisterAppAutoScale();
	useRegisterAppAutoHeight();
	useRegisterAppBackButton();

	return (
		<>
			<Outlet />
			{import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
		</>
	);
}
