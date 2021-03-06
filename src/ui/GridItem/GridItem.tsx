import React, { FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";

interface GridItemProps extends ClassNameProps {
	readonly columnCount?: number | string;
}

export const GridItem: FC<GridItemProps> = memo(function GridItem({
	children,
	className,
	columnCount = 12,
}) {
	const styles = {
		gridColumn: `span ${columnCount}`,
	};
	return (
		<div className={className} style={styles}>
			{children}
		</div>
	);
});
