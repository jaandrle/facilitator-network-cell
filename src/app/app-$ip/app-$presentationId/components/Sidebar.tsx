import { useState } from "react";
import { useQueryGetPresentation, useSession, useSlideNav } from "../core";
import { useTranslation } from "@/core";
import { Button, Link } from "@/components";
import {
	SidebarLayout,
	Header,
	SessionList,
	SessionItem,
	Footer,
	ButtonGroup,
	ToggleButton,
	Content,
	SvgIcon,
} from "./Sidebar.css";
import { svgIconArrowRightId } from "../assets";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@/api";

export function Sidebar() {
	const { ip, presentationId } = useParams({ from: "/$ip/$presentationId/" });
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const { data: presentation, totalSlides } = useQueryGetPresentation();
	const { data: presentationConfig } = useQuery("getPresentationConfig", { presentationId });
	const { current, setCurrent } = useSlideNav(totalSlides || 0);
	const currentSession = useSession(current);

	return (
		<SidebarLayout data-state={isOpen ? "open" : "closed"}>
			<Content inert={!isOpen}>
				<Header>
					<h4>{t`sidebarSessionsTitle`}</h4>
					{presentationConfig?.name && <h3>{presentationConfig.name}</h3>}
				</Header>

				<SessionList>
					{presentation?.sessions &&
						Object.entries(presentation.sessions).map(([sessionId, session]) => (
							<SessionItem key={sessionId}>
								<button
									type="button"
									onClick={() => setCurrent(parseInt(session.from, 10))}
									aria-pressed={currentSession && currentSession.id === sessionId ? "true" : "false"}
								>
									{session.title}{" "}
									<span>
										({session.from} – {session.to})
									</span>
								</button>
							</SessionItem>
						))}
				</SessionList>

				<Footer>
					<ButtonGroup>
						<Button type="button" data-variant="outline" disabled>{t`sidebarResetGameScore`}</Button>
						<Link to="/$ip" params={{ ip }} data-variant="outline">
							{t`sidebarChangePresentation`}
						</Link>
						<Button disabled>{t`sidebarQuitServer`}</Button>
					</ButtonGroup>
				</Footer>
			</Content>
			<SidebarToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
		</SidebarLayout>
	);
}

function SidebarToggle({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
	return (
		<ToggleButton data-open={isOpen} onClick={onClick} aria-label={isOpen ? "Close sidebar" : "Open sidebar"}>
			<SvgIcon icon={svgIconArrowRightId} data-flipped={!isOpen} />
		</ToggleButton>
	);
}
