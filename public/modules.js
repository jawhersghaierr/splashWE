module.exports = {
	
	
	"remoteAppsLocal": {
		"lib_ui": "http://localhost:8038/remoteEntry.js",
		"shared_lib_ui": "http://localhost:8039/remoteEntry.js",
		"tps_ui": "http://localhost:8031/remoteEntry.js",
		"ps_ui": "http://localhost:8034/remoteEntry.js",
		"benef_ui": "http://localhost:8035/remoteEntry.js",
		"tps_ui": "http://localhost:8031/remoteEntry.js",
		"hospi_ui": "http://localhost:8032/remoteEntry.js",
		"intraitables_ui": "http://localhost:8037/remoteEntry.js",
		"payment_ui": "http://localhost:8033/remoteEntry.js",
		"indu_ui": "http://localhost:8036/remoteEntry.js"
	},
	"remoteAppsDev": {
		"lib_ui": "https://10.241.25.10:8038/remoteEntry.js",
		"shared_lib_ui": "https://10.241.25.10:8039/remoteEntry.js",
		"tps_ui": "http://10.241.25.10:8031/remoteEntry.js",
		"hospi_ui": "https://10.241.25.10:8032/remoteEntry.js",
		"intraitables_ui": "https://10.241.25.10:8037/remoteEntry.js",
		"payment_ui": "https://10.241.25.10:8033/remoteEntry.js",
		"ps_ui": "https://10.241.25.10:8034/remoteEntry.js",
		"benef_ui": "https://10.241.25.10:8035/remoteEntry.js",
		"indu_ui": "https://10.241.25.10:8036/remoteEntry.js"
	},
	"remoteAppsInt": {
		"lib_ui": "http://10.241.25.20:8038/remoteEntry.js",
		"shared_lib_ui": "http://10.241.25.20:8039/remoteEntry.js",
		"tps_ui": "http://10.241.25.20:8031/remoteEntry.js",
		"hospi_ui": "http://10.241.25.20:8032/remoteEntry.js",
		"intraitables_ui": "http://10.241.25.20:8037/remoteEntry.js",
		"payment_ui": "http://10.241.25.20:8033/remoteEntry.js",
		"ps_ui": "http://10.241.25.20:8034/remoteEntry.js",
		"benef_ui": "http://10.241.25.20:8035/remoteEntry.js",
		"indu_ui": "http://10.241.25.20:8036/remoteEntry.js"
	},
	"remoteAppsRec": {
		"lib_ui": "http://10.241.25.21:8038/remoteEntry.js",
		"shared_lib_ui": "http://10.241.25.21:8039/remoteEntry.js",
		"tps_ui": "http://10.241.25.21:8031/remoteEntry.js",
		"hospi_ui": "http://10.241.25.21:8032/remoteEntry.js",
		"intraitables_ui": "http://10.241.25.21:8037/remoteEntry.js",
		"payment_ui": "http://10.241.25.21:8033/remoteEntry.js",
		"ps_ui": "http://10.241.25.21:8034/remoteEntry.js",
		"benef_ui": "http://10.241.25.21:8035/remoteEntry.js",
		"indu_ui": "http://10.241.25.21:8036/remoteEntry.js"
	},
	
	// **************************************************************
	// *********************   remoteApps     ***********************
	// **************************************************************
	"remoteApps": {
		"shared_lib_ui": "http://localhost:8039/remoteEntry.js",
		"lib_ui": "http://localhost:8038/remoteEntry.js",
		"tps_ui": "http://localhost:8031/remoteEntry.js",
		"hospi_ui": "http://localhost:8032/remoteEntry.js",
		"payment_ui": "http://localhost:8033/remoteEntry.js",
		"ps_ui": "http://localhost:8034/remoteEntry.js",
		"benef_ui": "http://localhost:8035/remoteEntry.js",
		"indu_ui": "http://localhost:8036/remoteEntry.js",
		"intraitables_ui": "http://localhost:8037/remoteEntry.js",
	},
	// **************************************************************
	
	"apiUrlsLocal": {
		"beneficiaire": "http://localhost:8007/api/v1",
		"configurations": "http://localhost:8015/api/v1",
		"downloadFacture": "http://localhost:8015/api/v1",
		"downloadSelAndIdb": "http://localhost:8015/api/v1",
		"entities": "http://localhost:8031/api/entities",
		"factures": "http://localhost:8005/api/v1/",
		"fluxFactures": "http://localhost:8014/api/v1",
		"intraitables": "http://localhost:8014/api/v1",
		"paiements": "http://localhost:8003/api/v1",
		"ps": "http://localhost:8002/api/v1",
		"selAndIdb": "http://localhost:8001/api/v1",
		"fluxSelAndIdb": "http://localhost:8001/api/v1",
		"virements": "http://localhost:8003/api/v1",
		"refs": "http://localhost:8015/api/v1",
		"referentiels": "http://localhost:8004/api/v1.1"
	},
	"apiUrlsDev": {
		"selAndIdb": "http://10.241.25.10:8001/api/v1",
		"fluxSelAndIdb": "http://10.241.25.10:8001/api/v1",
		"ps": "http://10.241.25.10:8002/api/v1",
		// "entities": "http://10.241.25.10:8031/api/entities",
		"virements": "http://10.241.25.10:8003/api/v1",
		"paiements": "http://10.241.25.10:8003/api/v1",
		"referentiels": "http://10.241.25.10:8004/api/v1",
		"factures": "http://10.241.25.10:8005/api/v1/",
		"beneficiaire": "http://10.241.25.10:8007/api/v1",
		"fluxFactures": "http://10.241.25.10:8014/api/v1",
		"intraitables": "http://10.241.25.10:8014/api/v1",
		"configurations": "http://10.241.25.10:8015/api/v1",
		"refs": "http://10.241.25.10:8015/api/v1",
		"downloadFacture": "http://10.241.25.10:8015/api/v1",
		"downloadSelAndIdb": "http://10.241.25.10:8015/api/v1"
	},
	"apiUrlsInt": {
		"beneficiaire": "http://10.241.25.20:8007/api/v1",
		"configurations": "http://10.241.25.20:8015/api/v1",
		"downloadFacture": "http://10.241.25.20:8015/api/v1",
		"downloadSelAndIdb": "http://10.241.25.20:8015/api/v1",
		"entities": "http://10.241.25.20:8031/api/entities",
		"factures": "http://10.241.25.20:8005/api/v1/",
		"fluxFactures": "http://10.241.25.20:8014/api/v1",
		"intraitables": "http://10.241.25.20:8014/api/v1",
		"paiements": "http://10.241.25.20:8003/api/v1",
		"ps": "http://10.241.25.20:8002/api/v1",
		"selAndIdb": "http://10.241.25.20:8001/api/v1",
		"fluxSelAndIdb": "http://10.241.25.20:8001/api/v1",
		"virements": "http://10.241.25.20:8003/api/v1",
		"refs": "http://10.241.25.20:8015/api/v1",
		"referentiels": "http://10.241.25.20:8004/api/v1"
	},
	"apiUrlsRec": {
		"beneficiaire": "http://10.241.25.21:8007/api/v1",
		"configurations": "http://10.241.25.21:8015/api/v1",
		"downloadFacture": "http://10.241.25.21:8015/api/v1",
		"downloadSelAndIdb": "http://10.241.25.21:8015/api/v1",
		"entities": "http://10.241.25.21:8031/api/entities",
		"factures": "http://10.241.25.21:8005/api/v1/",
		"fluxFactures": "http://10.241.25.21:8014/api/v1",
		"intraitables": "http://10.241.25.21:8014/api/v1",
		"paiements": "http://10.241.25.21:8003/api/v1",
		"ps": "http://10.241.25.21:8002/api/v1",
		"selAndIdb": "http://10.241.25.21:8001/api/v1",
		"fluxSelAndIdb": "http://10.241.25.21:8001/api/v1",
		"virements": "http://10.241.25.21:8003/api/v1",
		"refs": "http://10.241.25.21:8015/api/v1",
		"referentiels": "http://10.241.25.21:8004/api/v1"
	},

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
		
		// **********************************************************
		
	},
};
