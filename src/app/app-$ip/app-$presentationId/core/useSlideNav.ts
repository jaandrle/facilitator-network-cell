import { startViewTransition } from "@/ui";
import { viewTransitionSlideNext, viewTransitionSlidePrev } from "../components/SlidePreview.css";
import { useSearch, useNavigate, useParams } from "@tanstack/react-router";

export function useSlideNav(totalSlides: number) {
	const { ip, presentationId } = useParams({ from: "/$ip/$presentationId/" });
	const navigate = useNavigate();
	const { slide: current } = useSearch({ from: "/$ip/$presentationId/" }) as { slide: number };
	const setCurrent = (value: number) => {
		if (value < 1 || value > totalSlides || value === current) return;
		const ani = current < value ? viewTransitionSlideNext : viewTransitionSlidePrev;
		startViewTransition(ani, () =>
			navigate({
				to: "/$ip/$presentationId",
				params: { ip, presentationId },
				search: { slide: value },
				viewTransition: false,
			}),
		);
	};
	const next = () => setCurrent(current + 1);
	const prev = () => setCurrent(current - 1);
	const status: "first" | "last" | "middle" = current === 1 ? "first" : current === totalSlides ? "last" : "middle";

	return {
		current,
		setCurrent,
		next,
		prev,
		status,
	};
}
