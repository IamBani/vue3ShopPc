import request, { RequestConfigOptions } from "../request";

/**
 * 分类 一级类目-PC
 * @param data
 * @param option axiso 参数
 * @returns
 */
export const getCategory = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/category",
    method: "get",
    data,
    ...option,
  });
};
