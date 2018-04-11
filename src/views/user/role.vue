<template>
  <div>
    <table-operate>
      <el-button type="primary" size="small">添加</el-button>
      <el-button type="danger" size="small" @click="batchRemove">删除</el-button>
    </table-operate>
    <div class="app-container">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" border fit stripe style="with:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="roleName" label='角色名称' style="width:10%"></el-table-column>
        <el-table-column prop="roleSign" label="角色标记" style="width:25%"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" style="width:45%"></el-table-column>
        <el-table-column prop="memo" label="备注" style="width:45%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.roleId)">编辑</el-button>
            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row.roleId)">删除</el-button>
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
  import { roleList } from '@/api/role'
  import { deleteRole } from '@/api/role'
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
      onSubmit: function () {
        console.log('submit!')
      },
      fetchData () {
        this.listLoading = true
        roleList(this.listQuery).then(response => {
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
      remove: function (roleId) {
        deleteRole(roleId).then(response => {
          if(response.success){
              this.fetchData()
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
      batchRemove(){
        if(this.multipleSelection.length>0){
          deleteRole(this.multipleSelection).then(response => {
          if(response.success){
                this.fetchData()
                this.$message({
                  message: response.message,
                  type: 'success'
                })
                this.multipleSelection = []
                this.handleSelectionChange(this.multipleSelection)
            }else {
                if(null != response.data && response.data.data > 0){
                   this.fetchData()
                   this.multipleSelection = []
                   this.handleSelectionChange(this.multipleSelection)
                }
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
          this.multipleSelection.push(element.roleId)
        });
      }
    }
  }
</script>
