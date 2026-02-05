type RunMode = "localhost"|"device";
export type IpEnv = {
	/** This is filled in at build time */
	readonly VITE_IP_ADDRESSES_AUTO: string;
	/** Override for the auto-detected IP address */
	readonly VITE_IP_ADDRESSES_MANUAL?: string;
	readonly VITE_RUN_MODE: RunMode;
};
export function updateEnv(mode: RunMode): void;
