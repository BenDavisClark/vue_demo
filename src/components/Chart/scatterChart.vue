<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/scatter')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/markLine')

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'ffff'
    },
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '600px'
    },
    xData: {
      type: Array
    },
    sData: {
      type: Array
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.chart = null
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      var dataAll = [
        [
          [10.0, 8.04],
          [8.0, 6.95],
          [13.0, 7.58],
          [9.0, 8.81],
          [11.0, 8.33],
          [14.0, 9.96],
          [6.0, 7.24],
          [4.0, 4.26],
          [12.0, 10.84],
          [7.0, 4.82],
          [5.0, 5.68]
        ],
        [
          [10.0, 9.14],
          [8.0, 8.14],
          [13.0, 8.74],
          [9.0, 8.77],
          [11.0, 9.26],
          [14.0, 8.1],
          [6.0, 6.13],
          [4.0, 3.1],
          [12.0, 9.13],
          [7.0, 7.26],
          [5.0, 4.74]
        ],
        [
          [10.0, 7.46],
          [8.0, 6.77],
          [13.0, 12.74],
          [9.0, 7.11],
          [11.0, 7.81],
          [14.0, 8.84],
          [6.0, 6.08],
          [4.0, 5.39],
          [12.0, 8.15],
          [7.0, 6.42],
          [5.0, 5.73]
        ],
        [
          [8.0, 6.58],
          [8.0, 5.76],
          [8.0, 7.71],
          [8.0, 8.84],
          [8.0, 8.47],
          [8.0, 7.04],
          [8.0, 5.25],
          [19.0, 12.5],
          [8.0, 5.56],
          [8.0, 7.91],
          [8.0, 6.89]
        ]
      ]

      var markLineOpt = {
        animation: false,
        label: {
          normal: {
            formatter: 'y = 0.5 * x + 3',
            textStyle: {
              align: 'right'
            }
          }
        },
        lineStyle: {
          normal: {
            type: 'solid'
          }
        },
        tooltip: {
          formatter: 'y = 0.5 * x + 3'
        },
        data: [
          [
            {
              coord: [0, 3],
              symbol: 'none'
            },
            {
              coord: [20, 13],
              symbol: 'none'
            }
          ]
        ]
      }

      var option = {
        title: {
          text: "Anscombe's quartet",
          x: 'center',
          y: 0
        },

        tooltip: {
          formatter: 'Group {a}: ({c})'
        },
        xAxis: [{ gridIndex: 0, min: 0, max: 20 }],
        yAxis: [{ gridIndex: 0, min: 0, max: 15 }],
        series: [
          {
            name: 'I',
            type: 'scatter',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: dataAll[0],
            markLine: markLineOpt
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>
