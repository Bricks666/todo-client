/* eslint-disable indent */
import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "@/const";
import {
	useGetParam,
	useGoBack,
	/* useGroupSelector */ useTask,
} from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { editTask } from "@/models/Tasks";
import { TaskStatus, TaskStructure } from "@/models/Tasks/types";
import { TaskGroup } from "@/models/Groups/types";
import { Button } from "@/ui/Button";
import { Select } from "../Select";
import { TextField } from "../TextField";
import { useGroup } from "@/hooks/useGroup";
import { SelectValue } from "@/ui/Select";
import { MenuItem } from "@/ui/MenuItem";

import EditTaskFromStyle from "./EditTaskForm.module.css";
import { joiResolver } from "@hookform/resolvers/joi";
import { validatingScheme } from "./validator";

export interface EditTaskFormValues {
	readonly content: string;
	readonly groupId: number;
	readonly status: TaskStatus;
}

const prepareTask = (
	task: TaskStructure | null,
	groupId: TaskGroup | null
): EditTaskFormValues => {
	return task && groupId
		? {
				content: task.content,
				groupId: groupId.id,
				status: task.status,
		  }
		: {
				content: "",
				groupId: 0,
				status: "Ready",
		  };
};

const statuses = [
	{
		label: "Ready",
		value: "Ready",
	},
	{
		label: "In Progress",
		value: "In Progress",
	},
	{
		label: "Review",
		value: "Review",
	},
	{
		label: "Done",
		value: "Done",
	},
];

export const EditTaskForm: FC<ClassNameProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const task = useTask(taskId);
	const groupId = useGroup(task?.groupId || null);
	/* const { groupsOptions, styles } = useGroupSelector(); */
	const goBack = useGoBack();
	const { control, handleSubmit, formState } = useForm<EditTaskFormValues>({
		defaultValues: prepareTask(task, groupId),
		resolver: joiResolver(validatingScheme),
	});

	const onSubmit = useCallback<SubmitHandler<EditTaskFormValues>>(
		({ groupId, status, ...values }) => {
			/* 			editTask({
				...values,
				id: +(taskId as unknown as number),
				status: statusName,
				groupId,
			});
			goBack();
		},
		[goBack, taskId]
	); */
	const { isDirty, errors } = formState;

	return (
		<form
			className={classNames(EditTaskFromStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Select options={statuses} name="status" control={control}>
				<MenuItem label="assdasd" />
			</Select>
			{/* <Select
				options={groupsOptions}
				styles={styles}
				name="group"
				control={control}
			/> */}

			<TextField
				className={EditTaskFromStyle.textarea}
				name="content"
				control={control}
				multiline
			/>
			<Button className={EditTaskFromStyle.button} disabled={!isDirty}>
				Save edit
			</Button>
		</form>
	);
};
