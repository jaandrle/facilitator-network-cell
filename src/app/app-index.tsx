import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type SubmitEvent, useEffect, useId, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button, InputWithLabel } from "@/components";
import { useTranslation } from "@/core";
import { LanguageForm, LayoutEntry, PartialIpForm } from "./components";
import { ButtonConnect, Main, MainIp, MainIpHr, type MainIpVariants } from "./index.css";
import { useFindSocketIp } from "@/api";

export const Route = createFileRoute("/")({
	component: Page,
});

export function Page() {
	const idForm = useId();
	const idPasswordForm = useId();
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [showIpForm, setShowIpForm] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const handleIp = useRef(async function handleIp(ip: string) {
		try {
			if (!/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) throw new Error("Scanned QR code seems invalid");
			setIsLoading(false);
			navigate({ to: "/$ip", params: { ip } });
		} catch (error) {
			setIsLoading(false);
			if (!(error instanceof Error)) return toast.error(`Unknown error: ${error}`);
			toast.error(error.message);
		}
	}).current;
	const ipFound = useFindSocketIp(); //TODO: test

	// Handle IP found - navigate if authenticated or no password yet
	useEffect(() => {
		if (ipFound.state !== "success" || !ipFound.ip) return;
		if (!isAuthenticated) return;
		handleIp(ipFound.ip);
	}, [ipFound, handleIp, isAuthenticated]);

	// Handle IP search failure
	useEffect(() => {
		if (ipFound.state === "error" && isAuthenticated) {
			setIsLoading(false);
			setShowIpForm(true);
		}
	}, [ipFound.state, isAuthenticated]);

	function handlePasswordSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const HARDCODED_PASSWORD = "1234"; // TODO: Make this configurable

		if (password === HARDCODED_PASSWORD) {
			setIsAuthenticated(true);
			if (ipFound.state === "success" && ipFound.ip) {
				// IP already found - navigate
				handleIp(ipFound.ip);
			} else if (ipFound.state === "loading") {
				// Still searching - show loading
				setIsLoading(true);
			} else {
				// IP search failed - show form
				setShowIpForm(true);
			}
		} else {
			toast.error("Invalid password");
		}
	}
	async function handleIpScan() {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const result = await CapacitorBarcodeScanner.scanBarcode({
				hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
			});
			let { ScanResult = "" } = result || {};
			ScanResult = ScanResult.trim();
			handleIp(ScanResult);
		} catch (error) {
			setIsLoading(false);
			if (!(error instanceof Error)) return toast.error(`Unknown error: ${error}`);
			if (error.message.includes("cancelled")) return;
			toast.error(error.message);
		}
	}
	const state: MainIpVariants = !isAuthenticated && !showIpForm ? "nonauth" : isLoading ? "loading" : "fail";
	return (
		<LayoutEntry title={t`homeTitle`} subtitle={t`homeSubtitle`}>
			<Main>
				<MainIp data-variant={state} aria-busy={isLoading} aria-live="polite">
					{state === "nonauth" ? (
						<>
							<form id={idPasswordForm} onSubmit={handlePasswordSubmit}>
								<InputWithLabel
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter password"
									autoFocus
									required
								>
									Password
								</InputWithLabel>
							</form>
							<LanguageForm />
							<ButtonConnect form={idPasswordForm} type="submit">
								{t`homeConnect`}
							</ButtonConnect>
						</>
					) : state === "loading" ? (
						<>
							<p>Searching for device…</p>
							<LanguageForm />
						</>
					) : (
						<>
							<PartialIpForm id={idForm} onIp={handleIp} isLoading={isLoading} />
							<MainIpHr>{t`homeOr`}</MainIpHr>
							<Button onClick={handleIpScan} type="button">
								{t`homeScanQrCode`}
							</Button>
							<LanguageForm />
							<ButtonConnect form={idForm} type="submit">
								{t`homeConnect`}
							</ButtonConnect>
						</>
					)}
				</MainIp>
			</Main>
		</LayoutEntry>
	);
}
