import { useQuery } from "@/api";
import { useAtomValue } from "jotai";
import { atomPresentationId } from "./atoms";

export function useQueryGetPresentationConfig() {
	const presentationId = useAtomValue(atomPresentationId) as string;
	return useQuery("getPresentationConfig", { presentationId });
}
