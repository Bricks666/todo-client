import { MutableRefObject, RefCallback, useMemo } from "react";

export const useTwoRef = <T extends Element = Element>(
	refOne: MutableRefObject<T | null> | RefCallback<T | null> | null,
	refTwo: MutableRefObject<T | null> | RefCallback<T | null> | null
) => {
	return useMemo(() => {
		if (refOne === null && refTwo === null) {
			return null;
		}
		return (value: T) => {
			[refOne, refTwo].forEach((ref) => {
				if (typeof ref === "function") {
					ref(value);
				} else if (ref) {
					ref.current = value;
				}
			});
		};
	}, [refOne, refTwo]);
};
