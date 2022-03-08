import { forward, guard, sample } from "effector";
import {
	$Authorizing,
	$Login,
	authFx,
	loginFx,
	logoutFx,
	registrationFx,
	refreshFx,
	login,
	logout,
	registration,
	auth,
	refresh,
	$User,
	initialUser,
	$LoginError,
	$RegistrationError,
	clearLoginError,
	clearRegistrationError,
} from ".";
import {
	authApi,
	loginApi,
	logoutApi,
	refreshApi,
	registrationApi,
} from "@/api";
import { mayStartFxHandler } from "../handlers";

authFx.use(async () => {
	const response = await authApi();
	return response.user;
});
loginFx.use(async (credentials) => {
	const response = await loginApi(credentials);
	return response.user;
});
registrationFx.use(async (credentials) => {
	await registrationApi(credentials);
});
logoutFx.use(async () => {
	await logoutApi();
});
refreshFx.use(async () => {
	await refreshApi();
});

forward({
	from: [authFx.pending],
	to: $Authorizing,
});

guard({
	clock: login,
	filter: sample({
		clock: loginFx.pending,
		fn: mayStartFxHandler,
	}),
	target: loginFx,
});

guard({
	clock: auth,
	filter: sample({
		clock: authFx.pending,
		fn: mayStartFxHandler,
	}),
	target: authFx,
});

sample({
	clock: [loginFx.done, authFx.done],
	fn: () => true,
	target: $Login,
});

forward({
	from: [loginFx.doneData, authFx.doneData],
	to: $User,
});

guard({
	clock: logout,
	filter: sample({
		clock: logoutFx.pending,
		fn: mayStartFxHandler,
	}),
	target: logoutFx,
});

guard({
	clock: refresh,
	filter: sample({
		clock: refreshFx.pending,
		fn: mayStartFxHandler,
	}),
	target: refreshFx,
});

sample({
	clock: [logoutFx.done, refreshFx.fail],
	fn: () => false,
	target: $Login,
});

guard({
	clock: registration,
	filter: sample({
		clock: registrationFx.pending,
		fn: mayStartFxHandler,
	}),
	target: registrationFx,
});
sample({
	clock: logoutFx.done,
	fn: () => initialUser,
	target: $User,
});

sample({
	clock: loginFx.failData,
	fn: (data) => data,
	target: $LoginError,
});
sample({
	clock: registrationFx.failData,
	fn: (data) => data,
	target: $RegistrationError,
});

sample({
	clock: [loginFx.done, authFx.done, clearLoginError],
	fn: () => null,
	target: $LoginError,
});

sample({
	clock: [registrationFx.done, clearRegistrationError],
	fn: () => null,
	target: $RegistrationError,
});
