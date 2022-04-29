import request,{RequestConfigOptions} from "./request";
export const getHomeBrand = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/home/brand",
    method: "GET",
    data,
    ...option,
  });
};

export const getHomeBanner = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/home/banner",
    method: "GET",
    data,
    ...option,
  });
};

export const getHomeFresh = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/home/new",
    method: "GET",
    data,
    ...option,
  });
};

/**
 * 首页-人气推荐
 * @param data 
 * @param option axiso 参数
 * @returns 
 */
export const getHomeHot = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/home/hot",
    method: "GET",
    data,
    ...option,
  });
};




