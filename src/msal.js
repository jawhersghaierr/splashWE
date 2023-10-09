import {EventType, PublicClientApplication} from "@azure/msal-browser";

function getActiveAccount() {
	let active = msalInstance.getActiveAccount();
	if (!!active) {
		return active;
	}
	const all = msalInstance.getAllAccounts();
	if (all.length === 0) {
		return null;
	}
	return all[0];
}

let msalConfig = window._env_.msalConfig;

export const msalInstance = new PublicClientApplication(msalConfig);

if (msalInstance.getAllAccounts().length > 0) {
	msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
	if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
		const account = event.payload.account;
		msalInstance.setActiveAccount(account);
	}
});

export const acquireAccessToken = async () => {
	const account = getActiveAccount();
	if (!account) {
		return "";
	}
	const request = {
		scopes: window._env_.loginRequest.scopes,
		account: account
	};
	const authResult = await msalInstance.acquireTokenSilent(request)
	.catch(error => {
		msalInstance.logoutRedirect();
	});
	// TODO check result!
	return authResult.accessToken
};

export const getAccountInfo = () => {
	const account = getActiveAccount();
	if (!account || !account.idTokenClaims) {
		return {
			userName: "",
			givenName: "",
			familyName: "",
			email: "",
			rights: []
		};
	}
	return {
		userName: account.idTokenClaims.name,
		givenName: account.idTokenClaims.given_name,
		familyName: account.idTokenClaims.family_name,
		email: account.idTokenClaims.email ? account.idTokenClaims.email : account.idTokenClaims.emails[0],
	}
	
};


