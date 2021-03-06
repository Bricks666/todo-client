import Joi from "joi";
import { allowedSymbolsRegExp } from "@/const";
import { TaskFormValues } from "./CreateTaskForm";

export const validationScheme = Joi.object<TaskFormValues>({
	groupId: Joi.number().required().messages({
		"number.empty": "Group must be choose",
		"number.positive": "Group must be choose",
	}),
	content: Joi.string()
		.pattern(allowedSymbolsRegExp)
		.max(128)
		.required()
		.messages({
			"string.empty": "Content can't be empty",
			"string.max": "Content can be less than 128",
			"string.pattern.base":
				"Content can only contain latins alphas, numeric and !, *, (, ), _, +",
		}),
});
