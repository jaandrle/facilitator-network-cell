import { createFileRoute } from "@tanstack/react-router";
import { useQueryGetPresentation, useSlideNav } from "./core";
import { useTranslation } from "@/core";

export const Route = createFileRoute("/$ip/$presentationId/")({
	component: Page,
	validateSearch: (search) =>
		({
			slide: typeof search.slide === "number" ? search.slide : 1,
		}) as { slide?: number },
});

import { Button } from "@/components";
import {
	Activities,
	AdditionalContainer,
	Music,
	NotesPanel,
	SlidePreview,
	SlidePreviewSlots,
	Timer,
	Time,
	Sidebar,
} from "./components";
import { Layout, SlidesZone, PanelsZone, ActionsPrevNext, ActionsTimer } from "./index.css";
function Page() {
	const { t } = useTranslation();
	const { totalSlides } = useQueryGetPresentation();
	const slide = useSlideNav(totalSlides);

	return (
		<Layout>
			<Time />
			<Sidebar />
			<SlidesZone>
				<SlidePreview slideNumber={slide.current} label={t`presentationCurrentSlide`} data-type="current">
					<SlidePreviewSlots.actions>
						<ActionsPrevNext>
							<Button type="button" onClick={slide.prev} disabled={slide.status === "first"}>
								{t`presentationPreviousSlide`}
							</Button>
							<Button type="button" onClick={slide.next} disabled={slide.status === "last"}>
								{t`presentationNextSlide`}
							</Button>
						</ActionsPrevNext>
					</SlidePreviewSlots.actions>
				</SlidePreview>

				<SlidePreview slideNumber={slide.current + 1} label={t`presentationNextSlide`} data-type="next">
					<SlidePreviewSlots.actions>
						<ActionsTimer>
							<Timer />
						</ActionsTimer>
					</SlidePreviewSlots.actions>
				</SlidePreview>
			</SlidesZone>

			<PanelsZone>
				<AdditionalContainer slideId={slide.current} panels={[Activities, Music]} />
				<NotesPanel notes="" slideId={slide.current} onSaveNotes={() => {}} />
			</PanelsZone>
		</Layout>
	);
}
