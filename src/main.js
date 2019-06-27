// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'//关于element组件配置
import ElementUI from 'element-ui'//关于element组件配置
import echarts from 'echarts'//关于echarts配置
import './common/axios'//配置axios
import BaiduMap from 'vue-baidu-map'//引入百度地图
Vue.prototype.$echarts = echarts ////关于echarts配置
Vue.use(ElementUI)
Vue.use(BaiduMap, { ak:'jKmWGS7erqnfrv8HfH4VGg72u5ipBIbT'    //这个地方是官方提供的ak密钥
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
