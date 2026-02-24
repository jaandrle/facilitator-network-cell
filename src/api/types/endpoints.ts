export type Endpoints = {
	"server.getLang": {
		request: undefined;
		response: string;
	};
	listPresentation: {
		request: undefined;
		response: {
			changelog: string;
			lang: string;
			lang_name: string;
			last_update_at: string;
			name: string;
			presentation_id: string;
			version: string;
		}[];
	};
	getPresentationConfig: {
		request: { presentationId: string };
		response: {
			changelog: string;
			lang: string;
			lang_name: string;
			last_update_at: string;
			name: string;
			presentation_id: string;
			base_url: string;
			version: string;
		};
	};
	getPresentation: {
		request: { presentationId: string };
		response: {
			day: number;
			sessions: Record<
				string,
				{
					from: string;
					to: string;
					title: string;
					games: string[];
				}
			>;
		};
	};
	getGames: {
		request: { presentationId: string };
		response: { id: string; title: string; done: boolean; isNew: boolean }[];
	};
	getMusic: {
		request: { presentationId: string; slideId: number };
		response: { id: string; title: string; active: boolean }[];
	};
	nextSlide: {
		request: { presentationId: string };
		response: {
			id: string;
			index: number;
			total: number;
			url: string;
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
			url: string;
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
	getVolume: {
		request: { presentationId: string; slideId: number };
		response: { volume: number };
	};
	setVolume: {
		request: { presentationId: string; slideId: number; volume: number };
		response: { success: boolean };
	};
	updateNotes: {
		request: { slideId: string; notes: string };
		response: { success: boolean };
	};
};
