import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAPI } from "@/api";
import { usePresentation, useTimer } from "./core";
import { useTranslation } from "@/core";

export const Route = createFileRoute("/$ip/$presentationId/")({
	component: Page,
});

import { ActivitiesPanel, NotesPanel, SlidePreview } from "./components";
import { Layout, SlidesZone, PanelsZone } from "./index.css";
function Page() {
	const { ip, presentationId } = Route.useParams();
	const { t } = useTranslation();
	const { state } = useAPI(ip);
	const isConnected = state === "connected";

	const {
		currentSlide,
		nextSlide,
		isFirst,
		isLast,
		load,
		goToNextSlide,
		goToPrevSlide,
		toggleActivity,
		toggleMusic,
		updateNotes,
	} = usePresentation(ip, presentationId);

	const timer = useTimer();

	useEffect(() => {
		if (isConnected) {
			load();
		}
	}, [isConnected, load]);

	const progress = currentSlide ? `${currentSlide.index + 1} / ${currentSlide.total}` : "0 / 0";
	const nextProgress = nextSlide ? `${nextSlide.index + 1} / ${nextSlide.total}` : "0 / 0";

	return (
		<Layout>
			<SlidesZone>
				<SlidePreview
					slide={currentSlide}
					label={t`presentationCurrentSlide`}
					progress={progress}
					isActive
				>
					<button type="button" onClick={goToPrevSlide} disabled={isFirst}>
						{t`presentationPrevious`}
					</button>
					<button type="button" onClick={goToNextSlide} disabled={isLast}>
						{t`presentationNext`}
					</button>
				</SlidePreview>

				<SlidePreview
					slide={nextSlide}
					label={t`presentationNextSlide`}
					progress={nextProgress}
				>
					<button type="button" onClick={timer.toggle}>
						{timer.isRunning ? t`presentationTimerStop` : t`presentationTimerStart`}
					</button>
					<span>{timer.formattedTime}</span>
				</SlidePreview>
			</SlidesZone>

			<PanelsZone>
				<ActivitiesPanel
					activities={currentSlide?.activities ?? []}
					music={currentSlide?.music ?? []}
					onToggleActivity={toggleActivity}
					onToggleMusic={toggleMusic}
				/>
				<NotesPanel notes={currentSlide?.notes ?? ""} slideId={currentSlide?.id} onSaveNotes={updateNotes} />
			</PanelsZone>
		</Layout>
	);
}
