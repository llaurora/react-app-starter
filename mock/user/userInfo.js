const Mock = require("mockjs");

module.exports = {
    'POST /mock/user/getUserInfo': (req, res) => {
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
    },
}
