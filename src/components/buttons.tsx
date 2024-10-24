import { Link as LinkPure } from "react-router-dom";
import styled from "styled-components";

const css= String.raw;
const common= css`
	color: red;
`;
export const Link = styled(LinkPure)`
	${common}
`;
