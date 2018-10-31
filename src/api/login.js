import fetch from '@/utils/fetch'
import sha256 from 'js-sha256'

export function login (username, password) {
  let pwd = sha256(password);
  return fetch({
    url: '/rest/login',
    //url: '/real/login/login',
    method: 'post',
    data: ({ account : username, password: pwd })
  })
}

export function getInfo () {
  return fetch({
    url: '/rest/testAuth',
    method: 'post'
  })
}

export function logout () {
  return fetch({
    //url: '/rest/token/logout',
    url: '/real/login/logout',
    method: 'post'
  })
}
