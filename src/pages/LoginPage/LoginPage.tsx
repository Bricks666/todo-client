import React, { FC } from "react";
import { LoginForm } from "../../components/LoginForm";
import { SaveLink } from "../../components/SaveLink";
import { ContentLayout } from "../../ui/ContentLayout";
import { SectionHeader } from "../../ui/SectionHeader";

export const LoginPage: FC = () => {
	return (
		<ContentLayout>
			<SectionHeader>Login</SectionHeader>
			<LoginForm />
			<SaveLink to="/registration">Registration</SaveLink>
		</ContentLayout>
	);
};
