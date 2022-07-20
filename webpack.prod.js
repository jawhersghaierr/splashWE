const paths = require("./paths");

const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
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

    output: {
        path: paths.build,
    },
    // output: {
    //     publicPath: 'auto',
    // },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
    },

    plugins: [
        new CleanWebpackPlugin(),
        // Only update what has changed on hot reload
        new ModuleFederationPlugin({
            name: 'host',
            library: { type: 'var', name: 'host' },
            filename: 'remoteEntry.js',
            remotes: {
                hospi_ui: `hospi_ui@http://${env_IP}:8031/remoteEntry.js`,
                ps_ui: `ps_ui@http://${env_IP}:8034/remotePsEntry.js`,
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
        new WebpackShellPluginNext(
            {

                onBuildStart: {
                    scripts: ['echo "Webpack Start"'],
                    blocking: true,
                    parallel: false
                },
                onBuildExit: {
                    scripts: ['node configure-script'],
                    blocking: true,
                    parallel: false
                }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: paths.public + "/index.html", // template file
            filename: "index.html", // output file
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

            // Images: Copy image files to build folder
            // { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

            // Fonts and SVGs: Inline files
            // { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
        ],
    },
};
