declare namespace API {
    type UserInfo = {
        authorities: string[];
        userName: string;
        userPwd: string;
    };

    type LoginParameters = {
        username: string;
        password: string;
    };
}
