<style>
  .el-date-editor .el-range-separator{line-height:25px;}
  .el-date-editor .el-range__icon{line-height:25px;}
</style>

<template>
  <div id="tableDatas">
    <div class="app-container">
      <el-table :data="tableData"  v-loading.body="listLoading" element-loading-text="拼命加载中"  border fit stripe style="with:100%" id="tableData">
        <el-table-column prop="date" label='日期' style="width:10%" sortable ></el-table-column>
        <el-table-column prop="name" label="姓名" style="width:25%"></el-table-column>
        <el-table-column prop="address" label="地址" style="width:45%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.org_id)" icon="el-icon-edit">编辑</el-button>
            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row.org_id)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <a id="down_button" style="padding:20px;position: absolute;">下载</a>
    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
import { btnauth } from '@/components/Mixin/btnauth'
import remoteLoad from '@/utils/remoteLoad.js'
import { parseTime } from '@/utils/index'

export default {
  data () {
    return {
      parseTime,
      list: null,
      listLoading: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    Promise.all([
      remoteLoad(
        'static/html2canvas.js'
      )
    ]).then(() => {
      this.fetchData()
    })
  },
  computed: {
    ...mapGetters(['permission_routers']),
  },
  mixins: [btnauth],

  methods: {
    fetchData () {
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
        down_button.setAttribute('href',canvas.toDataURL());
        down_button.setAttribute('download','表格'+parseTime(new Date(),'{y}{m}{d}{h}{i}{s}')+'.png');
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
  }
</style>
