import fetch from '@/utils/fetch'
import Qs from 'qs'

export function login(username, password) {
  return fetch({
    url: '/rest/token/login',
    method: 'post',
    data: Qs.stringify({ username: username, password: password })
  })
}

export function getInfo(token, accountId, account) {
  return fetch({
    url: '/rest/token/roleAuth',
    method: 'post',
    data: Qs.stringify({ token: token, accountId: accountId, account: account })
  })
}

export function logout() {
  console.log('fuck')
  return fetch({
    url: '/rest/token/logout',
    method: 'get'
  })
}
