import request, { RequestResponse } from "@/utils/request";

export const getUserInfo = <T = API.UserInfo>(parameters: API.LoginParameters): RequestResponse<T> => {
    return request<T>("/user/getUserInfo", { data: parameters, prefix: "mock" });
};

export const getUserInfo2 = <T = API.UserInfo>(parameters: API.LoginParameters): RequestResponse<T> => {
    return request<T>("/user/getUserInfo", { data: parameters, prefix: "mock" });
};
