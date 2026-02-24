import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Container, Literal } from "./Time.css";

export function Time() {
	const { i18n } = useTranslation();
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const timeFormatter = useMemo(
		() =>
			new Intl.DateTimeFormat(i18n.language, {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			}),
		[i18n.language],
	);

	const formattedTime = timeFormatter.formatToParts(currentTime);
	const datetimeValue = currentTime.toISOString();

	return (
		<Container dateTime={datetimeValue} aria-live="polite">
			{formattedTime.map(({ type, value }, i) =>
				type === "literal" ? <Literal key={genId(i)}>{value}</Literal> : value,
			)}
		</Container>
	);
}

function genId(i: number) {
	return `time-${i}`;
}
