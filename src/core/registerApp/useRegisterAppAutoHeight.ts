import { useEffect } from "react";
import { Keyboard, type KeyboardInfo } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";
import { cssVariables } from "@/ui";

export function useRegisterAppAutoHeight() {
	useEffect(() => {
		/** …when keyboard is opened */
		function maintainAppHeight(info?: KeyboardInfo | UIEvent) {
			const { clientHeight } = document.documentElement;
			const height =
				info && (info as KeyboardInfo).keyboardHeight
					? clientHeight + (info as KeyboardInfo).keyboardHeight
					: clientHeight;

			document.documentElement.dataset.jsKeyboardOpen = Boolean(
				info && (info as KeyboardInfo).keyboardHeight,
			).toString();
			document.body.style.setProperty(cssVariables.appDh, `${height}px`);
		}

		maintainAppHeight();
		if (Capacitor.getPlatform() === "web") {
			window.addEventListener("resize", maintainAppHeight);
			return () => {
				window.removeEventListener("resize", maintainAppHeight);
			};
		}
		Keyboard.addListener("keyboardWillShow", maintainAppHeight);
		Keyboard.addListener("keyboardWillHide", maintainAppHeight);
		return () => {
			Keyboard.removeAllListeners();
		};
	}, []);
}
