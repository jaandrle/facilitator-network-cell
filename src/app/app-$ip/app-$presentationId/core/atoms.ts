import { atom } from "jotai";
import { atomIp } from "../../core/atoms";

export { atomIp };
export const atomPresentationId = atom<string>();
export const atomSlide = atom<number>();

export default {
	ip: atomIp,
	presentationId: atomPresentationId,
	slide: atomSlide,
};
