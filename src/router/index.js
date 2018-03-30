import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

const _import = require('./_import_component')

Vue.use(Router)

/**
* hidden: true                   如果设置 `hidden:true` 将不在侧边栏上显示(默认是false)
* alwaysShow: true               如果设置 true, 将一直显示, 不管子菜单的个数
*                                如果未设置, 只有多于1个子菜单时才变为嵌套模式，否则不显示
* redirect: noredirect           如果设置 `redirect:noredirect` 将不在面包屑导航中显示
* name:'router-name'             该名称将用来设置 <keep-alive> (必需设置!!!)
* meta : {
    roles: ['admin','editor']    根据角色控制页面权限 (可以设置多个角色)
    title: 'title'               该名称用来设置子菜单和面包屑导航
    icon: 'svg-name'             侧边栏上的小图标,
    noCache: true                页面是否缓存，默认为false，缓存
  }
**/

// 不需要权限的路由表
export const constantRouterMap = [
  { path: '/login', component: _import('/login/index'), hidden: true },
  { path: '/404', component: _import('/404'), hidden: true },
  {
    path: '/',
    noDropdown: true,
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('/dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 需要根据角色过滤权限的路由表
export const asyncRouterMap = [
  {
    path: '/single',
    noDropdown: true,
    component: Layout,
    redirect: 'noredirect',
    children: [{path: 'index', component: _import('/single/index'), name: 'single', meta: { title: '单一菜单', icon: 'homepage' }}]
  },
  {
    path: '/multiple',
    component: Layout,
    redirect: '/permission/submenu1',
    children: [
      {
        path: 'submenu1',
        component: _import('/multiple/submenu1'),
        name: 'submenu1',
        meta: {
          title: '子菜单1',
          icon: 'manager',
          roles: ['admin']
        }
      },
      {
        path: 'submenu2',
        component: _import('/multiple/submenu2'),
        name: 'submenu2',
        meta: {
          title: '子菜单2',
          icon: 'manager',
          roles: ['admin']
        }
      },
      {
        path: 'submenu3',
        component: _import('/multiple/submenu3'),
        name: 'submenu3',
        meta: {
          title: '子菜单1',
          icon: 'manager',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    // meta: { roles: ['admin'] }, // 可以再根菜单中设置权限
    children: [
      {
        path: 'index',
        component: _import('/system/index'),
        name: 'system',
        meta: {
          title: 'system',
          icon: 'manager',
          roles: ['admin'] // 可以只在子菜单中设置权限
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
