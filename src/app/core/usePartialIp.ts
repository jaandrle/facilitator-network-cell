import { useMemo } from "react";
import { useNetworkIp } from "@/core/useNetworkInfo";

export function usePartialIp() {
	const { value, loading, error } = useNetworkIp();
	return useMemo(
		() => ({
			value: !value ? value : value.slice(0, value.lastIndexOf(".") + 1),
			loading,
			error,
		}),
		[value, loading, error],
	);
}
