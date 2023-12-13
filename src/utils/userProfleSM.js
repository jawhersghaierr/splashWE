export const flag = (moduleCode) => `extension_${moduleCode}_flag`

export const profile = (moduleCode) => `extension_${moduleCode}_profile`


export const checkRightsForModule = (moduleCode) => {
	let result = false
	if (profile(moduleCode) && flag(moduleCode) ) result = true
	
	return result
}


const profileRoleState = {
	PS: {
		Dashboard: ({psCards}) => psCards,
		subTitle: ({subTitlePS}) => subTitlePS,
		LeftMenu: ({psRouters}) => psRouters?.filter((item) => item.name && (item.code === 'ALL' || checkRightsForModule(item.code)))
	},
	GESTIONAIRE: {
		Dashboard: ({gestionnerCards}) => gestionnerCards,
		subTitle: ({subTitleUser}) => subTitleUser,
		LeftMenu: ({gestionnerRouters}) => gestionnerRouters?.filter((item) => item.name && (item.code === 'ALL' || checkRightsForModule(item.code)))
	},
};

export const userProfleSM = ({entity, role, props}) => {
	let result = null
	if (role && entity && profileRoleState[role] && profileRoleState[role][entity]) {
		result = profileRoleState[role][entity](props);
	}
	return result;
};

