import { HEX } from "../common";

export interface TaskGroupResponse {
	readonly groupId: number;
	readonly groupName: string;
	readonly groupMainColor: HEX;
	readonly groupSecondColor: HEX;
}

export interface TaskGroupsResponse {
	readonly groups: TaskGroupResponse[];
}

export interface CreateGroupResponse {
	readonly group: TaskGroupResponse;
}

export interface DeleteGroupResponse {
	readonly groupId: number;
}

export interface EditGroupResponse {
	readonly group: TaskGroupResponse;
}
