const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const modules = require("./public/modules");
const { dependencies } = require("@viamedis/viamedis-config/package.json");

module.exports = {
    entry: "./src/index",
    cache: false,

    optimization: {
        minimize: true,
    },
    mode: "production",
    // devtool: "source-map",

    output: {
        publicPath: "auto",
    },

    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "host_ui",
            filename: "remoteEntry.js",
            remotes: getRemotes(),

            shared: {
                react: {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: dependencies["react-dom"],
                },

                "react-router-dom": {
                    requiredVersion: dependencies["react-dom-dom"],
                    singleton: true,
                },
                redux: {
                    requiredVersion: dependencies["redux"],
                    singleton: true,
                },
                "react-redux": {
                    requiredVersion: dependencies["react-redux"],
                    singleton: true,
                },
                "react-final-form": {
                    requiredVersion: dependencies["react-final-form"],
                    singleton: true,
                },

                "@mui/material": {
                    requiredVersion: dependencies["@mui/material"],
                    singleton: true,
                },
                "@mui/system": {
                    singleton: true,
                    requiredVersion: dependencies["@mui/system"],
                },
                "@mui/icons-material": {
                    requiredVersion: dependencies["@mui/icons-material"],
                    singleton: true,
                },
                "@emotion/react": {
                    requiredVersion: dependencies["@emotion/react"],
                    singleton: true,
                },
                "@mui/x-date-pickers": {
                    requiredVersion: dependencies["@mui/x-date-pickers"],
                    singleton: true,
                },
                "react-cookie": {
                    requiredVersion: dependencies["react-cookie"],
                    singleton: true,
                },
                "react-idle-timer": {
                    requiredVersion: dependencies["react-idle-timer"],
                    singleton: true,
                },

                "@azure/msal-react": {
                    requiredVersion: dependencies["@azure/msal-react"],
                    singleton: true,
                },
                "@azure/msal-browser": {
                    requiredVersion: dependencies["@azure/msal-browser"],
                    singleton: true,
                },

                "lz-string": {
                    requiredVersion: dependencies["lz-string"],
                    singleton: true,
                },

                "notistack": {
                    requiredVersion: dependencies["notistack"],
                    singleton: true,
                },
            },
        }),

        new HtmlWebpackPlugin({
            template: "./public/index.html",
            assets: "./public/assets",
            publicPath: "/",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
                options: {
                    presets: [["@babel/preset-env"], ["@babel/preset-react"]],
                    plugins: [["@babel/plugin-transform-runtime"]],
                },
            },

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
                type: "asset/resource",
            },
            {
                test: /\.json/,
                type: "asset/resource",
                generator: {
                    filename: "./conf/[name][ext]",
                },
            },
        ],
    },
};

function getRemotes() {
    let _remotes = {};
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
        })`;
    });

    return _remotes;
}
