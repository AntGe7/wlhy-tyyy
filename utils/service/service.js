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

uni.addInterceptor("request", httpInterceptor);

export const http = (options) => {
  console.log(options, 'options');
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.data.statusCode === 200) {  
          console.log("code200", res.data);
          resolve(res.data); 
        } else if (res.data.statusCode === 401) {  
          console.log("code401", res.data);
          const userStore = useUserStore();
          userStore.clearToken();
          uni.showToast({
            title: res.data.message || "Unauthorized access",
            icon: 'none'
          });
          uni.navigateTo({ url: '/pages/login/index' });
          reject(new Error("Unauthorized"));  
          console.log("code402+", res.data);
          uni.showToast({
            icon: 'none',
            title: res.data.message || 'Request error'
          });
          reject(new Error(res.data.message || 'Request error'));
        }
      },
      fail(err) {
        console.log("Network error", err);
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试'
        });
        reject(new Error('Network error'));  
      }
    });
  });
};
