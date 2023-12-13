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
    CLAIMS:[
        'CAN_UPDATE_USER',
        'CAN_UPDATE_USER_PROFILE',
        'CAN_VIEW_USER_PROFILES',
        'CAN_VIEW_USERS',
        'CAN_REMOVE_USER',
        'CAN_CREATE_USER',
        'CAN_CREATE_USER_PROFILE',
        'CAN_REMOVE_USER_PROFILE'
    ]
};

export const userProfleSM = ({ entity, role, props }) => {
    let result = null
    if (role && entity && profileRoleState[role] && profileRoleState[role][entity]) {
        result = profileRoleState[role][entity](props);
    }
    return result;
};
