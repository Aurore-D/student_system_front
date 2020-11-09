import Vue from 'vue'

import {
  getToken,
  removeToken
} from '@/http/auth.js';

import router from '@/router';

import {
  Message
} from 'element-ui';

import axios from 'axios';

/************************************************分割线*****请求响应拦截***********************************************************/

// 创建 axios 实例
const http = axios.create({
  // 统一 url 配置，定义访问前缀 baseURL
  baseURL: 'http://localhost:8081',
  // 定义请求超时时间
  timeout: 10000,
  // 请求带上 cookie
  withCredentials: true,
  // 定义消息头
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// 定义请求拦截器
http.interceptors.request.use(
  config => {
    // 让每个请求携带 token
    config.params["token"] = getToken()
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 定义响应拦截器
http.interceptors.response.use(
  response => {

/*    // 当 token 失效时，清除 cookie 保存的 token 值，并跳转到登陆界面
    if (response.data && response.data.code === 401) {
      removeToken()
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5000
      })
      router.push({
        name: 'Login'
      })
    }
    // 未找到页面时，跳转到 404 页面
    if (response.data && response.data.code === 404) {
      router.push({
        name: '404'
      })
    }*/
    return response
  },
  error => {
    console.log("--------------");
    console.log(error.response);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$router.push({
            name: 'Login'
          });
          removeToken()
          Message({
            message: "登录过期，请重新登录",
            type: 'error',
            duration: 5000
          })
          localStorage.removeItem('state');
          break;
      }
    }
  }
)

export default http
