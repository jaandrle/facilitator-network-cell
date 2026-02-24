import { useEffect, useState } from "react";
import type { MusicType } from "./types";
import { Visualizer } from "./Visualizer";
import { ButtonPlayStop } from "./ButtonPlayStop";
import type { MusicApiStatus } from "./types";
import { VolumeSlider } from "./VolumeSlider";
import { mergeTanStackStatuses } from "../../core";

export function MusicPlayer({
	track,
	playing,
	presentation,
	onChange,
}: {
	track: MusicType;
	presentation: { presentationId: string; slideId: number };
	playing?: MusicType;
	onChange?: (status: MusicApiStatus) => void;
}) {
	const [playChangeStatus, setPlayChangeStatus] = useState<MusicApiStatus>("idle");
	const [volumeChangeStatus, setVolumeChangeStatus] = useState<MusicApiStatus>("idle");

	useEffect(() => {
		if (!onChange) return;
		onChange(mergeTanStackStatuses(playChangeStatus, volumeChangeStatus));
	}, [playChangeStatus, volumeChangeStatus, onChange]);

	return (
		<>
			<Visualizer data-is-playing={track.active} />
			<VolumeSlider presentation={presentation} onChange={setVolumeChangeStatus} />
			<ButtonPlayStop track={track} playing={playing} presentation={presentation} onChange={setPlayChangeStatus} />
		</>
	);
}
