import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/rest/getChartData',
    method: 'get',
    params: query
  })
}
