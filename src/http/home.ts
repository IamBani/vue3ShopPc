import request, { YWZRequestConfig } from "./request";

export const getHomeBrand = <T = any>(data?: T, option?: YWZRequestConfig) => {
  return request({
    url: "/home/brand",
    method: "GET",
    data,
    ...option,
  });
};

export const getHomeBanner = <T = any>(data?: T, option?: YWZRequestConfig) => {
  return request({
    url: "/home/banner",
    method: "GET",
    data,
    ...option,
  });
};

export const getHomeFresh = <T = any>(data?: T, option?: YWZRequestConfig) => {
  return request({
    url: "/home/new",
    method: "GET",
    data,
    ...option,
  });
};


