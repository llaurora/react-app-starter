import request from "@/utils/request";

export function getUserInfo(data) {
    return request("/user/getUserInfo", { data, prefix: "mock" });
}
