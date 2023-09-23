import React, {useEffect} from "lib_ui/react";
import { useSelector, useDispatch } from "lib_ui/react-redux";
import {useMsal} from 'lib_ui/@azure-msal-react';
import {getUser} from "shared_lib_ui/host";

export const UserAccess = () => {
	
	const { instance } = useMsal();
	
	// const user = useSelector(getUser);
	//
	// const handleAccount = () => {
	// 	const user = instance.getActiveAccount()
	// 	console.log('user: ', user);
	// }
	const handleLogout = (logoutType) => {
		if (logoutType === "popup") {
			instance.logoutPopup();
		} else if (logoutType === "redirect") {
			instance.logoutRedirect();
		}
	};
	
	useEffect(() => {
		
		let sessionStorage = window.sessionStorage
		if (sessionStorage){
			Object.keys(sessionStorage).
			map( key=> console.log( 'key ', key, ' : ', sessionStorage[key] ));

			console.log('-------------------------------------')
			console.log(sessionStorage)
			console.log('-------------------------------------')
			const session = window.sessionStorage.getItem('msal.account.keys')
			// if (session) {
			// 	const sessionAccount =  JSON.parse(window.sessionStorage.getItem('msal.account.keys'))
			// 	console.log(sessionAccount);
			//
			// 	if (Array.isArray(sessionAccount)){
			// 		const msalTokens = JSON.parse(window.sessionStorage.getItem(sessionAccount[0]))
			// 		console.log('msalTokens > ', msalTokens);
			// 	}
			//
			// }
		}
		
		
	}, []);
	
	
	
	
	
	return (
		<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
			<div style={{ margin: "0 15px 0 25px" }}>
				<a className="logout" href="/" onClick={(e) => {
					   e.preventDefault();
					   handleLogout("redirect")
				   }}> logout </a>
			
			</div>
		</div>
	)
};



