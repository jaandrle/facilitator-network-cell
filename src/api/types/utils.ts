import * as v from "valibot";
import { EndpointSchemas } from "./endpoints";

export function getEndpointTypes<TKey extends keyof typeof EndpointSchemas>(key: TKey) {
	const schemas = EndpointSchemas[key];
	return {
		requestSchema: schemas.request,
		responseSchema: schemas.response,
		requestType: undefined as unknown as v.InferInput<typeof schemas.request>,
		responseType: undefined as unknown as v.InferOutput<typeof schemas.response>,
	};
}

// Helper for components that need direct schema access
export function useEndpointValidation<TKey extends keyof typeof EndpointSchemas>(key: TKey) {
	const { requestSchema, responseSchema } = getEndpointTypes(key);
	return {
		validateRequest: (data: unknown) => v.parse(requestSchema, data),
		validateResponse: (data: unknown) => v.parse(responseSchema, data),
	};
}
