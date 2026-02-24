export interface MusicType {
	id: string;
	title: string;
	active: boolean;
}

// Export the status type for use in other components
export type MusicApiStatus = "idle" | "pending" | "success" | "error";
