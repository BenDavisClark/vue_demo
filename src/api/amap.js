import fetch from '@/utils/fetch'
import Qs from 'qs'

export function findAreas(){
  return fetch({
    url:'/rest/findControllableAreas',
    method:'get'
  })
}

export function getMapData(areaId){
  return fetch({
    url:'/rest/getData',
    method:'get',
    data:({areaId:areaId})
  })
}

export function getBuildingDetail(buildingId){
  return fetch({
    url:'/rest/getBuildingDetail',
    method:'post',
    data: ({buildingId:buildingId})
  })
}

export function inputBoxSearch(keyword,pageNo,pageSize){
  return fetch({
    url:'/rest/inputBoxSearch',
    method:'post',
    data: Qs.stringify({keyword:keyword,pageNo:pageNo,pageSize:pageSize})
  })
}

export function getSimpleBuildingList(areaId){
  return fetch({
    url:'/rest/getSimpleBuildingList',
    method:'post',
    data:({areaId:areaId})
  })
}

export function findChildAreas(areaId){
  return fetch({
    url:'/rest/findChildAreas',
    method:'post',
    data:({areaId:areaId})
  })
}
