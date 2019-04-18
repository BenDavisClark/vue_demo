<template>
  <div data-demo-id="flowchart" id="flowchartCanvasData">
    <div class="jtk-demo-main">
      <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="jsplumbCanvas">
        <template v-for="item in nodeList">
          <div class="window jtk-node" :id="item.id" :class="item.id" :title="item.label">
            <span>{{ item.label }}</span>
          </div>
        </template>
        <span class="linkToMe">关联我的指标</span>
        <span class="myIndex">我关联的指标</span>
      </div>
    </div>
  </div>
</template>
<script>
  import jsplumb from 'jsplumb'

  export default {
    data () {
      return {
        widthOffest: 0,
        topValue1: 100,
        topValue2: 100,
        nowHeight1: 0,
        nowHeight2: 0,
        domWidth: 0,
        instance: '',
        bodyList: [],
        nodeList: [
          {
            id: 'Window1',
            isRoot: true,
            label: '根节点',
          },
          {
            id: 'Window2',
            isRoot: false,
            label: '数据标准核心2测试',
          },
          {
            id: 'Window3',
            isRoot: false,
            label: '数据标准核心3',
          },
          {
            id: 'Window4',
            isRoot: false,
            label: '数据标准核心4',
          },
          {
            id: 'Window5',
            isRoot: false,
            label: '数据标准核心5测试长度超出',
          },
          {
            id: 'Window6',
            isRoot: false,
            label: '数据标准核心6',
          },
          {
            id: 'Window7',
            isRoot: false,
            label: '数据标准核心7',
          }
        ],

        edgesList: [
          {
            from: 'Window1',
            to: 'Window2'
          },
          {
            from: 'Window1',
            to: 'Window3'
          },
          {
            from: 'Window1',
            to: 'Window4'
          },
          {
            from: 'Window5',
            to: 'Window1'
          },
          {
            from: 'Window6',
            to: 'Window1'
          },
          {
            from: 'Window7',
            to: 'Window1'
          }
        ]
      }
    },
    created () {
    },
    mounted () {
      let that = this
      this.domWidth = $('#flowchartCanvasData').width()
      $("#flowchartCanvasData .linkToMe").css({"left":this.domWidth/2-140,top:'220px'})
      $("#flowchartCanvasData .myIndex").css({"left":this.domWidth/2+100,top:'220px'})
      this.initData() //组装数据
      this.initJsPlumb() //初始化JsPlumb
      this.initInsance() //重新渲染
    },
    methods: {
      //删除所有连线和点
      deleteEveryEndpoint () {
        this.instance.deleteEveryEndpoint()
      },
      //初始化实例
      initJsPlumb () {
        let that = this
        //初始化jsPlumb
        this.instance = jsPlumb.getInstance({
          // 默认拖动选项
          DragOptions: {cursor: 'pointer', zIndex: 2000},
          // 用于装饰每个连接的叠加层
          ConnectionOverlays: [
            ['Arrow', {
              location: 1,
              visible: false,
              width: 11,
              length: 11,
              id: 'ARROW'
            }],
            ['Label', {
              location: 0.5,
              id: 'label',
              cssClass: 'aLabel'
            }]
          ],
          Container: 'jsplumbCanvas'
        })
      },

      //初始化数据结构
      initData () {
        let level = 1
        let num = 1
        let edgesList = this.edgesList
        let nodeList = this.nodeList
        let levelList = []
        let level1List = []
        let level2List = []
        for (let j = 0; j < nodeList.length; j++) {
          if (nodeList[j].isRoot) {
            let levelListObj = {}
            levelListObj['level'] = 0
            levelListObj['isRoot'] = nodeList[j].isRoot
            levelListObj['label'] = nodeList[j].label
            levelListObj['id'] = nodeList[j].id
            levelList.push(levelListObj)
          }
        }

        for (let i = 0; i < edgesList.length; i++) {
          for (let j = 0; j < nodeList.length; j++) {
            //组装level1数据
            if (edgesList[i].from === 'Window' + num) {
              if (edgesList[i].to === nodeList[j].id) {
                let level1ListObj = {}
                level1ListObj['level'] = level
                level1ListObj['isRoot'] = nodeList[j].isRoot
                level1ListObj['label'] = nodeList[j].label
                level1ListObj['id'] = nodeList[j].id
                level1List.push(level1ListObj)
              }
            }
            //组装level2数据
            if (edgesList[i].to === 'Window' + num) {
              if (edgesList[i].from === nodeList[j].id) {
                let level2ListObj = {}
                level2ListObj['level'] = level + 1
                level2ListObj['isRoot'] = nodeList[j].isRoot
                level2ListObj['label'] = nodeList[j].label
                level2ListObj['id'] = nodeList[j].id
                level2List.push(level2ListObj)
              }
            }
          }
        }
        this.bodyList = levelList.concat(level1List).concat(level2List)
      },
      //重新渲染
      initInsance () {
        let that = this
        var basicType = {
          connector: 'StateMachine',
          paintStyle: {stroke: 'red', strokeWidth: 3},
          hoverPaintStyle: {stroke: 'blue'},
          overlays: [
            'Arrow'
          ]
        }
        this.calculPosition()  //计算位置
        // 暂停绘画和初始化
        that.instance.batch(function () {

          let nodeList = that.bodyList
          for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].isRoot) {
              that.addEndpoints(nodeList[i].id, ['LeftMiddle', 'RightMiddle'])
            } else {
              if (nodeList[i].level == 1) {
                that.addEndpoints(nodeList[i].id, ['LeftMiddle'])
              }
              if (nodeList[i].level == 2) {
                that.addEndpoints(nodeList[i].id, ['RightMiddle'])
              }
            }
          }

          // 使所有节点可拖动
          that.instance.draggable(jsPlumb.getSelector('.flowchart-demo .window'), {grid: [20, 20]})

          // 连接对象
          let edgesList = that.edgesList
          for (let i = 0; i < edgesList.length; i++) {
            if (edgesList[i].from === 'Window1') {
              that.instance.connect({
                uuids: [edgesList[i].from + 'RightMiddle', edgesList[i].to + 'LeftMiddle']
              })
            } else {
              that.instance.connect({
                uuids: [edgesList[i].from + 'RightMiddle', edgesList[i].to + 'LeftMiddle']
              })
            }
          }
        })
        that.instance.registerConnectionType('basic', basicType)
        jsPlumb.fire('jsPlumbDemoLoaded', that.instance)
      },
      //计算节点位置
      calculPosition () {
        let that = this
        that.bodyList.map((node, index) => {
          switch (node.level) {
            case 0:
              $("#flowchartCanvasData"+" ."+node.id).css({ 'left': (that.domWidth) / 2 -50 + 'px', 'top': '220px'})
              break
            case 1:
              $("#flowchartCanvasData"+" ."+node.id).css({
                'left': (that.domWidth) / 2 + 300 + 'px',
                'top': (that.nowHeight1 + that.topValue1 + 50)+'px'
              })
              that.topValue1 = $("#flowchartCanvasData"+" ."+node.id).position().top
              that.nowHeight1 = $("#flowchartCanvasData"+" ."+node.id).height()
              break
            case 2:
              $('#flowchartCanvasData' + ' .' + node.id).css({
                'left': (that.domWidth) / 2 - 400 + 'px',
                'top': (that.nowHeight2 + that.topValue2+50)+'px'
              })
              that.topValue2 = $("#flowchartCanvasData"+" ."+node.id).position().top
              that.nowHeight2 = $("#flowchartCanvasData"+" ."+node.id).height()
              break
          }
        })

      },
      //添加端点
      addEndpoints (toId, sourceAnchors, targetAnchors) {

        // 连接线样式
        var connectorPaintStyle = {
            strokeWidth: 1,
            stroke: '#CFDBE1',
            joinstyle: 'round',
            outlineStroke: 'CFDBE1',
            outlineWidth: 1
          },
          // 连接线覆盖样式
          connectorHoverStyle = {
            strokeWidth: 2,
            stroke: '#43A5DF',
            outlineWidth: 2,
            outlineStroke: '43A5DF'
          },
          endpointHoverStyle = {
            fill: '#43A5DF',
            stroke: '#43A5DF'
          },
          // 端点的定义
          sourceEndpoint = {
            endpoint: 'Dot',
            paintStyle: {
              stroke: '#CFDBE1',
              fill: 'transparent',
              radius: 3,
              strokeWidth: 1
            },
            maxConnections: -1,
            isSource: true,
            connector: ['Flowchart', {stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true}],
            connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
              ['Label', {
                location: [1],
                label: 'Drag',
                cssClass: 'endpointSourceLabel',
                visible: false
              }]
            ]
          }
        let that = this
        for (var i = 0; i < sourceAnchors.length; i++) {
          var sourceUUID = toId + sourceAnchors[i]
          that.instance.addEndpoint(toId, sourceEndpoint, {
            anchor: sourceAnchors[i], uuid: sourceUUID
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/demo.css";
  @import "../../assets/css/jsplumbtoolkit-defaults.css";
  @import "../../assets/css/jsplumbtoolkit-demo.css";
  @import "../../assets/css/main.css";

  #flowchartCanvasData {
    .flowchart-demo .window {
      height:40px;
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      white-space: nowrap;
      line-height: 20px;
      border-radius: 50px;
      &:hover{
        border:1px solid #1890FF;
      }
      span {
        font-size: 14px;
        color: #1890FF;
      }
    }
    #Window1{
      height:45px;
      border-radius: 5px;
      border-top: 5px solid #1890FF;
      span{
        color:#333;
      }
    }
    #jsplumbCanvas {
      position: relative;
      height: 600px;
      width: 100%;
      overflow: hidden;
      background-color:#F5F7F9;
    }
    .linkToMe{
      font-size: 12px;
      position: absolute;
    }
    .myIndex{
      font-size: 12px;
      position: absolute;
    }
  }


</style>
