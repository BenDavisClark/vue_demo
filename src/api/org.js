import fetch from '@/utils/fetch'
import Qs from 'qs'

export function getArea (params) {
  return fetch({
    url: '/rest/area/restrictAreaJson',
    method: 'post',
      data: Qs.stringify({ areaId: params.areaId })
  })
}

//组织列表
export function orgList (params) {
  return fetch({
    url: '/rest/org/list',
    method: 'post',
      data:Qs.stringify({ keyword: params.keyword,orgType: params.orgType,areaId: params.areaId,pageNo: params.pageNo,pageSize: params.pageSize})
  })
}

//删除组织
export  function deleteOrg(params){
  return fetch({
    url:'/rest/org/delete',
    method:'post',
     data:Qs.stringify({ids:params})
  })
}

