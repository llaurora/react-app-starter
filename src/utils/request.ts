import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosPromise } from "axios";
import { notification } from "antd";

export type RequestResponse<T = unknown> = Promise<AxiosPromise<T>>;

interface RequestConfig extends AxiosRequestConfig {
    prefix?: string;
}

type State = "SUCCESS" | "FAILED";

interface AxiosResponseData<T = unknown> {
    state: State;
    data: T;
    message?: string;
}

const STATE_SUCCESS = "SUCCESS";

const instance: AxiosInstance = axios.create({
    timeout: 30_000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
    },
});

instance.interceptors.request.use((config: RequestConfig) => {
    const { url, prefix, ...restConfig } = config;
    if (!navigator.onLine) {
        throw new Error("Please check network configuration");
    }
    return {
        ...restConfig,
        url: prefix ? `/${prefix}${url}` : url,
    };
});

instance.interceptors.response.use((response: AxiosResponse<AxiosResponseData>) => {
    const {
        data: { state, data, message },
    } = response;
    if (state === STATE_SUCCESS) {
        return data;
    }
    throw new Error(message);
});

export default async <T>(url: string, options?: RequestConfig): RequestResponse<T> => {
    try {
        const { method = "post", data, ...restOptions } = options;
        return await instance.request<T>({
            url,
            method,
            ...restOptions,
            ...(method === "get" ? { params: data } : { data }),
        });
    } catch (error) {
        notification.error({
            message: "Request Failure",
            description: error.message || "Oh! The system is out of business, we will restore it as soon as possible",
        });
        throw new Error(error);
    }
};
