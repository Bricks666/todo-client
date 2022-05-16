import React, { FC } from "react";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/components/MainPopup";
import { useGoBack } from "@/hooks";
import { GroupForm } from "../GroupForm";
import { createGroup } from "@/models/Groups";
import { useTranslation } from "react-i18next";

import CreateGroupPopupStyle from "./CreateGroupPopup.module.css";

interface CreateGroupPopupProps extends ClassNameProps, BasePopup {}

export const CreateGroupPopup: FC<CreateGroupPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation("popups");
	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header={t("add_group.title")}
			alt={t("add_group.title")}
		>
			<GroupForm
				className={CreateGroupPopupStyle.form}
				afterSubmit={onClose}
				submitHandler={createGroup}
				buttonText={t("add_group.button")}
			/>
		</MainPopup>
	);
};
