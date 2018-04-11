<template>
  <div>
    <table-operate>
      <el-button type="primary" size="small" @click="gotoform">添加</el-button>
      <el-button type="danger" size="small" @click="batchRemove()">删除</el-button>
    </table-operate>
    <table-search>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="listQuery.keyword" placeholder="账号/姓名/手机/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="listQuery.status">
            <el-option label="所有" value=""></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </table-search>
    <div class="app-container">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange"  border fit stripe style="with:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orgName" label='组织机构' style="width:10%"></el-table-column>
        <el-table-column prop="roleName" label="角色" style="width:25%"></el-table-column>
        <el-table-column prop="account" label="账号" style="width:45%"></el-table-column>
        <el-table-column prop="realName" label="姓名 " style="width:45%"></el-table-column>
        <el-table-column  label="状态" style="width:45%">
          <template slot-scope="scope">
            <div v-if="scope.row.status ==1">启用</div>
            <div v-else>停用</div>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" style="width:45%"></el-table-column>
        <el-table-column prop="tel" label="手机" style="width:45%"></el-table-column>
        <el-table-column prop="email" label="邮箱" style="width:45%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.accountId)">编辑</el-button>
            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row.accountId)">删除</el-button>
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
import { accountList } from '@/api/account'
import { deleteAccount } from '@/api/account'
import { editAccount } from '@/api/account'
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
        status: '',
        roleId: '',
        orgId: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 1000,
      list: null,
      listLoading: true,
      currentPage: 1,
      pagishow: false,
      multipleSelection: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    gotoform () {
      this.$router.push({path:'/user/accountDetail'})
    },
    onSubmit: function () {
      this.fetchData()
      //console.log('submit!')
    },
    fetchData () {
      this.listLoading = true
      accountList(this.listQuery).then(response => {
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
    edit: function (accountId) {
      this.$router.push({path:'/user/accountDetail',query: {accountId: accountId}})
    },
    remove: function (accountId) {
      //var index = this._.findIndex(this.list, ['accountId', accountId])
      deleteAccount(accountId).then(response => {
       if(response.success){
            //this.list.splice(index,1)
            this.fetchData
            this.$message({
              message: response.message,
              type: 'success'
            })
        }else{
            this.$message({
              message: response.message,
              type: 'warning'
            })
        }
      })
    },
    batchRemove: function(){
      if(this.multipleSelection.length>0){
        deleteAccount(this.multipleSelection).then(response => {
        if(response.success){
              // this.multipleSelection.forEach(element =>{
              //   var index = this._.findIndex(this.list, ['accountId', element])
              //   this.list.splice(index,1)
              // })
              this.fetchData()
              this.$message({
                message: response.message,
                type: 'success'
              })
              this.multipleSelection = []
              this.handleSelectionChange(this.multipleSelection)
          }else{
              this.$message({
                message: response.message,
                type: 'warning'
              })
          }
        })
      }else{
        this.$message({
          message: '请选择需要删除的账号',
          type: 'warning'
        })
      }
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      this.fetchData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach(element => {
       this.multipleSelection.push(element.accountId)
      });
    }
  }
}
</script>
