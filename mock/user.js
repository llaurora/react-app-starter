const Mock = require("mockjs");
const express = require("express");
const router = express.Router();

router.use("/getUserInfo", (req, res) => {
    setTimeout(() => {
        res.json(
            Mock.mock({
                state: "SUCCESS",
                result: null,
                data: {
                    userName: "@first",
                    userPwd: 123456,
                    authorities: ["home", "pageone"],
                },
            }),
        );
    }, 2000);
});

module.exports = router;
