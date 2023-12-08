import {gestionnerRouters, psRouters} from "../leftMenu/HostRouters";

const profileRoleState = {
    PS: {
        Dashboard: ({psCards}) => psCards,
        subTitle: ({subTitlePS}) => subTitlePS,
        LeftMenu: ({psRouters}) => psRouters
    },
    GESTIONAIRE: {
        Dashboard: ({ gestionnerCards }) => gestionnerCards,
        subTitle: ({subTitleUser}) => subTitleUser,
        LeftMenu: ({gestionnerRouters}) => gestionnerRouters
    },
};

export const userProfleSM = ({ entity, role, props }) => {
    let result = null
    if (role && entity && profileRoleState[role] && profileRoleState[role][entity]) {
        result = profileRoleState[role][entity](props);
    }
    return result;
};
