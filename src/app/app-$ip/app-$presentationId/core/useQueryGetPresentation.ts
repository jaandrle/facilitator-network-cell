import { useQuery } from "@/api";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { atomPresentationId } from "./atoms";

export function useQueryGetPresentation() {
	const presentationId = useAtomValue(atomPresentationId) as string;
	const presentation = useQuery("getPresentation", { presentationId });

	const totalSlides = useMemo(() => {
		const data = presentation.data;
		if (!data?.sessions) return 0;
		const lastSession = Object.values(data.sessions).reduce(
			(max, session) => Math.max(max, parseInt(session.to, 10)),
			0,
		);
		return lastSession;
	}, [presentation.data]);

	return useMemo(
		() => ({
			...presentation,
			totalSlides,
		}),
		[presentation, totalSlides],
	);
}
