import { styled } from "styled-components";
import { color } from "@/ui";

export const Container = styled.div<{ $isActive?: boolean }>`
	display: flex;
	flex-direction: column;
	background: ${color("white")};
	border-radius: 12px;
	padding: 8px;
	${({ $isActive }) => $isActive && "border: 2px solid " + color("primary")};
`;

export const Label = styled.span`
	font-size: 0.875rem;
	font-weight: bold;
	color: ${color("black")};
`;

export const Progress = styled.span`
	font-size: 0.75rem;
	color: ${color("gray", 80)};
`;

export const Media = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${color("gray", 90)};
	border-radius: 8px;
	overflow: hidden;
	min-height: 200px;

	img,
	video {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
`;

export const Actions = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 8px;
	justify-content: center;
`;
