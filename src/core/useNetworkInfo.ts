import { NetworkInterface } from "@ionic-native/network-interface";

import { useLayoutEffect, useMemo, useState } from "react";

export function useNetworkInfo() {
	const [error, setError] = useState<boolean>(false);
	const [value, setValue] = useState<{ ip: string; subnet?: string } | null>(null);
	useLayoutEffect(() => {
		NetworkInterface.getWiFiIPAddress()
			.then(setValue)
			.catch(() => {
				if (VITE.RUN_MODE !== "localhost") return setError(true);
				const ip = VITE.IP_ADDRESSES_MANUAL ?? VITE.IP_ADDRESSES_AUTO;
				setValue({ ip });
			})
			.catch(() => setError(true));
	}, []);
	return useMemo(
		() => ({
			value,
			error,
			loading: !value && !error,
		}),
		[value, error],
	);
}
export function useNetworkIp() {
	const { value, error, loading } = useNetworkInfo();
	return useMemo(
		() => ({
			error,
			loading,
			value: value?.ip,
		}),
		[value, error, loading],
	);
}

export default useNetworkInfo;
