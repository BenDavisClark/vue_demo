<template>
  <div data-demo-id="flowchart">
    <div>
      <el-button  @click="zoomIn()">放大</el-button>
      <el-button @click="zoomOut()">缩小</el-button>
    </div>
    <div class="jtk-demo-main">
      <!-- demo -->
      <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">
        <div class="window jtk-node flowchartDagre flowchartDemo">
          <div class='dagreGraphDiv'>
            <p ><span>测试数据库</span></p>
            <p class='tableP'><span>测试表</span></p>
            <ul>
              <li>测试字段1</li>
              <li  id="flowchartWindow2">测试字段2</li>
            </ul>
          </div>
        </div>
        <!--<div class="window jtk-node" id="flowchartWindow1"><strong>信贷核心</strong></div>-->
        <div class="window jtk-node flowchartDagre flowchartDemo2" >
          <div class='dagreGraphDiv'>
            <p ><span>信贷核心</span></p>
            <p class='tableP'><span>测试表</span></p>
            <ul>
              <li id="flowchartWindow1">测试字段1</li>
              <li >测试字段2</li>
            </ul>
          </div>
        </div>

        <!--<div class="window jtk-node" id="flowchartWindow2"> <strong>操作平台</strong> </div>-->
        <div class="window jtk-node" id="flowchartWindow3"><strong>调度引擎</strong></div>
        <div class="window jtk-node" id="flowchartWindow4"><strong>系统核心</strong></div>
        <!--<div class="window jtk-node" id="flowchartWindow5"><strong>数据库</strong></div>-->
        <div class="window jtk-node flowchartDagre flowchartDemo1">
          <div class='dagreGraphDiv'>
            <p ><span>系统核心</span></p>
            <p class='tableP'><span >测试表</span></p>
            <ul>
              <li id="flowchartWindow5">测试字段1</li>
              <li >测试字段2</li>
            </ul>
          </div>
        </div>
        <div class="window jtk-node flowchartDagre flowchartDemo3">
          <div class='dagreGraphDiv'>
            <p ><span>测试数据库1</span></p>
            <p class='tableP'><span >测试表</span></p>
            <ul>
              <li id="flowchartWindow6">测试字段1</li>
              <li >测试字段2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import jsplumb from 'jsplumb'

  export default {
    data () {
      return {
         baseZoom : 1
      }
    },
    methods: {
      //缩小
      zoomOut(){
        this.baseZoom -= 0.1
        if (this.baseZoom < 0.5) {
          this.baseZoom = 1
        }
        this.zoomScale(this.baseZoom)
      },
      //放大
      zoomIn(){
        this.baseZoom += 0.1
        this.zoomScale(this.baseZoom)
      },

      zoomScale (scale) {
        $("#canvas").css({
          "-webkit-transform": `scale(${scale})`,
          "-moz-transform": `scale(${scale})`,
          "-ms-transform": `scale(${scale})`,
          "-o-transform": `scale(${scale})`,
          "transform": `scale(${scale})`
        })
        jsPlumb.setZoom(0.75);
      }
    },
    created() {
    },
    mounted () {
      var instance = window.jsp = jsPlumb.getInstance({
        // 默认拖动选项
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // 用于装饰每个连接的叠加层。 请注意，标签叠加使用函数来生成标签文本; 在这
        // 例：它返回我们在下面的'init'方法中的每个连接上设置的'labelText'成员。
        ConnectionOverlays: [
          [ "Arrow", {
            location: 1,
            visible:true,
            width:11,
            length:11,
            id:"ARROW",
            events:{
              click:function() { alert("you clicked on the arrow overlay")}
            }
          } ],
          [ "Label", {
            location: 0.5,
            id: "label",
            cssClass: "aLabel",
            events:{
              tap:function() { alert("hey"); }
            }
          }]
        ],
        Container: "canvas"
      });

      var basicType = {
        connector: "StateMachine",
        paintStyle: { stroke: "red", strokeWidth: 4 },
        hoverPaintStyle: { stroke: "blue" },
        overlays: [
          "Arrow"
        ]
      };
      instance.registerConnectionType("basic", basicType);

      // 这是连接线样式
      var connectorPaintStyle = {
          strokeWidth: 2,
          stroke: "#61B7CF",
          joinstyle: "round",
          outlineStroke: "white",
          outlineWidth: 2
        },
        // 连接线覆盖样式
        connectorHoverStyle = {
          strokeWidth: 3,
          stroke: "#216477",
          outlineWidth: 5,
          outlineStroke: "white"
        },
        endpointHoverStyle = {
          fill: "#216477",
          stroke: "#216477"
        },
        // 源端点的定义（小蓝点）
        sourceEndpoint = {
          endpoint: "Dot",
        /*  paintStyle: {
            stroke: "#7AB02C",
            fill: "transparent",
            radius: 7,
            strokeWidth: 1
          },*/
          paintStyle: { fill: "#7AB02C", radius: 5 },
          maxConnections: -1,
          isSource: true,
          connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
          connectorStyle: connectorPaintStyle,
          hoverPaintStyle: endpointHoverStyle,
          connectorHoverStyle: connectorHoverStyle,
          dragOptions: {},
          overlays: [
            [ "Label", {
              location: [0.5, 1.5],
              label: "Drag",
              cssClass: "endpointSourceLabel",
              visible:false
            } ]
          ]
        },
        // 目标端点的定义（将在用户拖动连接时显示）
        targetEndpoint = {
          endpoint: "Dot",
          paintStyle: { fill: "#7AB02C", radius: 5 },
          hoverPaintStyle: endpointHoverStyle,
          maxConnections: -1,
          dropOptions: { hoverClass: "hover", activeClass: "active" },
          connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
          connectorStyle: connectorPaintStyle,
          hoverPaintStyle: endpointHoverStyle,
          connectorHoverStyle: connectorHoverStyle,
          isTarget: true,
          overlays: [
            [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
          ]
        },
        init = function (connection) {
          //connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
          //connection.getOverlay("label").setLabel("映射");
        };

      var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {

        for (var i = 0; i < sourceAnchors.length; i++) {
          var sourceUUID = toId + sourceAnchors[i];
          instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
            anchor: sourceAnchors[i], uuid: sourceUUID
          });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
          var targetUUID = toId + targetAnchors[j];
          instance.addEndpoint("flowchart" + toId, targetEndpoint, {
            anchor: targetAnchors[j], uuid: targetUUID
          });
        }
      };

      // 暂停绘画和初始化
      instance.batch(function () {

        _addEndpoints("Window4", ["LeftMiddle",], []);
        _addEndpoints("Window2", ["LeftMiddle"], ["RightMiddle"]);
        _addEndpoints("Window3", ["LeftMiddle"], []);
        _addEndpoints("Window5", ["LeftMiddle"], []);
        _addEndpoints("Window6", ["LeftMiddle"], []);
        _addEndpoints("Window1", [ "RightMiddle"], []);

        // 监听连接事件， 初始化连接
        // listen for new connections; initialise them the same way we initialise the connections at startup.
        instance.bind("connection", function (connInfo, originalEvent) {
          init(connInfo.connection);
        });

        // 使所有窗口div可拖动
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
        // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
        // method, or document.querySelectorAll:
        //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

        // 连接对象
       // instance.connect({uuids: ["Window2BottomCenter", "Window3TopCenter"]});
        //instance.connect({uuids: ["Window2LeftMiddle", "Window4LeftMiddle"]});
       // instance.connect({uuids: ["Window4TopCenter", "Window4RightMiddle"]});
        instance.connect({uuids: ["Window1RightMiddle", "Window2LeftMiddle"]});
        //instance.connect({uuids: ["Window3RightMiddle", "Window2RightMiddle"]});
        //instance.connect({uuids: ["Window3RightMiddle", "Window2RightMiddle"]});
        instance.connect({uuids: ["Window1RightMiddle", "Window4LeftMiddle"]});
        instance.connect({uuids: ["Window1RightMiddle", "Window3LeftMiddle"] });
        instance.connect({uuids: ["Window1RightMiddle", "Window5LeftMiddle"] });
        instance.connect({uuids: ["Window2RightMiddle", "Window6LeftMiddle"] });
        //

        //
        // 监听连线点击事件，并提供删除点击连接事件
        instance.bind("click", function (conn, originalEvent) {
          // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
          //   instance.detach(conn);
          //conn.toggleType("basic");
        });

        instance.bind("connectionDrag", function (connection) {
          console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        instance.bind("connectionDragStop", function (connection) {
          console.log("connection " + connection.id + " was dragged");
        });

        instance.bind("connectionMoved", function (params) {
          console.log("connection " + params.connection.id + " was moved");
        });
      });

      jsPlumb.fire("jsPlumbDemoLoaded", instance);
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/demo.css";
  @import "../../assets/css/jsplumbtoolkit-defaults.css";
  @import "../../assets/css/jsplumbtoolkit-demo.css";
  @import "../../assets/css/main.css";
.flowchartDagre{
  border:1px solid #3CADDC;
  height:auto!important;
  width:auto!important;
  padding:0!important;
  .dagreGraphDiv{
    p{
      width: 120px;
      line-height:20px;
      background: #3CADDC;
      color:#fff;
      padding: 5px;
      text-align: left;
    }
    .tableP{
      background-color: #CFDBE1;
      background-repeat: no-repeat;
      border-radius: 2px;
      background-size: 17px 17px;
      background-position: 7px 3px;
      color:#333;
      padding: 0 5px;
      height: 22px;
      border-radius: 2px;
    }
    ul{
      li{
        text-align: left;
        padding-left:18px;
        line-height: 20px;
      }
    }
  }
}
  .flowchartDemo{
    top: 5em;
    left: 25em;
  }

  .flowchartDemo1{
    top: 15em;
    left: 25em;
  }

  .flowchartDemo2{
    top: 24em;
    left: 5em;
  }

  .flowchartDemo3{
    top: 10em;
    left: 45em;
  }



</style>
