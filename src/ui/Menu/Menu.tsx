import { ClassNameProps, ExtractProps } from "@/interfaces/common";
import React, { AriaRole, CSSProperties, FC, forwardRef } from "react";
import { List } from "../List";
import { Popover } from "../Popover";

interface MenuProps
	extends ClassNameProps,
		ExtractProps<typeof Popover, "className"> {
	readonly role?: AriaRole;
	readonly style?: CSSProperties;
}

export const Menu: FC<MenuProps> = forwardRef(
	({ children, className, role = "menu", ...props }, ref) => {
		return (
			<Popover {...props} role={role} ref={ref}>
				<List className={className}>{children}</List>
			</Popover>
		);
	}
);
