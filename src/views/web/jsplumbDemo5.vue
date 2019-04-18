<template>
  <div data-demo-id="flowchart" id="flowchartDemos">
    <div class="jtk-demo-main" >
      <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">

        <template v-for="item in nodeList" >
          <div class='dagreGraphDiv' :id=item.id>
            <p class='tableP' ><span class='tableName'>{{item.name}}</span></p>
            <ul v-if="item.children" >
              <li style="border:1px solid #ccc;" v-for="child in item.children" class="group" :id=child.id>{{child.name}}</li>
            </ul>
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
        baseZoom : 1,
        currHeight:0,
        widthOffest:25,
        topValue1:100,
        topValue2:100,
        topValue3:100,
        topValue4:100,
        topValue5:100,
        topValue6:100,
        topValue7:100,
        topValue8:100,
        topValue9:100,
        topValue10:100,
        topValue11:100,
        topValue12:100,
        nowHeight1:0,
        nowHeight2:0,
        nowHeight3:0,
        nowHeight4:0,
        nowHeight5:0,
        nowHeight6:0,
        nowHeight7:0,
        nowHeight8:0,
        nowHeight9:0,
        nowHeight10:0,
        nowHeight11:0,
        nowHeight12:0,
        bodyList :[],
        loc : 0,
        nodeList:[
          {
            level:0,
            isRoot:true,
            id:"Window1",
            name:'信贷核心表',
            children:[{
              name:'信贷核心表字段1',
              type:'field',
              id:'Window1-1',
              isRoot:true
            },
              {
                name:'信贷核心表字段2',
                type:'field',
                id:'Window1-2',
                isRoot:true
              }
          ]
          },
          {
            level:1,
            id:'Window2',
            name:'操作平台表',
            children:[{
              name:'信贷核心表字段1',
              type:'field',
              id:'Window2-1'
            },
              {
                name:'信贷核心表字段2',
                type:'field',
                id:'Window2-2'
              },
              {
                name:'信贷核心表字段3',
                type:'field',
                id:'Window2-3'
              }]
          },
          {
            level:2,
            id:'Window3',
            name:'测试表',
            children:[{
              name:'信贷核心表字段1',
              type:'field',
              id:'Window3-1',
              isRoot:true
            },
              {
                name:'信贷核心表字段2',
                type:'field',
                id:'Window3-2',
                isRoot:true
              }]
          }
        ],

        edgesList:[
          {
            from:'Window1-1',
            to:'Window2-1',
            label:'映射'
          },
          {
            from:'Window2-1',
            to:'Window2-2',
            label:'映射'
          },
          {
            from:'Window2-2',
            to:'Window3-2',
            label:'映射'
          },
          {
            from:'Window2-2',
            to:'Window2-3',
            label:'映射'
          }
        ]
      }
    },
    created() {
    },
    mounted () {
      //this.initData()
      this.currHeight = document.getElementById("canvas").offsetHeight-72
      var that = this
      //初始化jsPlumb
      var instance = window.jsp = jsPlumb.getInstance({
        // 默认拖动选项
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // 用于装饰每个连接的叠加层
        ConnectionOverlays: [
          /*  ["Custom", {
              create:function(component) {
                  return $("<select id='myDropDown'><option value='foo'>foo</option><option value='bar'>bar</option></select>");
              },
              location:0.7,
              id:"customOverlay"
            }]*/
          [ "Arrow", {
            location: [1] ,
            visible:true,
            width:5,
            length:5,
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
        paintStyle: { stroke: "red", strokeWidth: 4,fillStyle:"red" },
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
          outlineStroke: "CFDBE1",
          outlineWidth: 2
        },
        // 连接线覆盖样式
        connectorHoverStyle = {
          strokeWidth: 2,
          stroke: "#43A5DF",
          outlineWidth: 2,
          outlineStroke: "white"
        },
        endpointHoverStyle = {
          fill: "#43A5DF",
          stroke: "#43A5DF"
        },
        // 源端点的定义
        sourceEndpoint = {
          endpoint: "Blank",
          /*  paintStyle: {
              stroke: "#7AB02C",
              fill: "transparent",
              radius: 7,
              strokeWidth: 1
            },*/
          paintStyle: { fill: "#CFDBE1", radius: 4 },
          maxConnections: -1,
          isSource: true,
          connector: ["StateMachine", {curviness: -20}],//连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          Anchor:"Center",
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
        init = function (connection) {
          //var overlay = connection.getOverlay("ARROW");
          //var loc =parseInt((overlay.getLocation()).join(''))
          // that.loopHandle(overlay)
          // var timer =  setInterval(res=>{
          //   that.loopHandle(overlay)
          // },6000)
          //connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
          //connection.getOverlay("label").setLabel("映射");
        };



      //添加端点
      var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
          var sourceUUID = toId + sourceAnchors[i];
          console.log(sourceUUID)
          instance.addEndpoint(toId, sourceEndpoint, {
            anchor: sourceAnchors[i], uuid: sourceUUID
          });
        }
        // for (var j = 0; j < targetAnchors.length; j++) {
        //   var targetUUID = toId + targetAnchors[j];
        //   instance.addEndpoint("flowchart" + toId, targetEndpoint, {
        //     anchor: targetAnchors[j], uuid: targetUUID
        //   });
        // }
      };

      //that.calculPosition() //计算位置

      // 初始化节点
      instance.batch(function () {

        //添加锚点
        let nodeList = that.nodeList;
        for(let i = 0;i< nodeList.length; i++) {
          for(let j=0;j<nodeList[i].children.length;j++){
            _addEndpoints(nodeList[i].children[j].id, ["Top","Bottom","Right","Left"]);
          }
        }

        // 监听连接事件， 初始化连接
        // listen for new connections; initialise them the same way we initialise the connections at startup.
        instance.bind("connection", function (connInfo, originalEvent) {
          init(connInfo.connection);
        });

        // 使所有节点可拖动
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .group"), { grid: [20, 20] });

        //连接对象
        // let edgesList = that.edgesList
        // for(let i=0;i<edgesList.length;i++){
        //   instance.connect({uuids: [edgesList[i].from+"Right", edgesList[i].to+"Left"]});
        // }
        instance.connect({uuids: ["Window1-1Right", "Window2-1Left"]});
        instance.connect({uuids: ["Window2-1Bottom", "Window2-2Top"]});
        instance.connect({uuids: ["Window2-2Bottom", "Window2-3Top"]});
        instance.connect({uuids: ["Window2-2Right", "Window3-1Left"]});
        instance.connect({uuids: ["Window2-1Bottom", "Window2-1Bottom"]});
        // instance.connect({ source: "Window1-1", target: "Window2-1"});
        // instance.connect({ source: "Window2-1", target: "Window2-2"});

        // 监听连线点击事件，并提供删除点击连接事件
        instance.bind("click", function (conn, originalEvent) {
          // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
          //   instance.detach(conn);
          //conn.toggleType("basic");
        });

        //连线拖动事件
        instance.bind("connectionDrag", function (connection) {
          //console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });
        //连接拖动停止事件
        instance.bind("connectionDragStop", function (connection) {
          //console.log("connection " + connection.id + " was dragged");
        });
        //将现有连接的源或目标端点拖动到某个新位置
        instance.bind("connectionMoved", function (params) {
          //console.log("connection " + params.connection.id + " was moved");
        });
      });
      jsPlumb.fire("jsPlumbDemoLoaded", instance);

      //console.log(jsPlumb.setLocation())

    },

    methods:{
      //模拟箭头动态循环
      loopHandle(overlay){
        setTimeout(res=>{
          overlay.setLocation(0)
        },1000)

        setTimeout(res=>{
          overlay.setLocation(0.2)
        },2000)

        setTimeout(res=>{
          overlay.setLocation(0.4)
        },3000)

        setTimeout(res=>{
          overlay.setLocation(0.6)
        },4000)

        setTimeout(res=>{
          overlay.setLocation(0.8)
        },5000)

        setTimeout(res=>{
          overlay.setLocation(1)
        },6000)
      },
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
      },

      //初始化数据结构
      initData(){
        let level = 1
        let num = 1
        let edgesList = this.edgesList
        let nodeList = this.nodeList
        let levelList = []
        let level1List = []
        let level2List = []
        let level3List = []
        let level4List = []
        let level5List = []
        let level6List = []
        let level7List = []
        let level8List = []
        let level9List = []
        let level10List = []
        let level11List = []
        let level12List = []

        for(let j=0;j<nodeList.length;j++) {
          if (nodeList[j].id === 'Window1') {
            let levelListObj = {}
            levelListObj['level'] = 0
            levelListObj['type'] = nodeList[j].type
            levelListObj['id'] = nodeList[j].id
            levelListObj['mdName'] = nodeList[j].mdName
            levelListObj['tableName'] = nodeList[j].tableName
            levelListObj['selectedFieldName'] = nodeList[j].selectedFieldName
            levelListObj['fieldName'] = nodeList[j].fieldName
            levelList.push(levelListObj)
          }
        }
        for(let i=0;i<edgesList.length;i++){
          for(let j=0;j<nodeList.length;j++){
            let level1ListObj = {}
            //组装level1数据
            if(edgesList[i].from === 'Window'+num){
              if(edgesList[i].to === nodeList[j].id){
                level1ListObj['level'] = level
                level1ListObj['type'] = nodeList[j].type
                level1ListObj['id'] = nodeList[j].id
                level1ListObj['mdName'] = nodeList[j].mdName
                level1ListObj['tableName'] = nodeList[j].tableName
                level1ListObj['selectedFieldName'] = nodeList[j].selectedFieldName
                level1ListObj['fieldName'] = nodeList[j].fieldName
                level1List.push(level1ListObj)
              }
            }
            //组装level2数据
            for(let k=0;k<level1List.length;k++){
              if(edgesList[i].from === level1List[k].id){
                if( edgesList[i].to  == nodeList[j].id ){
                  let level2ListObj = {}
                  level2ListObj['level'] = level+1
                  level2ListObj['type'] = nodeList[j].type
                  level2ListObj['id'] = nodeList[j].id
                  level2ListObj['mdName'] = nodeList[j].mdName
                  level2ListObj['tableName'] = nodeList[j].tableName
                  level2ListObj['selectedFieldName'] = nodeList[j].selectedFieldName
                  level2ListObj['fieldName'] = nodeList[j].fieldName
                  level2List.push(level2ListObj)
                }
              }
            }

            //组装level3数据
            for(let h=0;h<level2List.length;h++){
              if(edgesList[i].from === level2List[h].id){
                if( edgesList[i].to  == nodeList[j].id ){
                  let level3ListObj = {}
                  level3ListObj['level'] = level+2
                  level3ListObj['type'] = nodeList[j].type
                  level3ListObj['id'] = nodeList[j].id
                  level3ListObj['mdName'] = nodeList[j].mdName
                  level3ListObj['tableName'] = nodeList[j].tableName
                  level3ListObj['selectedFieldName'] = nodeList[j].selectedFieldName
                  level3ListObj['fieldName'] = nodeList[j].fieldName
                  level3List.push(level3ListObj)
                }
              }
            }

            //组装level4数据
            for(let n=0;n<level3List.length;n++){
              if(edgesList[i].from === level3List[n].id){
                if( edgesList[i].to  == nodeList[j].id ){
                  let level4ListObj = {}
                  level4ListObj['level'] = level+3
                  level4ListObj['type'] = nodeList[j].type
                  level4ListObj['id'] = nodeList[j].id
                  level4ListObj['mdName'] = nodeList[j].mdName
                  level4ListObj['tableName'] = nodeList[j].tableName
                  level4ListObj['selectedFieldName'] = nodeList[j].selectedFieldName
                  level4ListObj['fieldName'] = nodeList[j].fieldName
                  level4List.push(level4ListObj)
                }
              }
            }
          }
        }
        this.bodyList = levelList.concat(level1List).concat(level2List).concat(level3List).concat(level4List)
      },
      //计算节点位置
      calculPosition(){
        let that = this
        that.bodyList.map((node, index)=>{
          switch (node.level) {
            case 0:
              $("."+node.id).css({"left":"5em","top":"18em"});
              break;
            case 1:
              $("." + node.id).css({"left": that.widthOffest + 'em', "top": that.nowHeight1 + that.topValue1 + 50});
              that.topValue1 = $("." + node.id).position().top
              that.nowHeight1 = $("." + node.id).height()
              break;
            case 2:
              $("."+node.id).css({"left":that.widthOffest+20+'em',"top":(that.nowHeight2 + that.topValue2+50)+'px'});
              that.topValue2 = $("."+node.id).position().top
              that.nowHeight2 = $("."+node.id).height()
              break;
            case 3:
              $("."+node.id).css({"left":that.widthOffest+40+'em',"top":(that.nowHeight3 + that.topValue3+50)+'px'});
              that.topValue3 = $("."+node.id).position().top
              that.nowHeight3 = $("."+node.id).height()
              break;
            case 4:
              $("."+node.id).css({"left":that.widthOffest+60+'em',"top":(that.nowHeight4 + that.topValue4+50)+'px'});
              that.topValue4 = $("."+node.id).position().top
              that.nowHeight4 = $("."+node.id).height()
              break;
            case 5:
              $("."+node.id).css({"left":that.widthOffest+80+'em',"top":(that.nowHeight5 + that.topValue5+50)+'px'});
              that.topValue5 = $("."+node.id).position().top
              that.nowHeight5 = $("."+node.id).height()
              break;
            case 6:
              $("."+node.id).css({"left":that.widthOffest+100+'em',"top":(that.nowHeight6 + that.topValue6+50)+'px'});
              that.topValue6 = $("."+node.id).position().top
              that.nowHeight6 = $("."+node.id).height()
              break;
            case 7:
              $("."+node.id).css({"left":that.widthOffest+120+'em',"top":(that.nowHeight7 + that.topValue7+50)+'px'});
              that.topValue7 = $("."+node.id).position().top
              that.nowHeight7 = $("."+node.id).height()
              break;
            case 8:
              $("."+node.id).css({"left":that.widthOffest+140+'em',"top":(that.nowHeight8 + that.topValue8+50)+'px'});
              that.topValue8 = $("."+node.id).position().top
              that.nowHeight8 = $("."+node.id).height()
              break;
            case 9:
              $("."+node.id).css({"left":that.widthOffest+160+'em',"top":(that.nowHeight9 + that.topValue9+50)+'px'});
              that.topValue9 = $("."+node.id).position().top
              that.nowHeight9 = $("."+node.id).height()
              break;
            case 10:
              $("."+node.id).css({"left":that.widthOffest+180+'em',"top":(that.nowHeight10 + that.topValue10+50)+'px'});
              that.topValue10 = $("."+node.id).position().top
              that.nowHeight10 = $("."+node.id).height()
              break;

            case 11:
              $("."+node.id).css({"left":that.widthOffest+200+'em',"top":(that.nowHeight11 + that.topValue11+50)+'px'});
              that.topValue11 = $("."+node.id).position().top
              that.nowHeight11 = $("."+node.id).height()
              break;

            case 12:
              $("."+node.id).css({"left":that.widthOffest+220+'em',"top":(that.nowHeight12 + that.topValue12+50)+'px'});
              that.topValue12 = $("."+node.id).position().top
              that.nowHeight12 = $("."+node.id).height()
              break;
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/css/demo.css";
  @import "../../assets/css/jsplumbtoolkit-defaults.css";
  @import "../../assets/css/jsplumbtoolkit-demo.css";
  @import "../../assets/css/main.css";

  #flowchartDemos{
    //其它节点
    .dagreGraphDiv{
      position:absolute;
      border:1px solid #CFDBE1;
      border-radius: 3px;
      width: auto;
      min-width: 140px;
      p{
        width: auto;
        line-height:20px;
        color:#fff;
        padding: 5px;
        text-align: left;
        .mdName{
          padding:0 5px;
          color:#333;
          font-size: 14px;
        }
      }
      .tableP{
        background: url('../../assets/images/Bd-1.png' );
        background-color: #CFDBE1;
        background-repeat: no-repeat;
        border-radius: 2px;
        background-size: 17px 17px;
        background-position: 7px 3px;
        color:#333;
        padding: 0 28px;
        height: 22px;
        border-radius: 2px;
        font-size:14px;
      }
      ul{
        li{
          line-height: 30px;
          font-size: 13px;
          margin: 35px 10px;
          text-align: center;
        }
      }
    }
    #canvas{
      position: relative;
      height: 700px;
      width: 100%;
      overflow: hidden;
    }

    #Window1 { left:20px;top:150px; }
    #Window2 { left:250px;top:150px; }
    #Window3 { left:500px;top:150px; }
    #Window4 { left:750px;top:150px; }
  }

</style>
