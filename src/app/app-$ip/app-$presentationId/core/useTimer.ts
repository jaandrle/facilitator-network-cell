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

	const data = useMemo(() => {
		const hours = Math.floor(elapsedSeconds / 3600);
		const minutes = Math.floor((elapsedSeconds - hours * 3600) / 60);
		const seconds = elapsedSeconds % 60;
		return [hours, minutes, seconds];
	}, [elapsedSeconds]);

	return {
		isRunning,
		elapsedSeconds,
		data,
		start,
		stop,
		reset,
		toggle,
	};
}
