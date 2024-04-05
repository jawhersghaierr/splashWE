import {userProfleSMandCommonClaims} from "shared_lib_ui/auth";

const {commonUserProfleSM, CLAIM_DEPENDENT } = userProfleSMandCommonClaims;

/**
 *
 * State Machine declaration of rules
 */
const profileRoleState = {
    CLAIM_DEPENDENT,
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
 * @param context string/key of declaration can be PS or Gestionare
 * @param props
 * @returns method or boolean depending on declaration for stateMachine actions
 */
export const userProfileSM = ({ entity, context, props }) => {

    return commonUserProfleSM(profileRoleState)({ entity, context, props });
};
