const userInfoMock = [
    {
        url: "/mock/user/getUserInfo",
        method: "post",
        response: {
            state: "SUCCESS",
            message: "",
            data: {
                userName: "@first",
                userPwd: 123456,
                authorities: ["pageone"],
            },
        },
    },
];

export default userInfoMock;
