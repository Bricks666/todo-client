import React, { FC } from "react";
import { OnlyClassName } from "../../interfaces/common";
import { TaskStructure } from "../../models/Tasks";

interface TaskCardComponent extends OnlyClassName, TaskStructure {}

export const TaskCard: FC<TaskCardComponent> = ({
	className,
	id,
	status,
	group,
	content,
	commentCount,
	addedDate,
}) => {
	return (
		<article>
			<p>{content}</p>
		</article>
	);
};
