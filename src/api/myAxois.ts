import axios, {AxiosRequestConfig} from "axios";
import {baseURL} from "./globalConst";


const myAxios = axios.create({baseURL});
myAxios.interceptors.response.use(
    response => {
        // 解包
        return response?.data || {}
    },
    (error = {}) => {
        const {response = {}} = error || {};

        return Promise.reject(response?.data || {});
    }
)

export function request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
    return myAxios(config) as unknown as Promise<R>;
}