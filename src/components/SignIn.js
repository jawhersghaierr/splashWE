import React from "lib_ui/react";
import {useMsal} from '@azure/msal-react';
import {translation} from '../assets/translations/translationService';
import {getAccountInfo, acquireAccessToken} from '../msal'
export const SignInLink = () => {
	
	const {instance} = useMsal();
	
	const handleLogIn = (loginType) => {
		if (loginType === "popup") {
			instance.loginPopup();
		} else if (loginType === "redirect") {
			instance.loginRedirect();
		}
	};
	
	const handleAccount = () => {
		console.log(instance.getActiveAccount());
		console.log(getAccountInfo());
		console.log(acquireAccessToken());
	}
	
	return (
		<>
			<a className="login"
			   href="/"
			   onClick={(e) => {
				   e.preventDefault();
				   handleLogIn("popup")
			   }}>
				{translation().login}
			</a>
			<br/>
			<a href="/" onClick={(e) => {
				   e.preventDefault();
				   handleAccount()
			   }}>
				handle Account Info
			</a>
		</>
	)
};



