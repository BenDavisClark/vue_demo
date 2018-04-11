<template>
  <div>
    <table-operate>
      <el-button type="primary" size="small">添加</el-button>
    </table-operate>
    <table-search>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="listQuery.keyword" placeholder="账号/姓名/手机/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="参数类型">
          <el-select v-model="listQuery.typeId">
            <el-option label="所有参数类型" value=""></el-option>
            <el-option label="系统配置" value="1"></el-option>
            <el-option label="堤坝类型" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </table-search>
    <div class="app-container">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit stripe style="with:100%">
        <el-table-column prop="dataTypeName" label='参数类型' style="width:10%"></el-table-column>
        <el-table-column prop="parentDataName" label="上级参数名称" style="width:25%"></el-table-column>
        <el-table-column prop="dataName" label="参数名称" style="width:25%"></el-table-column>
        <el-table-column prop="dataCode" label="参数编码" style="width:10%"></el-table-column>
        <el-table-column prop="dataValue" label="参数值" style="width:10%"></el-table-column>
        <el-table-column prop="valueStyle" label="参数值类型" style="width:25%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.dataId)">编辑</el-button>
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
          :total="total">
        </el-pagination>
      </table-pagination>
    </div>
  </div>
</template>

<script>
import { baseList } from '@/api/base'
import TableOperate from '@/components/Table/Operate'
import TableSearch from '@/components/Table/Search'
import TablePagination from '@/components/Table/PagiContainer'
export default {
  components: {
    TableOperate,
    TableSearch,
    TablePagination
  },
  data () {
    return {
      listQuery: {
        keyword: '',
        typeId: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 1000,
      list: null,
      listLoading: true,
      currentPage: 1,
      pagishow: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    onSubmit: function () {
      console.log('submit!')
    },
    fetchData () {
      this.listLoading = true
      baseList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.recordsTotal
        this.listLoading = false
        this.pagishow = true
      })
    },
    /*getAccountData(){
       getAccount({
       keyword: this.keyword,
       status: this.status,
       roleId: this.roleId,
       orgId: this.orgId
       }).then(response=>{
       console.log(response);
       })
       },*/
    edit: function (index) {
      alert(index)
    },
    remove: function (index) {
      alert(index)
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      this.fetchData()
    }
  }
}
</script>
