const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

const DEV_MODE = process.env.NODE_ENV === "development";
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
                    plugins: [DEV_MODE && require.resolve("react-refresh/babel")].filter(Boolean),
                },
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
                include: SRC_DIR,
                type: "asset",
                generator: {
                    filename: DEV_MODE ? "[name][ext]" : "images/[hash][ext][query]",
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
                    filename: DEV_MODE ? "[name][ext]" : "fonts/[hash][ext][query]",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: SRC_DIR,
                use: [
                    DEV_MODE
                        ? "style-loader"
                        : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: "../",
                            },
                        },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: DEV_MODE ? "[path][name]__[local]" : "[hash:base64]",
                            },
                        },
                    },
                    "postcss-loader",
                    "resolve-url-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(process.cwd(), "./index.html"),
            favicon: path.resolve(process.cwd(), "./favicon.ico"),
        }),
    ],
};
