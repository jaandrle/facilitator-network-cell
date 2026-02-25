import { useState, useCallback, useMemo } from "react";
import { type IPAddress, useAPI } from "@/api";
import type { Presentation, Slide } from "@/types/presentation";

export function usePresentation(ip: IPAddress, presentationId: string) {
	const { state, useEmit } = useAPI(ip);
	const getPresentation = useEmit("getPresentation");
	const nextSlideApi = useEmit("nextSlide");
	const prevSlideApi = useEmit("prevSlide");
	const toggleActivityApi = useEmit("toggleActivity");
	const toggleMusicApi = useEmit("toggleMusic");
	const updateNotesApi = useEmit("updateNotes");

	const [currentIndex, setCurrentIndex] = useState(0);
	const [presentation, setPresentation] = useState<Presentation | null>(null);

	const load = useCallback(() => {
		getPresentation.emit({ presentationId });
	}, [getPresentation, presentationId]);

	const currentSlide: Slide | null = useMemo(() => {
		if (!presentation) return null;
		return presentation.slides[currentIndex] ?? null;
	}, [presentation, currentIndex]);

	const nextSlide: Slide | null = useMemo(() => {
		if (!presentation) return null;
		return presentation.slides[currentIndex + 1] ?? null;
	}, [presentation, currentIndex]);

	const isFirst = currentIndex === 0;
	const isLast = presentation ? currentIndex >= presentation.slides.length - 1 : false;

	const goToNextSlide = useCallback(() => {
		if (isLast) return;
		nextSlideApi.emit({ presentationId });
		setCurrentIndex((i) => i + 1);
	}, [isLast, nextSlideApi, presentationId]);

	const goToPrevSlide = useCallback(() => {
		if (isFirst) return;
		prevSlideApi.emit({ presentationId });
		setCurrentIndex((i) => i - 1);
	}, [isFirst, prevSlideApi, presentationId]);

	const toggleActivity = useCallback(
		(activityId: string, done: boolean) => {
			toggleActivityApi.emit({ activityId, done });
			setPresentation((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					slides: prev.slides.map((slide) => ({
						...slide,
						activities: slide.activities.map((act) => (act.id === activityId ? { ...act, done } : act)),
					})),
				};
			});
		},
		[toggleActivityApi],
	);

	const toggleMusic = useCallback(
		(musicId: string, active: boolean) => {
			toggleMusicApi.emit({ musicId, active });
			setPresentation((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					slides: prev.slides.map((slide) => ({
						...slide,
						music: slide.music.map((m) => (m.id === musicId ? { ...m, active } : m)),
					})),
				};
			});
		},
		[toggleMusicApi],
	);

	const updateNotes = useCallback(
		(slideId: string, notes: string) => {
			updateNotesApi.emit({ slideId, notes });
			setPresentation((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					slides: prev.slides.map((slide) => (slide.id === slideId ? { ...slide, notes } : slide)),
				};
			});
		},
		[updateNotesApi],
	);

	return {
		state,
		presentation,
		currentSlide,
		nextSlide,
		currentIndex,
		isFirst,
		isLast,
		load,
		goToNextSlide,
		goToPrevSlide,
		toggleActivity,
		toggleMusic,
		updateNotes,
	};
}
