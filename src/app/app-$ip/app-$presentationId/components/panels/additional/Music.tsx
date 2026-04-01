import type { AdditionalComponentProps } from "./types.d.ts";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "@/core";
import { Tab, Content, Ul, Li, UlPreview, Button, viewTransitionUl, TabSvgIcon, LiSvgIcon } from "../index.css";
import { useQuery } from "@/api";
import { startViewTransition } from "@/ui";
import { svgIconMusicOffId, svgIconMusicOnId } from "../../../assets/index.js";
import { type MusicApiStatus, MusicPlayer } from "../../MusicPlayer/exports";
import { useAtomValue } from "jotai";
import { atomPresentationId } from "../../../core";

export function Music({ slideId, activeTab, setActiveTab, headerRef }: AdditionalComponentProps) {
	const { t } = useTranslation();
	const presentationId = useAtomValue(atomPresentationId) as string;
	const presentation = useMemo(() => ({ presentationId, slideId }), [presentationId, slideId]);
	const music = useQuery("getMusic", presentation);
	const [musicState, setMusicState] = useState<MusicApiStatus>("idle");
	const [trackId, setTrackId] = useState<string | null>(null);
	const track = trackId !== null && music.data?.find((track) => track.id === trackId);
	const playing = music.data?.find((track) => track.active);
	function handleMusicChoosed(id: string) {
		startViewTransition(viewTransitionUl, () => setTrackId(id));
	}
	function handleTab() {
		// TODO: on first time show tooltip?
		if (activeTab !== "music") return setActiveTab("music");
		if (playing && playing.id !== trackId) return setTrackId(playing.id);
	}

	return (
		<>
			{headerRef.current &&
				createPortal(
					<Tab aria-pressed={activeTab === "music"} onClick={handleTab} type="button">
						<TabSvgIcon icon={playing !== undefined ? svgIconMusicOnId : svgIconMusicOffId} />
						{t`presentationMusic`}
					</Tab>,
					headerRef.current,
				)}
			<Content aria-hidden={activeTab !== "music"} data-state={musicState}>
				{music.status === "success" && music.data.length > 0 ? (
					<>
						<Ul>
							{music.data.map((trackNth) => (
								<Li key={trackNth.id}>
									<Button
										aria-pressed={trackId === trackNth.id}
										onClick={() => handleMusicChoosed(trackNth.id)}
										type="button"
									>
										{trackNth.title}
										{trackNth.active && <LiSvgIcon icon={svgIconMusicOnId} />}
									</Button>
								</Li>
							))}
						</Ul>
						<UlPreview aria-live="polite">
							{track && (
								<MusicPlayer track={track} presentation={presentation} playing={playing} onChange={setMusicState} />
							)}
						</UlPreview>
					</>
				) : (
					<Ul>
						<li>No music</li>
					</Ul>
				)}
			</Content>
		</>
	);
}
