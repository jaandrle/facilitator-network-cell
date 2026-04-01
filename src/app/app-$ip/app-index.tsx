import { Li, Ul, Link, H1 } from "./index.css";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@/api";
import { useTranslation, useSetAtomsFromPage } from "@/core";
import { Layout as LayoutRaw } from "@/ui";
import atoms from "./core/atoms";

export const Route = createFileRoute("/$ip/")({
	component: Page,
});

export function Page() {
	const { ip } = useSetAtomsFromPage(atoms, Route.useParams());
	const { t } = useTranslation();
	const { data, status } = useQuery("listPresentation", undefined);
	const isBusy = status === "pending";

	return (
		<LayoutRaw>
			<H1>{t`dashboardHeader`}</H1>
			<Ul aria-busy={isBusy} aria-live="polite">
				{status === "pending"
					? Array.from({ length: 3 }).map((_, i) => <Li key={i as number} />)
					: status === "error"
						? t`dashboardError`
						: !data || !data.length
							? t`dashboardEmpty`
							: data.map(({ presentation_id, name, version, lang_name }) => (
									<Li key={presentation_id}>
										<strong>{name}</strong>
										<span>{lang_name}</span>
										<span>
											{t`dashboardVersion`} {version}
										</span>
										<Link to="/$ip/$presentationId" params={{ presentationId: presentation_id, ip }}>
											{t`dashboardStart`}
										</Link>
									</Li>
								))}
			</Ul>
		</LayoutRaw>
	);
}
