const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

const devMode = process.env.NODE_ENV === "development";
const ROOT_DIR = path.resolve(__dirname, "..");
const resolve = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolve("src");

module.exports = {
    target: "browserslist",
    context: ROOT_DIR,
    cache: {
        type: "filesystem",
        buildDependencies: {
            config: [__filename],
        },
    },
    resolve: {
        modules: [SRC_DIR, resolve("node_modules")],
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@": resolve("src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                loader: "babel-loader",
                include: SRC_DIR,
                options: {
                    plugins: [devMode && require.resolve("react-refresh/babel")].filter(Boolean),
                },
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
                include: SRC_DIR,
                type: "asset",
                generator: {
                    filename: devMode ? "[name][ext]" : "images/[hash][ext][query]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 8kb
                    },
                },
            },
            {
                test: /\.(eot|woff|ttf|woff2|appcache)(\?|$)/,
                include: SRC_DIR,
                type: "asset/resource",
                generator: {
                    filename: devMode ? "[name][ext]" : "fonts/[hash][ext][query]",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: SRC_DIR,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: devMode ? "[path][name]__[local]" : "[hash:base64]",
                            },
                        },
                    },
                    // "postcss-loader",
                    "resolve-url-loader",
                    "sass-loader",
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: [
                                resolve("src/assets/styles/variables.scss"),
                                resolve("src/assets/styles/mixins.scss"),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                include: /[\\/]node_modules[\\/].*antd/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    "@border-radius-base": "4px",
                                    "@text-color": "rgba(0, 0, 0, 0.65)",
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react-redux-app",
            filename: "index.html",
            template: path.resolve(process.cwd(), "./public/indexModal.html"), // 模板文件路径
            inject: true,
        }),
    ],
};
