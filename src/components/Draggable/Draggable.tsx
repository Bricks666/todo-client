import { Box } from "@mui/material";
import React, { DragEventHandler, FC, memo } from "react";

interface DraggableProps {
	readonly onDragStart?: DragEventHandler;
	readonly onDragEnd?: DragEventHandler;
	readonly onDragEnter?: DragEventHandler;
	readonly onDragLeave?: DragEventHandler;
}

export const Draggable: FC<DraggableProps> = memo(function Draggable({
	children,
	...handlers
}) {
	return (
		<Box draggable {...handlers}>
			{children}
		</Box>
	);
});
