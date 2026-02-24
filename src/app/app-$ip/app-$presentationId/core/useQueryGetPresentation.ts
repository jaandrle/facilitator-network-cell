import { useQuery } from "@/api";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";

export function useQueryGetPresentation() {
	const { presentationId } = useParams({ from: "/$ip/$presentationId/" });
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
