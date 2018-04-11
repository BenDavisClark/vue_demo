<template>
  <div>
    <table-operate>
      <el-button type="primary" size="small">添加</el-button>
    </table-operate>
    <div class="app-container">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit stripe style="with:100%">
        <el-table-column prop="parentAuthName" label='权限名称' style="width:10%"></el-table-column>
        <el-table-column prop="authSign" label="权限标记" style="width:25%"></el-table-column>
        <el-table-column prop="memo" label="备注" style="width:45%"></el-table-column>
        <el-table-column label="操作" style="width:10%" align="center">
          <template slot-scope="scope">
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.authId)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { authList } from '@/api/auth'
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
          status: ''
        },
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
        authList(this.listQuery).then(response => {
          this.list = response.data
          console.log(response)
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
      }
    }
  }
</script>
