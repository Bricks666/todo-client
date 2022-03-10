import { useEffect } from "react";

export const useKeyListener = (
	key: string,
	callback: VoidFunction,
	condition?: boolean,
	element?: HTMLElement | null | Document
) => {
	element = element ?? document;
	useEffect(() => {
		if (condition) {
			element!.onkeydown = (evt) => {
				if (evt.key === key) {
					callback();
				}
			};
		}

		return () => {
			element!.onkeydown = null;
		};
	}, [key, callback, condition, element]);
};
