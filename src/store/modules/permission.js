import { constantRouterMap } from '@/router/index'
// import { asyncRouterMap, constantRouterMap } from '@/router/index'
const _import = require('@/router/_import_component')

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data
        // let accessedRouters
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        var userRoutes = data.rowrouter

        var accessedRouters = []
        for (var i = 0; i < userRoutes.length; i++) {
          var userRoutesItem = {}
          var path = userRoutes[i].url
          userRoutesItem.path = userRoutes[i].url
          userRoutesItem.name = userRoutes[i].name
          userRoutesItem.icon = userRoutes[i].meta.icon
          userRoutesItem.noDropdown = userRoutes[i].noDropdown
          userRoutesItem.component = (resolve) => require(['@/views/layout/Layout'], resolve)
          if (userRoutes[i].children) {
            let childrenRoute = []
            for (var j = 0; j < userRoutes[i].children.length; j++) {
              let childrenRouteItem = {}
              childrenRouteItem.path = userRoutes[i].children[j].url
              childrenRouteItem.name = userRoutes[i].children[j].name
              var url = userRoutes[i].children[j].url
              childrenRouteItem.component = _import(path + '/' + url)
              childrenRoute.push(childrenRouteItem)
            }
            userRoutesItem.children = childrenRoute
          } else {
            let childrenRoute = []
            let childrenRouteItem = {}
            userRoutesItem.redirect = userRoutes[i].url + '/index'
            childrenRouteItem.path = 'index'
            childrenRouteItem.component = _import(path + '/index')
            childrenRoute.push(childrenRouteItem)
            userRoutesItem.children = childrenRoute
          }
          accessedRouters.push(userRoutesItem)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
