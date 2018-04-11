import fetch from '@/utils/fetch'
import Qs from 'qs'

 //角色列表
 export function roleList(params) {
   return fetch({
   url: '/rest/role/list',
   method: 'post',
    data: Qs.stringify({pageNo: params.pageNo,pageSize: params.pageSize })
   })
 }

 //删除角色
export  function deleteRole(params){
  return fetch({
    url:'/rest/role/delete',
    method:'post',
     data:Qs.stringify({roleIds:params},{ indices: false })
  })
}

