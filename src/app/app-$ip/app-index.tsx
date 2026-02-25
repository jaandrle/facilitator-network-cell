import { Li, Ul, Link, H1 } from "./index.css";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { type IPAddress, useAPI } from "@/api";
import { useTranslation } from "@/core";
import { Layout as LayoutRaw } from "@/ui";

export const Route = createFileRoute("/$ip/")({
	component: Page,
});

function useLanguageEffect(ip: IPAddress) {
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
	const { useEmit } = useAPI(ip);
	const lang = useLanguageEffect(ip);
	const { response, state, emit } = useEmit("listPresentation");
	const isBusy = state === "idle" || state === "pending";

	useEffect(() => {
		if (state !== "idle") return;
		emit(undefined);
	}, [state, emit]);

	return (
		<LayoutRaw>
			<H1>{t`dashboardHeader`}</H1>
			<Ul aria-busy={isBusy} aria-live="polite">
				{state === "pending"
					? Array.from({ length: 3 }).map((_, i) => (
						<Li key={i as number} />
					))
					: (state === "error"
						? t`dashboardError`
						: (!response || !response.length
							? t`dashboardEmpty`
							: response.map(({ id, name, version, language }) => (
								<Li key={id}>
									<strong>{name}</strong>
									<span>{language}</span>
									<span>{t`dashboardVersion`} {version}</span>
									<Link to="/$ip/$presentationId" params={{ presentationId: id, ip }}>
										{t`dashboardStart`}
									</Link>
								</Li>
							))
						)
					)
				}
			</Ul>
		</LayoutRaw>
	);
}
