const paths = require("./paths");

const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
// const env_IP = require('./env-vars').env_IP;

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
        historyApiFallback: {
            disableDotRule: true
        },
        // static: paths.build,
        open: true,
        compress: true,
        hot: true,
        port: 8031,
        historyApiFallback: {
            disableDotRule: true
        },
    },

    // output: {
    //     publicPath: 'http://localhost:8031/',
    // },
    output: {
        publicPath: 'auto',
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
    },

    plugins: [
        // Only update what has changed on hot reload
        new ModuleFederationPlugin({
            name: 'host',
            // library: { type: 'var', name: 'host' },
            // filename: 'remoteEntry.js',
            remotes: {
                // lib_ui: `lib_ui@http://${env_IP}:8038/remoteEntry.js`,
                // lib_ui: `lib_ui@${getRemoteEntryUrl(3005)}`,
                // shared_lib_ui: `shared_lib_ui@${getRemoteEntryUrl(8051)}`,
            },
            // remotes: {
                // hospi_ui: `hospi_ui@http://${env_IP}:8031/remoteEntry.js`,
                // ps_ui: `ps_ui@http://http://${env_IP}:8034/remotePsEntry.js`,
            // },
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
            publicPath: "/"
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



function getRemoteEntryUrl(port) {
    const { HOST } = process.env;

    if (!HOST) {
        return `//localhost:${port}/remoteEntry.js`;
    }

    return `//${HOST}/remoteEntry.js`;
}
