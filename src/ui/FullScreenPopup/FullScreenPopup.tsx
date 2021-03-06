import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import React, { FC } from "react";
import { Block } from "../Block";
import { Collapse } from "../Collapse";
import { PopupContent } from "../PopupContent";
import { PopupHeader } from "../PopupHeader";
import { Portal } from "../Portal";

import FullScreenPopupStyle from "./FullScreenPopup.module.css";

interface FillScreenPopupProps extends ClassNameProps {
	readonly isOpen: boolean;
	readonly onClose: VoidFunction;
	readonly header: string;
}

export const FullScreenPopup: FC<FillScreenPopupProps> = ({
	children,
	className,
	isOpen,
	onClose,
	header,
}) => {
	return (
		<Portal>
			<div className={FullScreenPopupStyle.container}>
				<Collapse origin="bottom" open={isOpen} duration={300}>
					<Block className={FullScreenPopupStyle.block}>
						<PopupHeader onClose={onClose}>{header}</PopupHeader>
						<PopupContent
							className={classNames(FullScreenPopupStyle.content, className)}
						>
							{children}
						</PopupContent>
					</Block>
				</Collapse>
			</div>
		</Portal>
	);
};
