import * as v from "valibot";
import { EndpointSchemas } from "./types/endpoints";

export function validateWebSocketRequest<T extends keyof typeof EndpointSchemas>(
	endpoint: T,
	data: unknown,
): v.InferInput<(typeof EndpointSchemas)[T]["request"]> {
	const schema = EndpointSchemas[endpoint].request;
	const result = v.safeParse(schema, data);
	if (!result.success) {
		console.error(`WebSocket request validation failed for ${String(endpoint)}:`, result.issues);
		const errorMessages = result.issues
			.map((issue) => `${issue.path?.join(".") || "root"}: ${issue.message}`)
			.join(", ");
		throw new Error(`Invalid request: ${errorMessages}`);
	}
	return result.output;
}

export function validateWebSocketResponse<T extends keyof typeof EndpointSchemas>(
	endpoint: T,
	data: unknown,
): v.InferOutput<(typeof EndpointSchemas)[T]["response"]> {
	const schema = EndpointSchemas[endpoint].response;
	const result = v.safeParse(schema, data);
	if (!result.success) {
		console.error(`WebSocket response validation failed for ${String(endpoint)}:`, result.issues);
		const errorMessages = result.issues
			.map((issue) => `${issue.path?.join(".") || "root"}: ${issue.message}`)
			.join(", ");
		throw new Error(`Invalid response: ${errorMessages}`);
	}
	return result.output;
}
