import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import trace_plan from '@/components/trace_plan'
import test from '@/components/test'
import Echarts from '@/components/echarts'
import login from '@/components/login'
import link from '@/components/herf_link'
import echart from '@/components/echartstest'
import logined_index from '@/components/logined_index'
import trace_bid from '@/components/trace_bid'
import order_manage from '@/components/order_manage/order_manager'
import baidumap from '@/components/user_manage/baidumap'
import useraddress from '@/components/user_manage/user_address'

import add_address from '@/components/user_manage/add_address'

import user_manager from '@/components/user_manage/user_manager'
import orderdetail from '@/components/order_manage/orderdetail'
import hhhhh from '@/components/test_index'
// import ever from '@/components/ever'
Vue.use(Router)

const router =new Router({
  mode: 'history',
  
  routes: [
    {path:'/',name :'echart',component:echart},
    {path:'/never', name:'trace_bid', component:trace_bid},
    { path: '/logined_index', name: '/logined_index', component: logined_index,
    children:[
              { path: '/trace_plan', name: 'trace_plan', component: trace_plan},
              { path: '/test', name: 'test', component: test},
              {path: '/ui/login', name: 'login', component:login},
              {path: '/echarts', name: 'echarts', component: Echarts},
              {path: '/ui/link', name: 'link' , component:link},
              {path: '/ordermanage', name: 'ordermanage', component:order_manage}
              ,{path: '/baidumap', name:'baidumap', component: baidumap}
              ,{path: '/add/address', name:'add_address', component: add_address}
              ,{path: '/orderdetail/:order/', name:'orderdetail', component: orderdetail}
              ,{path: '/user/address', name:'user_address', component:useraddress}
              ,{path: '/user/manager', name:'user_manager', component:user_manager}
              
              // ,{path: '/ever', name:'ever', component:ever},
            ]},
            {path: '/index', name: 'index', component: index},
            {path: '/hhh', name: 'hhh', component: hhhhh},
            ]

  
});
//用户进入其他页面，需要校验是否登录，如果未登录，进入/login页面
router.beforeEach((to, from, next) => {
  if(to.path !== '/index' && !Vue.cookie.get('token')){
    //next('/index')
    next('/index')
  }else if(to.path === '/') {
    next('/logined_index')
  }else {
    next()
  }
});
export default router
