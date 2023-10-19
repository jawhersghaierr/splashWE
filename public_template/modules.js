module.exports = {
    "msalConfig": {
        "auth": {
            "clientId": "${CLIENT_ID}",
            "authority": "${AUTHORITY}",
            "knownAuthorities": ["${KNOWN_AUTHORITY}"],
            "redirectUri": "${REDIRECT_URI}",
            "postLogoutRedirectUri": "${POST_LOGOUT_REDIRECT_URI}"
        },
        // "auth": {
        // 	clientId: "cb80b654-41fb-43dd-bb34-c802089d0d12",
        // 	authority: "https://integrationviamedisb2c.b2clogin.com/integrationviamedisb2c.onmicrosoft.com/B2C_1_si_email",
        // 	knownAuthorities: ["integrationviamedisb2c.b2clogin.com"],
        // 	redirectUri: "http://localhost:8030/factures",
        // 	postLogoutRedirectUri: "http://localhost:8030"
        // },
    },
    "loginRequest": {
        "scopes": "${LOGIN_REQUEST_SCOPES}",
        "extraQueryParameters": {"ui_locales" : "fr-FR"}
    },
    

    "remoteApps": {
        "lib_ui": "${REMOTE_LIB_UI}",
        "shared_lib_ui": "${REMOTE_SHARED_LIB_UI}",
        "tiers_payant_simple_ui": "${REMOTE_TPS}",
        "hospi_ui": "${REMOTE_HOSPI}",
        "payment_ui": "${REMOTE_PAYEMENTS}",
        "ps_ui": "${REMOTE_PS}",
        "benef_ui": "${REMOTE_BENEF}",
        "factures_intraitables_ui": "${REMOTE_INTRAITABLES}",

    },
    "apiUrls": {
        "beneficiaire": "${APIURL_BENEFICIAIRE}",
        "configurations": "${APIURL_CONFIGURATIONS}",
        "downloadFacture": "${APIURL_DOWNLOAD_FACTURE}",
        "downloadSelAndIdb": "${APIURL_DOWNLOAD_SEL_IDB}",
        "entities": "${APIURL_ENTITIES}",
        "factures": "${APIURL_FACTURES}",
        "fluxFactures": "${APIURL_FLUX_FACTURES}",
        "intraitables": "${APIURL_INTRAITABLES}",
        "paiements": "${APIURL_PAIEMENTS}",
        "ps": "${APIURL_PS}",
        "selAndIdb": "${APIURL_SEL_IDB}",
        "fluxSelAndIdb": "${APIURL_FLUX_SEL_IDB}",
        "virements": "${APIURL_VIREMENTS}",
        "tpsFactures": "${APIURL_TPS_FACTURES}",
        "tpAmcSelAndIdb": "${APIURL_TP_AMC_SEL_IDB}",
        "refs": "${APIURL_REFS}",
        "referentiels": "${APIURL_REFERENTIELS}",
        "userMngmnt": "${APIURL_USER_MANAGEMENT}",
        
    }
};
