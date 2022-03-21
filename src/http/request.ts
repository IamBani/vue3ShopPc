import Request from './index'

import type { RequestConfig } from './types'
export interface YWZRequestConfig<T=any> extends RequestConfig {
  data?: T
}
interface YWZResponse<T> {
  statusCode: number
  desc: string
  result: T
}

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
