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
    env_dev: '10.241.25.10',
    env_int: '10.241.25.20',
    env_IP: '10.241.25.20',
}
