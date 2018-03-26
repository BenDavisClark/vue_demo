import fetch from '@/utils/fetch'
import Qs from 'qs'

export function login (username, password) {
  return fetch({
    url: 'https://easy-mock.com/mock/5aa9ec27e147c02c565f329a/api/rest/token/login',
    method: 'post',
    data: Qs.stringify({ username: username, password: password })
  })
}

export function getInfo (token, accountId, account) {
  return fetch({
    url: 'https://easy-mock.com/mock/5aa9ec27e147c02c565f329a/api/rest/token/roleAuth',
    method: 'post',
    data: Qs.stringify({ token: token, accountId: accountId, account: account })
  })
}

export function logout () {
  console.log('fuck')
  return fetch({
    url: 'https://easy-mock.com/mock/5aa9ec27e147c02c565f329a/api/rest/token/logout',
    method: 'get'
  })
}
