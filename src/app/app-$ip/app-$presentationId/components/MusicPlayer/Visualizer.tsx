import { Container, Bar, useFallback } from "./Visualizer.css";

const length = 17;

export function Visualizer({ "data-is-playing": isPlaying }: { "data-is-playing": boolean | "true" | "false" }) {
	const { count, index } = useFallback(length);
	return (
		<Container style={count.current()} data-is-playing={isPlaying}>
			{Array.from({ length }).map((_, i) => (
				<Bar key={barId(i)} style={index.current(i)} />
			))}
		</Container>
	);
}

function barId(index: number): string {
	return `bar-${index}`;
}
