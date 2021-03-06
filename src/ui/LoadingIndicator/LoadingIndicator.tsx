import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";

import LoadingIndicatorStyle from "./LoadingIndicator.module.css";

type Size = "small" | "medium" | "large";

interface LoadingIndicatorComponent extends ClassNameProps {
	readonly size?: Size;
	readonly text?: string;
}

export const LoadingIndicator: FC<LoadingIndicatorComponent> = ({
	className,
	text,
	size = "medium",
}) => {
	const classes = classNames(
		LoadingIndicatorStyle.indicatorContainer,
		LoadingIndicatorStyle[size]
	);

	return (
		<div className={className}>
			<progress className="visibility-hidden" />
			<div className={classes}>
				<div className={LoadingIndicatorStyle.circleGroup}>
					<span
						className={classNames(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle1
						)}
					/>
					<span
						className={classNames(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle2
						)}
					/>
					<span
						className={classNames(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle3
						)}
					/>
					<span
						className={classNames(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle4
						)}
					/>
				</div>
				{text && <h2 className={LoadingIndicatorStyle.header}>{text}</h2>}
			</div>
		</div>
	);
};
