<template>
  <div id="tableDatas">
    <div class="app-container">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" border fit stripe style="with:100%" id="tableData">
        <el-table-column prop="dates" label='分组名称' style="width:10%"></el-table-column>
        <el-table-column prop="name" label="分组类型" style="width:25%"></el-table-column>
        <el-table-column prop="address" label="所属上级分组" style="width:45%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.org_id)" icon="el-icon-edit">编辑</el-button>
            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row.org_id)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <a id="down_button" style="padding:20px;position: absolute;" v-if="downloadShow">下载</a>
      <a id="down_button" style="padding:20px;position: absolute;" @click="ieDownLoad" v-else>下载</a>
      <a id="copybtn" style="position: absolute;margin:20px 100px"  data-clipboard-target="#tableData" @click = "copy">复制表格</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { btnauth } from '@/components/Mixin/btnauth'
  import remoteLoad from '@/utils/remoteLoad.js'
  import { parseTime } from '@/utils/index'
  import Clipboard from 'clipboard'
  export default {
    data () {
      return {
        list: null,
        listLoading: false,
        tableData: [{
          dates: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          dates: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          dates: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          dates: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          dates: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          dates: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    computed: {
      ...mapGetters(['permission_routers']),
    },
    mixins: [btnauth],
    created () {
      Promise.all([
        remoteLoad(
          'static/js/bluebird.js'
        ),
        remoteLoad(
          'static/js/html2canvas.js'
        )
      ]).then(() => {
        this.fetchData()
      })
    },
    methods: {
      copy() {
        let clipboard = new Clipboard('#copybtn') //注意要使用let或者const，不能使用var，否则会出现复制次数叠加的问题，即复制不止一次。//因为var是全局变量，let和const是局部
        clipboard.on('success',e =>{
          alert('拷贝成功')
          clipboard.destroy() //使用destroy可以清楚缓存
        })
        clipboard.on('error',e =>{
          alert('拷贝失败')
          clipboard.destroy()
        })
      },
      fetchData () {
        new Promise((resolve, reject) => {
          this.list = this.tableData
          this.listLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
          this.downloadShow = false
        } else if(isEdge) {
          this.downloadShow = false
        } else if(isIE11) {
          this.downloadShow = false
        }else{
          this.downloadShow = true
        }
        const tableData = document.querySelector("#tableData");
        const scale = 3;
        html2canvas(tableData,{
          scale
        }).then(canvas=> {
          const context = canvas.getContext('2d');
          // 关闭抗锯齿
          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;
          var down_button = document.getElementById("down_button");
          down_button.setAttribute('href', canvas.toDataURL());
          down_button.setAttribute('download', '表格' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + '.png');
        })
      },


      //ie下载方案
      ieDownLoad(){
        const tableData = document.querySelector("#tableData");
        const scale = 3;
        html2canvas(tableData,{
          scale
        }).then(canvas=> {
          var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          var arr = image.split(',');
          var mime = arr[0].match(/:(.*?);/)[1];
          var bstr = atob(arr[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          window.navigator.msSaveBlob(new Blob([u8arr], {type:mime}), "download.png");
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  #tableDatas{
    #down_button{
      text-decoration: underline!important;
      &:hover{
        color:#3CADDC;
        text-decoration: underline!important;;
      }
    }
    #copybtn{
      text-decoration: underline!important;
      &:hover{
        color:#3CADDC;
        text-decoration: underline!important;;
      }
    }
  }
</style>
