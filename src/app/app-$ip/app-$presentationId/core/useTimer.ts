import { useState, useCallback, useRef, useEffect, useMemo } from "react";

export function useTimer() {
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = window.setInterval(() => {
				setElapsedSeconds((s) => s + 1);
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isRunning]);

	const start = useCallback(() => {
		setIsRunning(true);
	}, []);

	const stop = useCallback(() => {
		setIsRunning(false);
	}, []);

	const reset = useCallback(() => {
		setIsRunning(false);
		setElapsedSeconds(0);
	}, []);

	const toggle = useCallback(() => {
		setIsRunning((running) => !running);
	}, []);

	const formattedTime = useMemo(() => {
		const minutes = Math.floor(elapsedSeconds / 60);
		const seconds = elapsedSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}, [elapsedSeconds]);

	return {
		isRunning,
		elapsedSeconds,
		formattedTime,
		start,
		stop,
		reset,
		toggle,
	};
}
