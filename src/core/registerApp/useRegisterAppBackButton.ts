import { App } from "@capacitor/app";
import { Dialog } from "@capacitor/dialog";
import { useEffect } from "react";

export function useRegisterAppBackButton() {
	useEffect(() => {
		App.addListener("backButton", async () => {
			if (history.state.idx) return history.back();
			const { value } = await Dialog.confirm({
				title: "Exit",
				message: "Are you sure you want to exit the app?",
			});
			if (!value) return;
			App.exitApp();
		});
		return () => {
			App.removeAllListeners();
		};
	}, []);
}
///**
// * This function will be done in the future if there will be usage of it.
// * @todo
// * @since 1000000.0.0
// * */
//export function useBackButton(_onBack: () => void, _dependencies: any[] = []) {
//}
