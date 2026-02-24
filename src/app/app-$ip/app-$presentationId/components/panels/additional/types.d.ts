import type { RefObject } from "react";

export type Target = {
	slideId: number;
};
export type TabsState = {
	activeTab?: string;
	setActiveTab: (tab: string) => void;
	/** Place where the tabs are rendered */
	headerRef: RefObject<HTMLDivElement | null>;
};
export type AdditionalComponentProps = Target & TabsState;
