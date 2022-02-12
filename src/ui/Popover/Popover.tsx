import React, { memo, PropsWithChildren, useState } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import { ClassNameProps } from "../../interfaces/common";
import { useClickOutside } from "../../hooks";
import { Portal } from "../Portal";

import PopoverStyle from "./Popover.module.css";

interface PopoverComponent extends ClassNameProps {
	readonly reference: HTMLElement | null;
	readonly isOpen: boolean;
	readonly onClose: (evt?: MouseEvent) => unknown;
	readonly placement?: Placement;
}

export const Popover = memo<PropsWithChildren<PopoverComponent>>(
	({ reference, isOpen, placement, onClose, children }) => {
		const [popover, setPopover] = useState<HTMLElement | null>(null);
		const { styles, attributes } = usePopper(reference, popover, { placement });
		useClickOutside(popover, onClose, isOpen);

		return isOpen ? (
			<Portal>
				<div
					className={PopoverStyle.popover}
					style={styles.popper}
					{...attributes}
					ref={setPopover}
				>
					{children}
				</div>
			</Portal>
		) : null;
	}
);
