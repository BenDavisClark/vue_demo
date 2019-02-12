<template >
  <!--div.dagre-graph-container(:id="containerId")-->
    <!--div.zoom-div-->
      <!--button(v-for="item,index in directions" :key="item.prop" @click="direction = item.prop") {{item.label}}-->
      <!--button.zoom(@click="zoomCtrl('in')") 缩小-->
      <!--button(@click="zoomCtrl('out')") 扩大-->
    <!--svg.dagre-->
      <!--g.container-->
  <div class="dagre-graph-container" :id="containerId">
    <!--<div class="zoom-div">-->
        <!--<button v-for="(item,index) in directions" key="item.prop" @click="direction = item.prop">{{  item.label }}</button>-->
        <!--<button class="zoom" @click="zoomCtrl('in')"></button>-->
      <!--<button  @click="zoomCtrl('out')"></button>-->
    <!--</div>-->
    <svg class="dagre">
      <g class="container"></g>
    </svg>
  </div>
</template>
<script>
  import * as d3 from 'd3'
  import dagreD3 from 'dagre-d3'
  let container = null
  export default {
    name: 'DagreGraph',
    props: ['nodes', 'edges'],
    data() {
      return {
        imgUrl:require ("@/assets/images/db.png"),
        id: '',
        renderer: null,
        graph: null,
        direction: 'LR',
        // directions: [
        //   {
        //     prop: 'LR',
        //     label: '从左至右'
        //   },
        //   {
        //     prop: 'RL',
        //     label: '从右至左'
        //   },
        //   {
        //     prop: 'TB',
        //     label: '从上至下'
        //   },
        //   {
        //     prop: 'BT',
        //     label: '从下至上'
        //   }
        // ],
        zoom: null,
        containerId: '',
        width: 0,
        height: 0
      }
    },
    created() {
      this.containerId = this.uuid()
      this.graph = new dagreD3.graphlib.Graph().setGraph({
        rankdir: this.direction
      }).setDefaultEdgeLabel(function () { return {} })
    },
    methods: {
      uuid () {
        function s4 () {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        }
        return (
          s4() + s4() + '-' + s4() + '-' + s4() +  '-' + s4() + '-' + s4() + s4() + s4()
        )
      },
      zoomCtrl (symbal) {
        let scale = symbal === 'out' ? 1.1 : 0.8
        const svg = d3.select(this.$el).select('svg.dagre')
        this.zoom.scaleBy(svg, scale)
      },
      /**
       * @description control the canvas zoom to up or down
       */
      zoomed () {
        d3.select(this.$el).select('g.container').attr('transform', d3.event.transform)
      },
      /**
       * @description 画节点
       */
      strokeNodes () {
        // 获取之前的nodes缓存并清除
        let nodes = this.graph.nodes()
        if (nodes.length) {
          nodes.forEach(
            item => {
              this.graph.removeNode(item)
            }
          )
        }

        //通过operator来画shape(BranchPythonMapOperator: 分支； JoinOperator：合流)
        this.nodes.forEach(
          (item) => {
            let state = item.state ? item.state : 'no-status'
            let shape = 'rect'
            if (item.value.operator === 'BranchPythonMapOperator') {
              shape = 'ellipse'
            } else if (item.value.operator === 'JoinOperator') {
              shape = 'circle'
            }

           //画点
            if(item.type === 'field'){
             let fieldHtml = '<div>'
             for(let i of item.fieldName){
               fieldHtml+='<span>'+ i+'<br></span>'
             }
             fieldHtml +='</div>'
              this.graph.setNode(item.id, {
                labelType: "html",
                label: "<div class='dagreGraphDiv'><p ><span >库：</span>"+item.mdName+"</p><p ><span >表：</span>" + item.tableName + "</p><p><span style='background:#2db7f5;color:#fff;'></span>" + fieldHtml + "</p></div>",
                shape: shape,
                class: item.value.operator + ' dagre ' + state})
            }else if(item.type === 'table'){
              this.graph.setNode(item.id, {
                labelType: "html",
                label: "<div class='dagreGraphDiv'><p ><span >库：</span>"+item.mdName+"</p><p ><span >表：</span>" + item.tableName + "</p></div>",
                shape: shape,
                class: item.value.operator + ' dagre ' + state})
            }else if(item.type === 'db'){
              this.graph.setNode(item.id, {
                labelType: "html",
                label: "<div class='dagreGraphDiv'><p ><span >库：</span>"+item.mdName+"</p></div>",
                shape: shape,
                class: item.value.operator + ' dagre ' + state})
            }else if(item.type === 'system'){
              this.graph.setNode(item.id, {
                labelType: "html",
                label: "<div class='dagreGraphDiv'><p ><span >系统：</span>"+item.mdName+"</p></div>",
                shape: shape,
                class: item.value.operator + ' dagre ' + state})
            }else{
               this.graph.setNode(item.id, {label: item.value.label, shape: shape, class: item.value.operator + ' dagre ' + state})
            }
          }
        )

       /* nodes.forEach(function(node) {
          if (node.indexOf("host") == 0) {
            n = g.setNode(node, {
              labelType: "html",
              label: "<img src=\"http://cdn-img.easyicon.net/png/56/5670.png\"/><b>Comp: " + node + "</b>",
              class: "host",
              rx: 5,
              ry: 5,
              width: 150
            });
            n.customId = "node" + node;
          } else {
            n = g.setNode(node, {
              labelType: "html",
              label: "<b>" + node + "</b>",
              class: "comp",
              rx: 5,
              ry: 5,
              width: 150
            });
            n.customId = "node" + node;
          }
        });*/


        this.renderer(container, this.graph)
      },
      /**
       * @description 画线
       */
      strokeEdges () {
        //一个脚本节点时：不渲染eage
        if (this.nodes.length > 1) {
          this.edges.forEach(
            (item) => {
              if (item.label) {
                this.graph.setEdge(item.from, item.to, {label: item.label})
              } else {
                this.graph.setEdge(item.from, item.to,{
                  label: '映射'
                })
              }
            }
          )
          this.renderer(container, this.graph)
        }
      }
    },
    mounted () {
      this.width = document.getElementById(this.containerId).clientWidth
      this.height = document.getElementById(this.containerId).clientHeight
      // eslint-disable-next-line
      this.renderer = new dagreD3.render()
      const svg = d3.select(this.$el).select('svg.dagre')
        .attr('width', this.width)
        .attr('height', this.height)
      container = svg.select('g.container')
      // transform
      const transform = d3.zoomIdentity.translate(this.width / 5, this.height / 6).scale(1)
      this.zoom = d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on('zoom', this.zoomed)
      container.transition().duration(750).call(this.zoom.transform, transform)
      svg.call(this.zoom)

      this.strokeNodes()
      this.strokeEdges()
    },
    watch: {
      nodes () {
        this.strokeNodes()
      },
      edges () {
        this.strokeEdges()
      },
      // direction () {
      //   this.graph.setGraph({
      //     rankdir: this.direction
      //   })
      //   this.renderer(container, this.graph)
      // }
    }
  }
</script>

<style lang="scss">
  .dagreGraphDiv p{
    line-height:20px;
  }
  .edgePath path {
    stroke: #333;
    fill: #333;
    stroke-width: 1.5px;
  }
  /************ 图表变量 ***************/
  $fail: #ffebeb;
  $success: #61b2e4;
  $running: #87d86f;
  $skipped: #faec91;
  $queued: #43e3ed;
  $retry: #f8b96c;
  $no-status: #DDEED5;
  $upstream_failed: rgb(163, 108, 108);
  /**************** dagre 节点图************************/
  g.node.dagre {
    tspan {
      fill: #fff;
      cursor: pointer;
    }
    &.no-status {
      rect {
        stroke: #dcefd5;
        fill: #dcefd5;
      }
      ellipse {
        stroke: #333;
        fill: #fff;
      }
      circle {
        stroke: #333;
        fill: #fff;
      }
      tspan {
        fill: #333;
        font-size: 14px;
      }
    }
    &.success {
      rect {
        stroke: #fff;
        fill: $success;
      }
      ellipse {
        stroke: #fff;
        fill: $success;
      }
      circle {
        stroke: #fff;
        fill: $success;
      }
    }
    &.failed {
      rect {
        stroke: #fff;
        fill: $fail;
      }
      ellipse {
        stroke: #fff;
        fill: $fail;
      }
      circle {
        stroke: #fff;
        fill: $fail;
      }
      tspan {
        fill: #333;
        font-size: 14px;
      }
    }
    &.upstream_failed {
      rect {
        stroke: #fff;
        fill: $upstream_failed;
      }
      ellipse {
        stroke: #fff;
        fill: $upstream_failed;
      }
      circle {
        stroke: #fff;
        fill: $upstream_failed;
      }
    }
    &.running {
      rect {
        stroke: #fff;
        fill: $running;
      }
      ellipse {
        stroke: #fff;
        fill: $running;
      }
      circle {
        stroke: #fff;
        fill: $running;
      }
    }
    &.skipped {
      rect {
        stroke: #fff;
        fill: $skipped;
      }
      ellipse {
        stroke: #fff;
        fill: $skipped;
      }
      circle {
        stroke: #fff;
        fill: $skipped;
      }
    }
    &.queued {
      rect {
        stroke: #fff;
        fill: $queued;
      }
      ellipse {
        stroke: #fff;
        fill: $queued;
      }
      circle {
        stroke: #fff;
        fill: $queued;
      }
    }
    &.BashOperator {
      &:hover {
        & > rect {
          cursor: pointer;
          fill: #7cc9fa;
        }
      }
    }
    &.BranchPythonMapOperator {
      &:hover {
        & > ellipse {
          cursor: pointer;
          fill: #c52bd3;
        }
      }
    }
    &.JoinOperator {
      &:hover {
        & > circle {
          cursor: pointer;
          fill: #0beb8d;
        }
      }
    }
  }
  .zoom {
    margin-left: 40px;
  }
</style>
