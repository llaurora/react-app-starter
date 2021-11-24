import request from "@/utils/request";

export const getUserInfo = <T = API.UserInfo>(parameters: API.LoginParameters) => {
    return request<T>("/user/getUserInfo", { data: parameters, mock: true });
};

export const getUserInfo2 = <T = API.UserInfo>(parameters: API.LoginParameters) => {
    return request<T>("/user/getProxyUserInfo", { data: parameters });
};
