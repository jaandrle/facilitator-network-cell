import * as v from "valibot";

// Define all endpoint schemas using Valibot
export const EndpointSchemas = {
	"server.getLang": {
		request: v.undefined_(),
		response: v.string(),
	},
	listPresentation: {
		request: v.undefined_(),
		response: v.array(
			v.object({
				changelog: v.string(),
				lang: v.string(),
				lang_name: v.string(),
				last_update_at: v.string(),
				name: v.string(),
				presentation_id: v.string(),
				version: v.string(),
			}),
		),
	},
	getPresentationConfig: {
		request: v.object({ presentationId: v.string() }),
		response: v.object({
			changelog: v.string(),
			lang: v.string(),
			lang_name: v.string(),
			last_update_at: v.string(),
			name: v.string(),
			presentation_id: v.string(),
			base_url: v.string(),
			version: v.string(),
		}),
	},
	getPresentation: {
		request: v.object({ presentationId: v.string() }),
		response: v.object({
			day: v.number(),
			sessions: v.record(
				v.string(),
				v.object({
					from: v.string(),
					to: v.string(),
					title: v.string(),
					games: v.array(v.string()),
				}),
			),
		}),
	},
	getGames: {
		request: v.object({ presentationId: v.string() }),
		response: v.array(
			v.object({
				id: v.string(),
				title: v.string(),
				done: v.boolean(),
				isNew: v.boolean(),
			}),
		),
	},
	getMusic: {
		request: v.object({ presentationId: v.string(), slideId: v.number() }),
		response: v.array(
			v.object({
				id: v.string(),
				title: v.string(),
				active: v.boolean(),
			}),
		),
	},
	nextSlide: {
		request: v.object({ presentationId: v.string() }),
		response: v.object({
			id: v.string(),
			index: v.number(),
			total: v.number(),
			url: v.string(),
			activities: v.array(
				v.object({
					id: v.string(),
					title: v.string(),
					done: v.boolean(),
					isNew: v.boolean(),
				}),
			),
			notes: v.string(),
			music: v.array(
				v.object({
					id: v.string(),
					title: v.string(),
					active: v.boolean(),
				}),
			),
		}),
	},
	prevSlide: {
		request: v.object({ presentationId: v.string() }),
		response: v.object({
			id: v.string(),
			index: v.number(),
			total: v.number(),
			url: v.string(),
			activities: v.array(
				v.object({
					id: v.string(),
					title: v.string(),
					done: v.boolean(),
					isNew: v.boolean(),
				}),
			),
			notes: v.string(),
			music: v.array(
				v.object({
					id: v.string(),
					title: v.string(),
					active: v.boolean(),
				}),
			),
		}),
	},
	toggleActivity: {
		request: v.object({ activityId: v.string(), done: v.boolean() }),
		response: v.object({ success: v.boolean() }),
	},
	toggleMusic: {
		request: v.object({ musicId: v.string(), active: v.boolean() }),
		response: v.object({ success: v.boolean() }),
	},
	getVolume: {
		request: v.object({ presentationId: v.string(), slideId: v.number() }),
		response: v.object({ volume: v.number() }),
	},
	setVolume: {
		request: v.object({ presentationId: v.string(), slideId: v.number(), volume: v.number() }),
		response: v.object({ success: v.boolean() }),
	},
	updateNotes: {
		request: v.object({ slideId: v.string(), notes: v.string() }),
		response: v.object({ success: v.boolean() }),
	},
} as const;

// Type inference from Valibot schemas
export type Endpoints = {
	[K in keyof typeof EndpointSchemas]: {
		request: v.InferInput<(typeof EndpointSchemas)[K]["request"]>;
		response: v.InferOutput<(typeof EndpointSchemas)[K]["response"]>;
	};
};
