
import { Layout as LayoutRaw } from "@/ui/layout";
import { createFileRoute } from "@tanstack/react-router";
import { useAPI } from "@/api";
import { ReadyState, ApiState } from "@/api";
import { useEffect } from "react";
import { useTranslation } from "@/core/translations";
import { Button } from "@/components/buttons";

export const Route = createFileRoute("/dashboard/$ip")({
	component: Page,
});

function useLaguageEffect(api: ApiState) {
	const languageWS = api.language;
	const { changeLanguage } = useTranslation();
	useEffect(() => {
		if (languageWS.readyState !== ReadyState.DATA) return;

		changeLanguage(languageWS.data);
	}, [languageWS]);
	if (languageWS.readyState !== ReadyState.DATA) languageWS.send();
}

export function Page() {
	const { ip } = Route.useParams();
	const api = useAPI(ip);
	const isConnected = api.readyState === WebSocket.OPEN;

	useLaguageEffect(api);

	const { t } = useTranslation();
	const { presentation } = api;

	if (presentation.readyState === ReadyState.DATA) console.log(presentation.data);

	return (
		<LayoutRaw aria-busy={!isConnected} aria-live="polite">
			<Button onClick={() => presentation.send()} type="button">
				{t`dashboardButtonMenu`}
			</Button>
		</LayoutRaw>
	);
}
