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

