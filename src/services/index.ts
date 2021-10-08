import request from "@/utils/request";

export const getUserInfo = (parameters: API.LoginParameters) => {
    return request("/user/getUserInfo", { data: parameters, prefix: "mock" });
};

export const getUserInfo1 = (parameters: API.LoginParameters) => {
    return request("/user/getUserInfo", { data: parameters, prefix: "mock" });
};
