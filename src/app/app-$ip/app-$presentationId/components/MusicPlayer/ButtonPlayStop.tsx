import { useEffect } from "react";
import { useMutation } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/core";
import type { MusicType, MusicApiStatus } from "./types";
import { Button } from "@/components";

export function ButtonPlayStop({
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
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const musicMutation = useMutation("toggleMusic", {
		onMutate: async (variables: { musicId: string; active: boolean }) => {
			await queryClient.cancelQueries({ queryKey: ["getMusic", presentation] });
			const previousMusic = queryClient.getQueryData<MusicType[]>(["getMusic"]);
			queryClient.setQueryData<MusicType[]>(["getMusic", presentation], (old) =>
				old?.map((track) => (track.id === variables.musicId ? { ...track, active: variables.active } : track)),
			);
			return { previousMusic };
		},
		onError: (_err: Error, _variables: { musicId: string; active: boolean }, context: unknown) => {
			if (!context || typeof context !== "object") return;
			if ("previousMusic" in context) {
				queryClient.setQueryData(
					["getMusic", presentation],
					(context as { previousMusic: MusicType[] | undefined }).previousMusic,
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["getMusic", presentation] });
		},
	});
	// Notify parent about status changes
	useEffect(() => {
		if (!onChange) return;
		onChange(musicMutation.status);
	}, [musicMutation.status, onChange]);
	async function handleMusicPlay(track: MusicType) {
		const isCurrent = playing && playing.id === track.id;
		if (isCurrent) await musicMutation.mutateAsync({ musicId: playing.id, active: !playing.active });
		await musicMutation.mutateAsync({ musicId: track.id, active: !track.active });
	}
	return (
		<Button type="button" onClick={() => handleMusicPlay(track)} disabled={musicMutation.status === "pending"}>
			{track.active ? t`presentationTimerStop` : t`presentationTimerStart`}
		</Button>
	);
}
