export interface Presentation {
	id: string;
	title: string;
	slides: Slide[];
}

export interface Slide {
	id: string;
	index: number;
	total: number;
	type: "video" | "image" | "content";
	mediaUrl?: string;
	activities: Activity[];
	notes: string;
	music: Music[];
}

export interface Activity {
	id: string;
	title: string;
	done: boolean;
	isNew: boolean;
}

export interface Music {
	id: string;
	title: string;
	active: boolean;
}

export interface TimerState {
	isRunning: boolean;
	elapsedSeconds: number;
}
