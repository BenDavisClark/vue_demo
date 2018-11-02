<template>
  <div class="mapcontainer">
      <div id="container"></div>
  </div>
</template>
<script>
  import remoteLoad from '@/utils/remoteLoad.js'

  export default {
    data() {
      return {
        zoom: 9,
        center: [120.149799, 30.246539],
        map: ''
      }
    },
    created() {
      // 已载入地图API，则直接初始化地图
      if (window.AMap && window.AMapUI) {
        this.initMap()
      } else {
        // 载入地图和UI组件
        Promise.all([
          remoteLoad(
            'http://api.tianditu.gov.cn/api?v=4.0&tk=2606b0583a88382158a5dee0c9d89378'
          ),
          remoteLoad(
            'http://cdn.bootcss.com/d3/3.5.17/d3.js'
          ),
          remoteLoad(
              'http://lbs.tianditu.gov.cn/api/js4.0/opensource/data/point.js'
          )
        ]).then(() => {
          this.initMap()
        })
      }
    },

    methods: {

      //地图初始化
      initMap() {
        let that = this
        this.map = new T.Map('container', {
          projection: 'EPSG:4326',
          center:new T.LngLat(116.40769, 39.89945),
          zoom:this.zoom,
          datasourcesControl:true
        })
        let ctrl = new T.Control.MapType();
        //添加控件
        this.map.addControl(ctrl);
        let  data_info = [[116.111854,39.211988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
          [116.202605,39.241585,"地址：北京市东城区东华门大街"],
          [116.313222,39.262345,"地址：北京市东城区正义路甲5号"]
        ];
        //点聚合示例
       /* for(let i=0;i<data_info.length;i++){
          let marker = new T.Marker(new T.LngLat(data_info[i][0],data_info[i][1]))  // 创建标注
          let content = data_info[i][2]
          that.map.addOverLay(marker)              // 将标注添加到地图中
          addClickHandler(content,marker)
        }
        function addClickHandler(content,marker){
          marker.addEventListener("click",function(e){
            openInfo(content,e)}
          );
        }
        function openInfo(content,e){
          let point = e.lnglat
          let marker = new T.Marker(point)// 创建标注
          let markerInfoWin = new T.InfoWindow(content,{offset:new T.Point(0,-30)}) // 创建信息窗口对象
          that.map.openInfoWindow(markerInfoWin,point) //开启信息窗口
        }*/


       //信息窗口聚合
        let pointsArray = []
        for(let i=0;i<data_info.length;i++){
          pointsArray.push(new T.LngLat(data_info[i][0], data_info[i][1]));
          let latlng = new T.LngLat(data_info[i][0],data_info[i][1]);
          let label = new T.Label({
            text: "天地图",
            position: latlng,
            offset: new T.Point(-9, 0)
          });
          label.setBackgroundColor('#0099FF')
          label.setBorderColor('#0099FF')
          label.setFontColor('#ffffff')
          //创建地图文本对象
          that.map.addOverLay(label);

          label.addEventListener("click", function (e) {
            console.log(e)
            alert()
          });// 将标注添加到地图中
        }
        that.map.setViewport(pointsArray)
        this.map.addEventListener("click",function(){
          that.map.closeInfoWindow()
        })
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
  .mapcontainer {
    .tdt-label{
      padding:0 25px;
      &:hover{
        cursor: pointer;
      }
    }
    height: 847px;
    min-height: 650px;
    #container{
      height:874px!important;
      min-height:600px!important;
    }
  }

</style>
