<template>
  <div id="main" style="width: 1000px;height:400px;"></div>
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
        //label样式
        var labelStyle = {
          show: true,
          //  fontSize: 12,
          position: [0, -15],
          backgroundColor: 'pink',
          formatter: function(params) {
            if (params.data.name.length < 10) {
              return '{popup|' + params.data.name + '}'
            }else if(params.data.name.length >= 10 && params.data.name.length <13){
              return '{popupMid|' + params.data.name + '}'
            }else {
              return [
                '{popupbr|' + params.data.name.slice(0, 10) + '}',
                '{popupbr|' + params.data.name.slice(10) + '}'
              ].join('\n')
            }
          },
          rich: {
            popup: {
              align: 'center',
              color: 'yellow',
              backgroundColor: 'blue',
              borderColor: 'green',
              width: 50,
              // lineHeight:60,
              height: 30, //文字块的 width 和 height 指定的是内容高宽，不包含 padding。
              fontSize: 16,
              padding:5,
              //  borderWidth: 2
            },
            popupMid: {
              align: 'center',
              color: 'yellow',
              backgroundColor: 'blue',
              borderColor: 'green',
              width: 50,
              // lineHeight:60,
              height: 30, //文字块的 width 和 height 指定的是内容高宽，不包含 padding。
              fontSize: 14,
              padding:5,
              //  borderWidth: 2
            },
            popupbr: {
              align: 'center',
              color: '#fff',
              backgroundColor: 'blue',
              width: 100,
              lineHeight:30,
              height:30,
              fontSize: 14,
              padding:5,
              //  borderWidth: 2
            }
          },
        }
        this.chart = echarts.init(document.getElementById("main"),theme)
        this.chart.setOption({
            backgroundColor: '#fff',
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
              itemStyle:{
                normal:{
                  label:{
                    show: false,//如果设置为true，节点文字则一直显示
                    formatter: '{b}'
                  },
                  color:'#000',
                  labelLine :{show:true}
                }
              },
              type: 'graph',
              layout: 'none',
              symbolSize: (value) => {
                return value * 2;
              },
              coordinateSystem: null,
              label: {
                normal: {
                  show: true,
                  position: 'bottom',
                  color: '#ffffff'
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [1, 10], //箭头的大小
              categories: [{
                name: '资本',
                itemStyle: {
                  normal: {
                    color: '#e43c59', //红
                  }
                },
                label: {
                  normal: {
                    fontSize: '14'
                  }
                },
              }, {
                name: '大公司',
                itemStyle: {
                  normal: {
                    color: 'yellow', //黄
                  }
                },
                label: {
                  normal: {
                    fontSize: '20'
                  }
                },
              }, {
                name: '小公司',
                itemStyle: {
                  normal: {
                    color: 'green', //绿
                  }
                },
                label: {
                  normal: {
                    fontSize: '14'
                  }
                },
              }],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 10
                  },
                  formatter: function(params, ticket, callback) {
                    params.name = params.data.name;
                    return params.name;
                  }
                }
              },
              data: [{
                name: '节点1',
                x: 300,
                y: 80,
                value: 2,
                label: {
                  show: true,
                  normal: labelStyle

                }
              }, {
                name: '节点2',
                x: 300,
                y: 150,
                value: 2,
                label: {
                  show: true,
                  normal: labelStyle

                }
              }, {
                name: '节点3',
                x: 550,
                y: 150,
                value: 4,
                label: {
                  show: true,
                  normal: labelStyle

                }
              }, {
                name: '节点4',
                x: 750,
                y: 80,
                value: 4,
                label: {
                  show: true,
                  normal: labelStyle

                }
              }, {
                name: '节点5',
                x: 750,
                y: 150,
                value: 5,
                label: {
                  show: true,
                  normal: labelStyle

                }
              }, {
                name: '节点6',
                x: 750,
                y: 220,
                value: 6,
                label: {
                  show: true,
                  normal: labelStyle

                }
              }, {
                name: '节点7',
                x: 900,
                y: 80,
                value: 9,
                label: {
                  show: true,
                  normal: labelStyle
                }
              }],
              links: [{
                name: '预警规则',
                source: '节点1',
                target: '节点3',
                lineStyle: {
                  normal: {
                    color: '#f5cb62',  //节点1到节点3的连线的颜色
                    curveness: 0,
                  }
                },
              }, {
                name: '预警规则2',
                source: '节点2',
                target: '节点3',
                lineStyle: {
                  normal: {
                    curveness: 0,
                    color: '#f5cb62'
                  }
                },
              }, {
                name: '预警规则1',
                source: '节点3',
                target: '节点4',
                lineStyle: {
                  normal: {
                    curveness: 0,
                    color: '#43a6f7'
                  }
                }
              }, {
                name: '预警规则3',
                source: '节点3',
                target: '节点5',
                lineStyle: {
                  normal: {
                    curveness: 0,
                    color: '#43a6f7'
                  }
                }
              }, {
                name: '预警规则4',
                source: '节点3',
                target: '节点6',
                lineStyle: {
                  normal: {
                    curveness: 0,
                    color: '#43a6f7'
                  }
                }
              }, {
                name: '预警规则5',
                source: '节点4',
                target: '节点7',
                lineStyle: {
                  normal: {
                    curveness: 0,
                    color: '#43a6f7'
                  }
                }
              }]
            }]
        })
      }
    }
  }
</script>

<style scoped>

</style>
