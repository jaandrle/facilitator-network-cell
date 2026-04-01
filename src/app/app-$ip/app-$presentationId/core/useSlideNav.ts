import { startViewTransition } from "@/ui";
import { viewTransitionSlideNext, viewTransitionSlidePrev } from "../components/SlidePreview.css";
import { useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { atomIp, atomPresentationId, atomSlide } from "./atoms";

export function useSlideNav(totalSlides: number) {
	const presentationId = useAtomValue(atomPresentationId) as string;
	const ip = useAtomValue(atomIp) as string;
	const navigate = useNavigate();
	const current = useAtomValue(atomSlide) as number;
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
