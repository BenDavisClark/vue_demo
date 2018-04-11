import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getID, setID, removeID, getAccount, setAccount, removeAccount } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    JSESSIONID: getID(),
    account: getAccount(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_JSESSIONID: (state, accountId) => {
      state.JSESSIONID = accountId
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          console.log(data)
          setToken(data.token)
          setID(data.JSESSIONID)
          setAccount(data.account)
          commit('SET_TOKEN', data.token)
          commit('SET_JSESSIONID', data.JSESSIONID)
          commit('SET_ACCOUNT', data.account)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          // const data = response
          commit('SET_ROLES', 'admin')
          // commit('SET_ROLES', data.role)
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeID()
          removeAccount()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
