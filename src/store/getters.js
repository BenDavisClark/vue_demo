const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  account: state => state.user.account,
  JSESSIONID: state => state.user.JSESSIONID,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
