import { music } from "./getMusic.js";

export default function toggleMusic(data) {
	const { musicId, active } = data;
	const track = music.find((t) => t.id === musicId);
	if (track) track.active = active;
	return { success: true };
}
