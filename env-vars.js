// window.remoteUrl = 'http://10.241.25.10:8032';
// window.libsUrl = 'http://10.241.25.10:8033';

module.exports = {
    // _this: {
    //     name: 'host',
    //     url: 'http://localhost',
    //     port: 3001,
    // },
    //download : http://10.241.25.10:8005/api/v1/factures?pageNumber=0&pageSize=20&status=BAP
    remotes: [
        {
            title: 'hospi_ui',
            fileName: 'remoteEntry.js',
            url: 'http://10.241.25.10',
            port: 8031,
        },
        {
            title: 'ps_ui',
            fileName: 'remotePsEntry.js',
            url: 'http://10.241.25.10',
            port: 8034,
        },
        // {
        //     title: 'libsUrl',
        //     fileName: 'libsUrl.js',
        //     url: 'http://10.241.25.10',
        //     port: 8033,
        // }
    ],
    // ports: {
    //     untreatable: 8031,
    //     configurations: 8015,
    //     download: 8015,
    //     flux: 8014,
    //     intraitables: 8014,
    //     beneficiaire: 8007,
    //     factures: 8005,
    //     paiements: 8003,
    //     ps: 8002,
    //     selAndIdb: 8001,
    // },
    apiUrls: {
        beneficiaire: 'http://10.241.25.10:8007/api/v1',
        configurations: 'http://10.241.25.10:8015/api/v1',
        factures: 'http://10.241.25.10:8005/api/v1',
        fluxFactures: 'http://10.241.25.10:8031/api/v1',
        downloadFacture: 'http://10.241.25.10:8015/api/v1',
        intraitables: 'http://10.241.25.10:8014/api/v1',
        paiements: 'http://10.241.25.10:8003/api/v1',
        ps: 'http://10.241.25.20:8002/api/v1',
        selAndIdb: 'http://10.241.25.10:8001/api/v1',
        fluxSelAndIdb: 'http://10.241.25.10:8001/api/v1',
        downloadSelAndIdb: 'http://10.241.25.10:8015/api/v1',
        virements: 'http://10.241.25.10:8003/api/v1',
        entities: 'http://10.241.25.10:8031/api/entities',
        refs: 'http://10.241.25.10:8015/api/v1',
        referentiels: 'http://10.241.25.10:8004/api/v1',
    },
    env_reset: '10.241.25.21',
    env_dev: '10.241.25.10',
    env_int: '10.241.25.20',
    env_IP: '10.241.25.10',
}
