import classNames from "classnames";
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
} from "react";
import { ClassNameProps } from "@/interfaces/common";

import TextareaStyle from "./Textarea.module.css";

interface TextareaProps extends ClassNameProps {
	readonly value?: string | number;
	readonly onChange?: ChangeEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly onBlur?: FocusEventHandler;
	readonly id?: string;
	readonly disabled?: boolean;
	readonly readOnly?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...textarea }, ref) => {
		const classes = classNames(TextareaStyle.textarea, className);
		return <textarea className={classes} {...textarea} ref={ref} />;
	}
);
