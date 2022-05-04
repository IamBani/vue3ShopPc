import request, { RequestConfigOptions } from "../request";

/**
 * 登陆-短信登陆
 * @param data
 * @param option axiso 参数
 * @returns
 */
export const userMobileLogin = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: " /login/code",
    method: "post",
    data,
    ...option,
  });
};


/**
 * 登陆-用户名密码登陆
 * @param data
 * @param option axiso 参数
 * @returns
 */
export const userLogin = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/login",
    method: "post",
    data,
    ...option,
  });
};


/**
 * 登陆-获取验证码
 * @param data
 * @param option axiso 参数
 * @returns
 */
export const getUserCode = <T = any>(data?: T, option?: RequestConfigOptions) => {
  return request({
    url: "/login/code",
    method: "get",
    data,
    ...option,
  });
};
/**
 * 第三方登陆-绑定获取验证码
 * @param data
 * @param option axiso 参数
 * @returns
 */
export const getUserSocialCode = <T = any>(
  data?: T,
  option?: RequestConfigOptions
) => {
  return request({
    url: "/login/social/code",
    method: "get",
    data,
    ...option,
  });
};