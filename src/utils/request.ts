import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import axios from "axios";
import { notification } from "antd";
import { debounce } from "@/utils";

export type RequestResponse<T = any> = Promise<AxiosResponse<T>["data"]>;

interface RequestConfig extends AxiosRequestConfig {
    mock?: boolean;
}

type State = "SUCCESS" | "FAILED" | "ERROR" | "REDIRECT";

interface AxiosResponseResult<T = any> {
    state: State;
    data: T;
    message?: string;
    result?: string;
    code?: string | number;
}

type AxiosResponseData<T = any> = AxiosResponseResult<T>["data"];

const STATE_SUCCESS = "SUCCESS";
const STATE_ERROR = "ERROR";
const REDIRECT_ERROR = "REDIRECT";

const ERROR_CODES = {
    "ERR-00001": ["系统异常", "A000001"],
    "ERR-00504": ["系统异常", "A000001"],
    "ERR-00003": ["请求地址不合法", "A000002"],
    "ERR-00004": ["拒绝访问", "A000003"],
    "ERR-00400": ["请求超时", "A000004"],
    "ERR-00401": ["非法请求", "A000005"],
    "ERR-00404": ["请求服务不存在", "A000006"],
    "ERR-00500": ["服务不可用", "A000007"],
};

const notificationError = debounce((error: Error) => {
    const [type, code, message] = error.message?.split?.("|") || [];
    switch (type) {
        case "none": {
            break;
        }
        case "err": {
            notification.error({
                message: "出错了",
                description: `${ERROR_CODES[code]?.[0] ?? message}（错误码：${ERROR_CODES[code]?.[1] ?? code}）`,
            });
            break;
        }
        case "fail": {
            notification.warning({
                message: "失败了",
                description: `${ERROR_CODES[code]?.[0] ?? message}（错误码：${ERROR_CODES[code]?.[1] ?? code}）`,
            });
            break;
        }
        default: {
            notification.error({
                message: "操作失败",
                description: ERROR_CODES[code] ?? "啊哦！系统开小差了,我们会尽快恢复！",
            });
        }
    }
}, 1500);

const axiosRequest: AxiosInstance = axios.create({
    timeout: 30_000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axiosRequest.interceptors.request.use((config: RequestConfig) => {
    const { url, mock, ...restConfig } = config;
    if (!navigator.onLine) {
        throw new Error("Please check network configuration");
    }
    const enableMock = mock && process.env.NODE_ENV === "development";
    return {
        ...restConfig,
        url: /^(http|https)/.test(url) ? url : enableMock ? `/mock${url}` : url,
    };
});

axiosRequest.interceptors.response.use((response: AxiosResponse<AxiosResponseResult>) => {
    const {
        data: { state, data, result, code },
    } = response;
    if (state === STATE_SUCCESS) {
        return data;
    }
    if (state === STATE_ERROR) {
        throw new Error(`err|${code}|${result}`);
    }
    if (state === REDIRECT_ERROR) {
        throw new Error(`redirect|${code}|${data}`);
    }
    throw new Error(`fail|${code}|${result}`);
});

const request = async <T = any>(url: string, options?: RequestConfig): RequestResponse<AxiosResponseData<T>> => {
    try {
        const { method = "post", data, ...restOptions } = options;
        return await axiosRequest.request<T, RequestResponse<AxiosResponseData<T>>>({
            url,
            method,
            ...restOptions,
            ...(method === "get" ? { params: data } : { data }),
        });
    } catch (error) {
        console.log(error.message || "Oh! The system is out of business, we will restore it as soon as possible");
        notificationError(error);
        throw new Error(error);
    }
};

export default request;
