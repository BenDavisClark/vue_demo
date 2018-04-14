<template>
  <div>
    <table-operate>
      <el-button type="primary" size="small" v-show="hasAuth('add')">新建</el-button>
      <el-button type="danger" size="small" v-show="hasAuth('del')">删除</el-button>
    </table-operate>
    <table-search>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="listQuery.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="listQuery.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
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
            <el-button size="small" :plain="true" type="primary" @click="edit(scope.row.org_id)">编辑</el-button>
            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row.org_id)">删除</el-button>
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
import { getList } from '@/api/list'
import TableOperate from '@/components/Table/Operate'
import TableSearch from '@/components/Table/Search'
import TablePagination from '@/components/Table/PagiContainer'
import { mapGetters } from 'vuex'
import { btnauth } from '@/components/Mixin/btnauth'
export default {
  components: {
    TableOperate,
    TableSearch,
    TablePagination
  },
  data () {
    return {
      listQuery: {
        user: '',
        region: ''
      },
      list: null,
      listLoading: true,
      currentPage: 1,
      pagishow: false,
      multipleSelection: []
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
      getList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
        this.pagishow = true
      })
    },
    edit: function (index) {
      alert(index)
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
