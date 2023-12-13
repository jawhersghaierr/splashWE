export const flag = (moduleCode) => `extension_${moduleCode}_flag`
export const profile = (moduleCode) => `extension_${moduleCode}_profile`

const cardWalker = ({cards, claims}) => {
	let result = []
	cards.map(card => {
		let modules = []
		card?.modules.map(_modul => {
			if ( _modul?.code === 'ALL' || (claims[profile(_modul?.code)] && claims[flag(_modul?.code)]) ) modules.push(_modul)
		})
		if (modules.length > 0) result.push({...card, modules})
	})
	
	return result
}

const profileRoleState = {
	PS: {
		Dashboard: ({psCards, claims}) => cardWalker({cards: psCards, claims}),
		subTitle: ({subTitlePS}) => subTitlePS,
		
		/**
		 *
		 * @param gestionnerRouters check existing in declaration of userInfo.claims
		 * @param claims
		 * @returns {boolean}
		 */
		LeftMenu: ({psRouters, claims}) => psRouters?.filter(({name, code}) =>
			name && (code === 'ALL' || (claims[profile(code)] && claims[flag(code)]))
		)
	},
	GESTIONAIRE: {
		Dashboard: ({gestionnerCards, claims}) => cardWalker({cards: gestionnerCards, claims}),
		subTitle: ({subTitleUser}) => subTitleUser,
		/**
		 *
		 * @param gestionnerRouters check existing in declaration of userInfo.claims
		 * @param claims
		 * @returns {boolean}
		 */
		LeftMenu: ({gestionnerRouters, claims}) => gestionnerRouters?.filter(({name, code}) =>
			name && (code === 'ALL' || (claims[profile(code)] && claims[flag(code)])
			))
	},
};
/**
 *
 * @param entity string: name of impacted object, can be component or method
 * @param role string/key of declaration can be PS or Gestionare
 * @param props
 * @returns {method or boolean depending of declaration for stateMachine actions}
 */
export const userProfleSM = ({entity, role, props}) => {
	let result = null
	if (role && entity && profileRoleState[role] && profileRoleState[role][entity]) {
		result = profileRoleState[role][entity](props);
	}
	return result;
};

