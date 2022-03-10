import { useEffect, useState } from "react";

const focusOn = (options: NodeListOf<HTMLLIElement>, value: string) => {
	for (let i = 0; i < options.length; i++) {
		if (options[i].getAttribute("data-value") == value) {
			return i;
		}
	}

	return null;
};

export const useFocusActive = (
	list: HTMLElement | null,
	value: string,
	isOpen: boolean
) => {
	const [currentFocus, setCurrentFocus] = useState<null | number>(null);
	useEffect(() => {
		if (!list || !isOpen) {
			return;
		}
		const options = list.querySelectorAll<HTMLLIElement>(
			"[data-value][role='option']"
		);
		const focused = focusOn(options, value);
		setCurrentFocus(focused ?? 0);
	}, [list, isOpen, value]);

	return {
		currentFocus,
	};
};
