import React from "react";
import {useMsal} from "@azure/msal-react";
import {translation} from "../assets/translations/translationService";

export const SignOutLink = () => {
	
	const {instance} = useMsal();
	
	const handleLogout = (logoutType) => {
		if (logoutType === "popup") {
			instance.logoutPopup();
		} else if (logoutType === "redirect") {
			instance.logoutRedirect();
		}
	};
	
	return (
		<a className="logout"
		   href="/"
		   onClick={(e) => {
			   e.preventDefault();
			   handleLogout("redirect")
		   }}>
			{translation().logout}
		</a>
	)
};



