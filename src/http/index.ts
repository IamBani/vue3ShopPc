import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from 'axios'

import type { RequestConfig, RequestInterceptors } from './types'
import { RequestConfigOptions } from './request'
const RequestAllOptions: RequestConfigOptions = {
  request_cancel: true,
}
class Request {
  // axios 实例
  instance: AxiosInstance
  interceptorsObj?: RequestInterceptors
  private map: Map<string, Canceler>
  RequestConfigExtraOptions?: RequestConfigOptions
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptorsObj = config.interceptors
    this.RequestConfigExtraOptions = {
      ...RequestAllOptions,
      ...config.RequestConfigExtraOptions,
    }
    this.map = new Map<string, Canceler>()
    this.interceptors()
  }
  interceptors(): void {
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('全局请求拦截器',res)
        return res
      },
      (err: any) => err
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        console.log('全局响应拦截器')
        return res.data
      },
      (err: any) => err
    )
  }
  request<T>(config: RequestConfigOptions): Promise<T> {
    if (
      config.request_cancel ||
      this.RequestConfigExtraOptions?.request_cancel
    ) {
      this.removePending(config)
      const key =this.addPending(config)
      config.cancelToken =  config.cancelToken || new axios.CancelToken((cancel) => {
        if (!this.map.has(key)) {
          this.map.set(key, cancel);
        }
      })
    }
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          let results = res
          if (config.interceptors?.responseInterceptors) {
            /* eslint-disable @typescript-eslint/no-unused-vars */
            results = config.interceptors.responseInterceptors<T>(res)
          }

          resolve(results)
        })
        .catch((err: any) => {
          reject(err)
        }).finally(() => {
          if (
            config.request_cancel ||
            this.RequestConfigExtraOptions?.request_cancel
          ) {
            this.del(config);
          }
        })
    })
  }
  private addPending(config: RequestConfigOptions):string {
    const pendingKey = this.getPendingKey(config);
    return pendingKey
  }
  private getPendingKey(config:RequestConfigOptions):string {
    const {
      url, method, params,
    } = config;
    let { data } = config;
    try {
      if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
    // eslint-disable-next-line no-empty
    } catch (error) {
    }
    return [url, method, params?JSON.stringify(params):'', JSON.stringify(data)].join('&');
  }
  private del(config: RequestConfigOptions) {
    const key = this.getPendingKey(config);
    if (this.map.has(key)) {
      const cancel = this.map.get(key) as Canceler
      cancel()
    }
  }
  private removePending(config:RequestConfigOptions) {
    const key = this.getPendingKey(config);
    if (this.map.has(key)) {
      const cancelToken = this.map.get(key) as Canceler;
      cancelToken(key);
      this.map.delete(key);
    }
  }
  delAll() {
    Array.from(this.map.values()).forEach(cancel=>cancel())
  }
}

export default Request
