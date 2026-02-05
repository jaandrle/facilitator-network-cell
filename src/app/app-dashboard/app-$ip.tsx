import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { type IPAddress, useAPI } from "@/api";
import { Button } from "@/components/";
import { useTranslation } from "@/core/";
import { Layout as LayoutRaw } from "@/ui/layout";

export const Route = createFileRoute("/dashboard/$ip")({
	component: Page,
});

function useLaguageEffect(ip: IPAddress) {
	const { useEmit } = useAPI(ip);
	const lang = useEmit("server.getLang");
	const { changeLanguage } = useTranslation();
	useEffect(() => {
		if (lang.response !== null && lang.state !== "pending") return;
		if (lang.state === "error") return; // TODO?

		changeLanguage(lang.response);
	}, [lang, changeLanguage]);
	return lang;
}

export function Page() {
	const { ip } = Route.useParams();
	const { t } = useTranslation();
	const { state, useEmit } = useAPI(ip);
	const isConnected = state === "connected";
	const lang = useLaguageEffect(ip);
	const presentation = useEmit("getConfigPresentation");
	useEffect(() => {
		console.log(lang, presentation);
	}, [lang, presentation]);

	return (
		<LayoutRaw aria-busy={!isConnected} aria-live="polite">
			<Button onClick={() => presentation.emit(undefined)} type="button">
				{t`dashboardButtonMenu`}
			</Button>
			<Link to="/" reloadDocument style={{ color: "white" }}>Try again</Link>
		</LayoutRaw>
	);
}
