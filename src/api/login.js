import fetch from '@/utils/fetch'
import Qs from 'qs'

export function login (username, password) {
  return fetch({
    url: '/rest/token/login',
    method: 'post',
    data: Qs.stringify({ username: username, password: password })
  })
}

export function getInfo (token, account) {
  return fetch({
    url: '/rest/token/userRole',
    method: 'post',
    // params: {
    //   token: token, account: account
    // }
    data: Qs.stringify({ token: token, account: account })
  })
}

export function logout () {
  return fetch({
    url: '/rest/token/logout',
    method: 'get'
  })
}
