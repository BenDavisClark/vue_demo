import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

const _import = require('./_import_component')

Vue.use(Router)

/**
* ----- 路由参数配置说明 -----
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
  // 这里是在本地添加路由的示例(没有权限控制),28-39行;使用时复制，并修改对应名称及路径
  {
    path: '/test', // views中文件夹的名称，下面的children为vue文件的名称
    noDropdown: false,
    component: Layout,
    redirect: '/test/form',
    name: '本地路由',
    icon: 'setup',
    children: [
      { path: 'form', name: '表单', component: _import('/test/form') },
      { path: 'chart', name: '图表', component: _import('/test/chart') }
    ]
  },
  {
    path: '/',
    noDropdown: true,
    component: Layout,
    redirect: '/index',
    name: 'Index',
    hidden: true,
    children: [{ path: 'index', component: _import('/test/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
