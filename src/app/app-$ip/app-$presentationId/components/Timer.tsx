import { useTranslation } from "@/core";
import { useTimer } from "../core";
import { Button, SvgIcon } from "@/components";
import { svgIconTimerId } from "../assets";
import styled from "styled-components";
import { cssFont, fontStep } from "@/ui";

const Duration = styled.time`
	font-variant-numeric: tabular-nums;
	${cssFont.bold}
	font-size: ${fontStep(1, "normal")};
`;
export function Timer() {
	const { t } = useTranslation();
	const timer = useTimer();
	const p = (num: number) => num.toString().padStart(2, "0");
	const duration = `PT${"HMS"
		.split("")
		.map((l, i) => timer.data[i] + l)
		.join("")}`;
	return (
		<>
			<SvgIcon icon={svgIconTimerId} />
			<Duration dateTime={duration} aria-live="polite">
				{timer.data.map(p).join(":")}
			</Duration>
			{Boolean(timer.elapsedSeconds) && (
				<Button type="button" onClick={timer.reset}>{t`presentationTimerReset`}</Button>
			)}
			<Button type="button" onClick={timer.toggle}>
				{timer.isRunning ? t`presentationTimerStop` : t`presentationTimerStart`}
			</Button>
		</>
	);
}
