import fetch from '@/utils/fetch'

 //权限列表
 export function authList() {
   return fetch({
   url: '/rest/auth/list',
   method: 'post'
   })
 }

