import { removeUserinfo } from "@/utils/userinfo";
import { message } from "antd";
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080", // 基本路径，后续的实例只需要输入路径即可
  timeout: 1000, // 限制请求时间
  withCredentials: true, // 请求携带cookie
});

/**
 * ^ 网络拦截器配置，意思是在请求前、响应前、错误前的处理方式
 */

request.interceptors.request.use(
  // 请求发送前配置
  (request) => {
    // 返回本身 - 不变
    return request;
  },
  // 请求错误前
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  // 返回结果前
  (response) => {
    // 如果能响应回结果，并且错误是未登录，那么跳转到登录页
    if (response.data.code === 0 && response.data.msg === "NOTLOGIN") {
      // ant-design的消息框，会在窗口提示错误消息
      message.error("没有登录");
      // 移除本地存储的用户信息
      removeUserinfo();
      // 跳转回登录页
      location.pathname = "/login";
    }
    // 如果请求成功，但请求所要求数据有问题，那么抛出异常
    if (response.data.code === 0) {
      message.error(response.data.msg);
      throw Error(response.data.msg);
    }

    // 返回本身
    return response;
  },
  // 发生错误时
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
