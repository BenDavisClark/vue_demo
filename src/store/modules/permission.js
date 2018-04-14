import { constantRouterMap } from '@/router/index'
const _import = require('@/router/_import_component')
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      var last = [{ path: '*', redirect: '/404', hidden: true }]
      var addup = routers.concat(last)
      state.addRouters = addup
      state.routers = constantRouterMap.concat(addup)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
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
              childrenRouteItem.btnauth = userRoutes[i].children[j].meta.handleAuth
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
