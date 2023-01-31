/**
 * ^ 将用户信息存储到本地的localStorage（本地存储），这个会永久保存在浏览器上的数据（下次使用可以直接拿取，不用重新请求），除非是手动清除
 * ! localStorage存储的数据都是字符串，可以用JSON序列化进行存储，然后再用JSON解析函数进行还原对象
 */

/**
 * 获取用户信息
 * @returns {{id:number,name:string}}
 */
export const getUserinfo = () => JSON.parse(localStorage.getItem("userinfo"));
// 设置用户信息
export const setUserinfo = (userinfo) =>
  localStorage.setItem("userinfo", JSON.stringify(userinfo));
// 移除用户信息
export const removeUserinfo = () => localStorage.removeItem("userinfo");
