import fetch from '@/utils/fetch'
import Qs from 'qs'

 //用户列表
 export function accountList(params) {
   return fetch({
   url: '/rest/account/list',
   method: 'post',
     data: Qs.stringify({ keyword: params.keyword,status: params.status,roleId: params.roleId,orgId: params.orgId,pageNo: params.pageNo,pageSize: params.pageSize })
   })
 }

 //删除用户
 export function deleteAccount(params){
  console.log(params)
  console.log(params.length)
   return fetch({
     url:'/rest/account/delete',
     method:'post',
     data:Qs.stringify({accountIds:params},{ indices: false })
   })
 }
