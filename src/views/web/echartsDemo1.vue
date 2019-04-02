<template>
  <div>
   <div id="main" style="width: 1000px;height:500px;"></div>

    <div id="hoverDiv">


    </div>

  </div>

</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/graph')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  export default {
    name: 'echarts-graph',
    data(){
      return{

      }
    },
    mounted(){
      this.initChart()
    },
    methods:{
      initChart () {
        const theme = {
          color: [
            '#FE8463', '#9BCA63', '#FAD860', '#60C0DD', '#0084C6',
            '#D7504B', '#C6E579', '#26C0C0', '#F0805A', '#F4E001',
            '#B5C334'
          ]
        }
        this.chart = echarts.init(document.getElementById("main"),theme)
        this.chart.setOption({

          title: {
            text: "IPFS分布式存储模型",
            top: "top",
            left: "center"
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff'
              }, {
                offset: 1,
                color: '#35c2ff'
              }]),
            },
            shadowBlur: 10
          },
          textStyle: {
            color: '#333',
            fontSize: 16,
            fontWeight: 600,
          },
          legend: [{
            formatter: function(name) {
              return echarts.format.truncateText(name, 200, '12px', '…');
            },
            tooltip: {
              show: false,
              formatter: function(name) {
                return echarts.format.truncateText(name, 200, '12px', '…');
              },
            },
            selectedMode: 'false',
            bottom: 20,
          }],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          xAxis: {
            show: false,
            type: 'value'
          },
          yAxis: {
            show: false,
            type: 'value'
          },
          series: [{
            type: 'graph',
            coordinateSystem: 'cartesian2d',
            legendHoverLink: false,
            hoverAnimation: true,
            nodeScaleRatio: false,
            //建头
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 15],
            edgeLabel: {
              show: false,
              normal: {
                show: true,
                position: 'middle',
                textStyle: {
                  fontSize: 12
                },
                formatter: "{c}"
              }
            },
            focusNodeAdjacency: true,
            roam: false,
            //圆形上面的文字
            label: {
              normal: {
                position: "inside",
                show: true,
                textStyle: {
                  fontSize: 12
                },
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#157eff'
                }, {
                  offset: 1,
                  color: '#35c2ff'
                }]),
              },
              shadowBlur: 10
            },
            lineStyle: {
              normal: {
                width: 1,
                shadowColor: 'none',
                color:'#ff0000'
              },
            },
            data: [{
              name: "大数据",
              symbolSize: 80,
              draggable: false,
              fixed: true,
              value: [80,150]
            },{
              name: "块1",
              value: [200,250],
              draggable: false,
              fixed: true,
              symbol: "rect",
              symbolSize: [50,30],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#ffb402'
                }, {
                  offset: 1,
                  color: '#ffdc84'
                }]),
              }
            },{
              name: "块2",
              value: [200,200],
              draggable: false,
              fixed: true,
              symbol: "rect",
              symbolSize: [50,30],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#ffb402'
                }, {
                  offset: 1,
                  color: '#ffdc84'
                }]),
              }
            },{
              name: "块3",
              value: [200,150],
              draggable: false,
              symbol: "rect",
              symbolSize: [50,30],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#ffb402'
                }, {
                  offset: 1,
                  color: '#ffdc84'
                }]),
              }
            },{
              name: "块n-1",
              value: [200,100],
              draggable: false,
              symbol: "rect",
              symbolSize: [50,30],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#ffb402'
                }, {
                  offset: 1,
                  color: '#ffdc84'
                }]),
              }
            },{
              name: "块n",
              value: [200,50],
              draggable: false,
              symbol: "rect",
              symbolSize: [50,30],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#ffb402'
                }, {
                  offset: 1,
                  color: '#ffdc84'
                }]),
              }
            },
              //节点B,C,D ....n
              {
                name: "节点B",
                symbolSize: 80,
                draggable: false,
                value: [300,280]
              },{
                name: "节点C",
                symbolSize: 80,
                draggable: false,
                value: [300,215]
              },{
                name: "节点D",
                symbolSize: 80,
                draggable: false,
                value: [300,150]
              },{
                name: "节点N-1",
                symbolSize: 80,
                draggable: false,
                value: [300,85]
              },{
                name: "节点N",
                symbolSize: 80,
                draggable: false,
                value: [300,20]
              },{
                name: "节点X",
                symbolSize: 80,
                draggable: false,
                value: [400,150]
              }
            ],

            links: [
              {
                source: "大数据",
                value:'',
                target: "节点A",
              },{
                source: "节点A",
                value: " ",
                target: "大数据",
              },{
                source: "大数据",
                value: " ",
                target: "块1",
              },{
                source: "大数据",
                value: " ",
                target: "块2",
              },{
                source: "大数据",
                value: " ",
                target: "块3",
              },{
                source: "大数据",
                value: " ",
                target: "块n-1",
              },{
                source: "大数据",
                value: " ",
                target: "块n",
              },{
                source: "节点B",
                value: " ",
                target: "节点X",
              },{
                source: "节点C",
                value: " ",
                target: "节点X",
              },{
                source: "节点D",
                value: " ",
                target: "节点X",
              },{
                source: "节点N-1",
                value: " ",
                target: "节点X",
              },{
                source: "节点N",
                value: " ",
                target: "节点X",
              },{
                source: "块1",
                value: " ",
                target: "节点B",
              },{
                source: "块2",
                value: " ",
                target: "节点C",
              },{
                source: "块3",
                value: " ",
                target: "节点D",
              },{
                source: "块n-1",
                value: " ",
                target: "节点N-1",
              },{
                source: "块n",
                value: " ",
                target: "节点N",
              },{
                source: "节点X",
                value: " ",
                target: "大数据 ",
              }],
          }]
        })
        // this.chart.on("mouseover", function(data) {
        //   // 取消节点连接线触发效果
        //   if (data.dataType == "edge") {
        //     this.chart.dispatchAction({
        //       type: 'unfocusNodeAdjacency',
        //       seriesIndex: 0
        //     });
        //   }
        // })
        this.chart.on('mouseover',function (params) {
          console.log(params)
          if(params.dataIndex === 0){
            alert(1)
          }
          // series name 为 'uuu' 的系列中的图形元素被 'mouseover' 时，此方法被回调。
        });

      }

    }
  }
</script>

<style scoped>

</style>
