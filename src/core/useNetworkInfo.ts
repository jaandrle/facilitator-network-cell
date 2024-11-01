import { useLayoutEffect, useState } from "react";
import { NetworkInterface } from '@ionic-native/network-interface';

export function useNetworkInfo() {
	const [ error, setError ] = useState<boolean>(false);
	const [ value, setValue ] = useState<{ ip: string, subnet: string } | null>(null);
	useLayoutEffect(() => {
		NetworkInterface.getWiFiIPAddress()
		.then(setValue).catch(()=> setError(true));
	}, []);
	return {
		value, error,
		loading: !value && !error
	};
}
export function useNetworkIp() {
	const { value, error, loading } = useNetworkInfo();
	return {
		error, loading,
		value: value?.ip
	};
}

export default useNetworkInfo;
