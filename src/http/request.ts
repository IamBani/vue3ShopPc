import Request from './index'

import type { RequestConfig,RequestConfigExtraOptions } from './types'
export interface YWZRequestConfig<T=any> extends RequestConfig {
  data?: T
}
export interface RequestConfigOptions extends RequestConfigExtraOptions,Omit<YWZRequestConfig,'RequestConfigExtraOptions'>{
}
export interface YWZResponse<T=any> {
  code: number;
  msg: string;
  result: T;
}

export type CallbackFunction = <T = any>(
  data?: T,
  option?: YWZRequestConfig
) => Promise<YWZResponse>;

const requestInstance = new Request({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net/",
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log("实例请求拦截器");

      return config;
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      console.log("实例响应拦截器");
      return result;
    },
  },
});
const request = < D = any, T = any > (config: YWZRequestConfig<D>) => {
     const { method = "GET" } = config;
     if (method === "get" || method === "GET") {
       config.params = config.data;
     }
     return requestInstance.request<YWZResponse<T>>(config);
};
export default request
