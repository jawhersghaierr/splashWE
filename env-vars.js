// window.remoteUrl = 'http://10.241.25.10:8032';
// window.libsUrl = 'http://10.241.25.10:8033';

module.exports = {
    // _this: {
    //     name: 'host',
    //     url: 'http://localhost',
    //     port: 3001,
    // },
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
        beneficiaire: 8007,
        configurations: 8015,
        factures: 8005,
        flux: 8014,
        paiements: 8003,
        selAndIdb: 8001,
        intraitables: 8014,
        ps: 8002,

    },
    env_dev: '10.241.25.10',
    env_int: '10.241.25.20',
    env_IP: '10.241.25.20',
}
