import request,{YWZRequestConfig} from "./request";

 
export const getCategory = <T = any>(data?: T, option?: YWZRequestConfig) => {
  return request({
    url: "/home/category/head",
    method: "GET",
    data,
    ...option
  });
};