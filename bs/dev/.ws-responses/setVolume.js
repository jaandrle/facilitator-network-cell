import { setMockVolume } from "./getVolume.js";

export default function setVolume(data) {
	const { volume } = data;
	// Validate volume range
	const validatedVolume = Math.max(0, Math.min(100, Number(volume)));

	// Update mock state
	setMockVolume(validatedVolume);

	return { success: true };
}
