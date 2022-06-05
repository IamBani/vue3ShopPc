import request, { RequestConfigOptions } from "../request";

/**
 *二级类目-筛选条件-PC
 * @param { Number } id 二级分类ID
 * @returns Promise
 */
export const findSubFilter = <T = any>(
  data?: T,
  option?: RequestConfigOptions
) => {
  return request({
    url: "/category/sub/filter",
    method: "get",
    data,
    ...option,
  });
};



/**
 * 获取分类下的商品（带筛选条件）
 * @param data 可参考接口文档
 * @param option axios 配置参数
 * @returns Promise
 */

export const findSubCategoryGoods = <T = any>(
  data?: T,
  option?: RequestConfigOptions
) => {
  return request({
    url: "/category/goods/temporary",
    method: "post",
    data,
    ...option,
  });
};
