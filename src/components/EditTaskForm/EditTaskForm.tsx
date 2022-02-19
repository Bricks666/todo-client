/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import React, { FC, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "@/const";
import {
	useGetParam,
	useGoBack,
	useGroupSelector,
	useStatusesSelect,
	useTask,
} from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { editTask } from "@/models/Tasks";
import { TaskStatus, TaskWithGroup } from "@/models/Tasks/types";
import { Button } from "@/ui/Button";
import { Select, SelectValues } from "@/ui/Select";
import { TextField } from "../TextField";

import EditTaskFromStyle from "./EditTaskForm.module.css";
import classNames from "classnames";

interface EditTaskFormValues {
	readonly content: string;
	readonly group: SelectValues<number>;
	readonly status: SelectValues<TaskStatus>;
}

const prepareTask = (task: TaskWithGroup | null): EditTaskFormValues => {
	return task
		? {
				content: task.content,
				group: {
					label: task.group?.name,
					value: task.group?.id,
				},
				status: {
					label: task.status,
					value: task.status,
				},
		  }
		: {
				content: "",
				group: {
					label: "",
					value: 0,
				},
				status: { label: "Ready", value: "Ready" },
		  };
};

export const EditTaskForm: FC<ClassNameProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const task = useTask(taskId);
	const { groupsOptions, styles } = useGroupSelector();
	const statuses = useStatusesSelect();
	const goBack = useGoBack();
	const { control, handleSubmit, formState } = useForm<EditTaskFormValues>({
		defaultValues: prepareTask(task),
	});

	const onSubmit = useCallback<SubmitHandler<EditTaskFormValues>>(
		({ group, status, ...values }) => {
			const groupId = group.value;
			const statusName = status.value;
			editTask({
				...values,
				id: +(taskId as unknown as number),
				status: statusName,
				groupId,
			});
			goBack();
		},
		[goBack, taskId]
	);
	const { isDirty } = formState;

	return (
		<form
			className={classNames(EditTaskFromStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Select options={statuses} name="status" control={control} />
			<Select
				options={groupsOptions}
				styles={styles}
				name="group"
				control={control}
			/>

			<TextField
				className={EditTaskFromStyle.textarea}
				name="content"
				control={control}
				multiline
			/>
			<Button disabled={!isDirty}>Save edit</Button>
		</form>
	);
};