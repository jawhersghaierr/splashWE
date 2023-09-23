module.exports = {
    "msalConfig": {
        "auth": {
            "clientId": "7f53ad13-dd05-4d1e-9239-15210825db3f",
            "authority": "https://integrationviamedisb2c.b2clogin.com/integrationviamedisb2c.onmicrosoft.com/B2C_1_si_email",
            "knownAuthorities": ["integrationviamedisb2c.b2clogin.com"],
            "redirectUri": "https://10.241.25.10:8030",
            "postLogoutRedirectUri": "https://10.241.25.10:8030"
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
        "scopes": ["https://integrationviamedisb2c.onmicrosoft.com/f9b81c03-1384-45d9-a8c3-14fc54959a41/hospi_facturation_api.access"],
        "extraQueryParameters": {"ui_locales" : "fr-FR"}
    },
    

    "remoteApps": {
        "lib_ui": "${REMOTE_LIB_UI}",
        "shared_lib_ui": "${REMOTE_SHARED_LIB_UI}",
        "hospi_ui": "${REMOTE_HOSPI}",
        "payment_ui": "${REMOTE_PAYEMENTS}",
        "ps_ui": "${REMOTE_PS}",
        "benef_ui": "${REMOTE_BENEF}",

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
        "refs": "${APIURL_REFS}",
        "referentiels": "${APIURL_REFERENTIELS}"
    }
};
