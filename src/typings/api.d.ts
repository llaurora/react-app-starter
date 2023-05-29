declare namespace API {
    type WithBoolean<T, U extends string, K = false> = K extends string
        ? {
              [P in K]: T;
          } & { [P in U]: boolean }
        : T & { [P in U]: boolean };

    type WithLoading<T, K = false> = WithBoolean<T, "loading", K>;

    type WithVisible<T, K = false> = WithBoolean<T, "visible", K>;

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
