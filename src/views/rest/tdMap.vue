<template>
  <div class="mapcontainer">
      <div id="container"></div>
  </div>
</template>
<script>
  import remoteLoad from '@/utils/remoteLoad.js'
  import track_start_icon from '@/assets/images/map/track_start_icon.png'
  import track_end_icon from '@/assets/images/map/track_end_icon.png'
  import done_exceptional from '@/assets/images/map/done_exceptional.png'
  import done_normal from '@/assets/images/map/done_normal.png'

  export default {
    data() {
      return {
        track_start_icon,
        track_end_icon,
        done_exceptional,
        done_normal,
        zoom: 6,
        center: [120.149799, 30.246539],
        map: '',
        markerObj:'',
        iconMakers : [], //装标注点用
        markerInfoWin:[], //信息窗口对象
        startIcon : "http://lbs.tianditu.com/images/bus/start.png",	//起点图标
        endIcon : "http://lbs.tianditu.com/images/bus/end.png",		//终点图标,
        lnglats1:[
          {"B":"23.1","L":"113.3"},
          {"B":"23.2","L":"113.4"},
          {"B":"23.9","L":"114.1"},
          {"B":"24.7","L":"114.8"},
          {"B":"24.8","L":"115.5"},
          {"B":"25.3","L":"116.2"},
          {"B":"26.1","L":"116.7"},
          {"B":"27.5","L":"117.3"},
          {"B":"24.1","L":"120.3"},
          {"B":"25.2","L":"118.4"}
        ],
        lnglats2:[
          {"B":"23.1","L":"113.3"},
          {"B":"23.2","L":"113.4"},
          {"B":"23.9","L":"114.1"},
          {"B":"24.7","L":"114.8"},
          {"B":"24.8","L":"115.5"}
        ],
        data_info: [
          [116.417854, 39.921988, "这是一个信息窗口1", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"],
          [116.617824, 39.921980, "这是一个信息窗口21", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"],
          [116.50969, 39.921585, "这是一个信息窗口2", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"],
          [116.30969, 39.122345, "这是一个信息窗口3", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"],
          [116.20969, 39.122345, "这是一个信息窗口4", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"],
          [116.10969, 39.132345, "这是一个信息窗口5", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"],
          [120.312222, 30.142345, "这是一个信息窗口6", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"],
          [121.612222, 30.152345, "这是一个信息窗口7", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "预警一级"],
          [121.712222, 30.162345, "这是一个信息窗口8", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "预警一级"],
          [120.812222, 30.172345, "这是一个信息窗口9", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "预警一级"],
          [120.912222, 30.182345, "这是一个信息窗口10", "13358585888", "杭州市西湖区西园四路2号", "浙大创新院", "正常"]
        ]
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
          center:new T.LngLat(113.40769, 23.89945),
          zoom:this.zoom
        })
      /*  let  data_info = [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
          [116.406605,39.921585,"地址：北京市东城区东华门大街"],
          [116.412222,39.912345,"地址：北京市东城区正义路甲5号"]
        ];
        for(let i=0;i<data_info.length;i++){
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
          marker = new T.Marker(point)// 创建标注
          let markerInfoWin = new T.InfoWindow(content,{offset:new T.Point(0,-30)}) // 创建信息窗口对象
          that.map.openInfoWindow(markerInfoWin,point) //开启信息窗口
        }*/
        this.map.addEventListener("click",function(){
          that.map.closeInfoWindow()
        })

        Promise.all([
          remoteLoad('http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/D3SvgOverlay.js')
        ])
        this.addMarker()
      },

     //添加点标记
      addMarker(){
        let pointsArray = [];
        this.map.clearOverLays()
        let that = this
        let lnglats1 = this.lnglats1
        let data_info = this.data_info
        let lnglats2 = this.lnglats2
        let iconMakers = this.iconMakers
        if (lnglats1.length != 0) {
          let icon0;
          let icon1 = new T.Icon({
            iconUrl: track_start_icon,
            iconSize: new T.Point(44, 34), //图标大小
            iconAnchor: new T.Point(12, 31) //偏移量
          });
          let icon2 = new T.Icon({
            iconUrl: track_end_icon,
            iconSize: new T.Point(44, 34),
            iconAnchor: new T.Point(12, 31)
          })
          let arrayObj = new Array();
          for (let i = 0; i < lnglats1.length; i++) {
            pointsArray.push(new T.LngLat(lnglats1[i].L, lnglats1[i].B));
            if(data_info[i][6]=="正常"){
              icon0= new T.Icon({
                iconUrl: done_normal,
                iconSize: new T.Point(13, 13)
              });
            }else if(data_info[i][6]=="预警一级"){
              icon0= new T.Icon({
                iconUrl: done_exceptional,
                iconSize: new T.Point(13, 13)
              });
            }
            iconMakers[i]  = new T.Marker(new T.LngLat(lnglats1[i].L, lnglats1[i].B), {icon: icon0});
            let markObj = iconMakers[i];
            that.map.addOverLay(iconMakers[i]);
            let content =                         // 将标注添加到地图中
              "<div id='infoContent'>"+
              "<p style='text-align:center;'>"+data_info[i][2]+"</p>"+
              "<p><span>电话：&nbsp;</span>"+data_info[i][3]+"</p>"+
              "<p><span>地址：&nbsp;</span>"+data_info[i][4]+"</p>"+
              "<p><span>建筑名称：&nbsp;</span>"+data_info[i][5]+"</p>"+
              "<p><span>状态：&nbsp;</span>"+data_info[i][6]+"</p>"
            "<div>";
            addClickHandler(content,markObj);
            arrayObj.push(iconMakers[i]);
            if(i == 0){
              iconMakers[i]  = new T.Marker(new T.LngLat(lnglats2[i].L, lnglats2[i].B), {icon: icon1});
              that.map.addOverLay(iconMakers[i]);//起点
            }else if(i == lnglats2.length-1){
              iconMakers[i]  = new T.Marker(new T.LngLat(lnglats2[i].L, lnglats2[i].B), {icon: icon2});
              that.map.addOverLay(iconMakers[i]);//终点
            }
          }
          //标注点点击事件
          function addClickHandler(content,marker){
              marker.addEventListener("click",function(e){
              openInfo(content,e)}
            );
          }
          //打开信息窗口
          function openInfo(content,e){
            let point = e.lnglat;
            let marker = new T.Marker(point);// 创建点
            that.markerInfoWin = new T.InfoWindow(content,{
              offset:new T.Point(0,-10),
              closeOnClick:true
            }); // 创建信息窗口对象
            that.map.openInfoWindow(that.markerInfoWin,point); //开启信息窗口
          }
          that.map.addEventListener("click",MapClick);
          //地图点击事件
          function MapClick(e){
            if(that.markerInfoWin!=null){
              that.markerInfoWin.closeInfoWindow();
            }
          }
        }
        this.showLine(pointsArray)
      },
        showLine(pointsArray){
         let lnglats2 = this.lnglats2
         let line;
         let points = [];
         for (let i = 0; i < lnglats2.length; i++) {
           points.push(new T.LngLat(lnglats2[i].L, lnglats2[i].B));
         }
         line = new T.Polyline(points, {
           strokeColor: "#2C64A7",
           strokeWeight: 5,
           strokeOpacity: 0.9
         });
         this.map.addOverLay(line);
         this.map.setViewport(points)
          //this.map.setViewport(pointsArray)
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
    height: 847px;
    min-height: 650px;
    #container{
      height:874px!important;
      min-height:600px!important;
    }
  }

</style>
