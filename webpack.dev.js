const paths = require("./paths");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const modules = require(`./public/modules`);

const deps = require('./package.json').dependencies;

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
        // static: paths.build,
        open: true,
        compress: true,
        hot: true,
        port: 8031,
    },

    output: {
        publicPath: "auto",
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json'],
    },

    plugins: [
        // Only update what has changed on hot reload
        new ModuleFederationPlugin({
            name: 'host',
            // library: { type: 'var', name: 'host' },
            filename: 'remoteEntry.js',
            // remotes: {
            //     benef: `benef@http://localhost:8033/remoteEntry.js`,
            //     ps_ui: `ps_ui@http://localhost:8034/remoteEntry.js`,
            //     payment_ui: `payment_ui@http://localhost:8036/remoteEntry.js`,
            //     hospi_ui: `hospi_ui@http://localhost:8035/remoteEntry.js`,
            //     lib_ui: `lib_ui@http://localhost:3005/remoteEntry.js`,
            //     shared_lib_ui: `shared_lib_ui@http://localhost:8051/remoteEntry.js`,
            // },
            remotes: getRemotes(),
            shared: {
                ...deps,
                "react": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "17.0.2",
                },
                "react-dom": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "17.0.2",
                },
                "react-router-dom": {
                    singleton: true,
                    version: "5.3.4",
                },
                "redux": {
                    singleton: true,
                    version: "4.2.1",
                },
                "react-redux": {
                    singleton: true,
                    version: "7.2.9",
                },
                // "thunk": {
                //     singleton: true,
                //     version: "2.4.2"
                // },
                // "@reduxjs/toolkit": {
                //     singleton: true,
                //     strictVersion: true,
                //     version: "1.9.2",
                // },
                "react-final-form": {
                    singleton: true,
                    version: "6.5.9",
                },
                "dynamicMiddlewares": {
                    singleton: true,
                    version: "2.2.0"
                },

                // "@emotion/react": {
                //     singleton: true,
                //     version: "11.10.5"
                // },

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
                type: "asset/resource"
            },
            // {
            //     test: /\.svg/,
            //     type: 'asset/resource'
            // },
            {
                test: /\.json/,
                type: 'asset/resource',
                generator: {
                    filename: './conf/[name][ext]',
                },
            },
            // {
            //     test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            //     type: 'asset/inline',
            //     // test: /\.svg/,
            //     // type: 'asset/inline'
            // },

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

function getRemotes () {
    console.log('modules: ', modules)
    let _remotes = {}
    Object.keys(modules.remoteApps).forEach(remote => {
        _remotes[remote] = `promise new Promise(resolve => {
                     const script = document.createElement('script')
                     script.src = window._env_.remoteApps.${remote}
                     script.onload = () => {
                       const proxy = {
                         get: (request) => window.${remote}.get(request),
                         init: (arg) => {
                           try {
                             return window.${remote}.init(arg)
                           } catch(e) {
                             console.log('remote container already initialized')
                           }
                         }
                       }
                       resolve(proxy)
                     }
                     document.body.appendChild(script);
                   })`
    })

    return (_remotes)
}
