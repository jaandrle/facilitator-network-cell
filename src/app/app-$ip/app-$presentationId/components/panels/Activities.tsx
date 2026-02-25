import { useState } from "react";
import { useTranslation } from "@/core";
import { Container, Header, Tab, Content } from "./index.css";
import type { Activity, Music } from "@/types/presentation";

export type ActivitiesPanelProps = {
	activities: Activity[];
	music: Music[];
	onToggleActivity: (activityId: string, done: boolean) => void;
	onToggleMusic: (musicId: string, active: boolean) => void;
};

export function ActivitiesPanel({ activities, music, onToggleActivity, onToggleMusic }: ActivitiesPanelProps) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<"activities" | "music">("activities");

	return (
		<Container>
			<Header>
				<Tab $active={activeTab === "activities"} onClick={() => setActiveTab("activities")} type="button">
					{t`presentationActivities`}
				</Tab>
				<Tab $active={activeTab === "music"} onClick={() => setActiveTab("music")} type="button">
					{t`presentationMusic`}
				</Tab>
			</Header>
			<Content>
				{activeTab === "activities" ? (
					<div>
						{activities.length > 0 ? (
							activities.map((activity) => (
								<div key={activity.id}>
									<input
										type="checkbox"
										checked={activity.done}
										onChange={(e) => onToggleActivity(activity.id, e.target.checked)}
										id={`activity-${activity.id}`}
									/>
									<label htmlFor={`activity-${activity.id}`}>{activity.title}</label>
									{activity.isNew && <span>NEW</span>}
								</div>
							))
						) : (
							<span>No activities</span>
						)}
					</div>
				) : (
					<div>
						{music.length > 0 ? (
							music.map((track) => (
								<div key={track.id}>
									<button type="button" onClick={() => onToggleMusic(track.id, !track.active)}>
										{track.active ? t`presentationTimerStop` : t`presentationTimerStart`}
									</button>
									<span>{track.title}</span>
								</div>
							))
						) : (
							<span>No music</span>
						)}
					</div>
				)}
			</Content>
		</Container>
	);
}
