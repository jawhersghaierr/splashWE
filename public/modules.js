module.exports = {
	
	"msalConfig": {
		"auth": {
			"clientId": "7f53ad13-dd05-4d1e-9239-15210825db3f",
			"authority": "https://integrationviamedisb2c.b2clogin.com/integrationviamedisb2c.onmicrosoft.com/B2C_1_si_email",
			"knownAuthorities": ["integrationviamedisb2c.b2clogin.com"],
			"redirectUri": "http://localhost:8030",
			"postLogoutRedirectUri": "http://localhost:8030"
		},
	},
	"loginRequest": {
		"scopes": ["https://integrationviamedisb2c.onmicrosoft.com/f9b81c03-1384-45d9-a8c3-14fc54959a41/hospi_facturation_api.access"],
		"extraQueryParameters": {"ui_locales" : "fr-FR"}
	},
// **************************************************************


// **************************************************************
// *********************   remoteApps     ***********************
// **************************************************************
	"remoteApps": {
		"tps_ui": "http://localhost:8031/remoteEntry.js",
		"hospi_ui": "http://localhost:8032/remoteEntry.js",
		"payment_ui": "http://localhost:8033/remoteEntry.js",
		"ps_ui": "http://localhost:8034/remoteEntry.js",
		"benef_ui": "http://localhost:8035/remoteEntry.js",
		// "indu_ui": "http://localhost:8036/remoteEntry.js",
		"intraitables_ui": "http://localhost:8037/remoteEntry.js",
		"lib_ui": "http://localhost:8038/remoteEntry.js",
		"shared_lib_ui": "http://localhost:8039/remoteEntry.js",
		"auth_ui": "http://localhost:8040/remoteEntry.js",
	},
	// **************************************************************
	

	"apiUrlsIntAzure": {
		"selAndIdb": "https://int-api.viamedis.net/roc-api/v1",
		"fluxSelAndIdb": "https://int-api.viamedis.net/roc-api/v1",
		"ps": "https://int-api.viamedis.net/ps-api/v1",
		"virements": "https://int-api.viamedis.net/paiement-api/v1",
		"paiements": "https://int-api.viamedis.net/paiement-api/v1",
		"referentiels": "https://int-api.viamedis.net/referentiel-api/v1",
		"factures": "https://int-api.viamedis.net/hospi-facturation-api/v1",
		"beneficiaire": "https://int-api.viamedis.net/droits-beneficiaire-api/v1",
		"fluxFactures": "https://int-api.viamedis.net/facturation-integration-api/v1",
		"intraitables": "https://int-api.viamedis.net/facturation-integration-api/v1",
		"configurations": "https://int-api.viamedis.net/aggregator-api/v1",
		"refs": "https://int-api.viamedis.net/aggregator-api/v1",
		"downloadFacture": "https://int-api.viamedis.net/aggregator-api/v1",
		"downloadSelAndIdb": "https://int-api.viamedis.net/aggregator-api/v1",
		"userMngmnt": "https://10.241.25.10:8044/api/auth/v1"
	},
	// **************************************************************
	
	
	// **************************************************************
	// *********************      apiUrls     ***********************
	// **************************************************************
	
	"apiUrls": {
		"rocSelAndIdb": "http://10.241.25.20:8001/api/v1",
		"ps": "http://10.241.25.20:8002/api/v1",
		"paiementsAndVirements": "http://10.241.25.20:8003/api/v1",
		"referentiels": "http://10.241.25.20:8004/api/v1",
		"hospiFactures": "http://10.241.25.20:8005/api/v1",
		"beneficiaire": "http://10.241.25.20:8007/api/v1",
		"factureAndIntraitablesIntegration": "http://10.241.25.20:8014/api/v1",
		"agregator": "http://10.241.25.20:8015/api/v1",
		"tpsFactures": "http://10.241.25.20:8017/api/v1",
		"tpAmcSelAndIdb": "http://10.241.25.20:8020/api/v1",
		"userMngmnt": "https://10.241.25.10:8044/api/auth/v1",
		
		// **********************************************************
		
	},
};

