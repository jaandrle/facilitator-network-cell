import type { AdditionalComponentProps } from "./types.d.ts";
import { useSession } from "../../../core";
import { createPortal } from "react-dom";
import { useTranslation } from "@/core";
import { Tab, Content, Ul, Li, Link, TabSvgIcon } from "../index.css";
import { svgIconActivitiesId } from "../../../assets";

export function Activities({ slideId, activeTab, setActiveTab, headerRef }: AdditionalComponentProps) {
	const { t } = useTranslation();
	const currentSession = useSession(slideId);
	const isActive = activeTab === "activities" || !activeTab;
	const sessionGames = currentSession?.games || [];

	return (
		<>
			{headerRef.current &&
				createPortal(
					<Tab aria-pressed={isActive} onClick={() => setActiveTab("activities")} type="button">
						<TabSvgIcon icon={svgIconActivitiesId} />
						{t`presentationActivities`}
					</Tab>,
					headerRef.current,
				)}
			<Content aria-hidden={!isActive}>
				{sessionGames.length > 0 ? (
					<Ul>
						{sessionGames.map((activity) => (
							<Li key={activity.id}>
								<Link>
									{activity.done ? "DONE" : activity.isNew ? "NEW" : null}
									{activity.title}
								</Link>
							</Li>
						))}
					</Ul>
				) : (
					<Ul>
						<li>No activities</li>
					</Ul>
				)}
			</Content>
		</>
	);
}
