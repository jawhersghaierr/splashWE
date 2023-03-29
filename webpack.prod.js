const paths = require("./paths");

const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
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
            remotes: getRemotes(),
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

            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.json/,
                type: 'asset/resource',
                generator: {
                    filename: './conf/[name][ext]',
                },
            },

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
