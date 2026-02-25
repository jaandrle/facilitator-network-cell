import type { ReactNode } from "react";
import type { Slide } from "@/types/presentation";
import {
	Container,
	Label,
	Progress,
	Media,
	Actions
} from "./SlidePreview.css";

interface SlidePreviewProps {
	slide: Slide | null;
	label: string;
	progress: string;
	children?: ReactNode;
	isActive?: boolean;
}

export function SlidePreview({
	slide,
	label,
	progress,
	children,
	isActive = false
}: SlidePreviewProps) {
	return (
		<Container $isActive={isActive}>
			<Label>{label}</Label>
			<Progress>{progress}</Progress>
			<Media>
				{slide?.mediaUrl ? (
					slide.type === "video" ? (
						<video src={slide.mediaUrl} controls aria-label={`${label} video`}>
							<track kind="captions" />
						</video>
					) : (
						<img src={slide.mediaUrl} alt={label} />
					)
				) : (
					<span>No slide content</span>
				)}
			</Media>
			<Actions>
				{children}
			</Actions>
		</Container>
	);
}
