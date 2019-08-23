<template>
  <div class="container" id="work-container">
    <div class="main">
      <div class="workplace" id="workplace">
        <chart-node
          v-for="(item, idx) in chartData.nodes"
          v-bind="item"
          :key="idx"
        ></chart-node>
      </div>
    </div>


  </div>
</template>

<script>
  import ChartNode from "@/components/jsplumb/ChartNode1";
  export default {
    name: "DemoChart",
    data() {
      return {
        scenarioList:[
          {
          'name': '场景一',
          'id': 'json.1.json'
          }
        ],
        jsp: null,
        chartData: {
          nodes: [],
          connections: [],
          props: {}
        }
      }
    },
    mounted() {
      const _self = this;
      jsPlumb.ready(() => {
        // 默认配置
        var instance = jsPlumb.getInstance({
          Endpoint: [
            "Blank",
            { cssClass: "chart-dot", hoverClass: "chart-dot-hover", radius: 5 }
          ],
          Connector: "Straight",
          HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
          ConnectionOverlays: [
            [
              "Arrow",
              {
                location: 1,
                visible: true,
                width: 11,
                height: 11,
                id: "Arrow"
              }
            ]
            // ["Label", { label: "-", id: "label", cssClass: "aLabel" }]
          ],
          Container: "workplace"
        });

        this.jsp = instance;
      });

      this.$nextTick(() => {
        _self.handleClickTemp('json.1.json',0)
      })
    },
    methods: {
      // 初始化node节点
      initNode(el) {

        this.jsp.makeSource(el, {
          filter: ".ep",
          anchor: "Continuous",
          // anchor: ["Perimeter", { shape: "Rectangle" }],
          connectorStyle: {
            stroke: "#5c96bc",
            strokeWidth: 2,
            outlineStroke: "transparent",
            outlineWidth: 4
          },
          extract: {
            action: "the-action"
          },
          maxConnections: -1,
          onMaxConnections: function(info, e) {
            alert("Maximum connections (" + info.maxConnections + ") reached");
          }
        });

        this.jsp.makeTarget(el, {
          dropOptions: { hoverClass: "dragHover" },
          anchor: ["Perimeter", { shape: "Rectangle" }],
          allowLoopback: false
        });
      },
      /**
       * @description 模板点击事件
       * @param {String} id 场景id
       */
      handleClickTemp(id, idx) {
        this.currScenarioIdx = idx;
        this.chartData = {
          nodes: [],
          connections: [],
          props: {}
        };
        if (id) {
          let url = "./static/json/" + id;
          this.$axios.get(url).then(res => {
            this.chartData = res.data;
            this.$nextTick(() => {
              this.chartData.nodes.forEach(item => {
                this.initNode(item.id);
              });
              this.chartData.connections.forEach(item => {
                this.jsp.connect({
                  source: item.sourceId,
                  target: item.targetId
                });
              });
            });
          }).catch(err => {
            console.log(err);
          });
        }
      },
    },
    components: {
      ChartNode
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/index";
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  .main {
    position: relative;
  }
  .workplace {
    width: 100%;
    height: 100%;
    position: relative;
  }
  #start {
    top: 50px;
    left: 50px;
  }
  .btn-clear {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 100px;
    z-index: 1;
  }
  .item {
    text-align: center;
    margin: 0;
    cursor: pointer;
    i {
      width: 60px;
      height: 60px;
      line-height: 60px;
      background-size: 85%;
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      font-size: 20px;
      color: #409eff;
      cursor: pointer;
      margin-bottom: 5px;
      margin-right: 0!important;
      -ms-touch-action: none;
      touch-action: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    span {
      display: block;
    }
  }

  .box-card .card-body .item {
    display: inline-block;
    padding-left: 10px;
    padding-top: 10px;
  }
</style>
