/**
 *
 * State Machine declaration of rules
 */
const profileRoleState = {
    CLAIM_DEPENDENT: {
        Dashboard: ({ cards, baseClaims, moduleClaims }) => {
            let result = [];
            cards.map(card => {
                let modules = [];
                let numberOfActiveModules = 0;
                card?.modules.map(_modul => {
                    if (_modul?.disabled !== undefined && _modul?.claim) {
                        let disabled = !moduleClaims[_modul?.code]?.claims?.some(r => _modul?.claim.includes(r));
                        modules.push({ ..._modul, disabled });
                        if (!disabled) numberOfActiveModules++;
                    } else if (!_modul?.disabled && baseClaims.includes(_modul?.code)) {
                        numberOfActiveModules++;
                        modules.push(_modul);
                    }
                });

                if (modules.length > 0 && numberOfActiveModules > 0) {
                    result.push({ ...card, modules });
                }
            });

            return result;
        },
    },
    PS: {
        subTitle: ({ subTitlePS }) => subTitlePS,
        LeftMenu: ({ psRouters, claims }) => psRouters?.filter(({ code, name }) => name && claims.some(claim => code.includes(claim))),
    },
    GESTIONAIRE: {
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
