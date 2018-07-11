// 封装axios
import axios from 'axios';
var MyAxios = {};
MyAxios.install = function (Vue) {
  // 创建自定义的axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });
  Vue.prototype.$http = instance;

  // 添加请求拦截器----官网复制的
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);  // 存储来请求头信息
    // 只有当前登录的url是login时，不需要设置token，其他的都需要设置touken
    if (config.url.toLowerCase !== 'login') {
      const token = sessionStorage.getItem('token');
      // 如果请求的地址不是login，设置token
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器----官网复制的
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
};

export default MyAxios;
