import React, {
	memo,
	FC,
	useState,
	AriaAttributes,
	HTMLAttributes,
	forwardRef,
} from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import { useClickOutside } from "@/hooks";
import { Portal } from "../Portal";
import { Block } from "../Block";
import { FocusTrap } from "../FocusTrap";
import { useKeyListener, useTwoRef } from "../hooks";

import PopoverStyle from "./Popover.module.css";

interface PopoverProps extends AriaAttributes, HTMLAttributes<HTMLDivElement> {
	readonly reference: HTMLElement | null;
	readonly isOpen: boolean;
	readonly onClose: (evt?: MouseEvent) => unknown;
	readonly placement?: Placement;
	readonly trapFocus?: boolean;
	readonly isFocus?: boolean;
	readonly closeOnEsc?: boolean;
}

export const Popover = memo(
	forwardRef<HTMLDivElement, PopoverProps>(function Popover(
		{
			reference,
			isOpen,
			placement,
			onClose,
			children,
			style,
			isFocus = isOpen,
			trapFocus = false,
			closeOnEsc = true,
			...props
		},
		ref
	) {
		const [popover, setPopover] = useState<HTMLDivElement | null>(null);
		const rootRef = useTwoRef<HTMLDivElement>(ref, setPopover);
		const { styles, attributes } = usePopper(reference, popover, { placement });
		useClickOutside(popover, onClose, isOpen);
		useKeyListener("Escape", onClose, closeOnEsc);

		return isOpen ? (
			<Portal>
				<div
					className={PopoverStyle.popover}
					style={{ ...styles.popper, ...style }}
					{...attributes}
					ref={rootRef}
					{...props}
				>
					<FocusTrap open={trapFocus && isFocus}>
						<Block className={PopoverStyle.block}>{children}</Block>
					</FocusTrap>
				</div>
			</Portal>
		) : null;
	})
);
