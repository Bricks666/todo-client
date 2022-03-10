import { FocusEventHandler, useCallback, useState } from "react";

interface Handlers {
	readonly onFocus?: FocusEventHandler<HTMLElement>;
	readonly onBlur?: FocusEventHandler<HTMLElement>;
}

export const useControlHandlers = (
	reference: HTMLElement | null,
	handlers: Handlers = {}
) => {
	const { onFocus: onFocusCallback, onBlur: onBlurCallback } = handlers;
	const [isFocus, setFocus] = useState(document.activeElement === reference);

	const onFocus: FocusEventHandler<HTMLElement> = useCallback(
		(evt) => {
			console.log(evt);
			setFocus(true);
			console.log(document.activeElement);
			onFocusCallback && onFocusCallback(evt);
		},
		[onFocusCallback]
	);
	const onBlur: FocusEventHandler<HTMLElement> = useCallback(
		(evt) => {
			setFocus(false);
			reference?.blur();
			onBlurCallback && onBlurCallback(evt);
		},
		[onBlurCallback, reference]
	);

	return {
		isFocus,
		onBlur,
		onFocus,
	};
};
