import configService from "./config.service.js";
import { useUserStore } from "@/stores/modules/userStore.js";

const baseURL = configService.apiUrl;

const httpInterceptor = {
  invoke(options) {
    if (!/^https?:\/\//i.test(options.url)) {
      options.url = baseURL + options.url;
    }
    options.timeout = 10000;  
    options.header = options.header || {};

    const userStore = useUserStore();
    const token = userStore.getToken();
    if (token) {
      options.header["X-Access-Token"] = token;
    }
  }
};
uni.addInterceptor('request', httpInterceptor)  // 添加请求拦截器
export const http = (options) => {
  console.log('执行http', options);  // 打印最终使用的请求参数
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      complete(res) {
        console.log('HTTP 状态码', res.statusCode);  // 打印状态码
        switch(res.statusCode) {
          case 200:  // OK
            resolve(res.data);
            break;
          case 401:  // Unauthorized
          const userStore = useUserStore();
          userStore.clearToken();
          uni.showToast({
            title: res.data.message || "Unauthorized access",
            icon: 'none'
          });
          uni.navigateTo({ url: '/pages/login/index' });
            reject('Unauthorized access');
            break;
          case 404:  // Not Found
            console.log('404 Not Found', res);
            uni.showToast({
              title: res.data.message || "404 Not Found",
              icon: 'none'
            });
            reject('Resource not found');
            break;
          default:
            if (res.statusCode >= 400) {
              // console.log('错误处理', res);
              reject({ error: 'HTTP error', statusCode: res.statusCode, data: res.data });
            } else {
              console.log('其他响应', res);
              resolve(res.data);
            }
            break;
        }
      }
    });
  });
};
