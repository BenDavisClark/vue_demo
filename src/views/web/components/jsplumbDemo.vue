<template>
  <div data-demo-id="flowchart" id="flowchartCanvas">
    <div class="jtk-demo-main">
      <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="jsplumbCanvas">
        <template v-for="(item,index) in nodeList">
          <div class="window jtk-node flowchartDagre" v-if="item.type === 'table'" :class="item.id">
            <div class='dagreGraphDiv'>
              <p class='tableP' :id="item.id"><span>{{item.tableName}}</span></p>
              <ul v-for="fieldName in item.fieldName">
                <li>{{ fieldName }}</li>
              </ul>
            </div>
          </div>
          <div class="window jtk-node" :id="item.id" :class="item.id" v-else>
            <span>{{ item.mdName }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import jsplumb from 'jsplumb'

  export default {
    data () {
      return {
        widthOffest:0,
        topValue1:100,
        topValue2:100,
        nowHeight1:0,
        nowHeight2:0,
        bodyList:[],
        nodeList:[
          {
            type:'table',
            id:'Window1',
            isRoot:true,
            mdName:'',
            tableName:'信贷核心表',
            fieldName:['测试字段1','测试字段2','测试字段3']
          },
          {
            id:'Window2',
            type:'table',
            isRoot:false,
            mdName:'',
            tableName:'操作平台表',
            fieldName:['测试字段1','测试字段2','测试字段3']
          },
          {
            type:'system',
            id:'Window3',
            isRoot:false,
            mdName:'调度引擎',
            tableName:'',
            fieldName:[]
          },
          {
            type:'system',
            id:'Window4',
            isRoot:false,
            mdName:'系统核心',
            tableName:'',
            fieldName:[]
          },
          {
            type:'system',
            id:'Window5',
            isRoot:false,
            mdName:'数据库',
            tableName:'',
            fieldName:[]
          },
          {
            type:'system',
            id:'Window6',
            isRoot:false,
            mdName:'数据库',
            tableName:'',
            fieldName:[]
          }
        ],

        edgesList:[
          {
            from:'Window1',
            to:'Window5',
            label:'映射'
          },
          {
            from:'Window2',
            to:'Window1',
            label:'拷贝'
          },
          {
            from:'Window1',
            to:'Window4',
            label:'出发'
          },
          {
            from:'Window3',
            to:'Window1',
            label:'重构'
          },
          {
            from:'Window1',
            to:'Window6',
            label:'测试'
          }
        ]
      }
    },
    methods: {

    },
    created() {
    },
    mounted () {
      this.initData() //初始化数据
      let that = this
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
            id:"ARROW"
          } ],
          [ "Label", {
            location: 0.5,
            id: "label",
            cssClass: "aLabel"
          }]
        ],
        Container: "jsplumbCanvas"
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

      // 连接线样式
      var connectorPaintStyle = {
          strokeWidth: 1.5,
          stroke: "#CFDBE1",
          joinstyle: "round",
          outlineStroke: "white",
          outlineWidth: 2
        },
        // 连接线覆盖样式
        connectorHoverStyle = {
          strokeWidth: 2,
          stroke: "#43A5DF",
          outlineWidth: 5,
          outlineStroke: "white"
        },
        endpointHoverStyle = {
          fill: "#43A5DF",
          stroke: "#43A5DF"
        },
        // 源端点的定义
        sourceEndpoint = {
          endpoint: "Dot",
           paintStyle: {
              stroke: "#CFDBE1",
              fill: "transparent",
              radius: 3,
              strokeWidth: 1
          },
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
          paintStyle: { fill: "#7AB02C", radius: 7 },
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

        };

      var _addEndpoints = function (toId, sourceAnchors,targetAnchors) {

        for (var i = 0; i < sourceAnchors.length; i++) {
          var sourceUUID = toId + sourceAnchors[i];
          instance.addEndpoint(toId, sourceEndpoint, {
            anchor: sourceAnchors[i], uuid: sourceUUID
          });
        }
      };

      that.calculPosition()  //计算位置

      // 暂停绘画和初始化
      instance.batch(function () {

        let nodeList = that.bodyList;
        for(let i = 0;i< nodeList.length; i++) {
          if(nodeList[i].isRoot){
            _addEndpoints(nodeList[i].id, ["LeftMiddle", "RightMiddle"]);
          }else{
             if(nodeList[i].level == 1){
               _addEndpoints(nodeList[i].id, ["LeftMiddle"]);
             }
             if(nodeList[i].level == 2){
               _addEndpoints(nodeList[i].id, ["RightMiddle"]);
             }
          }
        }

        // 使所有节点可拖动
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });

        // 连接对象
        let edgesList = that.edgesList
        for(let i=0;i<edgesList.length;i++){
            if(edgesList[i].from === 'Window1'){
              instance.connect({uuids: [edgesList[i].from+"RightMiddle", edgesList[i].to+"LeftMiddle"],label:edgesList[i].label});
            }else{
              instance.connect({uuids: [edgesList[i].from+"RightMiddle", edgesList[i].to+"LeftMiddle"],label:edgesList[i].label});
            }
        }
      });

      jsPlumb.fire("jsPlumbDemoLoaded", instance);
    },
    methods:{
      //初始化数据结构
      initData(){
        let level = 1
        let num = 1
        let edgesList = this.edgesList
        let nodeList = this.nodeList
        let levelList = []
        let level1List = []
        let level2List = []
        for(let j=0;j<nodeList.length;j++) {
          if (nodeList[j].isRoot) {
            let levelListObj = {}
            levelListObj['level'] = 0
            levelListObj['isRoot'] = nodeList[j].isRoot
            levelListObj['type'] = nodeList[j].type
            levelListObj['id'] = nodeList[j].id
            levelListObj['mdName'] = nodeList[j].mdName
            levelListObj['tableName'] = nodeList[j].tableName
            levelListObj['fieldName'] = nodeList[j].fieldName
            levelList.push(levelListObj)
          }
        }

        for(let i=0;i<edgesList.length;i++) {
          for (let j = 0; j < nodeList.length; j++) {
            //组装level1数据
            if (edgesList[i].from === 'Window' + num) {
              if (edgesList[i].to === nodeList[j].id) {
                let level1ListObj = {}
                level1ListObj['level'] = level
                level1ListObj['type'] = nodeList[j].type
                level1ListObj['isRoot'] = nodeList[j].isRoot
                level1ListObj['id'] = nodeList[j].id
                level1ListObj['mdName'] = nodeList[j].mdName
                level1ListObj['tableName'] = nodeList[j].tableName
                level1ListObj['fieldName'] = nodeList[j].fieldName
                level1List.push(level1ListObj)
              }
            }
            //组装level2数据
            if (edgesList[i].to === 'Window' + num) {
              if (edgesList[i].from === nodeList[j].id) {
                let level2ListObj = {}
                level2ListObj['level'] = level+1
                level2ListObj['type'] = nodeList[j].type
                level2ListObj['id'] = nodeList[j].id
                level2ListObj['isRoot'] = nodeList[j].isRoot
                level2ListObj['mdName'] = nodeList[j].mdName
                level2ListObj['tableName'] = nodeList[j].tableName
                level2ListObj['fieldName'] = nodeList[j].fieldName
                level2List.push(level2ListObj)
              }
            }
          }
        }
        this.bodyList = levelList.concat(level1List).concat(level2List)
      },

      //计算节点位置
      calculPosition(){
        let that = this
        that.bodyList.map((node, index)=>{
          switch (node.level) {
            case 0:
              $("." + node.id).css({"left": "30em", "top": '12em'});
              break;
            case 1:
              $("." + node.id).css({"left": that.widthOffest+50 + 'em', "top": that.nowHeight1 + that.topValue1 + 50});
              that.topValue1 = $("." + node.id).position().top
              that.nowHeight1 = $("." + node.id).height()
              break;
            case 2:
              $("." + node.id).css({"left": that.widthOffest+10 + 'em', "top": that.nowHeight2 + that.topValue2 + 50});
              that.topValue2 = $("." + node.id).position().top
              that.nowHeight2 = $("." + node.id).height()
              break;
          }
        })

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/demo.css";
  @import "../../../assets/css/jsplumbtoolkit-defaults.css";
  @import "../../../assets/css/jsplumbtoolkit-demo.css";
  @import "../../../assets/css/main.css";
  .jtk-demo-main{
    .jtk-overlay{
       font-size:14px;
       color:#333;
    }
  }
  #flowchartCanvas{
    .flowchart-demo .window{
      min-width: 120px;
      span{
        font-size: 14px;
      }
    }
    .dagreGraphDiv{
      border :1px solid #CFDBE1;
      border-radius: 3px;
    }
    .flowchartDagre{
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
          text-align: center;
          height: 30px;
          border-radius: 2px;
          font-size:14px;
        }
        ul{
          padding: 5px;
          li{
            border: 1px dotted #ccc;
            line-height: 20px;
            font-size:12px;
          }
        }
      }

    }
    #jsplumbCanvas{
      position: relative;
      height: 700px;
      width: 100%;
      overflow: hidden;
    }
  }


</style>
