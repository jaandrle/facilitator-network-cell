import { useQuery } from "@/api";
import { useParams } from "@tanstack/react-router";

export function useQueryGetPresentationConfig() {
	const { presentationId } = useParams({ from: "/$ip/$presentationId/" });
	return useQuery("getPresentationConfig", { presentationId });
}
