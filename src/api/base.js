import fetch from '@/utils/fetch'
import Qs from 'qs'

 //基础参数列表
 export function baseList(params) {
   return fetch({
   url: '/rest/base/list',
   method: 'post',
     data: Qs.stringify({ keyword: params.keyword ,typeId:params.typeId,pageNo: params.pageNo,pageSize: params.pageSize})
   })
 }

