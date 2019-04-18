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
* noDropdown                     设置菜单是否显示下拉按钮 默认false 显示
* meta : {
    roles: ['admin','editor']    根据角色控制页面权限 (可以设置多个角色)
    title: 'title'               该名称用来设置子菜单和面包屑导航
    icon: 'svg-name'             侧边栏上的小图标,
    noCache: true                页面是否缓存，默认为false，缓存
  }
**/

// 本地路由表
export const constantRouterMap = [
  { path: '/login', component: _import('/login/index'), hidden: true },
  { path: '/error/404', component: _import('/error/404'), hidden: true },
  { path: '/error/401', component: _import('/error/401'), hidden: true },
  // 这里是在本地添加路由的示例(没有权限控制),28-39行;使用时复制，并修改对应名称及路径
  {
    path: '',
    noDropdown: true,
    component: Layout,
    redirect: '/index',
    name:'首页',
    icon: 'homepage',
    children: [{
      path: '/index',
      name: '首页',
      component: _import('/demo/home'),
      meta: { title: '首页',noCache: true }
    }]
  },
  {
    path: '',
    noDropdown: true,
    component: Layout,
    redirect: '/dashboard',
    icon: 'manage',
    name:'总览',
    children: [{
      path: '/dashboard',
      name: '总览',
      component: _import('/dashboard/index'),
      meta: { title: '总览',noCache: true }
    }]
  },
  {
    path: '/test', // views中文件夹的名称，下面的children为vue文件的名称
    noDropdown: false,
    component: Layout,
    redirect: '/test/form',
    name: '导航一',
    icon: 'jichuguanli',
    meta: { title: '本地路由' },
    children: [
      { path: 'form', name: '表单', component: _import('/test/form'),meta: { title: '表单' }},
      { path: 'chart', name: '图表', component: _import('/test/chart'),meta: { title: '图表' }},
      { path: 'list', name: '数据列表', component: _import('/test/list'),meta: { title: '数据列表' }},
      { path: 'html2canvas', name: 'html2canvas', component: _import('/test/html2canvas'),meta: { title: 'html2canvas' }},
      { path: 'Nesting', name: '嵌套页面', component: _import('/test/Nesting'),meta: { title: '嵌套页面' }},
      { path: 'icons', name: '图标', component: _import('/test/icons'),meta: { title: '图标' }},
      { path: 'preview1', name: '图片预览', component: _import('/test/preview1'),meta: { title: '图片预览' }},
      { path: 'fullcalendar', name: '数据日历', component: _import('/test/fullcalendar'),meta: { title: '数据日历' }},
      // { path: 'preview', name: '图片预览', component: _import('/test/preview'),meta: { title: '图片预览' }},
      // { path: 'preview2', name: '图片预览2', component: _import('/test/preview2'),meta: { title: '图片预览2' }}
    ]
  },
  {
    path: '/web',
    noDropdown: false,
    component: Layout,
    redirect: '/web/jsplumbDemo6',
    name: '导航二',
    icon: 'jichuguanli',
    meta: { title: '导航一' },
    children: [
      //{ path: 'FlowDiagram', name: 'FlowDiagram', component: _import('/test/FlowDiagram'),meta: { title: '流程图' }},
      //{ path: 'FlowDiagram', name: 'FlowDiagram', component: _import('/test/FlowDiagram'),meta: { title: '流程图' }},
      { path: 'FlowDiagram1', name: 'FlowDiagram1', component: _import('/web/FlowDiagram1'),meta: { title: '流程图1' }},
      //{ path: 'jsplumbDemo', name: '流程图demo', component: _import('/web/jsplumbDemo'),meta: { title: '流程图demo' }},
      { path: 'jsplumbDemo1', name: '流程图demo1', component: _import('/web/jsplumbDemo1'),meta: { title: '流程图demo1' }},
      //{ path: 'jsplumbDemo2', name: '流程图demo2', component: _import('/web/jsplumbDemo2'),meta: { title: '流程图demo2' }},
      // { path: 'jsplumbDemo3', name: 'demo3', component: _import('/web/jsplumbDemo3'),meta: { title: 'demo3' }},
      // { path: 'jsplumbDemo4', name: 'demo4', component: _import('/web/jsplumbDemo4'),meta: { title: 'demo4' }},
      // { path: 'jsplumbDemo5', name: 'demo5', component: _import('/web/jsplumbDemo5'),meta: { title: 'demo5' }},
      { path: 'jsplumbDemo6', name: 'demo6', component: _import('/web/jsplumbDemo6'),meta: { title: 'demo6' }},
      { path: 'jsplumbDemo7', name: 'demo7', component: _import('/web/jsplumbDemo7'),meta: { title: 'demo7' }},
      //{ path: 'echartsGraph', name: 'echartsGraph', component: _import('/test/echartsGraph'),meta: { title: 'echartsGraph' }},
      //{ path: 'echartsDemo1', name: 'echartsDemo', component: _import('/test/echartsDemo1'),meta: { title: 'echartsDemo' }}
    ]
  },
  {
    path: '/test',
    noDropdown: true,
    component: Layout,
    redirect: '/test/list',
    name: '本地路由',
    hidden: true,
    meta: { title: '本地路由' },
    children: [
      { path: 'list/Detail',name:"编辑",component: _import('/test/Detail'),meta: { title: '编辑' } },
      { path: 'list/add',name:"新增",component: _import('/test/add'),meta: { title: '新增' } }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
