import { useEffect } from "react";

const tabbableSelectors = [
	"[tabindex]",
	"a[href]",
	"button",
	"input",
	"select",
	"textarea",
];

const getTabbableElements = (element: HTMLElement) => {
	return element.querySelectorAll<HTMLElement>(tabbableSelectors.join(","));
};

const contains = (reference: Element, element: Element | null) => {
	return !!reference && (element === reference || reference.contains(element));
};

const focusinCreator = (reference: HTMLElement) => {
	return () => {
		if (contains(reference, document.activeElement)) {
			return;
		}

		const tabbable = getTabbableElements(reference);
		if (tabbable.length > 0) {
			return tabbable[0].focus();
		} else {
			return reference.focus();
		}
	};
};

const onKeyChangeCreator = (reference: HTMLElement) => {
	return (evt: globalThis.KeyboardEvent) => {
		if (evt.key !== "Tab") {
			return;
		}
		if (contains(reference, document.activeElement)) {
			return;
		}
		const tabbable = getTabbableElements(reference);
		if (tabbable.length > 0) {
			if (evt.shiftKey) {
				tabbable[tabbable.length - 1].focus();
			} else {
				tabbable[0].focus();
			}
		} else {
			reference.focus();
		}
	};
};

export const useFocusWithin = (
	reference: null | HTMLElement,
	condition = false
) => {
	useEffect(() => {
		if (!reference || !condition) {
			return;
		}

		const focusin = focusinCreator(reference);

		const onKeyChange = onKeyChangeCreator(reference);

		document.addEventListener("focusin", focusin);
		document.addEventListener("keydown", onKeyChange, true);
		return () => {
			document.removeEventListener("focusin", focusin);
			document.removeEventListener("keydown", onKeyChange, true);
		};
	}, [reference, condition]);
};
