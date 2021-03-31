const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");
const webpackConfig = require("./webpack.dev.config");
const compiler = webpack(webpackConfig);
const app = express();

const { PORT = 8080, PROXY, MOCK } = process.env;

const readFileList = (dir, mocks) => {
    const gather = {};
    fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
        const fullPath = path.join(dir, dirent.name);
        const isDirectory = dirent.isDirectory();
        Object.assign(gather, mocks || {}, isDirectory ? readFileList(fullPath, mocks) : require(fullPath));
    });
    return gather;
};

const registerMocks = () => {
    const router = express.Router();
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    const MOCK_DIR = path.join(process.cwd(), "mock");
    const gatherMocks = readFileList(MOCK_DIR);
    Object.entries(gatherMocks).forEach(([key, func]) => {
        const [method, url] = key.split(" ");
        router[method.toLowerCase()](url, func);
    });
    return router;
};

if (MOCK !== "none") {
    app.use("/mock", registerMocks());
}

if (PROXY) {
    app.use(
        createProxyMiddleware(["/api"], {
            target: PROXY,
            changeOrigin: true,
        }),
    );
}

app.use((req, res, next) => {
    if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
        req.url = "/"; // this would make express-js serve index.html
    }
    next();
});

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
