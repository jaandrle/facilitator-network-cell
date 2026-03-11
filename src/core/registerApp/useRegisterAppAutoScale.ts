import { useEffect } from "react";
import { isScaled, cssVariables } from "@/ui";

export function useRegisterAppAutoScale() {
	useEffect(() => {
		document.body.style.removeProperty(cssVariables.appScale);
		if (!matchMedia(isScaled).matches) return;
		const { clientHeight } = document.documentElement;
		document.body.style.setProperty(cssVariables.appScale, `${clientHeight / 500}`);
	}, []);
}
