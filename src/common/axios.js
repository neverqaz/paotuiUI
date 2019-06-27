import axios from 'axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
// import store from './vuex'
// 引入notify模块 以便axios在response 异常的时候弹出提示信息
import { Notification } from 'element-ui';

// 设置默认ajax请求源地址
axios.defaults.baseURL = process.env.API_ENDPOINT

// 设置axios拦截器，设置ajax请求Authorization的header都从cookie中读取
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // let csrftoken = Vue.cookie.get('csrftoken')
    // let sessionid = Vue.cookie.get('sessionid')
    let token = Vue.cookie.get('token')
    if (config.url && !config.url.startsWith('http://www.neverqaz.cn')) {
      if (token) {//csrftoken && sessionid
        //config.headers['Cookie'] = "csrftoken="+csrftoken+"; sessionid="+sessionid;
        config.data=JSON.stringify(config.data)
        // config.headers['token'] = token
        config.headers ={
          'Authorization':"jwt "+token,
          'Content-Type':'application/json'
        }
      }
    }
   // config.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8000'
    // ajax开始后，顶部进度条显示
   // store.commit('set_processing', true)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 请求完成后的拦截
axios.interceptors.response.use(response => {
  
  // ajax结束后，进度条隐藏
  //store.commit('set_processing', false)
  return response
}, error => {
  //store.commit('set_processing', false)
  // 这里我们把错误信息扶正, 后面就不需要写 catch 了
  Notification.error({
    title: '请求发生异常！状态码：' + error.response.status,
    message: error.response.statusText
  });
  return Promise.resolve(error.response)
})

// 可在vue中使用this.axios来调用axios模块
Vue.prototype.axios = axios
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8000'
export default axios
