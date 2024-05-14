module.exports = {
    msalConfig: {
        auth: {
            clientId: "7f53ad13-dd05-4d1e-9239-15210825db3f",
            authority: "https://integrationviamedisb2c.b2clogin.com/integrationviamedisb2c.onmicrosoft.com/b2c_1_susi_email",
            knownAuthorities: ["integrationviamedisb2c.b2clogin.com"],
            redirectUri: "http://localhost:8030",
            postLogoutRedirectUri: "http://localhost:8030",
        },
    },
    loginRequest: {
        scopes: ["https://integrationviamedisb2c.onmicrosoft.com/f9b81c03-1384-45d9-a8c3-14fc54959a41/hospi_facturation_api.access"],
        extraQueryParameters: { ui_locales: "fr-FR" },
    },

    // **************************************************************
    // *********************   remoteApps     ***********************
    // **************************************************************
    remoteApps: {
        shared_lib_ui: "http://localhost:8039/remoteEntry.js",
        tps_ui: "http://localhost:8031/remoteEntry.js",
        hospi_ui: "http://localhost:8032/remoteEntry.js",
        payment_ui: "http://localhost:8033/remoteEntry.js",
        ps_ui: "http://localhost:8034/remoteEntry.js",
        benef_ui: "http://localhost:8035/remoteEntry.js",
        indu_ui: "http://localhost:8036/remoteEntry.js",
        intraitables_ui: "http://localhost:8037/remoteEntry.js",
        auth_ui: "http://localhost:8040/remoteEntry.js",
    },
    // **************************************************************

    // **************************************************************
    // *********************      apiUrls     ***********************
    // **************************************************************
    apiUrls: {
        // rocSelAndIdb: "https://rec-api.viamedis.net/roc-api/v1",
        // ps: "https://rec-api.viamedis.net/ps-api/v1",
        // paiementsAndVirements: "https://rec-api.viamedis.net/paiement-api/v1",
        // referentiels: "https://rec-api.viamedis.net/referentiel-api/v1",
        // hospiFactures: "https://rec-api.viamedis.net/hospi-facturation-api/v1",
        // beneficiaire: "https://rec-api.viamedis.net/droits-beneficiaire-api/v1",
        // factureAndIntraitablesIntegration: "https://rec-api.viamedis.net/facturation-integration-api/v1",
        // agregator: "http://10.241.25.10:8015/api/v1",
        // tpsFactures: "https://rec-api.viamedis.net/tps-facturation-api/v1",
        // tpAmcSelAndIdb: "https://rec-api.viamedis.net/tp-amc-api/v1",
        // indus: "https://rec-api.viamedis.net/indu-api/v1",
        // userMngmnt: "https://rec-api.viamedis.net/users-profiles-api/v1",

        // agregator: "https://rec-api.viamedis.net/service-aggregator-api/v1",

        rocSelAndIdb: "https://apim-dev-socle.azure-api.net/roc-api/v1",
        ps: "https://apim-dev-socle.azure-api.net/ps-api/v1",
        paiementsAndVirements: "https://apim-dev-socle.azure-api.net/paiement-api/v1",
        referentiels: "https://apim-dev-socle.azure-api.net/referentiel-api/v1",
        hospiFactures: "https://apim-dev-socle.azure-api.net/hospi-facturation-api/v1",
        beneficiaire: "https://apim-dev-socle.azure-api.net/droits-beneficiaire-api/v1",
        factureAndIntraitablesIntegration: "https://apim-dev-socle.azure-api.net/facturation-integration-api/v1",
        agregator: "https://apim-dev-socle.azure-api.net/aggregator-api/v1",
        tpsFactures: "https://apim-dev-socle.azure-api.net/tps-facturation-api/v1",
        tpAmcSelAndIdb: "https://apim-dev-socle.azure-api.net/tp-amc-api/v1",
        indus: "https://apim-dev-socle.azure-api.net/indu-api/v1",
        userMngmnt: "https://apim-dev-socle.azure-api.net/users-profiles-api/v1",
        // **********************************************************
    },

    apiUrlsDev: {},
    apiUrlsInt: {},
    apiUrlsRec: {
        // http://10.241.25.21
    },
};
