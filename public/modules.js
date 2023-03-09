module.exports = {
	"remoteApps": {
		// "lib_ui": "http://localhost:3005/remoteEntry.js",
		"lib_ui": "http://10.241.25.10:8038/remoteEntry.js",
		// "shared_lib_ui": "http://localhost:8051/remoteEntry.js",
		"shared_lib_ui": "http://10.241.25.10:8039/remoteEntry.js",
		"ps_ui": "http://10.241.25.10:8034/remoteEntry.js",
		"benef": "http://localhost:8033/remoteEntry.js",
		"hospi_ui": "http://localhost:8035/remoteEntry.js",
		"payment_ui": "http://localhost:8036/remoteEntry.js"
	},
	"apiUrls": {
		"beneficiaire": "http://10.241.25.20:8007/api/v1",
		"configurations": "http://10.241.25.20:8015/api/v1",
		"downloadFacture": "http://10.241.25.20:8015/api/v1",
		"downloadSelAndIdb": "http://10.241.25.20:8015/api/v1",
		"entities": "http://10.241.25.20:8031/api/entities",
		"factures": "http://10.241.25.20:8005/api/v1",
		"fluxFactures": "http://10.241.25.20:8031/api/v1",
		"intraitables": "http://10.241.25.20:8014/api/v1",
		"paiements": "http://10.241.25.20:8003/api/v1",
		"ps": "http://10.241.25.20:8002/api/v1",
		"selAndIdb": "http://10.241.25.20:8001/api/v1",
		"fluxSelAndIdb": "http://10.241.25.20:8001/api/v1",
		"virements": "http://10.241.25.20:8003/api/v1",
		"refs": "http://10.241.25.20:8015/api/v1",
		"referentiels": "http://10.241.25.20:8004/api/v1"
	}
};
