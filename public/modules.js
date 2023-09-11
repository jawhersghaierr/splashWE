module.exports = {
	
	"msalConfig": {
		"auth": {
			clientId: "cb80b654-41fb-43dd-bb34-c802089d0d12",
			authority: "https://integrationviamedisb2c.b2clogin.com/integrationviamedisb2c.onmicrosoft.com/B2C_1_si_email",
			knownAuthorities: ["integrationviamedisb2c.b2clogin.com"],
			redirectUri: "http://localhost:8030/factures",
			postLogoutRedirectUri: "http://localhost:8030"
		}
	},
	"loginRequest": {
		"scopes": ["https://integrationviamedisb2c.onmicrosoft.com/f9b81c03-1384-45d9-a8c3-14fc54959a41/hospi_facturation_api.access"]
	},
	"apiUrl": "http://localhost:8030",
	"feUrl": "http://localhost:8030",
	
	
	
	"remoteAppsLocal": {
		"lib_ui": "http://localhost:8038/remoteEntry.js",
		"shared_lib_ui": "http://localhost:8039/remoteEntry.js",
		"ps_ui": "http://localhost:8034/remoteEntry.js",
		"benef_ui": "http://localhost:8035/remoteEntry.js",
		"hospi_ui": "http://localhost:8032/remoteEntry.js",
		"payment_ui": "http://localhost:8033/remoteEntry.js"
	},
	"remoteAppsDev": {
		"lib_ui": "http://10.241.25.10:8038/remoteEntry.js",
		"shared_lib_ui": "http://10.241.25.10:8039/remoteEntry.js",
		"hospi_ui": "http://10.241.25.10:8032/remoteEntry.js",
		"payment_ui": "http://10.241.25.10:8033/remoteEntry.js",
		"ps_ui": "http://10.241.25.10:8034/remoteEntry.js",
		"benef_ui": "http://10.241.25.10:8035/remoteEntry.js"
	},
	"remoteAppsInt": {
		"lib_ui": "http://10.241.25.20:8038/remoteEntry.js",
		"shared_lib_ui": "http://10.241.25.20:8039/remoteEntry.js",
		"hospi_ui": "http://10.241.25.20:8032/remoteEntry.js",
		"payment_ui": "http://10.241.25.20:8033/remoteEntry.js",
		"ps_ui": "http://10.241.25.20:8034/remoteEntry.js",
		"benef_ui": "http://10.241.25.20:8035/remoteEntry.js"
	},
	"remoteAppsRec": {
		"lib_ui": "http://10.241.25.21:8038/remoteEntry.js",
		"shared_lib_ui": "http://10.241.25.21:8039/remoteEntry.js",
		"hospi_ui": "http://10.241.25.21:8032/remoteEntry.js",
		"payment_ui": "http://10.241.25.21:8033/remoteEntry.js",
		"ps_ui": "http://10.241.25.21:8034/remoteEntry.js",
		"benef_ui": "http://10.241.25.21:8035/remoteEntry.js"
	},

	"remoteApps": {
		"lib_ui": "http://10.241.25.20:8038/remoteEntry.js",
		"shared_lib_ui": "http://10.241.25.20:8039/remoteEntry.js",
		"hospi_ui": "http://10.241.25.20:8032/remoteEntry.js",
		"payment_ui": "http://10.241.25.20:8033/remoteEntry.js",
		"ps_ui": "http://10.241.25.20:8034/remoteEntry.js",
		"benef_ui": "http://10.241.25.20:8035/remoteEntry.js"
	},

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
		"beneficiaire": "http://10.241.25.10:8007/api/v1",
		"configurations": "http://10.241.25.10:8015/api/v1",
		"downloadFacture": "http://10.241.25.10:8015/api/v1",
		"downloadSelAndIdb": "http://10.241.25.10:8015/api/v1",
		"entities": "http://10.241.25.10:8031/api/entities",
		"factures": "http://10.241.25.10:8005/api/v1/",
		"fluxFactures": "http://10.241.25.10:8014/api/v1",
		"intraitables": "http://10.241.25.10:8014/api/v1",
		"paiements": "http://10.241.25.10:8003/api/v1",
		"ps": "http://10.241.25.10:8002/api/v1",
		"selAndIdb": "http://10.241.25.10:8001/api/v1",
		"fluxSelAndIdb": "http://10.241.25.10:8001/api/v1",
		"virements": "http://10.241.25.10:8003/api/v1",
		"refs": "http://10.241.25.10:8015/api/v1",
		"referentiels": "http://10.241.25.10:8004/api/v1"
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

	"apiUrls": {
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
};
