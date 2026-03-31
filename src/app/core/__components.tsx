// Test components for app core hooks
import { usePartialIp } from "./usePartialIp";

export function PartialIpTestComponent({ onChange }: { onChange?: (value: { value?: string; loading: boolean; error: boolean }) => void }) {
	const { value, loading, error } = usePartialIp();
	
	// Call onChange callback if provided
	if (onChange) {
		// This would normally be in useEffect, but for testing we can call it directly
		onChange({ value, loading, error });
	}
	
	return (
		<div>
			<p>Partial IP: {value}</p>
			<p>Loading: {loading ? "true" : "false"}</p>
			<p>Error: {error ? "true" : "false"}</p>
		</div>
	);
}