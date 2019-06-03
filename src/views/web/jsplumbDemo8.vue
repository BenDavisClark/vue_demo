<template>
  <el-container class="container work-main" id="work-container">
    <el-main>
      <div class="workplace" id="workplace">
        <chart-node
          v-for="(item, idx) in chartData.nodes"
          v-bind="item"
          :key="idx"
          @edit="editNode(item,idx)"
        ></chart-node>

        <div class="group"
             :id="item.id"
             :group="item.id"
             v-for="item in groupList"
             :style="item.groupStyle">
          <div class="titleName">
            <p>
              {{item.name}}
            </p>
          </div>
        </div>
      </div>
    </el-main>

    <el-dialog title="场景保存" :visible.sync="dialogFormVisible">
      <el-form :model="chartForm" ref="chartForm" :label-width="formLabelWidth">
        <el-form-item label="场景名称">
          <el-input v-model="chartForm.name" auto-complete="off" placeholder="请输入场景名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSave">取 消</el-button>
        <el-button type="primary" @click="submitSave">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 节点属性设置弹出层 -->
    <el-dialog :visible.sync="dialogFormVisible2">
      <div slot="title">属性设置</div>
      <el-form :model="nodeForm" ref="nodeForm" :label-width="formLabelWidth">
        <!--<el-form-item :label="obj.displayName" v-for="(obj, idx) in busiTypePropsMap[currEditItem.busiType]" :key="idx">-->
        <!--<el-input type="text" v-model="nodeForm[obj.keyName]" />-->
        <!--</el-form-item>-->
        <el-form-item label="节点名称" >
          <el-input v-model="nodeForm.name" placeholder="请输入节点名称" style="width:100%"></el-input>
        </el-form-item>

        <!-- <el-form-item label="属性1">
          <el-input v-model="nodeForm.attr1" type="text" placeholder="请输入属性1"/>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="saveNodeEdit">确 定</el-button>
          <el-button @click="cancelSaveNodeEdit">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="属性设置" :visible.sync="dialogFormVisible3">
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
  </el-container>
</template>

<script>
  import ChartNode from "@/components/jsplumb/ChartNode1";
  export default {
    name: "DemoChart",
    data() {
      return {
        currSourceId:'', //当前连线点击的sourceId
        currTargetId:'', //当前连线点击的targetId
        timer:0,
        connShow:true,
        currScenarioIdx: -1,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3:false,
        conn:'',
        lineDescName:'', //连线说明
        chartForm: {
          name: ""
        },
        formLabelWidth: "100px",
        nodeForm: {
          name:''
        },
        jsp: null,
        chartData: {
          nodes: [],
          connections: [],
          props: {}
        },
        groupList:[
          {
            id:'01a5f6da-e2e0-4f5e-bb4f-b09987ee5a13',
            name:'客户端',
            type:'group',
            groupStyle:{
              width:'100%',
              height:'300px'
            }
          },
          {
            id:'5318d603-e3cc-4c62-ac14-419a13b554f1',
            name:'服务端',
            type:'group',
            groupStyle:{
              width:'100%',
              height:'300px'
            }
          },
          {
            id: '5318d603-2323-4c62-ac14-419a13b554f1',
            name: '后端存储',
            type: 'group',
            groupStyle: {
              width: '100%',
              height: '300px'
            }
          },
        ],
        currEditItem: {
          busiType: ""
        }
      };
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
          //Connector: "Straight",
          Connector:["Flowchart", { stub: [0, 0], gap: 0, cornerRadius: 0, alwaysRespectStubs: true }],
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
        var canvas = document.getElementById("workplace");

        //点击连接线
        instance.bind("click", function(c) {

          //console.log(c)
          _self.lineDescName = ''
          _self.currSourceId = c.sourceId
          _self.currTargetId = c.targetId
          _self.conn = _self.jsp.connect({
            source:c.sourceId,
            target:c.targetId
          });
          let conns = _self.chartData.connections

          conns.forEach((item,index) => {
            if(item.sourceId === _self.currSourceId && item.targetId === _self.currTargetId){
              _self.lineDescName = conns[index].label
            }
          });
          instance.deleteConnection(c);
          _self.dialogFormVisible3 = true
           instance.deleteConnection(c);
          // let arr = _self.chartData.connections
          // let idx = arr.findIndex(item => {
          //   return item.sourceId === c.sourceId &&  item.targetId === c.targetId;
          // });
          // arr.splice(idx,1)
        });

        // 监听 connection 事件
        instance.bind("connection", function(info) {
          //_self.initConn(info.connection);
          // info.connection.getOverlay("label").setLabel(info.connection.id);
        });
        // 监听拖动connection 事件，判断是否有重复链接
        instance.bind("beforeDrop", function(info) {
          // info.connection.getOverlay("label").setLabel(info.connection.id);
          // console.log(info);
          // 判断是否已有该连接
          let isSame = true;
          _self.chartData.connections.forEach(item => {
            if ((item.targetId === info.targetId && item.sourceId === info.sourceId) ||
              (item.targetId === info.sourceId && item.sourceId === info.targetId)) {
              isSame = false;
            }
          });
          if (isSame) {
            _self.chartData.connections.push({
              targetId: info.targetId,
              sourceId: info.sourceId
            });
          } else {
            _self.$message.error("不允许重复连接！");
          }
          return isSame;
        });

        // bind a double click listener to "canvas"; add new node when this occurs.
        // jsPlumb.on(canvas, "dblclick", function(e) {
        //   newNode(e.offsetX, e.offsetY);
        // });
        // 将模块拖入画板中
        $(".box-card .item").draggable({
          scope: "plant",
          helper: "clone",
          containment: $("#work-container")
        });
        $("#workplace").droppable({
          scope: "plant",
          drop: function(ev, ui) {
            // console.log(ev, ui);
            let helper = ui.helper;
            let id = jsPlumbUtil.uuid();
            let item = {
              id,
              icon: helper.attr("data-icon"),
              busiType: helper.attr("data-busitype"),
              text: helper.attr("data-text"),
              nodeStyle: {
                top: ui.position.top - 20 + "px",
                left: ui.position.left - 460 + "px"
              },
              props: {}
            };

            _self.chartData.nodes.push(item);
            _self.$nextTick(() => {
              _self.initNode(id);
            });
          }
        });

        // 暂停渲染，执行以下操作
        instance.batch(() => {
          jsPlumb.getSelector(".workplace-chart").forEach(item => {
            _self.initNode(item);
          });
        });
      });

      this.$nextTick(() => {
        _self.handleClickTemp('json.3.json',0)
      })
    },
    methods: {
      //新增连接线
      submitDescSave(){
        let _self = this
        let conns = _self.chartData.connections
        console.log(_self.lineDescName)

        conns.forEach((item,index) => {
          if(item.sourceId === _self.currSourceId && item.targetId === _self.currTargetId){
            conns[index].label=_self.lineDescName
          }
        });
        //console.log( this.lineDescName)
        this.conn.setLabel(this.lineDescName)
        this.dialogFormVisible3 = false
        this.$message.success('保存成功')
      },
      //取消连接线
      cancelDescSave(){
        this.dialogFormVisible3 = false
      },
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

      // 初始化node节点
      initNode(el) {
        let _self = this;
        this.jsp.draggable(el, {
          containment: true,
          start(params) {
            // 拖动开始
            // console.log(params);
          },
          drag(params) {
            // 拖动中
            // console.log(params);
          },
          stop(params) {
            // 拖动结束
            //console.log(params);
            let id = params.el.id;
            _self.chartData.nodes.forEach(item => {
              if (item.id === id) {
                item.nodeStyle.left = params.pos[0] + "px";
                item.nodeStyle.top = params.pos[1] + "px";
              }
            });
          }
        });

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
       * @description 取消保存
       */
      cancelSave() {
        this.dialogFormVisible = false;
        this.chartForm = {
          name: ""
        };
        this.$message.info("已取消保存");
      },
      submitSave() {
        this.dialogFormVisible = false;
        this.chartData.props = this.chartForm;
        this.$message.success("保存成功");
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
        //this.jsp.empty("workplace");
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
                  target: item.targetId,
                  label:item.label
                });
              });
            });
          }).catch(err => {
            console.log(err);
          });
        }
      },
      /**
       * @description 双击触发节点编辑事件
       * @param {Object} item 节点当前数据
       * @param {Number} idx 下标
       */
      editNode(item, idx) {
        this.nodeForm.name=''
        this.currEditItem = JSON.parse(JSON.stringify(item));
        this.dialogFormVisible2 = true;
      },
      /**
       * @description 节点编辑保存
       */
      saveNodeEdit() {
        // 验证表单
        if (this.verifyNodeForm()) {
          this.$message.success("保存成功");
          this.dialogFormVisible2 = false;
        }
        let idx = this.chartData.nodes.findIndex(item => {
          return item.id === this.currEditItem.id;
        });
        this.chartData.nodes[idx].text = JSON.parse(JSON.stringify(this.nodeForm.name));
      },
      /**
       * @description 节点保存验证
       */
      verifyNodeForm() {
        let flag = false;
        if (this.nodeForm.name === "") {
          this.$message.warning("节点名称不能为空");
        }  else {
          flag = true;
        }
        return flag;
      },
      /**
       * @description 取消保存
       */
      cancelSaveNodeEdit() {
        this.dialogFormVisible2 = false;
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
      }
    },
    components: {
      ChartNode
    }
  };
</script>
<style lang="scss" >
  .work-main{
    min-height:1000px!important;
    .el-main{
      min-height:1000px!important;
      overflow: unset!important;
    }
    .jtk-overlay{
      background-color:#2d8cf0;
      color:#fff!important;
      padding:3px;
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../assets/style/index.scss";
  .work-main{
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
      top: 20px;
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
    .group {
      /*border: 1px solid #EFF4f8;*/
      position: relative;
      .titleName{
        float: left;
        display: block;
        background-color: #EFF4f8;
        color: #333;
        padding: 10px;
        height:100%;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /*writing-mode: vertical-lr;*/
        /*-webkit-writing-mode: vertical-lr;*/
        /*-ms-writing-mode: vertical-lr;*/
        text-align:center;
        letter-spacing:2px;
        width: 50px;
      }
      p {
        margin-top: -24px;
        margin-left: -8px;
        position: absolute;
        top: 50%;
        transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        filter:progid:DXImageTransform.Microsoft.BasicImage(Rotation=1); //IE滤镜 rotation 有4个值 0 1 2 3 ；0是不旋转 1=90度 2=180度 3=270度
      }
      &:hover{
        //border: 1px solid #5c96bc;
      }
    }
  }

</style>
