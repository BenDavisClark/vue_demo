<template>
  <div id="main" style="width: 1000px;height:500px;"></div>
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
        let data = [
          {name: "商户", symbolSize: 60},
          {name: "客户"},
          {name: "司机"},
          {name: "司机1"}
        ]

        let links = [
          {source: 0, target: 2, value: 203, type: "维护"},
          {source: 0, target: 1, value: 448, type: "映射"},
          {source: 0, target: 3, value: 448, type: "映射1"}
        ]

        const theme = {
          color: [
            '#FE8463', '#9BCA63', '#FAD860', '#60C0DD', '#0084C6',
            '#D7504B', '#C6E579', '#26C0C0', '#F0805A', '#F4E001',
            '#B5C334'
          ]
        }
        this.chart = echarts.init(document.getElementById("main"),theme)
        this.chart.setOption({
          animationEasingUpdate: 'quinticInOut',
          series: [{
            "edgeLabel": {
              "normal": {
                "show": true,
                "textStyle": {
                  "fontSize": 14
                },
                "formatter": function(param) {
                  return param.data.type;
                }
              }
            },
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 1500,
              edgeLength: [150, 10],
              // layoutAnimation:false
            },
            // 节点标记类型
            symbol: 'circle',
            symbolSize: 50,
            // 两端标记类型
            edgeSymbol: ['circle', 'circle'],
            edgeSymbolSize: [12, 20],

            focusNodeAdjacency: true, // 鼠标经过节点是否突出显示
            roam: false, // 是否开启鼠标平移
            draggable: false, // 节点是否可拖拽

            label: {
              normal: {
                show: true,
                position: 'inside',
                textStyle: {
                  fontSize: 14
                },
              }
            },

            lineStyle: {
              normal: {
                opacity: 1,
                color: {
                  colorStops: [{
                    offset: 0,
                    color: '#FEE52D'
                  }, {
                    offset: 1,
                    color: '#F89212'
                  }]
                },
                width: 3
              }
            },
            itemStyle: {
              normal: {
                color: '#162436',
                borderColor: {
                  colorStops: [{
                    offset: 0,
                    color: '#A568FF'
                  }, {
                    offset: 1,
                    color: '#006CFF'
                  }]
                },
                borderWidth: 6
              }
            },
            // 节点分类
            categories: [{
              name: 'root',
              label: {
                formatter: '{b}',
                fontSize: 16
              },
              itemStyle: {
                color: '#132486'
              }
            }, {
              name: 'child'
            }],
            // 数据
            data,
            // 节点间关系数据
            links
          }]
        })
        this.chart.on("mouseover", function(data) {
          // 取消节点连接线触发效果
          if (data.dataType == "edge") {
            this.chart.dispatchAction({
              type: 'unfocusNodeAdjacency',
              seriesIndex: 0
            });
          }
        })

      }

    }
  }
</script>

<style scoped>

</style>
