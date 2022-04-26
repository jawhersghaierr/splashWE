const paths = require("./paths");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = merge(common, {
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
        port: 3001,
    },

    output: {
        publicPath: 'http://10.241.25.10:8031:3001/',
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
                roc: 'roc@http://10.241.25.10:8031:3002/remoteEntry.js',
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
                '@viamedis-boilerPlate/shared-library': {
                    import: '@viamedis-boilerPlate/shared-library',
                    requiredVersion: require('../shared-library/package.json').version,
                },
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
});
