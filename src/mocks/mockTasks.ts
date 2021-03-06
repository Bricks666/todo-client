import { TaskAuthor, TaskStructure } from "../models/Tasks/types";

const mockAuthor: TaskAuthor = {
	name: "John",
	photo: "https://effector.dev/ru/img/comet.png",
};

export const mockTasks: TaskStructure[] = [
	{
		id: 1,
		author: mockAuthor,
		status: "Ready",
		groupId: 1,
		content: "AderAderAder",
		addedDate: "2022-01-19",
		commentCount: 3,
	},
	{
		id: 2,
		author: mockAuthor,
		status: "Review",
		groupId: 1,
		content: "AderAderAder",
		addedDate: "2022-01-14",
		commentCount: 3,
	},
	{
		id: 4,
		author: mockAuthor,
		status: "Done",
		groupId: 1,
		content: "AderAderAder",
		addedDate: "2022-01-10",
		commentCount: 3,
	},
	{
		id: 6,
		author: mockAuthor,
		status: "In Progress",
		groupId: 1,
		content: "AderAderAder",
		addedDate: "2022-01-09",
		commentCount: 3,
	},
	{
		id: 11,
		author: mockAuthor,
		status: "Ready",
		groupId: 2,
		content: "AderAderAder",
		addedDate: "2022-01-19",
		commentCount: 3,
	},
	{
		id: 21,
		author: mockAuthor,
		status: "Review",
		groupId: 2,
		content:
			"Effects in effector allows users to change their implementation (handler) via use calls, which would be used to mocking them in tests.",
		addedDate: "2022-01-14",
		commentCount: 3,
	},
	{
		id: 41,
		author: mockAuthor,
		status: "Done",
		groupId: 2,
		content: "AderAderAder",
		addedDate: "2022-01-10",
		commentCount: 3,
	},
	{
		id: 61,
		author: mockAuthor,
		status: "In Progress",
		groupId: 2,
		content: "AderAderAder",
		addedDate: "2022-01-09",
		commentCount: 3,
	},
];
