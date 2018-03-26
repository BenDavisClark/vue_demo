import fetch from '@/utils/fetch'

export function getList (params) {
  return fetch({
    url: '/rest/list',
    method: 'get',
    params
  })
}
