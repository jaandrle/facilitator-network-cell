import { useEffect, useState } from "react";
import { LayoutEntry } from "./layout";

export function LayoutEntryChangeTest({ isDone }: { isDone: (value: unknown) => void }) {
	const [text, setText] = useState("Hello World");
	useEffect(() => {
		const id = setTimeout(setText, 250, "Hello Test");
		return () => clearTimeout(id);
	});
	useEffect(() => {
		if (text === "Hello Test") isDone(true);
	}, [isDone,text])
	return (
		<LayoutEntry title={`Title ${text}`} subtitle={`Subtitle ${text}`} >
			<div>{text}</div>
		</LayoutEntry
	>);
}
