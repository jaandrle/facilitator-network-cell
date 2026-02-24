import type { MusicApiStatus } from "./types";
import { useEffect, useCallback, type ChangeEvent, useState } from "react";
import { useQuery, useMutation } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Container, Slider, SvgIcon } from "./VolumeSlider.css";
import { svgIconMusicOffId, svgIconMusicOnId } from "../../assets";

// biome-ignore lint/suspicious/noExplicitAny: debounce of unknown function
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
	let timeoutId: number;
	return (...args: Parameters<T>) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}

export function VolumeSlider({
	presentation,
	onChange,
}: {
	presentation: { presentationId: string; slideId: number };
	onChange?: (status: MusicApiStatus) => void;
}) {
	const queryClient = useQueryClient();
	const volumeQuery = useQuery("getVolume", presentation);
	const volumeMutation = useMutation("setVolume", {
		onMutate: async (newVolumeData: { presentationId: string; slideId: number; volume: number }) => {
			await queryClient.cancelQueries({ queryKey: ["getVolume", presentation] });
			const previousVolume = queryClient.getQueryData<{ volume: number }>(["getVolume", presentation]);

			// Optimistic update
			queryClient.setQueryData(["getVolume", presentation], { volume: newVolumeData.volume });

			return { previousVolume };
		},
		onError: (_err: Error, _variables: unknown, context: unknown) => {
			if (!context || typeof context !== "object") return;
			if ("previousVolume" in context) queryClient.setQueryData(["getVolume", presentation], context.previousVolume);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["getVolume", presentation] });
		},
	});
	const [volume, setVolume] = useState(volumeQuery.data?.volume ?? 75);
	useEffect(() => {
		if (!volumeQuery.data) return;
		setVolume(volumeQuery.data.volume);
	}, [volumeQuery.data]);
	const invokeVolumeChange = useCallback(
		debounce(() => {
			volumeMutation.mutate({
				presentationId: presentation.presentationId,
				slideId: presentation.slideId,
				volume,
			});
		}, 300),
		[],
	);
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement> | number) => {
			setVolume(typeof e === "number" ? e : e.target.valueAsNumber);
			invokeVolumeChange();
		},
		[invokeVolumeChange],
	);

	// Notify parent about status changes
	useEffect(() => {
		if (!onChange) return;
		onChange(volumeMutation.status);
	}, [volumeMutation.status, onChange]);

	return (
		<Container disabled={volumeMutation.status === "pending"}>
			<Button type="button" onClick={() => handleChange(0)}>
				<SvgIcon icon={svgIconMusicOffId} />
			</Button>
			<Slider min="0" max="100" value={volume} onChange={handleChange} />
			<Button type="button" onClick={() => handleChange(100)}>
				<SvgIcon icon={svgIconMusicOnId} />
			</Button>
		</Container>
	);
}
