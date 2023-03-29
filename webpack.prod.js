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
    mode: "production",

    entry: './src/index',

    // Control how source maps are generated
    // devtool: 'source-map',

    optimization: {
        minimize: true,
    },

    // output: {
    //     path: paths.build,
    // },
    output: {
        publicPath: 'auto',
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
    },

    plugins: [
        // new CleanWebpackPlugin(),
        // Only update what has changed on hot reload
        new ModuleFederationPlugin({
            name: 'host',
            filename: 'remoteEntry.js',
            remotes: getRemotes(),
            shared: {
                "react": {
                    eager: true,
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "17.0.2",
                },
                "react-dom": {
                    eager: true,
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "17.0.2",
                },
                "react-router-dom": {
                    eager: true,
                    singleton: true,
                    version: "5.3.4",
                },
                "redux": {
                    eager: true,
                    singleton: true,
                    version: "4.2.1",
                },
                "react-redux": {
                    eager: true,
                    singleton: true,
                    version: "7.2.9",
                },
                "react-final-form": {
                    eager: true,
                    singleton: true,
                    version: "6.5.9",
                },
                "dynamicMiddlewares": {
                    eager: true,
                    singleton: true,
                    version: "2.2.0"
                },
            },
        }),

        // new WebpackShellPluginNext(
        //     {
        //
        //         onBuildStart: {
        //             scripts: ['echo "Webpack Start"'],
        //             blocking: true,
        //             parallel: false
        //         },
        //         onBuildExit: {
        //             scripts: ['node configure-script'],
        //             blocking: true,
        //             parallel: false
        //         }
        // }),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            assets: './public/assets',
            publicPath: '/'
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

    let _remotes = {}
    Object.keys(modules.remoteApps).forEach(remote => {

        _remotes[remote] = `promise new Promise(resolve => {
        
            if (window.${remote} == undefined) {
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
                if (!script.src.includes('undefined')) document.body.appendChild(script);
            } else resolve('')
        })`
    })

    return (_remotes)
}
