import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { ContentLayout } from "@/ui/ContentLayout";
import { TasksProgress } from "@/components/TasksProgress";
import { Tasks } from "@/components/Tasks";
import { usePageTitle } from "@/hooks";

import HomePageStyle from "./HomePage.module.css";

/* TODO: Вынести сайдбар в отдельный блок(в не страницы), в котором будет по роутингу меняться контент */

export const HomePage: FC<ClassNameProps> = ({ className }) => {
	usePageTitle("Homepage");
	return (
		<main>
			<ContentLayout className={classNames(HomePageStyle.layout, className)}>
				<Tasks className={HomePageStyle.tasks} />
				<aside className={HomePageStyle.aside}>
					<TasksProgress />
				</aside>
			</ContentLayout>
		</main>
	);
};
