import { styled } from "styled-components";
import { color } from "@/ui";

export const Container = styled.div`
	background: ${color("white")};
	border-radius: 12px;
	padding: 8px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;
export const Header = styled.div`
	display: flex;
	gap: 8px;
	margin-bottom: 8px;
`;
export const Tab = styled.button<{ $active?: boolean }>`
	padding: 8px 16px;
	border: none;
	border-radius: 8px;
	background: ${({ $active }) => ($active ? color("primary") : color("gray", 80))};
	color: ${({ $active }) => ($active ? color("white") : color("black"))};
	cursor: pointer;
	font-weight: bold;
	transition: background 0.2s;

	&:hover {
		background: ${({ $active }) => ($active ? color("primary", 40) : color("gray", 60))};
	}
`;
export const Content = styled.div`
	flex: 1;
	overflow-y: auto;
`;

export const NotesTextarea = styled.textarea`
	width: 100%;
	flex: 1;
	border: 1px solid ${color("gray", 80)};
	border-radius: 8px;
	padding: 8px;
	resize: none;
	font-family: inherit;

	&:focus {
		outline: none;
		border-color: ${color("primary")};
	}
`;
