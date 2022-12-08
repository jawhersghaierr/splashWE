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
    ports: {
        untreatable: 8031,
        configurations: 8015,
        download: 8015,
        flux: 8014,
        intraitables: 8014,
        beneficiaire: 8007,
        factures: 8005,
        paiements: 8003,
        ps: 8002,
        selAndIdb: 8001,

    },
    env_reset: '10.241.25.21',
    env_dev: '10.241.25.10',
    env_int: '10.241.25.20',
    env_IP: '10.241.25.20',
}
