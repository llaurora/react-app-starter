import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { notification } from "antd";

interface RequestConfig extends AxiosRequestConfig {
    prefix?: string;
}

const debounceNotify = () => {
    let timer;
    return (error: Error) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            notification.error({
                message: "Request Failure",
                description:
                    error.message ?? "Oh! The system is out of business, we will restore it as soon as possible",
            });
        }, 1000);
    };
};

const errorNotify = debounceNotify();

const request = axios.create({
    timeout: 30000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
    },
});

request.interceptors.response.use((response: AxiosResponse) => {
    const {
        data: { state, data, result },
    } = response;
    if (state === "SUCCESS") {
        return data;
    }
    throw new Error(result);
});

export default (url: string, options?: RequestConfig) =>
    new Promise((resolve, reject) => {
        if (!navigator.onLine) {
            reject(new Error("Please check network configuration"));
        }
        resolve(null);
    })
        .then(() => {
            const { prefix, data, method = "post", ...restConfig } = options || {};
            const proxyUrl = prefix ? `/${prefix}${url}` : url;
            const foramtData = method === "get" ? { params: data } : { data };
            return request(proxyUrl, {
                ...foramtData,
                ...restConfig,
                method,
            });
        })
        .catch((error) => {
            errorNotify(error);
            throw new Error();
        });
