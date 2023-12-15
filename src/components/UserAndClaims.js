import React, { useEffect } from "lib_ui/react";
import { useStore, useSelector, useDispatch } from "lib_ui/react-redux";
import { baseApi } from "shared_lib_ui/services";

import { getUser } from "shared_lib_ui/host";
import { UserAccess } from "shared_lib_ui/auth";
import { setTargetModule } from "shared_lib_ui/host";
import { LoadingDots, RemoteApi } from "shared_lib_ui/Lib/components";
import RemoteAuthApp from "auth_ui/RemoteAuthApp";

const access = {
    extension_PS_flag: true,
    extension_PS_profile: "PS_GESTIONAIRE_TP",
    extension_HFAC_flag: true,
    extension_HFAC_profile: "HFAC_GESTIONNAIRE_TP",
    extension_TPS_profile: "TPS_GESTIONNAIRE_TP",
    extension_TPS_flag: true,
    extension_TPAMC_profile: "TP_AMC_GESTIONAIRE_TP",
    extension_TPAMC_flag: true,
    extension_ROC_profile: "ROC_GESTIONAIRE_TP",
    extension_ROC_flag: true,
    extension_DRB_flag: true,
    extension_DRB_profile: "DRB_GESTIONNAIRE_TP",
    extension_INDU_flag: true,
    extension_INDU_profile: "INDU_GESTIONNAIRE_TP",
    extension_PAI_flag: true,
    extension_PAI_profile: "PAI_GESTIONNAIRE_TP",
    extension_FIN_flag: true,
    extension_FIN_profile: "FIN_GESTIONNAIRE_TP",
};

const CLAIMS = [
    "CAN_UPDATE_USER",
    "CAN_UPDATE_USER_PROFILE",
    "CAN_VIEW_USER_PROFILES",
    "CAN_VIEW_USERS",
    "CAN_REMOVE_USER",
    "CAN_CREATE_USER",
    "CAN_CREATE_USER_PROFILE",
    "CAN_REMOVE_USER_PROFILE",
    "CAN_VIEW_USER_PROFILES",
    "CAN_CREATE_CONFIGURATION",
    "CAN_RECYCLE_FACTURE",
    "CAN_VIEW_USERS",
    "CAN_GET_CONFIGURATION",
    "CAN_GET_FACTURE_HISTORY",
    "CAN_UPDATE_USER",
    "CAN_CREATE_USER_PROFILE",
    "CAN_GET_FACTURE_DETAILS",
    "CAN_UPDATE_USER_PROFILE",
    "CAN_REJECT_FACTURE",
    "CAN_SEARCH_CONFIGURATION",
    "CAN_SEARCH_FACTURE",
    "CAN_REMOVE_USER_PROFILE",
    "CAN_CANCEL_FACTURE",
    "CAN_REMOVE_USER",
    "CAN_CREATE_USER",
];

const targetModule = [
    "HFAC",
    "TPS",
    "TPAMC",
    "FIN",
    "DRB",
    "PAI",
    "INDU",
    "ROC",
    "PS",
];
export default function UserAndClaims() {
    const store = useStore();
    useEffect(() => {
        // store.dispatch(setTargetModule('HOSPI'));
    }, []);

    const user = useSelector(getUser);
    console.log("user ", user);

    const { useGetUserInfoQuery } = baseApi;

    // const dispatch = useDispatch();
    console.log("baseApi ", baseApi);

    const setter = (param) => {
        console.log("setter param : ", param);
    };

    return (
        <span>
            {useGetUserInfoQuery && user?.idToken && (
                <RemoteApi
                    criterias={user?.uniqueId}
                    rtkCall={useGetUserInfoQuery}
                    setter={setter}
                />
            )}
        </span>
    );
}
