import { createFileRoute } from "@tanstack/react-router";
import { useQueryGetPresentation, useSlideNav } from "./core";
import { useTranslation } from "@/core";
import * as v from "valibot";

export const Route = createFileRoute("/$ip/$presentationId/")({
	component: Page,
	validateSearch: v.object({
		slide: v.fallback(v.number(), 1),
	}),
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
