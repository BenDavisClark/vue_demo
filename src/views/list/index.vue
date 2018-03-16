<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit stripe style="with:100%">
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
  </div>
</template>

<script>
import { getList } from '@/api/list'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    edit: function (index) {
      alert(index)
    },
    remove: function (index) {
      alert(index)
    }
  }
}
</script>
