import request,{RequestConfigOptions} from "./request";
 
export const getCategory = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/home/category/head",
    method: "GET",
    data,
    ...option
  });
};