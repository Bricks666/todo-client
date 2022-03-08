import React, { PropsWithChildren } from "react";
import { Select as UISelect, SelectValue } from "@/ui/Select";
import { ClassNameProps } from "@/interfaces/common";
import { Control, Path, useController } from "react-hook-form";
import { StylesConfig } from "react-select";

interface SelectProps<FormValues> extends ClassNameProps {
	readonly control: Control<FormValues>;
	readonly name: Path<FormValues>;
	readonly options: SelectValue[];
	readonly selectId?: string;
	readonly label?: string;
	readonly styles?: StylesConfig<SelectValue>;
}

export const Select = <FormValues,>({
	control,
	name,
	...props
}: PropsWithChildren<SelectProps<FormValues>>) => {
	const { field } = useController({
		control,
		name,
	});
	return (
		<UISelect
			{...props}
			{...field}
			value={field.value as string}
		/>
	);
};
