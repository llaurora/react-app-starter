const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");
const webpackConfig = require("./webpack.dev.config");
const compiler = webpack(webpackConfig);

const app = express();
const { PORT = 8080, MOCK_PORT = 3000, PROXY } = process.env;

app.use((req, res, next) => {
    if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
        req.url = "/"; // this would make express-js serve index.html
    }
    next();
});
app.use(
    createProxyMiddleware(["/mock"], {
        target: PROXY || `http://localhost:${MOCK_PORT}`,
        changeOrigin: true,
    }),
);
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }),
);
app.use(
    webpackHotMiddleware(compiler, {
        log: false,
    }),
);
app.listen(PORT, () => {
    console.log("\033[40;35mStarting the development server ...\033[0m");
});
