/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
	ChangeEvent,
	ChangeEventHandler,
	CSSProperties,
	FC,
	FocusEventHandler,
	memo,
	useMemo,
	useState,
} from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Menu } from "../Menu";
import { useToggle } from "@/hooks";
import { MenuItem } from "../MenuItem";

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
	const { name, value, options, className, onBlur, onChange, onFocus } = props;
	const [reference, setReference] = useState<HTMLDivElement | null>(null);
	const [isOpen, toggle] = useToggle();

	const menuStyle = useMemo(() => {
		let width = 0;

		if (reference) {
			width = parseFloat(getComputedStyle(reference).width);
		}

		return { width };
	}, [reference]);

	return (
		<div
			className={classNames(SelectStyle.select, className)}
			ref={setReference}
			onClick={toggle}
			tabIndex={0}
			role="button"
			onFocus={onFocus}
			onBlur={onBlur}
			aria-expanded={isOpen}
			aria-haspopup="listbox"
		>
			{value}
			<input className="visibility-hidden" aria-hidden="true" name={name} />
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={toggle}
				role="listbox"
				style={menuStyle}
			>
				{options.map(({ label, value, classes, styles }) => (
					<MenuItem
						className={classes}
						label={label}
						onClick={() =>
							onChange &&
							onChange({ target: { value } } as ChangeEvent<HTMLSelectElement>)
						}
						style={styles}
						role="option"
						key={label}
					/>
				))}
			</Menu>
		</div>
	);
});
