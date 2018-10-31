<style rel="stylesheet/scss" lang="scss">
  .el-date-editor{
    .el-range-separator{line-height:25px;}
    .el-range__icon{line-height:25px;}
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>

<template>
  <div>
    <table-operate>
      <el-button type="primary" size="small" @click="add()" v-show="hasAuth('add')">新建</el-button>
      <el-button type="danger" size="small" v-show="hasAuth('del')">删除</el-button>
    </table-operate>
    <table-search>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="审  批  人" style="margin-left:5px;">
              <el-input v-model="listQuery.user" placeholder="审批人"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="分组类型">
              <el-select v-model="listQuery.region1" placeholder="分组类型">
                <el-option label="分组一" value="shanghai"></el-option>
                <el-option label="分组二" value="hangzhou"></el-option>
                <el-option label="分组三" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="多项选择">
              <el-select v-model="value5" multiple placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="分组名称">
              <el-input v-model="listQuery.user2" placeholder="分组名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="分组名称">
              <el-input v-model="listQuery.user5" placeholder="分组名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分组类型">
              <el-select v-model="listQuery.region2" placeholder="分组类型">
                <el-option label="分组一" value="shanghai"></el-option>
                <el-option label="分组二" value="hangzhou"></el-option>
                <el-option label="分组三" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
         <!-- <el-col :span="12">
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center;">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="date2" :default-time="['12:00:00']" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>-->
          <el-col :span="6">
            <el-form-item label="活动时间">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="分组名称">
              <el-input v-model="listQuery.user3" placeholder="分组名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="分组名称">
              <el-input v-model="listQuery.user4" placeholder="分组名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="级联选择">
              <el-cascader
                :options="options"
                change-on-select
                @change="changeSelect"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="巡检日期" >
              <div class="block">
                <el-date-picker
                  v-model="dateValue"
                  type="datetimerange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </table-search>
    <div class="app-container">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" border fit stripe style="with:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orgName" label='分组名称' style="width:10%"></el-table-column>
        <el-table-column prop="orgType" label="分组类型" style="width:25%"></el-table-column>
        <el-table-column prop="parentName" label="所属上级分组" style="width:45%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.org_id)" icon="el-icon-edit">编辑</el-button>
            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row.org_id)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagination v-if="pagishow">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </table-pagination>
    </div>
  </div>
</template>

<script>
import { getList1 } from '@/api/list'
import TableOperate from '@/components/Table/Operate'
import TableSearch from '@/components/Table/Search'
import TablePagination from '@/components/Table/PagiContainer'
import { mapGetters } from 'vuex'
import { btnauth } from '@/components/Mixin/btnauth'
import mockdata from '@/mock/mockList.js'

export default {
  components: {
    TableOperate,
    TableSearch,
    TablePagination
  },
  data () {
    return {
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value5: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        },{
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],

      listQuery: {
        user: '',
        region: '',
        user1: '',
        region1: '',
        user2: '',
        region2: '',
        user3: '',
        region3: '',
        region4: '',
        region5: '',
        user4: '',
        user5: ''
      },
      dateValue: '',
      list: null,
      listLoading: true,
      currentPage: 1,
      pagishow: false,
      multipleSelection: [],
      date1: '',
      date2: '',
      value1: ''
    }
  },
  computed: {
    ...mapGetters(['permission_routers']),
  },
  mixins: [btnauth],
  created () {
    this.fetchData()
  },
  methods: {
    changeSelect(val){
      console.log(val[val.length-1]);
    },
    onSubmit: function () {
      console.log(this.multipleSelection)
      this.$message.error('错了哦，这是一条错误消息')
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },
    fetchData () {
      this.listLoading = true
      new Promise((resolve, reject) => {
        this.list = mockdata.data.data
        this.listLoading = false
        this.pagishow = true
        resolve()
      }).catch(error => {
          reject(error)
      })
/*
      this.listLoading = true
      getList1(this.listQuery).then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
        this.pagishow = true
      })*/
    },

    add: function () {
      this.$router.push({ path: 'list/add' })
    },
    edit: function (id) {
      this.$router.push({ path: 'list/Detail' })
    },
    remove: function (index) {
      alert(index)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
