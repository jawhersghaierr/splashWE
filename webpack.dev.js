const paths = require("./paths");

const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
const env_IP = require('./env-vars').env_IP;

module.exports = {
    // Set the mode to development or production
    mode: "development",

    entry: './src/index',

    // Control how source maps are generated
    devtool: 'source-map',

    optimization: {
        minimize: false,
    },

    // Spin up a server for quick development
    devServer: {
        historyApiFallback: true,
        static: paths.build,
        open: true,
        compress: true,
        hot: true,
        port: 8031,
        historyApiFallback: {
            disableDotRule: true
        },
    },

    output: {
        publicPath: 'http://localhost:8031/',
    },
    // output: {
    //     publicPath: 'auto',
    // },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
    },

    plugins: [
        // Only update what has changed on hot reload
        new ModuleFederationPlugin({
            name: 'host',
            library: { type: 'var', name: 'host' },
            filename: 'remoteEntry.js',
            remotes: {
                hospi_ui: `hospi_ui@http://${env_IP}:8031/remoteEntry.js`,
                ps_ui: `ps_ui@http://${env_IP}:8034/remotePsEntry.js`,
                env: 'http://localhost:8080/api/vars',
                // env: new Promise(resolve => {
                //
                //           const remoteUrlVars = 'http://localhost:8080/api/vars'
                //           const script = document.createElement('script')
                //           script.src = remoteUrlVars
                //           script.onload = () => {
                //             // the injected script has loaded and is available on window
                //             // we can now resolve this Promise
                //             console.log('#####################################################################')
                //             console.log('script')
                //             console.log('#####################################################################')
                //             // const proxy = {
                //             //   get: (request) => window.env.get(request),
                //             //   init: (arg) => {
                //             //     try {
                //             //       return window.env
                //             //     } catch(e) {
                //             //       console.log('remote container already initialized')
                //             //     }
                //             //   }
                //             // }
                //             resolve(script)
                //           }
                //           // inject this script with the src set to the versioned remoteEntry.js
                //           document.head.appendChild(script);
                //         }),
                // app1: `promise new Promise(resolve => {
                //           const urlParams = new URLSearchParams(window.location.search)
                //           const version = urlParams.get('app1VersionParam')
                //
                //           // This part depends on how you plan on hosting and versioning your federated modules
                //
                //           const remoteUrlWithVersion = 'http://localhost:3001/' + version + '/remoteEntry.js'
                //           const script = document.createElement('script')
                //           script.src = remoteUrlWithVersion
                //           script.onload = () => {
                //             // the injected script has loaded and is available on window
                //             // we can now resolve this Promise
                //             const proxy = {
                //               get: (request) => window.app1.get(request),
                //               init: (arg) => {
                //                 try {
                //                   return window.app1.init(arg)
                //                 } catch(e) {
                //                   console.log('remote container already initialized')
                //                 }
                //               }
                //             }
                //             resolve(proxy)
                //           }
                //           // inject this script with the src set to the versioned remoteEntry.js
                //           document.head.appendChild(script);
                //         })
                //         `,
            },
            shared: {
                ...deps,
                'react': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '17.0.2'
                },
                'react-dom': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '17.0.2'
                },
                '@mui/material': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '5.5.2'
                },
                // '@viamedis-boilerPlate/shared-library': {
                //     import: '@viamedis-boilerPlate/shared-library',
                //     requiredVersion: require('../shared-library/package.json').version,
                // },
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    module: {
        rules: [

            {
                test: /\.js|jsx/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [
                        ["@babel/preset-env"],
                        ['@babel/preset-react']
                    ],
                    plugins: [
                        ["@babel/plugin-transform-runtime"],
                    ]
                },
            },

            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { sourceMap: true, importLoaders: 1 },
                    },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/inline',
                // test: /\.svg/,
                // type: 'asset/inline'
            },

            // Images: Copy image files to build folder
            // {
            //     test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            //     type: "asset",
            //     loader: 'url-loader?limit=100000'
            // },
            // Fonts and SVGs: Inline files
            // { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
        ],
    },
};
