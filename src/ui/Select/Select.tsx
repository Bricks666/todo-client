/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
	ChangeEvent,
	ChangeEventHandler,
	CSSProperties,
	FC,
	FocusEventHandler,
	memo,
	useState,
} from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Menu } from "../Menu";
import { useToggle } from "@/hooks";
import { MenuItem } from "../MenuItem";
import { useKeyListener } from "../hooks";
import { useFocusActive } from "./useFocusActive";

import SelectStyle from "./Select.module.css";

export interface SelectValue<Value = string> {
	readonly label: string;
	readonly value: Value;
	readonly classes?: string;
	readonly styles?: CSSProperties;
}

interface SelectProps extends ClassNameProps {
	readonly name: string;
	readonly value: string;
	readonly options: SelectValue[];
	readonly onChange?: ChangeEventHandler<HTMLSelectElement>;
	readonly onFocus?: FocusEventHandler;
	readonly onBlur?: FocusEventHandler;
}

export const Select: FC<SelectProps> = memo(function Select(props) {
	const { value, options, className, onChange, onBlur, onFocus } = props;
	const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
	const [listRef, setListRef] = useState<HTMLDivElement | null>(null);
	const [isOpen, toggle] = useToggle();
	const { currentFocus } = useFocusActive(listRef, value, isOpen);
	useKeyListener(" ", toggle, !isOpen, rootRef);
	const rootClasses = classNames(SelectStyle.select, className);
	return (
		<div
			className={rootClasses}
			ref={setRootRef}
			onClick={toggle}
			tabIndex={0}
			role="button"
			onFocus={onFocus}
			onBlur={onBlur}
			aria-expanded={isOpen}
			aria-haspopup="listbox"
		>
			{value || "Select"}
			<Menu
				reference={rootRef}
				isOpen={isOpen}
				onClose={toggle}
				role="listbox"
				ref={setListRef}
			>
				{options.map(({ label, value, classes, styles }) => (
					<MenuItem
						className={classes}
						label={label}
						onClick={() =>
							onChange &&
							onChange({ target: { value } } as ChangeEvent<HTMLSelectElement>)
						}
						data-value={value}
						style={styles}
						role="option"
						key={label}
					/>
				))}
			</Menu>
		</div>
	);
});
