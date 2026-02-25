export type Endpoints = {
	"server.getLang": {
		request: undefined;
		response: string;
	};
	getConfigPresentation: {
		request: undefined;
		response: string;
	};
	listPresentation: {
		request: undefined;
		response: {
			id: string;
			name: string;
			language: string;
			version: string;
		}[];
	};
	getPresentation: {
		request: { presentationId: string };
		response: {
			id: string;
			title: string;
			slides: {
				id: string;
				index: number;
				total: number;
				type: "video" | "image" | "content";
				mediaUrl?: string;
				activities: { id: string; title: string; done: boolean; isNew: boolean }[];
				notes: string;
				music: { id: string; title: string; active: boolean }[];
			}[];
		};
	};
	nextSlide: {
		request: { presentationId: string };
		response: {
			id: string;
			index: number;
			total: number;
			type: "video" | "image" | "content";
			mediaUrl?: string;
			activities: { id: string; title: string; done: boolean; isNew: boolean }[];
			notes: string;
			music: { id: string; title: string; active: boolean }[];
		};
	};
	prevSlide: {
		request: { presentationId: string };
		response: {
			id: string;
			index: number;
			total: number;
			type: "video" | "image" | "content";
			mediaUrl?: string;
			activities: { id: string; title: string; done: boolean; isNew: boolean }[];
			notes: string;
			music: { id: string; title: string; active: boolean }[];
		};
	};
	toggleActivity: {
		request: { activityId: string; done: boolean };
		response: { success: boolean };
	};
	toggleMusic: {
		request: { musicId: string; active: boolean };
		response: { success: boolean };
	};
	updateNotes: {
		request: { slideId: string; notes: string };
		response: { success: boolean };
	};
};
