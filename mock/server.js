const fs = require('fs');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

const PORT = process.env.MOCK_PORT || 3000;
const MOCK_DIR = path.join(process.cwd(), 'mock')

const readFileList = (dir, mocks) => {
    const gather = {}
    fs.readdirSync(dir, {withFileTypes: true}).forEach(dirent=> {
        const fullPath = path.join(dir, dirent.name);
        const isDirectory = dirent.isDirectory();
        Object.assign(gather, mocks || {}, isDirectory ? readFileList(fullPath, mocks): require(fullPath));
    })
    return gather;
}

const gatherMocks = readFileList(MOCK_DIR);

for (let key in gatherMocks) {
    const [method, url] = key.split(" ")
    app[method.toLowerCase()](url, gatherMocks[key])
}

app.get("/", (req, res) => {
    res.send("Hello mockServer");
});

app.listen(PORT);
