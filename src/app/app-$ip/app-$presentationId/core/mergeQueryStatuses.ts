type QueryStatus = "error" | "pending" | "success";
type MutationStatus = QueryStatus | "idle";
export function mergeTanStackStatuses(...statuses: Array<QueryStatus>): QueryStatus;
export function mergeTanStackStatuses(...statuses: Array<MutationStatus>): MutationStatus;
export function mergeTanStackStatuses<T extends QueryStatus | MutationStatus>(...statuses: Array<T>): T {
	let candidate: "pending" | "success" | "idle" = "success";
	for (const state of statuses) {
		if (state === "idle") candidate = "idle";
		if (state === "pending") candidate = "pending";
		if (state !== "error") continue;
		return "error" as T;
	}
	return candidate as T;
}
