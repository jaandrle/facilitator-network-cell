import { useEffect, useState } from "react";
import { mergeTanStackStatuses, useQueryGetPresentation, useQueryGetPresentationConfig } from "../core";
import { Container, Label, Progress, Media, Actions } from "./SlidePreview.css";
import { useSlot, type SlotChildren, type Slot, createTemplate, OverrideNode } from "@beqa/react-slots";

type SlidePreviewChild = SlotChildren<Slot<"actions">>;
interface SlidePreviewProps {
	slideNumber: number;
	label: string;
	children?: SlidePreviewChild;
	"data-type": "current" | "next";
}

/**
 * Only {@link Actions} slot is allowed
 * */
export const SlidePreviewSlots = createTemplate<SlidePreviewChild>();
export function SlidePreview({ slideNumber, label, "data-type": type, children }: SlidePreviewProps) {
	const { slot } = useSlot(children);
	const { status: statusPresentation, totalSlides } = useQueryGetPresentation();
	const { status: statusPresentationConfig, data: config } = useQueryGetPresentationConfig();
	const progress = slideNumber <= totalSlides ? `${slideNumber} of ${totalSlides + 1}` : null;
	const isSlide = Boolean(progress);
	const url = statusPresentationConfig === "success" && isSlide ? `${config.base_url}?num=${slideNumber}` : undefined;
	const [statusIframe, setStatusIframe] = useState<"pending" | "success" | "error">("pending");
	// biome-ignore lint/correctness/useExhaustiveDependencies: this should rely on slideNumber
	useEffect(() => {
		if (isSlide) setStatusIframe("pending");
	}, [isSlide, slideNumber]);
	const status = mergeTanStackStatuses(statusPresentation, statusPresentationConfig, statusIframe);

	return (
		<Container aria-live="polite">
			<Label>{label}</Label>
			{progress && <Progress>{progress}</Progress>}
			<Media
				src={url}
				data-variant={status === "error" || !isSlide ? "empty" : status}
				onLoad={() => setStatusIframe("success")}
				title={label}
				tabIndex={-1}
				data-type={type}
			/>
			<slot.actions>
				<OverrideNode
					node={(node) => {
						let nodeParentId: string | undefined;
						try {
							// @ts-expect-error
							nodeParentId = node?.type?.foldedComponentIds || node?.type?.styledComponentId;
						} catch {}
						if (!nodeParentId || nodeParentId !== Actions.styledComponentId)
							throw new Error(`Slot must be of type Actions${Actions}!`);
						return node;
					}}
				/>
			</slot.actions>
		</Container>
	);
}
