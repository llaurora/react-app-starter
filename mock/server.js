const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
require("dotenv").config();

const PORT = process.env.MOCK_PORT || 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        // 此项必须在 bodyParser.json下面,为参数编码
        extended: true,
    }),
);

app.get("/", (req, res) => {
    res.send("Hello mockServer");
});

app.use("/mock", router);

router.use("/user", require("./user"));

app.listen(PORT);
