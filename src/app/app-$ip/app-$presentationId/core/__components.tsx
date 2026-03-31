import { useTimer } from "./useTimer";

export function TimerTestComponent({ onChange }: { onChange?: (value: { isRunning: boolean; elapsedSeconds: number; data: number[] }) => void }) {
	const { isRunning, elapsedSeconds, data } = useTimer();

	if (onChange) {
		onChange({ isRunning, elapsedSeconds, data });
	}

	return (
		<div>
			<p>Running: {isRunning ? "true" : "false"}</p>
			<p>Elapsed: {elapsedSeconds}</p>
			<p>Time: {data.join(":")}</p>
		</div>
	);
}
