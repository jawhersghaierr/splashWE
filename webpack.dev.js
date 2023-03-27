// const paths = require("./paths");
// const webpack = require("webpack");
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const deps = require('./package.json').dependencies;
// const env_IP = require('./env-vars').env_IP;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

const modules = require(`./public/modules`);

module.exports = {

    mode: "development",

    entry: './src/index',

    // devtool: 'source-map',

    optimization: {
        minimize: true,
    },

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

        new ModuleFederationPlugin({
            name: 'host',
            // library: { type: 'var', name: 'host' },
            filename: 'remoteEntry.js',
            // remotes: {
            //
            //     lib_ui: "lib_ui@http://localhost:3005/remoteEntry.js",
            //     shared_lib_ui: "shared_lib_ui@http://localhost:8051/remoteEntry.js",
            //
            //     ps_ui: "ps_ui@http://localhost:8034/remoteEntry.js",
            //     benef: "benef@http://localhost:8033/remoteEntry.js",
            //
            //     hospi_ui: `hospi_ui@http://localhost:8035/remoteEntry.js`,
            //     payment_ui: "payment_ui@http://localhost:8036/remoteEntry.js"
            //
            // },
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
        // new webpack.HotModuleReplacementPlugin(),
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
        console.log('remote : ', remote)
        _remotes[remote] = `promise new Promise(resolve => {
        
            console.log('**********************************************')
            console.log('window.${remote} >', window.${remote})
            console.log('**********************************************')
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
    console.log('_remotes: ', _remotes)

    return (_remotes)
}
