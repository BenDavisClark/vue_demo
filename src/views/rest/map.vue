<template>
  <div class="mapcontainer">
    <div class="amap-page-container">
      <div id="container"></div>
      <div class="rectangle search">
        <input id="searchInput" class="rectangle searchInput" type="text" value="" placeholder="请输入建筑名称"
               v-model="searchInput" @focus="handleSearchFocus" @keyup="handleSearchKeyup">
        <a class="rectangle searchBtn" @click="searchBtn"></a>
      </div>
      <div>
        <ul>
          <li id="menu_searchSettings" class="menu">
            <div class="settingsContent cbackground rectangle" v-if="isShow">
              <div class="settingsOptions">
                <div class="subOption">
                  <div class="icon">
                    <img src="../../assets/images/areaMark.jpg" width="30" height="30"/>
                  </div>
                  <div class="content" id="areaList" >
                    <div class="list first" id="1001">
                       <span v-for="(area,index) in areaListlevel1" @click="selectedArea(1,index,area)" :class="{active:index==0  && indexKey==1}">
                          {{ area.name }}
                       </span>
                    </div>
                    <div class="list" id="1002">
                       <span v-for="(area,index) in areaListlevel2" @click="selectedArea(2,index,area)" :class="{active:index==current && indexKey==2}">
                          {{ area.name }}
                       </span>
                    </div>
                    <div class="list" id="1003">
                       <span v-for="(area,index) in areaListlevel3" @click="selectedArea(3,index,area)" :class="{active:index==current && indexKey==3}">
                          {{ area.name }}
                       </span>
                    </div>
                    <div class="list" id="1004">
                       <span v-for="(area,index) in areaListlevel4" @click="selectedArea(4,index,area)" :class="{active:index==current && indexKey==4}">
                          {{ area.name }}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div id="searchList" class="rectangle searchDetail" v-if="isSearch">

        <div class="searchItem" v-for="(item,index) in buildingList" :data="buildingList"
             @mouseenter="searchItemMouseenter(index+1,item)" @mouseleave="searchItemMouseleave(index+1,item)"
             @click="searchItemClick(item)">
          <div class="left">{{index+1}}</div>
          <div class="middle">
            <div class="title" :title="item.buildingName">{{ item.buildingName}}</div>
            <div class="content">{{ item.addr}}</div>
          </div>
          <div class="right" v-if="item.buildingPhotoList!=null && item.buildingPhotoList.length>0">
            <img :src="item.buildingPhotoList[0]" style="width:70px;">
          </div>
          <div class="right" v-else>
            <img src="../../assets/images/b.jpg"/>
          </div>
        </div>
        <div class="pagination-footer" v-if="pagishow" style="margin-bottom: 10px;">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size=pageSize
            :pager-count=pageCount
            :total=total>
          </el-pagination>
        </div>
      </div>
      <div id="itemDetail" class="rectangle itemDetail">
        <div class="item-title">
          <div id="itemDetailClose" class="close" @click="closeDetail"></div>
          <div class="img" v-if="buildingData.buildingPhotoList!=null && buildingData.buildingPhotoList.length>0">
            <img :src="buildingData.buildingPhotoList[0]"/>
          </div>
          <div class="img" v-else>
            <img src="../../assets/images/b.jpg"/>
          </div>
          <div id="buildingName" class="info">{{ buildingData.buildingName }}</div>
          <div id="appraisal" class="expand">鉴定等级 {{ buildingData.appraisal }}</div>
          <div id="address" class="expand">{{ buildingData.addr }}</div>
        </div>
        <div class="item-body">
          <div class="tabContent">
            <div id="baseInfo" class="content  active">
              <table>
                <tr>
                  <td style="width:25%;">建设时间</td>
                  <td id="build_year" style="width:75%;">{{ buildingData.buildYear }}</td>
                </tr>
                <tr>
                  <td>建筑用途</td>
                  <td id="building_use">{{ buildingData.buildingUse }}</td>
                </tr>
                <tr>
                  <td>建筑高度</td>
                  <td id="building_height">{{ buildingData.buildingHeight }}</td>
                </tr>
                <tr>
                  <td>层数</td>
                  <td id="building_level">{{ buildingData.buildingLevel }}</td>
                </tr>
                <tr>
                  <td>建筑面积</td>
                  <td id="acreage">{{ buildingData.acreage }}</td>
                </tr>
                <tr>
                  <td>结构类型</td>
                  <td id="building_type">{{ buildingData.structureTypeName }}</td>
                </tr>
                <tr>
                  <td>改造方式</td>
                  <td id="reform_way">{{ buildingData.reformWay }}</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div style="height: 30px;">
                      <span>示意图</span>
                      <el-button size="small" type="info" style="float:right;" id="seeDetails">查看详细</el-button>
                    </div>
                    <div class="warp">
                      <div class="slider" style="margin:0px 0px;">
                        <el-carousel :interval="5000" arrow="always">
                          <el-carousel-item v-for="item in 3" :key="item">
                            <h3>{{ item }}</h3>
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import remoteLoad from '@/utils/remoteLoad.js'
  import orange from '@/assets/images/orange.png'
  import alerts from '@/assets/images/alerts.gif'
  import green from '@/assets/images/green.png'
  import red_big1 from '@/assets/images/map/red_big1.png'
  import red_big2 from '@/assets/images/map/red_big2.png'
  import red_big3 from '@/assets/images/map/red_big3.png'
  import red_big4 from '@/assets/images/map/red_big4.png'
  import red_big5 from '@/assets/images/map/red_big5.png'
  import blue_big1 from '@/assets/images/map/blue_big1.png'
  import blue_big2 from '@/assets/images/map/blue_big2.png'
  import blue_big3 from '@/assets/images/map/blue_big3.png'
  import blue_big4 from '@/assets/images/map/blue_big4.png'
  import blue_big5 from '@/assets/images/map/blue_big5.png'
  import {findAreas, getBuildingDetail, inputBoxSearch,getSimpleBuildingList,findChildAreas} from '@/api/amap.js'
  import mapData from '@/mock/getMapData.js'

  export default {
    data() {
      return {
        selected: '',
        zoom: 11,
        center: [120.149799, 30.246539],
        markers: [],
        map: '',
        count: '',
        cluster: [],
        clientHeight: '650px',
        searchInput: '',
        isShow: false,
        isSearch: false,
        areaList:[],
        areaListlevel1:[],
        areaListlevel2:[],
        areaListlevel3:[],
        areaListlevel4:[],
        initialArea: '',
        current: 0,
        indexKey:1,
        pageSize: 5, //每页显示条目个数
        pageCount: 5, //页码数量
        total: 0,     //总数
        pageNo: 1,   //当前页码
        pagishow: false,
        buildingData: {
          buildingId: '',
          buildYear: '',
          buildingUse: '',
          buildingHeight: '',
          buildingLevel: '',
          acreage: '',
          buildingType: '',
          reformWay: '',
          buildingName: '',
          appraisal: '',
          addr: '',
          buildingPhotoList: ''
        },
        buildingList: [],
        point: '',
        pointmarkers: [],
        buildingJson: {},
        mapInitData:{
          address:'',
          lng:'',
          lat:'',
          areaIds:''
        }
      }
    },
    created() {
      if (window.AMap && window.AMapUI) {
        this.initMap()
      } else {
        Promise.all([
          remoteLoad(
            'http://webapi.amap.com/maps?v=1.4.4&key=7f7cef2b7c475e679344f813fe161775&plugin=AMap.MarkerClusterer'
          )
        ]).then(() => {
          this.initMap()
        })
      }
    },
    mounted() {
      this.changeDivHeight()
      /* const that = this;
       window.onresize = function temp() {
       var divHeight = document.getElementById("container").style.height=document.documentElement.clientHeight-145+"px"
       that.clientHeight = divHeight
      }*/
    },
    methods: {
      //登录账户地区权限初始化
      controllableAreasInit() {
        var self = this
        findAreas().then(response => {
          let datas = response.data.areaList
          for(let i=0;i<datas.length;i++){
              for(var j=0;j<datas[i].length;j++){
                if(datas[i][j].level == 1){
                  self.areaListlevel1.push(datas[i][j])
                }else if(datas[i][j].level == 2){
                  self.areaListlevel2.push(datas[i][j])
                }else if(datas[i][j].level == 3){
                  self.areaListlevel3.push(datas[i][j])
                }else if(datas[i][j].level == 4){
                  self.areaListlevel4.push(datas[i][j])
                }
              }
          }
          this.areaList = response.data.areaList
          this.listLoading = false
          let area=response.data.initialArea
          this.mapInitData.address = area.address
          this.mapInitData.lng = area.longitude
          this.mapInitData.lat = area.latitude
          this.mapInitData.areaIds = area.id
          this.areaBuildingInit(this.mapInitData.areaIds)
          this.map.setCity(response.data.initialArea.name)
        })
      },

      //选择区域操作
      selectedArea(key, index, area) {
        this.indexKey = key
        this.current = index
        //console.log(areaid+"~"+longitude+"~"+latitude)
        this.getChildAreas(area.id,key);
        if (area.name.indexOf("街道") != -1 || area.name.indexOf("镇") != -1 || area.name.indexOf("村") != -1 || area.name.indexOf("社区") != -1) {
          this.map.setZoomAndCenter(14, [area.longitude, area.latitude]);
        } else {
          this.map.setCity(area.name);
        }
        this.areaBuildingInit(area.id)
      },

      //根据区域ID初始化建筑信息
      areaBuildingInit(areaId){
        new Promise((resolve, reject) => {
          this.mapAddBuildingMarker(mapData.data.data)
        }).catch(err=>{
          this.$message.error(err)
        })
        /*  getSimpleBuildingList(areaId).then(res=>{
            this.mapAddBuildingMarker(res.data)
          }).catch(() => {
            this.$message.error('搜索建筑信息失败！')
          })*/
      },

      //获取下级区域信息
      getChildAreas:function (areaId,key){
       /* var self = this
        if(key==1){
          self.areaListlevel2=[]
          self.areaListlevel3=[]
          self.areaListlevel4=[]
        }else if(key==2){
          self.areaListlevel3=[]
          self.areaListlevel4=[]
        }else if(key==3){
          self.areaListlevel4=[]
        }
        findChildAreas(areaId).then(res=>{
          let datas = res.data.areaList
          for(let i=0;i<datas.length;i++){
            for(var j=0;j<datas[i].length;j++){
              if(datas[i][j].level == 1){
                  self.areaListlevel1.push(datas[i][j])
              }else if(datas[i][j].level == 2){
                  self.areaListlevel2.push(datas[i][j])
              }else if(datas[i][j].level == 3){
                  self.areaListlevel3.push(datas[i][j])
              }else if(datas[i][j].level == 4){
                  self.areaListlevel4.push(datas[i][j])
              }
            }
          }
        })*/
      },

      //按键弹起
      handleSearchKeyup(e) {
        let keyword = this.searchInput
        if (!keyword) {
          this.isShow = !this.isShow
          this.isSearch = false
        } else {
          if (e.keyCode == 13) {
            this.point= ''
            this.pointmarkers= []
            this.inputBoxSearch(null)
          }
        }
      },

      //搜索框获取焦点
      handleSearchFocus() {
        if (this.searchInput === '') {
          this.isShow = !this.isShow
          this.isSearch = false
          let itemDetail = document.querySelector("#itemDetail")
          itemDetail.style.display = 'none'
        }
      },

      changeDivHeight() {
        var h = document.documentElement.clientHeight    //获取页面可见高度
        document.getElementById("container").style.height = h - 145 + "px"
      },

      //地图初始化
      initMap() {
        let AMap = window.AMap
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: this.center,
          zoom: this.zoom
        })
        var that = this
        this.map.plugin(['AMap.ToolBar', 'AMap.MapType'], function () {
          var tool = new AMap.ToolBar({
            locate: false,
            position: "RB"
          })
          tool.show();
          tool.hideRuler();
          that.map.addControl(tool)
          var type = new AMap.MapType({
            defaultType: 1, //设置默认卫星地图
            showRoad: true  //显示路网
          });
          that.map.addControl(type)
        })
        //地图点击
        this.map.on('click', function () {
          that.isShow = false
          let itemDetail = document.querySelector("#itemDetail")
          itemDetail.style.display = 'none'
          that.isSearch = false
          if(that.pointmarkers.length>0){
            that.map.clearMap() //清除覆盖物
            that.point= ''
            that.pointmarkers= []
          }
        });
        this.controllableAreasInit()
      },

      //添加点聚合
      mapAddBuildingMarker(datas) {
        this.map.clearMap() //清除覆盖物
        var that = this
        let AMap = window.AMap
        let pointmarkers = []
        let myIcon
        for (let i = 0; i < datas.length; i += 1) {
          if (datas[i].status == 0) {
            myIcon = orange
          } else if (datas[i].status == 1) {
            myIcon = green
          } else if (datas[i].status < 0) {
            myIcon = alerts
          }
          this.point = new AMap.Marker({
            position: datas[i].lnglat,
            icon: myIcon,
            offset: new AMap.Pixel(-15, -15)
          })
          this.point.content = datas[i].buildingId;
          //点标记点击
          this.point.on('click', function (e) {
            //获取建筑信息
            getBuildingDetail(e.target.content).then(res => {
              that.buildingData = res.data
            })
            that.isShow = false
            let itemDetail = document.querySelector("#itemDetail")
            itemDetail.style.display = 'block'
          })
          pointmarkers.push(this.point)
        }
        this.markers = pointmarkers
        this.count = pointmarkers.length
        setTimeout(() => {
          this.addCluster()
        }, 1000)
      },

      addCluster(){
        let AMap = window.AMap
        if (this.cluster!=null && this.cluster.length!=0 ) {
          this.cluster.setMap(null)
        }
        this.cluster = new AMap.MarkerClusterer(this.map, this.markers, {
          gridSize: 40,
          zoomOnClick: true,
          maxZoom: 17
          //renderCluserMarker: this._renderCluserMarker
        })
      },

      //关闭详情
      closeDetail() {
        let itemDetail = document.querySelector("#itemDetail")
        itemDetail.style.display = 'none'
      },

      //搜索按钮
      searchBtn() {
        this.inputBoxSearch(null)
      },
      //改变页码
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        let pageNo = val
        this.inputBoxSearch(pageNo)
      },

      //清除覆盖物
      deleteAll() {
        this.cluster.setMap(null)
        this.map.clearMap() //清除覆盖物
      },

      searchItemMouseenter(index, item) {
        var ind = this.buildingJson[item.buildingId]
        this.point = this.pointmarkers[ind];
        let myIcon
        if (index == 1) {
          myIcon = blue_big1
        } else if (index == 2) {
          myIcon = blue_big2
        } else if (index == 3) {
          myIcon = blue_big3
        } else if (index == 4) {
          myIcon = blue_big4
        } else if (index == 5) {
          myIcon = blue_big5
        }
        let markerContent = document.createElement("div")
        let markerImg = document.createElement("img")
        markerImg.className = "markerlnglat"
        markerImg.src = myIcon
        markerContent.appendChild(markerImg)
        this.point.setContent(markerContent) //更新点标记内容
        this.point.setPosition([item.buildingLongitude, item.buildingLatitude])//更新点标记位置
        this.point.setAnimation('AMAP_ANIMATION_BOUNCE') //设置点标记弹跳效果
        this.map.setCenter([item.buildingLongitude, item.buildingLatitude]);
      },

      searchItemMouseleave(index, item) {
        var ind = this.buildingJson[item.buildingId]
        this.point = this.pointmarkers[ind];
        let myIcon
        if (index == 1) {
          myIcon = red_big1
        } else if (index == 2) {
          myIcon = red_big2
        } else if (index == 3) {
          myIcon = red_big3
        } else if (index == 4) {
          myIcon = red_big4
        } else if (index == 5) {
          myIcon = red_big5
        }
        let markerContent = document.createElement("div")
        let markerImg = document.createElement("img")
        markerImg.className = "markerlnglat"
        markerImg.src = myIcon
        markerContent.appendChild(markerImg)
        this.point.setContent(markerContent) //更新点标记内容
        this.point.setIcon(myIcon);
        this.point.setAnimation('AMAP_ANIMATION_NONE') //设置点标记弹跳效果
      },

      searchItemClick(item) {
        getBuildingDetail(item.buildingId).then(res => {
          this.buildingData = res.data
        })
        this.isShow = false
        let itemDetail = document.querySelector("#itemDetail")
        itemDetail.style.display = 'block'
      },

      //输入框搜索
      inputBoxSearch: function (pageNo) {
        if (this.cluster!=null) {
          this.cluster.setMap(null)
        }
        this.map.clearMap() //清除覆盖物
        let AMap = window.AMap
        let self = this
        this.isSearch = true
        this.isShow = false
        let itemDetail = document.querySelector("#itemDetail")
        itemDetail.style.display = 'none'
        let keyword = this.searchInput.trim();
        if (null != keyword && keyword != "") {
          this.loading = true;
          inputBoxSearch(keyword, pageNo, this.pageSize).then(res => {
            if (res.code == 20000) {
              if (res.data.buildingList != null && res.data.buildingList.length > 0) {
                let datas = res.data.buildingList
                this.buildingList = res.data.buildingList
                this.total = res.data.buildingList.length
                this.loading = false;
                if (this.total > 1) {
                  this.pagishow = true
                }
                self.map.setZoomAndCenter(14, [datas[0].buildingLongitude, datas[0].buildingLatitude]) //设置中心点
                let myIcon;
                for (let i = 0; i < datas.length; i += 1) {
                  var buildingId = datas[i].buildingId
                  var index = i + 1
                  if (index == 1) {
                    myIcon = red_big1
                  } else if (index == 2) {
                    myIcon = red_big2
                  } else if (index == 3) {
                    myIcon = red_big3
                  } else if (index == 4) {
                    myIcon = red_big4
                  } else if (index == 5) {
                    myIcon = red_big5
                  }

                  self.point = new AMap.Marker({
                    map: this.map,
                    icon: myIcon,
                    position: [datas[i].buildingLongitude, datas[i].buildingLatitude],
                    offset: new AMap.Pixel(-15, -15)
                  })
                  self.buildingJson[buildingId] = i;
                  //点标记点击
                  self.point.on('click', function (e) {
                    //获取建筑信息
                    getBuildingDetail(e.target.content).then(res => {
                      self.buildingData = res.data
                    })
                    self.isShow = false
                    let itemDetail = document.querySelector("#itemDetail")
                    itemDetail.style.display = 'block'
                  })
                  self.pointmarkers.push(self.point)
                }

              }else{
                $("#searchList").html("&nbsp;未找到结果，请修改或精简关键字！");
              }
            } else {
              this.total = 0
              this.$message.error('搜索建筑信息失败！');
              this.loading = false;
            }
          })
        }
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/map";

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__container {
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel {
    width: 100%;
  }

  #seeDetails {
    color: #fff;
    background-color: #89C4F4;
    border-color: #72b8f2;
    &:hover {
      background-color: #409eff;
      border-color: #409eff;
    }
  }

  .pagination-footer {
    text-align: center;
  }
</style>
