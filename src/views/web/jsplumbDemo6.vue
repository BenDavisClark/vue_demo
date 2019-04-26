<template>
  <el-container class="container" id="work-container">
    <el-aside width="200px" :style="{'maxHeight':clientHeight + 'px', 'overflow-y':'scroll'}">
      <div class="box-card">
        <div class="header">模块一</div>
        <div class="card-body">
          <div class="item" v-for="(item,inx) in list" :key="inx" :data-icon="item.icon" :data-text="item.name"
               :data-type="item.type">
            <i :class="[item.icon,item.type]"></i>
            <span class="text">{{item.name}}</span>
            <!--<img src="../../assets/images/remove.png" style="float: right;height: 20px;" @click="deleteNode(item)"/>-->
          </div>
        </div>
        <div class="header">模块二</div>
        <ul class="template-list">
          <li class="item" :class="{'active':idx===currScenarioIdx}" v-for="(item,idx) in scenarioList" :key="item.id" @click="handleClickTemp(item.id, idx)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </el-aside>

    <el-main :style="{'maxHeight':clientHeight + 'px', 'overflow-y':'scroll'}">
      <el-button class="btn-save" @click="saveChart" type="success" size="small">保存</el-button>
      <el-button class="btn-save-img" @click="saveChartImg" type="info" size="small">保存为图片</el-button>
      <el-button plain icon="el-icon-delete" class="btn-clean-img" @click="isShowCleanDialog = true" size="small">清除
      </el-button>

      <div class="jtk-demo demo-groups">
        <div id="workplace"
             class="workplace">
          <span></span>
          <chart-node v-for="(item, idx) in chartData.nodes"
                      v-bind="item"
                      :key="idx"
                      @edit="editNode(item,idx)"
                      @deleteNode="deleteNode(item)"
          ></chart-node>

          <div class="group"
               :id="item.id"
               :group="item.id"
               v-for="item in groupChartList"
               :style="item.groupStyle">
            <p>
              <span>{{item.name}}</span>
              <span class="del" delete-all @click="deleteGroup(item)"><i class="el-icon-error" style="font-size: 16px"></i></span>
            </p>
            <div :id=item.id+1 class="coor"></div>
          </div>

        </div>


      </div>
    </el-main>


    <el-aside width="200px" :style="{'maxHeight':clientHeight + 'px', 'overflow-y':'scroll'}">
      <div class="template-box">
        <div class="header">分组列表
          <!--<i class="el-icon-circle-plus-outline add" title="新建" @click="handleClickTemp()"></i>-->
          <i class="el-icon-circle-plus-outline add" title="新建模板" @click="createTemp()"></i>
        </div>

        <ul class="group-card">
          <li class="item" v-for="(item,index) in groupList" :key="index" :data-text="item.name" :data-type="item.type"
              style="font-size: 14px;padding-left: 7px;line-height: 30px;">
            <span class="text">{{item.name}}</span>
            <!--<img src="../../assets/images/remove.png" style="float: right;height: 20px;margin-top:5px;" @click="deleteGroup(item)"/>-->
          </li>
        </ul>
      </div>
    </el-aside>

    <!-- 节点属性设置弹出层 -->
    <el-dialog :visible.sync="dialogFormVisible2">
      <div slot="title">属性设置</div>
      <el-form :model="nodeForm" ref="nodeForm" :label-width="formLabelWidth">
        <el-form-item label="节点名称">
          <el-input v-model="nodeForm.nodeName" placeholder="请输入节点名称" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveNodeEdit">确 定</el-button>
          <el-button @click="cancelSaveNodeEdit">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog title="新增分组" :visible.sync="dialogFormVisible3">
      <el-form :model="tempForm" ref="tempForm" :label-width="formLabelWidth">
        <el-form-item label="分组名称">
          <el-input v-model="tempForm.name" auto-complete="off" placeholder="请输入模板名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTempSave">取 消</el-button>
        <el-button type="primary" @click="submitTempSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="属性设置" :visible.sync="dialogFormVisible4">
      <el-form  :label-width="formLabelWidth">
        <el-form-item label="连接线说明">
          <el-input v-model="lineDescName" auto-complete="off" placeholder="请输入连接线说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDescSave">取 消</el-button>
        <el-button type="primary" @click="submitDescSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="isShowCleanDialog"
      width="30%"
      center>
      <span>确认清除画布？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCleanDialog = false">取 消</el-button>
        <el-button type="primary" @click="cleanGraph">确 定</el-button>
      </span>
    </el-dialog>


    <div id="canvasDiv" style='display: none;'></div>

  </el-container>
</template>

<script>
  import ChartNode from '../../components/jsplumb/ChartNode'
  import html2canvas from 'html2canvas'
  export default {
    name: 'DemoChart',
    data () {
      return {
        currSourceId:'', //当前连线点击的sourceId
        currTargetId:'', //当前连线点击的targetId
        instance:null,  //jsplumb实例
        currScenarioIdx: -1,
        clientHeight : 0,
        nodeId: '', //节点id
        lineDescName:'', //连线说明
        conn:'', //连线实例
        groupList: [   //分组数据
          {
            id: 'group',
            name: '第一组',
            type: 'group'
          },
          {
            id: 'group1',
            name: '第二组',
            type: 'group'
          }
        ],
        scenarioList:[   //场景数据
          {
            'name': '场景一',
            'id': 'json.2.json'
          }
        ],
        groupChartList: [],  //分组拖到画布中的数据
        tempForm: {},      //分组表单
        isShowCleanDialog: false,   //画布
        dialogFormVisible2: false,  //节点编辑弹框
        dialogFormVisible3: false,   //新增分组
        dialogFormVisible4:false,    //连接线编辑弹框
        formLabelWidth: '100px',
        nodeForm: {       //节点表单
          nodeName: ''
        },
        list: [   //节点数据
          {
            id: 'node1',
            icon: 'el-icon-star-on',
            name: '节点1',
            type: 'diamond'
          },
          {
            id: 'node2',
            icon: 'el-icon-date',
            name: '节点2',
            type: 'diamond'
          },
          {
            id: 'node3',
            icon: 'el-icon-time',
            name: '节点3',
            type: 'diamond'
          },
          {
            id: 'node4',
            icon: 'el-icon-bell',
            name: '节点4',
            type: 'diamond'
          }
        ],
        chartData: {
          nodes: [],        //画布中的节点数据
          connections: []  //画布中的关系数据
        }
      }
    },
    mounted () {
      this.clientHeight = document.body.clientHeight
      // 禁用浏览器默认菜单
      $(document).bind('contextmenu', (e) => {
        e.preventDefault()
      })
      jsPlumb.ready(() => {
        this.initInstance()
      })
      //
      // this.groupChartList.forEach((item,index)=>{
      //   idrag(item.id,'coor')
      // })
    },
    methods: {
      //初始化jsplumb
      initInstance(){
        const _self = this
        // 默认配置
        this.instance = jsPlumb.getInstance({
          Endpoint: [
            'Blank',
            {cssClass: 'chart-dot', hoverClass: 'chart-dot-hover', radius: 5}
          ],
          Connector: ['StateMachine',{curviness: -10}],
          HoverPaintStyle: {stroke: '#1e8151', strokeWidth: 2},
          ConnectionOverlays: [
            [
              'Arrow',
              {
                location: 1,
                visible: true,
                width: 11,
                height: 11,
                id: 'Arrow'
              }
            ],
             ["Label", { label: "", id: "label", cssClass: "aLabel" }]
          ],
          Container: 'workplace'
        })
        var canvas = document.getElementById('workplace')
        this.instance.registerConnectionType("basic", { anchor:"Perimeter", connector:"StateMachine" });
        // 监听连接线点击事件
        this.instance.bind('click', function (c) {
          console.log(c)
          _self.lineDescName = ''
          _self.currSourceId = c.sourceId
          _self.currTargetId = c.targetId
          _self.conn = _self.instance.connect({
            source:c.sourceId,
            target:c.targetId
          });
          _self.dialogFormVisible4 = true
          //this.instance.deleteConnection(c)  //删除连接线
        })

        // 监听 connection 事件
        this.instance.bind('connection', function (info) {
          console.log(info)
          //_self.initConn(info.connection);
          //info.connection.getOverlay('label').setLabel(info.connection.id)
        })

        // 监听拖动connection 事件，判断是否有重复链接
        this.instance.bind('beforeDrop', function (info) {
           //info.connection.getOverlay("label").setLabel(info.connection.id);
          // 判断是否已有该连接
          let isSame = true;
          _self.chartData.connections.forEach(item => {
            if ((item.targetId === info.targetId && item.sourceId === info.sourceId) ||
              (item.targetId === info.sourceId && item.sourceId === info.targetId)
            ) {
              isSame = false;
            }
          });
          if (isSame) {
            _self.chartData.connections.push({
              targetId: info.targetId,
              sourceId: info.sourceId,
              label: ''
            });
          } else {
            _self.$message.error("不允许重复连接！");
          }
          return isSame;
        })

        // bind a double click listener to "canvas"; add new node when this occurs.
        // jsPlumb.on(canvas, "dblclick", function(e) {
        //   newNode(e.offsetX, e.offsetY);
        // });

        this.draggableInit()//注册拖动事件

        // 暂停渲染，执行以下操作
        this.instance.batch(() => {
          jsPlumb.getSelector('.workplace-chart').forEach(item => {
            _self.initNode(item)
          })
        })
        //
        // this.groupChartList.forEach((item, index) => {
        //   this.addGroup(item)
        // })

        // this.$nextTick(() => {
        //   this.handleClickTemp('json.2.json',0)
        // })
        // jsPlumb.fire("jsPlumbDemoLoaded", this.instance);
      },

      /**
       * 初始化相关事件及操作
       */
      addGroup (item) {
        let jsp = this.instance
        jsp.addGroup({
          el: document.getElementById(item.id), // el元素，必须为DOM元素。TypeError: Cannot create property '_isJsPlumbGroup' on string 'group'
          id: item.id, // dom元素上group属性 必填
          draggable: true, // 默认情况下设置为true。如果为false，则不会将Group元素设置为可拖动元素。
          dragOptions: {}, // 基于 katavorio.js 插件dragOptions
          droppable: true, // 默认设置为true。如果为false，则Group元素将不允许将元素拖放到其上，以便将它们添加到Group
          dropOptions: {
            drop (p) {
              //console.log(p)
            }
          }, // 基于 katavorio.js dropOptions
          proxied: true, // 当组折叠时，应通过附加到组元素的连接来代理与组内子元素（从组外部发出）的连接。

          revert: true, // 默认情况下设置为true 子元素在组外部丢弃（而不是在另一个接受可丢弃组的组上）将在mouseup上恢复到组内的最后位置。
          prune: false, // 默认设置为false。如果为true，则将从Group元素外部的空白中删除的子元素将从group和jsPlumb的实例中删除，并且还将清除连接到该元素的任何连接。
          orphan: false, // 默认设置为false。如果为true，则将从Group元素外部的空白中删除的子元素将从Group中删除，但不会从jsPlumb的实例中删除。
          constrain: false, // 默认情况下设置为false。如果为true，则子元素仅限于在Group元素内拖动。
          ghost: false, // 默认设置为false。如果为true，则拖出Group元素之外的子元素将保留其原始元素，并使用鼠标跟踪'ghost'元素 - 原始的克隆 - 替换。
          dropOverride: false, // 默认为false。如果为true，则可以将子元素拖动到Group元素之外（假设没有其他标志阻止此元素），但可能不会将其拖放到其他Group上。

          collapsed: true, // 折叠状态
          anchor: 'Perimeter', // 代理端点
          endpoint: ['Dot', {radius: 5}]
        })
        this.draggableInit()
        // this.instance.removeGroup("firGroup"); // 删除，第二个参数为true时，删除时删除所有子元素及连接
        // this.instance.removeFromGroup(someElement); // 从组中删除元素
        // this.instance.collapseGroup("aGroup");
        // this.instance.expandGroup("aGroup");
        // this.instance.addToGroup("firGroup", start);
      },

      // 初始化node节点和连线配置
      initNode (el) {
        // initialise draggable elements.
        // 元素拖动，基于 katavorio.js 插件
        let _self = this
        this.instance.draggable(el, {
          //containment: true, //是否限制节点拖动区域
          start (params) {
            // 拖动开始
            // console.log(params);
          },
          drag (params) {
            // 拖动中
            // console.log(params);
          },
          stop (params) {
            // console.log(params);
            // 拖动结束
            let id = params.el.id
            _self.chartData.nodes.forEach(item => {
              if (item.id === id) {
                item.nodeStyle.left = params.pos[0] + 'px'
                item.nodeStyle.top = params.pos[1] + 'px'
              }
            })
          }
        })

        //创建并分配一个新的端点
        this.instance.makeSource(el, {
          filter: '.ep',
          // anchor: "Continuous",
          anchor: ['Perimeter', {shape: 'Rectangle'}],
          connectorStyle: {
            stroke: '#5c96bc',
            strokeWidth: 1,
            outlineStroke: 'transparent',
            outlineWidth: 2
          },
          extract: {
            action: 'the-action'
          },
          maxConnections: -1,
          onMaxConnections: function (info, e) {
            alert('Maximum connections (' + info.maxConnections + ') reached')
          }
        })

        this.instance.makeTarget(el, {
          dropOptions: {hoverClass: 'dragHover'},
          anchor: ['Perimeter', {shape: 'Rectangle'}],
          allowLoopback: false //是否可以回环
        })

        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //
        this.instance.fire('jsPlumbDemoNodeAdded', el)
        // // 绑定右击弹出框
        // const $el = $(`#${el.id}`)
        // $el.mouseup(() => {
        //   // 右键
        //   // if (3 == e.which) {
        //   //   createPopupMenu(el);
        //   //   $("#menu").menu("show", {
        //   //     left: e.clientX,
        //   //     top: e.clientY,
        //   //   });
        //   // }
        //
        //   console.log('right click trigger')
        // })
        // $el.dblclick(() => {
        //   console.log('dbclick trigger')
        //   // var data = instance.graphModel.nodes.find(function (node) { //获取元素的信息
        //   //   return node.id === el.id;
        //   // });
        //   // if(data){
        //   //   var elementData = getElementData().find(function (el) { //获取节点类型的通用信息
        //   //     return el.typeId === data.typeId;
        //   //   });
        //   //   if(elementData){
        //   //     showNodeIntroduce(elementData);
        //   //     showNodeInstanceImage(elementData);
        //   //     //展示节点需要编辑的属性
        //   //     showNodeProperty(data, elementData);
        //   //
        //   //   }
        //   // }
        // })
      },
      //初始化箭头动画效果
      initConn (connection) {
        let _self = this
        var overlay = connection.getOverlay("Arrow");
        _self.loopHandle(overlay)
        _self.timer =  setInterval(res=>{
          _self.loopHandle(overlay)
        },6000)
        //connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
        //connection.getOverlay("label").setLabel("映射");
      },
      //初始化拖动事件
      draggableInit () {
        const _self = this
        // 将模块拖入画板中
        $('.box-card .item').draggable({
          scope: 'plant',
          helper: 'clone',
          containment: $('#work-container')
        })
        $('.group-card .item').draggable({
          scope: 'plant',
          helper: 'clone',
          containment: $('#work-container')
        })
        $('#workplace').droppable({
          scope: 'plant',
          drop: function (ev, ui) {
            //console.log(ev, ui)
            let helper = ui.helper
            let id = jsPlumbUtil.uuid()
            //区分组和节点
            if (helper.attr('data-type') === 'group') {
              let tempObj = {
                id,
                type: helper.attr('data-type'),
                name: helper.attr('data-text'),
                groupStyle: {
                  top: ui.position.top - 20 + 'px',
                  left: ui.position.left - 460 + 'px',
                  width:'',
                  height:''
                }
              }
              _self.groupChartList.push(tempObj)
              _self.$nextTick(() => {
                 // _self.addGroup(tempObj)
                _self.idrag(id,id+1)
              })

            } else {
              let item = {
                id,
                icon: helper.attr('data-icon'),
                type: helper.attr('data-type'),
                text: helper.attr('data-text'),
                nodeStyle: {
                  top: ui.position.top - 20 + 'px',
                  left: ui.position.left - 460 + 'px'
                }
              }
              _self.chartData.nodes.push(item)
              _self.$nextTick(() => {
                _self.initNode(id)
              })

            }

          }
        })
      },

      // 保存关系
      saveChart () {
        this.$message.success('关系保存成功')
        //this.dialogFormVisible = true
        console.log(this.chartData)  //节点数据
        console.log(this.groupChartList) //分组数据
        // jsPlumb.repaintEverything();
      },
      /**
       * @description 取消保存
       */
      cancelSave () {
        //this.dialogFormVisible = false
        this.$message.info('已取消保存')
      },

      /**
       * @description 模板点击事件
       * @param {String} id 场景id
       */
      handleClickTemp(id, idx) {
        let _self = this
        this.currScenarioIdx = idx;
        this.chartData = {
          nodes: [],
          connections: []
        };
        //this.instance.empty("workplace");
        if (id) {
          _self.groupChartList =[
            {
              id:'01a5f6da-e2e0-4f5e-bb4f-b09987ee5a13',
                name:'第一组',
              type:'group',
              groupStyle:{
              top:'20px',
                left:'100px',
                width:'200px',
                height:'200px'
            }
            },
            {
              id:'5318d603-e3cc-4c62-ac14-419a13b554f1',
                name:'第二组',
              type:'group',
              groupStyle:{
                top:'55px',
                  left:'400px',
                  width:'200px',
                  height:'200px'
              }
            },
            {
              id: '5318d603-2323-4c62-ac14-419a13b554f1',
              name: '第三组',
              type: 'group',
              groupStyle: {
                top: '305px',
                left: '120px',
                width: '200px',
                height: '200px'
              }
            },
            {
              id: '5318d603-e3cc-4c62-ac14-419a13b55423',
              name: '第四组',
              type: 'group',
              groupStyle: {
                top: '355px',
                left: '400px',
                width: '200px',
                height: '200px'
              }
            }]


          let url = "./static/json/" + id;
          this.$axios.get(url).then(res => {
            this.chartData = res.data;
            this.$nextTick(() => {
              _self.chartData.nodes.forEach(item => {
                _self.initNode(item.id);
              });
              _self.chartData.connections.forEach(item => {
                _self.instance.connect({
                  source: item.sourceId,
                  target: item.targetId,
                  label: ''
                });
              });
            });
          }).catch(err => {
            console.log(err);
          });
          _self.$nextTick(()=>{
            _self.groupChartList.forEach((item,index)=>{
              _self.idrag(item.id,item.id+1)
            })

          })
        }
      },

      /**
       * @description 双击触发节点编辑事件
       * @param {Object} item 节点当前数据
       * @param {Number} idx 下标
       */
      editNode (item, idx) {
        this.nodeForm.nodeName = ''
        this.nodeId = item.id
        this.dialogFormVisible2 = true
      },
      /**
       * @description 节点编辑保存
       */
      saveNodeEdit () {
        let that = this
        let arr = this.chartData.nodes
        arr.forEach((item, index) => {
          if (item.id === that.nodeId) {
            item.text = that.nodeForm.nodeName
          }
        })

        this.$message.success('保存成功')
        this.dialogFormVisible2 = false
      },

      /**
       * @description 取消保存
       */
      cancelSaveNodeEdit () {
        this.dialogFormVisible2 = false
      },
      /**
       * @description 保存为图片
       */
      saveChartImg () {
        var statemachinediv = document.getElementById('workplace')
        html2canvas(statemachinediv).then(canvas => {
          //   onrendered: function(canvas) {
          $('#canvasDiv').empty()
          document.getElementById('canvasDiv').appendChild(canvas)
          var svgList = $(statemachinediv).find('svg')
          svgList.each(function (index, value) {
            try {
              var svgExample = this
              var serializer = new XMLSerializer()
              var svgMarkup = serializer.serializeToString(svgExample)
              //console.log(svgMarkup)
              if (svgMarkup.indexOf('_jsPlumb_connector') > -1) {
                var leftIndex = svgMarkup.indexOf('left: ')
                var endOfLeft = svgMarkup.indexOf('px', leftIndex)
                var leftPosition = svgMarkup.substring(
                  leftIndex + 6,
                  endOfLeft
                )
                var left = parseInt(leftPosition)

                var topIndex = svgMarkup.indexOf('top: ')
                var endOfTop = svgMarkup.indexOf('px', topIndex)
                var topPosition = svgMarkup.substring(topIndex + 5, endOfTop)
                var top = parseInt(topPosition)

                svgMarkup = svgMarkup.replace(
                  'xmlns="http://www.w3.org/2000/svg"',
                  ''
                )

                var connectorCanvas = document.createElement('canvas')
                canvg(connectorCanvas, svgMarkup) //add connector to canvas

                var context = canvas.getContext('2d')
                context.drawImage(connectorCanvas, left, top)
              }
            } catch (err) {
              //showBalloon('error in print')
            }
          })
          let ctx = canvas.getContext('2d')
          var image = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream')
          // window.location.href=image; // it will save locally
          var saveFile = function (data, filename) {
            var save_link = document.createElementNS(
              'http://www.w3.org/1999/xhtml',
              'a'
            )
            save_link.href = data
            save_link.download = filename

            var event = document.createEvent('MouseEvents')
            event.initMouseEvent(
              'click',
              true,
              false,
              window,
              0,
              0,
              0,
              0,
              0,
              false,
              false,
              false,
              false,
              0,
              null
            )
            save_link.dispatchEvent(event)
          }
          // 下载后的问题名
          var filename = '流程图' + new Date().getTime() + '.png'
          // download
          saveFile(image, filename)
        })
      },

      //新增模板
      createTemp () {
        this.tempForm.name = ''
        this.dialogFormVisible3 = true
      },
      //新增模板取消保存
      cancelTempSave () {
        this.dialogFormVisible3 = false
      },
      //新增连接线
      submitDescSave(){
        console.log(this._self.lineDescName)
        let _self = this
        let conns = _self.chartData.connections

        conns.forEach((item,index) => {
          if(item.sourceId === _self.currSourceId && item.targetId === _self.currTargetId){
            conns[index].label=_self.lineDescName
          }
        });
        //console.log( this.lineDescName)
        this.conn.setLabel(this.lineDescName)
        this.dialogFormVisible4 = false
        this.$message.success('保存成功')
      },
      //取消连接线
      cancelDescSave(){
        this.dialogFormVisible4 = false
      },

      //新增模板保存
      submitTempSave () {
        let that = this
        this.dialogFormVisible3 = false
        this.$message.success('保存成功')
        let tempObj = {}
        tempObj['name'] = this.tempForm.name
        tempObj['id'] = 'group3'
        tempObj['type'] = 'group'
        this.groupList.push(tempObj)
        // this.$nextTick(() => {
        //   that.draggableInit() //重新注册拖动事件
        //   that.addGroup(tempObj)
        // })
      },

      //清除画布
      cleanGraph () {
        this.isShowCleanDialog = false
        this.groupChartList = []
        this.chartData.nodes = []
        this.chartData.connections = []
        this.instance.deleteEveryEndpoint()
        this.instance.deleteEveryConnection()
      },

      //删除组
      deleteGroup (group) {
        this.$confirm('确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let arr = this.groupChartList
          arr.splice(arr.findIndex(item => item.id == group.id), 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      //删除节点
      deleteNode (node) {
        this.instance.remove(node.id) //用于删除dom、点、线也就是删除相关的一切
        //this.instance.deleteConnectionsForElement(node.id) //删除连线
      },
      /**
       * @description 模拟箭头动态循环
       */
      loopHandle(overlay){
        if(overlay._jsPlumb != null){
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
        }
      },
      //实现网页元素任意放大、缩小、拖拽、移动
      idrag(fatherEl,el){
        let _self = this
        $(document).mousemove(function(e) {

          if (!!this.move) {
            var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
              callback = document.call_down || function() {
                $(this.move_target).css({
                  'top': e.pageY - posix.y,
                  'left': e.pageX - posix.x
                });
              };

            callback.call(this, e, posix);
          }
        }).mouseup(function(e) {
          if (!!this.move) {
            var callback = document.call_up || function(){};
            callback.call(this, e);
            $.extend(this, {
              'move': false,
              'move_target': null,
              'call_down': false,
              'call_up': false
            });
          }
        });

        var $box = $('#'+fatherEl).mousedown(function(e) {
          var offset = $(this).offset();
          var posLeft = $(this).position().left
          var posTop = $(this).position().top
          this.posix = {'x': e.pageX-posLeft, 'y': e.pageY - posTop};
          $.extend(document, {'move': true, 'move_target': this});
        }).on('mousedown', '#'+el, function(e) {
          var posix = {
            'w': $box.width(),
            'h': $box.height(),
            'x': e.pageX,
            'y': e.pageY
          };

          $.extend(document, {'move': true, 'call_down': function(e) {
              _self.groupChartList.forEach((item, index) => {
                if(item.id == fatherEl){
                  _self.groupChartList[index].groupStyle.width = $box.width()+'px'
                  _self.groupChartList[index].groupStyle.height = $box.height() +'px'
                }
              })

              $box.css({
                'width': Math.max(30, e.pageX - posix.x + posix.w),
                'height': Math.max(30, e.pageY - posix.y + posix.h)
              });
            }});
          return false;
        });
      }
    },
    components: {
      ChartNode
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/index.scss";

   .template-list {
    padding: 5px;
    color: #000;
    .item{
      line-height: 35px;
      cursor: pointer;
      color: #545c64;
      font-size: 14px;
      text-align: center;
      margin:0;
      &:hover{
        color:#409EFF;
      }
    }
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
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
  .del, .node-collapse {
    position:absolute;
    top:2px;
    right:2px;
    /* background-color:#ccc; */
    padding:1px;
    cursor:pointer;
    font-size:13px;
    width:20px;
    height:20px;
    border-radius: 50%;
    text-align:center;
    display:block;
    line-height: 30px;
  }
  .group {
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    p {
      display: block;
      background: url('../../assets/images/Bd-1.png')  no-repeat;
      background-color: #EFF4f8;
      background-size: 17px 17px;
      background-position: 7px 10px;
      color: #333;
      padding: 10px 10px 10px 28px;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-top-left-radius:3px;
      border-top-right-radius:3px;
    }
    &:hover{
      border: 1px solid #5c96bc;
      p{
        background: url('../../assets/images/Bd.png') no-repeat;
        padding: 10px 10px 10px 28px;
        background-size: 17px 17px;
        background-position: 7px 10px;
        background-color: #5c96bc;
        border-color: #5c96bc;
        border-top-left-radius:3px;
        border-top-right-radius:3px;
        color: white;
      }
    }
  }

  .coor {
    width: 10px;
    height: 10px;
    overflow: hidden;
    cursor: se-resize;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #09C;
  }


</style>
