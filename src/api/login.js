import fetch from '@/utils/fetch'
import Qs from 'qs'

export function login (username, password) {
  return fetch({
    url: '/rest/token/login',
    method: 'post',
    data: Qs.stringify({ username: username, password: password })
  })
}

export function getInfo () {
  return fetch({
    url: '/rest/token/roleAuth',
    method: 'post'
  })
}

export function logout () {
  return fetch({
    url: '/rest/token/logout',
    method: 'post'
  })
}
