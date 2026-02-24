// Mock volume state
let currentVolume = 75;

export default function getVolume(data) {
	const { presentationId, slideId } = data;
	// In a real scenario, this would be per presentation/slide
	// For mock, we just return the current volume
	return { volume: currentVolume };
}

// Export for testing/modification by other mocks
export function setMockVolume(volume) {
	currentVolume = volume;
}
