import { useMemo } from "react";
import { useQueryGetPresentation } from "./useQueryGetPresentation";
import { useQuery } from "@/api";
import { mergeTanStackStatuses } from "./mergeQueryStatuses";
import { useAtomValue } from "jotai";
import { atomPresentationId } from "./atoms";

export function useSession(currentSlide: number) {
	const presentationQuery = useQueryGetPresentation();
	const presentationId = useAtomValue(atomPresentationId) as string;
	const gamesQuery = useQuery("getGames", { presentationId });
	const status = mergeTanStackStatuses(gamesQuery.status, presentationQuery.status);

	const currentSession = useMemo(() => {
		if (status !== "success" || !presentationQuery.data) return null;
		const presentation = presentationQuery.data;
		const games = gamesQuery.data;

		for (const [id, session] of Object.entries(presentation.sessions)) {
			const from = parseInt(session.from, 10);
			const to = parseInt(session.to, 10);
			if (currentSlide >= from && currentSlide <= to) {
				return {
					...session,
					id,
					games: session.games.map((gameId) => {
						const game = games?.find((g) => g.id === gameId);
						return game || { id: gameId, title: "Unknown", done: false, isNew: false };
					}),
				};
			}
		}
		return null;
	}, [status, presentationQuery, gamesQuery, currentSlide]);

	return currentSession;
}
