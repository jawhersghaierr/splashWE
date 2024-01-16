/**
 * walks through card definition and their modules and return filtered arrays based on claims
 * @param cards
 * @param claims
 * @returns {*[]}
 */
const cardWalker = ({ cards, claims }) => {
    let result = [];
    cards.map(card => {
        let modules = [];
        card?.modules.map(_modul => {
            if (claims.some(claim => _modul.code.includes(claim))) modules.push(_modul);
        });
        if (modules.length > 0) result.push({ ...card, modules });
    });
    return result;
};

/**
 *
 * State Machine declaration of rules
 */
const profileRoleState = {
    PS: {
        Dashboard: ({ psCards, claims }) => cardWalker({ cards: psCards, claims }),
        subTitle: ({ subTitlePS }) => subTitlePS,
        LeftMenu: ({ psRouters, claims }) => psRouters?.filter(({ code, name }) => name && claims.some(claim => code.includes(claim))),
    },
    GESTIONAIRE: {
        Dashboard: ({ gestionnerCards, claims }) => cardWalker({ cards: gestionnerCards, claims }),
        subTitle: ({ subTitleUser }) => subTitleUser,
        LeftMenu: ({ gestionnerRouters, claims }) => gestionnerRouters?.filter(({ code, name }) => name && claims.some(claim => code.includes(claim))),
    },
};
/**
 *
 * @param entity string: name of impacted object, can be component or method
 * @param role string/key of declaration can be PS or Gestionare
 * @param props
 * @returns {method or boolean depending of declaration for stateMachine actions}
 */
export const userProfleSM = ({ entity, role, props }) => {
    let result = null;
    if (role && entity && profileRoleState[role] && profileRoleState[role][entity]) {
        result = profileRoleState[role][entity](props);
    }
    return result;
};
