import { useState, useRef, type ReactElement } from "react";
import { Container, Header } from "../index.css";
import type { AdditionalComponentProps } from "./types";

export * from "./Activities";
export * from "./Music";

type Children = ((props: AdditionalComponentProps) => ReactElement)[];

export function AdditionalContainer({ slideId, panels }: { slideId: number; panels: Children }) {
	const headerRef = useRef<HTMLDivElement>(null);
	const [activeTab, setActiveTab] = useState<string>();

	return (
		<Container>
			<Header ref={headerRef} />
			{panels.map((Panel, index) => (
				<Panel
					key={Panel.name || index}
					slideId={slideId}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					headerRef={headerRef}
				/>
			))}
		</Container>
	);
}
