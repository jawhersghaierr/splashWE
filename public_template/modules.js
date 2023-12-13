module.exports = {

    "msalConfig": {
        "auth": {
            "clientId": "${CLIENT_ID}",
            "authority": "${AUTHORITY}",
            "knownAuthorities": ["${KNOWN_AUTHORITY}"],
            "redirectUri": "${REDIRECT_URI}",
            "postLogoutRedirectUri": "${POST_LOGOUT_REDIRECT_URI}"
        },
    },
    "loginRequest": {
        "scopes": ["${LOGIN_REQUEST_SCOPES}"],
        "extraQueryParameters": {"ui_locales" : "fr-FR"}
    },
// **************************************************************


// **************************************************************
// *********************   remoteApps     ***********************
// **************************************************************
    "remoteApps": {
        "shared_lib_ui": "${REMOTE_SHARED_LIB_UI}",
        "lib_ui": "${REMOTE_LIB_UI}",
        "tps_ui": "${REMOTE_TPS_UI}",
        "hospi_ui": "${REMOTE_HOSPI_UI}",
        "intraitables_ui": "${REMOTE_INTRAITABLES_UI}",
        "ps_ui": "${REMOTE_PS_UI}",
        "payment_ui": "${REMOTE_PAYEMENTS_UI}",
        "benef_ui": "${REMOTE_BENEF_UI}",
        "indu_ui": "${REMOTE_INDU_UI}",
        "auth_ui": "${REMOTE_AUTH_UI}",
    },
    // **************************************************************
    
    
    // **************************************************************
    // *********************      apiUrls     ***********************
    // **************************************************************
    
    "apiUrls": {
        "rocSelAndIdb": "${APIURL_ROC_SEL_IDB}",
        "ps": "${APIURL_PS}",
        "paiementsAndVirements": "${APIURL_PAIEMENT_VIREMENT}",
        "referentiels": "${APIURL_REFERENTIELS}",
        "hospiFactures": "${APIURL_HOSPI_FACTURES}",
        "beneficiaire": "${APIURL_BENEFICIAIRE}",
        "factureAndIntraitablesIntegration":  "${APIURL_INTEGRATION_FACTURE_INTRITABLES}",
        "agregator": "${APIURL_AGREGATOR}",
        "tpsFactures": "${APIURL_TPS_FACTURES}",
        "tpAmcSelAndIdb": "${APIURL_TP_AMC_SEL_IDB}",
        "indus": "${APIURL_INDUS}",
        "userMngmnt": "${APIURL_USER_MANAGEMENT}"
        // **********************************************************
        
    }
};
