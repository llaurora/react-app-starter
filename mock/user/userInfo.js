const Mock = require("mockjs");

module.exports = {
    'POST /user/getUserInfo': (req, res) => {
        res.json(
            Mock.mock({
                state: "SUCCESS",
                message: "",
                data: {
                    userName: "@first",
                    userPwd: 123456,
                    authorities: ["home", "pageone"],
                },
            }),
        );
    },
}
