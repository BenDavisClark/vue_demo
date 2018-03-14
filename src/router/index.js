import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/video',
    name: '地图',
    component: (resolve) => require(['@/views/vehicle/index'], resolve)
  },
  {
    path: '/vehicle',
    name: '首页',
    component: (resolve) => require(['@/views/layout/Layout'], resolve),
    children: [{
      path: 'menus',
      name: '菜单管理',
      component: (resolve) => require(['@/views/vehicle/menu'], resolve)
    }, {
      path: 'resources',
      name: '资源管理',
      component: (resolve) => require(['@/views/vehicle/test'], resolve)
    }]
  },
  {
    path: '/video',
    name: '视频',
    component: (resolve) => require(['@/views/layout/Layout'], resolve),
    children: [{
      path: 'menus',
      name: '预览',
      component: (resolve) => require(['@/views/vehicle/menu'], resolve)
    }, {
      path: 'resources',
      name: '回看',
      component: (resolve) => require(['@/views/vehicle/test'], resolve)
    }]
  }
]
